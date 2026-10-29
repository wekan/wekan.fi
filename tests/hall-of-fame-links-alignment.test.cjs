'use strict';
// Every Vulnerability name in the Hall of Fame index links to its own page,
// relatively; and every Hall of Fame page is aligned the same way: centered
// above the CVE table, the table and everything below it left aligned with its
// cells' content at the top.
//
// The alignment used to depend on whether a page began with <!DOCTYPE html>:
// css/main.css centers body, which reaches table cells only in standards mode,
// so ImportPlacementBleed and 30 more pages were centered and the rest were not.
// Run: node tests/hall-of-fame-links-alignment.test.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const site = path.resolve(__dirname, '..');
const root = path.join(site, 'hall-of-fame');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dirs = fs.readdirSync(root).filter(d => fs.existsSync(path.join(root, d, 'index.html')));
let passed = 0;
const test = (name, fn) => { fn(); passed += 1; console.log('  ok -', name); };

const rows = index.match(/<tr>[\s\S]*?<\/tr>/g)
  .map(row => row.match(/<td\b[^>]*>[\s\S]*?<\/td>/g))
  .filter(cells => cells && cells.length === 8);

test('every Vulnerability name links to its own page with a relative URL', () => {
  assert.ok(rows.length >= 140, `${rows.length} rows`);
  const linked = new Set();
  for (const cells of rows) {
    const m = /^<td[^>]*><b><a href="([a-z0-9]+)\/">([A-Za-z0-9]+)<\/a><\/b><\/td>$/.exec(cells[2]);
    assert.ok(m, `the name is a link: ${cells[2]}`);
    assert.ok(dirs.includes(m[1]), `${m[2]} links to ${m[1]}/, which has no index.html`);
    const page = fs.readFileSync(path.join(root, m[1], 'index.html'), 'utf8');
    // Case-insensitively: emailbleed/ spells it Emailbleed.
    assert.ok(page.toLowerCase().includes(m[2].toLowerCase()), `${m[1]}/ is not the page of ${m[2]}`);
    linked.add(m[1]);
  }
  // ...and every page is reached from a row.
  assert.deepEqual(dirs.filter(d => !linked.has(d)), []);
});

test('negative: no name is left unlinked, and none links to an absolute URL', () => {
  for (const cells of rows) {
    assert.doesNotMatch(cells[2], /^<td[^>]*><b>[A-Za-z0-9]+<\/b><\/td>$/, 'a bare name');
    assert.doesNotMatch(cells[2], /href="(?:https?:|\/)/, 'an absolute link');
  }
});

test('every Hall of Fame page has the hall-of-fame body class the alignment hangs on', () => {
  for (const file of ['index.html', ...dirs.map(d => `${d}/index.html`)]) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(html, /<body class="hall-of-fame">/, file);
  }
});

test('css: the table and what is below it are left aligned, each cell top aligned', () => {
  const css = fs.readFileSync(path.join(site, 'css/main.css'), 'utf8');
  const block = sel => {
    const at = css.indexOf(sel);
    assert.ok(at >= 0, `no rule for ${sel}`);
    return css.slice(at, css.indexOf('}', at));
  };
  for (const sel of ['body.hall-of-fame table,', 'body.hall-of-fame table ~ *,',
    'body.hall-of-fame > .hof ~ *,', 'body.hall-of-fame .hof:not(:has(table)) > h1 ~ *']) {
    assert.match(block(sel), /text-align: left;/, sel);
  }
  const cells = block('body.hall-of-fame th,');
  assert.match(cells, /body\.hall-of-fame td \{/);
  assert.match(cells, /text-align: left;/);
  assert.match(cells, /vertical-align: top;/);
  // Negative: what is above the table keeps the site's centering - no rule
  // left-aligns the whole Hall of Fame body or every .hof descendant.
  assert.doesNotMatch(css, /body\.hall-of-fame\s*\{[^}]*text-align: left/);
  assert.doesNotMatch(css, /body\.hall-of-fame \.hof\s*(?:,|\{)/);
});

console.log(`hall-of-fame-links-alignment: ${passed} tests passed`);
