'use strict';
// Stateless helpers: game.js owns placement mode, flags and unit orders.
window.TriumphRally={
 choose(unit,points,state,blocked){
  const revision=state.level+':rally:'+(state.doors||[]).map(d=>Number(d.open)+','+Number(d.locked)).join(';')+':'+(state.props||[]).filter(p=>p.wall&&p.hp>0).length,collision=(x,y)=>blocked(x,y,true);
  let best=null,distance=Infinity;
  for(const point of points){const route=window.TriumphNavigation.routeDistance(unit,point,collision,revision);if(route<distance){distance=route;best=point;}}
  return best;
 },
 draw(ctx,points,text){
  for(const point of points){ctx.strokeStyle='#ffcf57';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(point.x,point.y+8);ctx.lineTo(point.x,point.y-14);ctx.stroke();ctx.fillStyle='#ffcf57';ctx.fillRect(point.x+1,point.y-14,19,14);text(String(point.id),point.x+10,point.y-3,'#182313',11,'center');}
 }
};
