// Disposable geometry diagnostics for the proposal; does not register runtime missions.
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict');
const fixtureSource=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
assert(fixtureSource.includes('window.__fixture'));
const sandbox=new Function('require','module','__dirname',fixtureSource+'\nreturn sandbox;')(require,{},__dirname);
const w=sandbox.window,nav=w.TriumphNavigation;
const proposals=JSON.parse(fs.readFileSync('docs/design/custom-missions.json','utf8')).missions;
let points=0,targets=0;
for(const m of proposals){
 w.triumph.loadMission(m.fixtureMission);
 const f=w.__fixture(),s=f.state;
 assert.equal(s.originalMap.index,m.baseMapIndex);
 // Retain original terrain, doors, breakable walls and cannons; replace scenario actors.
 s.aliens=[];s.nests=[];s.flowers=[];s.pickups=[];s.vents=[];
 const planning=(x,y)=>f.blocked(x,y,true),solid=(x,y)=>f.blocked(x,y);
 const start={x:m.commanders[0][0],y:m.commanders[0][1]};
 if(m.role==='infiltration'){
  const access=s.terminals.find(t=>t.object===253),door=s.doors.find(d=>d.object===252);
  const approach={x:m.terminalApproaches[0][0],y:m.terminalApproaches[0][1]};
  assert(door.locked);assert(nav.reachable(start,approach,planning,0),'access before unlock');
  assert(!nav.reachable(start,{x:836,y:262},planning,0),'laser gated before unlock');
  f.interact(approach,access);assert(!door.locked);assert(access.used);assert(!access.active);
  nav.reset();
 }
 const clear=p=>[[-8,-8],[8,-8],[-8,8],[8,8],[0,0]].every(([dx,dy])=>!solid(p.x+dx,p.y+dy));
 const entries=[...m.commanders,...m.soldiers,...m.commandos,...m.robots,...m.bugs,...m.nests,...m.route,...(m.terminalApproaches||[]),...m.waves.flatMap(a=>a.points),...m.support.map(a=>[a.x,a.y]),...m.weapons.map(a=>[a.x,a.y])];
 for(const [x,y] of entries){const p={x,y};assert(clear(p),`${m.id}: body clearance ${x},${y}`);assert(nav.reachable(start,p,planning,0),`${m.id}: reachable ${x},${y}`);points++;}
 for(const [x,y] of [...m.nests,...m.bugs]){
  const target={x,y,hp:4};if(m.nests.some(n=>n[0]===x&&n[1]===y))s.nests.push(target);
  let lane=null;
  for(const [dx,dy] of [[-64,0],[64,0],[0,-64],[0,64],[-96,0],[96,0],[0,-96],[0,96]]){const p={x:x+dx,y:y+dy};if(clear(p)&&nav.reachable(start,p,planning,0)&&f.visible(p,target)){lane=p;break;}}
  assert(lane,`${m.id}: accessible cardinal firing lane ${x},${y}`);targets++;
 }
 for(const [i,t] of m.terminals.entries()){
  const p=m.terminalApproaches?{x:m.terminalApproaches[i][0],y:m.terminalApproaches[i][1]}:t;
  assert(Math.hypot(p.x-t.x,p.y-t.y)<35);
  assert(nav.reachable(start,p,planning,0));
  assert(w.ORIGINAL.objects[t.object],`terminal sprite ${t.object}`);
 }
 for(const p of [...m.support,...m.weapons])assert(w.ORIGINAL.objects[p.object],`existing sprite ${p.object}`);
 if(m.role==='infiltration'){
  const laser=s.terminals.find(t=>t.object===257);
  f.interact({x:836,y:262},laser);assert(laser.active);
  assert(nav.reachable({x:836,y:262},start,planning,1),'return route');
 }
 if(m.role==='defense')for(const c of s.cannons)assert(nav.reachable(start,c,planning,0),'existing cannon approach');
 for(const p of m.support)assert(f.reinforcementRule(p.type),`${m.id}: support rule ${p.type}`);
 console.log(`${m.id}: clear connected placements, objective approaches, cardinal target lanes and support rules passed`);
}
console.log(`Proposal geometry passed: ${points} placement/route entries, ${targets} enemy/nest firing lanes. No live playthrough or balance validation.`);
