if (require.main === module) process.chdir(require('node:path').resolve(__dirname, '..'));
// Decode original Standard MIDI Files into offline browser scheduling data.
const fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.runInNewContext(fs.readFileSync('assets/audio/catalog.js','utf8'),context);
function decode(b){
 if(b.toString('ascii',0,4)!=='MThd')throw Error('Invalid MIDI header');
 const division=b.readUInt16BE(12);if(division&32768)throw Error('SMPTE MIDI is unsupported');
 const events=[];let p=8+b.readUInt32BE(4),ordinal=0;
 while(p+8<=b.length){const kind=b.toString('ascii',p,p+4),end=p+8+b.readUInt32BE(p+4);p+=8;if(end>b.length)throw Error('Truncated MIDI track');if(kind!=='MTrk'){p=end;continue;}let tick=0,running=0;
  const variable=()=>{let n=0,v;do{v=b[p++];n=(n<<7)|(v&127);}while(v&128);return n;};
  while(p<end){tick+=variable();let status=b[p];if(status&128){p++;if(status<240)running=status;}else status=running;
   if(status===255){const type=b[p++],len=variable();if(type===81)events.push({tick,ordinal:ordinal++,tempo:b.readUIntBE(p,3)});p+=len;}
   else if(status===240||status===247){const len=variable();p+=len;}
   else {const kind=status>>4,ch=status&15,a=b[p++],v=kind===12||kind===13?0:b[p++];events.push({tick,ordinal:ordinal++,kind,ch,a,v});}
  }p=end;
 }
 events.sort((a,b)=>a.tick-b.tick||a.ordinal-b.ordinal);let tick=0,time=0,tempo=500000;const programs=Array(16).fill(0),volumes=Array(16).fill(1),sustain=Array(16).fill(false),active=new Map(),held=[],notes=[];
 const finish=(n,t)=>{n[1]=Math.max(.025,t-n[0]);notes.push(n);};
 for(const e of events){time+=(e.tick-tick)*tempo/division/1e6;tick=e.tick;if(e.tempo){tempo=e.tempo;continue;}
  const key=e.ch*128+e.a;if(e.kind===12)programs[e.ch]=e.a;
  if(e.kind===11){if(e.a===7)volumes[e.ch]=e.v/127;if(e.a===64){sustain[e.ch]=e.v>=64;if(!sustain[e.ch])for(let i=held.length-1;i>=0;i--)if(held[i][4]===e.ch){finish(held[i],time);held.splice(i,1);}}if(e.a===120||e.a===123)for(const [k,n]of active)if(n[4]===e.ch){finish(n,time);active.delete(k);}}
  if(e.kind===9&&e.v){if(active.has(key))finish(active.get(key),time);active.set(key,[time,0,e.a,e.v/127*volumes[e.ch],e.ch,programs[e.ch]]);}
  if(e.kind===8||e.kind===9&&!e.v){const n=active.get(key);if(n){active.delete(key);if(sustain[e.ch]&&e.ch!==9)held.push(n);else finish(n,time);}}
 }
 for(const n of [...active.values(),...held])finish(n,time);notes.sort((a,b)=>a[0]-b[0]);return {duration:Math.max(time,...notes.map(n=>n[0]+n[1]))+.15,notes:notes.map(n=>n.map(v=>Math.round(v*10000)/10000))};
}
const tracks={};for(const r of context.window.ORIGINAL_AUDIO.filter(r=>r.kind==='music'))tracks[r.handle]=decode(fs.readFileSync('assets/audio/'+r.file));
fs.writeFileSync('assets/audio/music-data.js','window.ORIGINAL_MUSIC='+JSON.stringify(tracks)+';\n');
console.log(Object.entries(tracks).map(([id,t])=>`${id}: ${t.notes.length} notes, ${t.duration.toFixed(1)} seconds`).join('\n'));
