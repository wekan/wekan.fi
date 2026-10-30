'use strict';
// ImportPlacementBleed, reported privately through GHSA-pm7j-752h-qfvj:
// five stars, credited to its reporter's GitHub account, on the index and on
// its own page. Run: node tests/importplacement-hall-of-fame.test.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../hall-of-fame');
const GHSA = 'GHSA-pm7j-752h-qfvj';
const URL = `https://github.com/wekan/wekan/security/advisories/${GHSA}`;

const rowOf = html => {
  const rows = html.match(/<tr>[\s\S]*?<\/tr>/g).filter(row => row.includes('aria-label="ImportPlacementBleed"'));
  assert.equal(rows.length, 1);
  const cells = rows[0].match(/<td\b[^>]*>[\s\S]*?<\/td>/g);
  assert.equal(cells.length, 8);
  return cells;
};

for (const [file, star] of [['index.html', 'GoldStar.png'], ['importplacementbleed/index.html', '../GoldStar.png']]) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const cells = rowOf(html);
  // No CVE yet: requested through the GHSA, so the cell stays "-" until GitHub assigns one.
  assert.equal(cells[0], '<td valign="top">-</td>', file);
  assert.equal(cells[3], '<td valign="top">2026-10-29</td>', file);
  assert.equal(cells[4], '<td class="by" valign="top"><b><a href="https://github.com/zachariah-mithani">zachariah-mithani</a></b></td>', file);
  assert.equal((cells[5].match(new RegExp(star.replace(/[.]/g, '\\.'), 'g')) || []).length, 5, `${file}: GHSA with a suggested fix is 5 stars`);
  assert.ok(cells[6].includes(`through GitHub Security Advisory <a href="${URL}">${GHSA}</a>, with details, a proof of concept and a suggested fix`), file);
  assert.ok(cells[7].includes(`CVE requested through <a href="${URL}">${GHSA}</a>`), file);
  assert.match(cells[7], /fixed in v12\.69/, file);
  // Negative: it reads as the GHSA report it is - no email, no "awaited", no
  // three-star wording, and not the unreleased "Upcoming" text.
  for (const cell of cells) {
    assert.doesNotMatch(cell, /e-?mail|awaited|three stars|not yet released|No CVE assigned/i, file);
  }
}
const audit = fs.readFileSync(path.join(root, 'Audit-Stars.md'), 'utf8');
assert.ok(audit.includes(`| ImportPlacementBleed | 2026-10-29 | 3 | 5 | [${GHSA}](${URL}) |`));
assert.doesNotMatch(audit.split('\n').find(line => line.startsWith('| ImportPlacementBleed')), /mail|awaited/i);
console.log('ImportPlacementBleed Hall of Fame: five stars through GHSA-pm7j-752h-qfvj, on the index and its page');
