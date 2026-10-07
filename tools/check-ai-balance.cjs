'use strict';
if(require.main===module)process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const baseline='f5b627f5c569c122b226ae5e4504b92bb607715b';
const files=['game.js','src/combat.js','src/orders.js','src/balance.js'];
const sources=Object.fromEntries(files.map(p=>[p,execFileSync('git',['show',`${baseline}:${p}`],{encoding:'utf8',windowsHide:true})]));
const fixture=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0];
const anchor="let source=fs.readFileSync(''+file,'utf8');";
assert.equal(fixture.split(anchor).length,2,'Exactly one immutable loader injection');
function load(old){const code=fixture.replace(anchor,"let source=old&&sources[file]!==undefined?sources[file]:fs.readFileSync(''+file,'utf8');");return new Function('require','module','__dirname','old','sources',code+'\nreturn sandbox;')(require,{},__dirname,old,sources);}
function setup(old,seed=77){const box=load(old);box.window.triumph.loadMission(1);const f=box.window.__fixture(),s=f.state;s.mode='playing';if(box.window.triumph.state().paused)box.document.querySelector('#pause').onclick();Object.assign(s,{t:1,mask:null,rocks:[],props:[],doors:[],nests:[],cannons:[],pickups:[],bullets:[],flowers:[],vents:[],aliens:[],humans:[]});f.setSeed(seed);return {box,f,s};}
const human=(x=260,y=200)=>({id:1,x,y,team:'human',type:'soldier',hp:1,alive:true,weapon:0,cool:0,angle:0,order:2});
const bug=(x,y=200)=>({x,y,team:'alien',type:'soldier',hp:10,alive:true,angle:0,cool:0,ai:{target:null,nextScan:100}});
function alerts(old){const {f,s}=setup(old),h=human(),a=bug(300),b=bug(380),c=bug(460),d=bug(540);s.humans=[h];s.aliens=[a,b,c,d];f.alertPack(a,h);const first=s.aliens.filter(u=>u.ai.target===h).length;const until=b.ai.focusUntil;for(let i=0;i<80;i++){s.t+=.1;for(const u of s.aliens)if(u.ai.target===h)f.alertPack(u,h);f.alertPack(a,h);}return {first,total:s.aliens.filter(u=>u.ai.target===h).length,extended:b.ai.focusUntil>until};}
assert.deepEqual(alerts(false),{first:1,total:1,extended:false});assert(alerts(true).total>1);
function reacquiredAlarm(old){const {f,s}=setup(old),h=human(),a=bug(300),b=bug(380),c=bug(460);s.humans=[h];s.aliens=[a,b,c];let remoteWakeups=0;for(let i=0;i<30;i++){s.t+=.1;f.perceive(c,[h],175);for(const u of [a,b])f.alertPack(u,h);if(c.ai.target===h)remoteWakeups++;}return remoteWakeups;}
assert.equal(reacquiredAlarm(false),0,'Out-of-sight recipient cannot be repeatedly awakened by relay');assert(reacquiredAlarm(true)>0);
{
 const {f,s}=setup(false),h=human(380),a=bug(330),b=bug(420),c=bug(510);s.humans=[h];s.aliens=[a,b,c];f.alertPack(a,h);f.alertPack(b,h);assert.equal(c.ai.target,null,'Recruit cannot relay');f.damage(b,1,h.id);assert.equal(c.ai.target,h,'Direct damage independently confirms a threat and permits local response');
}
{
 const {f,s}=setup(false),h=human(),a=bug(300),b=bug(380);s.aliens=[a,b];s.rocks=[{x:335,y:150,w:15,h:100}];f.alertPack(a,h);assert.equal(b.ai.target,null,'Wall blocks pack recruitment');s.rocks=[];f.alertPack(a,h);assert.equal(b.ai.target,null,'Source cooldown holds');s.t+=2.5;f.alertPack(a,h);assert.equal(b.ai.target,h,'Local alert returns after cooldown');
}
function sound(old){const {f,s}=setup(old),h=human(200),near=bug(400),far=bug(450);near.ai.boredUntil=100;far.ai.boredUntil=100;s.humans=[h];s.aliens=[near,far];f.emitAcousticEvent(h);const until=near.intent.until;s.t+=.1;f.emitAcousticEvent(h);return {near:near.ai.boredUntil,far:far.ai.boredUntil,extended:near.intent.until>until,memory:until-1};}
assert.equal(sound(false).far,100);assert.equal(sound(true).far,0);assert.equal(sound(false).extended,false);assert(sound(false).memory<sound(true).memory);
function pursuit(old,seed){const {f,s}=setup(old,seed),h=human(500),a=bug(250);a.ai.target=h;s.humans=[h];s.aliens=[a];const modes={approach:0,wander:0,pause:0};for(let i=0;i<100;i++){a.intent=null;s.t+=3;f.bugIntent(a,h,.01,1);modes[a.intent.mode]++;}return modes;}
for(const seed of [1,77,812]){const a=pursuit(false,seed),b=pursuit(true,seed);assert.equal(b.approach,100);assert(a.approach>=45&&a.approach<=80);assert(a.pause>0&&a.wander>0);}
function acquire(old){const {f,s}=setup(old),u=human(200),t=bug(310);s.humans=[u];s.aliens=[t];for(let i=0;i<100;i++){const found=f.perceive(u,[t],245);if(found)return +(s.t-1).toFixed(2);s.t+=.01;}throw Error('No target');}
assert(acquire(false)<acquire(true),'Immediate friendly scan reduces first reaction delay');
{
 const {f,s}=setup(false),u=human(200),hard=bug(420,270),lane=bug(440);u.order=3;u.anchor={x:u.x,y:u.y};s.humans=[u];s.aliens=[hard,lane];let target;for(let i=0;i<100;i++){s.t+=.02;target=f.perceive(u,s.aliens,245);if(target)break;}assert.equal(target,lane,'Guard skips lane requiring movement beyond 50px leash');const origin={x:u.x,y:u.y};for(let i=0;i<200;i++){s.t+=.04;u.cool=Math.max(0,u.cool-.04);f.aimHuman(u,target,.04);}assert(Math.hypot(u.x-origin.x,u.y-origin.y)<=50);assert(s.bullets.length>0,'Guard engages reachable alternative');
}
function attack(old,weapon,x,y,seed=77){const {f,s}=setup(old,seed),u=human(200),t=bug(x,y);u.weapon=weapon;u.attackMove={x:700,y:200,force:false};s.humans=[u];s.aliens=[t];let first=null;for(let i=0;i<200;i++){s.t+=.04;u.cool=Math.max(0,u.cool-.04);f.attackMoveStep(u,t,.04);if(s.bullets.length&&first===null)first=+(s.t-1).toFixed(2);}return {first,x:u.x,y:u.y,shots:s.bullets.length};}
for(const seed of [1,77,812]){const a=attack(false,2,480,200,seed),b=attack(true,2,480,200,seed);assert.equal(a.x,200,'Plasma engages at standoff');assert(a.first<b.first,'Plasma fires sooner instead of walking to generic 160px range');assert(a.shots>0);const flame=attack(false,1,355,225,seed);assert(flame.shots>0,'Short-range attack-mover closes and aligns');}
{
 const {f,s}=setup(false),u=human(200),t=bug(310);u.attackMove={x:700,y:200,force:true};s.humans=[u];s.aliens=[t];for(let i=0;i<50;i++)f.attackMoveStep(u,t,.04);assert.equal(s.bullets.length,0,'Force-move still overrides combat');assert(u.x>200);
 u.attackMove=null;u.order=1;u.leader=2;const leader={...human(600),id:2,type:'commander',external:{until:1e6}};s.humans=[u,leader];for(let i=0;i<10;i++)f.update(.04);assert(u.x>200,'Follow still closes on commander');
}
console.log('TRI-070 comparative evidence:',JSON.stringify({alerts:{before:alerts(true),after:alerts(false)},sound:{before:sound(true),after:sound(false)},reaction:{before:acquire(true),after:acquire(false)},pursuit:{before:pursuit(true,77),after:pursuit(false,77)},plasma:{before:attack(true,2,480,200),after:attack(false,2,480,200)},flame:{before:attack(true,1,355,225),after:attack(false,1,355,225)}}));
console.log('Passed immutable TRI-070 before/after alerts, sound, seeded pursuit/reaction, weapon attack-move, guard alternatives/leash and explicit order checks. VM evidence; no live win-rate claim.');
