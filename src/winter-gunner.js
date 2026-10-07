'use strict';
// Custom fixed-kit snow infantry. Clock and position are explicit inputs.
window.TriumphWinterGunner=(()=>{
 const rules=Object.freeze({setup:.5,rounds:6,burst:1.2,reload:2,range:280,damage:1,speed:290});
 function initialize(u){u.gunner={x:u.x,y:u.y,stationarySince:null,started:null,rounds:0,reloadUntil:0};u.cool=0;return u;}
 function observe(u,time){const g=u.gunner||initialize(u).gunner;if(g.x!==u.x||g.y!==u.y){if(g.rounds&&g.rounds<rules.rounds)g.reloadUntil=Math.max(g.reloadUntil,time+rules.reload);g.started=null;g.rounds=0;g.stationarySince=time;g.x=u.x;g.y=u.y;}else if(g.stationarySince===null)g.stationarySince=time;return g;}
 function ready(u,time){const g=observe(u,time);return time+1e-9>=g.reloadUntil&&time+1e-9>=g.stationarySince+rules.setup&&(g.started===null||time+1e-9>=g.started+g.rounds*rules.burst/(rules.rounds-1));}
 function fired(u,time){const g=observe(u,time);if(g.started===null){g.started=time;g.rounds=0;}g.rounds++;if(g.rounds===rules.rounds){g.reloadUntil=time+rules.reload;g.started=null;g.rounds=0;}u.cool=0;}
 return {rules,initialize,observe,ready,fired};
})();
