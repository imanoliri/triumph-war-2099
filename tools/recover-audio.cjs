if (require.main === module) process.chdir(require('node:path').resolve(__dirname, '..'));
// Reads MMF 1.x bank records using the format described by Anaconda's loaders.
const fs=require('node:fs'),{inflateOld}=require('./inspect-original.cjs');
const dest='assets/audio';fs.mkdirSync(dest,{recursive:true});
const records=[];
for(const [bank,kind] of [['41-6668','sound'],['43-6669','music']]){
 const b=fs.readFileSync(`work/original-chunks/${bank}.bin`);let p=4;
 for(let i=0;i<b.readUInt32LE(0);i++){
  const handle=b.readUInt32LE(p),z=inflateOld(b.subarray(p+8),b.readUInt32LE(p+4));p+=8+z.consumed;
  const d=z.data,n=d.readUInt32LE(18),name=d.subarray(22,22+n).toString('latin1').replace(/\0/g,''),at=22+n;
  let data,format,ext;
  if(kind==='music'){data=d.subarray(at);ext=data.subarray(0,4).toString()==='MThd'?'mid':'bin';}
  else {
   format=d.readUInt16LE(at);const fmtLen=18+d.readUInt16LE(at+16),length=d.readUInt32LE(at+fmtLen),pcm=d.subarray(at+fmtLen+4,at+fmtLen+4+length);
   if(pcm.length!==length)throw Error(`Short sound ${name}`);
   const fmt=d.subarray(at,at+fmtLen),size=4+8+fmt.length+8+pcm.length+(pcm.length%2),head=Buffer.alloc(12+8+fmt.length+8);
   head.write('RIFF');head.writeUInt32LE(size,4);head.write('WAVEfmt ',8);head.writeUInt32LE(fmt.length,16);fmt.copy(head,20);head.write('data',20+fmt.length);head.writeUInt32LE(pcm.length,24+fmt.length);
   data=Buffer.concat([head,pcm,Buffer.alloc(pcm.length%2)]);ext='wav';
  }
  const file=`${kind}-${handle}.${ext}`;fs.writeFileSync(`${dest}/${file}`,data);records.push({kind,handle,name,format,file,bytes:data.length});
 }
 if(p!==b.length)throw Error(`Trailing bank data ${bank}: ${p}/${b.length}`);
}
fs.writeFileSync(`${dest}/catalog.json`,JSON.stringify(records,null,2));
fs.writeFileSync(`${dest}/catalog.js`,'window.ORIGINAL_AUDIO='+JSON.stringify(records)+';\n');
console.log(records.map(x=>`${x.kind} ${x.handle}: ${x.name} (${x.format||'MIDI'})`).join('\n'));
