'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../hall-of-fame');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const rows = index.match(/<tr>[\s\S]*?<\/tr>/g).filter(row => row.includes('<b>RelayBleed</b>'));
assert.equal(rows.length, 1);
const cells = rows[0].match(/<td\b[^>]*>[\s\S]*?<\/td>/g);
assert.equal(cells.length, 8);
assert.match(cells[4], /^<td valign="top"><b><a href="https:\/\/github.com\/xet7">xet7<\/a><\/b><\/td>$/);
// Found and fixed by the maintainer, no GHSA: three stars (Audit-Stars.md).
assert.equal((cells[5].match(/GoldStar.png/g) || []).length, 3);
assert.match(cells[6], /<details><summary>Process<\/summary>[\s\S]*Found while auditing/);
assert.match(cells[7], /<details><summary>Details<\/summary>/);
// Newest first: above SyncBleed.
assert.ok(index.indexOf('<b>RelayBleed</b>') < index.indexOf('<b>SyncBleed</b>'));
const page = fs.readFileSync(path.join(root, 'relaybleed/index.html'), 'utf8');
assert.doesNotMatch(page, /<details>/);
assert.match(page, /not yet released/);
assert.match(page, /CWE-522/);
assert.match(page, /trello.com/);
assert.match(page, /https:\/\/github\.com\/wekan\/wekan\/commit\/de67550476/);
assert.match(page, /Admin Panel → Problems/);
console.log('RelayBleed Hall of Fame: structure, attribution, fix evidence and limits pass');
