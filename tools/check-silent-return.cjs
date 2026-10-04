'use strict';
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
const box=new Function('require','module','__dirname',source+'\nreturn sandbox;')(require,{},__dirname),w=box.window,api=w.triumph,id='custom-flash-silent-return';
assert(fs.readFileSync('index.html','utf8').includes('value="custom-flash-silent-return"'));
let f,s,u;function fresh(){api.loadCustomMission(id);f=w.__fixture();s=f.state;u=s.humans.find(u=>u.type==='commando');f.selection.add(u);}
function step(job){f.useOrderTo(job);for(let i=0;i<4000&&!u.useOrder.done;i++){s.t+=.04;f.useOrderStep(u,.04);}assert(u.useOrder.done,'Actual use route completes');f.useOrderStep(u,.04);}
function go(x,y){u.attackMove={x,y,force:true};for(let i=0;i<4000&&u.attackMove;i++){s.t+=.04;f.attackMoveStep(u,null,.04);}assert(Math.hypot(u.x-x,u.y-y)<20,`Actual force route ${x},${y}`);assert(!f.blocked(u.x,u.y));}
fresh();assert.equal(s.humans.length,8);assert.equal(s.aliens.length,6);assert.equal(s.originalMap.index,9);assert.equal(s.nests.length,3);assert.equal(s.customWaves.arrivals.length,14);
const proposal=JSON.parse(fs.readFileSync('docs/design/custom-missions.json')).missions[2];assert.deepEqual(JSON.parse(JSON.stringify(s.pickups)),[...proposal.support,...proposal.weapons]);assert.deepEqual(JSON.parse(JSON.stringify(s.aliens.map(a=>[a.x,a.y]))),proposal.bugs);
const door=s.doors.find(d=>d.object===252),access=s.terminals[0],laser=s.terminals[1];
assert(!w.TriumphNavigation.reachable({x:840,y:392},{x:836,y:262},f.blocked),'Locked laser room inaccessible');
assert(!f.missionProgress().ready);laser.active=true;for(const h of s.humans){h.x=392;h.y=72;}assert(!f.missionProgress().ready,'Laser alone insufficient');laser.active=false;
// Restore commando starting point and execute real outbound terminal/door/laser use and return.
u.x=392;u.y=136;step({kind:'terminal',target:access,...access});assert(access.used);assert(!door.locked);assert(!door.open);assert(!f.missionProgress().ready,'Access alone insufficient');
go(840,392);step({kind:'door',target:door,x:door.cx,y:door.cy});assert(door.open);go(836,300);step({kind:'terminal',target:laser,...laser});assert(laser.active);go(840,392);
// Explicitly close then open from the return side, preserving group use semantics.
go(836,300);step({kind:'door',target:door,x:door.cx,y:door.cy});assert(!door.open);s.t+=1;step({kind:'door',target:door,x:door.cx,y:door.cy});assert(door.open);go(840,392);go(392,72);s.customAirPending=false;
assert(f.missionProgress().ready,'Remaining bugs do not block extraction');u.y=72;u.x=489;assert(!f.missionProgress().ready);u.x=488;assert(f.missionProgress().ready,'Inclusive radius');
assert(f.reinforce('air'));assert(!f.missionProgress().ready,'Real inbound aircraft blocks');for(let i=0;i<1000;i++){s.t+=.02;f.updateSupport(.02);}assert.equal(s.reinforcements.length+s.drops.length,0);assert(s.humans.length>8);assert(!f.missionProgress().ready,'Actual delivered commandos must return');for(const h of s.humans){h.x=392;h.y=72;}assert(f.missionProgress().ready);s.drops.push({finished:false});assert(!f.missionProgress().ready);s.drops=[];
s.humans.find(h=>h.id===1).alive=false;assert(f.missionProgress().ready,'Dead commander need not return');s.humans.forEach(h=>{if(h.type!=='commander')h.alive=false;});assert(!f.missionProgress().ready,'Noncommander required');
fresh();s.mode='playing';const frozen=JSON.stringify(s);f.update(5);assert.equal(JSON.stringify(s),frozen);s.terminals.forEach(t=>{t.active=t.used=true;});box.document.querySelector('#reset').onclick();assert(w.__fixture().state.terminals.every(t=>!t.active&&!t.used));
for(const difficulty of ['veryeasy','easy','normal','hard','veryhard']){box.document.querySelector('#difficulty').value=difficulty;box.document.querySelector('#difficulty').onchange();assert.equal(api.state().customId,id);assert(w.__fixture().state.terminals.every(t=>!t.active&&!t.used));}
fresh();s.customAirPending=false;s.terminals.forEach(t=>t.active=t.used=true);s.humans.forEach(h=>{h.x=392;h.y=72;h.external={until:1e6};h.shieldUntil=1e6;});s.aliens=[];s.mode='playing';box.document.querySelector('#pause').onclick();f.update(.02);assert.equal(s.mode,'victory');const merits=s.merits;f.update(1);assert.equal(s.merits,merits);api.loadMission(3);assert.equal(api.state().merits,0);assert.equal(w.__fixture().state.rules.minimumTime,35);assert(w.__fixture().state.rules.victoryTerminals.includes(257));api.loadCustomMission(id);assert.equal(api.state().merits,merits);
fresh();s.humans.forEach(h=>h.alive=false);s.mode='playing';box.document.querySelector('#pause').onclick();f.update(.02);assert.equal(s.mode,'defeat','Ordinary total exhaustion loses');
console.log('Passed Silent Return legitimate unlock, actual outbound/open/laser/return movement, extraction radius/living/support gates, tactical/reset/difficulty/reward/original isolation.');


