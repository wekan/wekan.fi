'use strict';
// The older API pages (v7.51 to v8.42, one generated page each) carry the same
// jQuery 3.2.1 and search script, so a fault in it is a fault in every copy.
// GitHub CodeQL code scanning found two:
// - js/xss-through-dom: the search results were built as an HTML string from
//   the text of a heading, $(n).text(), so text that looks like markup became
//   markup. They are built as elements now, and the heading text is set with
//   .text(), so it stays text.
// - js/unsafe-html-expansion: jQuery's htmlPrefilter expanded <tag/> to
//   <tag></tag> with a regular expression that can match inside an attribute
//   value. It returns its input unchanged now, as jQuery 3.5 and later do.
// Every page and script of the site is scanned, so the shape cannot come back
// in one copy. Run: node tests/api-pages-dom-html.test.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
function files(dir = '.') {
  const out = [];
  for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (['.git', 'node_modules', '.tools', 'tests'].includes(e.name)) continue;
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...files(rel));
    else if (/\.(html?|js|mjs|cjs)$/.test(e.name)) out.push(rel);
  }
  return out;
}

// htmlPrefilter that rewrites its input, e.g. return e.replace(Ze,"<$1></$2>")
const EXPANSION = /htmlPrefilter\s*:\s*function\s*\(\s*(\w+)\s*\)\s*\{\s*return\s+\1\s*\.\s*replace\s*\(/;
const EXPANSION_STRING = /["']<\$1><\/\$2>["']/;
// the text read back from an element, concatenated with a string holding a tag
const TEXT = String.raw`\$\([^()]*\)\s*\.\s*text\(\s*\)`;
const TAG_STRING = String.raw`(?:"[^"\n]*<[^"\n]*"|'[^'\n]*<[^'\n]*')`;
const TEXT_AS_HTML = new RegExp(`${TAG_STRING}\\s*\\+\\s*${TEXT}|${TEXT}\\s*\\+\\s*${TAG_STRING}`);

const bad = [];
let withSearch = 0;
let withJquery = 0;
for (const file of files()) {
  const src = fs.readFileSync(path.join(root, file), 'utf8');
  if (EXPANSION.test(src) || EXPANSION_STRING.test(src)) bad.push(`${file}: htmlPrefilter expands self-closing tags`);
  if (TEXT_AS_HTML.test(src)) bad.push(`${file}: DOM text is concatenated into HTML`);
  if (src.includes('htmlPrefilter:function(e){return e}')) withJquery += 1;
  if (src.includes('a.append($("<li>").append($("<a>").attr("href","#"+t.ref).text($(n).text())))')) withSearch += 1;
}
assert.deepEqual(bad, [], `${bad.length} unsafe places:\n${bad.slice(0, 20).join('\n')}`);
// the fixed code is in every one of the 86 pages, not only in some of them
assert.equal(withJquery, 86, 'every page with the old jQuery has the identity htmlPrefilter');
assert.equal(withSearch, 86, 'every page with the old search builds its results as elements');

// negative: the checks find the shapes that were there before the fix
assert.match('he.extend({htmlPrefilter:function(e){return e.replace(Ze,"<$1></$2>")},clone:', EXPANSION);
assert.match('htmlPrefilter: function( html ) { return html.replace( rxhtmlTag, "<$1></$2>" ); }', EXPANSION);
assert.doesNotMatch('htmlPrefilter:function(e){return e},clone:', EXPANSION);
assert.match(`a.append("<li><a href='#"+t.ref+"'>"+$(n).text()+"</a></li>")`, TEXT_AS_HTML);
assert.match(`x.html('<p>' + $(el).text() + '</p>')`, TEXT_AS_HTML);
assert.doesNotMatch('a.append($("<li>").append($("<a>").attr("href","#"+t.ref).text($(n).text())))', TEXT_AS_HTML);
assert.doesNotMatch(`$(".search-results li").text('No Results Found for "'+t.value+'"')`, TEXT_AS_HTML);

console.log(`API pages: ${withSearch} search scripts build elements, ${withJquery} jQuery copies do not expand self-closing tags`);
