'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../hall-of-fame');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const rows = index.match(/<tr>[\s\S]*?<\/tr>/g).filter(row => row.includes('<b>SyncBleed</b>'));
assert.equal(rows.length, 1);
const cells = rows[0].match(/<td\b[^>]*>[\s\S]*?<\/td>/g);
assert.equal(cells.length, 8);
assert.match(cells[4], /^<td valign="top"><b><a href="https:\/\/github.com\/alham-rizvi">alham-rizvi<\/a><\/b><\/td>$/);
// A GHSA with details and a suggested fix: five stars (Audit-Stars.md).
assert.equal((cells[5].match(/GoldStar.png/g) || []).length, 5);
assert.match(cells[6], /<details><summary>Process<\/summary>[\s\S]*GHSA-5q84-p3vr-f3xv/);
assert.match(cells[7], /<details><summary>Details<\/summary>/);
// Newest first: above CacheBleed.
assert.ok(index.indexOf('<b>SyncBleed</b>') < index.indexOf('<b>CacheBleed</b>'));
const page = fs.readFileSync(path.join(root, 'syncbleed/index.html'), 'utf8');
assert.doesNotMatch(page, /<details>/);
assert.match(page, /not yet released/);
assert.match(page, /CWE-918/);
assert.match(page, /fetchSafe/);
assert.match(page, /https:\/\/github\.com\/wekan\/wekan\/commit\/2172f19d88/);
assert.match(page, /Admin Panel → Problems/);
console.log('SyncBleed Hall of Fame: structure, attribution, fix evidence and limits pass');
