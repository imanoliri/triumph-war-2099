const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let scheduled=0,interval,stopped=0;
class Context{
 constructor(){this.currentTime=0;this.state='running';this.destination={};}
 resume(){this.state='running';return Promise.resolve();}
 suspend(){this.state='suspended';return Promise.resolve();}
 createGain(){return {gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}
 createOscillator(){return {frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){},start(){scheduled++},stop(){stopped++}};}
}
const sandbox={window:{AudioContext:Context},setInterval:fn=>(interval=fn,1),clearInterval:()=>{interval=null},console};vm.createContext(sandbox);
for(const f of ['assets/audio/music-data.js','assets/original-rules.js','music.js'])vm.runInContext(fs.readFileSync(f,'utf8'),sandbox);
const tracks=sandbox.window.ORIGINAL_MUSIC;assert.equal(Object.keys(tracks).length,14);
for(const t of Object.values(tracks)){assert(t.duration>0);assert(t.notes.length>0);for(let i=0;i<t.notes.length;i++){const n=t.notes[i];assert(n.every(Number.isFinite));assert(n[1]>0);assert(n[2]>=0&&n[2]<=127);if(i)assert(n[0]>=t.notes[i-1][0]);}}
for(const rule of Object.values(sandbox.window.ORIGINAL_RULES.maps))assert(tracks[rule.music],'Every mission must use an original MIDI track');
const music=sandbox.window.TriumphMusic;music.select(0);assert.equal(scheduled,0,'Music must wait for user gesture');music.unlock();interval();assert(scheduled>0,'Original notes must reach audio scheduler');music.pause(true);music.pause(false);music.select(9);assert(stopped>0);music.stop();assert.equal(interval,null);
console.log('Passed all 14 decoded MIDI tracks, nine source mission assignments, gesture start, synthesis scheduling, pause/resume and track switching. Audible timbre remains unverified.');
if(fs.existsSync('assets/audio/gm-bank.js')){
 let samples=0;
 sandbox.atob=value=>Buffer.from(value,'base64').toString('latin1');
 Context.prototype.createBuffer=function(channels,length,rate){assert.equal(channels,1);assert(rate>0);return {getChannelData:()=>new Float32Array(length)};};
 Context.prototype.createBufferSource=function(){return {playbackRate:{setValueAtTime(value){assert(Number.isFinite(value)&&value>0);}},connect(){},disconnect(){},start(){samples++;},stop(){}};};
 vm.runInContext(fs.readFileSync('assets/audio/gm-bank.js','utf8'),sandbox);
 const bank=sandbox.window.WINDOWS_MIDI_BANK;assert.equal(bank.waves.length,495);
 for(let i=0;i<128;i++)assert(bank.instruments['melodic:'+i]);
 for(const regions of Object.values(bank.instruments))for(const region of regions){const wave=bank.waves[region.wave];assert(wave);assert(region.sample);assert.equal(Buffer.from(wave.pcm,'base64').length,wave.frames*2);for(const loop of region.sample.loops)assert(loop[0]+loop[1]<=wave.frames);}
 music.select(0);interval();assert(samples>0,'Music should use Windows PCM samples when available');music.stop();
 console.log('Passed Windows MIDI sample integrity, 128 melodic programs, loop bounds and sample-based note scheduling.');
}
