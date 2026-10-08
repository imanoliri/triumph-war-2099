'use strict';
// Authored Jungle defense. Actors, clock and collision services belong to caller.
window.TriumphRecon=(()=>{
 const rules=Object.freeze({lookahead:.15,duration:.25,distance:48,cooldown:3,radius:8});
 function initialize(u){if(u.type==='recon')u.recon={readyAt:0,until:0,last:null,dash:null};}
 const active=(u,t)=>u.type==='recon'&&!!u.recon?.dash&&t<u.recon.until;
 function clear(x,y,{blocked,W,H}){return x>=12&&x<=W-12&&y>=38&&y<=H-16&&!blocked(x,y);}
 function sweep(a,b,terrain){const len=Math.hypot(b.x-a.x,b.y-a.y);for(let n=0;n<=Math.ceil(len);n++){const f=n/Math.max(1,Math.ceil(len));if(!clear(a.x+(b.x-a.x)*f,a.y+(b.y-a.y)*f,terrain))return false;}return true;}
 function imminent(u,b,terrain){if(b.team!=='alien'||b.life<=0||b.speed<=0)return false;const vx=b.dx*b.speed,vy=b.dy*b.speed,den=vx*vx+vy*vy;if(!den)return false;const horizon=Math.min(rules.lookahead,b.life),t=Math.max(0,Math.min(horizon,((u.x-b.x)*vx+(u.y-b.y)*vy)/den)),p={x:b.x+vx*t,y:b.y+vy*t};if(Math.hypot(p.x-u.x,p.y-u.y)>=rules.radius)return false;
  // A projectile screened by terrain/closed doors cannot trigger a free evade.
  const len=Math.hypot(p.x-b.x,p.y-b.y);for(let n=1;n<=Math.ceil(len);n++){const f=n/Math.max(1,Math.ceil(len)),x=b.x+(p.x-b.x)*f,y=b.y+(p.y-b.y)*f;if(terrain.blocked(x,y)||x<0||x>terrain.W||y<0||y>terrain.H)return false;}return true;
 }
 function start(u,t,threat,terrain){if(u.type!=='recon'||!u.alive||!u.recon||u.recon.dash||t<u.recon.readyAt)return false;
  const velocity=threat.kind==='projectile'?{x:threat.dx,y:threat.dy}:{x:u.x-threat.x,y:u.y-threat.y},len=Math.hypot(velocity.x,velocity.y);if(!len)return false;const v={x:velocity.x/len,y:velocity.y/len},last=u.recon.last,moving=u.movingUntil>t&&last&&Math.hypot(u.x-last.x,u.y-last.y)>.01,heading=moving?Math.atan2(u.y-last.y,u.x-last.x):null;
  const directions=[...(moving?[heading]:[]),Math.atan2(v.x,-v.y),Math.atan2(-v.x,v.y),...(threat.kind==='melee'?[Math.atan2(v.y,v.x)]:[])];
  for(const angle of directions)for(const distance of [48,36,24,12]){const to={x:u.x+Math.cos(angle)*distance,y:u.y+Math.sin(angle)*distance};if(!sweep(u,to,terrain))continue;
   // Moving directly along a projectile lane is safe only if it outruns the threat.
   if(threat.kind==='projectile'){const speed=threat.speed||120,px=threat.x+threat.dx*speed*rules.duration,py=threat.y+threat.dy*speed*rules.duration,dx=to.x-threat.x,dy=to.y-threat.y,along=dx*threat.dx+dy*threat.dy,across=Math.abs(dx*threat.dy-dy*threat.dx);if(across<rules.radius+1&&along>=0&&Math.hypot(to.x-px,to.y-py)<rules.radius+12)continue;}
   else if(Math.hypot(to.x-threat.x,to.y-threat.y)<=13)continue;
   u.recon.returning=u.order===3;u.recon.dash={from:{x:u.x,y:u.y},to,start:t};u.recon.until=t+rules.duration;u.recon.readyAt=t+rules.cooldown;return true;
  }return false;
 }
 function step(u,t,bullets,terrain){if(u.type!=='recon'||!u.alive)return false;const r=u.recon;if(!r)return false;
  if(!r.dash)for(const b of bullets)if(imminent(u,b,terrain)&&start(u,t,{...b,kind:'projectile'},terrain))break;
  if(r.dash){const d=r.dash,f=Math.min(1,Math.max(0,(t-d.start)/rules.duration)),to={x:d.from.x+(d.to.x-d.from.x)*f,y:d.from.y+(d.to.y-d.from.y)*f};if(!sweep(u,to,terrain)){r.dash=null;r.until=t;return false;}u.x=to.x;u.y=to.y;u.movingUntil=t+.1;if(f>=1){r.dash=null;r.last={x:u.x,y:u.y};return false;}return true;}return false;
 }
 function observe(u){if(u.type==='recon'&&!u.recon.dash)u.recon.last={x:u.x,y:u.y};}
 return {rules,initialize,active,imminent,start,step,observe,sweep};
})();
