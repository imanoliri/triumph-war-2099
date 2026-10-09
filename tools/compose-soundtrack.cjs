'use strict';
// Newly authored local TRI067 motifs: see docs/SOUNDTRACK.md.
function compose(){
const themes=[
 ['title',72,0,[0,4,7,11,7,4,2,7],[0,5,9,7]],
 ['snow',60,88,[0,7,12,10,7,3,5,2],[0,3,8,5]],
 ['maritime',65,10,[0,2,4,7,9,7,4,2],[0,7,9,5]],
 ['capital',62,62,[0,3,7,5,10,7,3,2],[0,5,3,7]],
 ['desert',64,104,[0,1,4,7,8,7,4,1],[0,1,5,7]],
 ['jungle',67,12,[0,3,5,7,10,5,3,7],[0,5,3,10]],
 ['volcanic',57,81,[0,1,7,6,3,1,6,7],[0,1,6,3]],
 ['undercity',59,89,[0,2,3,7,6,3,2,6],[0,6,3,2]]
];
const matrix={};
for(const [key,root,program,melody,bass] of themes){
 const notes=[],beat=key==='snow'?.6:key==='volcanic'?.375:.5;
 for(let bar=0;bar<8;bar++){
  const t=bar*4*beat,base=root-24+bass[bar%4];
  notes.push([t,beat*3.5,base,.55,0,32]);
  for(let step=0;step<8;step++){
   const at=t+step*beat/2;
   notes.push([at,beat*.42,root+melody[(step+bar*3)%8],.52,1,program]);
   if(step%2===0)notes.push([at,beat*.18,step===4?38:35,.4,9,0]);
  }
  notes.push([t,beat*3.2,root-12+bass[bar%4],.25,2,89]);
 }
 notes.sort((a,b)=>a[0]-b[0]);
 matrix[key]={duration:32*beat,notes};
}
return matrix;
}
module.exports={compose};
if(require.main===module){
const fs=require('node:fs');
const file=require('node:path').resolve(__dirname,'../assets/audio/music-data.js'),original=fs.readFileSync(file,'utf8').split(/\r?\n/)[0];fs.writeFileSync(file,original+'\n\n// Original TRI067 compositions; reproducible source: tools/compose-soundtrack.cjs.\nwindow.ROYALTY_FREE_MUSIC='+JSON.stringify(compose())+';\n');
}
