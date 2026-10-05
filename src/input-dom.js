'use strict';
window.TriumphInputDOM={bind(canvas,host,input,W,H){
 const point=e=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};};
 canvas.addEventListener('contextmenu',e=>e.preventDefault());
 for(const name of ['pointerdown','pointermove','pointerup'])canvas.addEventListener(name,e=>input[name]({button:e.button,pointerId:e.pointerId,timeStamp:e.timeStamp,shiftKey:e.shiftKey,point:point(e),preventDefault:()=>e.preventDefault()}));
 for(const name of ['pointercancel','lostpointercapture'])canvas.addEventListener(name,()=>input[name]());
 for(const name of ['keydown','keyup'])host.addEventListener(name,e=>input[name]({code:e.code,repeat:e.repeat,preventDefault:()=>e.preventDefault()}));
 host.addEventListener('blur',()=>input.blur());
}};
