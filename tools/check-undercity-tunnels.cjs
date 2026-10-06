'use strict';
process.chdir(require('node:path').resolve(__dirname, '..'));
const fs = require('fs'), assert = require('assert/strict');

const source = fs.readFileSync('tools/check-recreation.cjs', 'utf8').split('const api=sandbox.window.triumph')[0];
function setup() {
  return new Function('require', 'module', '__dirname', source + ';return sandbox;')(require, {}, __dirname);
}

const b = setup(), w = b.window, id = 'custom-undercity-tunnels-breach';
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
    ...s.customMission.nests,
    ...s.customMission.bugs,
    ...s.customMission.vents,
    ...s.customMission.waves.flatMap(w => w.points),
    ...s.customMission.route,
    ...s.customMission.terminals.map(t => [t.x, t.y]),
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

// 4. Subterranean vent bug mechanics check
fresh();
assert(s.vents.length > 0, 'Subterranean vent bugs initialized');
const ventBug = s.vents[0];
assert.equal(ventBug.phase, 'ceiling', 'Vent bug starts in ceiling phase');

// 5. Objective activation, extraction, loss & victory checks
fresh();
// Defeat on total army loss
s.humans.forEach(u => (u.alive = false));
run();
assert.equal(s.mode, 'defeat', 'Defeat on total army loss');

// Victory condition test
fresh();
s.terminals.forEach(t => (t.active = true));
const extractionZone = s.customMission.objective.extractLivingGroundHumans;
s.humans.forEach(u => {
  u.x = extractionZone.x;
  u.y = extractionZone.y;
});
run();
assert.equal(s.mode, 'victory', 'Victory awarded on terminal hack activation and extraction zone reach');

console.log('Passed Undercity Tunnels Breach objective, profile, route, vent bug and victory checks.');

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
  'docs/design/undercity-tunnels-pressure.json',
  JSON.stringify({ method: 'Full VM runtime simulation', logs }, null, 2) + '\n'
);
console.log('Passed Undercity Tunnels stationary pressure:', JSON.stringify(logs));
