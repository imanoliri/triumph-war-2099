'use strict';
// Authored fixed ground kits. Order travel and weapon heading are independent.
window.TriumphFloatingHabitatsTroopers=(()=>{
 const is=u=>['mobile-skirmisher','platform-defender'].includes(u?.type);
 const range=u=>u.type==='platform-defender'?300:160;
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 function initialize(u,time=0){if(u.type==='platform-defender')u.platform={phase:'setup',since:time,packUntil:0};}
 function request(u,moving,time){const q=u.platform;if(!q)return true;
  if(q.phase==='packing'){if(time+1e-9<q.packUntil)return false;q.phase='setup';q.since=null;}
  if(moving){if(q.phase==='deployed'){q.phase='packing';q.packUntil=time+.5;q.since=null;return false;}q.since=null;return true;}
  q.since??=time;if(q.phase==='setup'&&time-q.since>=1-1e-9)q.phase='deployed';return false;
 }
 function ready(u){return !u.platform||u.platform.phase==='deployed';}
 function step(u,s,dt,{navigate,perceive,aimHuman,useOrderStep,useSight,patrol,visible,lane}){
  if(!is(u)||!u.alive)return false;
  const focused=u.focusTarget;
  if(focused&&(focused.alive===false||focused.hp<=0||!s.aliens.includes(focused)&&!s.nests.includes(focused))){u.focusTarget=null;u.order=3;u.anchor={x:u.x,y:u.y};}
  const target=u.focusTarget||perceive(u,[...s.aliens,...s.nests],range(u));
  const leader=s.humans.find(a=>a.id===u.leader&&a.alive);
  let goal=null,wandering=false;
  if(u.useOrder){const q=u.useOrder;const reach=q.kind==='door'?42:q.kind==='terminal'?32:q.kind==='crystal'?23:18;const point=q.kind==='door'?{x:q.target.cx,y:q.target.cy}:q.target;goal=!q.done&&(distance(u,point)>reach||!useSight(u,q))?point:null;}
  else if(u.attackMove){if(distance(u,u.attackMove)>12){const encounter=u.platform&&!u.attackMove.force&&target&&distance(u,target)<=range(u)&&visible(u,target)&&lane(u,target);if(!encounter)goal=u.attackMove;}else{u.attackMove=null;u.order=3;u.anchor={x:u.x,y:u.y};}}
  else if(u.order===3){if(u.anchor&&distance(u,u.anchor)>1)goal=u.anchor;}
  else if(u.order===1&&leader&&distance(u,leader)>75)goal=leader;
  else if(target&&(u.focusTarget||u.order===2)&&(distance(u,target)>range(u)||!visible(u,target)))goal=target;
  else if(u.order===0&&u.type==='mobile-skirmisher')wandering=true;
  // Deployed Defenders pack once before any order travel, including object use.
  const mayMove=request(u,!!goal||wandering,s.t);
  if(u.useOrder){if(!goal||mayMove)useOrderStep(u,dt);return true;}
  const force=u.attackMove?.force;
  if(goal&&mayMove)navigate(u,goal.x-u.x,goal.y-u.y,dt,36);
  else if(wandering&&mayMove)patrol(u,dt,24);
  if(!force&&target&&distance(u,target)<=range(u)&&visible(u,target)&&ready(u))aimHuman(u,target,0);
  return true;
 }
 return {is,range,initialize,request,ready,step};
})();
