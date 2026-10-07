'use strict';
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('fs'),assert=require('assert/strict');
const source=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
const b=new Function('require','module','__dirname',source+';sandbox.testContext=ctx;return sandbox;')(require,{},__dirname),w=b.window;
// Immutable pre-ticket mission data: only supply brief text, Dunes caches and TRI-052 scheduled x may differ.
const prior={window:{}};require('vm').runInNewContext(require('child_process').execFileSync('git',['show','69e4f9af76ddc4292eff270eac7891a4be0e8698:src/custom-missions.js'],{encoding:'utf8',windowsHide:true}),prior);
for(const d of ['veryeasy','easy','normal','hard','veryhard'])for(const m of prior.window.TriumphCustomMissions.list){const now=JSON.parse(JSON.stringify(w.TriumphCustomMissions.resolve(m.id,d))),old=JSON.parse(JSON.stringify(prior.window.TriumphCustomMissions.resolve(m.id,d)));delete now.brief;delete old.brief;delete now.environment;delete now.worldRoster;delete now.optInSniper;delete now.snipers;if(m.id==='custom-flash-silent-return'){assert.deepEqual(now.scheduledAir,{at:20,points:[[472,328],[520,392],[568,520]]});now.scheduledAir.points.forEach(p=>p[0]=520);}if(m.id==='custom-desert-beneath-dunes'){assert.deepEqual(now.support,[{type:'troops',object:63,x:250,y:230},{type:'troops',object:63,x:330,y:590}]);now.support=[];}assert.deepEqual(now,old,'Only approved supply/text/scheduled-x delta '+m.id+' '+d);}
let f,s;
function fresh(id,d='normal'){b.document.querySelector('#difficulty').value=d;w.triumph.loadCustomMission(id);f=w.__fixture();s=f.state;f.setSeed(51051);}
function count(){return s.humans.filter(u=>u.alive&&['soldier','commando'].includes(u.type)).length;}
function support(seconds=72){for(let i=0;i<seconds/.04;i++){s.t+=.04;f.updateSupport(.04);}}
function contact(u){u.external={until:1e6};s.mode='playing';if(w.triumph.state().paused)b.document.querySelector('#pause').onclick();s.aliens=[];s.nests=[];s.customWaves=w.TriumphMissions.createWaves({...s.customMission,waves:[]});f.update(.02);}
const records=[];
for(const m of w.TriumphCustomMissions.list)for(const d of ['veryeasy','easy','normal','hard','veryhard']){
 fresh(m.id,d);const expected=JSON.parse(JSON.stringify(s.pickups.filter(p=>['troops','air','tank'].includes(p.type))));
 if(m.role==='rescue')assert.deepEqual(expected.map(p=>[p.type,p.x,p.y]),m.id==='custom-desert-beneath-dunes-variant-b'?[['troops',280,420],['troops',820,370]]:[['troops',250,230],['troops',330,590]]);
 for(let index=0;index<expected.length;index++){
  fresh(m.id,d);s.customAirPending=false;const p=s.pickups.filter(p=>['troops','air','tank'].includes(p.type))[index],u=s.humans[0],before=s.humans.length;
  // Physical commander navigation from authored spawn, no terrain/door clearing or teleport.
  for(let i=0;i<9000&&Math.hypot(u.x-p.x,u.y-p.y)>15;i++){s.t+=.04;f.navigate(u,p.x-u.x,p.y-u.y,.04,85);}
  assert(Math.hypot(u.x-p.x,u.y-p.y)<=15,m.name+' actual cache route '+p.type);
  if(p.type!=='tank'){
   const current=count();s.rules.maxAliens=current;contact(u);assert(s.pickups.includes(p),'Cap-full real contact retains '+m.name);assert.equal(s.reinforcements.length,0);assert.equal(f.reinforcementStatus(p.type).reason,'TROOPS FULL · WAIT FOR SPACE');const labels=[],oldFill=b.testContext.fillText;b.testContext.fillText=value=>labels.push(value);f.drawSprites();b.testContext.fillText=oldFill;assert(labels.includes('TROOPS FULL · WAIT FOR SPACE'),'Real renderer explains cap-full custom cache');
   s.rules.maxAliens=current+1;s.drops=[{x:u.x,y:u.y,age:0,duration:1000,finished:false}];contact(u);assert(s.pickups.includes(p),'Pending landing reserves final slot');s.drops=[];
  }
  s.rules.maxAliens=50;contact(u);assert(!s.pickups.includes(p),'Actual contact calls '+p.type);support();const delivered=s.humans.slice(before);assert(delivered.length>0,'Real support delivery '+m.name+' '+p.type);assert.equal(s.reinforcements.length+s.drops.length,0,'Support finishes');
  for(const troop of delivered){assert(!f.blocked(troop.x,troop.y),'Landing is clear');assert(w.TriumphNavigation.reachable(u,troop,f.blocked),'Landing connected to collector');}
  const left=s.pickups.length;f.updatePickupSpawns(1000);assert.equal(s.pickups.length,left,'No finite cache refill');
  if(d==='normal')records.push({mission:m.name,type:p.type,cache:[p.x,p.y],delivered:delivered.length,landing:delivered.map(t=>[+t.x.toFixed(1),+t.y.toFixed(1)])});
  b.document.querySelector('#reset').onclick();s=w.__fixture().state;assert.equal(s.t,0);assert.equal(s.reinforcements.length+s.drops.length,0);assert.deepEqual(JSON.parse(JSON.stringify(s.pickups.filter(p=>['troops','air','tank'].includes(p.type)))),expected,'Restart restores only authored supply');
 }
}
// Soldier attack-move and commando explicit-use contact use real starting geometry.
for(const id of ['custom-rocks-relay','custom-base-last-convoy','custom-flash-silent-return','custom-snow-whiteout-signal','custom-maritime-harbor-watch']){
 fresh(id);s.customAirPending=false;s.aliens=[];s.nests=[];const u=s.humans.find(u=>['soldier','commando'].includes(u.type)),p=s.pickups.find(p=>['troops','air'].includes(p.type));
 if(u.type==='soldier'){u.attackMove={x:p.x,y:p.y};for(let i=0;i<9000&&s.pickups.includes(p);i++){s.t+=.04;f.attackMoveStep(u,null,.04);}assert(!s.pickups.includes(p),'Soldier attackmove contact '+id);}
 else{f.selection.add(u);f.useOrderTo({kind:'pickup',target:p,...p});for(let i=0;i<9000&&!u.useOrder.done;i++){s.t+=.04;f.useOrderStep(u,.04);}assert(!s.pickups.includes(p),'Commando uses accessible blue cache without access unlock');assert(!s.terminals[0].used);assert(s.doors.find(d=>d.object===244).open);}
}
// Existing specialist population remains outside recovered infantry cap; arriving soldiers count.
fresh('custom-desert-beneath-dunes');assert.equal(count(),0);assert(s.humans.some(u=>u.type==='field-mechanic'));s.rules.maxAliens=1;assert(f.reinforce('troops'));support();assert.equal(count(),1,'Carrier stops at one infantry slot on Dunes');
// A real pending air landing reserves the last slot against an already inbound carrier.
fresh('custom-rocks-relay');const baseCount=count();s.rules.maxAliens=baseCount+1;assert(f.reinforce('air'));assert(f.reinforce('troops'));let reserved=false;
for(let i=0;i<1800;i++){s.t+=.04;f.updateSupport(.04);if(s.drops.length)reserved=true;assert(count()+s.drops.filter(d=>!d.finished).length<=s.rules.maxAliens,'Overlapping real carrier/air landing stays reserved and capped');}assert(reserved,'Real aircraft produced airborne reservation');assert.equal(count(),baseCount+1);assert.equal(s.drops.length,0);
// Optional air drops reserve slots, do not overflow, and later landing/cap release works.
fresh('custom-flash-silent-return');s.customAirPending=false;const initial=count();s.rules.maxAliens=initial+1;assert(f.reinforce('air'));support();assert.equal(count(),initial+1);assert.equal(s.drops.length,0);
// Scheduled formation stays three, waits and reserves at cap, then exactly three deliveries.
fresh('custom-flash-silent-return');s.rules.maxAliens=count();s.t=20;f.updateSupport(.02);assert.equal(s.reinforcements.filter(r=>r.scheduledTarget).length,3);support(10);assert.equal(s.drops.length,0);assert(s.reinforcements.every(r=>r.y===r.scheduledTarget.y));s.rules.maxAliens=count()+3;support(15);assert.equal(count(),7);assert.equal(s.reinforcements.length+s.drops.length,0);
for(let i=1;i<=9;i++){w.triumph.loadMission(i);const st=w.__fixture().state;assert(!st.customMission);assert(!st.customAirPending);assert.equal(st.reinforcements.length+st.drops.length,0);}
console.log('Passed all seven customs/five profiles real cache routes, contact/cap/reservation/retry/delivery/connected landing/finite supply/restart, troop orders, Silent optional/scheduled air and original isolation.');
console.log(JSON.stringify(records));
