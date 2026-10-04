'use strict';
// Shared four-neighbour distance fields route whole squads around map obstacles.
(() => {
 const size=16,cols=64,rows=48,total=cols*rows;
 let cache=new Map(),contexts=new WeakMap(),collision;
 // Partition fields by stable collision policy; revisions invalidate only that policy.
 function prepare(blocked,revision){let context=contexts.get(blocked);if(!context){context={cache:new Map(),stamp:undefined};contexts.set(blocked,context);}if(revision!==undefined&&revision!==context.stamp){context.cache.clear();context.stamp=revision;}cache=context.cache;collision=blocked;}
 const point=i=>({x:(i%cols)*size+size/2,y:Math.floor(i/cols)*size+size/2});
 function clear(x,y){return y>=40&&y<752&&x>=8&&x<1016&&![[-4,-4],[4,-4],[-4,4],[4,4],[0,0]].some(([dx,dy])=>collision(x+dx,y+dy));}
 function line(a,b){const distance=Math.hypot(b.x-a.x,b.y-a.y),steps=Math.ceil(distance/5);for(let n=1;n<=steps;n++)if(!clear(a.x+(b.x-a.x)*n/steps,a.y+(b.y-a.y)*n/steps))return false;return true;}
 function field(goal){const gx=Math.max(0,Math.min(cols-1,Math.floor(goal.x/size))),gy=Math.max(2,Math.min(rows-2,Math.floor(goal.y/size))),key=gy*cols+gx;
  if(cache.has(key))return cache.get(key);const pass=new Uint8Array(total),distance=new Int16Array(total);distance.fill(-1);let nearest=-1,best=Infinity;
  for(let i=0;i<total;i++){const p=point(i);pass[i]=clear(p.x,p.y)?1:0;if(pass[i]){const d=(p.x-goal.x)**2+(p.y-goal.y)**2;if(d<best){best=d;nearest=i;}}}
  if(nearest<0)return null;const queue=new Int16Array(total);let head=0,tail=1;queue[0]=nearest;distance[nearest]=0;
  while(head<tail){const i=queue[head++],x=i%cols,y=Math.floor(i/cols);for(const next of [x>0?i-1:-1,x<cols-1?i+1:-1,y>0?i-cols:-1,y<rows-1?i+cols:-1])if(next>=0&&pass[next]&&distance[next]<0){distance[next]=distance[i]+1;queue[tail++]=next;}}
  const result={distance,target:point(nearest)};if(cache.size>=24)cache.delete(cache.keys().next().value);cache.set(key,result);return result;
 }
 window.TriumphNavigation={routeDistance(unit,goal,blocked,revision){prepare(blocked,revision);if(!clear(goal.x,goal.y))return Infinity;if(line(unit,goal))return Math.hypot(unit.x-goal.x,unit.y-goal.y);const f=field(goal);if(!f)return Infinity;let best=Infinity;const x=Math.floor(unit.x/size),y=Math.floor(unit.y/size);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx<0||nx>=cols||ny<0||ny>=rows)continue;const i=ny*cols+nx,p=point(i);if(f.distance[i]>=0&&line(unit,p)&&line(f.target,goal))best=Math.min(best,Math.hypot(unit.x-p.x,unit.y-p.y)+f.distance[i]*size+Math.hypot(f.target.x-goal.x,f.target.y-goal.y));}return best;},reachable(unit,goal,blocked,revision){prepare(blocked,revision);if(!clear(goal.x,goal.y))return false;if(line(unit,goal))return true;const f=field(goal);if(!f)return false;const x=Math.floor(unit.x/size),y=Math.floor(unit.y/size);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx<0||nx>=cols||ny<0||ny>=rows)continue;const i=ny*cols+nx;if(f.distance[i]>=0&&line(unit,point(i)))return true;}return false;},reset(){contexts=new WeakMap();cache=new Map();collision=undefined;},destination(unit,goal,blocked){prepare(blocked);if(clear(goal.x,goal.y))return goal;cache.clear();const f=field(unit);if(!f)return null;let best=Infinity,chosen=null;for(let i=0;i<total;i++)if(f.distance[i]>=0){const p=point(i),d=(p.x-goal.x)**2+(p.y-goal.y)**2;if(d<best){best=d;chosen=p;}}return chosen;},line(a,b,blocked){prepare(blocked);return line(a,b);},step(unit,goal,blocked,revision){prepare(blocked,revision);
  if(line(unit,goal))return goal;const f=field(goal);if(!f)return null;const x=Math.floor(unit.x/size),y=Math.floor(unit.y/size),index=y*cols+x;let selected=null,best=Infinity;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx<0||nx>=cols||ny<0||ny>=rows)continue;const next=ny*cols+nx,d=f.distance[next],p=point(next);if(d<0||!line(unit,p))continue;const score=d*size*2+Math.hypot(unit.x-p.x,unit.y-p.y);if(score<best){best=score;selected=p;}}
  return selected;
 }};
})();
