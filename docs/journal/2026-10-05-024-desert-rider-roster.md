# 2026-10-05 / 024 — desert-rider-roster

- Task: [desert-rider-roster](../tasks/desert-rider-roster.md); TRI-040.
- Date: 2026-10-05 (Europe/Berlin); initial session 024, reused throughout this execution.
- Branch: feature/desert-rider-roster.
- Checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-desert-rider-roster.
- Starting commit: 31995d7ffa5c2d078cf43c5bcc67066f8b0aca54.
- Status: Review; not merged/published.

## Starting context

Read AGENTS, WORKER, this task/session and the TRI-035 worm telegraph contract. The only initial dirty files were prepared task/session metadata. Scope is an opt-in human roster; map selection remains pending and TRI-036 owns activation. No original-game research, sand buggy, campaign persistence or existing mission placement changes.

## Work performed

Added custom-authored Desert Rider module with scout proximity retreat (including exposed worm lane sidestep), exactly five short-range guard pellets, bounded nearby vehicle repair and 6-HP route crawler. The crawler reacts once per locked cardinal telegraph, chooses a fully swept clear 32 px diagonal on both axes, and places finite valid mines at its departure point after completing an evade. Mine arming/expiry, enemy-only exposed-ground damage and terrain sight are explicit. No evade shield; blocked/late counters remain vulnerable. Mine ammo is four per crawler.

Shared infantry controller retains selection, Normal/Follow/Attack/Defend, attack/force movement, legal cardinal rays, focus and door/terminal use. Fixed kits exclude weapon/eagle pickups, supply trips and cannon mounting. Crawler is autonomous/nonselectable. Full-body physical sweeps prevent wall tunneling; stable per-radius navigation policies preserve caches. Route planning admits unlocked doors; physical collision does not. Existing units/placements are unchanged; worm charge target radius recognizes the new 17 px crawler.

Added guide entries, DESIGN link, [explicit tuning/provenance](../design/desert-riders.md), module/runtime regressions, loopback sandbox/preview and [separate live record](../playtests/2026-10-05-tri-040-riders.md). New visuals are original canvas silhouettes; recovered assets untouched.

## Chronological log

1. Inspected clean task branch plus prepared metadata and worm phases. Implemented isolated opt-in factories/abilities and terrain-swept counter.
2. Director early review identified exposed-worm scout eligibility and cardinal/focus/force compatibility. Reused shared infantry controller, added actual locked-lane sidestep and controls regressions; removed duplicate production AI.
3. Fixed navigation blocker callback identity with stable per-radius policies and unlocked-door route policy. Tested actual door opening, locked-door refusal and full-body terrain detour. Physical crawler 17 px / diagonal axes 32 px match map proposal assumptions; shared navigation adds its established conservative 4 px samples.
4. Verified existing vehicle factories: tanks spawn at 8 HP; ground robots at 7 HP. Added capped healing for both, plus explicit maxHP handling.
5. First/final full automated suite passed. Final affected runtime rerun passed after sight-range polish and shotgun cadence assertion. Director also reported independent full suite exit 0 on this checkout. No runtime changes afterward.
6. Live IAB sandbox reset/warning and custom silhouettes/pellets verified. Continuous demonstration exhausted mine ammo and eventually lost crawler HP; separate mechanic target reached 6 HP. Saved screenshot. Browser scope stayed isolated, without full mission/audio or challenge claims.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/dev.cjs test | Passed, exit 0 | All syntax/module/load/project, original/custom runtime, pressure, music, tooling/director checks; new rider suite included |
| node tools/check-desert-riders.cjs | Passed, exit 0 | Four cardinal early-warning counters, vulnerability/traps, 32 px diagonal axes, full-body large-dt sweep/nav, ammo/placement, exposed-only enemy mines/LOS/lifetime, repair/range/caps, scout eligibility, pellet geometry, canvas commands |
| node tools/check-recreation.cjs (final affected rerun) | Passed, exit 0 | New shared cardinal lane/Defend, guard five pellets and 1.1 s cadence, force/focus, terminal use, Follow stale-anchor rejection, unlocked/locked-door full-body paths, all existing mission roster isolation |
| node --check game.js and git diff --check | Passed | No syntax or whitespace errors |
| Isolated live browser | Passed within scope | IAB Chromium backend (version unavailable), custom silhouettes/warning/reset/pellet fan/repair/counter/vulnerability; screenshot and limitations in linked playtest |

## Unresolved issues and risks

No open implementation question. Roster is dormant until TRI-036 places it. Human challenge/map acceptance and full mission rendering/audio are not verified by this isolated fixture. Existing navigation conservatively samples an extra 4 px around full-body blocker queries; narrow corridors may require slightly more route space than physical footprint alone. Fixed-kit pickup/mount limits are deliberate and documented. No assets were redistributed or original files modified.

## Next action / handoff

Director independently reviews current feature/desert-rider-roster HEAD, scoped commit titled Implement opt-in Desert Rider roster and convoy counters; resolve exact SHA with git rev-parse feature/desert-rider-roster. Review ability tuning/controls and check evidence, then squash-integrate if accepted. Worker stops at Review and is available for findings. TRI-036 later activates selected map roster/route/objective. No merge or publication performed; resulting main squash SHA belongs in subsequent director checkpoint.
