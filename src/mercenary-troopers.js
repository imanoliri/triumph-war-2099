'use strict';
// Authored finite Mercenary kits; caller owns clock, movement, sight and actors.
window.TriumphMercenaryTroopers=(()=>{
 const rules=Object.freeze({singleRange:240,spreadRange:120,focusRange:260,switchTime:.6,lockout:1,trackingTime:1,interval:.38,speed:290});
 const is=u=>['weapon-specialist','bounty-hunter'].includes(u.type);
 const range=u=>u.type==='bounty-hunter'?260:u.specialist?.mode==='spread'?120:240;
 function initialize(u){if(u.type==='weapon-specialist')u.specialist={mode:'single',preferred:'auto',pending:null,readyAt:0,lockUntil:0};if(u.type==='bounty-hunter')u.bounty={target:null,since:null,x:u.x,y:u.y};}
 function prefer(u,mode){if(u.type!=='weapon-specialist'||!['auto','single','spread'].includes(mode))return false;u.specialist.preferred=mode;return true;}
 function advance(u,t){const k=u.specialist;if(k?.pending&&t>=k.readyAt-1e-9){k.mode=k.pending;k.pending=null;k.lockUntil=k.readyAt+rules.lockout;}}
 function clear(u,target,props){const dx=target.x-u.x,dy=target.y-u.y,steps=Math.ceil(Math.hypot(dx,dy));for(let i=0;i<=steps;i++){const f=steps?i/steps:0,x=u.x+dx*f,y=u.y+dy*f;if(props.some(p=>p.hp>0&&x>=p.left&&x<p.left+p.w&&y>=p.top&&y<p.top+p.h))return false;}return true;}
 function mode(u,target,s,{visible}){const k=u.specialist;if(!k)return;advance(u,s.t);if(k.pending||s.t<k.lockUntil)return;const d=Math.hypot(u.x-target.x,u.y-target.y),angle=Math.atan2(target.y-u.y,target.x-u.x);const grouped=[...s.aliens,...s.nests].filter(a=>a.alive!==false&&a.hp>0&&Math.hypot(u.x-a.x,u.y-a.y)<=120&&visible(u,a)&&clear(u,a,s.props||[])&&Math.abs(Math.atan2(Math.sin(Math.atan2(a.y-u.y,a.x-u.x)-angle),Math.cos(Math.atan2(a.y-u.y,a.x-u.x)-angle)))<=Math.PI/12).length>=2;const desired=k.preferred==='auto'?(d<=120&&grouped?'spread':'single'):k.preferred;if(desired!==k.mode){k.pending=desired;k.readyAt=s.t+rules.switchTime;}}
 function observe(u,t,target,visible,props=[]){const k=u.bounty;if(!k)return;const moved=k.x!==u.x||k.y!==u.y;k.x=u.x;k.y=u.y;const valid=target&&target.alive!==false&&target.hp>0&&Math.hypot(u.x-target.x,u.y-target.y)<=260&&visible(u,target)&&clear(u,target,props);if(!valid||moved||k.target!==target){k.target=valid?target:null;k.since=valid&&!moved?t:null;}else if(k.since===null)k.since=t;}
 function cancel(u){if(u.bounty)u.bounty.since=null;}
 function fire(u,s){if(u.specialist?.pending)return false;const bonus=u.bounty&&u.bounty.target&&u.bounty.since!==null&&s.t-u.bounty.since>=1-1e-9;const spread=u.specialist?.mode==='spread';for(const offset of spread?[-Math.PI/12,0,Math.PI/12]:[0]){const angle=u.angle+offset;s.bullets.push({x:u.x+Math.cos(angle)*10,y:u.y+Math.sin(angle)*10,dx:Math.cos(angle),dy:Math.sin(angle),team:u.team,owner:u.id,speed:290,life:(range(u)-10)/290,damage:bonus?2:1,mercenary:true});}u.cool=.38;if(bonus)u.bounty.since=null;return true;}
 return {rules,is,range,clear,initialize,prefer,advance,mode,observe,cancel,fire};
})();
