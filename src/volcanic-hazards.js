'use strict';
// Custom Volcanic Forge Strike mechanics: thermal hazard choke points and pressure calibration.
window.TriumphVolcanicHazards = (() => {
  const rules = Object.freeze({
    triggerRadius: 45,
    warningDuration: 1.0,
    activeDuration: 1.5,
    cooldownDuration: 1.5,
    damageInterval: 0.5,
    baseDamage: 1,
  });

  function initialize(s) {
    if (!s.customMission || s.customMission.id !== 'custom-volcanic-forge-strike') {
      s.thermalHazards = [];
      return;
    }
    const points = s.customMission.thermalHazards || [
      [420, 190], [520, 390], [420, 590]
    ];
    s.thermalHazards = points.map(([x, y]) => ({
      x, y,
      phase: 'cooldown', // 'cooldown' | 'warning' | 'active'
      timer: rules.cooldownDuration,
      damageTimer: 0
    }));
  }

  function update(s, dt, { random, blocked, damage, sound, burst }) {
    if (!s.thermalHazards || !s.thermalHazards.length) return;

    // Check if terminals calibrated / disarmed
    const calibrated = s.terminals && s.terminals.length > 0 && s.terminals.every(t => t.active);

    for (const haz of s.thermalHazards) {
      haz.timer -= dt;
      if (haz.phase === 'cooldown') {
        if (haz.timer <= 0) {
          haz.phase = 'warning';
          haz.timer = rules.warningDuration;
        }
      } else if (haz.phase === 'warning') {
        if (haz.timer <= 0) {
          haz.phase = 'active';
          haz.timer = rules.activeDuration;
          haz.damageTimer = 0;
          if (sound) sound(15, 0.3);
        }
      } else if (haz.phase === 'active') {
        haz.damageTimer -= dt;
        if (haz.damageTimer <= 0) {
          haz.damageTimer = rules.damageInterval;
          // Apply damage to ground humans within radius if not disarmed/calibrated
          if (!calibrated) {
            const targets = s.humans.filter(u => u.alive && u.hp > 0 && u.type !== 'air' && Math.hypot(u.x - haz.x, u.y - haz.y) <= rules.triggerRadius);
            for (const target of targets) {
              damage(target, rules.baseDamage, 0);
              if (burst) burst(target.x, target.y, 8, '#ff4500');
            }
          }
        }
        if (haz.timer <= 0) {
          haz.phase = 'cooldown';
          haz.timer = rules.cooldownDuration;
        }
      }
    }
  }

  function draw(ctx, s) {
    if (!s.thermalHazards || !s.thermalHazards.length) return;
    const calibrated = s.terminals && s.terminals.length > 0 && s.terminals.every(t => t.active);

    ctx.save();
    for (const haz of s.thermalHazards) {
      if (calibrated) {
        // Calibrated/cooled vent
        ctx.fillStyle = '#22558833';
        ctx.beginPath();
        ctx.arc(haz.x, haz.y, rules.triggerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#4488cc66';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (haz.phase === 'warning') {
        // Warning glowing zone
        ctx.fillStyle = '#ff880033';
        ctx.beginPath();
        ctx.arc(haz.x, haz.y, rules.triggerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffaa00aa';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (haz.phase === 'active') {
        // Active thermal hazard eruption
        ctx.fillStyle = '#ff330055';
        ctx.beginPath();
        ctx.arc(haz.x, haz.y, rules.triggerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ff0000dd';
        ctx.lineWidth = 3;
        ctx.stroke();
      } else {
        // Cooldown / dormant vent marker
        ctx.fillStyle = '#33110022';
        ctx.beginPath();
        ctx.arc(haz.x, haz.y, rules.triggerRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  return Object.freeze({ rules, initialize, update, draw });
})();
