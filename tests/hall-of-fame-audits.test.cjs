'use strict';
// The icon and star audits (hall-of-fame/Audit-Icons.md, Audit-Stars.md) hold
// for every row of the contents page, and the two audit files list every row:
// - each row has stars, and its own page's main row shows the same number;
// - its icons are black icons, then the red fa-tint, in one role="img" group
//   labelled with its name, using classes the local Font Awesome has, and no
//   two rows share a combination;
// - Audit-Icons.md lists its icons, and Audit-Stars.md its current stars.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '../hall-of-fame');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const index = read('index.html');
const fa = new Set([...fs.readFileSync(path.resolve(root, '../font-awesome/css/font-awesome.min.css'), 'utf8')
  .matchAll(/\.(fa-[a-z0-9-]+):before/g)].map((m) => m[1]));
const icons = new Map([...read('Audit-Icons.md').matchAll(/^\| (\w+) \| ([^|]*) \|/gm)]
  .map((m) => [m[1], [...m[2].matchAll(/`(fa-[a-z0-9-]+)`/g)].map((x) => x[1])]));
const inventory = new Map();
for (const m of read('Audit-Stars.md').matchAll(/^\| (\w+) \| ([^|]*) \| ([^|]*) \| ([^|]*) \|/gm)) {
  if (!inventory.has(m[1])) inventory.set(m[1], m[4].trim());
}

const seen = new Map();
let rows = 0;
for (const row of index.match(/<tr>[\s\S]*?<\/tr>/g)) {
  const cells = row.match(/<td\b[\s\S]*?<\/td>/g) || [];
  if (cells.length < 8) continue;
  rows++;
  const name = text(cells[2]);
  const stars = (cells[5].match(/GoldStar\.png/g) || []).length;
  assert.ok(stars >= 1, `${name}: has stars`);
  // The page's own style keeps a row's stars on one line by td.stars, and the
  // reporter cell is td.by: a row without them draws its stars full size and
  // lets them wrap.
  assert.match(cells[5], /^<td class="stars"/, `${name}: the stars cell has class="stars"`);
  assert.match(cells[4], /^<td class="by"/, `${name}: the reporter cell has class="by"`);

  const used = [...cells[1].matchAll(/<i class="fa (fa-[a-z0-9-]+)"/g)].map((m) => m[1]);
  assert.equal(used.at(-1), 'fa-tint', `${name}: the red drop comes last`);
  const black = used.slice(0, -1);
  assert.ok(black.length >= 1, `${name}: has a black icon`);
  for (const c of used) assert.ok(fa.has(c), `${name}: ${c} is in the local Font Awesome`);
  assert.match(cells[1], new RegExp(`role="img" aria-label="${name}"`), `${name}: one labelled icon group`);
  assert.equal(text(cells[1]), '', `${name}: the icon cell holds icons only`);
  const key = [...black].sort().join(' ');
  assert.ok(!seen.has(key), `${name}: shares its icons with ${seen.get(key)}`);
  seen.set(key, name);

  assert.deepEqual(icons.get(name), black, `${name}: Audit-Icons.md lists its icons`);
  assert.equal(inventory.get(name), String(stars), `${name}: Audit-Stars.md has its ${stars} stars`);

  const link = cells[2].match(/href="([^"]+)\/"/);
  const page = read(path.join(link[1], 'index.html'));
  const table = page.slice(0, Math.max(0, page.indexOf('</table>')));
  const main = (table.match(/<tr[\s\S]*?<\/tr>/g) || []).find((r) => r.includes('<td') && text(r).includes(name));
  if (main && /GoldStar/.test(main)) {
    assert.equal((main.match(/GoldStar\.png/g) || []).length, stars, `${name}: its page shows the same stars`);
  }
  assert.match(page, /font-awesome\.min\.css/, `${name}: its page links the local Font Awesome`);
}
assert.ok(rows >= 149, `only ${rows} rows`);

// Negative: the checks fail on what the audit found and fixed.
assert.ok(!/GoldStar/.test('<td class="stars" valign="top">-</td>'));
// SamlSubjectBleed's icons before the audit: no labelled group.
assert.doesNotMatch('<h2><i class="fa fa-id-card" aria-hidden="true"></i> <i class="fa fa-tint" style="color: red;" aria-hidden="true"></i></h2>',
  /role="img" aria-label="SamlSubjectBleed"/);
// AuthTraceBleed's icons before the audit were LdapBindBleed's.
assert.ok(seen.has('fa-sign-in'), 'LdapBindBleed keeps fa-sign-in');
assert.notEqual(seen.get('fa-sign-in'), 'AuthTraceBleed');
console.log(`hall-of-fame-audits: ${rows} rows match the icon and star audits`);
