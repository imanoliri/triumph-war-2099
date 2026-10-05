'use strict';
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const box={window:{},Set,Math};vm.createContext(box);vm.runInContext(fs.readFileSync('src/desert-worm.js','utf8'),box);
const w=box.window.TriumphDesertWorm,r=w.rules;
const clear=()=>false,person=(x,y,type='soldier')=>({x,y,type,hp:20,alive:true});
const advance=(u,dt,humans,blocked=clear)=>w.step(u,dt,{humans,blocked,damage:(h,n)=>h.hp-=n});
assert.equal(w.create(100,100,(x,y)=>x>=110),null,'Full body spawn clearance');
for(const [dx,dy,sx,sy] of [[100,3,1,0],[-100,3,-1,0],[3,100,0,1],[3,-100,0,-1]]){
 const u=w.create(400,400,clear),h=person(400+dx,400+dy);advance(u,1,[h]);assert.equal(u.phase,'warning');assert(w.exposed(u));assert.equal(u.telegraph.dx,sx);assert.equal(u.telegraph.dy,sy);
 h.x=700;h.y=700;advance(u,1.2,[h]);advance(u,.1,[h]);assert.equal(u.x,400+sx*30);assert.equal(u.y,400+sy*30,'Direction stays committed despite dodge');
}
const u=w.create(100,100,clear),hit=person(140,100),dodged=person(160,100),air=person(180,100,'air');advance(u,1,[hit,dodged,air]);dodged.y=170;advance(u,1.2,[hit,dodged,air]);
for(let i=0;i<50;i++)advance(u,.02,[hit,dodged,air]);assert.equal(hit.hp,18,'Only one hit per charge');assert.equal(dodged.hp,20);assert.equal(air.hp,20);assert.equal(u.phase,'recovery');assert(w.exposed(u));advance(u,1.5,[]);assert.equal(u.phase,'burrow');assert(!w.exposed(u));
const wall=w.create(100,100,clear),target=person(240,100);advance(wall,1,[target]);advance(wall,1.2,[target]);advance(wall,3,[target],(x,y)=>x>=170&&x<=171);assert.equal(wall.phase,'recovery');assert(wall.x<158,'No thin-wall tunneling at large dt');assert.equal(target.hp,20,'No hits behind wall');
const travel=w.create(100,100,clear);advance(travel,3,[person(500,100)],x=>x>=170);assert(travel.x<158);assert.equal(travel.phase,'burrow');
// Record actual canvas commands per lifecycle stage, not screenshots/live play.
for(const phase of ['burrow','warning','charge','recovery']){
 const calls=[],ctx=new Proxy({}, {get:(o,k)=> (...args)=>calls.push([k,...args]),set:(o,k,v)=>(calls.push([k,v]),true)});
 const actor=w.create(200,200,clear);actor.phase=phase;if(phase==='warning'||phase==='charge')actor.telegraph={x:200,y:200,dx:1,dy:0,range:260,width:24};w.draw(ctx,actor,1);
 assert(calls.some(c=>c[0]==='ellipse'));assert.equal(calls.filter(c=>c[0]==='save').length,calls.filter(c=>c[0]==='restore').length);
 if(phase==='warning'){assert(calls.some(c=>c[0]==='strokeRect'),'Visible exposed warning outline');assert(calls.some(c=>c[0]==='lineTo'&&c[1]===460),'Committed lane drawn');}
}
vm.runInContext(fs.readFileSync('navigation.js','utf8'),box);
const rock=(x,y)=>x<0||x>1023||y<36||y>767||(x>=260&&x<=300&&y>=220&&y<=500);
const footprint=(x,y)=>!w.clear(x,y,rock),nav=box.window.TriumphNavigation;
const detour=w.create(200,350,rock),stationary=person(440,410);
let warned=false;
for(let i=0;i<1800;i++){
 w.step(detour,.04,{humans:[stationary],blocked:rock,damage:(h,n)=>h.hp-=n,route:(a,b)=>nav.step(a,b,footprint,'fixed-rock')});
 assert(w.clear(detour.x,detour.y,rock));
 if(detour.phase==='warning'){warned=true;const t=detour.telegraph;assert(Math.abs(t.dy?stationary.x-t.x:stationary.y-t.y)<=8,'Aligned lane threatens stationary diagonal target');break;}
}
assert(warned,'Reachable target around rock obtains warning');
console.log('Passed worm lifecycle, cardinal lock/dodge, once-per-target ground damage, footprint/wall sweep and phase draw-command fixtures.');
