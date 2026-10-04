# 2026-10-04 / 010 — attack-move-interactions

- Task: [attack-move-interactions](../tasks/attack-move-interactions.md)
- Date: 2026-10-04 (Europe/Berlin)
- Branch: feature/attack-move-interactions
- Starting commit: 4f7fba1fa7dc9e28944a32796afcb7d4959caa7c
- Status: Review

## Starting context

Read AGENTS, WORKER, task/session 009, navigation/runtime mechanics and DESIGN. Initial edits were director-provided task/session 009 only; preserved them. Started own session 010 with task helper.

## Work performed

Regular attack-moving soldiers detour to usable reinforcement eagles or empty plasma turrets. Thresholds: within 56 px of soldier, within 24 px of next actual terrain-route segment, and at most 72 px reachable terrain-route travel. Visible enemies/nests within 245 px trigger turret-over-combat priority and suppress eagle detours. In clear areas, usable eagles outrank turrets, including overlapping pickup/mount ranges. Arrival/interaction is at 18 px.

Detours retain original attack-move destination; pickup returns to advancing, mounted units hold the cannon. Candidate objects re-evaluate each tick without persistent jobs: removed eagles or newly occupied turrets immediately stop attracting the unit. Existing eagle-trip claims are respected. Force-move, focus/use jobs and non-soldier behavior remain unchanged. New orders dismount using existing behavior. Updated DESIGN, Units and Controls text; old 250 px idle supply trips remain separate.

## Chronological log

- Created session and inspected existing movement, cannon and supply paths.
- Added bounded route-segment interaction step before attack-move combat; suppressed overlapping soldier eagle pickup until priorities are evaluated.
- Added regressions for clear/threat priority, before perception reaction completes, destination preservation, route/proximity limits, blocked/occupied turrets, stale pickup/turret, claims, unavailable support rules, soldier-only behavior and force/focus/use overrides.
- Corrected an initial pickup-radius fixture (diagonal 13/13 exceeded 18 px).
- Both worker and director checks exposed an invalid outdoor cap fixture: recovered outdoor ground rule creates a carrier directly, not Troop, so maxAliens alone does not invalidate its rule. Replaced that fixture with unavailable support cases; retained equivalent unusable-eagle assertion without changing unrelated reinforcement behavior.
- Final full suite passed.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/check-recreation.cjs | passed after initial fixture repair | Existing and initial new mechanics fixtures passed. |
| node tools/dev.cjs test | passed final revision | Syntax/repository checks, full simulation including new priority/limits/claim/unusable regressions, music, disposable tooling/director checks. |
| Live browser mechanics | unverified | No live mechanics playtest by worker; simulation evidence does not establish rendering, audio or broad playability. |

## Unresolved issues and risks

No failing checks or scope questions. The distances are custom recreation choices, documented explicitly. Existing recovered reinforcement-cap behavior unchanged. Live mechanics remains unverified.

## Next action / handoff

Director independently reruns final checks/reviews priority and reachability, then squash-integrates if accepted. No worker merge or publication. Implementation commit is the commit containing this journal; resolve via git log -1. Record resulting main squash SHA in subsequent director checkpoint.
