'use strict';
// Original MIDI performances, synthesized locally without downloads or network access.
(() => {
 let context,timer,track,origin=0,cursor=0,enabled=true,unlocked=false,paused=false;
 const voices=new Set();
 function stop(){if(timer)clearInterval(timer);timer=null;for(const v of voices){try{v.stop();}catch{}}voices.clear();}
 function note(n,when){const [start,duration,pitch,velocity,channel,program]=n;
  if(voices.size>192)return;const g=context.createGain(),o=context.createOscillator();
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
 function start(){stop();if(!enabled||!track||!unlocked)return;context??=new(window.AudioContext||window.webkitAudioContext)();context.resume().catch(()=>{});origin=context.currentTime+.05;cursor=0;schedule();timer=setInterval(schedule,75);}
 window.TriumphMusic={unlock(){if(unlocked)return;unlocked=true;start();},select(handle){const next=window.ORIGINAL_MUSIC?.[handle];if(next===track)return;track=next;start();},enabled(value){enabled=value;start();},pause(value){if(!context||value===paused)return;paused=value;if(value)context.suspend().catch(()=>{});else context.resume().catch(()=>{});},stop};
})();
