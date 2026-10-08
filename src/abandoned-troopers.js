'use strict';
// Authored Abandoned kits; mission clocks, movement and damage belong to caller.
window.TriumphAbandonedTroopers=(()=>{
 const rules=Object.freeze({range:120,halfArc:Math.PI/8,pulse:.18,fire:1,cooling:2,kits:2,treatment:1,nearby:40});
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 const caps=Object.freeze({tank:8,robot:7,'convoy-crawler':6,'heavy-trooper':3});
 function initialize(u){if(u.type==='incendiary-trooper')u.incendiary={start:null,readyAt:0,nextPulse:0};if(u.type==='recovery-trooper'){u.recovery={remaining:rules.kits,progress:0,x:u.x,y:u.y};Object.defineProperty(u.recovery,'target',{value:null,writable:true});}}
 function advance(s){for(const u of s.humans||[]){const q=u.incendiary;if(q&&q.start!==null&&s.t>=q.start+rules.fire-1e-9){q.readyAt=q.start+rules.fire+rules.cooling;q.start=null;}}if(s.incendiaryPulses)s.incendiaryPulses=s.incendiaryPulses.filter(p=>p.until>s.t);}
 function spray(u,s,services){const q=u.incendiary;if(!q)return false;advance(s);if(s.t<q.readyAt-1e-9||s.t<q.nextPulse-1e-9)return false;if(q.start===null)q.start=s.t;q.nextPulse=s.t+rules.pulse;
  for(const a of [...new Set([...s.aliens,...s.nests])])if(a.alive!==false&&a.hp>0&&distance(u,a)<=rules.range+1e-9&&Math.abs(Math.atan2(Math.sin(Math.atan2(a.y-u.y,a.x-u.x)-u.angle),Math.cos(Math.atan2(a.y-u.y,a.x-u.x)-u.angle)))<=rules.halfArc+1e-9&&services.visible(u,a)&&window.TriumphIndustrialTroopers.clear(u,a,{blocked:services.blocked,props:s.props})){if(s.nests.includes(a)){a.hp--;if(a.hp<=0){services.burst(a.x,a.y,40);if(u.id)s.score[u.id-1]+=100;}}else services.damage(a,1,u.id);}
  s.incendiaryPulses??=[];s.incendiaryPulses.push({x:u.x,y:u.y,angle:u.angle,until:s.t+.16});services.emitAcousticEvent?.(u,280);return true;
 }
 function eligible(u,a,s,{visible,blocked}){return a!==u&&a.team==='human'&&a.alive&&a.hp>0&&caps[a.type]&&a.hp<caps[a.type]&&distance(u,a)<=rules.nearby+1e-9&&visible(u,a)&&window.TriumphIndustrialTroopers.clear(u,a,{blocked,props:s.props});}
 function recover(u,s,dt,services){const q=u.recovery;if(!q)return false;
  const moved=q.x!==u.x||q.y!==u.y;q.x=u.x;q.y=u.y;
  const leader=s.humans.find(a=>a.alive&&a.id===u.leader),returning=u.order===3&&distance(u,u.anchor||u)>12,following=u.order===1&&leader&&distance(u,leader)>75;
  if(!u.alive||!q.remaining||moved||u.movingUntil>s.t||u.order===2||u.attackMove||u.focusTarget||u.useOrder||u.supplyTrip||returning||following){q.progress=0;q.target=null;return false;}
  const a=q.target&&eligible(u,q.target,s,services)&&s.humans.includes(q.target)?q.target:s.humans.find(a=>eligible(u,a,s,services));
  if(!a){q.progress=0;q.target=null;return false;}if(q.target!==a){q.target=a;q.progress=0;}q.progress+=dt;
  if(q.progress+1e-9>=rules.treatment){a.hp=Math.min(caps[a.type],a.hp+1);q.remaining--;q.progress=0;q.target=null;}
  return true;
 }
 return {rules,caps,initialize,advance,spray,recover,eligible};
})();
