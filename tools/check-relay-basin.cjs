'use strict';
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
const box=new Function('require','module','__dirname',source+'\nreturn sandbox;')(require,{},__dirname),w=box.window,api=w.triumph;
api.loadCustomMission('custom-rocks-relay-basin');let f=w.__fixture(),s=f.state;
const b=JSON.parse(fs.readFileSync('docs/design/relay-breaker-maps/proposals.json'))[1];
assert.equal(s.terrainId,'relay-basin');assert.equal(s.originalMap.index,7);
assert.equal(s.mask.length,98304);assert.notEqual(Buffer.from(s.mask).toString('base64'),s.originalMap.mask);
assert.equal(s.props.length+s.doors.length+s.cannons.length,0);
const points=[...b.starts.commanders,...b.starts.soldiers,...b.bugs,...b.nests,[552,112],[552,656],...b.relays,...b.support,b.plasma];
assert.equal(points.length,27);
const actual=[...s.humans,...s.aliens,...s.nests,...s.terminals,...s.pickups].map(p=>[p.x,p.y]);
assert.deepEqual(JSON.parse(JSON.stringify(actual)),points);
const clearance=(x,y,r=18)=>{for(let dy=-r;dy<=r;dy+=2)for(let dx=-r;dx<=r;dx+=2)assert(!f.blocked(x+dx,y+dy),`Clearance ${x},${y} at ${dx},${dy}`);};
for(const [x,y] of points)clearance(x,y);
const nav=w.TriumphNavigation;
const wide=(x,y)=>{for(const [dx,dy] of [[0,0],[-18,-18],[18,-18],[-18,18],[18,18]])if(f.blocked(x+dx,y+dy))return true;return false;};
for(const route of Object.values(b.routes))for(let i=1;i<route.length;i++)assert(nav.line({x:route[i-1][0],y:route[i-1][1]},{x:route[i][0],y:route[i][1]},wide),'Broad body/tank route');
for(const [x,y] of points)assert(nav.reachable(s.humans[0],{x,y},wide),'Connected wide actor point');
for(const order of [[0,1],[1,0]]){api.loadCustomMission('custom-rocks-relay-basin');f=w.__fixture();s=f.state;for(const i of order){const t=s.terminals[i],p={x:t.x-24,y:t.y};clearance(p.x,p.y,8);assert(f.visible(p,t));f.interact(p,t);assert(t.active);}for(const n of s.nests){assert(f.visible({x:n.x-80,y:n.y},n));}s.aliens=[];s.customWaves.emitted=s.customWaves.arrivals.length;s.nests.forEach(n=>n.hp=0);assert(f.missionProgress().ready);}
// Formation integration across central plaza, northern flank, and eastern connector.
api.loadCustomMission('custom-rocks-relay-basin');f=w.__fixture();s=f.state;s.aliens=[];s.nests=[];
const squad=s.humans.filter(u=>u.type==='soldier');for(const u of squad)f.selection.add(u);
for(const goal of [{x:128,y:96},{x:552,y:96},{x:856,y:112},{x:904,y:384},{x:856,y:656},{x:552,y:384}]){f.attackMoveTo(goal,true);for(let i=0;i<1600;i++)for(const u of squad)f.attackMoveStep(u,null,.04);for(const u of squad){assert(!f.blocked(u.x,u.y));assert(Math.hypot(u.x-goal.x,u.y-goal.y)<65,'Formation arrives through terrain');}}
assert(f.addRally({x:552,y:384}));const before=s.humans.length;assert(f.reinforce('troops'));for(let i=0;i<1500;i++){s.t+=.04;f.updateSupport(.04);}assert(s.humans.length>before,'Carrier unloads actual troops');for(const u of s.humans.slice(before)){assert(u.attackMove?.rally);clearance(u.x,u.y,8);}
assert(f.reinforce('tank'));const tank=s.humans.find(u=>u.type==='tank');assert(tank);clearance(tank.x,tank.y);for(const goal of [{x:552,y:384},{x:904,y:384},{x:856,y:112},{x:128,y:96}]){tank.attackMove={...goal,force:true};for(let i=2000;i>0;i--)f.attackMoveStep(tank,null,.04);assert(Math.hypot(tank.x-goal.x,tank.y-goal.y)<20,'Tank turns and arrives in central plaza / pockets');clearance(tank.x,tank.y);}
for(const difficulty of ['veryeasy','easy','normal','hard','veryhard']){box.document.querySelector('#difficulty').value=difficulty;api.loadCustomMission('custom-rocks-relay-basin');assert.equal(w.__fixture().state.terrainId,'relay-basin');assert.equal(w.__fixture().state.humans.length,difficulty==='hard'?10:difficulty==='veryhard'?8:12);box.document.querySelector('#reset').onclick();assert.equal(w.__fixture().state.terrainId,'relay-basin');assert(w.__fixture().state.terminals.every(t=>!t.active));}
for(let i=1;i<=9;i++){api.loadMission(i);assert.equal(w.__fixture().state.terrainId,undefined);assert.equal(Buffer.from(w.__fixture().state.mask).toString('base64'),w.ORIGINAL.maps[i-1].mask);}
console.log('Passed Relay Basin exact 27 placements, packed mask isolation, 18px clearance, three wide routes, relay orders/LOS, actual squad circuits, timed carrier drops/rally and central plaza tank turns.');
