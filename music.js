'use strict';
// Original MIDI performances, synthesized locally without downloads or network access.
(() => {
 let context,timer,track,origin=0,cursor=0,enabled=true,unlocked=false,paused=false;
 const voices=new Set(),buffers=new Map();
 function sampled(n,when){const bank=window.WINDOWS_MIDI_BANK;if(!bank||!context.createBufferSource)return false;
  const [start,duration,pitch,velocity,channel,program]=n,drum=channel===9;
  const regions=bank.instruments[(drum?'drum:':'melodic:')+program]||bank.instruments[(drum?'drum:':'melodic:')+'0'];
  const region=regions?.find(r=>pitch>=r.low&&pitch<=r.high&&velocity*127>=r.vlow&&velocity*127<=r.vhigh);if(!region)return false;
  const wave=bank.waves[region.wave],sample=region.sample||wave.sample;if(!sample)return false;
  if(!buffers.has(region.wave)){const bytes=atob(wave.pcm),buffer=context.createBuffer(1,wave.frames,wave.rate),pcm=buffer.getChannelData(0);for(let i=0;i<pcm.length;i++){let v=bytes.charCodeAt(i*2)|(bytes.charCodeAt(i*2+1)<<8);if(v&32768)v-=65536;pcm[i]=v/32768;}buffers.set(region.wave,buffer);}
  const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffers.get(region.wave);
  const rate=2**((pitch-sample.root+sample.fine/100)/12);source.playbackRate.setValueAtTime(rate,when);
  const loop=sample.loops[0];if(!drum&&loop){source.loop=true;source.loopStart=loop[0]/wave.rate;source.loopEnd=(loop[0]+loop[1])/wave.rate;}
  const release=drum?.03:program<8?.35:.18,length=drum?wave.frames/wave.rate/rate:duration,level=Math.max(.0001,velocity*sample.gain*.22);
  gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(level,when+.006);gain.gain.setValueAtTime(level,when+Math.max(.007,length));gain.gain.exponentialRampToValueAtTime(.0001,when+length+release);
  source.connect(gain);gain.connect(context.destination);voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();gain.disconnect();};source.start(when);source.stop(when+length+release+.02);return true;
 }
 function stop(){if(timer)clearInterval(timer);timer=null;for(const v of voices){try{v.stop();}catch{}}voices.clear();}
 function note(n,when){const [start,duration,pitch,velocity,channel,program]=n;
  if(voices.size>192)return;if(sampled(n,when))return;const g=context.createGain(),o=context.createOscillator();
  const drum=channel===9,family=program>>3;
  o.type=drum?'triangle':[0,1,2,6,9,11,12].includes(family)?'sine':[3,4,5,10].includes(family)?'triangle':family===7?'square':'sawtooth';
  const frequency=440*2**((pitch-69)/12),length=drum?Math.min(duration,.18):Math.min(duration,20),level=velocity*(drum?.045:.025);
  o.frequency.setValueAtTime(drum?pitch<40?105:210+pitch*5:frequency,when);
  if(drum)o.frequency.exponentialRampToValueAtTime(pitch<40?40:90,when+length);
  g.gain.setValueAtTime(0,when);g.gain.linearRampToValueAtTime(level,when+.008);
  g.gain.exponentialRampToValueAtTime(Math.max(.0001,level*(family<3?.25:.65)),when+Math.max(.012,length));
  g.gain.exponentialRampToValueAtTime(.0001,when+length+.08);
  o.connect(g);g.connect(context.destination);voices.add(o);o.onended=()=>{voices.delete(o);o.disconnect();g.disconnect();};o.start(when);o.stop(when+length+.09);
 }
 function schedule(){if(!track||!context||context.state!=='running')return;const horizon=context.currentTime+.25;
  while(origin+track.duration<context.currentTime){origin+=track.duration;cursor=0;}
  while(cursor<track.notes.length&&origin+track.notes[cursor][0]<horizon){const n=track.notes[cursor++],when=origin+n[0];if(when>=context.currentTime-.03)note(n,Math.max(context.currentTime,when));}
  if(cursor===track.notes.length&&origin+track.duration<horizon){origin+=track.duration;cursor=0;}
 }
 function start(){stop();if(!enabled||!track||!unlocked)return;context??=new(window.AudioContext||window.webkitAudioContext)();paused=false;context.resume().catch(()=>{});origin=context.currentTime+.05;cursor=0;schedule();timer=setInterval(schedule,75);}
 window.TriumphMusic={unlock(){if(unlocked)return;unlocked=true;start();},select(handle){const next=window.ORIGINAL_MUSIC?.[handle];if(next===track)return;track=next;start();},enabled(value){enabled=value;start();},pause(value){if(!context||value===paused)return;paused=value;if(value)context.suspend().catch(()=>{});else context.resume().catch(()=>{});},stop};
})();
