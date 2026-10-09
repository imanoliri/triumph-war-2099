'use strict';
// Read-only runtime evidence in the existing disposable VM. Never production state.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'../../..');
function capture(){
 const previous=process.cwd();process.chdir(root);
 try {
 const fixture=fs.readFileSync('tools/check-recreation.cjs','utf8').split('const api=sandbox.window.triumph')[0].replace("if(file==='game.js')source=source.replace", "if(file==='game.js')source=source.replace('const customSoldiers=', 'window.__catalogueRows=rows;const customSoldiers=').replace");
 const {sandbox,elements}=new Function('require','module','__dirname',fixture+'\nreturn {sandbox,elements};')(require,{},path.join(root,'tools'));
 elements['#units'].onclick();
 const w=sandbox.window,rows=JSON.parse(JSON.stringify(w.__catalogueRows));
 const types=fs.readFileSync('game.js','utf8').match(/const infantryType=u=>\[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(t=>t.slice(1,-1));
 const actors={};for(const type of types){const u=w.__fixture().addTroop(52,150,350,type);actors[type]={context:'disposable infantry reinforcement factory, before orders',hp:u.hp,order:u.order,weapon:u.weapon};}
 // Vehicle and commander HP comes from mission/source initialization, not the
 // generic infantry reinforcement factory. Guide/profile evidence is separate.
 const rules={};for(const [name,value] of Object.entries(w))if(name.startsWith('Triumph')&&value?.rules)rules[name]=JSON.parse(JSON.stringify(value.rules));
 return {rows,types,actors,rules,worldRosters:JSON.parse(JSON.stringify(w.TriumphCustomMissions.worldRosters)),burstRules:JSON.parse(JSON.stringify(w.TriumphBalance.burstRules))};
 }finally{process.chdir(previous);}
}
module.exports=capture;
