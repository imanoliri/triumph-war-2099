'use strict';
// Authored opt-in kits. Actor references, ownership and clocks belong to the mission.
window.TriumphToxicMarshTroopers=(()=>{
 const rules=Object.freeze({markRange:220,friendRange:220,markInterval:3,markDuration:2,range:100,halfArc:Math.PI/8,interval:1.25,delay:1,damage:1});
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 const living=a=>a&&a.alive!==false&&a.hp>0;
 const susceptible=(a,s)=>living(a)&&!(a.shieldUntil>s.t)&&!(a.type==='desert-worm'&&!window.TriumphDesertWorm.exposed(a));
 function initialize(u){if(u.type==='tracker')u.tracker={readyAt:0};if(u.type==='chemical-trooper')u.chemical={readyAt:0};}
 function step(s,{visible,damage,burst,emitAcousticEvent}){
  const enemies=[...new Set([...s.aliens,...s.nests])];
  if(s.trackerMarks)s.trackerMarks=s.trackerMarks.filter(m=>m.until>s.t&&m.source.alive&&living(m.target)&&enemies.includes(m.target));
  for(const u of s.humans)if(u.alive&&u.tracker&&s.t>=u.tracker.readyAt){u.tracker.readyAt=s.t+rules.markInterval;const a=enemies.filter(a=>living(a)&&distance(u,a)<=rules.markRange&&visible(u,a)).sort((a,b)=>distance(u,a)-distance(u,b))[0];if(a){s.trackerMarks??=[];s.trackerMarks.push({source:u,target:a,until:s.t+rules.markDuration});}}
  for(const a of enemies)if(a.chemicalDose&&(!living(a)||s.t+1e-9>=a.chemicalDose.at)){const dose=a.chemicalDose;delete a.chemicalDose;if(!susceptible(a,s))continue;if(s.nests.includes(a)){a.hp-=rules.damage;emitAcousticEvent?.(a,280);if(a.hp<=0){burst(a.x,a.y,40);if(dose.owner)s.score[dose.owner-1]+=100;}}else damage(a,rules.damage,dose.owner);}
  if(s.chemicalPulses)s.chemicalPulses=s.chemicalPulses.filter(p=>p.until>s.t);
 }
 function priority(u,a,s,{visible,lane,diagonal,cost}){
  if(u.focusTarget||u.useOrder||u.attackMove?.force||u.placeCharge||!Number.isFinite(cost(u,a))||!visible(u,a))return false;
  const leader=s.humans.find(h=>h.alive&&h.id===u.leader);if(u.order===1&&leader&&distance(u,leader)>75)return false;
  const range=window.TriumphMercenaryTroopers.is(u)?window.TriumphMercenaryTroopers.range(u):({'mobile-skirmisher':160,'platform-defender':300,'heavy-trooper':220,'combat-drone':180,'incendiary-trooper':120,'recovery-trooper':245,'chemical-trooper':100,'cooling-trooper':130,'heavy-riveter':180,'arc-technician':110,grenadier:240,'corner-ambusher':120,suppressor:200,'laser-cannon':220,'winter-gunner':280,'snow-sniper':480,'dune-guard':120,'rider-scout':180,'field-mechanic':180,tank:300,air:638})[u.type]??(u.weapon===1?145:u.weapon===2?319:245);
  if(distance(u,a)>range||!(s.trackerMarks||[]).some(m=>m.target===a&&m.until>s.t&&m.source.alive&&distance(u,m.source)<=rules.friendRange))return false;
  const probe={...u,angle:u.type==='snow-sniper'?Math.atan2(a.y-u.y,a.x-u.x):diagonal(Math.atan2(a.y-u.y,a.x-u.x))};return lane(probe,a);
 }
 function spray(u,s,{blocked,visible,emitAcousticEvent}){
  if(!u.chemical||s.t+1e-9<u.chemical.readyAt)return false;u.chemical.readyAt=s.t+rules.interval;
  for(const a of [...new Set([...s.aliens,...s.nests])])if(susceptible(a,s)&&distance(u,a)<=rules.range+1e-9&&Math.abs(Math.atan2(Math.sin(Math.atan2(a.y-u.y,a.x-u.x)-u.angle),Math.cos(Math.atan2(a.y-u.y,a.x-u.x)-u.angle)))<=rules.halfArc+1e-9&&visible(u,a)&&window.TriumphIndustrialTroopers.clear(u,a,{blocked,props:s.props}))a.chemicalDose={at:s.t+rules.delay,owner:u.id};
  s.chemicalPulses??=[];s.chemicalPulses.push({x:u.x,y:u.y,angle:u.angle,until:s.t+.16});emitAcousticEvent?.(u,280);return true;
 }
 return {rules,initialize,step,priority,spray};
})();
