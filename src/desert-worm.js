// Custom-authored geometry and mechanics; no recovered original-game data.
(function(){
 'use strict';
 const rules=Object.freeze({hp:16,burrowSpeed:60,burrowTime:1,triggerRange:180,warningTime:1.2,chargeSpeed:300,chargeRange:260,recoveryTime:1.5,damage:2,radius:12});
 const isWorm=u=>u?.type==='desert-worm';
 const exposed=u=>!isWorm(u)||u.phase!=='burrow';
 function clear(x,y,blocked){const r=rules.radius;for(let dx=-r;dx<=r;dx+=2)for(let dy=-r;dy<=r;dy+=2)if(blocked(x+dx,y+dy))return false;return true;}
 function laneClear(u,target,blocked){const horizontal=Math.abs(target.x-u.x)>=Math.abs(target.y-u.y),dx=horizontal?(target.x<u.x?-1:1):0,dy=horizontal?0:(target.y<u.y?-1:1),length=horizontal?Math.abs(target.x-u.x):Math.abs(target.y-u.y);for(let n=0;n<=length;n+=2)if(!clear(u.x+dx*n,u.y+dy*n,blocked))return false;return true;}
 function create(x,y,blocked){if(!Number.isFinite(x)||!Number.isFinite(y)||!clear(x,y,blocked))return null;return {x,y,type:'desert-worm',team:'alien',alive:true,hp:rules.hp,angle:0,phase:'burrow',phaseTime:rules.burrowTime,telegraph:null,chargeHits:new Set()};}
 function ground(u){return u.alive&&u.hp>0&&u.type!=='air';}
 function step(u,dt,{humans,blocked,damage,route}){
  if(!u.alive||dt<=0)return;
  u.phaseTime-=dt;
  if(u.phase==='burrow'){
   const target=humans.filter(ground).sort((a,b)=>Math.hypot(a.x-u.x,a.y-u.y)-Math.hypot(b.x-u.x,b.y-u.y))[0];
   if(!target)return;
   const dx=target.x-u.x,dy=target.y-u.y,d=Math.hypot(dx,dy);
   if(d<=rules.triggerRange&&Math.min(Math.abs(dx),Math.abs(dy))<=8&&u.phaseTime<=0&&laneClear(u,target,blocked)){
    const horizontal=Math.abs(dx)>=Math.abs(dy),sx=horizontal?(dx<0?-1:1):0,sy=horizontal?0:(dy<0?-1:1);
    u.angle=Math.atan2(sy,sx);u.phase='warning';u.phaseTime=rules.warningTime;
    u.telegraph={x:u.x,y:u.y,dx:sx,dy:sy,range:rules.chargeRange,width:rules.radius*2,warningRemaining:rules.warningTime};
   }else if(d){const next=route?route(u,target):target;if(!next)return;const mx=next.x-u.x,my=next.y-u.y,md=Math.hypot(mx,my);if(!md)return;const travel=Math.min(md,rules.burrowSpeed*dt);for(let moved=0;moved<travel;){const n=Math.min(2,travel-moved),x=u.x+mx/md*n,y=u.y+my/md*n;if(!clear(x,y,blocked))break;u.x=x;u.y=y;moved+=n;}}
   return;
  }
  if(u.phase==='warning'){u.telegraph.warningRemaining=Math.max(0,u.phaseTime);if(u.phaseTime<=0){u.phase='charge';u.remaining=rules.chargeRange;u.chargeHits.clear();}return;}
  if(u.phase==='recovery'){if(u.phaseTime<=0){u.phase='burrow';u.phaseTime=rules.burrowTime;u.telegraph=null;}return;}
  const lane=u.telegraph,travel=Math.min(u.remaining,rules.chargeSpeed*dt);
  for(let moved=0;moved<travel;){const n=Math.min(2,travel-moved),x=u.x+lane.dx*n,y=u.y+lane.dy*n;if(!clear(x,y,blocked)){u.remaining=0;break;}u.x=x;u.y=y;moved+=n;u.remaining-=n;
   for(const h of humans)if(ground(h)&&!u.chargeHits.has(h)&&Math.hypot(h.x-u.x,h.y-u.y)<=rules.radius+(h.type==='tank'?17:8)){u.chargeHits.add(h);damage(h,rules.damage,0);}
  }
  if(u.remaining<=0){u.phase='recovery';u.phaseTime=rules.recoveryTime;u.telegraph=null;}
 }
 function draw(ctx,u,time){
  ctx.save();
  if(u.telegraph){const t=u.telegraph;ctx.strokeStyle=u.phase==='warning'?'#ffcf68':'#da8d43';ctx.lineWidth=t.width;ctx.globalAlpha=.18;ctx.beginPath();ctx.moveTo(t.x,t.y);ctx.lineTo(t.x+t.dx*t.range,t.y+t.dy*t.range);ctx.stroke();ctx.globalAlpha=1;ctx.lineWidth=2;ctx.setLineDash([8,6]);ctx.stroke();ctx.setLineDash([]);}
  ctx.translate(Math.round(u.x),Math.round(u.y));ctx.rotate(u.angle);
  if(u.phase==='burrow'){ctx.strokeStyle='#c59c62';ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(-i*7,0,4,6+Math.sin(time*8+i),0,0,Math.PI*2);ctx.stroke();}}
  else {ctx.fillStyle='#593626';ctx.beginPath();ctx.ellipse(-3,0,9,10,0,0,Math.PI*2);ctx.fill();for(let i=0;i<3;i++){ctx.fillStyle=i%2?'#bf874c':'#e2b676';ctx.fillRect(-11+i*5,-9,4,18);}ctx.fillStyle='#40271e';ctx.beginPath();ctx.ellipse(7,0,5,10,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff0bb';ctx.fillRect(8,-7,3,4);ctx.fillRect(8,3,3,4);if(u.phase==='warning'){ctx.strokeStyle='#ffdd83';ctx.lineWidth=3;ctx.strokeRect(-15,-15,30,30);}}
  ctx.restore();
 }
 window.TriumphDesertWorm=Object.freeze({rules,isWorm,exposed,clear,create,step,draw});
})();
