'use strict';
// Source rules: docs/research/vent-bugs.md. Actors stay outside combat target lists.
window.TriumphVents=(()=>{
 const rules={17:{shadow:448,returnLimit:9,clearDrop:false},19:{shadow:475,returnLimit:9,clearDrop:true},21:{shadow:475,returnLimit:null,clearDrop:true}};
 // Finite animation/ballistic conversions are approximations, not live measurements.
 const speed=9*50/8,dropSeconds=4/(15*50/100),jumpSeconds=5/(20*50/100);
 const eligible=u=>u.alive&&['commander','soldier','commando'].includes(u.type);
 const normal=a=>a.alive&&a.hp>0&&a.type==='soldier'&&(a.object===undefined||a.object===151);
 function actor(i,phase='ceiling',angle=0){return {x:i.x,y:i.y,object:i.object,phase,angle,age:0,mode:0,dropRoll:0,moving:true};}
 function initialize(s,map){
  if(s.customMission?.vents){
   const points=Array.isArray(s.customMission.vents)?s.customMission.vents:[[350,180],[680,200],[480,600],[750,560]];
   s.vents=points.map(([x,y])=>actor({x,y,object:475}));
   s.ventClock={mode:0,contact:0,aim:0};
   return;
  }
  s.vents=rules[map?.index]?map.instances.filter(i=>i.object===rules[map.index].shadow).map(i=>actor(i)):[];s.ventClock={mode:0,contact:0,aim:0};
 }
 function update(s,dt,{random,blocked,spawn,sound}){
  const rule=s.customMission?.vents?(typeof s.customMission.vents==='object'&&!Array.isArray(s.customMission.vents)?s.customMission.vents:{shadow:475,returnLimit:9,clearDrop:true}):rules[s.originalMap?.index];if(!rule)return;
  const clock=s.ventClock;clock.mode+=dt;clock.contact+=dt;clock.aim+=dt;
  const modeTick=clock.mode>=2,contactTick=clock.contact>=.1,aimTick=clock.aim>=.05;
  if(modeTick)clock.mode%=2;if(contactTick)clock.contact%=.1;if(aimTick)clock.aim%=.05;
  for(const v of s.vents){
   if(v.phase!=='ceiling'){
    v.age+=dt;const duration=v.phase==='drop'?dropSeconds:jumpSeconds;
    if(v.age+1e-9>=duration){if(v.phase==='drop'){spawn(v.x,v.y);v.phase='done';}else{v.phase='ceiling';v.object=rule.shadow;v.age=0;v.mode=0;v.dropRoll=0;v.moving=true;}}
    continue;
   }
   if(modeTick)v.mode=Math.floor(random()*20);if(contactTick)v.dropRoll=Math.floor(random()*30);
   if(v.mode<=5)v.moving=true;else if(v.mode>=15)v.moving=false;
   let target=null;
   if(v.mode>=6&&v.mode<=9)target=s.humans.find(u=>u.alive&&u.type==='commander'&&u.id===v.mode-5);
   else if(v.mode===11){target=s.humans.find(u=>u.alive&&['soldier','commando'].includes(u.type));if(!target)v.mode=Math.floor(random()*20);}
   if(target&&(v.mode===11?aimTick:contactTick))v.angle=Math.atan2(target.y-v.y,target.x-v.x);
   // Original out-of-playfield recovery points toward (512,270), ignoring walls.
   if(v.x<=0||v.x>=1024||v.y<=0||v.y>=768){v.angle=Math.atan2(270-v.y,512-v.x);v.moving=true;}
   if(v.moving){v.x+=Math.cos(v.angle)*speed*dt;v.y+=Math.sin(v.angle)*speed*dt;
    if(v.x>=0&&v.x<=1024&&v.y>=0&&v.y<=768){if(v.x<=1||v.x>=1023)v.angle=Math.PI-v.angle;if(v.y<=1||v.y>=767)v.angle=-v.angle;}}
   const human=s.humans.find(u=>eligible(u)&&v.dropRoll<=(u.type==='commander'?10:20)&&Math.hypot(v.x-u.x,v.y-u.y)<=14);
   if(human&&(!rule.clearDrop||!blocked(v.x,v.y))){v.phase='drop';v.object=446;v.age=0;sound(15,.3);}
  }
  s.vents=s.vents.filter(v=>v.phase!=='done');
  if(rule.returnLimit!==null){
   for(const a of s.aliens){if(!normal(a))continue;if(modeTick)a.ventMode=Math.floor(random()*20);
    if(a.ventMode===15&&s.vents.filter(v=>v.phase==='ceiling').length<=rule.returnLimit){
     const flower=s.flowers.find(f=>f.alive),angle=flower?Math.atan2(flower.y-a.y,flower.x-a.x):a.angle;
     s.vents.push(actor({x:a.x,y:a.y,object:447},'jump',angle));a.alive=false;a.ventReturning=true;sound(53,.3);
    }
   }
   // Ascending is a transition, not a kill: no score, wave credit or spawn-on-death.
   s.aliens=s.aliens.filter(a=>!a.ventReturning);
  }
 }
 function draw(ctx,vents,sprite){for(const v of vents){ctx.save();if(v.phase==='ceiling')ctx.globalAlpha=.5;const count=v.phase==='drop'?4:5,duration=v.phase==='drop'?dropSeconds:jumpSeconds;const frame=v.phase==='ceiling'?0:Math.min(count-1,Math.floor(v.age/duration*count));sprite(v.object,v.x,v.y,v.angle,0,frame);ctx.restore();}}
 return {initialize,update,draw,rules,dropSeconds,jumpSeconds};
})();
