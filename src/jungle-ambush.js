'use strict';
// Custom Jungle Canopy Recon mechanics: foliage stealth and concealed canopy spider ambushes.
window.TriumphJungleAmbush = (() => {
  const rules = Object.freeze({
    triggerRange: 135,
    spiderHP: 6,
    spiderSpeed: 160,
    spiderDamage: 2,
    ambushDelay: 0.4,
  });

  const isAmbushBug = u => u?.type === 'canopy-spider';

  function createAmbushPoint(x, y, count = 3) {
    return { x, y, count, triggered: false, timer: 0 };
  }

  function spawnSpider(x, y, spawnBugFn) {
    const bug = spawnBugFn(x, y);
    if (bug) {
      bug.type = 'canopy-spider';
      bug.hp = rules.spiderHP;
      bug.ambushActive = true;
    }
    return bug;
  }

  function initialize(s, map) {
    if (!s.customMission || s.customMission.id !== 'custom-jungle-canopy-recon') {
      s.jungleAmbushes = [];
      return;
    }
    const points = s.customMission.ambushes || [
      [350, 200], [450, 580], [680, 220], [750, 560]
    ];
    s.jungleAmbushes = points.map(([x, y]) => createAmbushPoint(x, y, 3));
  }

  function update(s, dt, { random, blocked, spawn, sound }) {
    if (!s.jungleAmbushes || !s.jungleAmbushes.length) return;
    const livingHumans = s.humans.filter(u => u.alive && u.hp > 0 && u.type !== 'air');
    if (!livingHumans.length) return;

    for (const amb of s.jungleAmbushes) {
      if (amb.triggered) {
        if (amb.timer > 0) {
          amb.timer -= dt;
          if (amb.timer <= 0) {
            for (let i = 0; i < amb.count; i++) {
              const ox = (random() - 0.5) * 40;
              const oy = (random() - 0.5) * 40;
              spawnSpider(amb.x + ox, amb.y + oy, spawn);
            }
            if (sound) sound(15, 0.4);
          }
        }
        continue;
      }
      // Trigger when ground unit enters trigger radius
      for (const h of livingHumans) {
        if (Math.hypot(h.x - amb.x, h.y - amb.y) <= rules.triggerRange) {
          amb.triggered = true;
          amb.timer = rules.ambushDelay;
          break;
        }
      }
    }
  }

  function draw(ctx, s) {
    if (!s.jungleAmbushes) return;
    ctx.save();
    for (const amb of s.jungleAmbushes) {
      if (!amb.triggered) {
        // Draw subtle canopy web cluster marker
        ctx.fillStyle = '#1b4d2433';
        ctx.beginPath();
        ctx.arc(amb.x, amb.y, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#2d803c66';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  return Object.freeze({ rules, isAmbushBug, createAmbushPoint, initialize, update, draw });
})();
