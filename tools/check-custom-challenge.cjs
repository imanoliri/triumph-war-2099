'use strict';
const fs=require('fs'),assert=require('assert/strict');
const fixture=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
const baseline=fs.readFileSync('src/custom-missions.js','utf8'); // Base profiles preserve pre-TRI-034 parameters.
function setup(before){let seed=34;const deterministic=Object.create(Math);deterministic.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const patched=fixture.replace('const sandbox={console,Math,','const sandbox={console,Math:deterministic,').replace("let source=fs.readFileSync(''+file,'utf8');","let source=before&&file==='src/custom-missions.js'?baseline:fs.readFileSync(''+file,'utf8');");
 const box=new Function('require','module','__dirname','before','baseline','deterministic',patched+'\nreturn sandbox;')(require,{},__dirname,before,baseline,deterministic);
 if(before) box.window.TriumphCustomMissions={...box.window.TriumphCustomMissions,resolve:box.window.TriumphCustomMissions.get};return box;}
// Focused bounded regressions; full combat probe runs only with --record.
for(const difficulty of ['normal','hard','veryhard'])for(const id of ['custom-rocks-relay','custom-base-last-convoy']){
 const box=setup(false),w=box.window;box.document.querySelector('#difficulty').value=difficulty;w.triumph.loadCustomMission(id);let f=w.__fixture(),s=f.state;
 const expected=id==='custom-rocks-relay'?{normal:22,hard:33,veryhard:44}:{normal:26,hard:80,veryhard:120};assert.equal(s.customWaves.arrivals.length,expected[difficulty]);
 for(const a of [...s.humans,...s.aliens,...s.nests,...s.pickups,...s.customWaves.arrivals])assert(!f.blocked(a.x,a.y),'Existing hotspot must be traversable');
 s.aliens=[];s.nests.forEach(n=>n.hp=0);s.terminals.forEach(t=>t.active=true);s.t=120;
 if(expected[difficulty])assert(!f.missionProgress().ready,'Pending arrivals gate victory');
 const total=expected[difficulty];let emitted=0;s.rules.maxAliens=1;s.aliens=[{alive:true,hp:1}];w.TriumphMissions.emitWaves(s,()=>assert.fail('cap'));assert.equal(s.customWaves.emitted,0);
 s.aliens=[];s.t=200;w.TriumphMissions.emitWaves(s,()=>emitted++);assert.equal(emitted,total);assert(f.missionProgress().ready);w.TriumphMissions.emitWaves(s,()=>assert.fail('duplicate'));
 box.document.querySelector('#reset').onclick();s=w.__fixture().state;assert.equal(s.customWaves.emitted,0);assert.equal(s.t,0);assert.equal(s.customWaves.arrivals.length,total);
 if(difficulty!=='normal'){if(id==='custom-rocks-relay')assert(s.customMission.brief.startsWith(difficulty==='veryhard'?'Very hard assault profile:':'Hard assault profile:'));assert(!s.pickups.some(p=>p.type==='tank'));if(s.nests.length){const n=s.nests[0];s.mode='playing';box.document.querySelector('#pause').onclick();s.aliens=[];s.nests=[n];f=w.__fixture();f.update(n.customInterval-.01);assert.equal(s.aliens.length,0);f.update(.02);assert.equal(s.aliens.length,1);}}
 w.triumph.loadMission(5);assert.equal(w.__fixture().state.wave.normalKills,200);
}
console.log('Passed custom profiles, reachable hotspots, pending arrivals/victory, chronological cap retry/drain, restart, fixed nest cadence and original isolation.');
if(!process.argv.includes('--record'))process.exit(0);
const logs=[];
for(const id of ['custom-rocks-relay','custom-base-last-convoy'])for(const difficulty of ['hard','veryhard'])for(const before of [true,false]){
 const box=setup(before),w=box.window;box.document.querySelector('#difficulty').value=difficulty;w.triumph.loadCustomMission(id);const f=w.__fixture(),s=f.state,initial=s.humans.length;assert(s.customWaves.arrivals.every(a=>!f.blocked(a.x,a.y)));
 s.mode='playing';box.document.querySelector('#pause').onclick();const snapshots=[];for(let n=0;n<9000&&s.mode==='playing';n++){f.update(.02);if(n%1500===1499)snapshots.push({t:+s.t.toFixed(1),army:s.humans.filter(u=>u.alive&&u.type!=='commander').length,bugs:s.aliens.length,kills:s.kills,emitted:s.customWaves.emitted});}
 logs.push({id,difficulty,version:before?'before':'after',initialArmy:initial-4,waveBudget:s.customWaves.arrivals.length,t:+s.t.toFixed(1),mode:s.mode,army:s.humans.filter(u=>u.alive&&u.type!=='commander').length,kills:s.kills,emitted:s.customWaves.emitted,snapshots});
 if(!before){assert(!s.pickups.some(p=>p.type==='tank'));box.document.querySelector('#reset').onclick();assert.equal(w.__fixture().state.customWaves.emitted,0);assert.equal(w.__fixture().state.humans.length,initial);}
}
console.log(JSON.stringify(logs));if(process.argv.includes('--record'))fs.writeFileSync('docs/design/custom-challenge-evidence.json',JSON.stringify({method:'Seed 34 deterministic VM, .02s actual runtime update, stationary default AI, no issued orders/manual shots/support commands, stop at defeat/victory or 180s. This is a combat stress probe, not human playtest or verified challenge.',logs},null,2)+'\n');
