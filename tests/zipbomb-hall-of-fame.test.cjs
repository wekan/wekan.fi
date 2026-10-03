'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../hall-of-fame');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const rows = index.match(/<tr>[\s\S]*?<\/tr>/g).filter(row => row.includes('<b>ZipBombBleed</b>'));
assert.equal(rows.length, 1);
const cells = rows[0].match(/<td\b[^>]*>[\s\S]*?<\/td>/g);
assert.equal(cells.length, 8);
assert.equal(cells[0], '<td valign="top">-</td>');
assert.match(cells[1], /fa-tint" style="color: red;"/);
assert.equal(cells[3], '<td valign="top">2026-10-02</td>');
// Preserve the original credit and acknowledge the independent GHSA reporter.
assert.match(cells[4], /href="https:\/\/github.com\/xet7">xet7/);
assert.match(cells[4], /href="https:\/\/github.com\/alham-rizvi">alham-rizvi/);
// Original audit rating: three stars (Audit-Stars.md).
assert.equal((cells[5].match(/GoldStar.png/g) || []).length, 3);
assert.match(cells[6], /<details><summary>Process<\/summary>[\s\S]*Found while auditing/);
assert.match(cells[7], /<details><summary>Details<\/summary>/);
assert.match(cells[7], /<a href="zipbombbleed\/">Fix and verification<\/a>/);
// Newest first: above CasTokenBleed.
assert.ok(index.indexOf('<b>ZipBombBleed</b>') < index.indexOf('<b>CasTokenBleed</b>'));
const page = fs.readFileSync(path.join(root, 'zipbombbleed/index.html'), 'utf8');
assert.doesNotMatch(page, /<details>/);
assert.match(page, /not yet released/);
assert.match(page, /CWE-409/);
assert.match(page, /GHSA-rmcq-68x2-3g5j/);
assert.match(page, /Chromium, Firefox and WebKit each passed/);
assert.match(page, /readZipEntryBounded/);
assert.match(page, /entry.vars.uncompressedSize/);
assert.match(page, /https:\/\/github\.com\/wekan\/wekan\/commit\/e7ed71ee2e/);
assert.match(page, /Admin Panel → Problems/);
assert.match(page, /<h2>Detection<\/h2>\n<p>None\./);
console.log('ZipBombBleed Hall of Fame: structure, attribution, fix evidence and limits pass');
