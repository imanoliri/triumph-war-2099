'use strict';
// Approved recreation balance, separate from recovered source rules.
window.TriumphBalance={
  motionMultipliers:{veryeasy:22/24,easy:23/24,normal:1,hard:25/24,veryhard:27/24},
  specialistRules:{redbug:{hp:5,sight:200,fireMin:2.6,fireMax:4.2,spawnChance:.1}},
  burstRules:{commando:{min:5,max:7,restMin:.8,restMax:1.2,delayMin:.2,delayMax:.4},soldier:{min:3,max:6,restMin:.8,restMax:1.8,delayMin:.2,delayMax:.8},robot:{min:3,max:6,restMin:.8,restMax:1.8,delayMin:.2,delayMax:.8},tank:{min:9,max:12,restMin:2.5,restMax:3.5,delayMin:.4,delayMax:1.2}},
  cannonSweepRules:{maxArc:15*Math.PI/180},
  tankSweepRules:{range:300,minArc:25*Math.PI/180,focusArc:15*Math.PI/180,maxArc:Math.PI*4/9,padding:Math.PI/18},
  bugFireBases:{veryeasy:5.5,easy:4.8,normal:3.8,hard:3.2,veryhard:2.7}
};
