'use strict';
// Authored Maritime kits. Mutable weapon/stop state belongs to actors and mission.
window.TriumphMaritimeTroopers=(()=>{
 const rules=Object.freeze({suppressorRange:200,rounds:4,interval:.38,reload:1.5,stop:1,grenadierRange:240,blast:40,damage:2,grenadierReload:3,projectileSpeed:220});
 const isMaritime=u=>['suppressor','grenadier'].includes(u?.type);
 function initialize(u){if(u.type==='suppressor')u.suppressor={rounds:0,readyAt:0};if(u.type==='grenadier')u.grenadier={readyAt:0,target:null};}
 function suppress(u,time){if(u.team==='alien'&&u.alive&&u.hp>0&&u.type!=='desert-worm')u.stoppedUntil=time+rules.stop;}
 const stopped=(u,time)=>u.team==='alien'&&u.stoppedUntil>time;
 function ready(u,time){return time+1e-9>=u.suppressor.readyAt;}
 function fired(u,time){const q=u.suppressor;q.rounds++;if(q.rounds===rules.rounds){q.rounds=0;q.readyAt=time+rules.reload;}else q.readyAt=time+rules.interval;u.cool=0;}
 function clear(from,to,{blocked,props=[]}){const d=Math.hypot(to.x-from.x,to.y-from.y);for(let t=0;t<=d;t+=Math.min(1,d-t||1)){const x=from.x+(to.x-from.x)*(d?t/d:0),y=from.y+(to.y-from.y)*(d?t/d:0);if(blocked(x,y)||props.some(p=>p.hp>0&&x>=p.left&&x<p.left+p.w&&y>=p.top&&y<p.top+p.h))return false;}return true;}
 function legal(u,p,terrain){return Math.hypot(p.x-u.x,p.y-u.y)<=rules.grenadierRange+1e-9&&clear(u,p,terrain);}
 // Estimate velocity from observed simulation positions, then aim at a compact visible group.
 function observe(s,dt){for(const a of s.aliens){const previous=a.grenadeMotion;a.grenadeVelocity=previous&&dt>0?{x:(a.x-previous.x)/dt,y:(a.y-previous.y)/dt}:{x:0,y:0};a.grenadeMotion={x:a.x,y:a.y};}}
 function target(u,fallback,s,terrain){const seen=[...s.aliens,...s.nests].filter(a=>a.alive!==false&&a.hp>0&&a.phase!=='burrow'&&legal(u,a,terrain));if(u.focusTarget)return legal(u,fallback,terrain)?{x:fallback.x,y:fallback.y}:null;
  let best=null;for(const seed of seen){const group=seen.filter(a=>Math.hypot(a.x-seed.x,a.y-seed.y)<=rules.blast),flight=Math.hypot(seed.x-u.x,seed.y-u.y)/rules.projectileSpeed;const p={x:0,y:0};for(const a of group){p.x+=a.x+(a.grenadeVelocity?.x||0)*flight;p.y+=a.y+(a.grenadeVelocity?.y||0)*flight;}p.x/=group.length;p.y/=group.length;
   const aim=legal(u,p,terrain)?p:{x:seed.x,y:seed.y};if(!best||group.length>best.count||group.length===best.count&&Math.hypot(aim.x-u.x,aim.y-u.y)<best.distance)best={...aim,count:group.length,distance:Math.hypot(aim.x-u.x,aim.y-u.y)};
  }return best;
 }
 function lane(u,p){const angle=Math.round(Math.atan2(p.y-u.y,p.x-u.x)/(Math.PI/4))*Math.PI/4,c=Math.cos(angle),sn=Math.sin(angle),dx=p.x-u.x,dy=p.y-u.y;return {angle,along:dx*c+dy*sn,offset:-dx*sn+dy*c};}
 function fire(u,s,terrain){const q=u.grenadier,p=q.target;if(s.t<q.readyAt-1e-9||!p||!legal(u,p,terrain))return false;const ray=lane(u,p),length=ray.along;u.angle=ray.angle;if(length<1||Math.abs(ray.offset)>=7)return false;const end={x:u.x+Math.cos(ray.angle)*length,y:u.y+Math.sin(ray.angle)*length};if(!legal(u,end,terrain))return false;s.bullets.push({x:u.x,y:u.y,dx:Math.cos(ray.angle),dy:Math.sin(ray.angle),speed:rules.projectileSpeed,life:length/rules.projectileSpeed,remaining:length,team:'human',owner:u.id,damage:rules.damage,grenadier:true});q.readyAt=s.t+rules.grenadierReload;u.cool=rules.grenadierReload;return true;}
 function explode(b,s,{damage,burst,emitAcousticEvent,destroyProp,sound,blocked}){burst(b.x,b.y,rules.blast,'#ffc76c');emitAcousticEvent?.(b,280);sound(23,.25);for(const a of s.aliens)if(a.alive&&Math.hypot(a.x-b.x,a.y-b.y)<=rules.blast&&clear(b,a,{blocked,props:[]}))damage(a,rules.damage,b.owner);for(const n of s.nests)if(n.hp>0&&Math.hypot(n.x-b.x,n.y-b.y)<=rules.blast&&clear(b,n,{blocked,props:[]})){n.hp-=rules.damage;emitAcousticEvent?.(n,280);if(n.hp<=0){burst(n.x,n.y,40);if(b.owner)s.score[b.owner-1]+=100;}}for(const p of s.props||[])if(p.hp>0&&Math.hypot(p.x-b.x,p.y-b.y)<=rules.blast){p.hp-=rules.damage;if(p.hp<=0)destroyProp(p);}}
 return {rules,isMaritime,initialize,suppress,stopped,ready,fired,clear,legal,observe,target,lane,fire,explode};
})();
