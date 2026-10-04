if(require.main===module)process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),zlib=require('node:zlib');
const sandbox={window:{}};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('src/vent-bugs.js','utf8'),sandbox);const api=sandbox.window.TriumphVents;
const original={window:{}};vm.createContext(original);vm.runInContext(fs.readFileSync('assets/original-data.js','utf8'),original);
const events=JSON.parse(zlib.gunzipSync(fs.readFileSync('research/events.json.gz')));
for(const map of original.window.ORIGINAL.maps){const s={};api.initialize(s,map);assert.equal(s.vents.length,map.index>=17?1:0,'Exact placed shadow count including source off-map instance');if(s.vents.length){assert.equal(s.vents[0].x,0);assert.equal(s.vents[0].y,0);}}
function setup(frame=17){const s={originalMap:{index:frame},vents:[],ventClock:{mode:0,contact:0,aim:0},humans:[],aliens:[],flowers:[]},sounds=[];const hooks={random:()=>.99,blocked:()=>false,sound:n=>sounds.push(n),spawn:(x,y)=>s.aliens.push({x,y,alive:true,hp:4,type:'soldier',object:151,angle:0})};return {s,hooks,sounds};}
function shadow(s,x=100,y=100){const v={x,y,object:api.rules[s.originalMap.index].shadow,phase:'ceiling',age:0,mode:12,dropRoll:29,moving:true,angle:0};s.vents.push(v);return v;}
{
 const {s,hooks}=setup();const v=shadow(s);hooks.blocked=()=>true;api.update(s,1,hooks);assert(v.x>150,'Ceiling crosses solid backdrop');assert.equal(v.phase,'ceiling');
 v.x=0;v.y=0;v.moving=false;api.update(s,.04,hooks);assert(v.x>0&&v.y>0,'Off-map placed shadow recovers toward center');assert(Math.abs(v.angle-Math.atan2(270,512))<1e-9);
 v.x=1023;v.y=300;v.angle=0;v.moving=true;api.update(s,.04,hooks);api.update(s,.04,hooks);assert(v.x<1024,'Boundary exit recovers inward');
}
for(const type of ['commander','soldier','commando','tank','robot','air']){
 const {s,hooks,sounds}=setup();const v=shadow(s);v.moving=false;v.dropRoll=type==='commander'?10:20;s.humans=[{x:100,y:100,type,id:1,alive:true}];api.update(s,.01,hooks);
 assert.equal(v.phase,['commander','soldier','commando'].includes(type)?'drop':'ceiling',type+' contact eligibility');if(v.phase==='drop'){assert.deepEqual(sounds,[15]);api.update(s,api.dropSeconds-.02,hooks);assert.equal(s.aliens.length,0,'No premature ground actor');api.update(s,.03,hooks);assert.equal(s.vents.length,0);assert.equal(s.aliens.length,1);assert.equal(s.aliens[0].hp,4);}
}
for(const frame of [17,19,21]){
 const {s,hooks}=setup(frame),v=shadow(s);v.moving=false;v.dropRoll=0;s.humans=[{x:100,y:100,type:'commander',alive:true}];hooks.blocked=()=>true;api.update(s,.01,hooks);assert.equal(v.phase,frame===17?'drop':'ceiling','Mission-specific backdrop drop guard');
}
{
 const {s,hooks}=setup();const v=shadow(s);v.moving=false;v.dropRoll=11;s.humans=[{x:100,y:100,type:'commander',alive:true}];api.update(s,.01,hooks);assert.equal(v.phase,'ceiling','Commander rejects roll11');s.humans[0].type='soldier';v.dropRoll=21;api.update(s,.01,hooks);assert.equal(v.phase,'ceiling','Troop rejects roll21');
 s.ventClock.contact=.099;hooks.random=()=>0;api.update(s,.002,hooks);assert.equal(v.phase,'drop','100ms reroll permits next contact');
}
for(const frame of [17,19,21]){
 const {s,hooks}=setup(frame);const a={x:200,y:200,angle:0,alive:true,hp:1,type:'soldier',object:151};s.aliens=[a];hooks.random=()=>15/20;api.update(s,1.99,hooks);assert.equal(s.vents.length,0,'No fixed return before roll');api.update(s,.01,hooks);assert.equal(s.vents.length,frame===21?0:1,'Final return remains in inactive debug group');if(frame!==21){assert.equal(s.aliens.length,0);assert.equal(s.vents[0].phase,'jump');api.update(s,api.jumpSeconds,hooks);assert.equal(s.vents[0].phase,'ceiling');assert.equal(s.vents[0].object,api.rules[frame].shadow);}
}
{
 const {s,hooks}=setup();for(let i=0;i<10;i++)shadow(s,300+i*20,400).moving=false;const a={x:200,y:200,angle:0,alive:true,hp:4,type:'soldier',object:151,ventMode:15};s.aliens=[a];api.update(s,.01,hooks);assert.equal(s.aliens.length,1,'Ten ceilings block return');s.vents.pop();api.update(s,.01,hooks);assert.equal(s.aliens.length,0,'Inclusive count9 allows tenth eventual ceiling');assert.equal(s.vents.length,10,'One actor per phase');
}
{
 const {s,hooks}=setup();s.aliens=['redbug','queen'].map(type=>({type,alive:true,hp:4,x:100,y:100,ventMode:15}));api.update(s,.01,hooks);assert.equal(s.vents.length,0,'Special enemies retain custom behavior');
 const calls=[],v=shadow(s);v.phase='jump';v.object=447;v.angle=Math.PI/2;v.age=api.jumpSeconds*.8;api.draw({save(){},restore(){}},[v],(...args)=>calls.push(args));assert.equal(calls[0][0],447);assert.equal(calls[0][3],Math.PI/2);assert.equal(calls[0][5],4,'Recovered final jump frame with cardinal orientation');
}
{
 const {s,hooks}=setup(),v=shadow(s);v.mode=15;api.update(s,.04,hooks);assert.equal(v.x,100,'Stop mode halts ballistic motion');v.mode=0;api.update(s,.04,hooks);assert(v.x>100,'Start mode resumes');
 v.mode=6;s.humans=[{x:300,y:400,id:1,type:'commander',alive:true}];s.ventClock.contact=.099;api.update(s,.002,hooks);assert(v.angle>0,'Commander mode redirects toward matching commander');
 v.mode=11;s.humans=[{x:300,y:100,type:'tank',alive:true}];api.update(s,.01,hooks);assert.equal(v.mode,19,'No troop rerolls mode instead of seeking mechanical unit');
 s.aliens=[{x:200,y:200,hp:4,alive:true,type:'soldier',object:151,ventMode:15,angle:0}];s.kills=7;s.score=[1,2,3,4];s.waveKills={normal:6,queen:2};api.update(s,.01,hooks);assert.equal(s.kills,7);assert.deepEqual(s.score,[1,2,3,4]);assert.deepEqual(s.waveKills,{normal:6,queen:2});
}
// Source regressions: disabled debug context, exact creation and absence of attack handlers.
for(const object of [446,447,448,475])assert.equal(original.window.ORIGINAL.objects[object].qualifiers.length,0,'Ceiling phases have no damage qualifiers');
for(const frame of [17,19,21]){const f=events.find(f=>f.frame===frame),returnOffset=frame===17?1548:frame===19?1536:3622;const g=f.groups.find(g=>g.offset===returnOffset);assert(g.actions.some(a=>a.parameters.some(p=>p.created===447)));if(frame===21){const debug=f.groups.find(g=>g.offset===3494);assert.equal(debug.conditions[0].parameters[0].name,'DEBUG (2)');assert.equal(Buffer.from(debug.conditions[0].parameters[0].raw,'hex').readUInt16LE(0),3);assert(g.flags&8192);}
 for(const g of f.groups)for(const a of [...g.conditions,...g.actions])if([446,447,448,475].includes(a.object))assert(![-13,29,33].includes(a.num),'No recovered terrain-collision, shooting, or value-decrement damage handler for ceiling phases');
}
console.log('Passed vent source/lifecycle: placement, walls, boundaries, human contact rolls, floor guard, animation phases, probabilistic return/cap, final debug exclusion and sprite orientation.');
