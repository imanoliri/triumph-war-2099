'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');process.chdir(root);
const html=fs.readFileSync('index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){const file=match[1];if(file==='assets/audio/gm-bank.js')continue;if(/^(https?:|#)/.test(file))continue;assert(fs.existsSync(file),'Missing runtime reference: '+file);}
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);for(const file of ['src/breeding.js','src/balance.js','src/custom-missions.js','src/missions.js','src/rally.js','src/vent-bugs.js','src/desert-worm.js','src/desert-riders.js','src/projectiles.js','src/combat.js','src/orders.js','src/input.js','src/input-dom.js','src/support-lifecycle.js'])assert(scripts.indexOf(file)>=0&&scripts.indexOf(file)<scripts.indexOf('game.js'),'Module must precede game.js');
for(const file of ['AGENTS.md','docs/WORKFLOW.md','docs/SETUP.md','docs/DESIGN.md','docs/ARCHITECTURE.md','docs/STATUS.md','docs/BACKLOG.md','docs/PLAYTEST.md','docs/templates/TASK.md','docs/templates/SESSION.md'])assert(fs.existsSync(file),'Missing project handoff: '+file);
assert.equal(JSON.parse(fs.readFileSync('package.json','utf8')).private,true);
assert.equal(fs.readdirSync('assets/images').filter(f=>f.endsWith('.png')).length,995);assert.equal(fs.readdirSync('assets/maps').filter(f=>f.endsWith('.png')).length,9);
const catalog=JSON.parse(fs.readFileSync('assets/audio/catalog.json','utf8'));assert.equal(catalog.filter(a=>a.kind==='sound').length,62);assert.equal(catalog.filter(a=>a.kind==='music').length,14);for(const entry of catalog){assert(fs.existsSync('assets/audio/'+entry.file));if(entry.pcm)assert(fs.existsSync('assets/audio/'+entry.pcm));}
console.log('Passed runtime references/load order, portable project docs, private package and complete shipped asset counts.');
