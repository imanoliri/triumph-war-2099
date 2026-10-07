# 2026-10-07 / 014 — capital-trooper-roster

- Task: [capital-trooper-roster](../tasks/capital-trooper-roster.md)
- Date: 2026-10-07 (Europe/Berlin); session014
- Branch: feature/capital-trooper-roster
- Starting commit:0934af92adbb00e7f79c835d3b78730104fb8805
- Status: Review ready; all acceptance criteria supported, with explicit limited browser evidence.

## Starting context

Director dispatch confirmed TRI-075 In progress, authorized this worker in isolated triumph-capital-trooper-roster checkout. Read AGENTS, WORKER, WORKFLOW, approved task and this prepared initial journal; retained dirty task/session metadata. Main already included reinforcement menu and Winter Gunner. No board/director-checkout edits, delegation, original-game research, merge or publication.

## Work performed

Added explicit dependency-free Capital kit module, wired production damage/projectile incoming velocity/melee origin, simulation recharge, rifle/beam fire/AI/orders and actual support factory/count. Distinct runtime and Units overlays reuse recovered infantry52 with original hotspots. Capital-only menus offer both new kits and omit Winter Gunner; Snow remains isolated.

Routine tuning accepted by director: Shield body1HP+3shield,75% movement, ordinary rifle damage/speed/burst/reaction/rest and fixed kit; all hits including bypass reset recharge. Laser nests take3 damage too; live props stop beam without taking damage. No backup rifle, friendly damage or ally interception.

District Twelve replaces first two existing soldier slots with Shield(270,310)/Laser(270,345) on every profile: ordinary soldiers8/8/6/4/2, total infantry10/10/8/6/4; four commanders and robot unchanged. Other Capital scenarios expose opt-in support choices while authored starting/default payloads stay unchanged. Updated related editable runtime-contract.json placements/briefs; no terrain/collision/hash/map/source asset regeneration. Enemy initial placements, nests/birth intervals/budgets, waves, relief3commandos/70s, terminals, supplies and objectives unchanged. Historical pre-specialist pressure numbers labeled accordingly.

## Chronological log

1. Dispatch confirmation received; read-only inspection completed; implemented approved bounded kits.
2. Focused production suite passed; first full run found old Capital roster expectation. Updated expected roster and District count fixtures for specialist slots. District editable runtime contract also needed related placements/briefs update; terrain hash checks remained intact.
3. Director independently identified radius+halfwidth axial tail crossing a thin blocker. Corrected actual target body-circle versus finite beam rectangle squared-distance intersection; added actual thin-wall center520/blocker510 negative and end-corner positive/negative regressions. Width terrain trace checks every integer offset-4..4; exact inclusive220 range preserved. Director reran/accepted focused fix.
4. Layered shield status after source sprite so head cannot obscure strength segments. Actual browser UI opened through default IAB after subagent visibility rejection. Inspected/saved portraits, menu, initial runtime and69s live scene screenshots. No controlled pulse/break/recharge or full completion/audio observation.
5. Final complete run caught creation of an empty laserPulses array in original-mission immutable input snapshots. Changed cleanup to touch only already-present pulse arrays; affected node tools/check-input.cjs passes without baseline normalization. Started a new full run with this preservation fix.
6. Updated DESIGN, ARCHITECTURE, README, Controls, Units/cap wording, STATUS and PLAYTEST. Final full dev suite started after geometry/order fixes.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/check-capital-troopers.cjs | pass | Production exact60-degree boundary, side/rear incoming velocity, actual projectile opposite shooter position, actual melee origin, environmental bypass/overflow/all-hit recharge, dead/return immunity, bearer-only, slower movement/rifle; finite laser rectangle,width,range,duplicates,thin wall/corners,terrain/doors/props,damage/reload/pulse,group/focus/force/follow/use/attack-move/leash,tactical freeze; all profiles/menus and actual carrier/parachute factories/cap. |
| node tools/check-district-twelve.cjs | pass | Existing objective/finite source/wave/support/relief/reset/isolation/terrain hash contracts and replacement total/connected positions. |
| node tools/check-unit-guide.cjs | pass | All custom portraits distinct, exact source-frame/runtime-mark parity, cold-image repaint. |
| node tools/dev.cjs test | pass (exit 0) | Final full run after finite-rectangle fix and original-state preservation fix: syntax 87 scripts, all gameplay/input/support/menu/Capital/difficulty/terrain/rendering/music/tooling/director/project fixtures passed. |
| Live browser | limited pass | [Playtest](../playtests/2026-10-07-capital-troopers.md), four inspected screenshots. Actual menu, portraits/description/context, initial3shield strength and distinct kits; ordinary scene/pause. |

## Unresolved issues and risks

Initial authored tuning, no new human win-rate calibration. Live laser pulse and shield break/recharge visuals, manual order/support delivery, full human mission completion and audible playback not observed. Simulation success is not a live playability claim. No open design question; director accepted routine choices and finite-rectangle correction.

## Next action / handoff

Final full suite passed. Commit scoped files, then director independently reviews the exact branch tip and squash-integrates if accepted; worker stops at Review. Director independently reviews and squash-integrates; worker has not merged. Review priorities: directional metadata, overflow/all-hit recharge, thin terrain cutoff/body intersection, world menus/actual factories and explicit live gaps.

Final validation also: node tools/check-input.cjs pass (immutable four input sequences), git diff --check pass. Temporary browser tab closed and own loopback server stopped after evidence capture. Implementation commit: 4aebda14e9824b1e576696f626e0875877ec5199 — Add Capital Shield Trooper and infantry Laser Cannon. Scoped commit made after final suite exit0; git status was clean. No squash merge yet. This SHA is the implementation payload; a follow-up handoff metadata commit records it. Exact next action: director reviews feature/capital-trooper-roster and squash-merges accepted payload into main, then records integration SHA in director checkpoint.
