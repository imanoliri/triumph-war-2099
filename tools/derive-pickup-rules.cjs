// Recover random item rolls, pickup handles and count limits from original events.
const fs=require('node:fs'),zlib=require('node:zlib');
const events=JSON.parse(zlib.gunzipSync(fs.readFileSync('research/events.json.gz')));
const value=p=>p?.expression?.tokens?.length===1?p.expression.tokens[0].value:undefined;
const types={'Ground Reinforcements':'troops','Airial Reinforcements':'air','Ground Support':'tank','BLITZ!':'blitz','Auto Gun':'auto','Plasma Gun':'plasma','Flame Gun':'flame','1 Grenade':'grenade'};
const maps={};
for(const frame of events.filter(f=>[5,7,9,11,13,15,17,19,21].includes(f.frame))){
 const random=frame.groups.flatMap(g=>g.actions).find(a=>a.num===31&&/ITEM CREATOR/.test(a.name)&&a.parameters[0]?.value===0);
 const range=random.parameters[1].expression.tokens.find(t=>typeof t.value==='number').value;
 const cases=[];
 for(const g of frame.groups){
  if(!g.conditions.some(c=>/ITEM CREATOR/.test(c.name)))continue;
  for(const p of g.actions.flatMap(a=>a.parameters).filter(p=>p.position&&types[p.name])){
   const checks=g.conditions.filter(c=>c.num===-27&&/ITEM CREATOR/.test(c.name)).map(c=>({variable:c.parameters[0].value,comparison:c.parameters[1].expression.comparison,value:value(c.parameters[1])}));
   const count=g.conditions.find(c=>c.num===-32&&c.object===p.created);
   const troops=g.conditions.find(c=>c.num===-32&&c.name==='Troop');
   cases.push({type:types[p.name],object:p.created,parent:p.position.parent,x:p.position.x,y:p.position.y,checks,count:count?{comparison:count.parameters[0].expression.comparison,value:value(count.parameters[0])}:null,troops:troops?{comparison:troops.parameters[0].expression.comparison,tokens:troops.parameters[0].expression.tokens}:null,minimumTime:(g.conditions.find(c=>c.type===-4&&c.num===-1)?.parameters[0].value||0)/1000,sourceOffset:g.offset});
  }
 }
 maps[frame.frame]={range,interval:1,secondary:20,cases};
}
fs.writeFileSync('assets/pickup-rules.js','window.ORIGINAL_PICKUPS='+JSON.stringify(maps)+';\n');
console.log(Object.entries(maps).map(([id,m])=>`Frame ${id}: Random(${m.range}), ${m.cases.length} pickup rules`).join('\n'));
