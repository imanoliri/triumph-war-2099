'use strict';
if(require.main===module)process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const baseline=execFileSync('git',['show','6a39b420da2b30c9a2f0550b2c95c2e2d93ce2ea:game.js'],{encoding:'utf8',windowsHide:true});
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
function load(old=false){return new Function('require','module','__dirname','baseline',injectedFixture+'\nreturn sandbox;')(require,{},__dirname,old?baseline:null);}
const before=load(true),after=load(),plain=v=>{const seen=new Map();return JSON.parse(JSON.stringify(v,(key,value)=>{if(value&&typeof value==='object'){if(seen.has(value))return {$ref:seen.get(value)};seen.set(value,seen.size);}return value;}));};
function trace(box,type,seed,weapon=0,cannon=false){
 box.window.triumph.loadMission(1);const f=box.window.__fixture(),s=f.state;s.mask=null;s.rocks=[];s.doors=[];s.props=[];s.nests=[];s.bullets=[];f.setSeed(seed);
 const u={x:300,y:300,team:'human',type,id:1,alive:true,hp:8,cool:0,weapon,order:3,angle:0};if(cannon)u.cannon=0;
 const a={x:410,y:300,team:'alien',type:'soldier',alive:true,hp:999},b={...a,x:440,y:315};s.aliens=[a,b];s.humans=[u];const out=[];
 for(let i=0;i<450;i++){s.t=i*.04;u.cool=Math.max(0,u.cool-.04);if(i===70)u.focusTarget=b;if(i===120)a.alive=false;if(i===170){a.alive=true;b.x=415;b.y=300;}if(i===260)f.trackBurst(u,null);f.aimHuman(u,i>=70&&i<170?b:a,0);out.push(plain({t:s.t,u,bullets:s.bullets}));}
 assert(s.bullets.length>0,'Sequence fires '+type);return {out,nextDelay:f.enemyFireDelay({type:'redbug'})};
}
for(const seed of [1,123,98213])for(const [type,weapon,cannon] of [['soldier',0,false],['commando',1,false],['robot',2,false],['tank',0,false],['soldier',2,true],['commando',2,true],['commander',0,false],['rider-scout',0,false],['field-mechanic',0,false],['dune-guard',0,false]])assert.deepEqual(trace(after,type,seed,weapon,cannon),trace(before,type,seed,weapon,cannon),'Seeded aiming/burst/shot/RNG '+type+' '+seed+' '+cannon);
function simulation(box,mission,seed){const api=box.window.triumph;typeof mission==='number'?api.loadMission(mission):api.loadCustomMission(mission);const f=box.window.__fixture(),s=f.state;f.setSeed(seed);s.mode='playing';if(api.state().paused)box.document.querySelector('#pause').onclick();for(let i=0;i<500;i++)f.update(.04);return plain(s);}
for(const mission of [1,3,'custom-desert-beneath-dunes'])for(const seed of [77,812])assert.deepEqual(simulation(after,mission,seed),simulation(before,mission,seed),'20s real runtime projectile/damage/state integration '+mission+' '+seed);
// Direct and free aiming retain the source asymmetry, even without a target/burst.
for(const box of [before,after]){box.window.triumph.loadMission(1);const f=box.window.__fixture();for(const [type,team,free] of [['commander','human',true],['commander','human',false],['commando','human',true],['soldier','alien',false]]){const u={type,team,id:1,x:300,y:300,angle:.6,weapon:0,cool:0,shotOffset:.15};f.fire(u,free);assert.equal(u.angle,type==='commando'?Math.PI/4:team==='human'&&!free?0:.6);}}
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
console.log('Passed immutable pre-extraction comparison: 30 seeded 18s burst/sweep/shot traces, RNG continuation, six 20s real mission simulations and independent asymmetric headings.');
