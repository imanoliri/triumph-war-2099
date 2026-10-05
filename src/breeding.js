'use strict';
// Source opportunities; independent RNG and 50 Hz animation conversion are approximations.
window.TriumphBreeding=(()=>{
 const interval=.5,duration=2.4,birthTime=1.8;
 function create(seed,successBins=4){return {successBins,seed:seed>>>0,clock:0,next:interval,busy:null,opportunities:0,successes:0,births:0,busySkipped:0,capSkipped:0};}
 function roll(state){state.seed=(Math.imul(state.seed,1664525)+1013904223)>>>0;return Math.floor(state.seed/4294967296*100);}
 function advance(nest,dt,{capacity,spawn,randomRoll=roll}){
  const b=nest.breeding;if(!b)return;
  if(nest.hp<=0){b.busy=null;return;}
  const end=b.clock+dt;
  while(true){
   const birth=b.busy&&!b.busy.emitted?b.busy.start+birthTime:Infinity;
   const finish=b.busy?b.busy.start+duration:Infinity;
   const at=Math.min(b.next,birth,finish);if(at>end+1e-8)break;b.clock=at;
   if(at===birth){b.busy.emitted=true;if(capacity()){spawn(nest);b.births++;}else b.capSkipped++;}
   if(at===finish)b.busy=null;
   if(at===b.next){b.next+=interval;b.opportunities++;const value=randomRoll(b);if(value>=0&&value<b.successBins){b.successes++;if(b.busy)b.busySkipped++;else if(!capacity())b.capSkipped++;else b.busy={start:at,emitted:false};}}
  }
  b.clock=end;
 }
 function frame(nest){const b=nest.breeding;return b?.busy?Math.min(11,Math.floor((b.clock-b.busy.start)/.2+1e-9)):null;}
 return {create,roll,advance,frame,interval,duration,birthTime};
})();
