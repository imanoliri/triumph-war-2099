if (require.main === module) process.chdir(require('node:path').resolve(__dirname, '..'));
// Independently written MS ADPCM decoder. Coefficients come from each WAV header.
const fs=require('node:fs'),root='assets/audio';
const adaptation=[230,230,230,230,307,409,512,614,768,614,512,409,307,230,230,230];
const catalog=JSON.parse(fs.readFileSync(`${root}/catalog.json`));
for(const entry of catalog.filter(e=>e.kind==='sound')){
 const wav=fs.readFileSync(`${root}/${entry.file}`),fmt=wav.subarray(20,20+wav.readUInt32LE(16)),channels=fmt.readUInt16LE(2),block=fmt.readUInt16LE(12),rate=fmt.readUInt32LE(4),dataAt=28+fmt.length;
 const data=wav.subarray(dataAt,dataAt+wav.readUInt32LE(dataAt-4)),samples=[];
 if(channels!==1&&channels!==2)throw Error('Unexpected channel count');
 const coefficients=Array.from({length:fmt.readUInt16LE(20)},(_,i)=>[fmt.readInt16LE(22+i*4),fmt.readInt16LE(24+i*4)]);
 for(let base=0;base<data.length;base+=block){
  const d=data.subarray(base,Math.min(base+block,data.length));if(d.length<7*channels)break;
  const states=Array.from({length:channels},(_,c)=>({coeff:coefficients[d[c]],delta:d.readInt16LE(channels+c*2),a:d.readInt16LE(channels*3+c*2),b:d.readInt16LE(channels*5+c*2)}));
  if(states.some(s=>!s.coeff))throw Error('Invalid predictor');
  samples.push(...states.map(s=>s.b),...states.map(s=>s.a));
  const next=(c,n)=>{const s=states[c],pred=Math.trunc((s.a*s.coeff[0]+s.b*s.coeff[1])/256)+(n>=8?n-16:n)*s.delta;s.b=s.a;s.a=Math.max(-32768,Math.min(32767,pred));s.delta=Math.max(16,Math.floor(s.delta*adaptation[n]/256));samples.push(s.a);};
  for(let i=channels*7;i<d.length;i++){next(0,d[i]>>4);next(channels-1,d[i]&15);}
 }
 const header=Buffer.alloc(44),pcm=Buffer.alloc(samples.length*2);samples.forEach((s,i)=>pcm.writeInt16LE(s,i*2));
 header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(channels,22);header.writeUInt32LE(rate,24);header.writeUInt32LE(rate*channels*2,28);header.writeUInt16LE(channels*2,32);header.writeUInt16LE(16,34);header.write('data',36);header.writeUInt32LE(pcm.length,40);
 const file=`pcm-${entry.handle}.wav`;fs.writeFileSync(`${root}/${file}`,Buffer.concat([header,pcm]));entry.pcm=file;entry.duration=samples.length/channels/rate;
}
fs.writeFileSync(`${root}/catalog.json`,JSON.stringify(catalog,null,2));fs.writeFileSync(`${root}/catalog.js`,'window.ORIGINAL_AUDIO='+JSON.stringify(catalog)+';\n');
console.log('Converted 62 original sounds to browser-compatible 16-bit PCM');
