'use strict';
// Authored Capital kits. Simulation clock, terrain and damage are explicit inputs.
window.TriumphCapitalTroopers=(()=>{
 const rules=Object.freeze({shieldHP:3,shieldArc:Math.PI/3,shieldRecharge:6,shieldMovement:.75,laserRange:220,laserWidth:8,laserDamage:3,laserReload:4,laserPulse:.15});
 const isCapital=u=>['shield-trooper','laser-cannon'].includes(u?.type);
 function initialize(u){if(u.type==='shield-trooper')u.shield={hp:rules.shieldHP,lastHit:null,brokenUntil:0};if(u.type==='laser-cannon')u.laser={readyAt:0};}
 function recharge(u,time){const q=u.shield;if(q&&q.lastHit!==null&&time-q.lastHit>=rules.shieldRecharge-1e-9){q.hp=rules.shieldHP;q.lastHit=null;}}
 function absorb(u,amount,time,attack){if(u.type!=='shield-trooper')return amount;recharge(u,time);const q=u.shield;q.lastHit=time;
  let from=null;
  if(attack?.kind==='projectile')from=Math.atan2(-attack.dy,-attack.dx);
  else if(attack?.kind==='melee')from=Math.atan2(attack.y-u.y,attack.x-u.x);
  if(from===null||Math.abs(Math.atan2(Math.sin(from-u.angle),Math.cos(from-u.angle)))>rules.shieldArc+1e-9)return amount;
  const absorbed=Math.min(amount,q.hp);q.hp-=absorbed;if(absorbed&&q.hp===0)q.brokenUntil=time+.4;return amount-absorbed;
 }
 const radius=(a,nests)=>nests.includes(a)?26:a.type==='desert-worm'?12:['queen','tank','convoy-crawler'].includes(a.type)?17:8;
 function trace(u,angle,{blocked,props=[]}){const c=Math.cos(angle),sn=Math.sin(angle);let length=rules.laserRange;
  const solid=(x,y)=>blocked(x,y)||props.some(p=>p.hp>0&&x>=p.left&&x<p.left+p.w&&y>=p.top&&y<p.top+p.h);
  for(let d=1;d<=rules.laserRange;d++)if([-4,-3,-2,-1,0,1,2,3,4].some(offset=>solid(u.x+c*d-sn*offset,u.y+sn*d+c*offset))){length=d-1;break;}
  return {x:u.x,y:u.y,angle,length};
 }
 function intersects(ray,a,nests=[]){const dx=a.x-ray.x,dy=a.y-ray.y,c=Math.cos(ray.angle),sn=Math.sin(ray.angle),along=dx*c+dy*sn,across=Math.abs(-dx*sn+dy*c),r=radius(a,nests);const side=Math.max(0,across-rules.laserWidth/2),end=Math.max(0,along-ray.length);
  // Range is inclusive at the enemy center; the beam has no damaging tail beyond 220px.
  return along>=0&&along<=rules.laserRange&&side*side+end*end<=r*r&&ray.length>0;
 }
 function targets(s){return [...new Set([...s.aliens,...s.nests])].filter(a=>a.alive!==false&&a.hp>0&&a.phase!=='burrow');}
 function heading(u,target,s,terrain){const direct=Math.round(Math.atan2(target.y-u.y,target.x-u.x)/(Math.PI/4))*Math.PI/4;if(u.focusTarget)return direct;
  let best=direct,count=-1;for(let i=0;i<8;i++){const angle=i*Math.PI/4,ray=trace(u,angle,terrain),hits=targets(s).filter(a=>intersects(ray,a,s.nests));if(hits.length>count||hits.length===count&&Math.abs(Math.atan2(Math.sin(angle-direct),Math.cos(angle-direct)))<1e-9){best=angle;count=hits.length;}}
  return count>0?best:direct;
 }
 function fire(u,s,{blocked,damage,burst,emitAcousticEvent}){u.laser??={readyAt:0};if(s.t<u.laser.readyAt-1e-9)return false;u.angle=Math.round(u.angle/(Math.PI/4))*Math.PI/4;const ray=trace(u,u.angle,{blocked,props:s.props});
  for(const a of targets(s))if(intersects(ray,a,s.nests)){if(s.nests.includes(a)){a.hp-=rules.laserDamage;if(emitAcousticEvent)emitAcousticEvent(a,280);if(a.hp<=0){burst(a.x,a.y,40);if(u.id)s.score[u.id-1]+=100;}}else damage(a,rules.laserDamage,u.id);}
  s.laserPulses??=[];s.laserPulses.push({...ray,until:s.t+rules.laserPulse});u.laser.readyAt=s.t+rules.laserReload;u.cool=rules.laserReload;return true;
 }
 return {rules,isCapital,initialize,recharge,absorb,trace,intersects,heading,fire};
})();
