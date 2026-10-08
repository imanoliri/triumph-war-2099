# 2026-10-08 / 010 — airless-moon-trooper-roster

- Task: [airless-moon-trooper-roster](../tasks/airless-moon-trooper-roster.md)
- Date:2026-10-08 (Europe/Berlin); session010 across all features that day
- Branch: `feature/airless-moon-trooper-roster`
- Starting commit: `28079f2e4256c7b63e7e938ccc91eb24a48b52f9`
- Status: Review ready; worker stops before integration

## Starting context

Read AGENTS, WORKER, WORKFLOW, task and prepared journal. Director confirmed dispatch before edits. Worktree started with only prepared task/session changes. Preceding world kits and TRI-072 menu already integrated. No current Airless Moon runtime mission; opt-in factories/production fixtures only, TRI-090 separate.

## Work performed

Added Airless Moon Infantry/Heavy Trooper/Drone Operator/Commando roster and optional heavies/droneOperators starting arrays. Heavy3HP/65%movement/220px eight-direction1-damage rifle uses authored0.75s shots with ordinary burst/acquisition/rest. Operator ordinary fixed rifle owns one nonselectable1HP ground combat drone with180px light rifle/180px hard Euclidean leash, shared ground navigation/dynamic doors and explicit mirrored orders. No replacement; death cleanup synchronous. Both share one cap slot including pending landings; companions give no independent Army/survivor/respawn/cap credit. Ground extraction still requires living companion presence.

Added runtime/Units sprite marks and Controls/DESIGN/ARCHITECTURE/PLAYTEST descriptions. Fixed kits do not take weapons or mount cannons. New projectile endpoint clamp/substeps affect only moon kit projectiles. Source assets/current mission placements/objectives/pressure unchanged; no oxygen/flying/hazard-immunity systems.

## Chronological log

- Director confirmed dispatch and accepted preliminary package semantics before coding: Operator selectable, drone unselectable/no independent roster/use access, one linked capacity slot pending/live, permanent loss and synchronous Operator-death removal. Hard180px leash may hold back Operator when companion cannot follow; player-visible tradeoff documented.
- Routine tuning recorded: Heavy1damage/290px/s/0.75s interval/ordinary burst timing; drone1damage/290px/s/180px/ordinary burst and order shot intervals. Operator ordinary fixed infantry rifle.
- System Python alias unavailable; used installed Node for source edits.
- Implemented production starting/support factories and explicit module with per-actor exactly-once guard. Ownership references nonenumerable to avoid public-state serialization cycles. Initial positive/negative production checks passed after correcting fixture expectation: newly created drone Normal uses0.38s, Defend0.20s.
- Audited shared noncommander gates on director request: companions excluded from Army/HUD/API/rescue capacity/survival/respawn support; extraction physically includes them. Director found minimumNonCommanders extraction filter still counted child; precise filter corrected with production min2 negative/additional-soldier positive/outside-companion checks. Director independently reran Airless and Silent Return; finding resolved.
- Full node tools/dev.cjs test completed exit0,103 syntax scripts and all checks. Latest Airless/Units affected checks rerun exit0 after extra fixed-kit negatives and companion portrait parity.
- Browser UI spot inspection completed at worker loopback2183 in Codex IAB: Heavy/Operator/drone portraits and Controls observed; three JPGs saved. No current moon scenario/live gameplay/audio claims. Temporary browser tab closed.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/dev.cjs test` | pass, exit0 |103 scripts syntax; entire disposable simulation/tooling suite through GitHub Project offline checks. New Airless check included. |
| `node tools/check-airless-moon-troopers.cjs` | pass, exit0 |HP/speed/slower cadence/inclusive range/clamped travel, fixed-kit negatives, exactly-once/permanent loss/synchronous cleanup, actual force/focus/Follow/Guard/use/ground-door routes/leash, actual carrier/air/zipline/pending/live caps, Army/rescue/extraction gates, starting/reset/world isolation/freeze. |
| `node tools/check-unit-guide.cjs` | pass, exit0 |Every infantry and companion recovered52 portrait matches runtime mark/hotspot commands, distinct marks and cold-image repaint; original entries retained. |
| Browser spot inspection | pass scoped UI only; combat/audio not run | [Separate playtest record](../playtests/2026-10-08-airless-moon-troopers.md) and three screenshots; no matching mission. |
| Staged whitespace/source review | pass before commit | `git diff --cached --check`; new files included. |

## Unresolved issues and risks

No open implementation/design question or automated failure. The deliberate hard leash can stall Operator travel when companion ground routing cannot keep up; documented and simulated, awaiting future human mission playtest. No current Airless Moon mission exists, so live specialist combat/terrain/timing/delivery/audio/difficulty remain unverified. No merge/publication/original-game research performed.

## Next action / handoff

Director independently reviews branch HEAD in C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-airless-moon-trooper-roster, scoped commit titled **Add Airless Moon Heavy Trooper and linked ground drone roster**; exact SHA is returned in worker report. Focus review on package-cap/reservation consistency, synchronous lifecycle, axis-committed hard leash and optional starting/delivery ownership. Run affected checks or inspect separate browser record; full suite already passes. If accepted, director squash-integrates into main and records resulting squash SHA in its checkpoint. Branch has not been merged; worker remains available for review findings.
