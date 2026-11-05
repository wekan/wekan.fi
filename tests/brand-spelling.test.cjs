'use strict';
// The trademark is written WeKan in the visible text of every page: never Wekan or WEKAN, and not lower case
// when it is the name. URLs, addresses, file names, class names and code (<pre>, <code>) keep their own spelling:
// wekan.fi, github.com/wekan/wekan, `snap install wekan`, wekan-light-blue.
// The API pages (Redoc) rebuild their text in the browser from the JSON in __redoc_state, so that is checked
// too. Run: node tests/brand-spelling.test.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
function pages(dir = '.') {
  const out = [];
  for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...pages(rel));
    else if (e.name.endsWith('.html')) out.push(rel);
  }
  return out;
}
// the same words and the same surroundings as the fix: not part of an address, a path, a word or a flag
const CAP = /(?<![\w./@:#%&?=+-])(?:Wekan|WEKAN)(?!\w|\.\w|[/@:])/g;
const LOW = /(?<![\w./@:#%&?=+-])wekan(?!\w|\.\w|[/@:=_-])/g;

// what a visitor reads: no script, style, code, preformatted text or tags
function visibleText(html) {
  return html
    .replace(/<(script|style|pre|code|textarea|kbd|samp|tt)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ');
}

const found = [];
let checked = 0;
for (const page of pages()) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  checked += 1;
  const text = visibleText(html);
  for (const re of [CAP, LOW]) {
    for (const m of text.matchAll(re)) found.push(`${page}: "${text.slice(Math.max(0, m.index - 25), m.index + 30).replace(/\s+/g, ' ')}"`);
  }
  for (const block of html.match(/<script>[\s\S]*?<\/script>/g) || []) {
    if (!block.includes('__redoc_state')) continue;
    // the search index in the state is lower case on purpose; the prose is not
    for (const m of block.matchAll(CAP)) found.push(`${page}: redoc state "${block.slice(Math.max(0, m.index - 25), m.index + 30)}"`);
    for (const phrase of ['wekan admin', 'User in wekan']) if (block.includes(phrase)) found.push(`${page}: redoc state "${phrase}"`);
  }
}
assert.equal(found.length, 0, `${found.length} places spell the name wrongly:\n${found.slice(0, 20).join('\n')}`);
assert.ok(checked > 500, `expected the whole site, checked ${checked} pages`);

// negative: the check does catch the wrong spellings, and leaves addresses and code alone
const bad = visibleText('<p>Welcome to Wekan, WEKAN and the wekan server.</p>');
assert.equal((bad.match(CAP) || []).length + (bad.match(LOW) || []).length, 3);
const fine = visibleText('<p>See <a href="https://wekan.fi/wekan/Wekan">WeKan</a> at wekan.fi, github.com/wekan/wekan, wekan-light-blue, wekan/wekan</p><pre>snap install wekan\nWekan</pre><code>wekan</code>');
assert.equal((fine.match(CAP) || []).length + (fine.match(LOW) || []).length, 0);

console.log(`brand spelling: ${checked} pages, the name is WeKan in the visible text`);
