'use strict';
if(require.main===module)process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const baseline=execFileSync('git',['show','23c6cf9f6a427bc6a0c85b63e148a75ffe3df52f:game.js'],{encoding:'utf8',windowsHide:true});
let fixture=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
function replaceOnce(source,anchor,replacement){assert.equal(source.split(anchor).length-1,1,'Rendering harness anchor must occur exactly once: '+anchor);return source.replace(anchor,replacement);}
assert.throws(()=>replaceOnce('absent','anchor','x'),/exactly once/);assert.throws(()=>replaceOnce('anchoranchor','anchor','x'),/exactly once/);
fixture=replaceOnce(fixture,"let source=fs.readFileSync(''+file,'utf8');","let source=file==='game.js'&&baseline?baseline:fs.readFileSync(''+file,'utf8');");
fixture=replaceOnce(fixture,"const ctx=new Proxy({}, {get:(o,k)=>o[k]||noop,set:(o,k,v)=>(o[k]=v,true)});",`const commands=[];const encode=v=>v===canvas?'background-canvas':v instanceof Image?['image',v.src]:v;const ctx=new Proxy({}, {get:(o,k)=>Object.hasOwn(o,k)?o[k]:(...args)=>commands.push(['call',k,...args.map(encode)]),set:(o,k,v)=>(commands.push(['set',k,encode(v)]),o[k]=v,true)});`);
fixture=replaceOnce(fixture,'window.__fixture=()=>({state:s,','window.__fixture=()=>({draw,inputState,state:s,');
function load(old){return new Function('require','module','__dirname','baseline',fixture+'\nreturn {sandbox,handlers,elements,commands};')(require,{},__dirname,old?baseline:null);}
function capture(box,setup){const b=box.sandbox,f=b.window.__fixture();setup?.(f,box);box.commands.length=0;f.draw();return JSON.parse(JSON.stringify(box.commands));}
let total=0;
for(const mission of [1,3,7,'custom-rocks-relay','custom-desert-beneath-dunes']){
 const boxes=[load(true),load(false)];for(const box of boxes){const api=box.sandbox.window.triumph;typeof mission==='number'?api.loadMission(mission):api.loadCustomMission(mission);}
 for(const mode of ['briefing','tactical','playing','victory','defeat']){
  const results=boxes.map(box=>capture(box,(f,{elements:e})=>{f.state.t=2.35;if(mode==='tactical'){f.state.mode='playing';if(!box.sandbox.window.triumph.state().paused)e['#pause'].onclick();}else{f.state.mode=mode;if(mode==='playing'&&box.sandbox.window.triumph.state().paused)e['#pause'].onclick();}}));assert.deepEqual(results[1],results[0],mission+' '+mode);assert(results[0].some(c=>c[1]==='drawImage'),'Images drawn');assert(results[0].some(c=>c[1]==='fillText'),'HUD drawn');total++;
 }
 const results=boxes.map(box=>capture(box,f=>{const s=f.state;s.mode='playing';const u=s.humans.find(u=>u.type==='soldier')||s.humans[1];u.alive=true;u.type='commando';u.angle=Math.PI/4;u.shieldUntil=4;s.cannons=[{x:430,y:350,object:493,occupant:u}];u.cannon=0;f.inputState.selection.add(u);f.inputState.selection.add({alive:false});f.inputState.rallyPoints.push({x:400,y:400});f.inputState.rallyMode=true;f.inputState.moveMarker={x:600,y:400,until:5,focus:true};f.inputState.drag={start:{x:350,y:300},end:{x:500,y:450}};u.focusTarget=s.nests[0];s.effects.push({x:300,y:300,color:'#f00',size:20,t:.2});s.bullets.push({x:400,y:300,team:'human',plasma:true});s.drops.push({object:52,x:300,y:300,angle:0,frames:3,age:.5,duration:1});}));assert.deepEqual(results[1],results[0],mission+' mounted/selection/effects');total++;
}
// Targeted source sprite headings, animation fallback, hotspots and explicit frames.
const pair=[load(true),load(false)];
for(const box of pair){box.sandbox.window.triumph.loadMission(1);const f=box.sandbox.window.__fixture();f.state.humans=f.state.humans.filter(u=>u.type==='commander');f.state.aliens=[];f.state.vents=[];f.state.nests=[];f.state.flowers=[];f.state.props=[];f.state.pickups=[];f.state.cannons=[];f.state.reinforcements=[];f.state.drops=[];}
for(let heading=0;heading<32;heading++)for(const moving of [false,true]){const result=pair.map(box=>capture(box,f=>{f.state.t=1.75;for(const u of f.state.humans){u.angle=heading*Math.PI/16;u.movingUntil=moving?3:0;}}));assert.deepEqual(result[1],result[0],'Heading/animation '+heading+' '+moving);}
for(const frame of [0,1,7,19]){const result=pair.map(box=>capture(box,f=>{f.state.drops=[{object:52,x:321.4,y:432.8,angle:Math.PI/4,frames:20,age:frame,duration:20}];}));assert.deepEqual(result[1],result[0],'Explicit drop frame '+frame);}
const direct=pair[1].sandbox.window.TriumphRendering,commands=[];
const assets={objects:{9:{image:8,animations:{0:{0:{frames:[8,10],speed:20},8:{frames:[11],speed:20}}}}},images:{8:{hx:3,hy:7},10:{hx:4,hy:8},11:{hx:5,hy:9}}};
const context={drawImage:(img,...rect)=>commands.push([img.src,...rect])},image=src=>({src,complete:true,naturalWidth:1});
direct.sprite(context,assets,0,image,9,100.4,200.7,0,99,0);assert.deepEqual(commands.pop(),['assets/images/8.png',97,194],'Unknown animation falls back; hotspot subtraction precedes rounding');
direct.sprite(context,assets,1,image,9,100,200,-Math.PI/2,0,0);assert.deepEqual(commands.pop(),['assets/images/11.png',95,191],'Source direction selection');
direct.sprite(context,assets,1,image,9,100,200,0,0,3);assert.deepEqual(commands.pop(),['assets/images/10.png',96,192],'Explicit frame wraps');

assert(!fs.readFileSync('src/rendering.js','utf8').includes('document.'),'Renderer excludes DOM');
console.log('Passed '+total+' main, 64 heading/animation, 4 explicit-frame and 3 expected sprite cases: immutable full rendering-command comparisons, including context setters, transforms, image sources/hotspots, HUD/modal/tactical/custom extraction and mounted/selection/rally/effects ordering.');
