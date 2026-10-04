'use strict';
if(require.main===module)process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={window:{}};vm.runInNewContext(fs.readFileSync('src/breeding.js','utf8'),context);
const api=context.window.TriumphBreeding;
function setup(value=0){const nest={hp:50,breeding:api.create(123)},births=[];let free=true;return {nest,births,cap:v=>free=v,step:dt=>api.advance(nest,dt,{capacity:()=>free,spawn:()=>births.push(nest.breeding.clock),randomRoll:()=>value})};}
for(const value of [-1,0,1,2,3,4,99]){const f=setup(value);f.step(.499);assert.equal(f.nest.breeding.busy,null);f.step(.001);assert.equal(!!f.nest.breeding.busy,value>=0&&value<=3);}
let f=setup();f.step(.5);f.step(1.799);assert.equal(f.births.length,0);f.step(.001);assert.equal(f.births.length,1);assert.equal(f.births[0],2.3);assert.equal(api.frame(f.nest),9);f.step(.599);assert.equal(f.births.length,1);f.step(.001);assert.equal(f.nest.breeding.busy,null);assert(f.nest.breeding.busySkipped>0);f.step(.1);assert(f.nest.breeding.busy);assert.equal(f.births.length,1);
f=setup();f.cap(false);f.step(.5);assert.equal(f.nest.breeding.busy,null);f.cap(true);f.step(.5);assert(f.nest.breeding.busy);f.cap(false);f.step(1.8);assert.equal(f.births.length,0);f.cap(true);f.step(.6);assert.equal(f.births.length,0,'A capped frame is consumed, not deferred');
f=setup();f.step(.5);f.nest.hp=0;f.step(5);assert.equal(f.births.length,0);assert.equal(f.nest.breeding.busy,null);
const seed=api.create(87654321),same=api.create(87654321);let successes=0;for(let i=0;i<100000;i++){const roll=api.roll(seed);assert.equal(roll,api.roll(same));if(roll<=3)successes++;}assert(Math.abs(successes/100000-.04)<=.003);
// Realized throughput includes busy/cap effects; it is not the raw success rate.
const reports=[];for(const capped of [false,true]){const nest={hp:50,breeding:api.create(7654321)};let count=0;for(let tick=0;tick<90000;tick++)api.advance(nest,.02,{capacity:()=>!capped,spawn:()=>count++});reports.push({seconds:1800,capped,...nest.breeding,busy:!!nest.breeding.busy,emitted:count});}
assert(reports[0].births<reports[0].successes);assert.equal(reports[1].births,0);console.log('Breeding diagnostic:',JSON.stringify({independentRolls:100000,successes,successPercent:successes/1000,controlled:reports}));
console.log('Passed breeding boundaries, finite busy/frame lifecycle, destruction, cap trigger/emission and deterministic RNG. No native/live pressure claim.');
