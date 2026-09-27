'use strict';
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../hall-of-fame');const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [name,reporter,stars]of [['LdapBindBleed','kta1kri',5],['DirectoryGroupBleed','xet7',3],['SamlReplayBleed','xet7',3]]){
 const rows=index.match(/<tr>[\s\S]*?<\/tr>/g).filter(row=>row.includes(`<b>${name}</b>`));assert.equal(rows.length,1,name);
 const cells=rows[0].match(/<td\b[^>]*>[\s\S]*?<\/td>/g);assert.equal(cells.length,8,name);
 assert.ok(cells[1].includes('fa-tint'));assert.ok(!cells[2].includes('fa-'));
 assert.ok(cells[4].includes(`https://github.com/${reporter}`));
 assert.equal((cells[5].match(/GoldStar.png/g)||[]).length,stars);
 assert.match(cells[6],/<details><summary>Process<\/summary>/);
 assert.match(cells[7],/<details><summary>Details<\/summary>/);
 const page=fs.readFileSync(path.join(root,name.toLowerCase(),'index.html'),'utf8');
 assert.doesNotMatch(page,/<details>/);assert.match(page,/<h2 class="hof">Details<\/h2>/);
 assert.match(page,/679a8b349/);assert.match(page,/No CVE assigned/);assert.match(page,/Upcoming release/);
 assert.doesNotMatch(page,/fixed in v\d/i);
 assert.match(page,/not tested/);
}
assert.match(fs.readFileSync(path.join(root,'ldapbindbleed/index.html'),'utf8'),/disabled by default/);
console.log('Authentication Hall of Fame: eight-column rows, credit, stars, collapsed index, fix links and verification limits pass.');
