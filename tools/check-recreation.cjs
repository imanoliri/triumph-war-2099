const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const handlers={},elements={},noop=()=>{};
const ctx=new Proxy({}, {get:(o,k)=>o[k]||noop,set:(o,k,v)=>(o[k]=v,true)});
for(const id of ['#cmd-1','#cmd-2','#cmd-3','#cmd-4','#order-0','#order-1','#order-2','#order-3','#command-hint','#units','#units-close','#units-context','#unit-cards'])elements[id]={setAttribute:noop};
const canvasHandlers={};const canvas={getContext:()=>ctx,focus:noop,addEventListener:(name,cb)=>canvasHandlers[name]=cb,getBoundingClientRect:()=>({left:100,top:50,width:512,height:384}),setPointerCapture:noop,hasPointerCapture:()=>true,releasePointerCapture:noop};
for(const id of ['#start','#pause','#reset','#options','#close'])elements[id]={};
elements['#game']=canvas;elements['#bots']={checked:true};elements['#difficulty']={value:'normal'};
elements['#controls']={open:false,showModal(){this.open=true},close(){this.open=false}};
elements['#unit-guide']={open:false,showModal(){this.open=true},close(){this.open=false;this.onclose()}};
elements['#mission']={value:'0'};
class Image {constructor(){this.complete=true;this.naturalWidth=20;}}
class Audio {cloneNode(){return this}play(){return Promise.resolve()}}
const sandbox={console,Math,JSON,Set,Map,Image,Audio,Uint8Array,atob:s=>Buffer.from(s,'base64').toString('latin1'),document:{querySelector:id=>elements[id],createElement:()=>canvas},window:{addEventListener:(name,cb)=>handlers[name]=cb},requestAnimationFrame:cb=>sandbox.nextFrame=cb};
vm.createContext(sandbox);
for(const file of ['assets/original-data.js','assets/original-rules.js','assets/audio/catalog.js','assets/support-rules.js','navigation.js','assets/pickup-rules.js','support.js','game.js']){
 let source=fs.readFileSync(''+file,'utf8');
 if(file==='game.js')source=source.replace(/\}\)\(\);\s*$/, 'window.__fixture=()=>({state:s,interact,update,fire,kill,blocked,grenade,reinforce,updateSupport,pickup,navigate,move,aimHuman,perceive,enemyFireDelay,patrol,selectTroops,attackMoveTo,attackMoveStep,selection,spawnPickupRoll,updatePickupSpawns,hasRespawnSupport,respawnCommander,damage,selectCommander,mouseCommanderAction,bugIntent,trackBurst,burstRules,spawnGroundBug,addTroop,variantMark,tankGroup,aimTank,tankSweepRules,supplyStep,cancelSupply,reinforcementRule,giveOrder,enemyAt,focusAttackTo,focusAttackStep,groundArrival,flightEntersMap,visible,usableAt,useOrderTo,useOrderStep,missionProgress,bugArrival});})();');
 vm.runInContext(source,sandbox);
}
const api=sandbox.window.triumph,event=code=>({code,preventDefault:noop});let time=0;
function frames(n){for(let i=0;i<n;i++){time+=16.6667;sandbox.nextFrame(time)}}
assert.equal(api.state().mode,'briefing');assert.equal(api.missions.length,9);
elements['#start'].onclick();assert.equal(api.state().mode,'playing');
const start=api.state().commanders[0].x;handlers.keydown(event('KeyD'));frames(30);handlers.keyup(event('KeyD'));assert(api.state().commanders[0].x>start+25,'Player 1 movement should respond');
handlers.keydown(event('KeyB'));handlers.keyup(event('KeyB'));assert(api.state().commanders[0].selecting);handlers.keydown(event('KeyW'));handlers.keyup(event('KeyW'));assert.equal(api.state().commanders[0].order,2);
const count=api.state().commanders[0].grenades;handlers.keydown(event('KeyV'));handlers.keydown(event('KeyB'));handlers.keyup(event('KeyB'));handlers.keyup(event('KeyV'));assert.equal(api.state().commanders[0].grenades,count-1);
assert.throws(()=>api.command(1,{fire:true}));api.command(2,{dx:1,fire:true,seconds:.3});frames(20);
handlers.keydown(event('Space'));handlers.keyup(event('Space'));const beforePause=api.state().time;frames(40);assert.equal(api.state().time,beforePause);
handlers.keydown(event('Space'));handlers.keyup(event('Space'));frames(600);assert(api.state().time>beforePause+9);assert(api.state().aliens.length>0);
elements['#options'].onclick();assert.equal(elements['#controls'].open,true);elements['#close'].onclick();assert.equal(api.state().paused,false);
elements['#reset'].onclick();assert.equal(api.state().mode,'briefing');assert.equal(api.state().commanders.length,4);assert.equal(api.state().army,14);
assert.equal(api.missions[0].name,'DESERT CANYON');
assert.equal(sandbox.window.ORIGINAL_AUDIO.length,76);
assert.throws(()=>api.loadMission(10));
for(let m=1;m<=9;m++){api.loadMission(m);assert.equal(api.state().mission,m);assert.equal(api.state().commanders.length,4);assert(api.state().army>0);elements['#start'].onclick();frames(60);assert.equal(api.state().mode,'playing');console.log('Mission',m,api.missions[m-1].name,'army',api.state().army,'bugs',api.state().aliens.length,'doors',api.state().doors.length);}
api.loadMission(1);elements['#start'].onclick();handlers.keydown(event('F2'));handlers.keyup(event('F2'));assert.equal(api.state().mode,'briefing');
api.loadMission(3);let fixture=sandbox.window.__fixture(),state=fixture.state;
assert.equal(state.doors.find(d=>d.object===244).locked,false);assert.equal(state.doors.find(d=>d.object===252).locked,true);
const firstTerminal=state.terminals.find(t=>t.object===253),commander=state.humans[0];commander.x=firstTerminal.x;commander.y=firstTerminal.y;fixture.interact(commander);
assert.equal(state.doors.find(d=>d.object===252).locked,false);assert.equal(firstTerminal.active,false,'Unlock terminal has no completion flag');
const secondTerminal=state.terminals.find(t=>t.object===257);commander.x=secondTerminal.x;commander.y=secondTerminal.y;fixture.interact(commander);assert.equal(secondTerminal.active,true);
state.mode='playing';state.aliens=[];state.nests=[];state.t=34;fixture.update(.1);assert.equal(state.mode,'playing','Minimum mission time');state.t=35;fixture.update(.1);assert.equal(state.mode,'victory');
api.loadMission(7);fixture=sandbox.window.__fixture();assert.equal(fixture.state.terminals.length,8);
api.loadMission(8);fixture=sandbox.window.__fixture();assert(fixture.state.terminals.some(t=>t.object===436&&t.y===30),'Required cave terminal must not be filtered as a helper');
api.loadMission(9);fixture=sandbox.window.__fixture();state=fixture.state;assert.equal(state.crystal.hp,7);assert.equal(state.wave.normalKills,150);assert.equal(state.wave.queenKills,50);
api.loadMission(1);fixture=sandbox.window.__fixture();assert(fixture.state.nests.every(n=>n.hp===50));assert(fixture.state.aliens.every(a=>a.hp===4));
for(const [difficulty,health] of [['veryeasy',2],['easy',3],['normal',4],['hard',5],['veryhard',6]]){elements['#difficulty'].value=difficulty;api.loadMission(1);assert(sandbox.window.__fixture().state.aliens.every(a=>a.hp===health));}
elements['#difficulty'].value='normal';api.loadMission(5);fixture=sandbox.window.__fixture();state=fixture.state;state.mode='playing';state.t=24.8;state.aliens=[];state.nests=[];fixture.update(.1);assert.equal(state.aliens.length,0);state.t=25;fixture.update(.01);assert.equal(state.aliens.length,1,'Hold Base starts after its original timer');assert.equal(state.waveRemaining,200,'Spawning does not satisfy a kill target');fixture.kill(state.aliens[0],1);fixture.update(.01);assert.equal(state.waveKills.normal,1);assert.equal(state.waveRemaining,199);state.waveKills.normal=200;state.aliens=[];state.t=31;fixture.update(.01);assert.equal(state.mode,'victory');
api.loadMission(3);fixture=sandbox.window.__fixture();state=fixture.state;state.mode='playing';state.t=1;state.aliens=[];state.nests=[];const door=state.doors.find(d=>d.object===244);state.humans[0].x=door.cx;state.humans[0].y=door.cy;handlers.keydown(event('KeyV'));assert.equal(door.open,true);frames(32);assert.equal(door.open,true,'Holding Fire must not toggle the door repeatedly');handlers.keyup(event('KeyV'));handlers.keydown(event('KeyV'));handlers.keyup(event('KeyV'));assert.equal(door.open,false);
api.loadMission(9);fixture=sandbox.window.__fixture();state=fixture.state;state.mode='playing';state.aliens=[];state.nests=[];state.waveKills={normal:150,queen:50};for(const t of state.terminals)t.active=true;state.crystal.y=-29.9;fixture.update(.02);assert.equal(state.crystal.recovered,true);assert.equal(state.mode,'victory','Final mission also requires crystal extraction');
console.log('Passed recovered rules: door dependencies, terminal completion flags, 35-second mission gate, cave terminal, crystal durability, final kill targets, and normal-difficulty bug/egg health.');
api.loadMission(1);fixture=sandbox.window.__fixture();state=fixture.state;const initialTroops=state.humans.filter(u=>u.type==='soldier').length;
assert(fixture.reinforce('troops'));assert.equal(state.humans.filter(u=>u.type==='soldier').length,initialTroops,'Carrier calls must not instantly create infantry');assert.equal(state.reinforcements[0].kind,'carrier');
let carrierStopped=false;for(let i=0;i<500;i++){state.t+=.02;fixture.updateSupport(.02);if(state.reinforcements.some(r=>r.kind==='carrier'&&r.path.pause>0))carrierStopped=true;}
assert(carrierStopped,'Recovered pause node is used');assert(state.humans.filter(u=>u.type==='soldier').length>initialTroops,'Carrier drops troops while stopped');assert.equal(state.reinforcements.length,0,'Carrier leaves at path end');
api.loadMission(1);fixture=sandbox.window.__fixture();state=fixture.state;assert(fixture.reinforce('air'));assert.equal(state.reinforcements[0].kind,'air');for(let i=0;i<600;i++){state.t+=.02;fixture.updateSupport(.02);}assert(state.humans.some(u=>u.type==='commando'),'Aircraft pass completes animated commando drops');assert.equal(state.reinforcements.length,0);
api.loadMission(7);fixture=sandbox.window.__fixture();state=fixture.state;const before=state.humans.length;assert(fixture.reinforce('troops'));assert.equal(state.humans.length,before+5,'Indoor reinforcement uses five source-created troops');assert(fixture.reinforce('air'));assert.equal(state.reinforcements.at(-1).kind,'infiltration');assert(fixture.reinforce('tank'));assert.equal(state.humans.at(-1).type,'robot');assert.equal(state.humans.at(-1).hp,7);
for(let i=0;i<600;i++){state.t+=.02;fixture.updateSupport(.02);}assert.equal(state.reinforcements.length,0,'Zipline creator expires after ten seconds');assert(state.humans.length>before+6,'Zipline animation creates additional troops');
api.loadMission(1);fixture=sandbox.window.__fixture();state=fixture.state;assert(fixture.reinforce('blitz'));assert.equal(state.reinforcements.filter(r=>r.kind==='air').length,2);assert.equal(state.reinforcements.filter(r=>r.kind==='carrier').length,1);assert.equal(state.humans.filter(u=>u.type==='tank').length,3);
api.loadMission(1);fixture=sandbox.window.__fixture();state=fixture.state;fixture.reinforce('troops');state.mode='playing';for(const u of state.humans){u.alive=false;u.respawn=0;}fixture.update(.02);assert(state.humans.some(u=>u.type==='commander'&&u.alive),'Carrier supports commander respawn without deployed troops');assert.equal(state.mode,'playing');
console.log('Passed source support rules: carrier pause/drop/departure, air passes and landing animations, indoor five-troop arrival, zipline expiration, ground robots, BLITZ creation counts, and carrier-backed respawn.');
console.log('Passed: recovered maps and actors, movement, directional orders, grenades, assistant ownership, pause/resume, combat simulation, controls, F2, restart, and all nine mission initialization/render paths. Browser rendering/audio playback unverified.');

{
// User-reported aiming rules: all infantry fire cardinally; bug spit follows facing.
api.loadMission(1);const fixture=sandbox.window.__fixture(),state=fixture.state;
state.bullets=[];
for(const angle of [.2,.7,1.4,2.8,-1.1]){const u={x:500,y:500,team:'human',type:'soldier',angle,cool:0,weapon:1,order:0};fixture.fire(u);const b=state.bullets.at(-1);assert(Math.abs(b.dx)<1e-12||Math.abs(b.dy)<1e-12,'Infantry bullets must be cardinal');}
const bug={x:500,y:500,team:'alien',type:'soldier',angle:.6,shotOffset:Math.PI/16,cool:0,weapon:0};fixture.fire(bug);const spit=state.bullets.at(-1);assert(Math.abs(Math.atan2(spit.dy,spit.dx)-bug.angle)<=Math.PI/16+1e-12);
// Route around a long wall instead of oscillating at its edge.
const nav=sandbox.window.TriumphNavigation,wall=(x,y)=>x<8||x>1016||y<40||y>752||(x>380&&x<420&&y>80&&y<580);
nav.reset();let walker={x:200,y:300},goal={x:650,y:300};
for(let n=0;n<1500&&Math.hypot(walker.x-goal.x,walker.y-goal.y)>10;n++){const next=nav.step(walker,goal,wall,'wall');assert(next,'Route should exist around wall');const dx=next.x-walker.x,dy=next.y-walker.y,length=Math.hypot(dx,dy),amount=Math.min(3,length);walker.x+=dx/length*amount;walker.y+=dy/length*amount;assert(!wall(walker.x,walker.y),'Route cannot cross terrain');}
assert(Math.hypot(walker.x-goal.x,walker.y-goal.y)<12,'Route should reach goal behind wall');
console.log('Passed cardinal infantry fire, facing-constrained bug spit, and navigation around a long wall.');

}

{
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mask=null;state.props=[];state.rocks=[{x:300,y:100,w:20,h:400}];state.doors=[];
const observer={x:200,y:250,team:'human',alive:true},hidden={x:400,y:250,team:'alien',alive:true,hp:4};
for(let i=0;i<12;i++){state.t+=.5;assert.equal(f.perceive(observer,[hidden],240),null,'AI must not acquire enemies through walls');}
state.rocks=[];let acquired=false;for(let i=0;i<12;i++){state.t+=.5;if(f.perceive(observer,[hidden],240)===hidden)acquired=true;}assert(acquired,'Visible enemy can be acquired after reaction delay');
state.rocks=[{x:300,y:100,w:20,h:400}];assert.equal(f.perceive(observer,[hidden],240),null,'Wall must immediately block an existing target');
const delays=Array.from({length:20},()=>f.enemyFireDelay({type:'soldier'}));assert(delays.every(d=>d>=3.8&&d<5.4),'Normal spit cooldown should be 3.8 to 5.4 seconds');assert(new Set(delays).size>10,'Spit intervals must vary');
console.log('Passed wall-limited AI perception, reaction delay, target loss behind walls, and randomized slower enemy fire.');
}

{
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.mask=null;state.rocks=[];state.props=[];state.doors=[];
const one={x:200,y:200,team:'human',type:'soldier',alive:true,hp:1,angle:0,cool:0,weapon:0},two={...one,x:260,y:220},commander={...one,x:240,y:240,type:'commander',id:1};state.humans=[one,two,commander];
const pointer=(x,y,button=0,shiftKey=false)=>({clientX:100+x/2,clientY:50+y/2,button,shiftKey,pointerId:7,preventDefault:noop});
canvasHandlers.pointerdown(pointer(180,180));canvasHandlers.pointermove(pointer(285,260));canvasHandlers.pointerup(pointer(285,260));assert.equal(f.selection.size,2,'Scaled-canvas drag selects only troops');assert(!f.selection.has(commander),'Keyboard commanders are excluded from mouse troop selection');
canvasHandlers.pointerdown(pointer(600,350,2));assert(one.attackMove&&two.attackMove);assert.notEqual(one.attackMove.x,two.attackMove.x,'Formation destinations should be spaced');
canvasHandlers.pointerdown(pointer(one.x,one.y));canvasHandlers.pointerup(pointer(one.x,one.y));assert.equal(f.selection.size,1,'Click selects one');canvasHandlers.pointerdown(pointer(two.x,two.y,0,true));canvasHandlers.pointerup(pointer(two.x,two.y,0,true));assert.equal(f.selection.size,2,'Shift click adds');
state.rocks=[{x:380,y:80,w:40,h:500}];f.attackMoveTo({x:650,y:300});const goal={...one.attackMove};for(let i=0;i<1600&&one.attackMove;i++){state.t+=.05;f.attackMoveStep(one,null,.05);assert(!f.blocked(one.x,one.y),'Attack move cannot cross wall');}assert.equal(one.attackMove,null,'Attack move reaches destination behind a long wall');assert.equal(one.order,3,'Troop holds after arrival');assert(Math.hypot(one.x-goal.x,one.y-goal.y)<13);
f.selectTroops(two,two);two.cannon=0;state.cannons=[{occupant:two}];f.attackMoveTo({x:400,y:300});assert.equal(state.cannons[0].occupant,null,'Ordered cannon troops dismount');assert.equal(two.cannon,undefined);assert(!f.blocked(two.attackMove.x,two.attackMove.y),'Blocked click destination resolves to open terrain');
state.rocks=[];one.x=330;one.y=600;one.cool=0;one.attackMove={x:650,y:600};state.bullets=[];const enemy={x:430,y:600,alive:true,hp:4};f.attackMoveStep(one,enemy,.05);assert.equal(state.bullets.length,0,'Attack move waits for its randomized reaction delay');state.t=one.burst.readyAt;f.attackMoveStep(one,enemy,.05);assert.equal(state.bullets.length,1,'Attack move engages a visible enemy');assert.equal(one.x,330,'Aligned troop pauses travel to engage');f.attackMoveStep(one,null,.05);assert(one.x>330,'Travel resumes after engagement');api.loadMission(2);assert.equal(f.selection.size,0,'Mission reset clears selection');
console.log('Passed drag/click/Shift selection, scaled pointer coordinates, commander exclusion, right-click formations, wall routing, blocked destinations, cannon dismount and arrival holding.');
}

{
for(let mission=1;mission<=9;mission++){api.loadMission(mission);const f=sandbox.window.__fixture(),state=f.state;state.t=2;state.pickups=[];if(mission===8){let free=0;for(let y=48;y<740;y+=8)for(let x=24;x<1000;x+=8)if(!f.blocked(x,y))free++;assert(free>1000,'Caves floor overlays must clear the solid base collision layer');}for(const roll of [0,6,9,11,13,15,17])f.spawnPickupRoll(roll);for(const type of ['troops','air','tank','auto','plasma','flame','grenade'])assert(state.pickups.some(p=>p.type===type),'Mission '+mission+' should regenerate '+type+' pickups');for(const p of state.pickups)assert(!f.blocked(p.x,p.y),'Pickup cannot appear inside terrain');for(let n=0;n<20;n++)f.spawnPickupRoll(0);assert.equal(state.pickups.filter(p=>p.type==='troops').length,6,'Original ground pickup cap is six');}
api.loadMission(1);let f=sandbox.window.__fixture(),state=f.state;state.t=2;state.pickups=[];for(let i=0;i<300;i++){state.t+=1;f.updatePickupSpawns(1);}assert(state.pickups.some(p=>['troops','air','tank'].includes(p.type)),'Time-driven random generator must produce reinforcement eagles');
for(let mission=1;mission<=9;mission++){api.loadMission(mission);f=sandbox.window.__fixture();state=f.state;state.mode='playing';state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];state.wave=null;state.waveRemaining=0;state.crystal=null;const commanders=state.humans.filter(u=>u.type==='commander');for(const u of commanders)f.kill(u,0);for(let i=0;i<499;i++)f.update(.02);assert(commanders.every(u=>!u.alive),'Respawn must wait ten seconds');for(let i=0;i<3;i++)f.update(.02);assert(commanders.every(u=>u.alive),'All commanders should return on mission '+mission);assert(commanders.every(u=>u.shieldUntil>state.t),'Respawn should create temporary protection');f.damage(commanders[0],1,0);assert(commanders[0].alive,'Protected commander survives immediate spawn damage');state.t+=.7;f.damage(commanders[0],1,0);assert(!commanders[0].alive,'Shield must expire');}
api.loadMission(7);f=sandbox.window.__fixture();state=f.state;state.mode='playing';assert(f.reinforce('air'));for(const u of state.humans){u.alive=false;u.respawn=0;}state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];f.update(.02);assert(state.humans.some(u=>u.type==='commander'&&u.alive),'Pending indoor zipline arrivals permit respawn');assert.equal(state.mode,'playing');
console.log('Passed all nine missions: recovered random pickup types/caps/terrain placement, time-driven reinforcement eagles, ten-second commander return, spawn protection and pending indoor arrivals.');
}

{
for(const mission of [1,7,8,9])for(const type of ['troops','air','tank','blitz']){api.loadMission(mission);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];state.wave=null;state.crystal=null;state.pickupClock=100;const troop=state.humans.find(u=>u.alive&&u.type==='soldier');assert(troop);state.humans=state.humans.filter(u=>u.type==='commander'||u===troop);for(const c of state.humans.filter(u=>u.type==='commander')){c.x=900;c.y=500;}troop.x=500;troop.y=500;state.cannons=[];state.pickups=[{x:500,y:500,type}];const before=state.humans.length+state.reinforcements.length;f.update(.02);assert.equal(state.pickups.length,0,'Infantry collects '+type+' eagle on mission '+mission);assert(state.humans.length+state.reinforcements.length>before,'Infantry pickup calls support');const after=state.humans.length+state.reinforcements.length;f.update(.02);assert.equal(state.humans.length+state.reinforcements.length,after,'Collected eagle triggers once');}
api.loadMission(7);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];state.pickupClock=100;state.cannons=[];for(const u of state.humans){u.x=u.type==='commander'?900:500;u.y=500;}const troop=state.humans.find(u=>u.type==='soldier');const prototype={...troop};while(state.humans.filter(u=>u.type==='soldier').length<state.rules.maxAliens)state.humans.push({...prototype,x:600,y:600});state.pickups=[{x:troop.x,y:troop.y,type:'troops'}];f.update(.02);assert(state.pickups.some(p=>p.type==='troops'),'Unusable eagle remains when reinforcement cap is reached');
console.log('Passed regular infantry eagle pickup, all four support types, outdoor/indoor calls, single activation and retaining unusable pickups.');
}

{
for(let id=1;id<=4;id++){api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.pickups=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];state.humans=state.humans.filter(u=>u.type==='commander');for(const c of state.humans){c.x=300+c.id*40;c.y=350;c.cool=0;}
elements['#cmd-'+id].onclick();assert.equal(api.state().activeCommander,id);const u=state.humans.find(c=>c.id===id),first=state.humans.find(c=>c.id===1),x=u.x,oldFirst=first.x;handlers.keydown(event('KeyD'));f.update(.1);handlers.keyup(event('KeyD'));assert(u.x>x+7,'WASD must control selected commander '+id);if(id!==1)assert.equal(first.x,oldFirst,'WASD must not also move commander 1');
state.bullets=[];u.cool=0;f.mouseCommanderAction({x:u.x,y:u.y-100});assert.equal(state.bullets.length,1);assert.equal(state.bullets[0].owner,id,'Mouse shot must belong to selected commander');assert(Math.abs(state.bullets[0].dx)<1e-12&&state.bullets[0].dy<0,'Mouse shot should follow an upward cursor');const grenades=u.grenades;f.mouseCommanderAction({x:u.x+100,y:u.y},true);assert.equal(u.grenades,grenades-1);f.mouseCommanderAction({x:u.x+100,y:u.y},true);assert.equal(u.grenades,grenades-1,'Rapid right-click respects grenade cooldown');
const troop={x:u.x+30,y:u.y,alive:true,team:'human',type:'soldier',order:0};state.humans.push(troop);for(let order=0;order<4;order++){elements['#order-'+order].onclick();assert.equal(u.order,order);assert.equal(troop.order,order,'Button applies commander order to nearby troop');assert.equal(troop.leader,id);}
}
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';elements['#cmd-4'].onclick();const u=state.humans.find(c=>c.id===4);u.cool=0;state.bullets=[];const pointer=(x,y,button=0)=>({clientX:100+x/2,clientY:50+y/2,button,shiftKey:false,pointerId:9,preventDefault:noop});state.humans=state.humans.filter(c=>c.type==='commander');canvasHandlers.pointerdown(pointer(850,400));canvasHandlers.pointerup(pointer(850,400));assert.equal(state.bullets[0].owner,4,'Canvas click fires selected commander');const n=u.grenades;canvasHandlers.pointerdown(pointer(850,400,2));assert.equal(u.grenades,n-1,'Canvas right-click throws grenade in commander mode');f.selectTroops({x:1,y:1},{x:10,y:10});elements['#cmd-2'].onclick();assert.equal(api.state().mouseMode,'commander');assert.equal(f.selection.size,0,'Commander selector clears troop mode');f.kill(state.humans.find(c=>c.id===2),0);state.bullets=[];f.mouseCommanderAction({x:500,y:400});assert.equal(state.bullets.length,0,'Dead commander cannot shoot');
console.log('Passed all four commander selectors, exclusive WASD ownership, mouse shots/grenades, cooldown, order buttons, troop-mode switching and dead commander input.');
}

{
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';f.selectCommander(1);const u=state.humans.find(c=>c.id===1);u.x=500;u.y=400;
for(const [dx,dy] of [[100,100],[-100,100],[-100,-100],[100,-100],[100,60]]){u.cool=0;state.bullets=[];f.mouseCommanderAction({x:u.x+dx,y:u.y+dy});const b=state.bullets[0],length=Math.hypot(dx,dy);assert(Math.abs(b.dx-dx/length)<1e-12&&Math.abs(b.dy-dy/length)<1e-12,'Mouse fire must follow the exact cursor angle');assert(Math.abs(b.dx)>0&&Math.abs(b.dy)>0,'Diagonal shot must retain both axes');}
u.grenades=3;u.grenadeCool=0;f.mouseCommanderAction({x:u.x+100,y:u.y+100},true);assert(Math.abs(u.angle-Math.PI/4)<1e-12,'Mouse grenade should also follow diagonal aim');assert.equal(u.grenades,2);
console.log('Passed mouse diagonal aiming in all quadrants, arbitrary cursor angles and matching grenade direction.');
}

{
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';f.selectCommander(1);state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.pickups=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:980,y:740,hp:50,timer:1e6}];state.humans=state.humans.filter(u=>u.type==='commander');const u=state.humans.find(u=>u.id===1);u.x=300;u.y=400;u.cool=0;
const pointer=(x,y,shiftKey=false)=>({clientX:100+x/2,clientY:50+y/2,button:0,shiftKey,pointerId:11,preventDefault:noop});canvasHandlers.pointerdown(pointer(700,600));for(let i=0;i<50;i++)f.update(.02);const count=state.bullets.filter(b=>b.owner===1).length;assert(count>=3&&count<=4,'Holding mouse must fire repeatedly at normal weapon rate');canvasHandlers.pointermove(pointer(700,200));for(let i=0;i<14;i++)f.update(.02);assert(state.bullets.at(-1).dy<0,'Held firing must track moved cursor');canvasHandlers.pointerup(pointer(700,200));const released=state.bullets.length;for(let i=0;i<15;i++)f.update(.02);assert.equal(state.bullets.length,released,'Release must stop autofire');
state.bullets=[];u.cool=0;canvasHandlers.pointerdown(pointer(700,600));canvasHandlers.pointermove(pointer(740,650));for(let i=0;i<25;i++)f.update(.02);assert.equal(state.bullets.length,0,'Immediate drag selects rather than autofires');canvasHandlers.pointercancel();canvasHandlers.pointerdown(pointer(700,600,true));for(let i=0;i<25;i++)f.update(.02);assert.equal(state.bullets.length,0,'Shift drag must never autofire');canvasHandlers.pointercancel();canvasHandlers.pointerdown(pointer(700,600));for(let i=0;i<15;i++)f.update(.02);canvasHandlers.pointercancel();const cancelled=state.bullets.length;for(let i=0;i<10;i++)f.update(.02);assert.equal(state.bullets.length,cancelled,'Cancelled pointer must stop firing');
console.log('Passed held mouse autofire, normal weapon cooldown, moving diagonal aim, release/cancel stopping, and drag/Shift selection without firing.');
}

{
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.mask=null;state.rocks=[];state.doors=[];state.props=[];
for(const order of [0,1,2,3]){const troop={x:400,y:350,team:'human',type:'soldier',alive:true,hp:1,angle:0,cool:0,weapon:0,order},bug={x:510,y:430,team:'alien',type:'soldier',alive:true,hp:4};state.bullets=[];f.aimHuman(troop,bug,.1);assert.equal(state.bullets.length,0,'Friendly troops wait before firing');state.t=troop.burst.readyAt;f.aimHuman(troop,bug,0);assert.equal(state.bullets.length,1,'Friendly order '+order+' should actively shoot visible diagonal threat');assert(Math.abs(state.bullets[0].dy)<1e-12,'Friendly infantry shots remain cardinal');if(order===0||order===1)assert(troop.y>350,'Normal/Follow troops should step into a firing lane');if(order===3)assert.equal(troop.y,350,'Defenders should hold position');}
const friendly={x:400,y:350,team:'human',alive:true,hp:1},bug={x:510,y:430,team:'alien',alive:true,hp:4};let friendlyTime=null,bugTime=null;state.t=0;for(let i=0;i<40;i++){state.t=i*.1;if(f.perceive(friendly,[bug],245)&&friendlyTime===null)friendlyTime=state.t;if(f.perceive(bug,[friendly],240)&&bugTime===null)bugTime=state.t;}assert(friendlyTime!==null&&bugTime!==null);assert(friendlyTime<bugTime,'Friendly troops should react sooner than bugs');state.t=bug.ai.focusUntil+.01;assert.equal(f.perceive(bug,[friendly],240),null,'Bugs should lose interest after a short focus interval');assert(bug.ai.boredUntil>state.t,'Bugs should take a wandering break');
const farBug={x:400,y:350,team:'alien',alive:true,hp:4},farSoldier={x:600,y:350,team:'human',alive:true,hp:1};for(let i=0;i<50;i++){state.t+=.1;assert.equal(f.perceive(farBug,[farSoldier],240),null,'Bugs should not detect targets beyond reduced sight range');}
const modes=new Set(),walker={x:400,y:350,team:'alien',type:'soldier',alive:true,hp:4,angle:0};for(let i=0;i<100;i++){state.t+=3.1;f.bugIntent(walker,friendly,.02,1);modes.add(walker.intent.mode);}assert(modes.has('approach')&&modes.has('wander')&&modes.has('pause'),'Bugs must vary approach, wandering and pauses');
state.rocks=[{x:450,y:300,w:20,h:100}];const shooter={x:400,y:350,team:'human',type:'soldier',alive:true,cool:0,weapon:0,order:0},behind={x:500,y:350,team:'alien',alive:true,hp:4};state.bullets=[];f.aimHuman(shooter,behind,0);assert.equal(state.bullets.length,0,'Friendly fire must not target through walls');
console.log('Passed active friendly fire for all orders, Normal/Follow alignment, faster friendly reactions, bounded bug focus/range, randomized bug intent and wall-limited combat.');
}

{const previous=api.state().paused;elements['#units'].onclick();assert.equal(elements['#unit-guide'].open,true);assert.equal(api.state().paused,true);assert(elements['#unit-cards'].innerHTML.includes('Egg / nest'));assert(elements['#unit-cards'].innerHTML.includes('No armor / damage reduction'));assert(elements['#units-context'].textContent.includes('queen HP:'));handlers.keydown(event('Space'));assert.equal(api.state().paused,true);elements['#units-close'].onclick();assert.equal(api.state().paused,previous);elements['#pause'].onclick();elements['#units'].onclick();elements['#units-close'].onclick();assert.equal(api.state().paused,!previous);elements['#pause'].onclick();console.log('Passed unit manual content, modal input blocking and pause restoration.');}

// Burst control retains shot cadence, independently varies timings and cannot bypass rests.
{
 api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.aliens=[];
 const target={x:600,y:400,team:'alien',alive:true,hp:1000},other={...target,y:410};
 for(const type of ['soldier','robot','tank','commando']){
  const r=f.burstRules[type],sizes=new Set(),delays=new Set();
  for(let i=0;i<80;i++){
   const u={x:400,y:400,team:'human',type,alive:true,hp:8,cool:0,weapon:0,order:0};state.bullets=[];const start=state.t;
   f.aimHuman(u,target,0);assert.equal(state.bullets.length,0);const delay=u.burst.readyAt-start;assert(delay>=r.delayMin-1e-9&&delay<=r.delayMax+1e-9);delays.add(delay);
   state.t=u.burst.readyAt;f.aimHuman(u,target,0);const size=1+u.burst.remaining;sizes.add(size);assert(size>=r.min&&size<=r.max);assert.equal(state.bullets.length,1);
   const cadence=u.cool;assert.equal(cadence,type==='tank'?.2:.38);f.aimHuman(u,target,0);assert.equal(state.bullets.length,1,'Cannot skip within-burst cooldown');
   for(let n=1;n<size;n++){state.t+=cadence;u.cool=0;f.aimHuman(u,target,0);}assert.equal(state.bullets.length,size);assert.equal(u.burst.remaining,0);
   const rest=u.burst.restUntil-state.t;assert(rest>=r.restMin-1e-9&&rest<=r.restMax+1e-9);const restUntil=u.burst.restUntil;u.cool=0;f.aimHuman(u,other,0);assert.equal(u.burst.restUntil,restUntil,'Switch preserves rest');assert.equal(state.bullets.length,size);
   f.trackBurst(u,null);f.aimHuman(u,target,0);assert(u.burst.readyAt>=restUntil);assert.equal(state.bullets.length,size);
   state.t=u.burst.readyAt;f.aimHuman(u,target,0);assert.equal(state.bullets.length,size+1,'Resumes after rest and reacquisition');
   target.alive=false;u.cool=0;f.aimHuman(u,target,0);assert.equal(u.burst.remaining,0,'Death interrupts burst');assert.equal(state.bullets.length,size+1);target.alive=true;
   f.aimHuman(u,target,0);state.rocks=[{x:480,y:350,w:20,h:100}];f.aimHuman(u,target,0);assert.equal(u.burst.target,null,'Wall interrupts burst');state.rocks=[];
  }
  assert.equal(sizes.size,r.max-r.min+1,'All configured burst sizes occur');assert(delays.size>50,'Reaction delays vary independently');
 }
 const defender={x:400,y:400,team:'human',type:'soldier',cool:0,weapon:0,order:3};f.aimHuman(defender,target,0);state.t=defender.burst.readyAt;f.aimHuman(defender,target,0);assert.equal(defender.cool,.2);assert(defender.burst.remaining>=2&&defender.burst.remaining<=5);
 const flame={...defender,weapon:1,cool:0,burst:undefined};f.aimHuman(flame,target,0);state.t=flame.burst.readyAt;f.aimHuman(flame,target,0);assert.equal(flame.cool,.18);
 const commander={x:400,y:400,team:'human',type:'commander',cool:0,weapon:0};state.bullets=[];f.aimHuman(commander,target,0);assert.equal(state.bullets.length,1);assert.equal(commander.burst,undefined);
 elements['#units'].onclick();assert(elements['#unit-cards'].innerHTML.includes('9–12 shots per burst'));assert(elements['#unit-cards'].innerHTML.includes('3–6 shots per burst'));elements['#units-close'].onclick();
 console.log('Passed soldier/robot/tank burst sizes, initial delays, rest ranges, target switching/loss, cadence, Defend/flame, continuous commander fire and guide descriptions.');
}

{
 api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];
 const initial=state.humans.filter(u=>u.type==='commando').length;assert.equal(initial,0,'No replacement of placed infantry');assert(!state.aliens.some(u=>u.type==='redbug'),'Placed bugs remain ordinary');
 f.reinforce('air');for(let i=0;i<700;i++){state.t+=.02;f.updateSupport(.02);}assert(state.humans.some(u=>u.type==='commando'),'Air drops commandos');
 api.loadMission(7);const inside=sandbox.window.__fixture();inside.reinforce('air');for(let i=0;i<650;i++){inside.state.t+=.02;inside.updateSupport(.02);}assert(inside.state.humans.some(u=>u.type==='commando'),'Indoor blue-eagle troops are commandos');
 api.loadMission(6);const infiltrate=sandbox.window.__fixture();infiltrate.reinforce('air');for(let i=0;i<650;i++){infiltrate.state.t+=.02;infiltrate.updateSupport(.02);}assert(infiltrate.state.humans.some(u=>u.type==='commando'),'Infiltration drops commandos');
 api.loadMission(1);const g=sandbox.window.__fixture(),world=g.state;world.mask=null;world.rocks=[];world.doors=[];world.props=[];let reds=0;
 for(let i=0;i<10000;i++){const u=g.spawnGroundBug(500,500);if(u.type==='redbug'){reds++;assert.equal(u.hp,5);}else assert.equal(u.hp,world.difficulty.bug);}assert(reds>900&&reds<1100,'Spawn lottery should be approximately 10 percent');
 const red={x:400,y:400,type:'redbug',team:'alien',alive:true,hp:5},target={x:590,y:400,team:'human',alive:true,hp:1};let seen=false;
 for(let i=0;i<100;i++){world.t+=.1;if(g.perceive(red,[target],240))seen=true;}assert(seen,'Red bug sees at 190 px');target.x=601;assert.equal(g.perceive(red,[target],240),null,'Red bug loses target beyond 200 px');target.x=590;world.rocks=[{x:480,y:350,w:20,h:100}];for(let i=0;i<30;i++){world.t+=.2;assert.equal(g.perceive(red,[target],240),null,'Red sight respects walls');}world.rocks=[];
 for(const difficulty of ['veryeasy','easy','normal','hard','veryhard']){elements['#difficulty'].value=difficulty;for(let i=0;i<50;i++){const d=g.enemyFireDelay(red);assert(d>=2.6&&d<4.2,'Red spit cooldown is fixed across difficulty');}}elements['#difficulty'].value='normal';
 const commando=g.addTroop(52,400,400,'commando');target.x=500;target.y=500;world.bullets=[];g.aimHuman(commando,target,0);world.t=commando.burst.readyAt;commando.cool=0;g.aimHuman(commando,target,0);assert.equal(world.bullets.length,1);assert(Math.abs(world.bullets[0].dx-Math.SQRT1_2)<1e-9&&Math.abs(world.bullets[0].dy-Math.SQRT1_2)<1e-9,'Commando diagonal fire');
 g.selectTroops({x:390,y:390},{x:410,y:410});assert(g.selection.has(commando),'Commando participates in selection');g.attackMoveTo({x:700,y:500});assert(commando.attackMove,'Commando accepts attack move');
 world.pickups=[{x:400,y:400,type:'plasma'}];world.humans=[commando];world.aliens=[];world.nests=[{x:900,y:700,hp:50,timer:1000}];world.mode='playing';g.update(.02);assert.equal(commando.weapon,2,'Commando collects weapons');
 g.variantMark(commando);g.variantMark(red);elements['#units'].onclick();assert(elements['#unit-cards'].innerHTML.includes('Red Krate bug'));assert(elements['#unit-cards'].innerHTML.includes('5–7 shots per burst'));elements['#units-close'].onclick();
 console.log('Passed air/indoor/infiltration commandos, diagonal fire, commando orders/pickups, 10-percent red spawn lottery, fixed red HP/cooldowns, 200px wall-limited sight and guide entries.');
}

{
 api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];
 const tank={x:400,y:400,team:'human',type:'tank',alive:true,hp:8,cool:0,weapon:0,order:0};
 const bug=(degrees,distance=200)=>({x:400+Math.cos(degrees*Math.PI/180)*distance,y:400+Math.sin(degrees*Math.PI/180)*distance,team:'alien',type:'soldier',alive:true,hp:100});
 const isolated=bug(180,100);state.aliens=[isolated,bug(-25),bug(0),bug(25)];const group=f.tankGroup(tank,isolated);assert.equal(group.count,3,'Tank chooses denser group over closest isolated bug');assert(Math.abs(group.center)<1e-9);assert(group.width>=25*Math.PI/180&&group.width<=Math.PI*4/9);
 state.bullets=[];f.aimTank(tank,isolated);state.t=tank.burst.readyAt;f.aimTank(tank,isolated);const sweep={...tank.sweep};assert.equal(tank.cool,.2);assert(sweep.total>=9&&sweep.total<=12);const first=Math.atan2(state.bullets[0].dy,state.bullets[0].dx);
 for(const a of state.aliens){a.x+=40;a.y+=60;}
 for(let i=1;i<sweep.total;i++){state.t+=.2;tank.cool=0;f.aimTank(tank,isolated);assert.equal(state.bullets.length,i+1);const actual=Math.atan2(state.bullets.at(-1).dy,state.bullets.at(-1).dx),expected=sweep.start+sweep.sign*sweep.width*i/(sweep.total-1);assert(Math.abs(Math.atan2(Math.sin(actual-expected),Math.cos(actual-expected)))<1e-9,'Locked evenly spaced sweep ignores moving targets');}
 const last=Math.atan2(state.bullets.at(-1).dy,state.bullets.at(-1).dx);assert(Math.abs(last-first-sweep.width)<1e-9);const rest=tank.burst.restUntil-state.t;assert(rest>=2.5&&rest<3.5);state.t=tank.burst.restUntil;tank.cool=0;f.aimTank(tank,isolated);if(!tank.sweep){state.t=tank.burst.readyAt;f.aimTank(tank,isolated);}assert.equal(tank.sweep.sign,-sweep.sign,'Successive bursts reverse sweep direction');
 f.trackBurst(tank,null);state.aliens=[];const nest={x:600,y:400,hp:50};const fallback=f.tankGroup(tank,nest);assert.equal(fallback.target,nest);assert.equal(fallback.width,25*Math.PI/180);
 state.aliens=[bug(179),bug(-179),bug(175)];assert.equal(f.tankGroup(tank,nest).count,3,'Density grouping wraps across angle boundary');state.rocks=[{x:190,y:350,w:20,h:100}];assert.equal(f.tankGroup(tank,nest).count,0,'Group selection ignores bugs behind walls');
 console.log('Passed tank density targeting, 9–12-shot 0.20s barrages, locked evenly spaced 25–80 degree sweep, direction alternation, rest, nest fallback, angle wrap and wall-limited grouping.');
}

{
 api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.cannons=[];state.aliens=[];state.nests=[];state.pickups=[];
 const troop=f.addTroop(52,400,400),second=f.addTroop(52,420,400,'commando'),eagle={x:500,y:400,type:'troops'};state.pickups=[eagle];const origin=troop.x;
 assert(f.supplyStep(troop,null,.1));assert(troop.supplyTrip);assert(troop.x>origin);assert.equal(f.supplyStep(second,null,.1),false,'Eagle is reserved by one troop');
 const hostile={x:550,y:400,team:'alien',alive:true,hp:4};state.aliens=[hostile];const x=troop.x;f.supplyStep(troop,null,.1);assert.equal(troop.x,x,'Detected enemy pauses eagle travel before firing reaction');state.aliens=[];f.supplyStep(troop,null,.1);assert(troop.x>x,'Trip resumes when clear');
 for(let i=0;i<100&&state.pickups.includes(eagle);i++)f.supplyStep(troop,null,.1);assert(!state.pickups.includes(eagle));assert.equal(troop.supplyTrip.phase,'return');for(let i=0;i<100&&troop.supplyTrip;i++)f.supplyStep(troop,null,.1);assert.equal(troop.supplyTrip,null);assert(Math.abs(troop.x-origin)<=12,'Troop returns to departure position');
 troop.nextSupplyScan=0;state.pickups=[{x:500,y:400,type:'troops'}];f.supplyStep(troop,null,.1);const leader=state.humans.find(u=>u.id===1);leader.x=troop.x;leader.y=troop.y;f.giveOrder(leader,1);assert.equal(troop.supplyTrip,null,'New commander order cancels trip');
 troop.nextSupplyScan=0;f.supplyStep(troop,null,.1);state.pickups=[];leader.x=450;leader.y=500;f.supplyStep(troop,null,.1);assert(troop.y>400,'Follow return tracks current leader');f.cancelSupply(troop);
 troop.order=0;troop.x=400;troop.y=400;troop.nextSupplyScan=0;state.pickups=[{x:500,y:400,type:'troops'}];state.rocks=[{x:460,y:38,w:20,h:730}];assert.equal(f.supplyStep(troop,null,.1),false,'No seeking unreachable eagle across full wall');state.rocks=[];sandbox.window.TriumphNavigation.reset();troop.nextSupplyScan=0;
 f.selectTroops({x:390,y:390},{x:430,y:410});f.attackMoveTo({x:600,y:400},true);const before=troop.x;state.bullets=[];f.attackMoveStep(troop,hostile,.1);assert(troop.x>before);assert.equal(state.bullets.length,0,'Force move ignores target');assert.equal(troop.supplyTrip,null);
 state.mode='playing';canvasHandlers.pointerdown({clientX:100+390/2,clientY:50+390/2,button:0,shiftKey:false,pointerId:24,preventDefault:noop});canvasHandlers.pointerup({clientX:100+440/2,clientY:50+420/2,button:0,shiftKey:false,pointerId:24,preventDefault:noop});const pointer=(timeStamp)=>({clientX:100+600/2,clientY:50+400/2,button:2,timeStamp,shiftKey:false,pointerId:25,preventDefault:noop});canvasHandlers.pointerdown(pointer(1000));assert.equal(troop.attackMove.force,false,'First right click is attack move');canvasHandlers.pointerdown(pointer(1200));assert.equal(troop.attackMove.force,true,'Double right click becomes force move');
 console.log('Passed eagle reservation, departure return, threat pause/resume, order cancellation, Follow return, inaccessible eagle filtering and double-right-click force move.');
}

{
 api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.cannons=[];state.pickups=[];
 const tank={x:400,y:400,team:'human',type:'tank',alive:true,hp:8,cool:0,weapon:0,order:0},troop=f.addTroop(52,410,410),nest={x:550,y:400,hp:50},bug={x:500,y:470,team:'alien',type:'soldier',alive:true,hp:4};state.humans.push(tank);state.nests=[nest];state.aliens=[bug];f.selectTroops({x:390,y:390},{x:430,y:430});f.focusAttackTo(nest);assert.equal(tank.focusTarget,nest);assert.equal(troop.focusTarget,nest);assert.equal(tank.attackMove,null);assert.equal(f.enemyAt({x:550,y:405}),nest);
 state.bullets=[];f.focusAttackStep(tank,.02);state.t=tank.burst.readyAt;f.focusAttackStep(tank,.02);assert.equal(state.bullets.length,1);assert(Math.abs(Math.atan2(state.bullets[0].dy,state.bullets[0].dx)+15*Math.PI/360)<1e-9,'Tank focus starts at minimum arc edge');assert.equal(tank.sweep.width,15*Math.PI/180);
 nest.y=430;tank.cool=0;state.t+=.2;f.focusAttackStep(tank,.02);const b=state.bullets.at(-1);assert(Math.abs(Math.atan2(b.dy,b.dx)-(Math.atan2(30,150)+tank.sweep.sign*tank.sweep.width*(1/(tank.sweep.total-1)-.5)))<1e-9,'Focused tank sweeps across assigned target');
 state.rocks=[{x:470,y:350,w:20,h:150}];const count=state.bullets.length;tank.cool=0;f.focusAttackStep(tank,.1);assert.equal(state.bullets.length,count,'No focus fire through wall');assert.equal(tank.focusTarget,nest,'Occlusion retains explicit target for pursuit');state.rocks=[];
 nest.hp=0;assert.equal(f.focusAttackStep(tank,.02),false);assert.equal(tank.focusTarget,null);assert.equal(tank.order,3,'Destroyed focus target ends order');nest.hp=50;f.focusAttackTo(nest);f.attackMoveTo({x:700,y:500},true);assert.equal(troop.focusTarget,null,'New movement cancels focus');
 canvasHandlers.pointerdown({clientX:100+390/2,clientY:50+390/2,button:0,shiftKey:false,pointerId:32,preventDefault:noop});canvasHandlers.pointerup({clientX:100+450/2,clientY:50+450/2,button:0,shiftKey:false,pointerId:32,preventDefault:noop});const click=timeStamp=>({clientX:100+nest.x/2,clientY:50+nest.y/2,button:2,timeStamp,pointerId:33,preventDefault:noop});canvasHandlers.pointerdown(click(3000));canvasHandlers.pointerdown(click(3150));assert.equal(troop.focusTarget,nest,'Double right-click nest issues focus attack');assert.equal(troop.attackMove,null,'Enemy double-click does not force-move');
 const commander=state.humans.find(u=>u.id===1);commander.x=420;commander.y=410;f.giveOrder(commander,3);assert.equal(troop.focusTarget,null,'Commander orders cancel focus');
 console.log('Passed group focus attacks, target hit detection, direct tank focus vs sweeping, target tracking, wall pursuit, target death, replacement orders and double-right-click enemy focus.');
}

{
 api.loadMission(3);let f=sandbox.window.__fixture(),state=f.state;const troops=state.humans.filter(u=>u.type==='soldier').length;assert(f.reinforce('troops'));for(let i=0;i<800;i++){state.t+=.02;f.updateSupport(.02);}assert(state.humans.filter(u=>u.type==='soldier').length>=troops+5,'Flash Back carrier delivers a squad');assert.equal(state.reinforcements.length,0,'Carrier completes route after extended unload');for(const u of state.humans.filter(u=>u.type==='soldier').slice(troops))assert(!f.blocked(u.x,u.y),'Troops must arrive on clear ground');
 api.loadMission(3);f=sandbox.window.__fixture();state=f.state;assert(f.reinforce('tank'));const tank=state.humans.at(-1);assert.equal(tank.type,'tank');assert(tank.y>=42&&tank.y<768);assert(!f.blocked(tank.x,tank.y),'Flash Back tank arrives on clear terrain');const before={x:tank.x,y:tank.y};f.navigate(tank,20,20,.1,30);assert(Math.hypot(tank.x-before.x,tank.y-before.y)>0,'Arriving tank can move');
 api.loadMission(3);f=sandbox.window.__fixture();state=f.state;assert(f.reinforce('air'));const aircraft=state.reinforcements.at(-1);assert(f.flightEntersMap(aircraft,aircraft.angle),'Flash Back aircraft points into battlefield');for(let i=0;i<1000;i++){state.t+=.02;f.updateSupport(.02);}assert(state.humans.some(u=>u.type==='commando'),'Flash Back air call delivers commandos');assert.equal(state.reinforcements.length,0,'Aircraft departs after visible pass');for(const u of state.humans.filter(u=>u.type==='commando'))assert(!f.blocked(u.x,u.y),'Air troops land on clear terrain');
 console.log('Passed Flash Back carrier squad unloading, tank clear-ground arrival/movement and corrected aircraft entry/commando delivery.');
}

{
 api.loadMission(3);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.cannons=[];state.pickups=[];state.aliens=[];const nest={x:600,y:752,hp:50};state.nests=[nest];
 const tank={x:450,y:730,team:'human',type:'tank',alive:true,hp:8,cool:0,weapon:0,order:0};state.humans=[...state.humans.filter(u=>u.type==='commander'),tank];f.selectTroops({x:440,y:720},{x:460,y:740});f.focusAttackTo(nest);assert(f.visible(tank,nest),'Bottom-edge nest is visible to projectile LOS');const x=tank.x,y=tank.y;f.focusAttackStep(tank,.1);assert.equal(tank.x,x);assert.equal(tank.y,y,'In-range focus must not walk into nest');state.t=tank.burst.readyAt;state.bullets=[];f.focusAttackStep(tank,.1);assert.equal(state.bullets.length,1,'Bottom-edge focus attack fires');
 const ready=tank.burst.readyAt,remaining=tank.burst.remaining;f.focusAttackTo(nest);assert.equal(tank.burst.readyAt,ready,'Repeated target click preserves reaction timer');assert.equal(tank.burst.remaining,remaining,'Repeated target click preserves active burst');
 canvasHandlers.pointerdown({clientX:100+440/2,clientY:50+720/2,button:0,shiftKey:false,pointerId:40,preventDefault:noop});canvasHandlers.pointerup({clientX:100+460/2,clientY:50+740/2,button:0,shiftKey:false,pointerId:40,preventDefault:noop});const click=timeStamp=>({clientX:100+600/2,clientY:50+752/2,button:2,timeStamp,pointerId:41,preventDefault:noop});canvasHandlers.pointerdown(click(1000));assert.equal(tank.focusTarget,nest,'First enemy click focuses without movement prelude');canvasHandlers.pointerdown(click(1100));canvasHandlers.pointerdown(click(1200));assert.equal(tank.focusTarget,nest,'Third click must not downgrade focus');assert.equal(tank.attackMove,null);
 const bug={x:600,y:730,team:'alien',type:'soldier',alive:true,hp:4};state.aliens=[bug];state.nests=[];const movingClick=timeStamp=>({...click(timeStamp),clientY:50+730/2});canvasHandlers.pointerdown(movingClick(2000));bug.x=650;canvasHandlers.pointerdown(movingClick(2100));assert.equal(tank.focusTarget,bug,'Second click remembers a moving enemy');assert.equal(tank.attackMove,null);state.rocks=[{x:520,y:680,w:20,h:88}];assert.equal(f.visible(tank,bug),false,'Projectile LOS still blocks intervening walls');
 console.log('Passed edge-of-map focus fire, repeated/triple-click stability, preserved burst timers, moving-target click capture and wall-blocked projectile LOS.');
}

{
 api.loadMission(3);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.mask=null;state.rocks=[];state.props=[];state.aliens=[];state.nests=[];state.pickups=[];state.cannons=[];
 const door={x:550,y:380,w:15,h:40,cx:557,cy:400,object:252,locked:true,open:false},terminal={x:500,y:400,object:253,active:false};state.doors=[door];state.terminals=[terminal];const troop=f.addTroop(52,450,400),other=f.addTroop(52,450,410);f.selectTroops({x:440,y:390},{x:460,y:420});
 assert.equal(f.usableAt({x:500,y:400}).kind,'terminal');assert.equal(f.usableAt({x:557,y:400}).kind,'door');f.useOrderTo(f.usableAt(terminal));for(let i=0;i<60&&!troop.useOrder.done;i++)f.useOrderStep(troop,.1);assert(terminal.used);assert.equal(door.locked,false,'Targeted terminal applies source door unlock');f.useOrderStep(other,.1);assert.equal(other.useOrder,null,'Shared action completes once');
 troop.x=520;troop.y=400;other.x=520;other.y=410;f.useOrderTo(f.usableAt({x:557,y:400}));f.useOrderStep(troop,.1);assert.equal(door.open,true,'Use order opens only selected door');f.useOrderStep(other,.1);assert.equal(door.open,true,'Group does not toggle door back closed');
 f.useOrderTo(f.usableAt({x:557,y:400}));state.t+=1;f.useOrderStep(troop,.1);assert.equal(door.open,false,'Use on open door closes it');door.locked=true;f.useOrderTo(f.usableAt({x:557,y:400}));state.t+=1;f.useOrderStep(troop,.1);assert.equal(door.open,false,'Locked doors are not bypassed');assert.equal(troop.useOrder.done,false);
 f.attackMoveTo({x:700,y:500},true);assert.equal(troop.useOrder,null,'Movement cancels use order');door.locked=false;troop.x=450;troop.y=400;other.x=450;other.y=410;
 canvasHandlers.pointerdown({clientX:100+440/2,clientY:50+390/2,button:0,shiftKey:false,pointerId:44,preventDefault:noop});canvasHandlers.pointerup({clientX:100+460/2,clientY:50+420/2,button:0,shiftKey:false,pointerId:44,preventDefault:noop});const click=timeStamp=>({clientX:100+terminal.x/2,clientY:50+terminal.y/2,button:2,timeStamp,pointerId:45,preventDefault:noop});canvasHandlers.pointerdown(click(5000));canvasHandlers.pointerdown(click(5100));assert.equal(troop.useOrder.kind,'terminal','Double right click usable issues use rather than force move');assert.equal(troop.attackMove,null);
 terminal.used=false;troop.x=470;state.rocks=[{x:480,y:350,w:8,h:100}];f.useOrderStep(troop,.1);assert.equal(terminal.used,false,'Cannot operate terminal through intervening wall');state.rocks=[];
 console.log('Passed usable hit detection, terminal activation/source unlock, shared door open/close, locked-door waiting, movement cancellation, double-click use and blocked interaction sight.');
}

{
 for(let mission=1;mission<=9;mission++){
  api.loadMission(mission);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.t=100;state.bullets=[];state.aliens=[];state.nests.forEach(n=>n.hp=0);state.terminals.forEach(t=>t.active=true);state.waveKills={normal:999,queen:999};if(state.crystal)state.crystal.recovered=true;
  const merits=state.merits;assert(f.missionProgress().ready);f.update(.01);assert.equal(state.mode,'victory',`Cleared mission ${mission} completes automatically`);const reward=state.merits;assert(reward>merits);f.update(.1);assert.equal(state.merits,reward,'Victory reward applies once');
 }
 api.loadMission(3);let f=sandbox.window.__fixture(),state=f.state;state.mode='playing';state.t=100;state.aliens=[];state.nests.forEach(n=>n.hp=0);assert.equal(f.missionProgress().terminals,1);f.update(.01);assert.equal(state.mode,'playing','Terminal prerequisite still required');state.terminals.find(t=>t.object===257).active=true;f.update(.01);assert.equal(state.mode,'victory','Final terminal automatically completes cleared mission');
 api.loadMission(5);f=sandbox.window.__fixture();state=f.state;state.mode='playing';state.t=100;assert.equal(f.missionProgress().wave,200);assert(!f.missionProgress().ready,'Wave quota cannot be skipped');
 api.loadMission(4);f=sandbox.window.__fixture();state=f.state;state.aliens=[];for(const [x,y] of [[-50,100],[1100,400],[500,810],[500,5]]){const bug=f.spawnGroundBug(x,y);assert(bug.x>=16&&bug.x<=1008&&bug.y>=44&&bug.y<=744);assert(!f.blocked(bug.x,bug.y),'New bug resolves onto clear playable terrain');}
 console.log('Passed automatic victory and single rewards in all nine missions, terminal/wave prerequisites, progress reporting and clear-ground bug births at map boundaries.');
}

{
 api.loadMission(3);elements['#start'].onclick();const f=sandbox.window.__fixture(),state=f.state;const troop=state.humans.find(u=>u.type==='soldier');troop.x=400;troop.y=400;
 elements['#pause'].onclick();assert(api.state().paused);const time=state.t,position={x:troop.x,y:troop.y},bullets=state.bullets.length;
 const pointer=(x,y,button,timeStamp=10000)=>({clientX:100+x/2,clientY:50+y/2,button,timeStamp,pointerId:80,preventDefault:noop});
 canvasHandlers.pointerdown(pointer(390,390,0));canvasHandlers.pointermove(pointer(410,410,0));canvasHandlers.pointerup(pointer(410,410,0));assert(f.selection.has(troop),'Paused drag selects troops');
 canvasHandlers.pointerdown(pointer(600,450,2,10000));assert(troop.attackMove&&!troop.attackMove.force,'Paused attack move accepted');canvasHandlers.pointerdown(pointer(600,450,2,10100));assert(troop.attackMove.force,'Paused force move accepted');
 const nest=state.nests[0];canvasHandlers.pointerdown(pointer(nest.x,nest.y,2,11000));assert.equal(troop.focusTarget,nest,'Paused enemy focus accepted');
 const terminal=state.terminals[0];canvasHandlers.pointerdown(pointer(terminal.x,terminal.y,2,12000));canvasHandlers.pointerdown(pointer(terminal.x,terminal.y,2,12100));assert.equal(troop.useOrder.kind,'terminal','Paused use order accepted');assert(!terminal.used,'Paused use is not activated immediately');
 const rectangles=[];ctx.fillRect=(...args)=>rectangles.push(args);frames(2);assert(!rectangles.some(r=>r[0]===145&&r[1]===105&&r[2]===734),'Pause has no large battlefield overlay');ctx.fillRect=noop;
 assert.equal(state.t,time);assert.equal(troop.x,position.x);assert.equal(troop.y,position.y);assert.equal(state.bullets.length,bullets,'Combat stays frozen');
 elements['#cmd-1'].onclick();state.humans[0].x=400;state.humans[0].y=400;frames(1);assert.equal(elements['#order-3'].disabled,false);elements['#order-3'].onclick();assert.equal(troop.order,3,'Paused squad button works');
 handlers.keydown(event('KeyB'));handlers.keyup(event('KeyB'));handlers.keydown(event('KeyW'));handlers.keyup(event('KeyW'));assert.equal(troop.order,2,'Paused keyboard squad order works');
 canvasHandlers.pointerdown(pointer(600,400,2));handlers.keydown(event('KeyV'));handlers.keyup(event('KeyV'));assert.equal(state.bullets.length,bullets,'Paused commander cannot fire');
 elements['#options'].onclick();elements['#close'].onclick();assert(api.state().paused,'Controls preserves tactical pause');
 f.selectTroops({x:390,y:390},{x:410,y:410});f.attackMoveTo({x:600,y:450},true);elements['#pause'].onclick();frames(10);assert(state.t>time);assert(Math.hypot(troop.x-position.x,troop.y-position.y)>0,'Paused movement executes after resume');
 console.log('Passed unobstructed tactical pause, paused selection/move/focus/use/button/keyboard orders, frozen combat/time, preserved modal pause and execution after resume.');
}
