'use strict';
window.TriumphOrders={create(services){
const {getState,inputState,selection,W,H,dist,nearest,blocked,cancelSupply,trackBurst,sound,tone,infantryType,navigate,interact,pickup,burst,visible,aimHuman,navigationRevision,humanRouteBlocked,reinforcementRule,eagleClaims,navigation,wormExposed,hasOriginalAudio}=services;
function giveOrder(u,choice=null){const s=getState();u.order=choice===null?(u.order+1)%4:choice;u.selecting=false;for(const a of s.humans)if(a.alive&&a.type!=='commander'&&dist(a,u)<300){cancelSupply(a);if(a.placeCharge)a.placeCharge=null;a.useOrder=null;a.focusTarget=null;trackBurst(a,null);a.attackMove=null;a.order=u.order;a.leader=u.id;a.anchor={x:a.x,y:a.y};}sound([2,4,1,3][u.order],.55);if(!hasOriginalAudio())tone(440,.06,.025);}
function selectable(u){const s=getState();return u.alive&&u.team==='human'&&['soldier','commando','tank','robot','rider-scout','dune-guard','field-mechanic','snow-sniper','winter-gunner','shield-trooper','laser-cannon','suppressor','grenadier','corner-ambusher','recon','heavy-riveter','arc-technician','weapon-specialist','bounty-hunter','demolition-trooper','cooling-trooper','tracker','chemical-trooper','heavy-trooper','drone-operator'].includes(u.type);}
function attackMoveTo(point,force=false){const s=getState();const troops=[...selection].filter(selectable);if(!troops.length)return;const columns=Math.ceil(Math.sqrt(troops.length)),rows=Math.ceil(troops.length/columns);troops.forEach((u,i)=>{const raw={x:Math.max(12,Math.min(W-12,point.x+(i%columns-(columns-1)/2)*18)),y:Math.max(42,Math.min(H-18,point.y+(Math.floor(i/columns)-(rows-1)/2)*18))},goal=navigation?.destination(u,raw,blocked)||raw;if(u.cannon!==undefined){const gun=s.cannons[u.cannon];if(gun?.occupant===u)gun.occupant=null;delete u.cannon;u.weapon=0;}cancelSupply(u);if(u.placeCharge)u.placeCharge=null;u.useOrder=null;u.focusTarget=null;trackBurst(u,null);u.attackMove={...goal,force};u.order=2;u.patrol=null;});inputState.moveMarker={...point,force,until:s.t+1.2};sound(1,.3);}
function usableAt(point){const s=getState();
 const objects=[...(s.doors||[]).filter(d=>!d.destroyed).map(target=>({kind:'door',target,x:target.cx,y:target.cy})),...(s.terminals||[]).map(target=>({kind:'terminal',target,...target})),...(s.cannons||[]).filter(c=>!c.occupant).map(target=>({kind:'cannon',target,...target})),...s.pickups.map(target=>({kind:'pickup',target,...target})),...s.flowers.filter(f=>f.alive).map(target=>({kind:'flower',target,...target})),...(s.crystal&&!s.crystal.recovered?[{kind:'crystal',target:s.crystal,...s.crystal}]:[])];
 return objects.filter(o=>o.kind==='door'?point.x>=o.target.x-8&&point.x<=o.target.x+o.target.w+8&&point.y>=o.target.y-8&&point.y<=o.target.y+o.target.h+8:dist(point,o)<24).sort((a,b)=>dist(point,a)-dist(point,b))[0]||null;
}
function useOrderTo(object){const s=getState();
 const units=[...selection].filter(u=>selectable(u)&&!(['winter-gunner','shield-trooper','laser-cannon','suppressor','grenadier','corner-ambusher','recon','heavy-riveter','arc-technician','weapon-specialist','bounty-hunter','demolition-trooper','cooling-trooper','tracker','chemical-trooper','heavy-trooper','drone-operator'].includes(u.type)&&(object.kind==='cannon'||object.kind==='pickup'&&!['blitz','troops','tank','air','grenade'].includes(object.target.type)))&&(!['pickup','flower','cannon'].includes(object.kind)||infantryType(u)));if(!units.length)return;
 const job={...object,done:false,desiredOpen:object.kind==='door'?!object.target.open:null};
 for(const u of units){cancelSupply(u);if(u.placeCharge)u.placeCharge=null;u.attackMove=null;u.focusTarget=null;trackBurst(u,null);if(u.cannon!==undefined){const gun=s.cannons[u.cannon];if(gun?.occupant===u)gun.occupant=null;delete u.cannon;u.weapon=0;}u.useOrder=job;u.order=2;u.patrol=null;}
 inputState.moveMarker={x:object.x,y:object.y,use:true,until:s.t+1.2};sound(1,.3);
}
function useSight(u,job){const s=getState();const t=job.target,goal=job.kind==='door'?{x:Math.max(t.x,Math.min(t.x+t.w,u.x)),y:Math.max(t.y,Math.min(t.y+t.h,u.y))}:t,length=dist(u,goal),travel=Math.max(0,length-(job.kind==='door'?7:12)),steps=Math.ceil(travel/3);for(let i=1;i<=steps;i++){const f=travel/length*i/steps;if(blocked(u.x+(goal.x-u.x)*f,u.y+(goal.y-u.y)*f))return false;}return true;}
function useOrderStep(u,dt){const s=getState();
 const job=u.useOrder;if(!job)return false;if(['winter-gunner','shield-trooper','laser-cannon','suppressor','grenadier','corner-ambusher','recon','heavy-riveter','arc-technician','weapon-specialist','bounty-hunter','demolition-trooper','cooling-trooper','tracker','chemical-trooper','heavy-trooper','drone-operator'].includes(u.type)&&(job.kind==='cannon'||job.kind==='pickup'&&!['blitz','troops','tank','air','grenade'].includes(job.target.type))){u.useOrder=null;return false;}const t=job.target;
 if(job.done){u.useOrder=null;u.order=3;u.anchor={x:u.x,y:u.y};return true;}
 const present=job.kind==='door'?s.doors.includes(t)&&!t.destroyed:job.kind==='terminal'?s.terminals.includes(t):job.kind==='cannon'?s.cannons.includes(t)&&(!t.occupant||t.occupant===u):job.kind==='pickup'?s.pickups.includes(t):job.kind==='flower'?t.alive:!t.recovered;
 if(!present){job.done=true;return true;}
 const goal=job.kind==='door'?{x:t.cx,y:t.cy}:t,range=job.kind==='door'?42:job.kind==='terminal'?32:job.kind==='crystal'?23:18;
 if(dist(u,goal)>range||!useSight(u,job)){navigate(u,goal.x-u.x,goal.y-u.y,dt,u.type==='tank'?30:36);return true;}
 if(job.kind==='door'){if(t.locked)return true;if(t.open===job.desiredOpen){job.done=true;return true;}if(s.t-(t.lastUse??-10)<=.5)return true;job.done=interact(u,t);}
 else if(job.kind==='terminal')job.done=interact(u,t);
 else if(job.kind==='pickup'){if(pickup(u,t)){s.pickups.splice(s.pickups.indexOf(t),1);job.done=true;}}
 else if(job.kind==='flower'){t.alive=false;burst(t.x,t.y,15,'#a588bc');job.done=true;}
 else if(job.kind==='cannon'){t.occupant=u;u.cannon=s.cannons.indexOf(t);u.x=t.x;u.y=t.y;u.weapon=2;job.done=true;}
 else{if(s.level===7)t.recovered=true;job.done=true;}
 return true;
}
function enemyAt(point){const s=getState();return nearest(point,[...s.aliens,...s.nests].filter(a=>(a.type!=='desert-worm'||wormExposed(a))&&a.alive!==false&&a.hp>0&&dist(point,a)<(s.nests.includes(a)?30:a.type==='queen'?23:16)),32);}
function focusAttackTo(target){const s=getState();
 if(!target||target.alive===false||target.hp<=0||(target.type==='desert-worm'&&!wormExposed(target)))return;
 for(const u of selection){if(!selectable(u))continue;cancelSupply(u);if(u.placeCharge)u.placeCharge=null;u.useOrder=null;u.attackMove=null;if(u.focusTarget!==target)trackBurst(u,null);u.focusTarget=target;u.order=2;u.patrol=null;if(u.cannon!==undefined){const gun=s.cannons[u.cannon];if(gun?.occupant===u)gun.occupant=null;delete u.cannon;u.weapon=0;}}
 inputState.moveMarker={x:target.x,y:target.y,focus:true,until:s.t+1.2};sound(1,.3);
}
function focusAttackStep(u,dt){const s=getState();
 const target=u.focusTarget;if(!target)return false;if(u.bounty&&(dist(u,target)>260||!visible(u,target))){u.focusTarget=null;window.TriumphMercenaryTroopers.observe(u,s.t,null,visible);return false;}
 if(target.alive===false||target.hp<=0||(target.type==='desert-worm'&&!wormExposed(target))||!s.aliens.includes(target)&&!s.nests.includes(target)){u.focusTarget=null;trackBurst(u,null);u.order=3;u.anchor={x:u.x,y:u.y};return false;}
 const range=window.TriumphMercenaryTroopers.is(u)?window.TriumphMercenaryTroopers.range(u):u.type==='heavy-trooper'?220:u.type==='combat-drone'?180:u.type==='chemical-trooper'?100:u.type==='cooling-trooper'?130:u.type==='heavy-riveter'?180:u.type==='arc-technician'?110:u.type==='grenadier'?240:u.type==='corner-ambusher'?120:u.type==='suppressor'?200:u.type==='laser-cannon'?220:u.type==='winter-gunner'?280:u.type==='snow-sniper'?480:u.type==='tank'?300:u.type==='dune-guard'?120:['rider-scout','field-mechanic'].includes(u.type)?180:u.weapon===1?145:u.weapon===2?319:245;
 const closeRange=window.TriumphMercenaryTroopers.is(u)?window.TriumphMercenaryTroopers.range(u):u.type==='heavy-trooper'?220:u.type==='combat-drone'?180:u.type==='chemical-trooper'?100:u.type==='cooling-trooper'?130:u.type==='heavy-riveter'?180:u.type==='arc-technician'?110:u.type==='grenadier'?240:u.type==='corner-ambusher'?120:u.type==='suppressor'?200:u.type==='laser-cannon'?220:u.type==='winter-gunner'?280:u.type==='snow-sniper'?450:u.weapon===2?265:u.weapon===1?125:u.type==='dune-guard'?100:range;
 const d=dist(u,target);
 if((['laser-cannon','corner-ambusher','heavy-riveter','arc-technician','weapon-specialist','bounty-hunter','demolition-trooper','cooling-trooper','tracker','chemical-trooper','heavy-trooper','drone-operator'].includes(u.type)?d>closeRange:d>=closeRange)||!visible(u,target)){trackBurst(u,null);navigate(u,target.x-u.x,target.y-u.y,dt,u.type==='tank'?30:36);return true;}
 else if(u.weapon===2&&d<140&&u.order!==3){const backX=u.x-(target.x-u.x),backY=u.y-(target.y-u.y);if(!blocked(backX,backY))navigate(u,u.x-target.x,u.y-target.y,dt,36);}
 aimHuman(u,target,dt*.85);return true;
}
function attackMoveInteraction(u,target,dt){const s=getState();
 if(!['soldier','snow-sniper'].includes(u.type)||!u.attackMove||u.attackMove.force||u.useOrder||u.focusTarget||u.cannon!==undefined)return false;
 const revision=navigationRevision(),nav=navigation,next=nav?.step(u,u.attackMove,humanRouteBlocked,revision)||u.attackMove;
 const dx=next.x-u.x,dy=next.y-u.y,length=dx*dx+dy*dy;
 const nearby=p=>{if(dist(u,p)>56)return false;const t=length?Math.max(0,Math.min(1,((p.x-u.x)*dx+(p.y-u.y)*dy)/length)):0;if(Math.hypot(p.x-u.x-dx*t,p.y-u.y-dy*t)>24)return false;return nav?nav.routeDistance(u,p,humanRouteBlocked,revision)<=72:!blocked(p.x,p.y)&&visible(u,p);};
 const threat=target||nearest(u,[...s.aliens,...s.nests].filter(a=>a.alive!==false&&a.hp>0&&visible(u,a)),245);
 const eagles=()=>s.pickups.filter(p=>['troops','air','tank','blitz'].includes(p.type)&&nearby(p)&&reinforcementRule(p.type)&&(!eagleClaims.has(p)||eagleClaims.get(p)===u)).sort((a,b)=>dist(u,a)-dist(u,b));
 const guns=()=>s.cannons.filter(c=>!c.occupant&&nearby(c)).sort((a,b)=>dist(u,a)-dist(u,b));
 const eagle=!threat?eagles()[0]:null,gun=(!eagle?guns()[0]:null),goal=eagle||gun;
 if(!goal)return false;
 trackBurst(u,null);
 if(dist(u,goal)>18)navigate(u,goal.x-u.x,goal.y-u.y,dt,36);
 else if(eagle){const index=s.pickups.indexOf(eagle);if(index>=0&&pickup(u,eagle))s.pickups.splice(index,1);}
 else if(!gun.occupant){gun.occupant=u;u.cannon=s.cannons.indexOf(gun);u.x=gun.x;u.y=gun.y;u.weapon=2;}
 return true;
}
function attackMoveStep(u,target,dt){const s=getState();if(attackMoveInteraction(u,target,dt))return true;const goal=u.attackMove;if(!goal)return false;const range=window.TriumphMercenaryTroopers.is(u)?window.TriumphMercenaryTroopers.range(u):u.type==='heavy-trooper'?220:u.type==='combat-drone'?180:u.type==='chemical-trooper'?100:u.type==='cooling-trooper'?130:u.type==='heavy-riveter'?180:u.type==='arc-technician'?110:u.type==='grenadier'?240:u.type==='corner-ambusher'?120:u.type==='suppressor'?200:u.type==='laser-cannon'?220:u.type==='winter-gunner'?280:u.type==='snow-sniper'?480:u.type==='tank'?300:u.type==='dune-guard'?140:['rider-scout','field-mechanic'].includes(u.type)?180:u.weapon===1?165:u.weapon===2?319:245;if(!goal.force&&target&&(['laser-cannon','corner-ambusher','heavy-riveter','arc-technician','weapon-specialist','bounty-hunter','demolition-trooper','cooling-trooper','tracker','chemical-trooper','heavy-trooper','drone-operator'].includes(u.type)?dist(u,target)<=range:dist(u,target)<range)){aimHuman(u,target,dt*.85);return true;}if(dist(u,goal)>12)navigate(u,goal.x-u.x,goal.y-u.y,dt,u.type==='tank'?30:36);else {u.attackMove=null;u.order=3;u.anchor={x:u.x,y:u.y};}return true;}
return {giveOrder,selectable,attackMoveTo,usableAt,useOrderTo,useSight,useOrderStep,enemyAt,focusAttackTo,focusAttackStep,attackMoveInteraction,attackMoveStep};
}};
