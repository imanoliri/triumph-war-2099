'use strict';
if(require.main===module)process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict');
const fixture=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
const {sandbox:b,elements:e}=new Function('require','module','__dirname',fixture+'\nreturn {sandbox,elements};')(require,{},__dirname);
const types=['rider-scout','dune-guard','field-mechanic','snow-sniper','winter-gunner','shield-trooper','laser-cannon','suppressor','grenadier','corner-ambusher','recon','heavy-riveter','arc-technician','weapon-specialist','bounty-hunter','demolition-trooper','cooling-trooper','incendiary-trooper','recovery-trooper','tracker','chemical-trooper','mobile-skirmisher','platform-defender','heavy-trooper','drone-operator'];
const runtimeTypes=fs.readFileSync('game.js','utf8').match(/const infantryType=u=>\[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(t=>t.slice(1,-1)).filter(t=>!['soldier','commando'].includes(t));
assert.deepEqual(runtimeTypes.sort(),[...types].sort(),'Every implemented custom infantry type has a guide portrait');
const portraitTypes=[...types,'combat-drone'];
const portraits=new Map();
for(const type of portraitTypes){const calls=[],ctx=new Proxy({}, {get:(o,k)=>Object.hasOwn(o,k)?o[k]:(...args)=>calls.push([k,...args.map(v=>v?.src||v)]),set:(o,k,v)=>(calls.push(['set',k,v]),o[k]=v,true)});e['#unit-portrait-'+type]={getContext:()=>ctx};portraits.set(type,{calls,ctx});}
for(const mission of [1,'custom-desert-beneath-dunes','custom-snow-whiteout-signal']){
 typeof mission==='number'?b.window.triumph.loadMission(mission):b.window.triumph.loadCustomMission(mission);
 e['#units'].onclick();const html=e['#unit-cards'].innerHTML;if(mission==='custom-snow-whiteout-signal')assert(e['#units-context'].textContent.includes('Custom normal: 9 starting infantry'),'Snow context counts ordinary infantry plus snipers and gunners');
 for(const type of portraitTypes){assert(html.includes(`id="unit-portrait-${type}"`),type+' guide entry');assert(portraits.get(type).calls.some(c=>c[0]==='drawImage'),type+' recovered sprite drawn');}
 for(const name of ['Commander','Infantry','Commando','Tank','Egg / nest','Red Krate bug'])assert(html.includes(name),'Original guide entry retained: '+name);
 e['#units-close'].onclick();
}
// The portrait must be exactly the current runtime source frame plus its mark,
// including hotspot subtraction and unscaled sprite pixels.
for(const type of portraitTypes){const {calls,ctx}=portraits.get(type),render=b.window.TriumphRendering;calls.length=0;const load=src=>({src,complete:true,naturalWidth:1});render.guideSoldier(ctx,b.window.ORIGINAL,load,type);const portrait=JSON.stringify(calls);calls.length=0;ctx.clearRect(0,0,48,48);ctx.imageSmoothingEnabled=false;render.sprite(ctx,b.window.ORIGINAL,0,load,52,24,24,0,0,0);render.variantMark(ctx,{type,x:24,y:24,angle:0});assert.equal(JSON.stringify(calls),portrait,type+' matches runtime');}
assert.equal(new Set(portraitTypes.map(t=>JSON.stringify(portraits.get(t).calls))).size,portraitTypes.length,'Distinct existing marks');
// A cold image cache must repaint the source frame after load, not leave only marks.
const deferred=fixture.replace('class Image {constructor(){this.complete=true;this.naturalWidth=20;}}','class Image {static all=[];constructor(){this.complete=false;this.naturalWidth=0;this.listeners=[];Image.all.push(this);}addEventListener(name,callback){assert.equal(name,"load");this.listeners.push(callback);}}');
const cold=new Function('require','module','__dirname',deferred+'\nreturn {sandbox,elements,images:Image.all};')(require,{},__dirname);
let sourceDraws=0;for(const type of portraitTypes)cold.elements['#unit-portrait-'+type]={getContext:()=>new Proxy({}, {get:(o,k)=>k==='drawImage'?()=>sourceDraws++:()=>{},set:()=>true})};
cold.elements['#units'].onclick();assert.equal(sourceDraws,0);const image=cold.images.find(i=>i.listeners.length===portraitTypes.length);assert(image,'Every cold portrait waits for its source image');image.complete=true;image.naturalWidth=20;for(const callback of image.listeners)callback();assert.equal(sourceDraws,portraitTypes.length,'All portraits repaint after image load');
console.log('Passed custom soldier guide entries, preserved original entries, recovered sprite drawing and exact runtime sprite/mark command parity across original/Dunes/Snow missions.');
