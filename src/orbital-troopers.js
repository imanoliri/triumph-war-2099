'use strict';
// Authored Orbital kits; shared crawler mine damage conventions remain unchanged.
window.TriumphOrbitalTroopers=(()=>{
 const rules=Object.freeze({mines:4,mineArm:1,mineLife:Infinity,mineTrigger:20,mineBlast:32,mineDamage:2,range:90,reload:2});
 function initialize(u){if(u.type==='mine-layer')u.mineKit={remaining:rules.mines};}
 function clear(p,blocked){return Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=12&&p.x<=1012&&p.y>=42&&p.y<=752&&window.TriumphDesertRiders.clear(p.x,p.y,4,blocked);}
 function place(u,point,s,{navigation,blocked,revision}){if(!u.alive||!u.mineKit?.remaining||!clear(point,blocked)||!Number.isFinite(navigation.routeDistance(u,point,blocked,revision)))return false;u.placeCharge={x:point.x,y:point.y};u.useOrder=null;u.focusTarget=null;u.attackMove=null;u.patrol=null;u.order=2;return true;}
 function planting(u,s,dt,{navigate,blocked}){if(!u.mineKit||!u.placeCharge)return false;const p=u.placeCharge;if(!u.alive||!u.mineKit.remaining){u.placeCharge=null;return false;}if(!clear(p,blocked)){u.placeCharge=null;u.order=3;u.anchor={x:u.x,y:u.y};return true;}if(Math.hypot(u.x-p.x,u.y-p.y)>4){navigate(u,p.x-u.x,p.y-u.y,dt,36);return true;}s.orbitalMines??=[];s.orbitalMines.push({x:p.x,y:p.y,age:0,owner:u.id});u.mineKit.remaining--;u.placeCharge=null;u.order=3;u.anchor={x:u.x,y:u.y};return true;}
 function step(s,dt,services){window.TriumphDesertRiders.updateMines(s.orbitalMines||[],dt,{...services,aliens:s.aliens},rules);}
 return {rules,initialize,place,planting,step};
})();
