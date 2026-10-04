# Add narrow sweep bursts to plasma turrets

- Ticket: TRI-031; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Add narrow sweep bursts to plasma turrets

## Acceptance criteria

- [ ] Mounted plasma turrets use tank-style sweep bursts with agreed 0–15-degree arc semantics while preserving operator-independent aiming and existing mounting behavior.

## Scope and decisions

User explicitly requested mounted plasma turrets shoot like tank sweep bursts, with angles only0–15degrees, while retaining16directions on2026-10-04. Capture approved feature intent in Backlog while map proposals active. Numerical/heading interpretation needs answer: current16quantized projectile headings are22.5degrees apart, incompatible with a visibly smooth narrow15degree sweep. Director asked whether16visual turret headings plus continuous projectile angles over total0–15degree arc centered on target is desired, or every shot staysquantized and narrow sweeps may collapse. User answered yes: retain16visual headings with smooth projectile sweep over total0–15degree arc around target direction. This resolves the choice. Director will dispatch after map proposals are ready, while user reviews layouts; no dependency on map selection. Preserve ordinary cannon burst length/cadence/plasma damage and rest rules, using only tank-style locked sweep/direction mechanics.

Later bounded worker should inspect existing tank locked burst aim/sweep/direction alternation and mounted cannon burst/fire precedence, reuse an explicit small helper if appropriate, and preserve plasma damage/cooldowns/cadence/operator independence unless user explicitly requests timing changes. Do not silently import tank9–12-shot burst or tank rest into cannon behavior. Define agreed arc as total span versus half-angle, distribution/locking and facing/render/projectile consistency. Check0and15boundaries, clockwise/counterclockwise/wraparound, operator soldier/commando, focus/attack-move/mount/dismount/tactical freeze and ordinary tank/infantry behavior. Keep unrelated rendering bugTRI-030 separate. Existing tankrestTRI-028 is a separate ticket. Run affected regressions/full suite and live turret smoke when available; honest simulation/audio/balance limits. Worker isolated stopsReview; no nesteddelegation/boardedits/merge/push.

## Sessions



