'use strict';
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('fs'),assert=require('assert/strict');
const source=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
function setup(){return new Function('require','module','__dirname',source+';return sandbox;')(require,{},__dirname);}
const b=setup(),w=b.window,id='custom-snow-whiteout-signal';let f,s;
function fresh(d='normal'){b.document.querySelector('#difficulty').value=d;w.triumph.loadCustomMission(id);f=w.__fixture();s=f.state;}
function run(){s.mode='playing';if(w.triumph.state().paused)b.document.querySelector('#pause').onclick();f.update(.02);}
let budget=0,interval=Infinity;
for(const d of ['veryeasy','easy','normal','hard','veryhard']){fresh(d);assert.equal(s.nests.length,4);assert(s.customWaves.arrivals.length>budget);assert(s.customMission.nestInterval<interval);budget=s.customWaves.arrivals.length;interval=s.customMission.nestInterval;
 const points=[...s.customMission.commanders,...s.customMission.soldiers,...s.customMission.rescueParty,...s.customMission.nests,...s.customMission.bugs,...s.customMission.waves.flatMap(w=>w.points),...s.customMission.route,...s.customMission.support.map(p=>[p.x,p.y])];
 for(const [x,y] of points){assert(!f.blocked(x,y),`${d} clear ${x},${y}`);assert(w.TriumphNavigation.reachable(s.humans[0],{x,y},f.blocked),`${d} connected ${x},${y}`);}
 for(const n of s.nests)for(const [dx,dy] of [[-8,-8],[8,8],[-25,20],[25,20]])assert(!f.blocked(n.x+dx,n.y+dy),'Nest birth clearance');
 s.rules.maxAliens=1;s.aliens=[{alive:true,hp:1}];s.t=200;w.TriumphMissions.emitWaves(s,()=>assert.fail('Capped wave'));assert.equal(s.customWaves.emitted,0);assert(s.customWaves.queue.length>0);
}
fresh();const walker=s.humans.find(u=>u.type==='soldier');for(const [x,y] of s.customMission.route){walker.attackMove={x,y,force:true};for(let i=0;i<5000&&walker.attackMove;i++)f.attackMoveStep(walker,null,.04);assert(Math.hypot(walker.x-x,walker.y-y)<20,'Physical north outbound / south return');assert(!f.blocked(walker.x,walker.y));}
fresh();s.mode='playing';const frozen=JSON.stringify(s);f.update(100);assert.equal(JSON.stringify(s),frozen,'Tactical startup');
const u=s.humans.find(u=>u.type==='soldier');u.external={until:1e6};u.shieldUntil=1e6;u.x=865;u.y=205;run();assert(!s.rescueAcquired,'No early rescue');f.interact({...s.terminals[0]},s.terminals[0]);assert(s.terminals[0].active);s.rules.maxAliens=7;run();assert(!s.rescueAcquired);assert(f.missionProgress().label.includes('slots'));assert(!f.missionProgress().lost);s.rules.maxAliens=10;s.drops=[{finished:false,age:0,duration:1000,x:150,y:390}];run();assert(!s.rescueAcquired,'Reserved drop prevents party overflow');s.drops=[];s.rules.maxAliens=50;run();assert(s.rescueAcquired);assert.equal(s.humans.filter(u=>u.rescueSurvivor).length,3);run();assert.equal(s.humans.filter(u=>u.rescueSurvivor).length,3,'One acquisition');assert(!f.missionProgress().ready);
let rescued=s.humans.filter(u=>u.rescueSurvivor);rescued[0].x=200;rescued[0].y=390;assert(f.missionProgress().ready,'Inclusive extraction and remaining enemies');rescued[0].x=201;assert(!f.missionProgress().ready);rescued.forEach(u=>u.alive=false);assert(f.missionProgress().lost);run();assert.equal(s.mode,'defeat');
fresh();s.humans.forEach(u=>u.alive=false);run();assert.equal(s.mode,'defeat','Total army exhaustion');
fresh();s.terminals[0].active=true;const h=s.humans[0];h.x=865;h.y=205;run();assert(s.rescueAcquired);b.document.querySelector('#reset').onclick();s=w.__fixture().state;assert(!s.rescueAcquired);assert(!s.terminals[0].active);assert(!s.humans.some(u=>u.rescueSurvivor));w.triumph.loadMission(2);assert.equal(w.triumph.state().customId,null);assert.equal(w.__fixture().state.rules.minimumTime,35);
for(let eagle=0;eagle<3;eagle++){
 fresh();s.aliens=[];s.nests=[];s.customWaves=w.TriumphMissions.createWaves({...s.customMission,waves:[]});
 const p=s.pickups.filter(p=>p.type==='troops')[eagle],collector=s.humans[0],initial=s.humans.length;
 assert(p,'Three finite eagle placements');collector.x=p.x;collector.y=p.y;
 s.rules.maxAliens=s.humans.filter(u=>u.type!=='commander').length;run();assert(s.pickups.includes(p),'Full cap retains eagle');assert.equal(s.reinforcements.length,0);assert.equal(f.reinforcementStatus('troops').reason,'TROOPS FULL · WAIT FOR SPACE','HUD explains retained eagle');
 s.rules.maxAliens=50;run();assert(!s.pickups.includes(p),'Contact consumes successful eagle');assert.equal(s.pickups.filter(p=>p.type==='troops').length,2);assert.equal(s.reinforcements.length,1);
 for(let i=0;i<1800;i++){s.t+=.04;f.updateSupport(.04);}assert(s.humans.length>initial,'Real pickup carrier unload');for(const u of s.humans)assert(!f.blocked(u.x,u.y));
 f.updatePickupSpawns(1000);assert.equal(s.pickups.filter(p=>p.type==='troops').length,2,'Finite eagle never refills');
}
fresh();assert(f.reinforce('troops'));s.humans.forEach(u=>u.alive=false);run();assert.equal(s.mode,'playing','Inbound carrier keeps exhausted army recoverable');
fresh();s.terminals[0].active=true;s.humans[0].x=865;s.humans[0].y=205;s.rules.maxAliens=11;s.drops=[{finished:false,age:0,duration:1,x:150,y:390}];run();assert(s.rescueAcquired,'Exact cap includes reserved incoming soldier');f.updateSupport(2);assert.equal(s.humans.filter(u=>u.alive&&u.type!=='commander').length,11,'Landing after acquisition stays within cap');
fresh();s.terminals[0].active=true;s.humans[0].x=865;s.humans[0].y=205;run();const survivor=s.humans.find(u=>u.rescueSurvivor);survivor.x=120;survivor.y=390;run();assert.equal(s.mode,'victory','Actual update awards extracted survivor victory');const merits=s.merits;f.update(.02);assert.equal(s.merits,merits,'Single reward');
for(const m of w.TriumphCustomMissions.list.filter(m=>m.id!==id&&!m.objective?.rescueSoldiers)){w.triumph.loadCustomMission(m.id);const st=w.__fixture().state;assert(!Object.hasOwn(st,'rescueAcquired'));assert(!st.humans.some(u=>u.rescueSurvivor));}
for(let mission=1;mission<=9;mission++){w.triumph.loadMission(mission);const st=w.__fixture().state;assert(!Object.hasOwn(st,'rescueAcquired'));assert(!st.humans.some(u=>u.rescueSurvivor));}
console.log("Passed Whiteout objective, profile, route, cap and actual eagle delivery checks.");
if(!process.argv.includes("--record"))process.exit(0);
// Full runtime stationary army pressure, separate from objective-gate/route proofs.
const logs=[];for(const d of ['veryeasy','easy','normal','hard','veryhard']){const box=setup();box.document.querySelector('#difficulty').value=d;box.window.triumph.loadCustomMission(id);const fx=box.window.__fixture(),st=fx.state;st.mode='playing';box.document.querySelector('#pause').onclick();for(let i=0;i<3000&&st.mode==='playing';i++)fx.update(.02);logs.push({difficulty:d,time:+st.t.toFixed(1),mode:st.mode,army:st.humans.filter(u=>u.alive&&u.type!=='commander').length,bugs:st.aliens.length,kills:st.kills,emitted:st.customWaves.emitted,budget:st.customWaves.arrivals.length,interval:st.customMission.nestInterval});}
fs.writeFileSync('docs/design/whiteout-pressure.json',JSON.stringify({method:'Full VM runtime at .02s up to 60s, default AI at starting positions, no orders/healing/teleports. Not skilled-player challenge or completion evidence. RNG is ordinary runtime random.',logs},null,2)+'\n');console.log('Passed Whiteout five profiles, connected placements/approaches/births, cap-retained waves, tactical freeze, relay/rescue/cap/one-shot/extraction/loss/restart/original isolation. Stationary pressure:',JSON.stringify(logs));
