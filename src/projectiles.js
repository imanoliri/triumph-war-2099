'use strict';
// Advance only the caller's projectiles; all world/damage/audio services are explicit.
window.TriumphProjectiles={
step(s,dt,{W,H,blocked,dist,damage,destroyProp,wormExposed,sound,tone,burst,emitAcousticEvent}){
 for(let i=s.bullets.length-1;i>=0;i--){
  const b=s.bullets[i];if((b.riveter||b.mercenary)&&dt>1/b.speed){const local={...s,bullets:[b]};let remaining=Math.min(dt,Math.max(0,b.life));while(remaining>1e-9&&local.bullets.length){const slice=Math.min(remaining,1/b.speed);window.TriumphProjectiles.step(local,slice,{W,H,blocked,dist,damage,destroyProp,wormExposed,sound,tone,burst,emitAcousticEvent});remaining-=slice;}if(!local.bullets.length||b.life<=1e-9)s.bullets.splice(i,1);continue;}if(b.grenadier){
   let travel=Math.min(b.remaining,b.speed*dt),hit=false;while(travel>1e-9){const step=Math.min(1,travel),x=b.x+b.dx*step,y=b.y+b.dy*step;if(x<0||x>W||y<0||y>H||blocked(x,y)||(s.props||[]).some(p=>p.hp>0&&x>=p.left&&x<p.left+p.w&&y>=p.top&&y<p.top+p.h)){hit=true;break;}b.x=x;b.y=y;b.remaining-=step;travel-=step;}b.life-=dt;
   if(hit||b.remaining<=1e-9){window.TriumphMaritimeTroopers.explode(b,s,{blocked,damage,burst,emitAcousticEvent,destroyProp,sound});s.bullets.splice(i,1);}continue;
  }const flight=(b.ambusher||b.riveter||b.mercenary)?Math.min(dt,Math.max(0,b.life)):dt;b.x+=b.dx*b.speed*flight;b.y+=b.dy*b.speed*flight;b.life-=dt;
  let hit=false;
  if(b.team==='human')for(const p of s.props||[])if(p.hp>0&&b.x>=p.left&&b.x<p.left+p.w&&b.y>=p.top&&b.y<p.top+p.h){
   p.hp-=b.damage;hit=true;if(p.hp<=0)destroyProp(p);break;
  }
  if(b.team==='alien')for(const d of s.doors||[])if(!d.open&&b.x>=d.x&&b.x<d.x+d.w&&b.y>=d.y&&b.y<d.y+d.h){
   d.damage++;sound(34,.12);
   if(d.durability&&d.damage>=d.durability){d.open=true;d.destroyed=true;burst(d.cx,d.cy,30);sound(23,.4);}
   hit=true;break;
  }
  hit=hit||b.x<0||b.x>W||b.y<0||b.y>H||blocked(b.x,b.y);
  if(!hit&&b.team==='human'&&s.terminal&&!s.terminal.active&&dist(b,s.terminal)<14){
   s.terminal.active=true;if(s.gate)s.gate.open=true;hit=true;tone(800,.15);
  }
  if(!hit&&b.team==='alien'&&s.reinforcements.some(r=>r.kind==='carrier'&&dist(r,b)<30))hit=true;
  if(!hit&&b.team==='alien'&&s.humans.some(u=>u.alive&&u.shieldUntil>s.t&&dist(u,b)<24))hit=true;
  if(!hit){
   const targets=b.team==='human'?s.aliens:s.humans;
   for(const a of targets)if(a.alive&&(a.type!=='desert-worm'||wormExposed(a))&&dist(a,b)<(a.type==='desert-worm'?12:a.type==='queen'?17:a.type==='tank'||a.type==='convoy-crawler'?17:8)){
    damage(a,b.damage,b.owner,{kind:'projectile',dx:b.dx,dy:b.dy});if(b.suppression)window.TriumphMaritimeTroopers.suppress(a,s.t);hit=true;break;
   }
  }
  if(!hit&&b.team==='human')for(const n of s.nests)if(n.hp>0&&dist(n,b)<26){
   n.hp-=b.damage;hit=true;if(emitAcousticEvent)emitAcousticEvent({x:n.x,y:n.y},280);if(n.hp<=0){burst(n.x,n.y,40);if(b.owner)s.score[b.owner-1]+=100;}break;
  }
  if(!hit&&b.team==='alien'&&s.crystal&&dist(b,s.crystal)<14){s.crystal.hp-=b.damage;hit=true;}
  if(hit&&b.plasma&&!b.spark){
   for(let k=0;k<6;k++){const a=k*Math.PI/3;s.bullets.push({...b,dx:Math.cos(a),dy:Math.sin(a),life:.2,speed:160,damage:1,spark:true});}
   burst(b.x,b.y,10,'#66bbff');
  }
  if(hit||b.life<=0)s.bullets.splice(i,1);
 }
}
};
