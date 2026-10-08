if (require.main === module) process.chdir(require('node:path').resolve(__dirname, '..'));
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const handlers={},elements={},noop=()=>{};
const ctx=new Proxy({}, {get:(o,k)=>o[k]||noop,set:(o,k,v)=>(o[k]=v,true)});
for(const id of ['#place-charge','#preferred-mode','#rally','#cmd-1','#cmd-2','#cmd-3','#cmd-4','#order-0','#order-1','#order-2','#order-3','#command-hint','#gamepad-status','#units','#units-close','#units-context','#unit-cards','#reinforcements','#reinforcement-slots','#reinforcement-message','#reinforcement-save','#reinforcement-close'])elements[id]={setAttribute:noop};
const canvasHandlers={};const canvas={attributes:{},setAttribute(k,v){this.attributes[k]=v},getContext:()=>ctx,focus:noop,addEventListener:(name,cb)=>canvasHandlers[name]=cb,getBoundingClientRect:()=>({left:100,top:50,width:512,height:384}),setPointerCapture:noop,hasPointerCapture:()=>true,releasePointerCapture:noop};
for(const id of ['#start','#pause','#reset','#options','#close'])elements[id]={setAttribute:noop};
elements['#game']=canvas;elements['#bots']={checked:true};elements['#difficulty']={value:'normal'};
elements['#controls']={open:false,showModal(){this.open=true},close(){this.open=false}};
elements['#unit-guide']={open:false,showModal(){this.open=true},close(){this.open=false;this.onclose()}};
elements['#reinforcement-menu']={open:false,showModal(){this.open=true},close(){this.open=false;this.onclose()}};
elements['#mission']={value:'0'};
class Image {constructor(){this.complete=true;this.naturalWidth=20;}}
class Audio {cloneNode(){return this}play(){return Promise.resolve()}}
const sandbox={console,Math,JSON,Set,Map,Image,Audio,Uint8Array,atob:s=>Buffer.from(s,'base64').toString('latin1'),navigator:{getGamepads:()=>[]},document:{hasFocus:()=>true,querySelector:id=>elements[id],createElement:()=>canvas},window:{addEventListener:(name,cb)=>handlers[name]=cb},requestAnimationFrame:cb=>sandbox.nextFrame=cb};
vm.createContext(sandbox);
for(const file of ['assets/original-data.js','assets/original-rules.js','assets/audio/catalog.js','assets/support-rules.js','navigation.js','assets/pickup-rules.js','support.js','src/breeding.js','src/balance.js','assets/custom/split-ridge/terrain.js','assets/custom/relay-basin/terrain.js','assets/custom/switchback-mesa/terrain.js','assets/custom/beneath-dunes/terrain.js','assets/custom/beneath-dunes-variant-b/terrain.js','assets/custom/whiteout-signal/terrain.js','assets/custom/harbor-watch/terrain.js','assets/custom/district-twelve/terrain.js','assets/custom/jungle-canopy/terrain.js','assets/custom/volcanic-forge/terrain.js','assets/custom/undercity-tunnels/terrain.js','src/custom-missions.js','src/missions.js','src/rally.js','src/vent-bugs.js','src/desert-worm.js','src/desert-riders.js','src/jungle-ambush.js','src/volcanic-hazards.js','src/projectiles.js','src/winter-gunner.js','src/capital-troopers.js','src/maritime-troopers.js','src/corner-ambusher.js','src/recon.js','src/mercenary-troopers.js','src/industrial-troopers.js','src/volcanic-troopers.js','src/toxic-marsh-troopers.js','src/combat.js','src/orders.js','src/input.js','src/gamepad.js','src/input-dom.js','src/support-lifecycle.js','src/rendering.js','game.js']){
 let source=fs.readFileSync(''+file,'utf8');
  if(file==='game.js')source=source.replace(/\}\)\(\);\s*$/, 'window.__fixture=()=>({state:s,setSeed:value=>seed=value>>>0,interact,update,fire,kill,blocked,grenade,reinforce,reinforcementStatus,updateSupport,pickup,navigate,move,aimHuman,perceive,enemyFireDelay,patrol,selectTroops,attackMoveTo,attackMoveStep,selection,selectable,infantryType,spawnPickupRoll,updatePickupSpawns,hasRespawnSupport,respawnCommander,damage,selectCommander,mouseCommanderAction,bugIntent,alertPack:typeof alertPack!=="undefined"?alertPack:null,emitAcousticEvent:typeof emitAcousticEvent!=="undefined"?emitAcousticEvent:null,trackBurst,burstRules,spawnGroundBug,spawnDesertWorm,spawnDesertRider,supportExplosion,addTroop,variantMark,tankGroup,aimTank,tankSweepRules,supplyStep,cancelSupply,reinforcementRule,giveOrder,enemyAt,focusAttackTo,focusAttackStep,groundArrival,flightEntersMap,visible,usableAt,useOrderTo,useOrderStep,missionProgress,bugArrival,toggleRally,addRally,removeRally,assignRally,drawSprites:()=>{const calls=[],previous=sprite;try{sprite=(...args)=>{calls.push(args);return true;};draw();}finally{sprite=previous;}return calls;}});})();');
 vm.runInContext(source,sandbox);
}
const api=sandbox.window.triumph,event=code=>({code,preventDefault:noop});let time=0;
function resumeSimulation(){if(api.state().paused)elements['#pause'].onclick();}
function frames(n){for(let i=0;i<n;i++){time+=16.6667;sandbox.nextFrame(time)}}
assert.equal(api.state().mode,'briefing');assert.equal(api.missions.length,9);
// Approved Normal baseline; source roll ceiling is not a movement-speed setting.
{
 const motion={veryeasy:22/24,easy:23/24,normal:1,hard:25/24,veryhard:27/24};
 for(const [setting,mult] of Object.entries(motion)){
  elements['#difficulty'].value=setting;api.loadMission(1);const st=sandbox.window.__fixture().state;
  assert.equal(sandbox.window.TriumphBalance.motionMultipliers[setting],mult);assert.equal(st.difficulty.speed,undefined);elements['#units'].onclick();const guide=elements['#unit-cards'].innerHTML;assert(!guide.includes('NaN')&&!guide.includes('Infinity'),'Finite Units guide for '+setting);assert(guide.includes(`${st.profile.nestRollSuccesses}% opportunity / 0.5 s; birth after 1.8 s`),'Exact nest cadence for '+setting);elements['#units-close'].onclick();assert.equal(st.difficulty.evolutionRollMax,{veryeasy:22,easy:23,normal:24,hard:25,veryhard:27}[setting]);
  assert(st.nests.every(n=>n.breeding&&n.breeding.next===.5));if(setting!=='normal'){const f=sandbox.window.__fixture();st.flowers=[];st.t=2;for(const roll of [22,23,24,25,26,27])f.spawnPickupRoll(roll);assert.equal(st.flowers.length,0,'Other profiles retain no random plants');}
 }
 elements['#difficulty'].value='normal';
 for(let mission=1;mission<=9;mission++){
  api.loadMission(mission);const f=sandbox.window.__fixture(),st=f.state;st.t=2;st.flowers=[];st.pickups=[];
  for(const roll of [21,25])f.spawnPickupRoll(roll);assert.equal(st.flowers.length,0);
  for(const roll of [22,23,24])f.spawnPickupRoll(roll);
  assert.equal(st.flowers.length,mission<=3?3:0,'Exact recovered global guards for mission '+mission);
  f.spawnPickupRoll(22);f.spawnPickupRoll(22);assert.equal(st.flowers.length,mission<=3?4:0,'Source <=3 permits fourth plant');
  assert(!st.pickups.some(p=>p.type==='growplant'),'Plants are not collectible rewards');for(const flower of st.flowers)assert(!f.blocked(flower.x,flower.y));
  st.mode='playing';resumeSimulation();st.humans=st.humans.filter(u=>u.type==='commander');for(const u of st.humans){u.external={until:1e6};u.shieldUntil=1e6;}
  st.aliens=[];st.vents=[];st.flowers=[];st.pickupClock=1e6;st.reinforcements=[];st.t=40;st.wave=null;for(const terminal of st.terminals)terminal.active=true;if(st.crystal)st.crystal.recovered=true;
  const nest={x:900,y:700,hp:50,breeding:sandbox.window.TriumphBreeding.create(1)};st.nests=[nest];
  // Force a successful opportunity using an independently seeded first roll.
  for(let seed=0;seed<100000;seed++){const b=sandbox.window.TriumphBreeding.create(seed);if(sandbox.window.TriumphBreeding.roll(b)<=3){nest.breeding=sandbox.window.TriumphBreeding.create(seed);break;}}
  f.update(.5);assert(nest.breeding.busy);assert(!f.missionProgress().ready,'Pending birth retains live nest objective');
  elements['#pause'].onclick();const before=JSON.stringify(nest.breeding);f.update(3);assert.equal(JSON.stringify(nest.breeding),before,'Tactical freeze preserves pending birth');elements['#pause'].onclick();
  nest.hp=0;f.update(.02);assert.equal(st.aliens.length,0);assert.equal(st.mode,'victory','Destroyed pending birth permits completion on mission '+mission);
 }
 api.loadMission(1);const f=sandbox.window.__fixture(),st=f.state;st.mode='playing';resumeSimulation();st.nests=[];st.pickupClock=1e6;
 const u=st.humans.find(u=>u.type==='commander');u.external={until:1e6};const score=st.score[u.id-1];st.flowers=[{x:u.x,y:u.y,alive:true,object:108}];f.update(.01);assert.equal(st.flowers[0].alive,false);assert.equal(st.score[u.id-1],score,'Commander destroys plant without pickup reward');
 for(const type of ['soldier','redbug']){st.aliens=[];st.flowers=[{x:800,y:700,alive:true,object:108}];const a=f.spawnGroundBug(800,700);a.type=type;a.cool=100;f.update(.01);assert.equal(a.type,'queen');assert.equal(a.hp,50);assert.equal(st.flowers[0].alive,false);}
 api.loadMission(1);assert(sandbox.window.__fixture().state.nests.every(n=>n.breeding.clock===0&&!n.breeding.busy),'Restart resets all pending breeding');
 console.log('Passed Normal semantics, preserved non-Normal profiles, growplant guards/cap/contact and all-nine pending birth freeze/destroy/completion/restart checks.');
}
elements['#start'].onclick();resumeSimulation();assert.equal(api.state().mode,'playing');
assert.equal(api.state().activeCommander,null);assert.equal(api.state().mouseMode,'troops');elements['#cmd-1'].onclick();const start=api.state().commanders[0].x;handlers.keydown(event('KeyD'));frames(30);handlers.keyup(event('KeyD'));assert(api.state().commanders[0].x>start+25,'Player 1 movement should respond');
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
for(let m=1;m<=9;m++){api.loadMission(m);assert.equal(api.state().mission,m);assert.equal(api.state().commanders.length,4);assert(api.state().army>0);elements['#start'].onclick();resumeSimulation();frames(60);assert.equal(api.state().mode,'playing');console.log('Mission',m,api.missions[m-1].name,'army',api.state().army,'bugs',api.state().aliens.length,'doors',api.state().doors.length);}
api.loadMission(1);elements['#start'].onclick();resumeSimulation();handlers.keydown(event('F2'));handlers.keyup(event('F2'));assert.equal(api.state().mode,'briefing');
api.loadMission(3);let fixture=sandbox.window.__fixture(),state=fixture.state;
assert.equal(state.doors.find(d=>d.object===244).locked,false);assert.equal(state.doors.find(d=>d.object===252).locked,true);
const firstTerminal=state.terminals.find(t=>t.object===253),commander=state.humans[0];commander.x=firstTerminal.x;commander.y=firstTerminal.y;fixture.interact(commander);
assert.equal(state.doors.find(d=>d.object===252).locked,false);assert.equal(firstTerminal.active,false,'Unlock terminal has no completion flag');
const secondTerminal=state.terminals.find(t=>t.object===257);commander.x=secondTerminal.x;commander.y=secondTerminal.y;fixture.interact(commander);assert.equal(secondTerminal.active,true);
state.mode='playing';resumeSimulation();state.aliens=[];state.nests=[];state.t=34;fixture.update(.1);assert.equal(state.mode,'playing','Minimum mission time');state.t=35;fixture.update(.1);assert.equal(state.mode,'victory');
api.loadMission(7);fixture=sandbox.window.__fixture();assert.equal(fixture.state.terminals.length,8);
api.loadMission(8);fixture=sandbox.window.__fixture();assert(fixture.state.terminals.some(t=>t.object===436&&t.y===30),'Required cave terminal must not be filtered as a helper');
api.loadMission(9);fixture=sandbox.window.__fixture();state=fixture.state;assert.equal(state.crystal.hp,7);assert.equal(state.wave.normalKills,150);assert.equal(state.wave.queenKills,50);
api.loadMission(1);fixture=sandbox.window.__fixture();assert(fixture.state.nests.every(n=>n.hp===50));assert(fixture.state.aliens.every(a=>a.hp===4));
for(const [difficulty,health] of [['veryeasy',2],['easy',3],['normal',4],['hard',5],['veryhard',6]]){elements['#difficulty'].value=difficulty;api.loadMission(1);assert(sandbox.window.__fixture().state.aliens.every(a=>a.hp===health));}
elements['#difficulty'].value='normal';api.loadMission(5);fixture=sandbox.window.__fixture();state=fixture.state;state.mode='playing';resumeSimulation();state.t=24.8;state.aliens=[];state.nests=[];fixture.update(.1);assert.equal(state.aliens.length,0);state.t=25;fixture.update(.01);assert.equal(state.aliens.length,1,'Hold Base starts after its original timer');assert.equal(state.waveRemaining,200,'Spawning does not satisfy a kill target');fixture.kill(state.aliens[0],1);fixture.update(.01);assert.equal(state.waveKills.normal,1);assert.equal(state.waveRemaining,199);state.waveKills.normal=200;state.aliens=[];state.t=31;fixture.update(.01);assert.equal(state.mode,'victory');
api.loadMission(3);fixture=sandbox.window.__fixture();state=fixture.state;state.mode='playing';resumeSimulation();state.t=1;state.aliens=[];state.nests=[];elements['#cmd-1'].onclick();const door=state.doors.find(d=>d.object===244);state.humans[0].x=door.cx;state.humans[0].y=door.cy;handlers.keydown(event('KeyV'));assert.equal(door.open,true);frames(32);assert.equal(door.open,true,'Holding Fire must not toggle the door repeatedly');handlers.keyup(event('KeyV'));handlers.keydown(event('KeyV'));handlers.keyup(event('KeyV'));assert.equal(door.open,false);
api.loadMission(9);fixture=sandbox.window.__fixture();state=fixture.state;state.mode='playing';resumeSimulation();state.aliens=[];state.nests=[];state.vents=[];state.waveKills={normal:150,queen:50};for(const t of state.terminals)t.active=true;state.crystal.y=-29.9;fixture.update(.02);assert.equal(state.crystal.recovered,true);assert.equal(state.mode,'victory','Final mission also requires crystal extraction');
console.log('Passed recovered rules: door dependencies, terminal completion flags, 35-second mission gate, cave terminal, crystal durability, final kill targets, and normal-difficulty bug/egg health.');
api.loadMission(1);fixture=sandbox.window.__fixture();state=fixture.state;const initialTroops=state.humans.filter(u=>u.type==='soldier').length;
assert(fixture.reinforce('troops'));assert.equal(state.humans.filter(u=>u.type==='soldier').length,initialTroops,'Carrier calls must not instantly create infantry');assert.equal(state.reinforcements[0].kind,'carrier');
let carrierStopped=false;for(let i=0;i<500;i++){state.t+=.02;fixture.updateSupport(.02);if(state.reinforcements.some(r=>r.kind==='carrier'&&r.path.pause>0))carrierStopped=true;}
assert(carrierStopped,'Recovered pause node is used');assert(state.humans.filter(u=>u.type==='soldier').length>initialTroops,'Carrier drops troops while stopped');assert.equal(state.reinforcements.length,0,'Carrier leaves at path end');
api.loadMission(1);fixture=sandbox.window.__fixture();state=fixture.state;assert(fixture.reinforce('air'));assert.equal(state.reinforcements[0].kind,'air');for(let i=0;i<600;i++){state.t+=.02;fixture.updateSupport(.02);}assert(state.humans.some(u=>u.type==='commando'),'Aircraft pass completes animated commando drops');assert.equal(state.reinforcements.length,0);
api.loadMission(7);fixture=sandbox.window.__fixture();state=fixture.state;const before=state.humans.length;assert(fixture.reinforce('troops'));assert.equal(state.humans.length,before+5,'Indoor reinforcement uses five source-created troops');assert(fixture.reinforce('air'));assert.equal(state.reinforcements.at(-1).kind,'infiltration');assert(fixture.reinforce('tank'));assert.equal(state.humans.at(-1).type,'robot');assert.equal(state.humans.at(-1).hp,7);
for(let i=0;i<600;i++){state.t+=.02;fixture.updateSupport(.02);}assert.equal(state.reinforcements.length,0,'Zipline creator expires after ten seconds');assert(state.humans.length>before+6,'Zipline animation creates additional troops');
api.loadMission(1);fixture=sandbox.window.__fixture();state=fixture.state;assert(fixture.reinforce('blitz'));assert.equal(state.reinforcements.filter(r=>r.kind==='air').length,2);assert.equal(state.reinforcements.filter(r=>r.kind==='carrier').length,1);assert.equal(state.humans.filter(u=>u.type==='tank').length,3);
api.loadMission(1);fixture=sandbox.window.__fixture();state=fixture.state;fixture.reinforce('troops');state.mode='playing';resumeSimulation();for(const u of state.humans){u.alive=false;u.respawn=0;}fixture.update(.02);assert(state.humans.some(u=>u.type==='commander'&&u.alive),'Carrier supports commander respawn without deployed troops');assert.equal(state.mode,'playing');
console.log('Passed source support rules: carrier pause/drop/departure, air passes and landing animations, indoor five-troop arrival, zipline expiration, ground robots, BLITZ creation counts, and carrier-backed respawn.');
console.log('Passed: recovered maps and actors, movement, directional orders, grenades, assistant ownership, pause/resume, combat simulation, controls, F2, restart, and all nine mission initialization/render paths. Browser rendering/audio playback unverified.');

{
// Aiming rules: all infantry fire in eight directions (4 cardinal + 4 diagonal); bug spit follows facing.
api.loadMission(1);const fixture=sandbox.window.__fixture(),state=fixture.state;
state.bullets=[];
for(const angle of [.2,.7,1.4,2.8,-1.1]){const u={x:500,y:500,team:'human',type:'soldier',angle,cool:0,weapon:1,order:0};fixture.fire(u);const b=state.bullets.at(-1);assert(Math.abs(Math.sin(Math.atan2(b.dy,b.dx)*4))<1e-12,'Infantry bullets must be quantized to eight directions');}
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
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.props=[];state.doors=[];
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
for(let mission=1;mission<=9;mission++){api.loadMission(mission);const f=sandbox.window.__fixture(),state=f.state;state.t=2;state.pickups=[];if(mission===8){let free=0;for(let y=48;y<740;y+=8)for(let x=24;x<1000;x+=8)if(!f.blocked(x,y))free++;assert(free>1000,'Caves floor overlays must clear the solid base collision layer');}for(const roll of [0,6,9,11,13,15,17])f.spawnPickupRoll(roll);for(const type of ['troops','air','tank','auto','plasma','flame','grenade']){const expected=!['troops','air','tank'].includes(type)||!!f.reinforcementRule(type);assert.equal(state.pickups.some(p=>p.type===type),expected,'Mission '+mission+' only regenerates eligible '+type+' pickups');}for(const p of state.pickups)assert(!f.blocked(p.x,p.y),'Pickup cannot appear inside terrain');for(let n=0;n<20;n++)f.spawnPickupRoll(0);assert.equal(state.pickups.filter(p=>p.type==='troops').length,6,'Original ground pickup cap is six');}
api.loadMission(1);let f=sandbox.window.__fixture(),state=f.state;state.t=2;state.pickups=[];for(let i=0;i<300;i++){state.t+=1;f.updatePickupSpawns(1);}assert(state.pickups.some(p=>['troops','air','tank'].includes(p.type)),'Time-driven random generator must produce reinforcement eagles');
for(let mission=1;mission<=9;mission++){api.loadMission(mission);f=sandbox.window.__fixture();state=f.state;state.mode='playing';resumeSimulation();state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];state.wave=null;state.waveRemaining=0;state.crystal=null;const commanders=state.humans.filter(u=>u.type==='commander');for(const u of commanders)f.kill(u,0);for(let i=0;i<499;i++)f.update(.02);assert(commanders.every(u=>!u.alive),'Respawn must wait ten seconds');for(let i=0;i<3;i++)f.update(.02);assert(commanders.every(u=>u.alive),'All commanders should return on mission '+mission);assert(commanders.every(u=>u.shieldUntil>state.t),'Respawn should create temporary protection');f.damage(commanders[0],1,0);assert(commanders[0].alive,'Protected commander survives immediate spawn damage');state.t+=.7;f.damage(commanders[0],1,0);assert(!commanders[0].alive,'Shield must expire');}
api.loadMission(7);f=sandbox.window.__fixture();state=f.state;state.mode='playing';resumeSimulation();assert(f.reinforce('air'));for(const u of state.humans){u.alive=false;u.respawn=0;}state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];f.update(.02);assert(state.humans.some(u=>u.type==='commander'&&u.alive),'Pending indoor zipline arrivals permit respawn');assert.equal(state.mode,'playing');
console.log('Passed all nine missions: recovered random pickup types/caps/terrain placement, time-driven reinforcement eagles, ten-second commander return, spawn protection and pending indoor arrivals.');
}

{
for(const mission of [1,7,8,9])for(const type of ['troops','air','tank','blitz']){api.loadMission(mission);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];state.wave=null;state.crystal=null;state.pickupClock=100;const troop=state.humans.find(u=>u.alive&&u.type==='soldier');assert(troop);state.humans=state.humans.filter(u=>u.type==='commander'||u===troop);for(const c of state.humans.filter(u=>u.type==='commander')){c.x=900;c.y=500;}troop.x=500;troop.y=500;state.cannons=[];state.pickups=[{x:500,y:500,type}];const before=state.humans.length+state.reinforcements.length;f.update(.02);assert.equal(state.pickups.length,0,'Infantry collects '+type+' eagle on mission '+mission);assert(state.humans.length+state.reinforcements.length>before,'Infantry pickup calls support');const after=state.humans.length+state.reinforcements.length;f.update(.02);assert.equal(state.humans.length+state.reinforcements.length,after,'Collected eagle triggers once');}
api.loadMission(7);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];state.pickupClock=100;state.cannons=[];for(const u of state.humans){u.x=u.type==='commander'?900:500;u.y=500;}const troop=state.humans.find(u=>u.type==='soldier');const prototype={...troop};while(state.humans.filter(u=>u.type==='soldier').length<state.rules.maxAliens)state.humans.push({...prototype,x:600,y:600});state.pickups=[{x:troop.x,y:troop.y,type:'troops'}];f.update(.02);assert(state.pickups.some(p=>p.type==='troops'),'Unusable eagle remains when reinforcement cap is reached');
console.log('Passed regular infantry eagle pickup, all four support types, outdoor/indoor calls, single activation and retaining unusable pickups.');
}

{
for(let id=1;id<=4;id++){api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.pickups=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:900,y:700,hp:50,timer:1e6}];state.humans=state.humans.filter(u=>u.type==='commander');for(const c of state.humans){c.x=300+c.id*40;c.y=350;c.cool=0;}
elements['#cmd-'+id].onclick();assert.equal(api.state().activeCommander,id);const u=state.humans.find(c=>c.id===id),first=state.humans.find(c=>c.id===1),x=u.x,oldFirst=first.x;handlers.keydown(event('KeyD'));f.update(.1);handlers.keyup(event('KeyD'));assert(u.x>x+7,'WASD must control selected commander '+id);
state.bullets=[];u.cool=0;f.mouseCommanderAction({x:u.x,y:u.y-100});assert.equal(state.bullets.length,1);assert.equal(state.bullets[0].owner,id,'Mouse shot must belong to selected commander');assert(Math.abs(state.bullets[0].dx)<1e-12&&state.bullets[0].dy<0,'Mouse shot should follow an upward cursor');const grenades=u.grenades;f.mouseCommanderAction({x:u.x+100,y:u.y},true);assert.equal(u.grenades,grenades-1);f.mouseCommanderAction({x:u.x+100,y:u.y},true);assert.equal(u.grenades,grenades-1,'Rapid right-click respects grenade cooldown');
const troop={x:u.x+30,y:u.y,alive:true,team:'human',type:'soldier',order:0};state.humans.push(troop);for(let order=0;order<4;order++){elements['#order-'+order].onclick();assert.equal(u.order,order);assert.equal(troop.order,order,'Button applies commander order to nearby troop');assert.equal(troop.leader,id);}
}
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();elements['#cmd-4'].onclick();const u=state.humans.find(c=>c.id===4);u.cool=0;state.bullets=[];const pointer=(x,y,button=0)=>({clientX:100+x/2,clientY:50+y/2,button,shiftKey:false,pointerId:9,preventDefault:noop});state.humans=state.humans.filter(c=>c.type==='commander');canvasHandlers.pointerdown(pointer(850,400));canvasHandlers.pointerup(pointer(850,400));assert.equal(state.bullets[0].owner,4,'Canvas click fires selected commander');const n=u.grenades;canvasHandlers.pointerdown(pointer(850,400,2));assert.equal(u.grenades,n-1,'Canvas right-click throws grenade in commander mode');f.selectTroops({x:1,y:1},{x:10,y:10});elements['#cmd-2'].onclick();assert.equal(api.state().mouseMode,'commander');assert.equal(f.selection.size,0,'Commander selector clears troop mode');f.kill(state.humans.find(c=>c.id===2),0);state.bullets=[];f.mouseCommanderAction({x:500,y:400});assert.equal(state.bullets.length,0,'Dead commander cannot shoot');
console.log('Passed all four commander selectors, exclusive WASD ownership, mouse shots/grenades, cooldown, order buttons, troop-mode switching and dead commander input.');
}

{
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();f.selectCommander(1);const u=state.humans.find(c=>c.id===1);u.x=500;u.y=400;
for(const [dx,dy] of [[100,100],[-100,100],[-100,-100],[100,-100],[100,60]]){u.cool=0;state.bullets=[];f.mouseCommanderAction({x:u.x+dx,y:u.y+dy});const b=state.bullets[0],length=Math.hypot(dx,dy);assert(Math.abs(b.dx-dx/length)<1e-12&&Math.abs(b.dy-dy/length)<1e-12,'Mouse fire must follow the exact cursor angle');assert(Math.abs(b.dx)>0&&Math.abs(b.dy)>0,'Diagonal shot must retain both axes');}
u.grenades=3;u.grenadeCool=0;f.mouseCommanderAction({x:u.x+100,y:u.y+100},true);assert(Math.abs(u.angle-Math.PI/4)<1e-12,'Mouse grenade should also follow diagonal aim');assert.equal(u.grenades,2);
console.log('Passed mouse diagonal aiming in all quadrants, arbitrary cursor angles and matching grenade direction.');
}

{
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();f.selectCommander(1);state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.pickups=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:980,y:740,hp:50,timer:1e6}];state.humans=state.humans.filter(u=>u.type==='commander');const u=state.humans.find(u=>u.id===1);u.x=300;u.y=400;u.cool=0;
const pointer=(x,y,shiftKey=false)=>({clientX:100+x/2,clientY:50+y/2,button:0,shiftKey,pointerId:11,preventDefault:noop});canvasHandlers.pointerdown(pointer(700,600));for(let i=0;i<50;i++)f.update(.02);const count=state.bullets.filter(b=>b.owner===1).length;assert(count>=3&&count<=4,'Holding mouse must fire repeatedly at normal weapon rate');canvasHandlers.pointermove(pointer(700,200));for(let i=0;i<14;i++)f.update(.02);assert(state.bullets.at(-1).dy<0,'Held firing must track moved cursor');canvasHandlers.pointerup(pointer(700,200));const released=state.bullets.length;for(let i=0;i<15;i++)f.update(.02);assert.equal(state.bullets.length,released,'Release must stop autofire');
state.bullets=[];u.cool=0;canvasHandlers.pointerdown(pointer(700,600));canvasHandlers.pointermove(pointer(740,650));for(let i=0;i<25;i++)f.update(.02);assert.equal(state.bullets.length,0,'Immediate drag selects rather than autofires');canvasHandlers.pointercancel();canvasHandlers.pointerdown(pointer(700,600,true));for(let i=0;i<25;i++)f.update(.02);assert.equal(state.bullets.length,0,'Shift drag must never autofire');canvasHandlers.pointercancel();canvasHandlers.pointerdown(pointer(700,600));for(let i=0;i<15;i++)f.update(.02);canvasHandlers.pointercancel();const cancelled=state.bullets.length;for(let i=0;i<10;i++)f.update(.02);assert.equal(state.bullets.length,cancelled,'Cancelled pointer must stop firing');
console.log('Passed held mouse autofire, normal weapon cooldown, moving diagonal aim, release/cancel stopping, and drag/Shift selection without firing.');
}

{
api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.doors=[];state.props=[];
for(const order of [0,1,2,3]){const troop={x:400,y:350,team:'human',type:'soldier',alive:true,hp:1,angle:0,cool:0,weapon:0,order},bug={x:510,y:430,team:'alien',type:'soldier',alive:true,hp:4};state.bullets=[];f.aimHuman(troop,bug,.1);assert.equal(state.bullets.length,0,'Friendly troops wait before firing');state.t=troop.burst.readyAt;f.aimHuman(troop,bug,0);assert.equal(state.bullets.length,0,'Friendly order '+order+' waits for a legal cardinal lane');if(order===3)assert(troop.y<350&&Math.hypot(troop.x-400,troop.y-350)<=50,'Defenders step out within leash radius while off lane');troop.y=bug.y;f.aimHuman(troop,bug,0);assert.equal(state.bullets.length,1,'Aligned friendly order '+order+' fires');assert(Math.abs(state.bullets[0].dy)<1e-12,'Friendly infantry shots remain cardinal');if(order===0||order===1)assert(troop.y>350,'Normal/Follow troops should step into a firing lane');if(order===3)assert(Math.abs(troop.x-400)<=5,'Defenders hold near anchor x');}
const friendly={x:400,y:350,team:'human',alive:true,hp:1},bug={x:510,y:430,team:'alien',alive:true,hp:4};let friendlyTime=null,bugTime=null;state.t=0;for(let i=0;i<40;i++){state.t=i*.1;if(f.perceive(friendly,[bug],245)&&friendlyTime===null)friendlyTime=state.t;if(f.perceive(bug,[friendly],240)&&bugTime===null)bugTime=state.t;}assert(friendlyTime!==null&&bugTime!==null);assert(friendlyTime<bugTime,'Friendly troops should react sooner than bugs');state.t=bug.ai.focusUntil+.01;assert.equal(f.perceive(bug,[friendly],240),null,'Bugs should lose interest after a short focus interval');assert(bug.ai.boredUntil>state.t,'Bugs should take a wandering break');
const farBug={x:400,y:350,team:'alien',alive:true,hp:4},farSoldier={x:600,y:350,team:'human',alive:true,hp:1};for(let i=0;i<50;i++){state.t+=.1;assert.equal(f.perceive(farBug,[farSoldier],240),null,'Bugs should not detect targets beyond reduced sight range');}
const modes=new Set(),walker={x:400,y:350,team:'alien',type:'soldier',alive:true,hp:4,angle:0};for(let i=0;i<100;i++){state.t+=3.1;f.bugIntent(walker,friendly,.02,1);modes.add(walker.intent.mode);}assert(modes.has('approach')&&modes.has('wander')&&modes.has('pause'),'Bugs must vary approach, wandering and pauses');
state.rocks=[{x:450,y:300,w:20,h:100}];const shooter={x:400,y:350,team:'human',type:'soldier',alive:true,cool:0,weapon:0,order:0},behind={x:500,y:350,team:'alien',alive:true,hp:4};state.bullets=[];f.aimHuman(shooter,behind,0);assert.equal(state.bullets.length,0,'Friendly fire must not target through walls');
console.log('Passed active friendly fire for all orders, Normal/Follow alignment, faster friendly reactions, bounded bug focus/range, randomized bug intent and wall-limited combat.');
}

{const previous=api.state().paused;elements['#units'].onclick();assert.equal(elements['#unit-guide'].open,true);assert.equal(api.state().paused,true);assert(elements['#unit-cards'].innerHTML.includes('Egg / nest'));assert(elements['#unit-cards'].innerHTML.includes('No armor / damage reduction'));assert(elements['#units-context'].textContent.includes('queen HP:'));handlers.keydown(event('Space'));assert.equal(api.state().paused,true);elements['#units-close'].onclick();assert.equal(api.state().paused,previous);elements['#pause'].onclick();elements['#units'].onclick();elements['#units-close'].onclick();assert.equal(api.state().paused,!previous);elements['#pause'].onclick();console.log('Passed unit manual content, modal input blocking and pause restoration.');}

// TRI-027: the actual cardinal projectile must intersect the bug before firing.
{
 api.loadMission(1);const f=sandbox.window.__fixture(),st=f.state;st.mask=null;st.rocks=[];st.doors=[];st.props=[];st.gate=null;st.t=0;st.bullets=[];
 const u={x:400,y:350,team:'human',type:'soldier',alive:true,hp:1,cool:0,weapon:0,order:2},bug={x:510,y:430,team:'alien',type:'soldier',alive:true,hp:4};
 f.aimHuman(u,bug,.1);st.t=u.burst.readyAt;f.aimHuman(u,bug,0);
 assert.equal(st.bullets.length,0,'TRI-027: visible diagonal bug is not a legal cardinal shot');
 const shotLegal=(unit,t)=>{const shot=st.bullets.at(-1);assert(shot);assert(Math.abs((t.x-unit.x)*shot.dy-(t.y-unit.y)*shot.dx)<8,'Every shot intersects current bug radius');};
 for(let i=0;i<150&&st.bullets.length===0;i++){st.t+=.1;u.cool=0;f.aimHuman(u,bug,.1);}shotLegal(u,bug);assert(u.y<345&&u.x>405,'Soldier reaches diagonal firing lane');
 bug.y+=30;u.cool=0;st.bullets=[];const oldY=u.y;f.aimHuman(u,bug,.1);assert.equal(st.bullets.length,0,'Moving target invalidates lane');assert(u.y>oldY,'Soldier repositions after target moves');
 for(let i=0;i<60&&st.bullets.length===0;i++){st.t+=.1;u.cool=0;f.aimHuman(u,bug,.1);}shotLegal(u,bug);
 for(const delta of [9,-9]){u.x=400;u.y=400;bug.x=510;bug.y=400+delta;u.cool=0;st.bullets=[];f.aimHuman(u,bug,0);assert.equal(st.bullets.length,0,'Old ten-pixel stop tolerance would miss');f.aimHuman(u,bug,.1);st.t+=2;f.aimHuman(u,bug,.1);shotLegal(u,bug);}
 u.x=400;u.y=400;bug.x=580;bug.y=400;u.weapon=1;u.cool=0;st.bullets=[];f.aimHuman(u,bug,.1);assert(u.x>400,'Flame closes beyond usable projectile range');
 u.weapon=0;u.x=400;u.y=400;bug.x=510;bug.y=406;u.order=3;u.cool=0;st.props=[{hp:5,left:450,top:397,w:10,h:4}];st.bullets=[];f.aimHuman(u,bug,0);st.t+=2;f.aimHuman(u,bug,0);assert.equal(st.bullets.length,0,'Actual cardinal ray checks props despite clear direct sight');st.props=[];
 for(const type of ['soldier','robot','commander','commando']){const p={x:400,y:400,team:'human',type,alive:true,hp:1,cool:0,weapon:0,order:0},t={x:440,y:440,team:'alien',alive:true,hp:4};st.bullets=[];f.aimHuman(p,t,.1);if(p.burst&&!st.bullets.length){st.t=p.burst.readyAt;p.cool=0;f.aimHuman(p,t,0);}assert(st.bullets.length>=1,type+' has diagonal legal heading');}
 // Focus pursuit uses the same eligibility; order commands dismount before normal alignment.
 st.aliens=[bug];u.order=2;u.focusTarget=bug;u.x=400;u.y=350;u.cool=0;st.bullets=[];assert(f.focusAttackStep(u,.1));assert.equal(st.bullets.length,0);assert(u.y<350);
 const close={x:400,y:400,team:'human',type:'soldier',alive:true,hp:1,cool:0,weapon:0,order:0},near={x:414,y:414,team:'alien',alive:true,hp:4};st.bullets=[];for(let i=0;i<30&&!st.bullets.length;i++){st.t+=.1;close.cool=0;f.aimHuman(close,near,.1);}shotLegal(close,near);
 const detour={x:400,y:350,team:'human',type:'soldier',alive:true,hp:1,cool:0,weapon:0,order:2},beyond={x:510,y:430,team:'alien',alive:true,hp:4};st.rocks=[{x:390,y:390,w:40,h:20}];st.bullets=[];for(let i=0;i<240&&!st.bullets.length;i++){st.t+=.1;detour.cool=0;f.aimHuman(detour,beyond,.1);}shotLegal(detour,beyond);st.rocks=[];
 console.log('Passed TRI-027 stationary/moving hunt, nine-pixel/close diagonal lanes, flame closing, projectile obstruction, focus and asymmetric infantry headings.');
}

// TRI-028: seeded final-shot timing, stable-target boundary and rest lifecycle.
{
 api.loadMission(1);const f=sandbox.window.__fixture(),st=f.state;st.mask=null;st.rocks=[];st.doors=[];st.props=[];st.aliens=[];
 for(const [type,expected] of Object.entries({soldier:[3,6,.8,1.8,.2,.8],robot:[3,6,.8,1.8,.2,.8],commando:[5,7,.8,1.2,.2,.4],tank:[9,12,3.5,4.5,.4,1.2]}))assert.deepEqual(Object.values(f.burstRules[type]),expected,'Exact isolated burst rules for '+type);
 const target={x:600,y:400,alive:true,hp:1000},make=()=>({x:400,y:400,team:'human',type:'tank',alive:true,hp:8,cool:0,weapon:0,order:0,focusTarget:target});
 const rests=new Set();
 for(const seedValue of [0,1,2099,123456789,2147483648,4294967295]){
  const u=make();st.bullets=[];f.setSeed(seedValue);f.aimTank(u,target);st.t=u.burst.readyAt;f.aimTank(u,target);const size=st.bullets.length+u.burst.remaining;assert(size>=9&&size<=12);
  for(let n=1;n<size;n++){assert.equal(u.cool,.2);f.aimTank(u,target);assert.equal(st.bullets.length,n,'Within-burst cooldown blocks repeated call');st.t+=.2;u.cool=0;f.aimTank(u,target);}
  const last=st.t,until=u.burst.restUntil,rest=until-last;rests.add(rest);assert(rest>=3.5&&rest<4.5);u.cool=0;st.t=until-1e-6;f.aimTank(u,target);assert.equal(st.bullets.length,size,'No early stable-target burst');st.t=until;f.aimTank(u,target);assert.equal(st.bullets.length,size+1,'Stable target fires at exact rest eligibility');assert(Math.abs(st.t-last-rest)<1e-9);
 }
 assert(rests.size>1,'Seeded rest varies');
 const u=make();st.bullets=[];f.aimTank(u,target);st.t=u.burst.readyAt;f.aimTank(u,target);while(u.burst.remaining){st.t+=.2;u.cool=0;f.aimTank(u,target);}const until=u.burst.restUntil,count=st.bullets.length;u.cool=0;
 f.trackBurst(u,null);st.t=until-.1;f.aimTank(u,target);assert.equal(u.burst.restUntil,until);assert(u.burst.readyAt>until,'Late reacquisition adds reaction delay');st.t=until;f.aimTank(u,target);assert.equal(st.bullets.length,count);st.t=u.burst.readyAt;f.aimTank(u,target);assert.equal(st.bullets.length,count+1);
 st.mode='playing';st.humans=[u];resumeSimulation();elements['#pause'].onclick();const frozen=JSON.stringify(u.burst),clock=st.t,cool=u.cool;f.update(10);assert.equal(st.t,clock);assert.equal(JSON.stringify(u.burst),frozen);assert.equal(u.cool,cool,'Tactical mode freezes cooldown');elements['#reset'].onclick();const reset=sandbox.window.__fixture().state;assert.equal(reset.t,0);assert(reset.humans.every(v=>!v.burst),'Restart discards old burst timers');
 elements['#units'].onclick();assert(elements['#unit-cards'].innerHTML.includes('9–12 shots per burst; 3.5–4.5 s rest; 0.4–1.2 s reaction delay.'));elements['#units-close'].onclick();
 console.log('Passed TRI-028 seeded final-shot rest boundaries, stable-target eligibility, 9–12 shots/.20s cadence, late reacquisition, tactical freeze, restart, guide and other-unit isolation.');
}

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
 const flame={...defender,x:target.x-100,weapon:1,cool:0,burst:undefined};f.aimHuman(flame,target,0);state.t=flame.burst.readyAt;f.aimHuman(flame,target,0);assert.equal(flame.cool,.18);
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
 world.pickups=[{x:400,y:400,type:'plasma'}];world.humans=[commando];world.aliens=[];world.nests=[{x:900,y:700,hp:50,timer:1000}];world.mode='playing';resumeSimulation();g.update(.02);assert.equal(commando.weapon,2,'Commando collects weapons');
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
 const last=Math.atan2(state.bullets.at(-1).dy,state.bullets.at(-1).dx);assert(Math.abs(last-first-sweep.width)<1e-9);const rest=tank.burst.restUntil-state.t;assert(rest>=3.5&&rest<4.5);state.t=tank.burst.restUntil;tank.cool=0;f.aimTank(tank,isolated);if(!tank.sweep){state.t=tank.burst.readyAt;f.aimTank(tank,isolated);}assert.equal(tank.sweep.sign,-sweep.sign,'Successive bursts reverse sweep direction');
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
 state.mode='playing';resumeSimulation();canvasHandlers.pointerdown({clientX:100+390/2,clientY:50+390/2,button:0,shiftKey:false,pointerId:24,preventDefault:noop});canvasHandlers.pointerup({clientX:100+440/2,clientY:50+420/2,button:0,shiftKey:false,pointerId:24,preventDefault:noop});const pointer=(timeStamp)=>({clientX:100+600/2,clientY:50+400/2,button:2,timeStamp,shiftKey:false,pointerId:25,preventDefault:noop});canvasHandlers.pointerdown(pointer(1000));assert.equal(troop.attackMove.force,false,'First right click is attack move');canvasHandlers.pointerdown(pointer(1200));assert.equal(troop.attackMove.force,true,'Double right click becomes force move');
 console.log('Passed eagle reservation, departure return, threat pause/resume, order cancellation, Follow return, inaccessible eagle filtering and double-right-click force move.');
}

{
 api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.cannons=[];state.pickups=[];
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
 api.loadMission(3);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.cannons=[];state.pickups=[];state.aliens=[];const nest={x:600,y:752,hp:50};state.nests=[nest];
 const tank={x:450,y:730,team:'human',type:'tank',alive:true,hp:8,cool:0,weapon:0,order:0};state.humans=[...state.humans.filter(u=>u.type==='commander'),tank];f.selectTroops({x:440,y:720},{x:460,y:740});f.focusAttackTo(nest);assert(f.visible(tank,nest),'Bottom-edge nest is visible to projectile LOS');const x=tank.x,y=tank.y;f.focusAttackStep(tank,.1);assert.equal(tank.x,x);assert.equal(tank.y,y,'In-range focus must not walk into nest');state.t=tank.burst.readyAt;state.bullets=[];f.focusAttackStep(tank,.1);assert.equal(state.bullets.length,1,'Bottom-edge focus attack fires');
 const ready=tank.burst.readyAt,remaining=tank.burst.remaining;f.focusAttackTo(nest);assert.equal(tank.burst.readyAt,ready,'Repeated target click preserves reaction timer');assert.equal(tank.burst.remaining,remaining,'Repeated target click preserves active burst');
 canvasHandlers.pointerdown({clientX:100+440/2,clientY:50+720/2,button:0,shiftKey:false,pointerId:40,preventDefault:noop});canvasHandlers.pointerup({clientX:100+460/2,clientY:50+740/2,button:0,shiftKey:false,pointerId:40,preventDefault:noop});const click=timeStamp=>({clientX:100+600/2,clientY:50+752/2,button:2,timeStamp,pointerId:41,preventDefault:noop});canvasHandlers.pointerdown(click(1000));assert.equal(tank.focusTarget,nest,'First enemy click focuses without movement prelude');canvasHandlers.pointerdown(click(1100));canvasHandlers.pointerdown(click(1200));assert.equal(tank.focusTarget,nest,'Third click must not downgrade focus');assert.equal(tank.attackMove,null);
 const bug={x:600,y:730,team:'alien',type:'soldier',alive:true,hp:4};state.aliens=[bug];state.nests=[];const movingClick=timeStamp=>({...click(timeStamp),clientY:50+730/2});canvasHandlers.pointerdown(movingClick(2000));bug.x=650;canvasHandlers.pointerdown(movingClick(2100));assert.equal(tank.focusTarget,bug,'Second click remembers a moving enemy');assert.equal(tank.attackMove,null);state.rocks=[{x:520,y:680,w:20,h:88}];assert.equal(f.visible(tank,bug),false,'Projectile LOS still blocks intervening walls');
 console.log('Passed edge-of-map focus fire, repeated/triple-click stability, preserved burst timers, moving-target click capture and wall-blocked projectile LOS.');
}

{
 api.loadMission(3);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.props=[];state.aliens=[];state.nests=[];state.pickups=[];state.cannons=[];
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
  api.loadMission(mission);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.t=100;state.bullets=[];state.aliens=[];state.vents=[];state.nests.forEach(n=>n.hp=0);state.terminals.forEach(t=>t.active=true);state.waveKills={normal:999,queen:999};if(state.crystal)state.crystal.recovered=true;
  const merits=state.merits;assert(f.missionProgress().ready);f.update(.01);assert.equal(state.mode,'victory',`Cleared mission ${mission} completes automatically`);const reward=state.merits;assert(reward>merits);f.update(.1);assert.equal(state.merits,reward,'Victory reward applies once');
 }
 api.loadMission(3);let f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.t=100;state.aliens=[];state.nests.forEach(n=>n.hp=0);assert.equal(f.missionProgress().terminals,1);f.update(.01);assert.equal(state.mode,'playing','Terminal prerequisite still required');state.terminals.find(t=>t.object===257).active=true;f.update(.01);assert.equal(state.mode,'victory','Final terminal automatically completes cleared mission');
 api.loadMission(5);f=sandbox.window.__fixture();state=f.state;state.mode='playing';resumeSimulation();state.t=100;assert.equal(f.missionProgress().wave,200);assert(!f.missionProgress().ready,'Wave quota cannot be skipped');
 api.loadMission(4);f=sandbox.window.__fixture();state=f.state;state.aliens=[];for(const [x,y] of [[-50,100],[1100,400],[500,810],[500,5]]){const bug=f.spawnGroundBug(x,y);assert(bug.x>=16&&bug.x<=1008&&bug.y>=44&&bug.y<=744);assert(!f.blocked(bug.x,bug.y),'New bug resolves onto clear playable terrain');}
 console.log('Passed automatic victory and single rewards in all nine missions, terminal/wave prerequisites, progress reporting and clear-ground bug births at map boundaries.');
}

{
 api.loadMission(3);elements['#start'].onclick();resumeSimulation();const f=sandbox.window.__fixture(),state=f.state;const troop=state.humans.find(u=>u.type==='soldier');troop.x=400;troop.y=400;
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

{
 api.loadMission(3);elements['#start'].onclick();resumeSimulation();let f=sandbox.window.__fixture(),state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.aliens=[];state.nests=[];
 elements['#pause'].onclick();const time=state.t,bullets=state.bullets.length,grenades=state.humans[0].grenades;handlers.keydown(event('KeyR'));handlers.keyup(event('KeyR'));assert(api.state().rallyMode,'R toggles placement');
 const pointer=(x,y,button)=>({clientX:100+x/2,clientY:50+y/2,button,timeStamp:20000,pointerId:90,preventDefault:noop});canvasHandlers.pointerdown(pointer(500,400,0));canvasHandlers.pointerdown(pointer(750,400,0));assert.equal(api.state().rallyPoints.length,2,'Scaled clicks place multiple flags while paused');canvasHandlers.pointerdown(pointer(500,400,2));assert.equal(api.state().rallyPoints.length,1,'Right click removes flag');assert.equal(state.humans[0].grenades,grenades);assert.equal(state.bullets.length,bullets,'Placement does not fire');frames(2);assert.equal(state.t,time);assert.equal(elements['#rally'].disabled,false);handlers.keydown({...event('KeyR'),repeat:true});assert(api.state().rallyMode,'Key auto-repeat cannot toggle mode');handlers.keyup(event('KeyR'));
 handlers.keydown(event('Escape'));handlers.keyup(event('Escape'));assert(!api.state().rallyMode);assert(api.state().paused,'Escape exits mode without changing pause');elements['#rally'].onclick();assert(api.state().rallyMode);elements['#rally'].onclick();assert(!api.state().rallyMode);
 f.removeRally({x:750,y:400});assert(f.addRally({x:520,y:400}));assert(f.addRally({x:300,y:600}));state.rocks=[{x:480,y:36,w:20,h:732}];const soldier=f.addTroop(52,450,400);f.assignRally(soldier);assert.equal(soldier.attackMove.x,300,'Unreachable closer flag skipped');
 state.rocks=[];sandbox.window.TriumphNavigation.reset();f.assignRally(soldier);assert.equal(soldier.attackMove.x,520,'Closest reachable flag chosen');const saved={...soldier.attackMove};f.removeRally({x:520,y:400});assert.deepEqual({...soldier.attackMove},saved,'Deleting flag preserves assigned destination');f.selectTroops({x:440,y:390},{x:460,y:410});f.attackMoveTo({x:700,y:500},true);assert(soldier.attackMove.force,'Player movement overrides rally');
 state.rocks=[{x:480,y:36,w:20,h:470}];sandbox.window.TriumphNavigation.reset();f.addRally({x:520,y:400});f.assignRally(soldier);assert.equal(soldier.attackMove.x,300,'Routing distance favors shorter route over Euclidean distance');state.rocks=[];state.doors=[{x:480,y:36,w:20,h:732,cx:490,cy:400,locked:true,open:false}];f.assignRally(soldier);assert.equal(soldier.attackMove.x,300,'Locked door blocks rally route');state.doors[0].locked=false;f.assignRally(soldier);assert.equal(soldier.attackMove.x,520,'Unlocked door can be opened en route');
 api.loadMission(7);f=sandbox.window.__fixture();state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];f.addRally({x:500,y:400});const before=state.humans.length;assert(f.reinforce('troops'));const arrivals=state.humans.slice(before);assert.equal(arrivals.length,5);assert(arrivals.every(u=>u.attackMove?.rally),'Indoor yellow soldiers rally');assert(f.reinforce('tank'));assert.equal(state.humans.at(-1).type,'robot');assert(state.humans.at(-1).attackMove?.rally,'Bronze robot rallies');const commando=f.addTroop(52,400,400,'commando',true);assert(!commando.attackMove,'Commandos never rally');
 api.loadMission(1);f=sandbox.window.__fixture();state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];f.addRally({x:500,y:400});const beforeBlitz=state.humans.length;assert(f.reinforce('blitz'));assert(state.humans.slice(beforeBlitz).filter(u=>u.type==='tank').every(u=>u.attackMove?.rally),'Blitz tanks rally');for(let i=0;i<800;i++){state.t+=.02;f.updateSupport(.02);}const blitz=state.humans.slice(beforeBlitz);assert(blitz.some(u=>u.type==='soldier'&&u.attackMove?.rally),'Blitz carrier soldiers rally');assert(blitz.some(u=>u.type==='commando'),'Blitz aircraft delivers commandos');assert(blitz.filter(u=>u.type==='commando').every(u=>!u.attackMove),'Blitz commandos excluded');
 api.loadMission(3);assert.equal(api.state().rallyPoints.length,0);assert(!api.state().rallyMode,'Mission change resets mode and flags');elements['#start'].onclick();resumeSimulation();f=sandbox.window.__fixture();state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];f.addRally({x:500,y:400});assert(f.reinforce('tank'));assert(state.humans.at(-1).attackMove?.rally,'Bronze tank rallies');f.removeRally({x:500,y:400});const noFlag=f.addTroop(52,300,400,'soldier',true);assert(!noFlag.attackMove,'No flags retains existing behavior');
 console.log('Passed Rally button/R/Escape/paused placement, flag deletion, routing-distance selection, locked/unlocked doors, player overrides, yellow/bronze/Blitz arrivals, commando exclusion and mission reset.');
}

// Default troop mode never forwards manual keys or empty clicks to commanders.
{
 api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.pickups=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:980,y:740,hp:50,timer:1e6}];state.humans=state.humans.filter(u=>u.type==='commander');
 for(const c of state.humans){c.x=400;c.y=400;c.patrol={x:500,y:400,until:100,pause:0};c.cool=0;}
 for(const code of ['KeyW','KeyV','KeyB','KeyI','BracketLeft','BracketRight','ArrowUp','NumpadMultiply','NumpadSubtract','Numpad8','Numpad0','Numpad1'])handlers.keydown(event(code));
 const grenades=state.humans.map(c=>c.grenades);f.update(.1);
 for(const [i,c] of state.humans.entries()){assert(c.x>400,'Every unselected commander runs AI');assert.equal(c.y,400,'Manual movement does not leak into AI mode');assert(!c.selecting,'Legacy order keys cannot select unselected commanders');assert.equal(c.grenades,grenades[i]);}assert.equal(state.bullets.length,0,'Unselected commanders ignore manual fire');
 for(const code of [...['KeyW','KeyV','KeyB','KeyI','BracketLeft','BracketRight','ArrowUp','NumpadMultiply','NumpadSubtract','Numpad8','Numpad0','Numpad1']])handlers.keyup(event(code));
 const pointer=(x,y,button=0)=>({clientX:100+x/2,clientY:50+y/2,button,shiftKey:false,pointerId:9,preventDefault:noop});canvasHandlers.pointerdown(pointer(800,400));canvasHandlers.pointerup(pointer(800,400));assert.equal(api.state().activeCommander,null);assert.equal(api.state().mouseMode,'troops');assert.equal(state.bullets.length,0);
 elements['#cmd-1'].onclick();elements['#cmd-1'].onclick();assert.equal(api.state().activeCommander,null);assert.equal(api.state().mouseMode,'troops','Selected commander button toggles back to troop mode');elements['#cmd-4'].onclick();f.selectTroops({x:1,y:1},{x:10,y:10});assert.equal(api.state().activeCommander,null,'Empty troop selection deselects direct control');assert.equal(api.state().mouseMode,'troops');elements['#cmd-2'].onclick();api.loadMission(2);assert.equal(api.state().activeCommander,null,'Mission reload clears direct control');assert.equal(api.state().mouseMode,'troops');
 console.log('Passed all four default AI commanders, manual-key isolation, empty click/selection, selector toggle and mission control reset.');
}

// Attack-move soldiers take bounded route-side eagle/turret detours.
{
 function setup(){api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:980,y:740,hp:50,timer:1e6}];state.humans=state.humans.filter(u=>u.type==='soldier').slice(0,1);const u=state.humans[0];Object.assign(u,{x:400,y:400,cool:0,attackMove:{x:700,y:400},order:2});state.pickups=[];state.cannons=[];return {f,state,u};}
 let {f,state,u}=setup();let goal=u.attackMove,eagle={x:412,y:412,type:'troops'},gun={x:412,y:400};state.pickups=[eagle];state.cannons=[gun];f.update(.02);assert(!state.pickups.includes(eagle),'Clear-area eagle outranks overlapping turret');assert(!gun.occupant);assert.equal(u.attackMove,goal,'Pickup preserves route destination');f.update(.02);assert.equal(gun.occupant,u,'Next step mounts empty turret');assert.equal(u.cannon,0);assert.equal(u.weapon,2);
 ({f,state,u}=setup());eagle={x:410,y:400,type:'troops'};gun={x:412,y:400};state.pickups=[eagle];state.cannons=[gun];const enemy={x:480,y:400,hp:4,alive:true,team:'alien',type:'bug',cool:100};state.aliens=[enemy];f.update(.02);assert.equal(gun.occupant,u,'Nearby visible enemy makes turret outrank eagle and attacks');assert(state.pickups.includes(eagle));assert.equal(state.bullets.length,0,'Mounting comes before shooting');
 ({f,state,u}=setup());gun={x:430,y:415};state.cannons=[gun];const initialX=u.x;f.attackMoveStep(u,{x:450,y:400,hp:4,alive:true},.1);assert(u.x>initialX&&u.y>400,'Short turret detour outranks in-range combat');assert.equal(state.bullets.length,0);for(let i=0;i<30&&!gun.occupant;i++)f.attackMoveStep(u,null,.1);assert.equal(gun.occupant,u);
 for(const point of [{x:480,y:400},{x:430,y:430}]){({f,state,u}=setup());gun={...point};state.cannons=[gun];f.attackMoveStep(u,null,.1);assert.equal(u.y,400,'Distant or off-route turret is ignored');assert(!gun.occupant);}
 ({f,state,u}=setup());const occupant={alive:true};gun={x:410,y:400,occupant};state.cannons=[gun];f.attackMoveStep(u,null,.1);assert.equal(gun.occupant,occupant,'Occupied turret is never stolen');assert.equal(u.cannon,undefined);
 ({f,state,u}=setup());gun={x:420,y:400};state.cannons=[gun];state.rocks=[{x:415,y:390,w:12,h:20}];f.attackMoveStep(u,null,.1);assert(!gun.occupant);assert.equal(u.cannon,undefined,'Blocked turret is not mounted');
 ({f,state,u}=setup());eagle={x:420,y:405,type:'troops'};state.pickups=[eagle];f.attackMoveStep(u,null,.1);state.pickups=[];const oldY=u.y;f.attackMoveStep(u,null,.1);assert(u.y<oldY,'Removed eagle immediately resumes original route');assert.equal(u.attackMove.x,700);
 ({f,state,u}=setup());state.pickups=[{x:410,y:400,type:'troops'}];state.cannons=[{x:410,y:400}];u.attackMove.force=true;f.update(.02);assert.equal(u.cannon,undefined);assert(state.pickups.length,'Force move does not collect eagle');
 for(const type of ['commando','robot','tank']){({f,state,u}=setup());u.type=type;state.cannons=[{x:410,y:400}];f.attackMoveStep(u,null,.1);assert.equal(u.cannon,undefined,'Only regular soldiers get route turret detours');}
 ({f,state,u}=setup());state.pickups=[{x:410,y:400,type:'troops'}];state.cannons=[{x:410,y:400}];u.focusTarget={hp:4,alive:true,x:450,y:400};f.attackMoveStep(u,null,.1);assert.equal(u.cannon,undefined);assert.equal(state.pickups.length,1,'Explicit focus overrides detours');u.focusTarget=null;u.useOrder={};f.attackMoveStep(u,null,.1);assert.equal(u.cannon,undefined,'Explicit use overrides detours');

 ({f,state,u}=setup());eagle={x:445,y:415,type:'troops'};state.pickups=[eagle];const claimant={...u,x:445,y:450,attackMove:null,supplyTrip:null};state.humans.push(claimant);f.supplyStep(claimant,null,.01);assert.equal(claimant.supplyTrip.eagle,eagle);f.attackMoveStep(u,null,.1);assert.equal(u.y,400,'Reserved eagle does not attract attack-move soldier');assert(state.pickups.includes(eagle));
 ({f,state,u}=setup());eagle={x:410,y:400,type:'troops'};state.pickups=[eagle];state.support={...state.support,cases:[]};f.attackMoveStep(u,null,.1);assert(state.pickups.includes(eagle),'Eagle without usable reinforcement rule remains');
 ({f,state,u}=setup());eagle={x:420,y:400,type:'troops'};state.pickups=[eagle];state.rocks=[{x:415,y:390,w:12,h:20}];for(let i=0;i<3;i++)f.attackMoveStep(u,null,.1);assert(state.pickups.includes(eagle),'Terrain-blocked eagle remains');
 ({f,state,u}=setup());gun={x:430,y:415};state.cannons=[gun];f.attackMoveStep(u,null,.1);gun.occupant={alive:true};const old=u.y;f.attackMoveStep(u,null,.1);assert(u.y<old,'Newly occupied turret cancels opportunistic detour');
 console.log('Passed attack-move eagle/turret priority, route preservation, bounded detours, threat-before-reaction priority, occupied/blocked turret handling, stale pickup, force/focus/use overrides and soldier-only behavior.');
}


// Every deployment starts tactical regardless of briefing toggles.
{
 for(let mission=1;mission<=9;mission++){
  api.loadMission(mission);assert(api.state().paused,'Mission load initializes frozen state');elements['#pause'].onclick();assert(!api.state().paused);elements['#start'].onclick();assert.equal(api.state().mode,'playing');assert(api.state().paused,'Deployment always enters tactical mode');const before=api.state();frames(20);assert.equal(api.state().time,before.time);assert.equal(canvas.attributes['data-tactical'],'true');assert.equal(elements['#pause'].textContent,'Exit tactical mode');
 }
 api.loadMission(1);elements['#start'].onclick();let f=sandbox.window.__fixture(),state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.cannons=[];state.pickups=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:980,y:740,hp:50,timer:1e6}];const troop=state.humans.find(u=>u.type==='soldier');troop.x=400;troop.y=400;f.selectTroops({x:390,y:390},{x:410,y:410});f.attackMoveTo({x:600,y:400});const timeBefore=state.t,xBefore=troop.x;frames(10);assert.equal(state.t,timeBefore);assert.equal(troop.x,xBefore,'Queued order remains frozen');assert(troop.attackMove);
 for(const [open,close] of [['#options','#close'],['#units','#units-close']]){elements[open].onclick();elements[close].onclick();assert(api.state().paused,'Dialog preserves startup tactical state');}
 handlers.keydown(event('Space'));handlers.keyup(event('Space'));frames(10);assert(!api.state().paused);assert(state.t>timeBefore);assert(troop.x>xBefore,'Exiting tactical executes queued movement');assert.equal(canvas.attributes['data-tactical'],'false');assert.equal(elements['#pause'].textContent,'Tactical mode');
 for(const [open,close] of [['#options','#close'],['#units','#units-close']]){elements[open].onclick();elements[close].onclick();assert(!api.state().paused,'Dialog restores active simulation');}
 handlers.keydown(event('Escape'));handlers.keyup(event('Escape'));assert(api.state().paused);elements['#reset'].onclick();assert.equal(api.state().mode,'briefing');assert(api.state().paused);elements['#pause'].onclick();elements['#start'].onclick();assert(api.state().paused,'Restart deploy stays tactical after briefing toggle');handlers.keydown(event('F2'));handlers.keyup(event('F2'));elements['#start'].onclick();assert(api.state().paused,'F2 redeploy starts tactical');elements['#mission'].onchange({target:{value:'2'}});elements['#start'].onclick();assert.equal(api.state().mission,3);assert(api.state().paused,'Mission selector deployment starts tactical');
 console.log('Passed all nine tactical starts despite briefing toggles, frozen state/visor marker, queued movement, active/tactical modal restoration, Space/Escape, restart/F2 and mission selector.');
}

// A recovered Hanger roll can create bronze eagles without a matching support case.
{
 api.loadMission(6);let f=sandbox.window.__fixture(),state=f.state;state.t=2;state.pickups=[];assert.equal(state.support.globals[15],16);const sourceCase=sandbox.window.ORIGINAL_PICKUPS[15].cases.find(c=>c.type==='tank');assert.equal(sourceCase.sourceOffset,67620);assert.equal(state.support.cases.find(c=>c.item==='Ground Support').sourceOffset,7096);assert.equal(f.reinforcementRule('tank'),null,'Preserve Hanger global15<16 support guard');f.spawnPickupRoll(9);assert(!state.pickups.some(p=>p.type==='tank'),'Unavailable bronze eagle is never newly rendered');f.spawnPickupRoll(6);assert(state.pickups.some(p=>p.type==='air'),'Hanger zipline eagle stays available');
 for(let mission=1;mission<=9;mission++)for(const type of ['commander','soldier']){
  api.loadMission(mission);f=sandbox.window.__fixture();state=f.state;state.humans=state.humans.filter(u=>u.type==='commander'||u.type==='soldier').slice(0,5);state.t=2;state.pickups=[];for(const roll of [0,6,9])f.spawnPickupRoll(roll);const u=state.humans.find(u=>u.type===type);assert(u);for(const p of [...state.pickups].filter(p=>['troops','air','tank'].includes(p.type))){assert(f.reinforcementRule(p.type));u.x=p.x;u.y=p.y;assert(!f.blocked(p.x,p.y),'Actual generated eagle has clear center');assert(f.pickup(u,p),'Generated eligible eagle can be collected by '+type+' on mission '+mission);}
 }
 for(const mission of [7,8,9]){
  api.loadMission(mission);f=sandbox.window.__fixture();state=f.state;state.humans=state.humans.filter(u=>u.type==='commander'||u.type==='soldier');const sample=state.humans.find(u=>u.type==='soldier');while(state.humans.filter(u=>u.type==='soldier').length<state.rules.maxAliens)state.humans.push({...sample});state.t=2;state.pickups=[];assert.equal(f.reinforcementRule('troops'),null);f.spawnPickupRoll(0);assert(!state.pickups.some(p=>p.type==='troops'),'Do not spawn population-rejected indoor eagles');
  const eagle={x:400,y:400,type:'troops'};state.pickups=[eagle];assert.equal(f.pickup(state.humans[0],eagle),false,'Commander respects troop cap');assert.equal(f.pickup(sample,eagle),false,'Soldier respects troop cap');assert(state.pickups.includes(eagle),'Existing temporarily blocked eagle is retained');const labels=[];const oldFill=ctx.fillText;ctx.fillText=value=>labels.push(value);frames(1);ctx.fillText=oldFill;assert(labels.includes('TROOPS FULL · WAIT FOR SPACE'),'Rendered blocked eagle explains cap');sample.alive=false;assert(f.reinforcementRule('troops'));const availableLabels=[];ctx.fillText=value=>availableLabels.push(value);frames(1);ctx.fillText=oldFill;assert(!availableLabels.includes('TROOPS FULL · WAIT FOR SPACE'),'Label clears when capacity returns');assert(f.pickup(state.humans[0],eagle),'Same eagle works again after population drops');
 }

 api.loadMission(7);f=sandbox.window.__fixture();state=f.state;state.mask=null;state.rocks=[];state.doors=[];state.props=[];const soldier=state.humans.find(u=>u.type==='soldier');soldier.x=400;soldier.y=400;while(state.humans.filter(u=>u.type==='soldier'&&u.alive).length<state.rules.maxAliens)state.humans.push({...soldier});const cappedEagle={x:400,y:400,type:'troops'};state.pickups=[cappedEagle];f.selection.add(soldier);f.useOrderTo({kind:'pickup',target:cappedEagle,...cappedEagle});f.useOrderStep(soldier,.02);assert(!soldier.useOrder.done,'Explicit soldier use waits for capacity');assert(state.pickups.includes(cappedEagle));state.humans.find(u=>u.type==='soldier'&&u!==soldier).alive=false;f.useOrderStep(soldier,.02);assert(soldier.useOrder.done,'Same soldier use completes once capacity returns');assert(!state.pickups.includes(cappedEagle),'Successful retry consumes eagle exactly once');
 api.loadMission(6);f=sandbox.window.__fixture();state=f.state;state.pickups=[{x:400,y:400,type:'tank'}];const labels=[],backings=[];const oldFill=ctx.fillText,oldRect=ctx.fillRect;ctx.fillText=value=>labels.push(value);ctx.fillRect=(x,y,w,h)=>{if(ctx.fillStyle==='#14201ef2')backings.push({x,y,w,h});};frames(1);ctx.fillText=oldFill;ctx.fillRect=oldRect;assert(labels.includes('SUPPORT UNAVAILABLE'),'Existing unsupported eagle is visibly explained');assert(backings.length,'Availability label has dark backing');assert(backings.every(b=>b.x>=0&&b.x+b.w<=1024&&b.y>=0&&b.y+b.h<=768),'Label backing remains inside map');
 console.log('Passed recovered Hanger bronze-spawn mismatch, all-nine generated eagle collection by commanders/soldiers, preserved indoor cap/blocked eagle retention, availability labels and later retry.');
}

// Render frames must leave the music pause API independent of gameplay freeze.
{
 const previous=sandbox.window.TriumphMusic,calls=[],tracks=[];let gestures=0;sandbox.window.TriumphMusic={pause:value=>calls.push(value),select:value=>tracks.push(value),unlock:()=>gestures++};
 api.loadMission(1);elements['#start'].onclick();assert(api.state().paused);let before=api.state().time;frames(10);assert.equal(api.state().time,before,'Tactical startup remains frozen');assert.equal(calls.length,0,'Startup frames do not pause music');
 for(const [open,close] of [['#options','#close'],['#units','#units-close']]){elements[open].onclick();frames(5);elements[close].onclick();frames(5);assert(api.state().paused);assert.equal(api.state().time,before);assert.equal(calls.length,0,'Tactical dialog frames never override music');}
 elements['#pause'].onclick();frames(10);assert(api.state().time>before,'Simulation can resume while music stays independent');handlers.keydown(event('Space'));handlers.keyup(event('Space'));before=api.state().time;frames(10);assert.equal(api.state().time,before);assert.equal(calls.length,0,'Toggle frames do not pause or resume music');
 api.loadMission(2);elements['#start'].onclick();frames(5);assert(api.state().paused);assert.equal(tracks.length,2,'Mission switching still selects tracks');assert(gestures>=3,'Gesture unlock remains connected');assert.equal(calls.length,0);sandbox.window.TriumphMusic=previous;
 console.log('Passed frame integration: tactical start/toggle/dialogs freeze gameplay without overriding music pause, while mission track selection and gesture unlock remain.');
}

// Humans plan through usable doors, then open them before physical crossing.
{
 function room(){api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mask=null;state.props=[];state.gate=null;state.rocks=[{x:480,y:200,w:20,h:180},{x:480,y:420,w:20,h:180},{x:480,y:200,w:300,h:20},{x:480,y:580,w:300,h:20},{x:760,y:200,w:20,h:400}];const door={x:480,y:380,w:20,h:40,cx:490,cy:400,open:false,locked:false};state.doors=[door];return {f,state,door};}
 function travel(f,state,u,ticks=1500){for(let i=0;i<ticks;i++){state.t+=.02;f.navigate(u,650-u.x,300-u.y,.02,36);assert(!f.blocked(u.x,u.y),'Movement must never cross actual solid room/door collision');}}
 for(const type of ['soldier','commando','robot','tank','commander']){const {f,state,door}=room(),u={x:300,y:300,team:'human',type};travel(f,state,u);assert(Math.hypot(u.x-650,u.y-300)<2,'Closed-door room route reaches goal for '+type);assert(door.open,'Usable door opens on approach');}
 let {f,state,door}=room();let u={x:300,y:300,team:'human',type:'soldier'};door.locked=true;travel(f,state,u);assert(u.x<480,'Locked room stays inaccessible');assert(!door.open);door.locked=false;travel(f,state,u);assert(Math.hypot(u.x-650,u.y-300)<2,'Unlock invalidates route even while open bit remains false');assert(door.open);
 ({f,state,door}=room());u={x:300,y:300,team:'human',type:'soldier'};door.locked=true;travel(f,state,u,100);door.destroyed=true;travel(f,state,u);assert(Math.hypot(u.x-650,u.y-300)<2,'Destroyed-door state invalidates route/collision without requiring open bit');assert(!door.open);
 ({f,state,door}=room());const nav=sandbox.window.TriumphNavigation,start={x:300,y:300},goal={x:650,y:300};let humanCalls=0,solidCalls=0;const usable=(x,y)=>{humanCalls++;return f.blocked(x,y,true)},solid=(x,y)=>{solidCalls++;return f.blocked(x,y)};
 assert(Number.isFinite(nav.routeDistance(start,goal,usable,'shared')));assert(humanCalls>3000,'First policy builds terrain field');assert.equal(nav.routeDistance(start,goal,solid,'shared'),Infinity,'Same revision cannot share passable-door field with solid policy');assert(solidCalls>3000);humanCalls=0;assert(Number.isFinite(nav.routeDistance(start,goal,usable,'shared')));assert(humanCalls<1000,'Switching stable policy reuses its own cached field');assert.equal(nav.reachable(start,goal,solid,'shared'),false);nav.line(start,goal,solid);assert(nav.reachable(start,goal,usable,'shared'),'Line queries cannot contaminate cached route policy');
 const human={...start,team:'human',type:'soldier'};f.navigate(human,350,0,.02,36);const alien={...start,team:'alien',type:'soldier'};travel(f,state,alien);assert(alien.x<480,'Alien cannot inherit human passable-door route or open door');assert(!door.open);
 ({f,state,door}=room());const supplier={x:400,y:300,team:'human',type:'soldier',alive:true,order:0};state.pickups=[{x:650,y:300,type:'troops'}];f.supplyStep(supplier,null,.02);assert(supplier.supplyTrip,'Eagle reachability agrees with human door route');
 console.log('Passed closed-room routing for all human types, physical wall/door collision, locked-to-unlocked and destroyed invalidation, isolated/reused passability caches, alien closed-door rules and supply route consistency.');
}

// Commanders preserve matching weapons, while switching and other collectors work.
{
 function setup(id=1){api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.cannons=[];state.pickups=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:980,y:740,hp:50,timer:1e6}];const commander=state.humans.find(u=>u.id===id);state.humans=[commander];Object.assign(commander,{x:400,y:400,weaponTime:500});return {f,state,commander};}
 for(let id=1;id<=4;id++)for(const [type,weapon] of [['auto',0],['flame',1],['rapid',1],['plasma',2]]){const {f,state,commander}=setup(id);commander.weapon=weapon;const item={x:400,y:400,type};state.pickups=[item];const effects=state.effects.length,score=state.score[id-1],lifetime=commander.weaponTime;assert.equal(f.pickup(commander,item),false);assert.equal(commander.weaponTime,lifetime,'Duplicate cannot refresh weapon lifetime');assert.equal(state.effects.length,effects,'Duplicate emits no pickup effects');assert.equal(state.score[id-1],score,'Duplicate awards no score');elements['#cmd-'+id].onclick();f.update(.02);assert(state.pickups.includes(item),'Commander contact leaves '+type+' available');assert.equal(state.score[id-1],score);}
 for(const [from,type,to] of [[0,'plasma',2],[2,'flame',1],[1,'auto',0],[0,'rapid',1]]){const {f,state,commander}=setup();commander.weapon=from;state.pickups=[{x:400,y:400,type}];elements['#cmd-1'].onclick();const score=state.score[0];f.update(.02);assert.equal(commander.weapon,to);assert.equal(state.pickups.length,0,'Different weapon contact consumes item');assert.equal(state.score[0],score+25);}
 let {f,state,commander}=setup();commander.weapon=2;const item={x:400,y:400,type:'plasma'};state.pickups=[item];const soldier={x:400,y:400,team:'human',type:'soldier',alive:true,hp:1,weapon:0,order:3,anchor:{x:400,y:400},cool:0};state.humans.push(soldier);elements['#cmd-1'].onclick();f.update(.02);assert.equal(state.pickups.length,0,'Another collector can use preserved duplicate');assert.equal(soldier.weapon,2);
 assert(f.pickup(soldier,{type:'plasma',x:400,y:400}),'Matching soldier weapons retain existing collection behavior');const grenades=commander.grenades;assert(f.pickup(commander,{type:'grenade',x:400,y:400}));assert.equal(commander.grenades,Math.min(8,grenades+1));assert(f.pickup(commander,{type:'troops',x:400,y:400}),'Commander support collection remains available');
 ({f,state,commander}=setup());commander.weapon=0;const duplicate={x:400,y:425,type:'auto'},upgrade={x:450,y:400,type:'plasma'};state.pickups=[duplicate,upgrade];f.update(.1);assert(commander.x>400&&commander.y===400,'AI ignores nearest matching gun and pursues needed upgrade');assert(state.pickups.includes(duplicate));
 ({f,state,commander}=setup());commander.weapon=2;state.pickups=[{x:400,y:425,type:'plasma'},{x:450,y:400,type:'troops'}];f.update(.1);assert(commander.x>400&&commander.y===400,'Duplicate filtering retains available reinforcement eagle as AI goal');
 console.log('Passed all four commanders duplicate auto/flame/rapid/plasma contact with no reward/effects, weapon switches, other collectors, grenade/support behavior and AI upgrade/eagle choice.');
}

// The occupied cannon composite owns its operator sprite; human rendering and selection remain independent.
{
 for(const type of ['soldier','commando']){
  api.loadMission(5);const f=sandbox.window.__fixture(),state=f.state,gun=state.cannons[0];state.mode='playing';resumeSimulation();
  const u={x:gun.x,y:gun.y,type,team:'human',alive:true,hp:1,weapon:0,cool:0,order:0,angle:0};
  state.humans.push(u);f.selection.clear();f.selection.add(u);
  const humanCalls=()=>f.drawSprites().filter(c=>c[0]===52&&c[1]===u.x&&c[2]===u.y);
  assert.equal(humanCalls().length,1,'On-foot '+type+' is drawn');
  f.useOrderTo({kind:'cannon',target:gun,...gun});f.useOrderStep(u,.02);
  assert.equal(gun.occupant,u);assert.equal(u.cannon,0);
  const rings=[];ctx.ellipse=(...args)=>rings.push(args);
  const mounted=f.drawSprites();delete ctx.ellipse;
  assert.equal(mounted.filter(c=>c[0]===52&&c[1]===u.x&&c[2]===u.y).length,0,'Mounted '+type+' standing sprite suppressed');
  assert(mounted.some(c=>c[0]===gun.object&&c[1]===gun.x&&c[2]===gun.y&&c[4]===11),'Seated operator cannon animation remains');
  assert(rings.some(r=>r[0]===u.x&&r[1]===u.y+5&&r[2]===13),'Mounted selection ring remains');
  f.attackMoveTo({x:u.x+80,y:u.y+80},true);
  assert.equal(gun.occupant,null);assert.equal(humanCalls().length,1,'Dismount restores '+type+' sprite');
  u.cannon=0;assert.equal(humanCalls().length,1,'Stale mount index does not hide an unoccupied human');
  gun.occupant=u;u.alive=false;assert.equal(humanCalls().length,0,'Dead operator is not drawn as a human');
  f.update(.02);assert.equal(gun.occupant,null,'Dead occupant is cleared');
  api.loadMission(5);const fresh=sandbox.window.__fixture();assert(fresh.state.cannons.every(c=>!c.occupant),'Restart clears mounted render ownership');
 }
 console.log('Passed mounted soldier/commando standing suppression, seated composite, selection ring, dismount/stale-index/death and restart draw checks.');
}

// Cannon visual orientation and sweep ballistics override on-foot direction counts.
{
 api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.pickups=[];state.pickupClock=100;state.aliens=[];state.nests=[{x:980,y:740,hp:50,timer:1e6}];
 const matches=(shot,angle)=>assert(Math.abs(shot.dx-Math.cos(angle))<1e-9&&Math.abs(shot.dy-Math.sin(angle))<1e-9,'Projectile must use expected cannon direction');
 for(const type of ['soldier','commando']){
  const directions=new Set();for(let n=0;n<16;n++){const angle=n*Math.PI/8,u={x:500,y:400,type,team:'human',alive:true,hp:1,weapon:2,cannon:0,cool:0,order:0},target={x:500+100*Math.cos(angle),y:400+100*Math.sin(angle),team:'alien',alive:true,hp:100};state.cannons=[{x:500,y:400,occupant:u}];state.bullets=[];f.aimHuman(u,target,.5);assert.equal(state.bullets.length,0,'Mounted operator retains burst reaction');state.t=u.burst.readyAt;f.aimHuman(u,target,.5);assert.equal(state.bullets.length,1);matches(state.bullets[0],u.sweep.start);assert(Math.abs(Math.sin(u.angle-Math.round(u.sweep.start/(Math.PI/8))*Math.PI/8))<1e-9,'Render remains sixteen-way');directions.add(state.bullets[0].dx.toFixed(8)+','+state.bullets[0].dy.toFixed(8));assert.equal(u.x,500);assert.equal(u.y,400,'Mounted aim never performs firing-lane movement');assert.equal(u.cool,.38);assert(state.bullets[0].plasma);assert.equal(state.bullets[0].damage,1);assert.equal(state.bullets[0].life,1.1);}assert.equal(directions.size,16,'Every operator supports all sixteen headings');
  for(const [input,expected] of [[Math.PI/16-1e-6,0],[Math.PI/16+1e-6,Math.PI/8],[-Math.PI/16+1e-6,0],[-Math.PI/16-1e-6,-Math.PI/8],[Math.PI-1e-6,Math.PI],[-Math.PI+1e-6,-Math.PI],[2*Math.PI+.2,Math.PI/8],[.51,Math.PI/8]]){const u={x:500,y:400,type,team:'human',weapon:2,cannon:0,cool:0,order:3,angle:input};state.bullets=[];f.fire(u,true);matches(state.bullets[0],expected);assert.equal(u.cool,type==='commando'?.38:.20,'Cannon preserves existing operator/order cooldown');}
  const offAngle=.51,u={x:500,y:400,type,team:'human',alive:true,hp:1,weapon:2,cannon:0,cool:0,order:0},target={x:500+100*Math.cos(offAngle),y:400+100*Math.sin(offAngle),alive:true,hp:100};state.bullets=[];f.aimHuman(u,target,.5);state.t=u.burst.readyAt;f.aimHuman(u,target,.5);matches(state.bullets[0],u.sweep.start);assert(u.sweep.width>=0&&u.sweep.width<=15*Math.PI/180);
  state.humans=[u];state.cannons=[{x:u.x,y:u.y,occupant:u}];f.selection.clear();f.selection.add(u);f.attackMoveTo({x:700,y:400});assert.equal(u.cannon,undefined);assert.equal(state.cannons[0].occupant,null);u.cool=0;u.angle=offAngle;state.bullets=[];f.fire(u);matches(state.bullets[0],Math.PI/4,'Dismount restores on-foot directions');
 }
 for(const type of ['soldier','commando']){const u={x:500,y:400,type,team:'human',alive:true,hp:1,weapon:0,cool:0,order:0},gun={x:510,y:400};state.humans=[u];state.cannons=[gun];f.update(.02);assert.equal(gun.occupant,u,'Normal proximity mounts '+type);assert.equal(u.cannon,0);f.selection.clear();f.selection.add(u);f.useOrderTo({kind:'cannon',target:gun,...gun});f.useOrderStep(u,.02);assert.equal(u.cannon,0,'Explicit use mounts either operator');}
 const u={x:500,y:400,type:'soldier',team:'human',alive:true,hp:1,weapon:0,cool:0,order:2,attackMove:{x:700,y:400}};state.humans=[u];state.cannons=[{x:512,y:400}];f.attackMoveStep(u,null,.02);assert.equal(u.cannon,0,'Attack-move turret mount retains sixteen-direction operator state');
 // Boundary widths, locked center, direction reversal and interruption retain operator timing.
 for(const type of ['soldier','commando'])for(const width of [0,15*Math.PI/180]){
  const u={x:500,y:400,type,team:'human',alive:true,hp:1,weapon:2,cannon:0,cool:0,order:0},target={x:400,y:401,alive:true,hp:100};
  state.bullets=[];f.aimHuman(u,target,0);state.t=u.burst.readyAt;
  // Pin only the arc boundary via an active fixture sweep; burst acquisition is real.
  f.aimHuman(u,target,0);const total=u.sweep.total,center=Math.atan2(1,-100),sign=u.sweep.sign;
  u.sweep={start:center-sign*width/2,width,sign,total,index:0};u.burst.remaining=total;u.cool=0;state.bullets=[];
  target.y=430;
  for(let i=0;i<total;i++){f.aimHuman(u,target,0);matches(state.bullets.at(-1),center+sign*width*(i/(total-1)-.5));assert.equal(u.cool,.38);u.cool=0;state.t+=.38;}
  assert.equal(u.burst.remaining,0);const rest=u.burst.restUntil-state.t+.38,r=f.burstRules[type];assert(rest>=r.restMin-1e-9&&rest<=r.restMax+1e-9);
  state.t=u.burst.restUntil;f.aimHuman(u,target,0);assert.equal(u.sweep.sign,-sign);assert(u.sweep.width<=15*Math.PI/180);
  target.alive=false;u.cool=0;const count=state.bullets.length;f.aimHuman(u,target,0);assert.equal(state.bullets.length,count);assert.equal(u.sweep,null);
 }
 const maxArc=sandbox.window.TriumphBalance.cannonSweepRules.maxArc;sandbox.window.TriumphBalance.cannonSweepRules.maxArc=0;
 const zero={x:500,y:400,type:'soldier',team:'human',alive:true,hp:1,weapon:2,cannon:0,cool:0,order:0},zeroTarget={x:600,y:410,alive:true,hp:100};state.bullets=[];f.aimHuman(zero,zeroTarget,0);state.t=zero.burst.readyAt;f.aimHuman(zero,zeroTarget,0);assert.equal(zero.sweep.width,0);matches(state.bullets[0],Math.atan2(10,100));sandbox.window.TriumphBalance.cannonSweepRules.maxArc=maxArc;
 state.humans=[zero];state.cannons=[{x:zero.x,y:zero.y,occupant:zero}];f.selection.clear();f.selection.add(zero);f.focusAttackTo(zeroTarget);assert.equal(zero.cannon,undefined);assert.equal(zero.sweep,null,'Explicit focus dismounts and cancels locked sweep');
 elements['#units'].onclick();assert(elements['#unit-cards'].innerHTML.includes('16 equally spaced directions'));elements['#units-close'].onclick();
 console.log('Passed both cannon operators all16 visual headings and continuous sweep starts, boundaries/wrap/off-angle quantization, preserved burst/plasma/cooldown, proximity/use/attack-move mounts and dismount direction restoration.');
}

{
 for(const mission of [7,8,9]){
  api.loadMission(mission);const f=sandbox.window.__fixture(),s=f.state;elements['#start'].onclick();const v=s.vents[0];f.update(.04);assert.equal(v.x,0,'Tactical startup freezes ceiling movement');assert.equal(s.ventClock.contact,0);resumeSimulation();
  s.mask=null;s.rocks=[];s.doors=[];s.props=[];s.aliens=[];s.nests=[];s.pickups=[];s.pickupClock=100;s.waveKills={normal:999,queen:999};s.waveClock=100;for(const t of s.terminals)t.active=true;if(s.crystal)s.crystal.recovered=true;
  const u=s.humans[0];s.humans=[u];Object.assign(u,{x:400,y:400,angle:0,order:3});Object.assign(v,{x:440,y:400,mode:12,dropRoll:29,moving:false});
  assert.equal(f.enemyAt(v),null,'Ceiling is excluded from focus hit detection');assert.equal(f.perceive(u,s.aliens,245),null,'AI has no ceiling combat target');
  for(const phase of ['ceiling','drop','jump']){v.phase=phase;v.object=phase==='ceiling'?(mission===7?448:475):phase==='drop'?446:447;v.age=0;s.bullets=[{x:v.x,y:v.y,dx:0,dy:0,speed:290,life:1,damage:100,team:'human',owner:1}];f.update(.01);assert.equal(s.vents.length,1,'Projectile does not destroy '+phase);assert.equal(f.missionProgress().vents,1,'Completion counts '+phase+' exactly once');assert(!f.missionProgress().ready);}
  v.phase='ceiling';v.object=mission===7?448:475;u.angle=0;f.grenade(u);assert.equal(s.vents.length,1,'Grenade does not kill ceiling');assert.equal(s.kills,0);assert.deepEqual(Array.from(s.score),[0,0,0,0]);
  v.phase='drop';v.object=446;v.age=0;s.bullets=[];u.cool=100;f.update(.04);assert.equal(s.mode,'playing','Transition prevents premature victory');
  for(let i=0;i<14;i++)f.update(.04);assert.equal(s.vents.length,0);assert.equal(s.aliens.length,1,'Completed drop creates exactly one combat actor');const bug=s.aliens[0];assert.equal(bug.type,'soldier');assert.equal(bug.object,151);assert.equal(bug.hp,4,'Landing restores source ordinary bug health');f.damage(bug,100,1);assert.equal(s.kills,1,'Landed bug is damageable');f.update(.01);assert.equal(s.mode,'victory','All lifecycle actors cleared permits normal completion');
 }
 console.log('Passed runtime vent freeze, AI/focus/projectile/grenade immunity, one-per-phase progress, normal grounded damage and all three mission completion paths.');
}

// TRI-038: compare actual callers with the previous rate over equivalent dt/routes.
{
 const balance=sandbox.window.TriumphBalance,approved=balance.groundRobotMovementMultiplier;
 assert.equal(approved,1.5);
 function run(type,mult,scenario,fallback=false){
  balance.groundRobotMovementMultiplier=mult;api.loadMission(1);const f=sandbox.window.__fixture(),state=f.state;state.mode='playing';resumeSimulation();f.setSeed(123);
  state.mask=null;state.rocks=[];state.doors=[];state.props=[];state.pickups=[];state.cannons=[];state.aliens=[];state.nests=[];state.gate=null;state.pickupClock=100;
  const u={id:90,x:300,y:400,team:'human',type,alive:true,hp:type==='robot'?7:1,cool:100,weapon:0,order:2};state.humans=[u];
  if(scenario==='route')state.rocks=[{x:340,y:200,w:20,h:300}];
  const target={x:800,y:400,team:'alien',type:'bug',hp:100,alive:true};
  if(scenario==='focus') {state.aliens=[target];u.focusTarget=target;}
  if(scenario==='use'){state.terminals=[target];u.useOrder={kind:'terminal',target};}
  if(['attack','force'].includes(scenario))u.attackMove={x:800,y:400,force:scenario==='force'};
  if(scenario==='rally'){f.addRally({x:800,y:400});f.assignRally(u);}
  if(scenario==='patrol')u.patrol={x:800,y:400,until:100,pause:0};
  if(scenario==='follow'){u.order=1;u.leader=91;state.humans.push({id:91,x:800,y:400,type:'commander',team:'human',alive:true,hp:1,cool:100,order:3});}
  if(scenario==='defend'){u.order=3;u.anchor={x:800,y:400};}
  if(scenario==='hunt')state.aliens=[target];
  const nav=sandbox.window.TriumphNavigation;if(fallback)sandbox.window.TriumphNavigation=null;
  let distance=0;
  try{for(let i=0;i<10;i++){const x=u.x,y=u.y;state.t+=.02;
   if(scenario==='aim'){target.x=420;target.y=430;f.aimHuman(u,target,.02);}
   else if(scenario==='patrol')f.patrol(u,.02,24);
   else if(scenario==='focus')f.focusAttackStep(u,.02);
   else if(scenario==='use')f.useOrderStep(u,.02);
   else if(['attack','force','rally'].includes(scenario))f.attackMoveStep(u,null,.02);
   else if(['follow','defend','hunt'].includes(scenario))f.update(.02);
   else f.navigate(u,500,0,.02,36);
   distance+=Math.hypot(u.x-x,u.y-y);assert(!f.blocked(u.x,u.y));
  }}finally{sandbox.window.TriumphNavigation=nav;}
  if(scenario==='route')assert(Math.abs(u.y-400)>1,'Terrain route bends around wall');
  assert.equal(u.hp,type==='robot'?7:1);return distance;
 }
 try{
  for(const scenario of ['travel','route','attack','force','rally','focus','use','aim','patrol','follow','defend','hunt']){
   const baseline=run('robot',1,scenario),faster=run('robot',approved,scenario);assert(baseline>0,scenario+' exercises movement');assert(Math.abs(faster/baseline-1.5)<1e-8,scenario+' moves 50% farther for equivalent dt');
  }
  for(const type of ['soldier','commando','tank','commander'])assert.equal(run(type,1,'travel'),run(type,approved,'travel'),type+' unchanged');
  assert(Math.abs(run('robot',approved,'travel',true)/run('robot',1,'travel',true)-1.5)<1e-8,'Fallback navigation applies multiplier once');
 }finally{balance.groundRobotMovementMultiplier=approved;}
 console.log('Passed robot 1.5x distance across travel/attack/force/rally/focus/use/aim/patrol/follow/defend/hunt, fallback routing and unchanged other-unit controls.');
}

// TRI-035: dormant custom actor exercises real combat/mission integration.
{
 api.loadMission(1);const f=sandbox.window.__fixture(),st=f.state;st.rocks=[];st.props=[];st.doors=[];st.mask=new Uint8Array(1024*768);st.aliens=[];st.nests=[];st.fires=[];st.mode='playing';
 const worm=f.spawnDesertWorm(500,400);assert(worm);assert.equal(st.aliens.length,1);const human={x:550,y:400,type:'soldier',team:'human',alive:true,hp:8,id:0};st.humans=[human];
 f.damage(worm,100,1);f.kill(worm,1);assert.equal(worm.hp,16);assert(worm.alive);assert(!f.visible(human,worm));assert.equal(f.enemyAt(worm),null);human.focusTarget=worm;assert.equal(f.focusAttackStep(human,.01),false);assert.equal(human.focusTarget,null,'Prior exposed focus drops on burrow');
 f.grenade({...human,angle:Math.PI,grenades:1});f.supportExplosion(worm.x,worm.y);assert.equal(worm.hp,16,'Grenade/support underground immunity');
 st.bullets=[{x:worm.x,y:worm.y,dx:0,dy:0,speed:0,life:2,team:'human',damage:5,owner:1}];resumeSimulation();f.update(.01);assert.equal(st.bullets.length,1,'Burrow does not absorb bullets');
 worm.phase='warning';worm.phaseTime=1.2;worm.telegraph={x:500,y:400,dx:1,dy:0,range:260,width:24};assert(f.visible(human,worm));assert.equal(f.enemyAt(worm),worm);f.update(.01);assert.equal(worm.hp,11,'Exposed projectile damage');f.damage(worm,20,1);assert(!worm.alive);assert.equal(st.kills,1);assert(st.score[0]>=10);
 for(let n=1;n<=9;n++){api.loadMission(n);assert(!sandbox.window.__fixture().state.aliens.some(a=>a.type==='desert-worm'));}
 for(const m of sandbox.window.TriumphCustomMissions.list){api.loadCustomMission(m.id);assert.equal(sandbox.window.__fixture().state.aliens.some(a=>a.type==='desert-worm'),m.id.startsWith('custom-desert-beneath-dunes'));}
 console.log('Passed dormant worm combat guards, projectile passthrough/exposed damage, kill accounting and original/custom isolation.');
}

// TRI-040: opt-in infantry uses the established order/controller paths.
{
 api.loadMission(1);resumeSimulation();const f=sandbox.window.__fixture(),st=f.state;st.mask=new Uint8Array(1024*768);st.rocks=[];st.props=[];st.doors=[];st.nests=[];st.pickups=[];st.cannons=[];st.aliens=[];st.humans=[];st.mode='playing';
 const target={x:450,y:420,type:'soldier',team:'alien',alive:true,hp:100,cool:999};st.aliens=[target];
 for(const type of ['rider-scout','field-mechanic','dune-guard']){
  const u=f.spawnDesertRider(type,300,300);u.order=3;u.anchor={x:300,y:300};st.humans=[u];st.bullets=[];f.aimHuman(u,target,0);assert.equal(st.bullets.length,0,type+' Defend holds diagonal target without wasting cardinal shot');assert.equal(u.x,300);
  target.x=400;target.y=300;f.aimHuman(u,target,0);assert.equal(st.bullets.length,type==='dune-guard'?5:1);assert(st.bullets.every(b=>b.team==='human'));if(type==='dune-guard'){u.cool=Math.max(0,u.cool-.5);f.aimHuman(u,target,0);assert.equal(st.bullets.length,5,'Shotgun cooldown holds');u.cool=Math.max(0,u.cool-.61);f.aimHuman(u,target,0);assert.equal(st.bullets.length,10,'Shotgun resumes after 1.1s');}target.x=450;target.y=420;
  u.cool=0;u.attackMove={x:400,y:300,force:true};st.bullets=[];f.update(.1);assert.equal(st.bullets.length,0,type+' force-move suppresses fire');assert(u.x>300);u.attackMove=null;
  u.focusTarget=target;u.order=2;const x=u.x,y=u.y;assert(f.focusAttackStep(u,.1));assert(u.x!==x||u.y!==y,type+' focus pursues legal firing lane');
  const terminal={x:u.x,y:u.y,object:253,active:false};st.terminals=[terminal];f.selection.clear();f.selection.add(u);f.useOrderTo({kind:'terminal',target:terminal,x:terminal.x,y:terminal.y});assert(u.useOrder,type+' accepts terminal use');f.useOrderStep(u,.1);assert(terminal.used,type+' executes terminal use');
 }
 for(const type of ['rider-scout','dune-guard','field-mechanic']){
  st.humans=[];st.aliens=[];st.mask=null;st.rocks=[{x:480,y:200,w:20,h:170},{x:480,y:430,w:20,h:170},{x:480,y:200,w:300,h:20},{x:480,y:580,w:300,h:20},{x:760,y:200,w:20,h:400}];const door={x:480,y:370,w:20,h:60,cx:490,cy:400,open:false,locked:false};st.doors=[door];const u=f.spawnDesertRider(type,300,300);for(let i=0;i<1100;i++)f.navigate(u,650-u.x,300-u.y,.02,36);assert(Math.hypot(u.x-650,u.y-300)<2,type+' full-body route opens unlocked door');assert(door.open);
  door.open=false;door.locked=true;u.x=300;u.y=300;for(let i=0;i<100;i++)f.navigate(u,650-u.x,300-u.y,.02,36);assert(u.x<480,type+' respects locked door');
 }
 st.rocks=[];st.doors=[];st.mask=new Uint8Array(1024*768);st.humans=[];
 const scout=f.spawnDesertRider('rider-scout',300,300);const leader={x:440,y:300,id:1,type:'commander',alive:true,hp:1};st.humans=[scout,leader];st.aliens=[];scout.order=1;scout.anchor={x:200,y:300};f.update(.1);assert(scout.x>300,'Follow ignores stale Defend anchor');
 for(let n=1;n<=9;n++){api.loadMission(n);assert(!sandbox.window.__fixture().state.humans.some(sandbox.window.TriumphDesertRiders.isRider));}
 for(const m of sandbox.window.TriumphCustomMissions.list){api.loadCustomMission(m.id);assert.equal(sandbox.window.__fixture().state.humans.some(sandbox.window.TriumphDesertRiders.isRider),m.id.startsWith('custom-desert-beneath-dunes'));}
 console.log('Passed Rider shared cardinal lane/Defend, exact guard pellets, force/focus, terminal use, Follow anchor and all existing mission roster isolation.');
}

// TRI-007: production adapter through actual frame polling and commander update.
{
 const pad={index:0,connected:true,mapping:'standard',axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))};
 sandbox.navigator.getGamepads=()=>[pad];api.loadMission(1);elements['#start'].onclick();assert.equal(api.state().mode,'playing');assert.equal(api.state().paused,true);frames(1);
 assert.equal(api.state().activeCommander,null);pad.buttons[5].pressed=true;frames(1);assert.equal(api.state().activeCommander,1);
 pad.buttons[5].pressed=false;pad.buttons[9].pressed=true;frames(1);assert.equal(api.state().paused,false);pad.buttons[9].pressed=false;frames(2);
 const f=sandbox.window.__fixture(),u=f.state.humans.find(u=>u.id===1);u.cool=0;pad.axes[2]=.7;pad.axes[3]=.7;pad.buttons[7].pressed=true;frames(1);
 const bullet=f.state.bullets.find(b=>b.owner===1);assert(bullet&&Math.abs(bullet.dx-bullet.dy)<1e-8,'production runtime free-aim shot');
 assert(elements['#gamepad-status'].textContent.includes('Commander 1'),'production connection status');
 sandbox.navigator.getGamepads=()=>[];frames(1);assert.equal(api.state().activeCommander,null);assert.equal(api.state().mouseMode,'troops');
 console.log('Passed production gamepad frame wiring, explicit tactical selection/resume, free-aim firing, status and disconnect AI release. No hardware claim.');
}

// TRI-062: Weapon-aware soldier AI & effective range positioning checks
{
 api.loadMission(1);resumeSimulation();const f=sandbox.window.__fixture(),st=f.state;st.mask=new Uint8Array(1024*768);st.rocks=[];st.props=[];st.doors=[];st.nests=[];st.pickups=[];st.cannons=[];st.aliens=[];st.humans=[];st.mode='playing';

 // 1. Short-range weapons aggressively close distance into firing range
 {
  const flamethrower={x:200,y:200,team:'human',type:'soldier',alive:true,hp:1,angle:0,cool:0,weapon:1,order:2};
  const bug={x:370,y:200,team:'alien',type:'soldier',alive:true,hp:4};
  st.humans=[flamethrower];st.aliens=[bug];
  const startX=flamethrower.x;
  for(let i=0;i<10;i++)f.update(.1);
  assert(flamethrower.x>startX,'Short-range flamethrower soldier at 170px aggressively closes distance into firing range');
 }
 {
  const duneGuard={x:200,y:200,team:'human',type:'dune-guard',alive:true,hp:1,angle:0,cool:0,weapon:0,order:2};
  const bug={x:340,y:200,team:'alien',type:'soldier',alive:true,hp:4};
  st.humans=[duneGuard];st.aliens=[bug];
  const startX=duneGuard.x;
  for(let i=0;i<10;i++)f.update(.1);
  assert(duneGuard.x>startX,'Short-range dune-guard shotgun at 140px aggressively closes distance into firing range');
 }

 // 2. Long-range weapons maintain standoff distance when feasible
 {
  const plasmaSoldier={x:200,y:200,team:'human',type:'soldier',alive:true,hp:1,angle:0,cool:0,weapon:2,order:2};
  const bug={x:440,y:200,team:'alien',type:'soldier',alive:true,hp:4};
  st.humans=[plasmaSoldier];st.aliens=[bug];
  const startX=plasmaSoldier.x;
  for(let i=0;i<10;i++)f.update(.1);
  assert.equal(plasmaSoldier.x,startX,'Long-range plasma soldier at 240px maintains standoff distance without charging into close quarters');
 }
 {
  const plasmaSoldier={x:200,y:200,team:'human',type:'soldier',alive:true,hp:1,angle:0,cool:0,weapon:2,order:0};
  const bug={x:480,y:200,team:'alien',type:'soldier',alive:true,hp:4};
  st.humans=[plasmaSoldier];st.aliens=[bug];
  let acquired=false;
  for(let i=0;i<12;i++){st.t+=.5;if(f.perceive(plasmaSoldier,[bug],319)===bug)acquired=true;}
  assert(acquired,'Plasma-wielding soldier perceives visible targets up to 319px');
 }

 // 3. Firing arc & cone spray awareness prioritizes target cluster with highest enemy density
 {
  const flameSoldier={x:200,y:200,team:'human',type:'soldier',alive:true,hp:1,angle:0,cool:0,weapon:1,order:0};
  const bugA={x:300,y:200,team:'alien',type:'soldier',alive:true,hp:4};
  const bugB={x:200,y:300,team:'alien',type:'soldier',alive:true,hp:4};
  const bugC={x:210,y:305,team:'alien',type:'soldier',alive:true,hp:4};
  const bugD={x:190,y:305,team:'alien',type:'soldier',alive:true,hp:4};
  st.humans=[flameSoldier];st.aliens=[bugA,bugB,bugC,bugD];
  let sprayTarget=null;
  for(let i=0;i<12;i++){st.t+=.5;const t=f.perceive(flameSoldier,[bugA,bugB,bugC,bugD],145);if(t)sprayTarget=t;}
  assert([bugB,bugC,bugD].includes(sprayTarget),'Cone spray targeting prioritizes target cluster with highest enemy density in spray arc');
 }
 console.log('Passed weapon-aware soldier AI & effective range positioning checks (short-range close in, long-range standoff, spray cone density prioritization).');
 }

 // TRI-063: Proactive attack-move guard stance with local engagement leash
 {
  api.loadMission(1);resumeSimulation();const f=sandbox.window.__fixture(),st=f.state;
  st.mode='playing';st.rocks=[];st.doors=[];st.props=[];st.aliens=[];st.nests=[];st.bullets=[];st.cannons=[];st.pickups=[];

  // 1. Soldiers reaching attack-move destination enter proactive guard stance with anchor
  const soldier=st.humans.find(u=>u.type==='soldier')||f.addTroop(52,200,200);
  st.humans=[soldier];
  Object.assign(soldier,{x:200,y:200,team:'human',alive:true,hp:1,cool:0,weapon:0,order:2,useOrder:null,focusTarget:null,cannon:undefined,supplyTrip:null,ai:null,attackMove:{x:208,y:200,force:false}});
  f.update(.1);
  assert.equal(soldier.attackMove,null,'Attack-move clears upon arrival at destination');
  assert.equal(soldier.order,3,'Reaching attack-move destination transitions to order 3 guard stance');
  assert(soldier.anchor&&Math.abs(soldier.anchor.x-soldier.x)<1e-6&&Math.abs(soldier.anchor.y-soldier.y)<1e-6,'Arrival position recorded as anchor');

  // 2. Guard stance soldier steps out within leash radius to angle a legal firing lane at nearby hostiles
  const anchorX=400,anchorY=350;
  Object.assign(soldier,{x:anchorX,y:anchorY,order:3,anchor:{x:anchorX,y:anchorY},cool:0});
  const bug={x:510,y:380,team:'alien',type:'soldier',alive:true,hp:10};
  st.aliens=[bug];st.bullets=[];
  const oldY=soldier.y;
  for(let i=0;i<40;i++){st.t+=.05;soldier.cool=0;f.update(.05);}
  assert(soldier.y>oldY,'Guard soldier steps out from anchor to align a legal firing lane');
  assert(Math.hypot(soldier.x-anchorX,soldier.y-anchorY)<=50.1,'Guard soldier remains within leash radius from anchor while stepping out');
  assert(st.bullets.length>0,'Guard soldier fires once legal lane is angled');

  // 3. Guard soldier returns/leashes back to anchor position once target is clear
  bug.hp=0;st.aliens=[];
  for(let i=0;i<40;i++){st.t+=.05;f.update(.05);}
  assert(Math.hypot(soldier.x-anchorX,soldier.y-anchorY)<=12,'Guard soldier leashes back to arrival anchor once clear of hostiles');

  // 4. Leash radius strictly caps max distance from anchor when target is obstructed or far offset
  Object.assign(soldier,{x:anchorX,y:anchorY,order:3,anchor:{x:anchorX,y:anchorY},cool:0});
  const farOffsetBug={x:510,y:490,team:'alien',type:'soldier',alive:true,hp:10};
  st.aliens=[farOffsetBug];
  for(let i=0;i<60;i++){st.t+=.05;soldier.cool=0;f.update(.05);}
  assert(Math.hypot(soldier.x-anchorX,soldier.y-anchorY)<=50.1,'Leash radius strictly caps maximum movement from anchor');

  console.log('Passed TRI-063 proactive attack-move guard stance, local leash radius stepping/firing, return-to-anchor once clear, and strict leash cap.');
 }

 {
  const customScenarioIds=['custom-snow-whiteout-signal','custom-maritime-harbor-watch','custom-capital-district-twelve','custom-desert-beneath-dunes','custom-jungle-canopy-recon','custom-volcanic-forge-strike','custom-undercity-tunnels-breach'];
  for(const id of customScenarioIds){
   sandbox.window.triumph.loadCustomMission(id); resumeSimulation();
   let f=sandbox.window.__fixture(),st=f.state;
   st.mode='playing';st.aliens=[];st.nests=[];st.pickupClock=1000;st.rules.maxAliens=50;
   const eagle=st.pickups.find(p=>['troops','air','tank','blitz'].includes(p.type));
   assert(eagle,'Scenario '+id+' has starting reinforcement eagle');
   let troop=st.humans.find(u=>u.alive&&u.type!=='commander'&&!sandbox.window.TriumphDesertRiders?.isRider?.(u));
   if(!troop){troop={id:99,x:0,y:0,team:'human',type:'soldier',alive:true,hp:4,angle:0,cool:0,weapon:0,order:0};st.humans.push(troop);}
   troop.x=eagle.x;troop.y=eagle.y;
   const beforePickups=st.pickups.length;
   f.update(.02);
   assert(!st.pickups.includes(eagle),'Infantry walking over eagle in '+id+' collects it');
   assert(st.pickups.length<beforePickups,'Pickup count decreases in '+id);

   sandbox.window.triumph.loadCustomMission(id); resumeSimulation();
   f=sandbox.window.__fixture();st=f.state;
   st.mode='playing';st.aliens=[];st.nests=[];st.pickupClock=1000;st.rules.maxAliens=50;
   const eagle2=st.pickups.find(p=>['troops','air','tank','blitz'].includes(p.type));
   let soldier=st.humans.find(u=>u.type==='soldier');
   if(!soldier){soldier={id:98,x:0,y:0,team:'human',type:'soldier',alive:true,hp:4,angle:0,cool:0,weapon:0,order:0};st.humans.push(soldier);}
   soldier.x=eagle2.x-10;soldier.y=eagle2.y;
   soldier.attackMove={x:eagle2.x+30,y:eagle2.y};soldier.order=2;
   f.update(.02);
   assert(!st.pickups.includes(eagle2),'Attack-moving soldier in '+id+' collects starting reinforcement eagle');
  }
  console.log('Passed starting reinforcement eagle collection for infantry and attack-moving troops across custom scenarios (Whiteout Signal, Harbor Watch, District Twelve, Beneath the Dunes, Jungle Recon, Volcanic Forge, Undercity Tunnels).');
 }



  {
   // TRI-066 World rosters & Snow Sniper specialist unit verification
   const rosters=sandbox.window.TriumphCustomMissions.worldRosters;
   assert(rosters,'worldRosters exported on TriumphCustomMissions');
   assert.equal(JSON.stringify(rosters.Snow),JSON.stringify(['soldier','snow-sniper','winter-gunner','commando']));
   assert.equal(JSON.stringify(rosters.Maritime),JSON.stringify(['soldier','suppressor','grenadier','commando']));
   assert.equal(JSON.stringify(rosters.Capital),JSON.stringify(['soldier','shield-trooper','laser-cannon','commando']));
   assert.equal(JSON.stringify(rosters.Desert),JSON.stringify(['rider-scout','dune-guard','field-mechanic','soldier']));
   assert.equal(JSON.stringify(rosters.Jungle),JSON.stringify(['soldier','recon','commando']));
   assert.equal(JSON.stringify(rosters.Volcanic),JSON.stringify(['soldier','demolition-trooper','cooling-trooper','commando']));
   assert.equal(JSON.stringify(rosters.Undercity),JSON.stringify(['soldier','corner-ambusher','commando']));

   for(const m of sandbox.window.TriumphCustomMissions.list){
    assert(m.environment,'Scenario '+m.id+' has environment');
    assert.equal(JSON.stringify(m.worldRoster),JSON.stringify(rosters[m.environment]),'Scenario '+m.id+' has matching worldRoster');
   }

   sandbox.window.triumph.loadCustomMission('custom-snow-whiteout-signal'); resumeSimulation();
   const f=sandbox.window.__fixture(),st=f.state;
   assert.equal(st.customMission.optInSniper,true);
   const snipers=st.humans.filter(u=>u.type==='snow-sniper');
   assert.equal(snipers.length,2,'Whiteout Signal deploys opt-in snow snipers');

   const sniper=snipers[0];
   assert(f.selectable(sniper),'Snow sniper is selectable');

   // Verify 360-degree unconstrained free aim
   const bug={x:sniper.x+200,y:sniper.y+73,team:'alien',type:'soldier',alive:true,hp:10};
   st.aliens=[bug];st.bullets=[];st.nests=[];st.mask=null;st.rocks=[];st.doors=[];st.props=[];
   f.aimHuman(sniper,bug,0);
   const expectedAngle=Math.atan2(73,200);
   assert(Math.abs(sniper.angle-expectedAngle)<1e-4,'Snow sniper uses unconstrained 360-degree aiming');

   // Verify firing properties: 4 damage, 1.2s cooldown, 400 speed, life 1.5, sniper tracer flag
   sniper.cool=0;
   f.fire(sniper);
   assert.equal(sniper.cool,1.2,'Sniper weapon cooldown is 1.2s');
   assert.equal(st.bullets.length,1);
   const bullet=st.bullets[0];
   assert.equal(bullet.damage,4,'Sniper rifle damage is 4');
   assert.equal(bullet.speed,400,'Sniper bullet speed is 400');
   assert.equal(bullet.life,1.5,'Sniper bullet life is 1.5');
   assert.equal(bullet.sniper,true,'Sniper bullet has sniper tracer flag');

   // Verify perception & standoff range
   sniper.ai={nextScan:0,target:bug,hesitateUntil:0};
   assert.equal(f.perceive(sniper,[bug],480),bug,'Perceives target within 480px standoff range');
   bug.x=sniper.x+500;sniper.ai={nextScan:0,hesitateUntil:0};
   assert.equal(f.perceive(sniper,[bug],480),null,'Target beyond 480px range not perceived');

   // Verify rendering overlay
   let drawn=false;
   sandbox.window.TriumphRendering.variantMark({
    save(){},restore(){},translate(){},rotate(){},
    fillStyle:'',fillRect(){drawn=true;}
   },sniper);
   assert(drawn,'Snow sniper variantMark renders optics visor & camo overlay');

   console.log('Passed TRI-066 environment world rosters mapping and Nivalis Snow Sniper 360-deg aiming, 480px standoff range, 4 damage, 1.2s cooldown, optics visor rendering and opt-in whiteout deployment.');
  }

  {
   // TRI-068 Custom reinforcement eagle troop payload selection verification
   sandbox.window.triumph.loadMission(1);
   const f=sandbox.window.__fixture(),st=f.state;
   st.mode='playing';resumeSimulation();

   // Test 1: Ground carrier with explicit payload array
   st.humans=st.humans.filter(u=>u.type==='commander');
   st.reinforcements=[];st.drops=[];
   const payload=['soldier','commando','rider-scout','dune-guard','field-mechanic','snow-sniper'];
   assert(f.reinforce('troops',{payload}),'Reinforce accepts custom payload object');
   assert.equal(st.reinforcements[0].kind,'carrier');
   assert.equal(st.reinforcements[0].payload.join(','),payload.join(','),'Carrier stores custom payload');

   // Fast forward carrier unload and verify each dropped unit matches payload order
   for(let i=0;i<500;i++){st.t+=.04;f.updateSupport(.04);}
   const dropped=st.humans.filter(u=>u.type!=='commander');
   assert.equal(dropped.length,6,'Carrier drops all 6 custom payload troops');
   assert.equal(dropped.map(u=>u.type).join(','),payload.join(','),'Troops match payload order');

   // Test 2: Air drop with custom payload array
   st.humans=st.humans.filter(u=>u.type==='commander');
   st.reinforcements=[];st.drops=[];
   const airPayload=['snow-sniper','field-mechanic'];
   assert(f.reinforce('air',{payload:airPayload}),'Reinforce air accepts custom payload');
   for(let i=0;i<600;i++){st.t+=.04;f.updateSupport(.04);}
   const airDropped=st.humans.filter(u=>u.type!=='commander');
   assert.equal(airDropped.length,2,'Air support drops 2 custom payload troops');
   assert.equal(airDropped.map(u=>u.type).join(','),airPayload.join(','),'Air dropped troops match custom payload');

   // Test 3: Eagle pickup with custom payload
   st.humans=st.humans.filter(u=>u.type==='commander');
   st.reinforcements=[];st.drops=[];st.pickups=[{type:'troops',x:200,y:200,object:63,payload:['commando','rider-scout']}];
   const collector=st.humans[0];
   collector.x=200;collector.y=200;
   f.pickup(collector,st.pickups[0]);
   assert.equal(st.reinforcements.length,1,'Eagle pickup triggers reinforcement');
   assert.equal(st.reinforcements[0].payload.join(','),'commando,rider-scout','Eagle pickup passes custom payload to reinforcement carrier');

   // Test 4: Default fallback when payload is omitted
   st.humans=st.humans.filter(u=>u.type==='commander');
   st.reinforcements=[];st.drops=[];
   assert(f.reinforce('troops'),'Default reinforce troops without payload');
   assert.equal(st.reinforcements[0].payload,null,'Omitted payload falls back to null');
   for(let i=0;i<500;i++){st.t+=.04;f.updateSupport(.04);}
   const defaultDropped=st.humans.filter(u=>u.type!=='commander');
   assert(defaultDropped.length>0&&defaultDropped.every(u=>u.type==='soldier'),'Omitted payload falls back to default soldier squad');

   console.log('Passed TRI-068 custom reinforcement eagle troop payload selection (ground carrier, air drop, eagle pickup and fallback squad rules).');
  }

  // TRI-064: Aggressive & reactive alien AI with acoustic awareness and pack coordination
  {
    api.loadMission(1);
    const f=sandbox.window.__fixture(), st=f.state;
    st.mode='playing';
    resumeSimulation();

    // 1. Acoustic Awareness: gunfire within 220px with clear LOS wakes bug up and turns it toward sound
    const soldier={x:200,y:200,team:'human',type:'soldier',alive:true,hp:1,weapon:0,cool:0,order:0};
    const bugUnaware={x:420,y:200,team:'alien',type:'soldier',alive:true,hp:4,angle:Math.PI,ai:{nextScan:100,boredUntil:100,target:null}};
    const bugFar={x:600,y:200,team:'alien',type:'soldier',alive:true,hp:4,angle:Math.PI,ai:{nextScan:100,boredUntil:100,target:null}};
    st.humans=[soldier];
    st.aliens=[bugUnaware,bugFar];
    st.props=[];st.doors=[];st.nests=[];st.bullets=[];

    // Fire weapon from soldier at (200, 200)
    f.fire(soldier);
    assert.equal(bugUnaware.ai.boredUntil,0,'Nearby bug within 220px wakes up (bored cleared) on weapon fire');
    assert.equal(bugFar.ai.boredUntil,100,'Bug beyond 220px radius is unaffected by weapon sound');

    // 2. Nest Damage Acoustic Event
    const nest={x:300,y:200,hp:50};
    const nestBug={x:450,y:200,team:'alien',type:'soldier',alive:true,hp:4,angle:0,ai:{nextScan:100,boredUntil:100,target:null}};
    st.nests=[nest];st.aliens=[nestBug];st.rocks=[];st.doors=[];st.props=[];
    nest.hp-=10;
    f.emitAcousticEvent(nest,280);
    assert.equal(nestBug.ai.boredUntil,0,'Bug within 220px wakes up when nearby nest takes damage');
    assert.equal(nestBug.intent?.mode,'approach','Bug investigates nest damage sound origin');

    // 3. TRI-070 retains bounded randomized breaks during combat focus
    const targetBug={x:250,y:200,team:'alien',type:'soldier',alive:true,hp:4,ai:{target:soldier}};
    st.humans=[soldier];st.aliens=[targetBug];
    for(let step=0;step<10;step++){
      st.t+=.1;
      f.bugIntent(targetBug,soldier,.1,1);
      assert(['approach','wander','pause'].includes(targetBug.intent?.mode),'Engaged bug uses legal bounded intent');
    }

    // 4. TRI-070 local pack alerts use 120px, sight and source cooldown
    const mainBug={x:300,y:200,team:'alien',type:'soldier',alive:true,hp:4};
    const packBugA={x:380,y:200,team:'alien',type:'soldier',alive:true,hp:4,ai:{target:null}};
    const packBugB={x:550,y:200,team:'alien',type:'soldier',alive:true,hp:4,ai:{target:null}};
    st.aliens=[mainBug,packBugA,packBugB];
    st.humans=[soldier];soldier.x=280;soldier.y=200;

    f.alertPack(mainBug,soldier);
    assert.equal(packBugA.ai.target,soldier,'Adjacent bug within 120px is alerted to swarm threat');
    assert.equal(packBugA.intent?.mode,'approach','Alerted pack bug enters approach mode toward threat');
    assert.equal(packBugB.ai.target,null,'Bug beyond 120px radius is not alerted');

    // Damaging main bug triggers pack alert
    packBugA.ai.target=null;st.t+=2.5;
    f.damage(mainBug,1,soldier.id);
    assert.equal(packBugA.ai.target,soldier,'Damaging bug alerts adjacent pack within 120px');

    console.log('Passed TRI-064/TRI-070 local acoustic awareness, randomized combat focus and throttled pack alerting.');
  }

  // TRI-065 High-fidelity pixel art sprite overlays for custom soldier types
  {
    api.loadMission(1);
    resumeSimulation();
    const rendering = sandbox.window.TriumphRendering;
    assert(rendering && typeof rendering.variantMark === 'function', 'TriumphRendering.variantMark exported');

    const specialistTypes = ['rider-scout', 'dune-guard', 'field-mechanic', 'snow-sniper'];

    for (const type of specialistTypes) {
      const colorsUsed = new Set();
      let drawn = false;
      let rotatedAngle = null;

      const mockCtx = {
        save() {},
        restore() {},
        translate(x, y) {},
        rotate(a) { rotatedAngle = a; },
        set fillStyle(val) { colorsUsed.add(val); },
        get fillStyle() { return ''; },
        fillRect(x, y, w, h) { drawn = true; }
      };

      const unit = { x: 250, y: 180, angle: Math.PI / 4, type };
      rendering.variantMark(mockCtx, unit);

      assert(drawn, `High-fidelity variantMark renders pixel art for ${type}`);
      assert.equal(rotatedAngle, Math.PI / 4, `Directional heading angle aligned for ${type}`);

      if (type === 'rider-scout') {
        assert(colorsUsed.has('#d8c896'), 'Desert Scout renders desert sand armor palette');
        assert(colorsUsed.has('#ffe066') || colorsUsed.has('#ffd700'), 'Desert Scout renders tracking visor');
      } else if (type === 'dune-guard') {
        assert(colorsUsed.has('#bf8057') || colorsUsed.has('#8c5230'), 'Dune Guard renders heavy desert blast armor');
        assert(colorsUsed.has('#3a2e26'), 'Dune Guard renders shotgun scabbard');
        assert(colorsUsed.has('#e69145'), 'Dune Guard renders hardened blast helmet visor');
      } else if (type === 'field-mechanic') {
        assert(colorsUsed.has('#75aaa0') || colorsUsed.has('#4a7870'), 'Field Mechanic renders sage teal engineer palette');
        assert(colorsUsed.has('#50e3a6') || colorsUsed.has('#88ffc4'), 'Field Mechanic renders repair scanner visor');
        assert(colorsUsed.has('#def2d5'), 'Field Mechanic renders toolkit harness');
      } else if (type === 'snow-sniper') {
        assert(colorsUsed.has('#f0f8ff'), 'Snow Sniper renders arctic snow ghillie cowl');
        assert(colorsUsed.has('#00e5ff'), 'Snow Sniper renders cyan optics scope');
      }
    }

    console.log('Passed TRI-065 high-fidelity pixel art sprite overlay rendering for custom soldier types across directional headings.');
  }


