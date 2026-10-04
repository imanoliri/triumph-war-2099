if (require.main === module) process.chdir(require('node:path').resolve(__dirname, '..'));
// Independent reader for the documented MMF 1.x event record format.
const fs=require('node:fs'),{chunks}=require('./inspect-original.cjs');
const objects=JSON.parse(fs.readFileSync('work/recovered/objects.json')),frames=JSON.parse(fs.readFileSync('work/recovered/frames.json'));
const objectName=h=>objects.find(o=>o.handle===h)?.name||`#${h}`;
function expr(b){const tokens=[];let p=2;while(p+2<=b.length){const type=b.readInt8(p),num=b.readInt8(p+1)+(type>2?32:0);if(!type&&!num){p+=2;break;}const size=b.readUInt16LE(p+2);if(size<4||p+size>b.length)throw Error('Bad expression');const t={type,num,raw:b.subarray(p+4,p+size).toString('hex')};if(type===-1&&num===0)t.value=b.readInt32LE(p+4);if(type===-1&&num===24)t.global=b.readUInt16LE(p+4);if(type>=2||type===-7){t.object=b.readUInt16LE(p+4);t.name=objectName(t.object);if(num===16)t.index=b.readUInt16LE(p+8);}tokens.push(t);p+=size;}return {comparison:b.readInt16LE(0),tokens,complete:p===b.length};}
function parameter(b,code){const q={code,raw:b.toString('hex')};if([15,22,23,27,28,45,46,52,53,54,59,62].includes(code))q.expression=expr(b);else if([3,4,10,11,12,17,26,31,43,49,50,57,58,60,61,14,44].includes(code)&&b.length>=2)q.value=b.readInt16LE(0);else if([5,25,29,34,48,56,2,13].includes(code)&&b.length>=4)q.value=b.readInt32LE(0);else if(code===1){q.object=b.readUInt16LE(2);q.name=objectName(q.object);}else if([6,7,35,36].includes(code)){q.handle=b.readUInt16LE(0);q.name=b.subarray(4).toString('latin1').replace(/\0.*$/s,'');}else if(code===38){q.id=b.readUInt16LE(2);q.name=b.subarray(4,100).toString('latin1').replace(/\0.*$/s,'');}else if(code===39){q.id=b.readInt16LE(4);}else if([9,16,18,21].includes(code)){q.position={parent:b.readUInt16LE(0),flags:b.readUInt16LE(2),x:b.readInt16LE(4),y:b.readInt16LE(6),direction:b.readUInt32LE(12)};if(code!==16){q.created=b.readUInt16LE(24);q.name=objectName(q.created);}}return q;}
function ace(b,at,condition){const size=b.readUInt16LE(at),type=b.readInt8(at+2),num=b.readInt8(at+3)+(type>2?(condition?-32:32):0),a={type,num,object:b.readUInt16LE(at+4),flags:b[at+8],otherFlags:b[at+9],parameters:[]};a.name=objectName(a.object);let p=at+(condition?14:12);for(let i=0;i<b[at+10];i++){const n=b.readUInt16LE(p),code=b.readUInt16LE(p+2);if(n<4||p+n>at+size)throw Error(`Bad parameter ${p}`);a.parameters.push(parameter(b.subarray(p+4,p+n),code));p+=n;}if(p!==at+size)throw Error(`ACE mismatch ${p}/${at+size}`);return {value:a,next:at+size};}
const all=[];
const files=fs.readdirSync('work/original-chunks').filter(n=>n.endsWith('-3333.bin')).sort((a,b)=>parseInt(a)-parseInt(b));
for(let fi=0;fi<files.length;fi++){
 const b=chunks(fs.readFileSync('work/original-chunks/'+files[fi])).find(c=>c.id===0x333d)?.data;if(!b)continue;
 let start=b.indexOf('ERev');if(start<0)continue;const groups=[];let p;
 while(b.subarray(start,start+4).toString()==='ERev'){
 const size=b.readUInt32LE(start+4),end=start+8+size;p=start+8;
 while(p<end){const size=-b.readInt16LE(p),g={offset:p,flags:b.readUInt16LE(p+4),id:b.readUInt16LE(p+10),conditions:[],actions:[]};if(size<14)throw Error('Bad group');let at=p+14;for(let i=0;i<b[p+2];i++){const a=ace(b,at,true);g.conditions.push(a.value);at=a.next;}for(let i=0;i<b[p+3];i++){const a=ace(b,at,false);g.actions.push(a.value);at=a.next;}if(at!==p+size)throw Error(`Group mismatch ${at}/${p+size}`);groups.push(g);p+=size;}
 if(p!==end)throw Error('Event boundary mismatch');start=end;
 }
 if(b.subarray(start,start+4).toString()!=='<<ER'||start+4!==b.length)throw Error(`Unparsed event section ${start}/${b.length}`);
 const data={frame:fi,name:frames[fi].name,groups};all.push(data);fs.writeFileSync(`work/recovered/events-${fi}.json`,JSON.stringify(data));
}
fs.writeFileSync('work/recovered/events.json',JSON.stringify(all));
console.log(all.map(f=>`${f.frame} ${f.name}: ${f.groups.length} event groups`).join('\n'));
