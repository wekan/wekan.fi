'use strict';
// Every page with a "Privacy Policy" item in its top menu has "Terms of Service" just before it (to its
// left), pointing at /terms/ with the path right for the page's depth, and /terms/ is built on the same page
// template and menu as the other pages. Run: node tests/terms-menu.test.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
function pages(dir = '.') {
  const out = [];
  for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...pages(rel));
    else if (e.name === 'index.html') out.push(path.normalize(rel));
  }
  return out;
}

// the top menu is the block of `btn btn-link text-white` links in the page header
const menuOf = html => html.match(/^[ \t]*<a class="btn btn-link text-white"[^\n]*<\/a>$/gm) || [];
const hrefOf = a => /href="([^"]*)"/.exec(a)[1];

let withPrivacy = 0;
for (const page of pages()) {
  const html = read(page);
  const menu = menuOf(html);
  const at = menu.findIndex(a => /Privacy Policy/.test(a));
  if (at < 0) continue;
  withPrivacy += 1;
  const up = page === 'index.html' ? '' : '../';
  assert.ok(at > 0, `${page}: Privacy Policy cannot be the first item`);
  const before = menu[at - 1];
  assert.match(before, /Terms of Service/, `${page}: Terms of Service is not directly left of Privacy Policy`);
  // on /terms/ itself the item is the current page, like Privacy Policy on /privacy/
  assert.equal(hrefOf(before), page === 'terms/index.html' ? '.' : `${up}terms/`, `${page}: the Terms link is wrong for this depth`);
  // negative: exactly one, and the Privacy link keeps its own path
  assert.equal(menu.filter(a => /Terms of Service/.test(a)).length, 1, `${page}: Terms of Service appears twice in the menu`);
  const privacy = hrefOf(menu[at]);
  assert.ok(privacy === `${up}privacy/` || (page === 'privacy/index.html' && privacy === '.'), `${page}: the Privacy link changed to ${privacy}`);
}
assert.ok(withPrivacy >= 13, `expected the 13 menu pages, found ${withPrivacy}`);

// the pages where the menu is the same as the others' but has no Privacy item are not touched
for (const page of pages()) {
  const html = read(page);
  if (menuOf(html).some(a => /Privacy Policy/.test(a))) continue;
  assert.doesNotMatch(menuOf(html).join('\n'), /Terms of Service/, `${page}: has a Terms item but no Privacy item`);
}

// /terms/ is built on the Privacy page's template: same head, same header and menu, same footer
const terms = read('terms/index.html');
const priv = read('privacy/index.html');
const between = (s, a, b) => s.slice(s.indexOf(a), s.indexOf(b));
assert.match(terms, /<link rel="stylesheet" href="\.\.\/css\/bootstrap\.min\.css" \/>/);
assert.equal(between(terms, '<!-- Use same styles', '</head>'), between(priv, '<!-- Use same styles', '</head>'), 'same styles');
assert.equal(between(terms, '<body>', '<div class="container-fluid bg-white">').replace(/Terms of Service<\/b>/, 'X').replace(/\n[^\n]*href="\.\.\/privacy\/"[^\n]*/, ''),
  between(priv, '<body>', '<div class="container-fluid bg-white">').replace(/Privacy Policy<\/b>/, 'X').replace(/\n[^\n]*href="\.\.\/terms\/"[^\n]*/, ''), 'same header');
assert.equal(terms.slice(terms.indexOf('<div class="container-fluid wekan-dark-blue">\n        <div class="container px-4')),
  priv.slice(priv.indexOf('<div class="container-fluid wekan-dark-blue">\n        <div class="container px-4')), 'same footer');
const tmenu = menuOf(terms);
const items = tmenu.map(a => a.replace(/<[^>]*>/g, '').trim());
assert.deepEqual(items.slice(items.indexOf('Terms of Service')), ['Terms of Service', 'Privacy Policy', 'Blog']);
assert.match(tmenu[items.indexOf('Terms of Service')], /aria-current="page" href="\."><b>Terms of Service<\/b>/, 'Terms is the current page');
assert.equal(items.slice(0, 13).join(','), 'Home,Status,Docs,Install,Upgrade,SaaS,App,Sponsors,Awards,Success,FLOSS Developers Only,Private Paid Commercial Support,Sponsor');
// negative: the old stand-alone page's own styles are gone
assert.doesNotMatch(terms, /max-width: 800px/);
assert.doesNotMatch(terms, /<div class="footer">/);
// the text is all still there
for (const heading of ['1. Overview and Open Source License', '2. Services and Commercial Support', '3. User Responsibilities',
  '4. Disclaimer of Warranties', '5. Limitation of Liability', '6. Privacy Policy', '7. Changes to Terms', '8. Contact Information']) {
  assert.ok(terms.includes(`<h2>${heading}</h2>`), `${heading} is missing`);
}
assert.match(terms, /<strong>Last updated:<\/strong> November 2026/);

// the body links to /terms/ beside the Privacy ones
assert.match(read('docs/index.html'), /href="https:\/\/wekan\.fi\/terms\/">Terms of Service<\/a>\n\s*<a class="btn btn-link" href="https:\/\/wekan\.fi\/privacy\/">/);
assert.match(read('saas/index.html'), /<h2>Terms of Service<\/h2>[\s\S]*<h2>Privacy Policy<\/h2>/);
assert.match(read('app/index.html'), /href="https:\/\/wekan\.fi\/terms\/">Terms of Service<\/a><\/p>\n\s*<p><a href="https:\/\/wekan\.fi\/privacy">/);

console.log(`Terms of Service menu: ${withPrivacy} pages link /terms/ left of Privacy, and /terms/ uses the common template`);
