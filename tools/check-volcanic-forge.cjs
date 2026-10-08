'use strict';
process.chdir(require('node:path').resolve(__dirname, '..'));
const fs = require('fs'), assert = require('assert/strict');

const source = fs.readFileSync('tools/check-recreation.cjs', 'utf8').split('const api=sandbox.window.triumph')[0];
function setup() {
  return new Function('require', 'module', '__dirname', source + ';return sandbox;')(require, {}, __dirname);
}

const b = setup(), w = b.window, id = 'custom-volcanic-forge-strike';
const geometry = JSON.parse(fs.readFileSync('assets/custom/volcanic-forge/geometry.json', 'utf8'));
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
  const profileIndex = ['veryeasy', 'easy', 'normal', 'hard', 'veryhard'].indexOf(d);
  assert.equal(s.nests.length, 4);
  assert.equal(s.humans.length, [12, 12, 12, 10, 8][profileIndex]);
  assert.equal(s.customWaves.arrivals.length, [11, 14, 22, 33, 44][profileIndex]);
  assert.equal(s.customMission.nestInterval, [7, 6, 4.5, 2.6, 2][profileIndex]);
  assert.equal(s.customMission.support.length, profileIndex < 3 ? 2 : 1);
  assert.equal(JSON.stringify(s.customMission.thermalHazards), JSON.stringify(geometry.hazards));
  assert.equal(JSON.stringify(s.customMission.nests), JSON.stringify(geometry.nests));
  assert.equal(JSON.stringify(s.customMission.terminals.map(t => [t.x, t.y])), JSON.stringify(geometry.terminals));
  // Keep the distinctive core and pillar solid; placements must adapt to them.
  assert(f.blocked(800, 110), 'Northeast pillar retained');
  assert(f.blocked(520, 390), 'Magma core retained');
  for (const [x, y] of [[880, 110], [650, 390]]) {
    for (let dy = -8; dy <= 8; dy++) for (let dx = -8; dx <= 8; dx++) {
      assert(!f.blocked(x + dx, y + dy), `${d} relocated footprint ${x},${y}`);
    }
  }
  assert(s.customWaves.arrivals.length > budget);
  assert(s.customMission.nestInterval < interval);
  budget = s.customWaves.arrivals.length;
  interval = s.customMission.nestInterval;

  const points = [
    ...s.customMission.commanders,
    ...s.customMission.soldiers,
    ...s.customMission.nests,
    ...s.customMission.bugs,
    ...s.customMission.thermalHazards,
    ...s.customMission.waves.flatMap(w => w.points),
    ...s.customMission.route,
    ...s.customMission.terminals.map(t => [t.x, t.y]),
    ...s.customMission.support.map(p => [p.x, p.y]),
    ...s.customMission.weapons.map(p => [p.x, p.y]),
    ...s.humans.map(u => [u.x, u.y])
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

// 2. All profiles: ordinary infantry and both fixed kits can traverse the route
// and reach the relocated northeast spawn / east-core hazard without crossing walls.
for (const d of ['veryeasy', 'easy', 'normal', 'hard', 'veryhard']) {
  for (const type of ['soldier', 'demolition-trooper', 'cooling-trooper']) {
    fresh(d);
    const walker = s.humans.find(u => u.type === type);
    for (const [x, y] of [...s.customMission.route, [880, 110], [650, 390]]) {
      walker.attackMove = { x, y, force: true };
      for (let i = 0; i < 5000 && walker.attackMove; i++) {
        const previous = { x: walker.x, y: walker.y };
        f.attackMoveStep(walker, null, 0.04);
        const samples = Math.max(1, Math.ceil(Math.hypot(walker.x - previous.x, walker.y - previous.y)));
        for (let n = 1; n <= samples; n++) {
          assert(!f.blocked(previous.x + (walker.x - previous.x) * n / samples, previous.y + (walker.y - previous.y) * n / samples), `${d} ${type} swept route clearance`);
        }
      }
      assert(Math.hypot(walker.x - x, walker.y - y) < 20, `${d} ${type} route checkpoint ${x},${y}`);
      assert(!f.blocked(walker.x, walker.y));
    }
  }
}

// 3. Tactical freeze preserves state
fresh();
s.mode = 'playing';
const frozen = JSON.stringify(s);
f.update(100);
assert.equal(JSON.stringify(s), frozen, 'Tactical startup freeze');

// 4. Thermal hazard choke point mechanics check
fresh();
assert(s.thermalHazards.length > 0);
const haz = s.thermalHazards[0];
const targetHuman = s.humans.find(u => u.type === 'soldier');
targetHuman.x = haz.x;
targetHuman.y = haz.y;
const startHP = targetHuman.hp;

// Advance simulation to trigger active phase
haz.phase = 'active';
haz.timer = 1.5;
haz.damageTimer = 0;
run();
assert(targetHuman.hp < startHP, 'Thermal hazard deals damage when active');

// Test pressure calibration disarming
fresh();
for (const t of s.terminals) t.active = true; // Calibrate terminals
const testHuman = s.humans.find(u => u.type === 'soldier');
const haz2 = s.thermalHazards[0];
testHuman.x = haz2.x;
testHuman.y = haz2.y;
const calHP = testHuman.hp;
haz2.phase = 'active';
haz2.timer = 1.5;
haz2.damageTimer = 0;
run();
assert.equal(testHuman.hp, calHP, 'Calibrated pressure disarms thermal hazard damage');

// 5. Objective activation, nest destruction, loss & victory checks
fresh();
// Defeat on total army loss
s.humans.forEach(u => (u.alive = false));
run();
assert.equal(s.mode, 'defeat', 'Defeat on total army loss');

// Victory condition test
fresh();
s.terminals.forEach(t => (t.active = true));
s.nests.forEach(n => (n.hp = 0));
s.aliens = [];
s.customWaves.emitted = s.customWaves.arrivals.length;
s.customWaves.index = s.customWaves.arrivals.length;
run();
assert.equal(s.mode, 'victory', 'Victory awarded on terminal calibration, nest destruction, and clearing all enemies');

console.log('Passed Volcanic Forge Strike objective, profile, route, hazard and victory checks.');

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
  'docs/design/volcanic-forge-pressure.json',
  JSON.stringify({ method: 'Full VM runtime simulation', logs }, null, 2) + '\n'
);
console.log('Passed Volcanic Forge stationary pressure:', JSON.stringify(logs));
