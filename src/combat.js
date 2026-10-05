'use strict';
// Combat state belongs to the caller. Access the current mission on every operation.
window.TriumphCombat={create({getState,burstRules,tankSweepRules,cannonSweepRules,rnd,visible,dist,blocked,navigate,cardinal,diagonal,cannonAngle,getDifficulty,bugFireBases,specialistRules,desertRiders,originalAudio,sound,tone}){
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
function humanFiringLane(u,target){
 const dx=target.x-u.x,dy=target.y-u.y,c=Math.cos(u.angle),sn=Math.sin(u.angle),along=dx*c+dy*sn,across=dx*sn-dy*c;
 const radius=getState().nests.includes(target)?26:target.type==='queen'||target.type==='tank'?17:8;
 const range=u.type==='dune-guard'&&u.cannon===undefined?120:['rider-scout','field-mechanic'].includes(u.type)&&u.cannon===undefined?180:u.weapon===1?145:u.weapon===2?319:638;
 if(Math.abs(across)>=radius-1||along+radius<=10)return false;
 const entry=Math.max(10,along-Math.sqrt(radius*radius-across*across)+1);
 if(entry>range+10)return false;
 for(let travel=10;travel<=entry;travel+=Math.min(4,entry-travel||4)){
  const x=u.x+c*travel,y=u.y+sn*travel;
  if(blocked(x,y)||getState().props.some(p=>p.hp>0&&x>=p.left&&x<p.left+p.w&&y>=p.top&&y<p.top+p.h))return false;
 }
 return true;
}
function aimHuman(u,target,dt){
 if(u.cannon!==undefined){aimCannon(u,target);return;}
 if(u.type==='tank'){aimTank(u,target);return;}
 const heading=()=> (u.type==='commando'?diagonal:cardinal)(Math.atan2(target.y-u.y,target.x-u.x));
 u.angle=heading();trackBurst(u,target);
 if(!humanFiringLane(u,target)&&dt&&u.order!==3){
  const c=Math.cos(u.angle),sn=Math.sin(u.angle),dx=target.x-u.x,dy=target.y-u.y,offset=-dx*sn+dy*c;
  const radius=getState().nests.includes(target)?26:target.type==='queen'||target.type==='tank'?17:8;
  // Slide onto the legal lane; close when range or terrain prevents a shot.
  if(Math.abs(offset)>=radius-1)navigate(u,-sn*offset,c*offset,dt,u.type==='commander'?55:36);
  else navigate(u,dx,dy,dt,u.type==='commander'?55:36);
  u.angle=heading();
 }
 if(visible(u,target)&&humanFiringLane(u,target)&&burstReady(u,target)&&u.cool<=0){fire(u);finishBurstShot(u);}
 else if(!visible(u,target))trackBurst(u,null);
}

function fire(u,freeAim=false,projectileAngle){if(u.cool>0)return;if(u.type==='dune-guard'&&u.cannon===undefined){getState().bullets.push(...desertRiders.pellets(u,{x:u.x+Math.cos(u.angle)*100,y:u.y+Math.sin(u.angle)*100}));u.cool=desertRiders.rules.guardCooldown;sound(11,.08);return;}if(u.cannon!==undefined)u.angle=cannonAngle(u.angle);else if(u.type==='commando')u.angle=diagonal(u.angle);else if(!freeAim&&u.team==='human'&&['soldier','commander','robot'].includes(u.type))u.angle=cardinal(u.angle);u.cool=u.team==='alien'?enemyFireDelay(u):['rider-scout','field-mechanic'].includes(u.type)?.6:u.type==='tank'?.2:u.type==='air'?.3:u.type==='commander'?(u.weapon===1?.180:.250):u.weapon===1?.180:u.type==='commando'?.38:u.order===3?.20:.38;const angles=[u.team==='alien'?(u.shotOffset||0):0];for(const a of angles){const angle=(u.cannon!==undefined&&projectileAngle!==undefined?projectileAngle:u.angle)+a;getState().bullets.push({x:u.x+Math.cos(angle)*10,y:u.y+Math.sin(angle)*10,dx:Math.cos(angle),dy:Math.sin(angle),team:u.team,owner:u.id,life:u.weapon===1?.5:u.weapon===2?1.1:2.2,speed:u.team==='alien'?120:290,damage:u.type==='tank'?5:1,plasma:u.weapon===2});}if(originalAudio())sound(u.team==='alien'?0:u.weapon===1?13:u.weapon===2?12:u.type==='tank'?24:11,u.type==='commander'?.25:u.type==='tank'?.16:.08);else if(u.type==='commander')tone(110+rnd()*80,.025,.013);}
function burst(x,y,size=12,color='#f5a641'){getState().effects.push({x,y,size,color,t:.4});}

return {enemyFireDelay,trackBurst,burstReady,finishBurstShot,tankGroup,aimTank,aimCannon,humanFiringLane,aimHuman,fire,burst};
}};
