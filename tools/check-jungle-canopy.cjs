'use strict';
process.chdir(require('node:path').resolve(__dirname, '..'));
const fs = require('fs'), assert = require('assert/strict');

const source = fs.readFileSync('tools/check-recreation.cjs', 'utf8').split('const api=sandbox.window.triumph')[0];
function setup() {
  return new Function('require', 'module', '__dirname', source + ';return sandbox;')(require, {}, __dirname);
}

const b = setup(), w = b.window, id = 'custom-jungle-canopy-recon';
let f, s;

function fresh(d = 'normal') {
  b.document.querySelector('#difficulty').value = d;
  w.triumph.loadCustomMission(id);
  f = w.__fixture();
  s = f.state;
}

function run() {
  s.mode = 'playing';
  if (w.triumph.state().paused) b.document.querySelector('#pause').onclick();
  f.update(0.02);
}

// 1. Difficulty profiles and connected pathways
let budget = 0, interval = Infinity;
for (const d of ['veryeasy', 'easy', 'normal', 'hard', 'veryhard']) {
  fresh(d);
  assert.equal(s.nests.length, 4);
  assert(s.customWaves.arrivals.length > budget);
  assert(s.customMission.nestInterval < interval);
  budget = s.customWaves.arrivals.length;
  interval = s.customMission.nestInterval;

  const points = [
    ...s.customMission.commanders,
    ...s.customMission.soldiers,
    ...s.customMission.rescueParty,
    ...s.customMission.nests,
    ...s.customMission.bugs,
    ...s.customMission.ambushes,
    ...s.customMission.waves.flatMap(w => w.points),
    ...s.customMission.route,
    ...s.customMission.support.map(p => [p.x, p.y])
  ];

  for (const [x, y] of points) {
    assert(!f.blocked(x, y), `${d} clear ${x},${y}`);
    assert(w.TriumphNavigation.reachable(s.humans[0], { x, y }, f.blocked), `${d} connected ${x},${y}`);
  }

  for (const n of s.nests) {
    for (const [dx, dy] of [[-8, -8], [8, 8], [-25, 20], [25, 20]]) {
      assert(!f.blocked(n.x + dx, n.y + dy), 'Nest birth clearance');
    }
  }
}

// 2. Route travel check
fresh();
const walker = s.humans.find(u => u.type === 'soldier');
for (const [x, y] of s.customMission.route) {
  walker.attackMove = { x, y, force: true };
  for (let i = 0; i < 5000 && walker.attackMove; i++) f.attackMoveStep(walker, null, 0.04);
  assert(Math.hypot(walker.x - x, walker.y - y) < 20, 'Route checkpoint reached');
  assert(!f.blocked(walker.x, walker.y));
}

// 3. Tactical freeze preserves state
fresh();
s.mode = 'playing';
const frozen = JSON.stringify(s);
f.update(100);
assert.equal(JSON.stringify(s), frozen, 'Tactical startup freeze');

// 4. Ambush mechanics trigger check
fresh();
assert(s.jungleAmbushes.length > 0);
assert.equal(s.jungleAmbushes.filter(a => a.triggered).length, 0);
const triggerHuman = s.humans[0];
triggerHuman.x = s.jungleAmbushes[0].x;
triggerHuman.y = s.jungleAmbushes[0].y;
run();
assert(s.jungleAmbushes[0].triggered, 'Ambush triggered on human proximity');
f.update(0.5);
assert(s.aliens.some(a => a.type === 'canopy-spider'), 'Canopy spider spawned from ambush');

// 5. Objective acquisition, rescue, loss & victory checks
fresh();
const u = s.humans.find(u => u.type === 'soldier');
u.external = { until: 1e6 };
u.shieldUntil = 1e6;
u.x = 865;
u.y = 384;
run();
assert(!s.rescueAcquired, 'No early rescue before terminal activation');

f.interact({ ...s.terminals[0] }, s.terminals[0]);
assert(s.terminals[0].active, 'Terminal activated');

s.rules.maxAliens = 50;
run();
assert(s.rescueAcquired, 'Survey party acquired after terminal activation');
assert.equal(s.humans.filter(u => u.rescueSurvivor).length, 3);

// Test rescued loss defeat
let rescued = s.humans.filter(u => u.rescueSurvivor);
rescued.forEach(u => (u.alive = false));
assert(f.missionProgress().lost);
run();
assert.equal(s.mode, 'defeat', 'Defeat on survey party loss');

// Test army exhaustion defeat
fresh();
s.humans.forEach(u => (u.alive = false));
run();
assert.equal(s.mode, 'defeat', 'Defeat on total army loss');

// Test victory condition
fresh();
s.terminals[0].active = true;
const commander = s.humans[0];
commander.x = 865;
commander.y = 384;
run();
assert(s.rescueAcquired);
const survivor = s.humans.find(u => u.rescueSurvivor);
survivor.x = 120;
survivor.y = 390;
run();
assert.equal(s.mode, 'victory', 'Victory awarded on survivor extraction');

console.log('Passed Jungle Canopy Recon objective, profile, route, ambush and victory checks.');

if (!process.argv.includes('--record')) process.exit(0);

const logs = [];
for (const d of ['veryeasy', 'easy', 'normal', 'hard', 'veryhard']) {
  const box = setup();
  box.document.querySelector('#difficulty').value = d;
  box.window.triumph.loadCustomMission(id);
  const fx = box.window.__fixture(), st = fx.state;
  st.mode = 'playing';
  box.document.querySelector('#pause').onclick();
  for (let i = 0; i < 3000 && st.mode === 'playing'; i++) fx.update(0.02);
  logs.push({
    difficulty: d,
    time: +st.t.toFixed(1),
    mode: st.mode,
    army: st.humans.filter(u => u.alive && u.type !== 'commander').length,
    bugs: st.aliens.length,
    kills: st.kills,
    emitted: st.customWaves.emitted,
    budget: st.customWaves.arrivals.length,
    interval: st.customMission.nestInterval
  });
}
fs.writeFileSync(
  'docs/design/jungle-canopy-pressure.json',
  JSON.stringify({ method: 'Full VM runtime simulation', logs }, null, 2) + '\n'
);
console.log('Passed Jungle Canopy stationary pressure:', JSON.stringify(logs));
