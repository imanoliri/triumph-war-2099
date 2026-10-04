if (require.main === module) process.chdir(require('node:path').resolve(__dirname, '..'));
const fs=require('node:fs'),{chunks}=require('./inspect-original.cjs'),objects=JSON.parse(fs.readFileSync('work/recovered/objects.json'));
const bank=fs.readFileSync('work/original-chunks/9-2229.bin');let p=4;
for(let i=0;i<bank.readUInt32LE(0);i++){
 const cs=chunks(bank,p);p=cs.at(-1).offset+8+cs.at(-1).size;
 const h=cs.find(c=>c.id===0x4444).data,d=cs.find(c=>c.id===0x4446).data,o=objects.find(o=>o.handle===h.readUInt16LE(0));
 o.headerFlags=h.readUInt16LE(4);o.global=!!(o.headerFlags&4);
 if(o.type>=2&&d.length>=44){o.preferences=d.readUInt16LE(42);o.qualifiers=[];for(let j=0;j<8;j++){const q=d.readInt16LE(20+j*2);if(q===-1)break;o.qualifiers.push(q);}const c=d.readUInt16LE(10);if(c>0&&c+14<=d.length)o.counter={initial:d.readInt32LE(c+2),minimum:d.readInt32LE(c+6),maximum:d.readInt32LE(c+10)};}
}
fs.writeFileSync('work/recovered/objects.json',JSON.stringify(objects));
const file='assets/original-data.js',data=JSON.parse(fs.readFileSync(file,'utf8').replace(/^window.ORIGINAL=/,'').replace(/;\s*$/,''));data.objects=Object.fromEntries(objects.map(o=>[o.handle,o]));fs.writeFileSync(file,'window.ORIGINAL='+JSON.stringify(data)+';\n');
console.log('Recovered object globals, counter initial/minimum/maximum values and qualifier sentinels');
