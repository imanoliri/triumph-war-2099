'use strict';
// Authored Industrial kit. The caller owns actors, simulation clock and damage.
window.TriumphIndustrialTroopers=(()=>{
 const rules=Object.freeze({riveterRange:180,riveterSpeed:90,riveterDamage:2,riveterInterval:1.2,riveterMovement:.75,arcRange:110,arcJump:40,arcDamage:1,arcRecharge:1.5});
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 function clear(a,b,{blocked,props=[]}){const d=distance(a,b),steps=Math.ceil(d);for(let i=0;i<=steps;i++){const f=steps?i/steps:0,x=a.x+(b.x-a.x)*f,y=a.y+(b.y-a.y)*f;if(blocked(x,y)||props.some(p=>p.hp>0&&x>=p.left&&x<p.left+p.w&&y>=p.top&&y<p.top+p.h))return false;}return true;}
 function fireArc(u,s,{blocked,visible,damage,burst,emitAcousticEvent,lane}){
  const first=u.arcTarget,eligible=a=>a&&a.alive!==false&&a.hp>0&&a.phase!=='burrow';
  if(s.t<(u.arcReadyAt||0)-1e-9||!eligible(first)||![...s.aliens,...s.nests].includes(first)||distance(u,first)>rules.arcRange||!visible(u,first)||!lane(u,first)||!clear(u,first,{blocked,props:s.props}))return false;
  // Snapshot one distinct target before damage, so a lethal primary can still jump.
  const next=[...new Set([...s.aliens,...s.nests])].filter(a=>a!==first&&eligible(a)&&distance(first,a)<=rules.arcJump&&visible(u,a)&&clear(first,a,{blocked,props:s.props})).sort((a,b)=>distance(first,a)-distance(first,b))[0];
  for(const a of [first,next].filter(Boolean)){if(s.nests.includes(a)){a.hp-=rules.arcDamage;emitAcousticEvent?.(a,280);if(a.hp<=0){burst(a.x,a.y,40);if(u.id)s.score[u.id-1]+=100;}}else damage(a,rules.arcDamage,u.id);burst(a.x,a.y,8,'#8ffff1');}
  emitAcousticEvent?.(u,280);u.arcReadyAt=s.t+rules.arcRecharge;u.cool=rules.arcRecharge;return true;
 }
 return {rules,clear,fireArc};
})();
