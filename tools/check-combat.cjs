'use strict';
if(require.main===module)process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const baseline=execFileSync('git',['show','326b9491c5d30792aebdeedbd568dcda35e9ec13:game.js'],{encoding:'utf8',windowsHide:true});
const fixture=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
const loaderAnchor="let source=fs.readFileSync(''+file,'utf8');",baselineLoader="let source=file==='game.js'&&baseline?baseline:fs.readFileSync(''+file,'utf8');";
function baselineFixture(source){
 assert.equal(source.split(loaderAnchor).length-1,1,'Combat fixture source loader anchor must exist exactly once; baseline injection cannot fall back to the current runtime');
 const injected=source.replace(loaderAnchor,baselineLoader);
 assert(!injected.includes(loaderAnchor)&&injected.split(baselineLoader).length-1===1&&injected!==source,'Combat immutable baseline loader substitution must be applied exactly once');
 return injected;
}
assert.throws(()=>baselineFixture(fixture.replace(loaderAnchor,'')),/anchor must exist exactly once/);
assert.throws(()=>baselineFixture(fixture+'\n'+loaderAnchor),/anchor must exist exactly once/);
const injectedFixture=baselineFixture(fixture);
function load(old=false,weaponOnly=false){
 // TRI-070 intentionally changes acoustic AI/RNG. Compare the immutable weapon contract with
 // that named service disabled on both sides; real-runtime simulations retain the service.
 const hook='emitAcousticEvent:(origin,r)=>emitAcousticEvent(origin,r)';
 const code=injectedFixture.replace(baselineLoader,baselineLoader+" if(file==='game.js'&&weaponOnly){if(!source.includes(hook))throw Error('Missing combat acoustic service');source=source.replace(hook,'emitAcousticEvent:()=>{}');}");
 return new Function('require','module','__dirname','baseline','weaponOnly','hook',code+'\nreturn sandbox;')(require,{},__dirname,old?baseline:null,weaponOnly,hook);
}
const before=load(true,true),after=load(false,true),runtime=load(),plain=v=>{const seen=new Map();return JSON.parse(JSON.stringify(v,(key,value)=>{if(value&&typeof value==='object'){if(seen.has(value))return {$ref:seen.get(value)};seen.set(value,seen.size);}return value;}));};
function trace(box,type,seed,weapon=0,cannon=false){
 box.window.triumph.loadMission(1);const f=box.window.__fixture(),s=f.state;s.mask=null;s.rocks=[];s.doors=[];s.props=[];s.nests=[];s.bullets=[];f.setSeed(seed);
 const u={x:300,y:300,team:'human',type,id:1,alive:true,hp:8,cool:0,weapon,order:3,angle:0};if(cannon)u.cannon=0;
 const a={x:410,y:300,team:'alien',type:'soldier',alive:true,hp:999},b={...a,x:440,y:315};s.aliens=[a,b];s.humans=[u];const out=[];
 for(let i=0;i<450;i++){s.t=i*.04;u.cool=Math.max(0,u.cool-.04);if(i===70)u.focusTarget=b;if(i===120)a.alive=false;if(i===170){a.alive=true;b.x=415;b.y=300;}if(i===260)f.trackBurst(u,null);f.aimHuman(u,i>=70&&i<170?b:a,0);out.push(plain({t:s.t,u,bullets:s.bullets}));}
 assert(s.bullets.length>0,'Sequence fires '+type);return {out,nextDelay:f.enemyFireDelay({type:'redbug'})};
}
for(const seed of [1,123,98213])for(const [type,weapon,cannon] of [['soldier',0,false],['commando',1,false],['robot',2,false],['tank',0,false],['soldier',2,true],['commando',2,true],['commander',0,false],['rider-scout',0,false],['field-mechanic',0,false],['dune-guard',0,false]])assert.deepEqual(trace(after,type,seed,weapon,cannon),trace(before,type,seed,weapon,cannon),'Seeded aiming/burst/shot/RNG '+type+' '+seed+' '+cannon);
function simulation(box,mission,seed){const api=box.window.triumph;typeof mission==='number'?api.loadMission(mission):api.loadCustomMission(mission);const f=box.window.__fixture(),s=f.state;f.setSeed(seed);s.mode='playing';if(api.state().paused)box.document.querySelector('#pause').onclick();for(let i=0;i<500;i++)f.update(.04);return plain(s);}
// TRI-061: 8-direction targeting applies to all soldiers in real runtime simulation.
for(const mission of [1,3])for(const seed of [77,812]){ const s=simulation(runtime,mission,seed); assert(s&&s.humans.length>0,'20s real runtime simulation '+mission+' '+seed); }
// TRI-061: all human infantry soldier unit types gain eight legal firing/render headings.
for(const type of ['soldier','commander','robot','commando','rider-scout','dune-guard','field-mechanic'])for(let i=0;i<8;i++){
 after.window.triumph.loadMission(1);const f=after.window.__fixture(),s=f.state,a=i*Math.PI/4;
 s.mask=null;s.rocks=[];s.doors=[];s.props=[];s.nests=[];s.bullets=[];
 const u={type,team:'human',id:1,x:300,y:300,hp:1,alive:true,angle:0,weapon:0,cool:0,order:3};
 const t={type:'soldier',team:'alien',x:300+Math.cos(a)*90,y:300+Math.sin(a)*90,hp:10,alive:true};
 s.humans=[u];s.aliens=[t];f.aimHuman(u,t,0);
 if(u.burst&&!s.bullets.length){s.t=u.burst.readyAt;u.cool=0;f.aimHuman(u,t,0);}
 assert(Math.abs(u.angle-a)<1e-9||Math.abs(u.angle-a+Math.PI*2)<1e-9);
 assert.equal(s.bullets.length,type==='dune-guard'?5:1);const center=s.bullets[type==='dune-guard'?2:0];
 assert(Math.abs(center.dx-Math.cos(a))<1e-9&&Math.abs(center.dy-Math.sin(a))<1e-9);
 assert(s.bullets.every(b=>b.damage===1&&b.speed===290&&b.owner===1&&b.team==='human'));
 if(type==='dune-guard'){assert(s.bullets.every(b=>b.life*b.speed===120));const first=s.bullets[0],last=s.bullets[4];assert(Math.abs(Math.acos(first.dx*last.dx+first.dy*last.dy)-Math.PI/6)<1e-9);}
 else assert.equal(center.life,2.2);
 s.bullets=[];u.cool=0;t.x=u.x+80;t.y=u.y+25;f.aimHuman(u,t,0);assert.equal(s.bullets.length,0,'Defend waits off lane');
 t.x=u.x+Math.cos(a)*90;t.y=u.y+Math.sin(a)*90;s.props=[{left:300+Math.cos(a)*40-5,top:300+Math.sin(a)*40-5,w:10,h:10,hp:2}];f.aimHuman(u,t,0);assert.equal(s.bullets.length,0,'Actual firing lane blocked');
 s.props=[];const range=type==='dune-guard'?140:['rider-scout','field-mechanic'].includes(type)?200:700;t.x=u.x+Math.cos(a)*range;t.y=u.y+Math.sin(a)*range;f.aimHuman(u,t,0);assert.equal(s.bullets.length,0,'Kit range gate preserved');
 u.cool=.1;f.fire(u);assert.equal(s.bullets.length,0,'Cooldown suppresses another shot');
 u.cool=0;u.angle=a+.1;f.fire(u,false);assert(Math.abs(s.bullets[type==='dune-guard'?2:0].dx-Math.cos(a))<1e-9,'Direct fire quantizes heading');
}
console.log('Passed TRI-061 all eight soldier headings, matching rendered rotation, five-pellet spread, numerical kit contracts and off-lane/blocked holds.');
// Direct and free aiming retain the source asymmetry, even without a target/burst.
for(const box of [before,after]){box.window.triumph.loadMission(1);const f=box.window.__fixture();for(const [type,team,free] of [['commander','human',true],['commander','human',false],['commando','human',true],['soldier','alien',false]]){const u={type,team,id:1,x:300,y:300,angle:.6,weapon:0,cool:0,shotOffset:.15};f.fire(u,free);const expected=!free&&team==='human'&&type!=='tank'?Math.PI/4:.6;assert.equal(u.angle,expected);}}
// Isolated projectile contracts do not use the runtime or a copy of its implementation.
const projectileBox={window:{}};require('node:vm').runInNewContext(fs.readFileSync('src/projectiles.js','utf8'),projectileBox);
function probe(){const s={t:1,bullets:[],props:[],doors:[],reinforcements:[],humans:[],aliens:[],nests:[],score:[0],effects:[]},calls=[];const services={W:1024,H:768,blocked:()=>false,dist:(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),damage:(u,n,owner)=>{u.hp-=n;calls.push(['damage',n,owner]);},destroyProp:p=>{p.destroyed=true;calls.push(['prop']);},wormExposed:u=>u.exposed,sound:(...args)=>calls.push(['sound',...args]),tone:(...args)=>calls.push(['tone',...args]),burst:(...args)=>s.effects.push(args)};const bullet=(extra={})=>({x:100,y:100,dx:1,dy:0,speed:100,life:1,team:'human',damage:2,owner:1,...extra});return {s,calls,services,bullet,step:dt=>projectileBox.window.TriumphProjectiles.step(s,dt,services)};}
{
 const p=probe(),target={x:110,y:100,alive:true,hp:5};p.s.aliens=[target];p.s.props=[{left:109,top:99,w:4,h:4,hp:2}];p.s.bullets=[p.bullet()];p.step(.1);assert.equal(target.hp,5);assert(p.s.props[0].destroyed);assert.equal(p.s.bullets.length,0,'Prop intercepts before alien');
}
{
 const p=probe();p.s.nests=[{x:110,y:100,hp:2}];p.s.bullets=[p.bullet({plasma:true})];p.step(.1);assert.equal(p.s.score[0],100);assert.equal(p.s.bullets.length,6);assert(p.s.bullets.every(b=>b.x===110&&b.y===100&&b.life===.2&&b.owner===1&&b.spark&&b.damage===1));p.s.nests=[];p.step(.21);assert.equal(p.s.bullets.length,0,'New sparks move only next tick and expire without recursively spawning');
}
for(const exposed of [false,true]){
 const p=probe(),worm={x:110,y:100,alive:true,hp:16,type:'desert-worm',exposed};p.s.aliens=[worm];p.s.bullets=[p.bullet()];p.step(.1);assert.equal(worm.hp,exposed?14:16);assert.equal(p.s.bullets.length,exposed?0:1);if(exposed)assert.deepEqual(p.calls,[['damage',2,1]],'Owner preserved into damage callback');
}
for(const blocker of ['shield','carrier','door','crystal']){
 const p=probe();p.s.bullets=[p.bullet({team:'alien'})];const human={x:110,y:100,alive:true,hp:5};p.s.humans=[human];if(blocker==='shield')human.shieldUntil=2;if(blocker==='carrier')p.s.reinforcements=[{kind:'carrier',x:110,y:100}];if(blocker==='door')p.s.doors=[{x:109,y:99,w:4,h:4,cx:111,cy:101,damage:0,durability:1}];if(blocker==='crystal'){p.s.humans=[];p.s.crystal={x:110,y:100,hp:7};}p.step(.1);assert.equal(human.hp,5);assert.equal(p.s.bullets.length,0);if(blocker==='door')assert(p.s.doors[0].destroyed&&p.s.doors[0].open);if(blocker==='crystal')assert.equal(p.s.crystal.hp,5);
}
console.log('Passed isolated collision priority, nest credit, plasma deferral/expiry, exposed worm, owner, shield/carrier, destructible door and crystal contracts.');
console.log('Passed immutable pre-extraction comparison: 30 seeded 18s burst/sweep/shot traces, RNG continuation, four 20s real mission simulations and independent asymmetric headings.');
