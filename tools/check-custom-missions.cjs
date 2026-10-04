'use strict';
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
const sandbox=new Function('require','module','__dirname',source+'\nreturn sandbox;')(require,{},__dirname),w=sandbox.window,api=w.triumph;
const id='custom-rocks-relay';
const fixture=()=>w.__fixture();
function clear(s){s.aliens=[];s.vents=[];for(const n of s.nests)n.hp=0;}
for(const order of [[0,1],[1,0]]){
 api.loadCustomMission(id);let f=fixture(),s=f.state;
 assert.equal(s.originalMap.index,7);assert.equal(api.missions.length,9);assert.equal(s.humans.length,12);assert.equal(s.aliens.length,6);assert.equal(s.nests.length,2);assert.equal(new Set(s.terminals.map(t=>t.key)).size,2);
 assert.equal(s.flowers.length,0);assert.equal(s.wave,null);assert.equal(s.vents.length,0);const pickups=JSON.stringify(s.pickups);f.spawnPickupRoll(24);f.updatePickupSpawns(300);assert.equal(JSON.stringify(s.pickups),pickups);
 clear(s);assert(!f.missionProgress().ready);
 for(const [i,index] of order.entries()){const t=s.terminals[index];f.interact({...t},t);assert.equal(t.active,true);assert.equal(f.missionProgress().ready,i===1);}
 s.aliens=[{alive:true,hp:1}];assert(!f.missionProgress().ready);s.aliens=[];s.vents=[{phase:'drop'}];assert(!f.missionProgress().ready);s.vents=[];
 s.nests[0].hp=50;s.nests[0].breeding.busy=true;assert(!f.missionProgress().ready);s.nests[0].hp=0;
 s.mode='playing';const before=JSON.stringify(s);f.update(2);assert.equal(JSON.stringify(s),before,'Tactical freeze');
 // Resume with a protected army, then real update cancels the dead pending birth and wins once.
 sandbox.document.querySelector('#pause').onclick();for(const u of s.humans){u.external={until:1e6};u.shieldUntil=1e6;}f.update(.02);assert.equal(s.mode,'victory');assert.equal(s.aliens.length,0);const merits=s.merits;f.update(1);assert.equal(s.merits,merits);
 sandbox.document.querySelector('#start').onclick();s=fixture().state;assert.equal(s.customId,id);assert.equal(s.t,0);assert(s.terminals.every(t=>!t.active));assert.equal(s.merits,merits);
}
api.loadMission(1);assert.equal(api.state().merits,0,'Custom wins do not award original merits');fixture().state.merits=77;api.loadCustomMission(id);assert(api.state().merits>0);api.loadMission(9);assert.equal(api.state().merits,77);
api.loadCustomMission(id);for(const difficulty of ['hard','normal','easy']){sandbox.document.querySelector('#difficulty').value=difficulty;sandbox.document.querySelector('#difficulty').onchange();const s=fixture().state;assert.equal(s.customId,id);assert(s.terminals.every(t=>!t.active));assert(s.nests.every(n=>difficulty==='normal'?n.breeding:!n.breeding));}
let f=fixture(),s=f.state;assert(f.reinforcementRule('troops'));assert(f.reinforcementRule('tank'));assert(f.addRally({x:256,y:256}));assert(f.reinforce('troops'));for(let i=0;i<1500;i++)f.updateSupport(.04);assert(s.humans.some(u=>u.attackMove?.rally),'Delivered troops receive rally');const tankBefore=s.humans.filter(u=>u.type==='tank').length;assert(f.reinforce('tank'));for(let i=0;i<1500;i++)f.updateSupport(.04);assert(s.humans.filter(u=>u.type==='tank').length>tankBefore);for(const u of s.humans.filter(u=>u.type==='tank'))assert(!f.blocked(u.x,u.y),'Tank delivered to clear terrain');
const deliveredTank=s.humans.find(u=>u.type==='tank');const tankStart={x:deliveredTank.x,y:deliveredTank.y};for(let i=0;i<200;i++)f.attackMoveStep(deliveredTank,null,.04);assert(Math.hypot(deliveredTank.x-tankStart.x,deliveredTank.y-tankStart.y)>8,'Delivered tank moves along rally route');assert(!f.blocked(deliveredTank.x,deliveredTank.y));
api.loadCustomMission(id);f=fixture();s=f.state;assert.equal(s.crystal,null);assert(!s.humans.some(u=>u.type==='tank'));for(const u of s.humans)assert.equal(w.ORIGINAL.objects[u.object].name,u.id?(u.id===1?'Commander1':`Commander ${u.id}`):'Troop');const troop=s.humans.find(u=>u.type==='soldier');while(s.humans.filter(u=>u.type==='soldier').length<s.rules.maxAliens)s.humans.push({...troop});assert(f.reinforcementRule('troops'),'Outdoor source carrier remains eligible at infantry cap');s.aliens=Array.from({length:s.rules.maxAliens},()=>({alive:true,hp:4,type:'soldier',x:968,y:648,angle:0,cool:1e6,external:{until:1e6}}));s.mode='playing';sandbox.document.querySelector('#pause').onclick();s.aliens=[{alive:true,hp:4,type:'soldier',x:968,y:700,angle:0,cool:1e6}];const birth=s.nests[0];birth.breeding=null;birth.timer=0;const oldCap=s.rules.maxAliens;s.rules.maxAliens=1;f.update(.04);assert.equal(s.aliens.length,1,'Nest honors ordinary bug cap');s.rules.maxAliens=oldCap;s.aliens=[];birth.timer=0;f.update(.04);assert.equal(s.aliens.length,1,'Nest resumes below cap');s.terminals[0].active=true;sandbox.document.querySelector('#reset').onclick();assert(fixture().state.terminals.every(t=>!t.active));sandbox.document.querySelector('#mission').onchange({target:{value:'0'}});assert.equal(api.state().customId,null);sandbox.document.querySelector('#mission').onchange({target:{value:id}});assert.equal(api.state().customId,id);
assert.throws(()=>api.loadCustomMission('missing'));assert.throws(()=>api.loadMission(10));
console.log('Passed Relay Breaker relay orders/unique keys, clearance/birth/freeze gates, replay, difficulty, merit isolation, source support and rally delivery. Live playability unverified.');
