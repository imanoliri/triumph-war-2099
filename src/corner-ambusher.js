'use strict';
// Authored Undercity fixed kit; clocks and observed positions belong to the actor.
window.TriumphCornerAmbusher=(()=>{
 const rules=Object.freeze({setup:1,rounds:3,interval:.1,reprepare:2,range:120,damage:1,speed:290});
 function initialize(u){u.ambusher={x:u.x,y:u.y,stationarySince:null,rounds:0,nextShot:0,prepareAt:0};u.cool=0;u.order=3;u.anchor={x:u.x,y:u.y};return u;}
 function observe(u,time){const g=u.ambusher||initialize(u).ambusher;if(g.x!==u.x||g.y!==u.y){if(g.rounds)g.prepareAt=Math.max(g.prepareAt,time+rules.reprepare);g.rounds=0;g.stationarySince=time;g.x=u.x;g.y=u.y;}else if(g.stationarySince===null)g.stationarySince=time;return g;}
 function ready(u,time){const g=observe(u,time);return time+1e-9>=Math.max(g.prepareAt,g.stationarySince+rules.setup,g.nextShot);}
 function fired(u,time){const g=observe(u,time);g.rounds++;g.nextShot=time+rules.interval;if(g.rounds===rules.rounds){g.rounds=0;g.prepareAt=time+rules.reprepare;}u.cool=0;}
 return {rules,initialize,observe,ready,fired};
})();
