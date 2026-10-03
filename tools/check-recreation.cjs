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
for(const file of ['assets/original-data.js','assets/original-rules.js','assets/audio/catalog.js','game.js']){
 let source=fs.readFileSync(''+file,'utf8');
 if(file==='game.js')source=source.replace(/\}\)\(\);\s*$/, 'window.__fixture=()=>({state:s,interact,update,fire,kill,blocked,grenade});})();');
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
console.log('Passed: recovered maps and actors, movement, directional orders, grenades, assistant ownership, pause/resume, combat simulation, controls, F2, restart, and all nine mission initialization/render paths. Browser rendering/audio playback unverified.');
