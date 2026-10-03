'use strict';
// Shared four-neighbour distance fields route whole squads around map obstacles.
(() => {
 const size=16,cols=64,rows=48,total=cols*rows;
 let cache=new Map(),stamp='',collision;
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
 window.TriumphNavigation={reset(){cache.clear();stamp='';},line(a,b,blocked){collision=blocked;return line(a,b);},step(unit,goal,blocked,revision){collision=blocked;if(revision!==stamp){cache.clear();stamp=revision;}
  if(line(unit,goal))return goal;const f=field(goal);if(!f)return null;const x=Math.floor(unit.x/size),y=Math.floor(unit.y/size),index=y*cols+x;let selected=null,best=Infinity;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx<0||nx>=cols||ny<0||ny>=rows)continue;const next=ny*cols+nx,d=f.distance[next],p=point(next);if(d<0||!line(unit,p))continue;const score=d*size*2+Math.hypot(unit.x-p.x,unit.y-p.y);if(score<best){best=score;selected=p;}}
  return selected;
 }};
})();
