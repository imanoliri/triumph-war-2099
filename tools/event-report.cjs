const fs=require('node:fs');
const all=JSON.parse(fs.readFileSync('work/recovered/events.json'));
const operations={a:{1:'position',2:'x=',3:'y=',4:'stop',5:'start',6:'speed=',14:'look',17:'animation=',23:'direction=',24:'destroy',26:'hide',27:'show',29:'shoot',31:'variable=',32:'variable+=',33:'variable-=',35:'flag on',36:'flag off',40:'frame='},c:{'-33':'all destroyed','-32':'count','-27':'variable','-25':'flag on','-24':'flag off','-17':'x','-16':'y','-14':'collision','-13':'terrain collision','-4':'overlap','-3':'animation'}};
const parameter=p=>p.value!==undefined?p.value:p.expression?['=','!=','<=','<','>=','>'][p.expression.comparison]+' '+p.expression.tokens.map(t=>t.value!==undefined?t.value:t.global!==undefined?`global[${t.global}]`:t.index!==undefined?`${t.name}[${t.index}]`:`${t.type}/${t.num}:${t.name||t.raw}`).join(' '):p.position?`create ${p.name||''} @ ${JSON.stringify(p.position)}`:p.name!==undefined?p.name:p.id!==undefined?`group#${p.id}`:p.raw;
const ace=(a,k)=>`${a.otherFlags&1?'NOT ':''}${a.type}/${a.num} ${a.type>=2?a.name:''} ${a.type>=2?operations[k][a.num]||'':''} (${a.parameters.map(parameter).join('; ')})`;
const line=g=>`#${g.id}${g.flags&16384?' INACTIVE':''} IF ${g.conditions.map(a=>ace(a,'c')).join(' AND ')} THEN ${g.actions.map(a=>ace(a,'a')).join(' | ')}`;
for(const f of all){fs.writeFileSync(`work/recovered/events-${f.frame}.txt`,f.groups.map(line).join('\n'));}
if(require.main===module){const frame=Number(process.argv[2]||9),pattern=new RegExp(process.argv[3]||'computer area|Door ');for(const g of all.find(f=>f.frame===frame).groups)if([...g.conditions,...g.actions].some(a=>pattern.test(a.name)))console.log(line(g));}
module.exports={line};
