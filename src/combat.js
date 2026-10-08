'use strict';
// Combat state belongs to the caller. Access the current mission on every operation.
window.TriumphCombat={create({getState,burstRules,tankSweepRules,cannonSweepRules,rnd,visible,dist,blocked,navigate,cardinal,diagonal,cannonAngle,getDifficulty,bugFireBases,specialistRules,desertRiders,originalAudio,sound,tone,damage,emitAcousticEvent}){
function enemyFireDelay(u){if(u.type==='redbug'){const r=specialistRules.redbug;return r.fireMin+rnd()*(r.fireMax-r.fireMin);}const difficulty=getDifficulty(),base=bugFireBases[difficulty]||3.8;return base+rnd()*1.6+(u.type==='queen'?.4:0);}
function trackBurst(u,target){
 const rule=u.team==='human'&&burstRules[u.type];if(!rule)return;
 const b=u.burst??={target:null,remaining:0,readyAt:0,restUntil:0};
 if(target&&(target.alive===false||target.hp<=0||!visible(u,target)))target=null;
 if(b.target!==target){b.target=target;b.remaining=0;u.sweep=null;if(target)b.readyAt=Math.max(b.restUntil,getState().t+rule.delayMin+rnd()*(rule.delayMax-rule.delayMin));}
}
function burstReady(u,target){
 const rule=u.team==='human'&&burstRules[u.type];if(!rule)return true;
 trackBurst(u,target);const b=u.burst;if(!b.target||getState().t<b.readyAt||getState().t<b.restUntil)return false;
 if(!b.remaining)b.remaining=rule.min+Math.floor(rnd()*(rule.max-rule.min+1));return true;
}
function finishBurstShot(u){const rule=u.team==='human'&&burstRules[u.type];if(!rule)return;const b=u.burst;if(--b.remaining===0)b.restUntil=getState().t+rule.restMin+rnd()*(rule.restMax-rule.restMin);}

const angleDifference=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
function tankGroup(u,fallback){
 const r=tankSweepRules,seen=getState().aliens.filter(a=>a.alive&&a.hp>0&&dist(u,a)<r.range&&visible(u,a)).map(a=>({target:a,angle:Math.atan2(a.y-u.y,a.x-u.x)}));
 let best=null;
 for(const seed of seen){const group=seen.filter(p=>{const offset=angleDifference(p.angle,seed.angle);return offset>=-1e-9&&offset<=r.maxArc;}),offsets=group.map(p=>angleDifference(p.angle,seed.angle)),low=Math.min(...offsets),high=Math.max(...offsets);if(!best||group.length>best.count||group.length===best.count&&dist(u,seed.target)<dist(u,best.target))best={target:seed.target,count:group.length,center:seed.angle+(low+high)/2,width:Math.max(r.minArc,Math.min(r.maxArc,high-low+r.padding))};}
 return best||{target:fallback,count:0,center:Math.atan2(fallback.y-u.y,fallback.x-u.x),width:r.minArc};
}
function aimTank(u,target){
 const locked=u.sweep&&u.burst?.remaining>0;
 const focused=u.focusTarget===target,group=locked?null:focused?{target,center:Math.atan2(target.y-u.y,target.x-u.x),width:tankSweepRules.focusArc}:tankGroup(u,target),aim=locked?u.burst.target:group.target;
 if(!aim||aim.alive===false||aim.hp<=0||!visible(u,aim)||dist(u,aim)>=tankSweepRules.range){trackBurst(u,null);return;}
 if(!burstReady(u,aim)||u.cool>0)return;
 if(!u.sweep){const sign=u.nextSweepSign||1;u.nextSweepSign=-sign;u.sweep={start:group.center-sign*group.width/2,width:group.width,sign,total:u.burst.remaining,index:0};}
 const sweep=u.sweep;u.angle=focused?Math.atan2(aim.y-u.y,aim.x-u.x)+sweep.sign*sweep.width*(sweep.index/(sweep.total-1)-.5):sweep.start+sweep.sign*sweep.width*sweep.index/(sweep.total-1);fire(u);sweep.index++;finishBurstShot(u);if(!u.burst.remaining)u.sweep=null;
}
// Mounted sweeps lock their center for the existing operator burst; sprites remain 16-way.
function aimCannon(u,target){
 const aim=u.sweep&&u.burst?.remaining>0?u.burst.target:target;
 if(!aim||aim.alive===false||aim.hp<=0||!visible(u,aim)||dist(u,aim)>=360){trackBurst(u,null);return;}
 if(!burstReady(u,aim)||u.cool>0)return;
 if(!u.sweep){const sign=u.nextSweepSign||1,width=rnd()*cannonSweepRules.maxArc;u.nextSweepSign=-sign;u.sweep={start:Math.atan2(aim.y-u.y,aim.x-u.x)-sign*width/2,width,sign,total:u.burst.remaining,index:0};}
 const sweep=u.sweep,angle=sweep.start+sweep.sign*sweep.width*sweep.index/(sweep.total-1);
 u.angle=cannonAngle(angle);fire(u,false,angle);sweep.index++;finishBurstShot(u);if(!u.burst.remaining)u.sweep=null;
}
// Test the quantized weapon ray, not the direct sight line to a diagonal target.
function humanFiringLane(u,target){if(u.type==='chemical-trooper'||u.type==='cooling-trooper'){const angle=Math.atan2(target.y-u.y,target.x-u.x);return dist(u,target)<=(u.type==='chemical-trooper'?100+1e-9:130)&&Math.abs(angleDifference(angle,u.angle))<=Math.PI/8+1e-9&&window.TriumphIndustrialTroopers.clear(u,target,{blocked,props:getState().props});}if(u.type==='laser-cannon'){const s=getState(),ray=window.TriumphCapitalTroopers.trace(u,u.angle,{blocked,props:s.props});return window.TriumphCapitalTroopers.intersects(ray,target,s.nests);}
 const dx=target.x-u.x,dy=target.y-u.y,c=Math.cos(u.angle),sn=Math.sin(u.angle),along=dx*c+dy*sn,across=dx*sn-dy*c;
 const radius=getState().nests.includes(target)?26:target.type==='queen'||target.type==='tank'?17:8;
 const range=window.TriumphMercenaryTroopers.is(u)?window.TriumphMercenaryTroopers.range(u):window.TriumphFloatingHabitatsTroopers.is(u)?window.TriumphFloatingHabitatsTroopers.range(u):u.type==='heavy-trooper'?220:u.type==='combat-drone'?180:u.type==='chemical-trooper'?100:u.type==='cooling-trooper'?130:u.type==='heavy-riveter'?180:u.type==='arc-technician'?110:u.type==='corner-ambusher'?120:u.type==='suppressor'?200:u.type==='laser-cannon'?220:u.type==='winter-gunner'?280:u.type==='snow-sniper'?480:u.type==='dune-guard'&&u.cannon===undefined?120:['rider-scout','field-mechanic'].includes(u.type)&&u.cannon===undefined?180:u.weapon===1?145:u.weapon===2?319:638;
 if(Math.abs(across)>=radius-1||along+radius<=10)return false;
 const entry=Math.max(10,along-Math.sqrt(radius*radius-across*across)+1);
 if(entry>range+10)return false;
 for(let travel=10;travel<=entry;travel+=Math.min(4,entry-travel||4)){
  const x=u.x+c*travel,y=u.y+sn*travel;
  if(blocked(x,y)||getState().props.some(p=>p.hp>0&&x>=p.left&&x<p.left+p.w&&y>=p.top&&y<p.top+p.h))return false;
 }
 return true;
}
function sprayDensity(u,targetAngle,halfArc,range){
 const s=getState(),hostiles=[...s.aliens,...s.nests].filter(a=>a.alive!==false&&a.hp>0&&dist(u,a)<=range&&visible(u,a));
 let count=0;
 for(const a of hostiles){
  const angle=Math.atan2(a.y-u.y,a.x-u.x);
  if(Math.abs(angleDifference(angle,targetAngle))<=halfArc+(u.type==='cooling-trooper'?1e-9:0))count++;
 }
 return count;
}
function aimHuman(u,target,dt){
 if(u.specialist)window.TriumphMercenaryTroopers.mode(u,target,getState(),{visible});
 if(u.bounty)window.TriumphMercenaryTroopers.observe(u,getState().t,target,visible,getState().props);
 if(u.type==='corner-ambusher')window.TriumphCornerAmbusher.observe(u,getState().t);
 if(u.type==='grenadier'){const s=getState(),terrain={blocked,props:s.props};const point=window.TriumphMaritimeTroopers.target(u,target,s,terrain);u.grenadier.target=point;if(point){const ray=window.TriumphMaritimeTroopers.lane(u,point);u.angle=ray.angle;if(Math.abs(ray.offset)<7){if(u.cool<=0)fire(u);}else if(dt){const anchor=u.anchor||u,dx=-Math.sin(ray.angle)*ray.offset,dy=Math.cos(ray.angle)*ray.offset,len=Math.hypot(dx,dy),step=36*dt,next={x:u.x+dx/len*step,y:u.y+dy/len*step};if(u.order!==3||dist(next,anchor)<=50||dist(next,anchor)<dist(u,anchor))navigate(u,dx,dy,dt,36);u.angle=ray.angle;}}else if(dt){const anchor=u.anchor||u,dx=target.x-u.x,dy=target.y-u.y,len=Math.hypot(dx,dy),step=36*dt;const next={x:u.x+dx/len*step,y:u.y+dy/len*step};if(u.order!==3||dist(next,anchor)<=50||dist(next,anchor)<dist(u,anchor))navigate(u,dx,dy,dt,36);}return;}

 if(u.cannon!==undefined){aimCannon(u,target);return;}
 if(u.type==='tank'){aimTank(u,target);return;}
 if(u.type==='laser-cannon'&&!u.focusTarget){u.angle=window.TriumphCapitalTroopers.heading(u,target,getState(),{blocked,props:getState().props});const ray=window.TriumphCapitalTroopers.trace(u,u.angle,{blocked,props:getState().props});const hit=[...getState().aliens,...getState().nests].find(a=>a.alive!==false&&a.hp>0&&visible(u,a)&&window.TriumphCapitalTroopers.intersects(ray,a,getState().nests));if(hit)target=hit;}
 const isSpray=u.weapon===1||u.type==='dune-guard'||u.type==='cooling-trooper'||u.type==='chemical-trooper';
 const sprayArc=['cooling-trooper','chemical-trooper'].includes(u.type)?Math.PI/8:u.weapon===1?Math.PI/8:Math.PI/12,sprayRange=window.TriumphFloatingHabitatsTroopers.is(u)?window.TriumphFloatingHabitatsTroopers.range(u):u.type==='heavy-trooper'?220:u.type==='combat-drone'?180:u.type==='chemical-trooper'?100:u.type==='cooling-trooper'?130:u.weapon===1?145:120;
 const heading=()=>{
  if(u.type==='laser-cannon')return window.TriumphCapitalTroopers.heading(u,target,getState(),{blocked,props:getState().props});
  if(u.type==='snow-sniper')return Math.atan2(target.y-u.y,target.x-u.x);
  const direct=diagonal(Math.atan2(target.y-u.y,target.x-u.x));
  if(!isSpray)return direct;
  const targetAngle=Math.atan2(target.y-u.y,target.x-u.x);
  const angles=[0,Math.PI/4,Math.PI/2,3*Math.PI/4,Math.PI,-3*Math.PI/4,-Math.PI/2,-Math.PI/4];
  let best=direct,bestCount=-1;
  for(const h of angles){
   if(Math.abs(angleDifference(targetAngle,h))>Math.PI/3)continue;
   const count=sprayDensity(u,h,sprayArc,sprayRange);
   if(count>bestCount||(count===bestCount&&h===direct)){bestCount=count;best=h;}
  }
  return best;
 };
 u.angle=heading();trackBurst(u,target);
 if(!humanFiringLane(u,target)&&dt&&!window.TriumphFloatingHabitatsTroopers.is(u)&&!(u.type==='corner-ambusher'&&u.order===3)){
  const c=Math.cos(u.angle),sn=Math.sin(u.angle),dx=target.x-u.x,dy=target.y-u.y,offset=-dx*sn+dy*c;
  const radius=getState().nests.includes(target)?26:target.type==='queen'||target.type==='tank'?17:8;
  const anchor=u.anchor||{x:u.x,y:u.y};
  const leash=window.TriumphBalance?.guardLeashRadius||50;
  const speed=u.type==='commander'?55:36;
  let stepX=0,stepY=0;
  const range=window.TriumphMercenaryTroopers.is(u)?window.TriumphMercenaryTroopers.range(u):window.TriumphFloatingHabitatsTroopers.is(u)?window.TriumphFloatingHabitatsTroopers.range(u):u.type==='heavy-trooper'?220:u.type==='combat-drone'?180:u.type==='chemical-trooper'?100:u.type==='cooling-trooper'?130:u.type==='heavy-riveter'?180:u.type==='arc-technician'?110:u.type==='corner-ambusher'?120:u.type==='suppressor'?200:u.type==='laser-cannon'?220:u.type==='winter-gunner'?280:u.type==='snow-sniper'?480:u.type==='dune-guard'?120:['rider-scout','field-mechanic'].includes(u.type)?180:u.weapon===1?145:u.weapon===2?319:638;
  // Close into reach before sidestepping: short-range attack-movers must not stall outside range.
  if(Math.hypot(dx,dy)>range){stepX=dx;stepY=dy;}
  else if(Math.abs(offset)>=radius-1){stepX=-sn*offset;stepY=c*offset;}
  else{stepX=dx;stepY=dy;}
  const stepLen=Math.hypot(stepX,stepY);
  const moveDist=speed*dt;
  const nx=stepLen?u.x+(stepX/stepLen)*moveDist:u.x;
  const ny=stepLen?u.y+(stepY/stepLen)*moveDist:u.y;
  const nextDist=Math.hypot(nx-anchor.x,ny-anchor.y);
  const curDist=Math.hypot(u.x-anchor.x,u.y-anchor.y);
  if(u.order!==3||nextDist<=leash||nextDist<curDist){
   navigate(u,stepX,stepY,dt,speed);
   u.angle=heading();
  }
 }
 if((!window.TriumphMercenaryTroopers.is(u)||dist(u,target)<=window.TriumphMercenaryTroopers.range(u))&&visible(u,target)&&humanFiringLane(u,target)&&(!window.TriumphFloatingHabitatsTroopers.is(u)||dist(u,target)<=window.TriumphFloatingHabitatsTroopers.range(u))&&(u.type!=='heavy-trooper'||dist(u,target)<=220)&&(u.type!=='combat-drone'||dist(u,target)<=180)&&(u.type!=='winter-gunner'||dist(u,target)<=280)&&(u.type!=='suppressor'||dist(u,target)<=200)&&(u.type!=='corner-ambusher'||dist(u,target)<=120)&&(u.type!=='heavy-riveter'||dist(u,target)<=180)&&(u.type!=='arc-technician'||dist(u,target)<=110)&&burstReady(u,target)&&u.cool<=0){if(u.type==='arc-technician')u.arcTarget=target;fire(u);finishBurstShot(u);}
 else if(!visible(u,target))trackBurst(u,null);
}

// Scout dash volleys share the ordinary eight-direction lane and projectile factory.
function scoutCounterShot(u,target){u.angle=diagonal(Math.atan2(target.y-u.y,target.x-u.x));if(!visible(u,target)||!humanFiringLane(u,target))return false;u.cool=0;fire(u);return true;}
function fire(u,freeAim=false,projectileAngle){if(window.TriumphFloatingHabitatsTroopers.is(u)&&!window.TriumphFloatingHabitatsTroopers.ready(u))return;if(window.TriumphRecon.active(u,getState().t))return;if(u.cool>0)return;if(u.type==='chemical-trooper'){u.angle=diagonal(u.angle);if(window.TriumphToxicMarshTroopers.spray(u,getState(),{blocked,visible,emitAcousticEvent}))sound(13,.08);return;}if(u.type==='cooling-trooper'){u.angle=diagonal(u.angle);if(window.TriumphVolcanicTroopers.spray(u,getState(),{blocked,visible,damage,burst,emitAcousticEvent}))sound(13,.08);return;}if(window.TriumphMercenaryTroopers.is(u)){u.angle=diagonal(u.angle);if(window.TriumphMercenaryTroopers.fire(u,getState())){emitAcousticEvent?.(u,280);sound(11,.08);}return;}if(u.type==='arc-technician'){if(window.TriumphIndustrialTroopers.fireArc(u,getState(),{blocked,visible,damage,burst,emitAcousticEvent,lane:humanFiringLane})){sound(12,.08);}return;}if(u.type==='corner-ambusher'&&!window.TriumphCornerAmbusher.ready(u,getState().t))return;if(u.type==='grenadier'){if(window.TriumphMaritimeTroopers.fire(u,getState(),{blocked,props:getState().props})){emitAcousticEvent?.(u,280);sound(24,.12);}return;}if(u.type==='suppressor'&&!window.TriumphMaritimeTroopers.ready(u,getState().t))return;if(u.type==='laser-cannon'){if(window.TriumphCapitalTroopers.fire(u,getState(),{blocked,damage,burst,emitAcousticEvent})){if(emitAcousticEvent)emitAcousticEvent(u,280);sound(12,.12);}return;}if(u.type==='winter-gunner'&&!window.TriumphWinterGunner.ready(u,getState().t))return;if(u.team==='human'&&emitAcousticEvent)emitAcousticEvent({x:u.x,y:u.y},280);if(u.type==='dune-guard'&&u.cannon===undefined){getState().bullets.push(...desertRiders.pellets(u,{x:u.x+Math.cos(u.angle)*100,y:u.y+Math.sin(u.angle)*100}));u.cool=desertRiders.rules.guardCooldown;sound(11,.08);return;}if(u.cannon!==undefined)u.angle=cannonAngle(u.angle);else if(!freeAim&&u.team==='human'&&u.type!=='tank'&&u.type!=='snow-sniper')u.angle=diagonal(u.angle);u.cool=u.type==='mobile-skirmisher'?.75:u.type==='platform-defender'?1.5:u.type==='heavy-trooper'?.75:u.type==='heavy-riveter'?1.2:u.team==='alien'?enemyFireDelay(u):u.type==='snow-sniper'?1.2:['rider-scout','field-mechanic'].includes(u.type)?.6:u.type==='tank'?.2:u.type==='air'?.3:u.type==='commander'?(u.weapon===1?.180:.250):u.weapon===1?.180:u.type==='commando'?.38:u.order===3?.20:.38;const angles=[u.team==='alien'?(u.shotOffset||0):0];for(const a of angles){const angle=(u.cannon!==undefined&&projectileAngle!==undefined?projectileAngle:u.angle)+a;getState().bullets.push({x:u.x+Math.cos(angle)*10,y:u.y+Math.sin(angle)*10,dx:Math.cos(angle),dy:Math.sin(angle),team:u.team,owner:u.id,life:window.TriumphFloatingHabitatsTroopers.is(u)?(window.TriumphFloatingHabitatsTroopers.range(u)-10)/290:u.type==='heavy-trooper'?210/290:u.type==='combat-drone'?170/290:u.type==='heavy-riveter'?170/90:u.type==='corner-ambusher'?110/290:u.type==='suppressor'?190/290:u.type==='winter-gunner'?280/290:u.type==='snow-sniper'?1.5:u.weapon===1?.5:u.weapon===2?1.1:2.2,speed:u.type==='heavy-riveter'?90:u.team==='alien'?120:u.type==='snow-sniper'?400:290,damage:u.type==='platform-defender'?2:u.type==='heavy-riveter'?2:u.type==='snow-sniper'?4:u.type==='tank'?5:1,plasma:u.weapon===2,...(window.TriumphFloatingHabitatsTroopers.is(u)?{floating:true}:['heavy-trooper','combat-drone'].includes(u.type)?{moon:true}:u.type==='heavy-riveter'?{riveter:true}:u.type==='corner-ambusher'?{ambusher:true}:u.type==='snow-sniper'?{sniper:true}:u.type==='suppressor'?{suppression:true}:{})});}if(u.type==='corner-ambusher')window.TriumphCornerAmbusher.fired(u,getState().t);if(u.type==='suppressor')window.TriumphMaritimeTroopers.fired(u,getState().t);if(u.type==='winter-gunner')window.TriumphWinterGunner.fired(u,getState().t);if(originalAudio())sound(u.team==='alien'?0:u.type==='snow-sniper'?11:u.weapon===1?13:u.weapon===2?12:u.type==='tank'?24:11,u.type==='commander'?.25:u.type==='tank'?.16:.08);else if(u.type==='commander')tone(110+rnd()*80,.025,.013);}
function burst(x,y,size=12,color='#f5a641'){getState().effects.push({x,y,size,color,t:.4});}

return {scoutCounterShot,enemyFireDelay,trackBurst,burstReady,finishBurstShot,tankGroup,aimTank,aimCannon,humanFiringLane,aimHuman,fire,burst,sprayDensity};
}};
