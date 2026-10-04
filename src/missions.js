'use strict';
// Pure progress calculation shared by the HUD and automatic victory.
window.TriumphMissions={progress(s){
 if(s.customMission){const bugs=s.aliens.filter(a=>a.alive&&a.hp>0).length,nests=s.nests.filter(n=>n.hp>0).length,vents=s.vents?.length||0,terminals=s.customMission.objective.activate.filter(key=>!s.terminals.some(t=>t.key===key&&t.active)).length;const pending=[];if(terminals)pending.push(`${terminals} relays`);if(nests)pending.push(`${nests} nests`);if(bugs)pending.push(`${bugs} bugs`);if(vents)pending.push(`${vents} transitioning bugs`);return {bugs,nests,vents,terminals,wave:0,wait:0,crystal:false,ready:pending.length===0,label:pending.length?'Remaining: '+pending.join(' · '):'Relays secured · area clear'};}
 const bugs=s.aliens.filter(a=>a.alive&&a.hp>0).length,nests=s.nests.filter(n=>n.hp>0).length,wave=s.wave?Math.max(0,s.wave.normalKills-s.waveKills.normal)+Math.max(0,s.wave.queenKills-s.waveKills.queen):0,terminals=s.originalMap?(s.rules?.victoryTerminals||[]).filter(id=>!s.terminals.some(t=>t.object===id&&t.active)).length:0,wait=Math.max(s.hold||0,Math.max(0,(s.rules?.minimumTime||0)-s.t)),crystal=s.originalMap&&s.level===8?!s.crystal?.recovered:!s.originalMap&&s.level===7?!s.crystal?.recovered:false;
 const vents=s.vents?.length||0;
 const pending=[];if(vents)pending.push(vents+' ceiling / transitioning bugs');if(bugs)pending.push(`${bugs} bugs`);if(nests)pending.push(`${nests} nests`);if(wave)pending.push(`${wave} wave`);if(terminals)pending.push(`${terminals} terminals`);if(wait>0)pending.push(`wait ${Math.ceil(wait)}s`);if(crystal)pending.push('crystal extraction');
 return {bugs,vents,nests,wave,terminals,wait,crystal,ready:pending.length===0,label:pending.length?'Remaining: '+pending.join(' · '):'Area clear'};
}};
