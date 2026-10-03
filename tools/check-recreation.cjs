const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const handlers={},elements={},noop=()=>{};
const ctx=new Proxy({}, {get:(o,k)=>o[k]||noop,set:(o,k,v)=>(o[k]=v,true)});
const canvas={getContext:()=>ctx,focus:noop};
for(const id of ['#start','#pause','#reset','#options','#close'])elements[id]={};
elements['#game']=canvas;elements['#bots']={checked:true};elements['#difficulty']={value:'normal'};
elements['#controls']={open:false,showModal(){this.open=true},close(){this.open=false}};
elements['#mission']={value:'0'};
class Image {constructor(){this.complete=true;this.naturalWidth=20;}}
class Audio {cloneNode(){return this}play(){return Promise.resolve()}}
const sandbox={console,Math,JSON,Set,Map,Image,Audio,Uint8Array,atob:s=>Buffer.from(s,'base64').toString('latin1'),document:{querySelector:id=>elements[id],createElement:()=>canvas},window:{addEventListener:(name,cb)=>handlers[name]=cb},requestAnimationFrame:cb=>sandbox.nextFrame=cb};
vm.createContext(sandbox);
for(const file of ['assets/original-data.js','assets/audio/catalog.js','game.js'])vm.runInContext(fs.readFileSync(''+file,'utf8'),sandbox);
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
console.log('Passed: recovered maps and actors, movement, directional orders, grenades, assistant ownership, pause/resume, combat simulation, controls, F2, restart, and all nine mission initialization/render paths. Browser rendering/audio playback unverified.');
