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

    def test_api_pages_allow_only_an_exact_version_redoc_bundle(self):
        # The API docs are rendered with @redocly/cli@latest, so each release's
        # page pins whichever Redoc it ships (v3.0.1, then v3.1.0). The
        # release must not stop on that, and must still stop on anything else.
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByPath'] = policy['allowUrlPatternsByPath']
        bundle = 'https://cdn.redocly.com/redoc/v{}/bundles/redoc.standalone.js'
        for real in ['api/v13.08/index.html', 'api/v13.10/index.html']:
            self.assertIn(bundle.format('3.1.0'), (ROOT/real).read_text())
        page = self.root/'api/v99.01/index.html'
        page.parent.mkdir(parents=True)
        for version in ['3.0.1', '3.1.0', '4.12.7']:
            page.write_text('<script src="'+bundle.format(version)+'"></script>')
            r.inspect(self.root, self.policy)
        for url in [bundle.format('latest'), bundle.format('3.1.0')+'?report=1',
                    'https://cdn.redocly.com/redoc/v3.1.0/bundles/other.js',
                    'https://evil.example/redoc/v3.1.0/bundles/redoc.standalone.js',
                    'https://cdn.redocly.com.evil.example/redoc/v3.1.0/bundles/redoc.standalone.js']:
            with self.subTest(url=url):
                page.write_text('<script src="'+url+'"></script>')
                with self.assertRaisesRegex(ValueError, 'api/v99.01/index.html: new URL'):
                    r.inspect(self.root, self.policy)
        page.write_text('')
        # The allowance belongs to the API pages only: not other files, and not
        # a page nested deeper under api/ (the glob never crosses a "/").
        for name in ['main.js', 'api/v99.01/x/index.html', 'apiv1/index.html']:
            with self.subTest(name=name):
                other = self.root/name
                other.parent.mkdir(parents=True, exist_ok=True)
                other.write_text('<script src="'+bundle.format('3.1.0')+'"></script>')
                with self.assertRaisesRegex(ValueError, name+': new URL'):
                    r.inspect(self.root, self.policy)
                other.write_text('')

    def test_createbleed_links_are_exact_and_page_scoped(self):
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        reporter = 'https://github.com/tsurutanmen'
        advisory = 'https://github.com/wekan/wekan/security/advisories/GHSA-qcfm-2g4w-wqcc'
        commit = 'https://github.com/wekan/wekan/commit/5c1f6088f4'
        for name, urls in [('hall-of-fame/createbleed/index.html', [reporter, advisory, commit]),
                           ('hall-of-fame/index.html', [reporter, advisory])]:
            page = self.root/name
            page.parent.mkdir(parents=True, exist_ok=True)
            for url in urls:
                self.assertIn(url, (ROOT/name).read_text())
            page.write_text('\n'.join('<a href="'+u+'">Reference</a>' for u in urls))
            r.inspect(self.root, self.policy)
            for url in urls:
                with self.subTest(page=name, url=url):
                    self.file.write_text('fetch("'+url+'")')
                    with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
                        r.inspect(self.root, self.policy)
            self.file.write_text('console.log("local diagnostics");')
            for other in [reporter+'?report=1', reporter+'x', advisory+'0',
                          commit.replace('5c1f6088f4', '5c1f6088f5'),
                          advisory.replace('/wekan/wekan/', '/other/repo/')]:
                with self.subTest(page=name, url=other):
                    page.write_text('<a href="'+other+'">Unreviewed</a>')
                    with self.assertRaisesRegex(ValueError, 'new URL'):
                        r.inspect(self.root, self.policy)
            page.unlink()
    def test_listlockbleed_links_are_exact_and_page_scoped(self):
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        reporter = 'https://github.com/tsurutanmen'
        advisory = 'https://github.com/wekan/wekan/security/advisories/GHSA-4734-8vrg-8j3w'
        commit = 'https://github.com/wekan/wekan/commit/214b20e7ad'
        for name, urls in [('hall-of-fame/listlockbleed/index.html', [reporter, advisory, commit]),
                           ('hall-of-fame/index.html', [reporter, advisory])]:
            page = self.root/name
            page.parent.mkdir(parents=True, exist_ok=True)
            for url in urls:
                self.assertIn(url, (ROOT/name).read_text())
            page.write_text('\n'.join('<a href="'+u+'">Reference</a>' for u in urls))
            r.inspect(self.root, self.policy)
            for url in urls:
                with self.subTest(page=name, url=url):
                    self.file.write_text('fetch("'+url+'")')
                    with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
                        r.inspect(self.root, self.policy)
            self.file.write_text('console.log("local diagnostics");')
            for other in [advisory+'0', advisory+'?report=1',
                          commit.replace('214b20e7ad', '214b20e7ae'),
                          advisory.replace('/wekan/wekan/', '/other/repo/')]:
                with self.subTest(page=name, url=other):
                    page.write_text('<a href="'+other+'">Unreviewed</a>')
                    with self.assertRaisesRegex(ValueError, 'new URL'):
                        r.inspect(self.root, self.policy)
            page.unlink()
        # The new page's links are not allowed on an unrelated page.
        page = self.root/'hall-of-fame/createbleed/index.html'
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_text('<a href="'+commit+'">Elsewhere</a>')
        with self.assertRaisesRegex(ValueError, 'createbleed/index.html: new URL'):
            r.inspect(self.root, self.policy)
    def test_listlockattachbleed_link_is_exact_and_page_scoped(self):
        # The deploy of ca3bd21 stopped here: the new page's fix commit link
        # was not in the baseline.
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        commit = 'https://github.com/wekan/wekan/commit/7bb3e13ba9'
        name = 'hall-of-fame/listlockattachbleed/index.html'
        self.assertIn(commit, (ROOT/name).read_text())
        page = self.root/name
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_text('<a href="'+commit+'">Source fix</a>')
        r.inspect(self.root, self.policy)
        self.file.write_text('fetch("'+commit+'")')
        with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
            r.inspect(self.root, self.policy)
        self.file.write_text('console.log("local diagnostics");')
        for other in [commit+'0', commit+'?report=1',
                      commit.replace('7bb3e13ba9', '7bb3e13ba8'),
                      commit.replace('/wekan/wekan/', '/other/repo/')]:
            with self.subTest(url=other):
                page.write_text('<a href="'+other+'">Unreviewed</a>')
                with self.assertRaisesRegex(ValueError, 'new URL'):
                    r.inspect(self.root, self.policy)
        page.unlink()
        other_page = self.root/'hall-of-fame/listlockbleed/index.html'
        other_page.parent.mkdir(parents=True, exist_ok=True)
        other_page.write_text('<a href="'+commit+'">Elsewhere</a>')
        with self.assertRaisesRegex(ValueError, 'listlockbleed/index.html: new URL'):
            r.inspect(self.root, self.policy)
    def test_unassignedarchivebleed_links_are_exact_and_page_scoped(self):
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        reporter = 'https://github.com/tsurutanmen'
        advisory = 'https://github.com/wekan/wekan/security/advisories/GHSA-6xqf-jh8x-4wxc'
        commit = 'https://github.com/wekan/wekan/commit/1513b2e98c'
        for name, urls in [('hall-of-fame/unassignedarchivebleed/index.html', [reporter, advisory, commit]),
                           ('hall-of-fame/index.html', [reporter, advisory])]:
            page = self.root/name
            page.parent.mkdir(parents=True, exist_ok=True)
            for url in urls:
                self.assertIn(url, (ROOT/name).read_text())
            page.write_text('\n'.join('<a href="'+u+'">Reference</a>' for u in urls))
            r.inspect(self.root, self.policy)
            for url in urls:
                with self.subTest(page=name, url=url):
                    self.file.write_text('fetch("'+url+'")')
                    with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
                        r.inspect(self.root, self.policy)
            self.file.write_text('console.log("local diagnostics");')
            for other in [advisory+'0', advisory+'?report=1',
                          commit.replace('1513b2e98c', '1513b2e98d'),
                          advisory.replace('/wekan/wekan/', '/other/repo/')]:
                with self.subTest(page=name, url=other):
                    page.write_text('<a href="'+other+'">Unreviewed</a>')
                    with self.assertRaisesRegex(ValueError, 'new URL'):
                        r.inspect(self.root, self.policy)
            page.unlink()
        # The new page's links are not allowed on an unrelated page.
        page = self.root/'hall-of-fame/createbleed/index.html'
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_text('<a href="'+commit+'">Elsewhere</a>')
        with self.assertRaisesRegex(ValueError, 'createbleed/index.html: new URL'):
            r.inspect(self.root, self.policy)
    def test_grouplinkbleed_links_are_exact_and_page_scoped(self):
        # The deploy of b5d4266 stopped here: the new page's reporter, advisory
        # and fix links were not in the baseline. The fix link is the commit on
        # wekan/wekan main (e3458004ec), not the pre-rebase 87c4501ced.
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        reporter = 'https://github.com/bhaswanthc'
        advisory = 'https://github.com/wekan/wekan/security/advisories/GHSA-v544-rmr5-38gx'
        commit = 'https://github.com/wekan/wekan/commit/e3458004ec'
        live = (ROOT/'hall-of-fame/grouplinkbleed/index.html').read_text()
        self.assertNotIn('87c4501ced', live)
        for name, urls in [('hall-of-fame/grouplinkbleed/index.html', [reporter, advisory, commit]),
                           ('hall-of-fame/index.html', [reporter, advisory])]:
            page = self.root/name
            page.parent.mkdir(parents=True, exist_ok=True)
            for url in urls:
                self.assertIn(url, (ROOT/name).read_text())
            page.write_text('\n'.join('<a href="'+u+'">Reference</a>' for u in urls))
            r.inspect(self.root, self.policy)
            for url in urls:
                with self.subTest(page=name, url=url):
                    self.file.write_text('fetch("'+url+'")')
                    with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
                        r.inspect(self.root, self.policy)
            self.file.write_text('console.log("local diagnostics");')
            for other in [reporter+'?report=1', reporter+'x', advisory+'0',
                          commit.replace('e3458004ec', '87c4501ced'),
                          advisory.replace('/wekan/wekan/', '/other/repo/')]:
                with self.subTest(page=name, url=other):
                    page.write_text('<a href="'+other+'">Unreviewed</a>')
                    with self.assertRaisesRegex(ValueError, 'new URL'):
                        r.inspect(self.root, self.policy)
            page.unlink()
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

    def test_saml_subject_and_zip_report_links_are_exact_and_page_scoped(self):
        policy = json.loads((ROOT/'releases/risk-baseline.json').read_text())
        self.policy['allowUrlPatternsByFile'] = policy['allowUrlPatternsByFile']
        reviewed = {
            'samlsubjectbleed': [
                'https://github.com/alham-rizvi',
                # 16a7c73 moved the page's link, and its allowlist entry, to the
                # menu-based docs place Login-Page/; this list followed later.
                'https://github.com/wekan/wekan/blob/main/docs/Features/Login-Page/SAML.md',
                'https://github.com/wekan/wekan/commit/c0c6aa5414fd9fa28cef07ea89908670c424e2e9'],
            'zipbombbleed': ['https://github.com/alham-rizvi'],
        }
        for name, urls in reviewed.items():
            page = self.root/f'hall-of-fame/{name}/index.html'
            page.parent.mkdir(parents=True)
            for url in urls:
                with self.subTest(page=name, url=url):
                    self.assertIn(url, (ROOT/page.relative_to(self.root)).read_text())
                    page.write_text('<a href="'+url+'">Reviewed reference</a>')
                    r.inspect(self.root, self.policy)
                    self.file.write_text('fetch("'+url+'")')
                    with self.assertRaisesRegex(ValueError, 'main.js: new URL'):
                        r.inspect(self.root, self.policy)
                    self.file.write_text('console.log("local diagnostics");')
                    for other in [url+'?report=1', url+'0',
                                  url.replace('github.com', 'githubXcom'),
                                  url.replace('github.com/', 'github.com/unreviewed/')]:
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
