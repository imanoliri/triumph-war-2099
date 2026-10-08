'use strict';
process.chdir(require('node:path').resolve(__dirname, '..'));
const fs = require('fs'), assert = require('assert/strict');

const source = fs.readFileSync('tools/check-recreation.cjs', 'utf8').split('const api=sandbox.window.triumph')[0];
function setup() {
  return new Function('require', 'module', '__dirname', source + ';return {sandbox, elements};')(require, {}, __dirname);
}

const b = setup(), w = b.sandbox.window, id = 'custom-mercenary-outpost-strike';
let f, s;

function fresh(d = 'normal') {
  b.sandbox.document.querySelector('#difficulty').value = d;
  w.triumph.loadCustomMission(id);
  f = w.__fixture();
  s = f.state;
}

function run() {
  s.mode = 'playing';
  if (w.triumph.state().paused) b.sandbox.document.querySelector('#pause').onclick();
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

  // Verify Weapon Specialist and Bounty Hunter are present in starting forces for every profile
  assert(s.humans.some(u => u.type === 'weapon-specialist'), `${d} includes Weapon Specialist`);
  assert(s.humans.some(u => u.type === 'bounty-hunter'), `${d} includes Bounty Hunter`);
}

// 2. Route travel check
fresh();
const walker = s.humans.find(u => u.type === 'soldier' || u.type === 'weapon-specialist');
for (const [x, y] of s.customMission.route) {
  walker.attackMove = { x, y, force: true };
  for (let i = 0; i < 5000 && walker.attackMove; i++) f.attackMoveStep(walker, null, 0.04);
  assert(Math.hypot(walker.x - x, walker.y - y) < 20, 'Route checkpoint reached');
  assert(!f.blocked(walker.x, walker.y));
}

// 3. Reinforcement menu offers Mercenary roster
fresh();
s.mode = 'playing';
b.elements['#reinforcements'].onclick();
for (const type of ['weapon-specialist', 'bounty-hunter']) {
  assert(b.elements['#reinforcement-slots'].innerHTML.includes('value="' + type + '"'), `Reinforcement offers ${type}`);
}
b.elements['#reinforcement-close'].onclick();

// 4. Tactical freeze preserves state
fresh();
s.mode = 'playing';
const frozen = JSON.stringify(s);
f.update(100);
assert.equal(JSON.stringify(s), frozen, 'Tactical startup freeze');

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
assert.equal(s.mode, 'victory', 'Victory awarded on terminal activation, nest destruction, and clearing all enemies');

console.log('Passed Mercenary Outpost Strike objective, profile, route, specialist integration and victory checks.');

if (!process.argv.includes('--record')) process.exit(0);

const logs = [];
for (const d of ['veryeasy', 'easy', 'normal', 'hard', 'veryhard']) {
  const box = setup();
  box.sandbox.document.querySelector('#difficulty').value = d;
  box.sandbox.window.triumph.loadCustomMission(id);
  const fx = box.sandbox.window.__fixture(), st = fx.state;
  st.mode = 'playing';
  box.sandbox.document.querySelector('#pause').onclick();
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
  'docs/design/mercenary-outpost-pressure.json',
  JSON.stringify({ method: 'Full VM runtime simulation', logs }, null, 2) + '\n'
);
console.log('Passed Mercenary Outpost stationary pressure:', JSON.stringify(logs));
