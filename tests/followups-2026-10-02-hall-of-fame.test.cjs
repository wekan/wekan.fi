'use strict';
// The 2026-10-02 follow-up fixes on existing Hall of Fame pages: each page keeps
// its own open (not collapsed) section linking the source commits, and its index
// row says so in one short sentence inside the collapsed Details cell.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../hall-of-fame');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const hasOctoberFollowup = cell => {
  const details = cell.match(/<details>\s*<summary>Details<\/summary>([\s\S]*?)<\/details>/);
  return !!details && /<p>[^<]*\(2026-10-02\)[^<]*<\/p>/.test(details[1]);
};
assert.ok(hasOctoberFollowup('<details><summary>Details</summary><p>Fixes (2026-10-02): first.</p><p>Later fix.</p></details>'));
assert.ok(!hasOctoberFollowup('<details><summary>Details</summary><p>Later fix.</p></details><p>Fixes (2026-10-02): outside.</p>'));
const FOLLOW_UPS = [["ldapbleed", "LDAPBleed", ["daf6593adf"]],["brutebleed", "BruteBleed", ["fd8b51464f"]],["tenantbleed", "TenantBleed", ["94a8c41b3c"]],["assignedbleed","AssignedBleed",["1a218ead02","a3da90833a","7788e0c4e6"]],["visibilitybleed","VisibilityBleed",["3af89a6a00"]],["metricsbleed","MetricsBleed",["a4b524a5fc"]],["jambleed","JamBleed",["c49d9d8d3e","3156dec7bc"]],["readonlybleed","ReadOnlyBleed",["8ddce924ec","c15f9486d8"]],["casbleed","CasRaceBleed",[]],["framebleed","FrameBleed",["dae1fd68e8"]],["signupbleed","SignupBleed",["dd36db3641","433ff5506c"]],["linkedwritebleed","LinkedWriteBleed",["3da444db74"]],["subtaskdepositbleed","SubtaskDepositBleed",["1167a2ae2f"]],["parentbleed","ParentBleed",["c6f59fc923"]],["hashbleed","HashBleed",["8fc9bd5a94"]],["mailtitlebleed","MailTitleBleed",["a9e8bda47b"]],["positionhistorybleed","PositionHistoryBleed",["3d080956be"]],["uploadpathbleed","UploadPathBleed",["06b8ea5750"]],["avatarmimebleed","AvatarMimeBleed",["e14671efa6"]],["ownerbleed","OwnerBleed",["ebcaac1962"]],["errorbleed","ErrorBleed",["215293868b"]],["mutationbleed","MutationBleed",["fd458543f9","5de71ba789"]],["invisiblebleed","InvisibleBleed",["1076c08381"]],["bypassbleed","BypassBleed",["a8e836efd3"]],["stalebleed","StaleBleed",["d3a94fd2d9"]],["historyscopebleed","HistoryScopeBleed",["1f368e9c7c"]],["cachebleed","CacheBleed",["cd4c8064ae"]],["rulebleed","RuleBleed",["c63d909c81"]]];
for (const [dir, name, hashes] of FOLLOW_UPS) {
  const page = fs.readFileSync(path.join(root, dir, 'index.html'), 'utf8');
  const sections = page.split('<h2>Follow-up fixes (2026-10-02)</h2>');
  assert.equal(sections.length, 2, dir + ': exactly one follow-up section');
  const section = sections[1];
  for (const hash of hashes) {
    assert.match(section, new RegExp('<a href="https://github\\.com/wekan/wekan/commit/' + hash + '">'), dir + ' links ' + hash);
  }
  // The section sits inside the page body, before the closing tags.
  assert.ok(section.includes('</body>'), dir + ': section is before </body>');
  // Never a long URL as visible text.
  assert.doesNotMatch(section, />https?:\/\//, dir + ': link text is short');
  const rows = index.match(/<tr>[\s\S]*?<\/tr>/g).filter(row => row.includes('<b>' + name + '</b>'));
  assert.equal(rows.length, 1, name);
  const cells = rows[0].match(/<td\b[^>]*>[\s\S]*?<\/td>/g);
  assert.equal(cells.length, 8, name);
  assert.ok(hasOctoberFollowup(cells[7]), name + ': dated follow-up stays inside Details');
}
const cas = fs.readFileSync(path.join(root, 'casbleed/index.html'), 'utf8');
assert.match(cas, /<a href="..\/castokenbleed\/">CasTokenBleed<\/a>/);
const jam = fs.readFileSync(path.join(root, 'brutebleed/index.html'), 'utf8');
assert.match(jam, /<a href="..\/jambleed\/">JamBleed<\/a>/);
console.log('Follow-up fixes 2026-10-02: ' + FOLLOW_UPS.length + ' pages, sections, commit links and index sentences pass');
