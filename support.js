'use strict';
// Native path coordinates are recovered. Speed and pause conversion use a 50 Hz
// compatibility clock (speed / 8 pixels per tick, pause measured in ticks).
(() => {
 function path(object,x,y){const data=window.ORIGINAL.objects[object]?.movement?.path;if(!data?.steps.length)return null;const p={data,x,y,originX:x,originY:y,index:0,sign:1,done:false,angle:0};enter(p);return p;}
 function enter(p){const step=p.data.steps[p.index];p.fromX=p.x;p.fromY=p.y;p.toX=p.x+step.dx*p.sign;p.toY=p.y+step.dy*p.sign;p.length=Math.hypot(step.dx,step.dy);p.progress=0;p.pause=step.pause/50;p.speed=step.speed*6.25;p.angle=Math.atan2(step.dy*p.sign,step.dx*p.sign);}
 function next(p){p.index+=p.sign;if(p.index>=p.data.steps.length){if(p.data.reverse){p.sign=-1;p.index=p.data.steps.length-1;}else if(p.data.loop){p.index=0;if(p.data.reposition){p.x=p.originX;p.y=p.originY;}}else {p.done=true;return;}}else if(p.index<0){if(p.data.loop){p.sign=1;p.index=0;}else {p.done=true;return;}}enter(p);}
 function advance(p,dt){if(!p||p.done)return;for(let safety=0;dt>1e-9&&!p.done&&safety<128;safety++){
  if(p.pause>0){const used=Math.min(dt,p.pause);p.pause-=used;dt-=used;if(dt<=1e-9)break;}
  if(p.length===0){next(p);continue;}if(!p.speed)break;
  const used=Math.min(dt,(p.length-p.progress)/p.speed);p.progress+=p.speed*used;dt-=used;const ratio=Math.min(1,p.progress/p.length);p.x=p.fromX+(p.toX-p.fromX)*ratio;p.y=p.fromY+(p.toY-p.fromY)*ratio;
  if(ratio>=1-1e-9){p.x=p.toX;p.y=p.toY;next(p);}
 }}
 const compare=(left,op,right)=>[()=>left===right,()=>left!==right,()=>left<=right,()=>left<right,()=>left>=right,()=>left>right][op]?.()||false;
 function choose(data,item){return data.cases.find(c=>c.item===item&&c.guards.every(g=>compare(data.globals[g.global]||0,g.comparison,g.value)));}
 window.TriumphSupport={path,advance,choose,compare};
})();
