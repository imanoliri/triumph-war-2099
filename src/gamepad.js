'use strict';
// Custom standard-mapping adapter. Connection alone never claims a commander.
window.TriumphGamepad={create(services){
 const {getPads,getState,inputState,isPaused,modalOpen,focused,selectCommander,tactical,giveOrder,interact,grenade,move,fire,unlockAudio}=services;
 let owner=null,commander=null,previous=new Map(),armed=false,sample=null,lastState=null,lastBlocked=true;
 const button=(p,i)=>!!p.buttons?.[i]&&(p.buttons[i].pressed||p.buttons[i].value>.5);
 const stick=(p,i)=>{let x=Number(p.axes?.[i])||0,y=Number(p.axes?.[i+1])||0;const n=Math.hypot(x,y);if(n<=.22)return {x:0,y:0};const magnitude=Math.min(1,(n-.22)/.78);return {x:x/n*magnitude,y:y/n*magnitude};};
 function release(){if(commander!==null&&inputState.activeCommander===commander&&inputState.mouseMode==='commander')selectCommander(commander);owner=null;commander=null;sample=null;armed=false;}
 function poll(){
  const s=getState();let pads=[];try{pads=Array.from(getPads?.()||[]).filter(p=>p?.connected!==false&&p);}catch{}const standard=pads.filter(p=>p.mapping==='standard');
  const blocked=s.mode!=='playing'||modalOpen()||!focused();
  if(lastState!==s){release();previous.clear();lastState=s;}
  if(owner!==null&&!standard.some(p=>p.index===owner))release();
  if(commander!==null&&(inputState.activeCommander!==commander||inputState.mouseMode!=='commander'))release();
  if(blocked||isPaused()||lastBlocked){armed=false;sample=null;}lastBlocked=blocked||isPaused();
  for(const p of standard){const held=Array.from({length:17},(_,i)=>button(p,i)),old=previous.get(p.index)||held,edge=i=>held[i]&&!old[i];previous.set(p.index,held);
   if(blocked)continue;
   let claimed=false;if(owner===null&&(edge(4)||edge(5))){claimed=true;owner=p.index;const ids=s.humans.filter(u=>u.type==='commander'&&u.alive).map(u=>u.id);if(!ids.length){release();continue;}const at=ids.indexOf(inputState.activeCommander),delta=edge(5)?1:-1;commander=ids[(at<0?(delta>0?0:ids.length-1):(at+delta+ids.length)%ids.length)];if(inputState.activeCommander!==commander||inputState.mouseMode!=='commander')selectCommander(commander);armed=false;unlockAudio();}
   if(owner!==p.index)continue;
   if(edge(9)){tactical();armed=false;sample=null;lastBlocked=true;}
   if(!claimed&&(edge(4)||edge(5))){const ids=s.humans.filter(u=>u.type==='commander'&&u.alive).map(u=>u.id);if(ids.length&&commander!==null){const next=ids[(ids.indexOf(commander)+(edge(5)?1:-1)+ids.length)%ids.length];if(next!==commander){commander=next;selectCommander(next);}}armed=false;sample=null;}
   const movement=stick(p,0),aim=stick(p,2),neutral=!movement.x&&!movement.y&&!aim.x&&!aim.y&&!held.some((v,i)=>v&&i!==9);
   const u=s.humans.find(u=>u.id===commander&&u.alive);if(u)for(const [i,order] of [[12,2],[13,3],[14,0],[15,1]])if(edge(i))giveOrder(u,order);
   if(isPaused()){sample=null;continue;}
   if(!armed){if(neutral)armed=true;sample=null;continue;}
   sample={movement,aim,fire:held[7]};if(!u)continue;
   if(edge(0)){unlockAudio();interact(u);}if(edge(6)&&(u.grenadeCool||0)<=s.t){if(aim.x||aim.y)u.angle=Math.atan2(aim.y,aim.x);grenade(u);u.grenadeCool=s.t+.330;}
  }
  for(const index of previous.keys())if(!standard.some(p=>p.index===index))previous.delete(index);
  const unsupported=pads.length-standard.length;const status=pads.length&&!standard.length?'Gamepad: unsupported mapping':owner===null?(standard.length?'Gamepad connected · press a bumper to select commander':'Gamepad: disconnected'):`Gamepad ${owner+1} · Commander ${commander}${isPaused()?' · tactical':''}`;return status+(unsupported&&standard.length?' · '+unsupported+' unsupported mapping':'');
 }
 function step(u,dt){if(!sample||u.id!==commander||inputState.activeCommander!==commander||isPaused()||modalOpen()||!focused()||getState().mode!=='playing')return;const {movement,aim}=sample;move(u,movement.x,movement.y,dt,85*Math.hypot(movement.x,movement.y));if(aim.x||aim.y)u.angle=Math.atan2(aim.y,aim.x);if(sample.fire)fire(u,!!(aim.x||aim.y));}
 return {poll,step,release};
}};
