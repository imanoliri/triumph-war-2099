'use strict';
// Read-only research index. Group IDs repeat; frame + array ordinal is authoritative.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),vm=require('node:vm'),crypto=require('node:crypto');
process.chdir(path.resolve(__dirname,'..'));
const packed=fs.readFileSync('research/events.json.gz'),frames=JSON.parse(zlib.gunzipSync(packed));
const context={window:{}};vm.runInNewContext(fs.readFileSync('assets/original-data.js','utf8'),context);
const data=context.window.ORIGINAL;
const families={grenades:/^(Trown Grenade|Grenade Explosion)$/,hazards:/^(blaze|slime|chemical)$/,telepads:/^telepad( 2)?$/,waves:/^aliens (maxer|left to go( 2)?)$/,support:/^(Troop Carrier|Air Support|Drop troop|zipline creator|zipline drop)$/};
const touches=(ace,re)=>re.test(ace.name)||ace.parameters.some(p=>re.test(p.name||''));
const records=[];
for(const frame of frames.filter(f=>[5,7,9,11,13,15,17,19,21].includes(f.frame)))frame.groups.forEach((g,ordinal)=>{
 const family=Object.keys(families).filter(k=>[...g.conditions,...g.actions].some(a=>touches(a,families[k])));
 if(family.length)records.push({frame:frame.frame,ordinal,id:g.id,offset:g.offset,flags:g.flags,inactive:!!(g.flags&16384),families:family,conditions:g.conditions,actions:g.actions});
});
const objectIds=new Set(records.flatMap(g=>[...g.conditions,...g.actions].flatMap(a=>[a.object,...a.parameters.flatMap(p=>[p.object,p.created])])).filter(Number.isInteger));
const objects=Object.fromEntries([...objectIds].filter(id=>data.objects[id]&&Object.values(families).some(re=>re.test(data.objects[id].name))).map(id=>[id,data.objects[id]]));
const hash=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const result={source:'research/events.json.gz',sha256:crypto.createHash('sha256').update(packed).digest('hex'),address:'frame + zero-based groups ordinal; id is not unique',records:records.map(({frame,ordinal,id,offset,flags,inactive,families,...aces})=>({frame,ordinal,id,offset,flags,inactive,families,sha256:hash(aces)})),objects:Object.fromEntries(Object.entries(objects).map(([id,o])=>[id,{name:o.name,sha256:hash(o)}]))};
if(process.argv.includes('--write'))fs.writeFileSync('docs/research/fidelity-evidence.json',JSON.stringify(result)+'\n');
else {const saved=JSON.parse(fs.readFileSync('docs/research/fidelity-evidence.json'));if(JSON.stringify(saved)!==JSON.stringify(result))throw Error('Fidelity evidence differs from recovered records');}
console.log(`Fidelity evidence verified: ${records.length} groups, ${Object.keys(objects).length} source objects.`);
const recordArg=process.argv.indexOf('--record');if(recordArg>=0){const [frame,ordinal]=process.argv[recordArg+1].split(':').map(Number);const record=records.find(r=>r.frame===frame&&r.ordinal===ordinal);if(!record)throw Error('Address absent from audit index');console.log(JSON.stringify(record,null,2));}
const objectArg=process.argv.indexOf('--object');if(objectArg>=0){const object=objects[process.argv[objectArg+1]];if(!object)throw Error('Object absent from audit index');console.log(JSON.stringify(object,null,2));}
if(process.argv.includes('--summary'))for(const g of records.filter(g=>g.families.some(k=>['hazards','telepads'].includes(k))))console.log(JSON.stringify({frame:g.frame,ordinal:g.ordinal,id:g.id,conditions:g.conditions.map(a=>({name:a.name,op:[a.type,a.num],p:a.parameters.map(p=>p.value??p.name??p.expression??p.position??p.raw)})),actions:g.actions.map(a=>({name:a.name,op:[a.type,a.num],p:a.parameters.map(p=>p.value??p.name??p.expression??p.position??p.raw)}))}));
