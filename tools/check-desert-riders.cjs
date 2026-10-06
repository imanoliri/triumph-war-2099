'use strict';
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),box={window:{},Math,Set};vm.createContext(box);
for(const p of ['navigation.js','src/desert-worm.js','src/desert-riders.js'])vm.runInContext(fs.readFileSync(p,'utf8'),box);
const r=box.window.TriumphDesertRiders,w=box.window.TriumphDesertWorm,free=()=>false;
const env=(more={})=>({blocked:free,aliens:[],humans:[],mines:[],visible:()=>true,route:(u,p)=>p,shoot:()=>{},...more});
const create=(type,x=300,y=300,blocked=free,route=[])=>r.create(type,x,y,blocked,route);
assert.equal(create('tank'),null);assert.equal(create('convoy-crawler',300,300,x=>x===316),null,'Crawler square footprint');
let c=create('convoy-crawler',300,300,free,[{x:400,y:300}]);r.step(c,1,env());assert.equal(c.x,330);assert.equal(c.hp,6);
const wall=x=>x>=348&&x<=349;c=create('convoy-crawler',300,300,free,[{x:500,y:300}]);r.step(c,20,env({blocked:wall}));assert.equal(c.x,300,'Large dt swept movement cannot tunnel');
// All cardinal lanes: warning triggers early, completes 32 px diagonal before charge, once per lock.
for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
 c=create('convoy-crawler');const worm=w.create(300-dx*100,300-dy*100,free),e=env({aliens:[worm],humans:[c]});
 w.step(worm,1,{humans:[c],blocked:free,damage:(h,n)=>h.hp-=n});assert.equal(worm.phase,'warning');
 for(let i=0;i<12;i++){r.step(c,.04,e);w.step(worm,.04,{humans:[c],blocked:free,damage:(h,n)=>h.hp-=n});}
 assert.equal(Math.abs(c.x-300),32);assert.equal(Math.abs(c.y-300),32);assert.equal(e.mines.length,1);assert.equal(c.mineAmmo,3);
 for(let i=0;i<90;i++){r.step(c,.04,e);w.step(worm,.04,{humans:[c],blocked:free,damage:(h,n)=>h.hp-=n});}
 assert.equal(c.hp,6,'Early warning evade avoids charge');assert.equal(e.mines.length,1,'Same telegraph never loops immunity/mines');
}
// Trapped counter cannot pass walls and supplies no shield.
c=create('convoy-crawler');let worm=w.create(200,300,free);w.step(worm,1,{humans:[c],blocked:free,damage:(h,n)=>h.hp-=n});
const prison=(x,y)=>x<280||x>320||y<280||y>320;const e=env({blocked:prison,aliens:[worm],humans:[c]});r.step(c,.04,e);assert.equal(c.evade,undefined);assert.equal(e.mines.length,0);
w.step(worm,1.2,{humans:[c],blocked:free,damage:(h,n)=>h.hp-=n});w.step(worm,.5,{humans:[c],blocked:free,damage:(h,n)=>h.hp-=n});assert.equal(c.hp,4,'Failed evade remains vulnerable');
// Finite ammunition and valid departure placement.
c=create('convoy-crawler');const mines=[];for(let i=0;i<7;i++){c.evadeCool=0;c.x=300+i*80;c.y=300;worm={type:'desert-worm',alive:true,hp:16,phase:'warning',telegraph:{x:c.x-90,y:300,dx:1,dy:0,width:24,range:260}};r.step(c,1,env({aliens:[worm],mines}));}assert.equal(mines.length,4);assert.equal(c.mineAmmo,0);
let scout=create('rider-scout'),bug={x:330,y:300,type:'soldier',alive:true,hp:4,team:'alien'};r.step(scout,.5,env({aliens:[bug]}));assert.equal(scout.x,262);r.step(scout,.1,env({aliens:[bug]}));assert.equal(scout.x,262,'Scout cooldown');
scout=create('rider-scout');r.step(scout,.5,env({aliens:[bug],visible:()=>false}));assert.equal(scout.x,300,'Hidden bug never triggers dodge');
scout=create('rider-scout');r.step(scout,.5,env({aliens:[bug],blocked:prison}));assert.equal(scout.x,300,'No safe terrain dodge remains vulnerable');
scout=create('rider-scout');worm=w.create(250,300,free);w.step(worm,1,{humans:[scout],blocked:free,damage:(h,n)=>h.hp-=n});r.step(scout,.5,env({aliens:[worm]}));assert.equal(scout.x,300);assert.equal(scout.y,338,'Scout sidesteps nearby exposed worm locked lane');w.step(worm,1.2,{humans:[scout],blocked:free,damage:(h,n)=>h.hp-=n});w.step(worm,.4,{humans:[scout],blocked:free,damage:(h,n)=>h.hp-=n});assert.equal(scout.hp,1);
let shots=r.pellets(create('dune-guard'),{x:380,y:300});assert.equal(shots.length,5);assert(shots.every(p=>p.team==='human'&&p.damage===1&&p.life*p.speed===120));assert(Math.abs(Math.atan2(shots[4].dy,shots[4].dx)-Math.atan2(shots[0].dy,shots[0].dx)-Math.PI/6)<1e-9);
assert.equal(r.footprint(free,17),r.footprint(free,17),'Stable collision policy reuses navigation cache');assert.notEqual(r.footprint(free,8),r.footprint(free,17));
const mech=create('field-mechanic'),tank={...create('convoy-crawler',330,300),type:'tank',hp:7.8,maxHP:8},dead={...tank,hp:0,alive:false};r.step(mech,2,env({humans:[tank,dead]}));assert.equal(tank.hp,8);assert.equal(dead.hp,0);const robot={...tank,type:'robot',hp:6.8};delete robot.maxHP;r.step(mech,2,env({humans:[robot]}));assert.equal(robot.hp,7,'Runtime ground bot cap');tank.hp=7;r.step(mech,1,env({humans:[tank],visible:()=>false}));assert.equal(tank.hp,7);tank.x=400;r.step(mech,1,env({humans:[tank]}));assert.equal(tank.hp,7,'Repair distance');
const mine={x:300,y:300,age:0,owner:0},under={...bug,x:300,type:'desert-worm',phase:'burrow',hp:16},friend={...bug,x:300,team:'human'},hidden={...bug,x:305,hp:4};bug={...bug,x:315,hp:8};let stock=[mine];const mineEnv={aliens:[under,friend,bug,hidden],blocked:free,visible:(m,a)=>a!==hidden,damage:(a,n)=>a.hp-=n,burst:()=>{}};r.updateMines(stock,.5,mineEnv);assert.equal(bug.hp,8);r.updateMines(stock,.2,mineEnv);assert.equal(bug.hp,4);assert.equal(under.hp,16);assert.equal(friend.hp,4);assert.equal(hidden.hp,4);assert.equal(stock.length,0);
stock=[{...mine,age:0}];r.updateMines(stock,31,mineEnv);assert.equal(stock.length,0,'Finite mine lifetime');
// Actual navigation detour with full body rather than center-only route.
const rock=(x,y)=>x<0||x>1023||y<36||y>767||(x>=350&&x<=390&&y>=180&&y<=450);
c=create('convoy-crawler',290,300,rock,[{x:450,y:300}]);const nav=box.window.TriumphNavigation;
for(let i=0;i<900;i++){r.step(c,.04,env({blocked:rock,route:(u,p,b)=>nav.step(u,p,b,'rock')}));assert(r.clear(c.x,c.y,17,rock));}assert.equal(c.routeIndex,1,'Crawler completes navigable route around terrain');
for(const type of ['rider-scout','dune-guard','field-mechanic','convoy-crawler']){const calls=[],ctx=new Proxy({}, {get:(o,k)=>(...a)=>calls.push([k,...a]),set:()=>true});r.draw(ctx,create(type));assert.equal(calls[0][0],'save');assert.equal(calls.at(-1)[0],'restore');assert(calls.some(c=>c[0]==='fillRect'));}
console.log('Passed Desert Rider timing, eight-direction five-pellet weapon, repair caps/range/LOS, warning evade, vulnerability, full-body sweep/navigation and finite enemy-only exposed mines.');
