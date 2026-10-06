'use strict';
process.chdir(require('node:path').resolve(__dirname,'..'));
const fs=require('fs'),vm=require('vm');
const box={window:{}};vm.runInNewContext(fs.readFileSync('src/custom-missions.js','utf8'),box);
const profiles=Object.fromEntries(['veryeasy','easy','normal','hard','veryhard'].map(d=>[d,box.window.TriumphCustomMissions.resolve('custom-capital-district-twelve',d)]));
fs.writeFileSync('assets/custom/district-twelve/runtime-contract.json',JSON.stringify({provenance:'Custom runtime placements from src/custom-missions.js; original sprite hotspots are retained, not terrain pixels.',profiles},null,2)+'\n');
const file='assets/custom/district-twelve/manifest.json',manifest=JSON.parse(fs.readFileSync(file));manifest.runtimeContract='runtime-contract.json';fs.writeFileSync(file,JSON.stringify(manifest,null,2)+'\n');
