'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../hall-of-fame');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const rows = index.match(/<tr>[\s\S]*?<\/tr>/g).filter(row => row.includes('<b>CacheBleed</b>'));
assert.equal(rows.length, 1);
const cells = rows[0].match(/<td\b[^>]*>[\s\S]*?<\/td>/g);
assert.equal(cells.length, 8);
assert.match(cells[4], /^<td valign="top"><b><a href="https:\/\/github.com\/alham-rizvi">alham-rizvi<\/a><\/b><\/td>$/);
// A GHSA with details and a suggested fix: five stars (Audit-Stars.md).
assert.equal((cells[5].match(/GoldStar.png/g) || []).length, 5);
assert.match(cells[6], /<details><summary>Process<\/summary>[\s\S]*GHSA-w3qg-pf27-g68r/);
assert.match(cells[7], /<details><summary>Details<\/summary>/);
// Newest first: above ReplyBleed.
assert.ok(index.indexOf('<b>CacheBleed</b>') < index.indexOf('<b>ReplyBleed</b>'));
const page = fs.readFileSync(path.join(root, 'cachebleed/index.html'), 'utf8');
assert.doesNotMatch(page, /<details>/);
assert.match(page, /not yet released/);
assert.match(page, /CWE-524/);
assert.match(page, /private, no-cache/);
assert.match(page, /https:\/\/github\.com\/wekan\/wekan\/commit\/77c3957e5c/);
assert.match(page, /Admin Panel → Problems/);
console.log('CacheBleed Hall of Fame: structure, attribution, fix evidence and limits pass');
