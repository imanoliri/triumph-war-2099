'use strict';
// Authored ground companion ownership belongs to one current mission actor.
window.TriumphAirlessMoonTroopers=(()=>{
 const rules=Object.freeze({heavyHP:3,heavyMovement:.65,heavyRange:220,heavyInterval:.75,droneHP:1,droneRange:180,leash:180});
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 const living=u=>u&&u.alive&&u.hp>0;
 function initialize(u){if(u.type==='heavy-trooper')u.hp=rules.heavyHP;}
 function attach(u,s,{unit,blocked}){
  if(u.type!=='drone-operator'||u.droneInitialized||!living(u))return;
  u.droneInitialized=true;
  // Same legal landing point is a safe fallback in narrow corridors; no flight/teleport.
  const point=[{x:u.x-16,y:u.y},{x:u.x,y:u.y+16},{x:u.x,y:u.y}].find(p=>p.x>=12&&p.x<=1012&&p.y>=38&&p.y<=752&&!blocked(p.x,p.y))||u;
  const d=unit(point.x,point.y,'human','combat-drone');Object.assign(d,{hp:rules.droneHP,grenades:0,object:52});Object.defineProperty(d,'operator',{value:u});Object.defineProperty(u,'drone',{value:d});s.humans.push(d);
 }
 function cleanup(u){if(u.type==='drone-operator'&&u.drone){u.drone.alive=false;u.drone.hp=0;u.drone.focusTarget=null;u.drone.attackMove=null;}if(u.type==='combat-drone'){u.alive=false;u.hp=0;}}
 function canMove(u,point){const partner=u.type==='combat-drone'?u.operator:u.type==='drone-operator'?u.drone:null;return !living(partner)||distance(point,partner)<=rules.leash+1e-9;}
 function step(d,s,dt,{navigate,perceive,aimHuman,trackBurst,visible}){
  if(d.type!=='combat-drone')return false;
  const o=d.operator;if(!living(d))return true;if(!living(o)||!s.humans.includes(o)){cleanup(d);return true;}
  d.order=o.order;d.leader=o.leader;d.anchor=o.anchor?{...o.anchor}:{x:o.x,y:o.y};
  d.focusTarget=o.focusTarget?.alive!==false&&o.focusTarget?.hp>0?o.focusTarget:null;
  const moveTo=p=>navigate(d,p.x-d.x,p.y-d.y,dt,36);
  // Interaction and force travel suppress combat for the whole package.
  if(o.useOrder||o.attackMove?.force){trackBurst(d,null);const goal=o.attackMove?.force?o.attackMove:o;if(distance(d,goal)>12)moveTo(goal);return true;}
  const target=d.focusTarget||perceive(d,[...s.aliens,...s.nests],rules.droneRange);
  if(!target)trackBurst(d,null);
  const following=o.order===1,guard=o.order===3;
  if(distance(d,o)>40){moveTo(o);if(following)return true;}
  else if(guard&&distance(d,d.anchor)>50)moveTo(d.anchor);
  else if(target&&(d.focusTarget||o.order===2||o.attackMove)&&(!visible(d,target)||distance(d,target)>rules.droneRange))moveTo(target);
  if(target&&distance(d,target)<=rules.droneRange&&visible(d,target))aimHuman(d,target,following?0:dt*.85);
  return true;
 }
 return {rules,initialize,attach,cleanup,canMove,step};
})();
