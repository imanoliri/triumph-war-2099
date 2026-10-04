if (require.main === module) process.chdir(require('node:path').resolve(__dirname, '..'));
const fs=require('node:fs'),{chunks}=require('./inspect-original.cjs'),objects=JSON.parse(fs.readFileSync('work/recovered/objects.json'));
const b=fs.readFileSync('work/original-chunks/9-2229.bin');let p=4,count=0;
for(let i=0;i<b.readUInt32LE(0);i++){
 const c=chunks(b,p);p=c.at(-1).offset+8+c.at(-1).size;const h=c.find(x=>x.id===0x4444).data,d=c.find(x=>x.id===0x4446).data,o=objects.find(x=>x.handle===h.readUInt16LE(0));if(!o.movement)continue;
 const at=d.readUInt16LE(4)+12,m=o.movement;
 if(m.type===5){const n=d.readUInt16LE(at);m.path={minimum:d.readUInt16LE(at+2),maximum:d.readUInt16LE(at+4),loop:!!d[at+6],reposition:!!d[at+7],reverse:!!d[at+8],steps:[]};let q=at+10;for(let j=0;j<n;j++){const size=14;if(q+size>d.length)throw Error('Bad path step '+o.handle);m.path.steps.push({speed:d[q],direction:d[q+1],dx:d.readInt16LE(q+2),dy:d.readInt16LE(q+4),cos:d.readInt16LE(q+6)/16384,sin:d.readInt16LE(q+8)/16384,length:d.readUInt16LE(q+10),pause:d.readUInt16LE(q+12)});q+=size;}count++;}
 if(m.type===4&&at+10<=d.length)m.ball={speed:d.readUInt16LE(at),randomizer:d.readUInt16LE(at+2),angles:d.readUInt16LE(at+4),security:d.readUInt16LE(at+6),deceleration:d.readUInt16LE(at+8)};
}
fs.writeFileSync('work/recovered/objects.json',JSON.stringify(objects));
const file='assets/original-data.js',data=JSON.parse(fs.readFileSync(file,'utf8').replace(/^window.ORIGINAL=/,'').replace(/;\s*$/,''));data.objects=Object.fromEntries(objects.map(o=>[o.handle,o]));fs.writeFileSync(file,'window.ORIGINAL='+JSON.stringify(data)+';\n');
console.log('Recovered',count,'native paths plus ball movement parameters');
console.log(JSON.stringify(objects.filter(o=>[72,73,97,309,390,408].includes(o.handle)).map(o=>({id:o.handle,name:o.name,movement:o.movement})),null,2));
