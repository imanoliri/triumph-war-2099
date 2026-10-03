const fs=require('node:fs'),events=JSON.parse(fs.readFileSync('work/recovered/events.json'));
const objects=JSON.parse(fs.readFileSync('work/recovered/objects.json')),frames=JSON.parse(fs.readFileSync('work/recovered/frames.json'));
const constant=p=>p?.expression?.tokens?.length===1?p.expression.tokens[0].value:undefined;
const maps={};
for(const frame of events.filter(f=>[5,7,9,11,13,15,17,19,21].includes(f.frame))){
 const groups=frame.groups,limit=frames[frame.frame].instances.map(i=>objects.find(o=>o.handle===i.object)).find(o=>o.name==='MAX CHARACTER LIMIT'),rule={name:frame.name,doors:{},terminals:{},minimumTime:0,victoryTerminals:[],commanderStarts:{},music:null,maxAliens:limit?.counter?.initial||50,difficultyCull:[]};
 const doors=[...new Set(groups.flatMap(g=>[...g.conditions,...g.actions]).filter(a=>a.type===2&&/^Door \d/.test(a.name)).map(a=>a.object))];
 for(const id of doors){const flagCheck=groups.some(g=>g.conditions.some(c=>c.type===2&&c.num===-25&&c.object===id&&constant(c.parameters[0])===0)&&g.conditions.some(c=>c.type===-7&&c.num===-4));
  const init=groups.filter(g=>g.conditions.length===1&&g.conditions[0].type===-3&&g.conditions[0].num===-1).flatMap(g=>g.actions).some(a=>a.type===2&&a.object===id&&a.num===35&&constant(a.parameters[0])===0);
  const damage=groups.find(g=>g.actions.some(a=>a.type===2&&a.object===id&&a.num===24)&&g.conditions.some(c=>c.object===id&&c.type===2&&c.num===-27));
  rule.doors[id]={requiresUnlock:flagCheck,initiallyUnlocked:!flagCheck||init,durability:damage?constant(damage.conditions.find(c=>c.object===id&&c.num===-27).parameters[1]):null};
 }
 for(const g of groups){
  const helper=g.conditions.find(c=>c.type===2&&c.num===-4&&['medium','easy'].includes(c.name)),difficultyFlag=g.conditions.find(c=>c.type===2&&c.num===-25&&c.name==='DIFFICULTY VALUES');
  if(helper&&difficultyFlag){for(const a of g.actions)if(a.type===2&&a.num===24&&!rule.difficultyCull.some(r=>r.helper===helper.object&&r.target===a.object))rule.difficultyCull.push({helper:helper.object,target:a.object,flag:constant(difficultyFlag.parameters[0])});}
  const start=g.conditions.some(c=>c.type===-3&&c.num===-1);
  if(start){for(const a of g.actions){if(a.type===-2&&a.num===5)rule.music=a.parameters[0].handle;for(const p of a.parameters)if(p.position&&p.position.parent===65535&&/^Commander[ ]?[1-4]$/.test(p.name||''))rule.commanderStarts[Number(p.name.at(-1))]={x:p.position.x,y:p.position.y,object:p.created};}}
  const terminal=g.conditions.flatMap(c=>c.parameters).find(p=>/^computer area/.test(p.name||''));
  if(terminal&&g.conditions.some(c=>c.type===-7&&c.num===-4)){
   const t=rule.terminals[terminal.object]??={unlocks:[],setsFlag:false,sound:null};
   for(const a of g.actions){if(a.type===2&&a.num===35&&constant(a.parameters[0])===0){if(a.object===terminal.object)t.setsFlag=true;if(rule.doors[a.object]&&!t.unlocks.includes(a.object))t.unlocks.push(a.object);}if(a.type===-2&&a.num===0)t.sound=a.parameters[0].handle;}
  }
  if(g.actions.some(a=>a.parameters.some(p=>p.name==='Mission Complete'))&&!g.conditions.some(c=>c.type===-6)){
   rule.minimumTime=(g.conditions.find(c=>c.type===-4&&c.num===-1)?.parameters[0]?.value||0)/1000;
   rule.victoryTerminals=g.conditions.filter(c=>c.type===2&&c.num===-25&&/^computer area/.test(c.name)).map(c=>c.object);
  }
 }
 maps[frame.frame]=rule;
}
const result={maps,difficulty:{veryeasy:{bug:2,queen:20,speed:22,medium:true,easy:true},easy:{bug:3,queen:40,speed:23,medium:false,easy:true},normal:{bug:4,queen:50,speed:24,medium:true,easy:false},hard:{bug:5,queen:65,speed:25,medium:false,easy:false},veryhard:{bug:6,queen:80,speed:27,medium:false,easy:false}},eggHealth:50,crystalHealth:7,grenadeCooldown:.330,commanderFire:{auto:.250,plasma:.250,flame:.180},waves:{13:{start:25,interval:.250,normalKills:200,queenKills:0},21:{start:30,interval:.250,queenInterval:.500,normalKills:150,queenKills:50}}};
fs.writeFileSync('assets/original-rules.js','window.ORIGINAL_RULES='+JSON.stringify(result)+';\n');
fs.writeFileSync('work/recovered/rules.json',JSON.stringify(result,null,2));
console.log(Object.entries(maps).map(([id,r])=>`${r.name}: ${Object.keys(r.terminals).length} terminals, required [${r.victoryTerminals}], minimum ${r.minimumTime}s`).join('\n'));
