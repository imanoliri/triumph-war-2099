if (require.main === module) process.chdir(require('node:path').resolve(__dirname, '..'));
const fs=require('node:fs'),all=JSON.parse(fs.readFileSync('work/recovered/events.json')),frames=JSON.parse(fs.readFileSync('work/recovered/frames.json')),objects=JSON.parse(fs.readFileSync('work/recovered/objects.json'));
const value=p=>p?.expression?.tokens?.length===1?p.expression.tokens[0].value:undefined;
const rules={};
for(const frame of all.filter(f=>[5,7,9,11,13,15,17,19,21].includes(f.frame))){
 const data={frame:frame.frame,globals:{15:frame.frame+1,11:0},cases:[],intervals:{carrier:1,airDrop:1,airFire:.330,airGrenade:1,infiltration:1,infiltrationLifetime:10},helpers:[],telepads:[]};
 for(const g of frame.groups){
  if(g.conditions.some(c=>c.type===-3&&c.num===-1))for(const a of g.actions)if(a.type===-1&&a.num===3&&a.parameters[0]?.value===11)data.globals[11]=value(a.parameters[1]);
  if(!g.conditions.some(c=>c.type===2&&c.name==='Commander1'))continue;
  const item=g.conditions.flatMap(c=>c.parameters).find(p=>['Ground Reinforcements','Airial Reinforcements','Ground Support','BLITZ!'].includes(p.name));if(!item)continue;
  const guards=g.conditions.filter(c=>c.type===-1&&c.num===-8).map(c=>({global:c.parameters[0].value,comparison:c.parameters[1].expression.comparison,value:value(c.parameters[1])}));
  const creates=g.actions.flatMap(a=>a.parameters).filter(p=>p.created!==undefined&&p.position).map(p=>({object:p.created,name:p.name,...p.position}));
  const sounds=g.actions.filter(a=>a.type===-2&&a.num===0).map(a=>a.parameters[0].handle);
  if(creates.length)data.cases.push({item:item.name,guards,creates,sounds,sourceOffset:g.offset});
 }
 for(const i of frames[frame.frame].instances){const o=objects.find(o=>o.handle===i.object);if(['Ground spawner','ITEM CREATOR','ITEM CREATOR 2'].includes(o.name))data.helpers.push({...i,name:o.name});if(/^telepad/.test(o.name))data.telepads.push({...i,name:o.name});}
 rules[frame.frame]=data;
}
fs.writeFileSync('assets/support-rules.js','window.ORIGINAL_SUPPORT='+JSON.stringify(rules)+';\n');
fs.writeFileSync('work/recovered/support-rules.json',JSON.stringify(rules,null,2));
console.log(Object.values(rules).map(r=>`Frame ${r.frame}: ${r.cases.map(c=>c.item+' → '+c.creates.map(c=>c.name).join(', ')).join(' | ')}`).join('\n'));
