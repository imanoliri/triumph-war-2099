# 2026-10-08 / 003 — undercity-trooper-roster

- Task: [undercity-trooper-roster](../tasks/undercity-trooper-roster.md)
- Date: 2026-10-08 (Europe/Berlin); session 003 across all features that day
- Branch: `feature/undercity-trooper-roster`
- Starting commit: `f18580c37bfe05d6cc9fa511e81c9a2267daa646`
- Status: Review ready

## Starting context

Read AGENTS, WORKER, WORKFLOW, the task and prepared session003 before mutation. Assigned checkout `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-undercity-trooper-roster`; branch verified. Initial modified task/session were director preparation, preserved in scoped commit. Basef18580c contains accepted prior roster work including Maritime; no original-game research, asset regeneration, delegation, board edit, merge or publication.

## Work performed

- Added authored `src/corner-ambusher.js`:1HP/1damage/290px/s rifle,1s stationary setup, exactly three rounds0.1s apart,2s reprepare after third round. Actual displacement cancels preparation; interrupted partial volley imposes2s reprepare plus at least1s stationary. Simulation clocks freeze tactically. Blocked movement/turning does not count as displacement; missing/blocked targets hold remaining shots without catch-up.
- Existing eight infantry headings, lane/visibility/terrain/order rules retained. Default/Defend guard holds assigned position, skips patrol and alignment/chase. Explicit Attack/focus/attack-move may close/align and reset setup. Follow/force/use retain precedence. Fixed kit refuses weapon pickup/cannon mounting; terminal/door/eagle/grenade use remains.
- Director early range review caught muzzle offset:10px muzzle plus120px travel would end at130px. Corrected to110/290s flight and Ambusher-only lifetime clamp so long steps end at actor-centred120px. Inclusive120px now applies to direct fire, production perception, focus and attack-move. Other projectile stepping unchanged.
- Undercity roster adds Corner Ambusher between Infantry and Commando; Tunnel Listener absent. Actual starting/carrier/parachute factories initialize kit and default Guard; starting/delivered units and pending landings respect existing infantry caps. Saved support defaults remain ordinary infantry/commando.
- Conservative Tunnels Breach replacement: first soldier(155,320) becomes one Ambusher on all five profiles. Infantry totals8/8/7/5/4 and total humans12/12/11/9/8 stay intact; remaining ordinary soldiers7/7/6/4/3. Existing safe staging coordinate serves as assigned guard without new placement. Terminal/extraction objectives, map/assets, nests/intervals/vents and all profile waves are untouched. No pressure probe or historical evidence regenerated.
- Distinct authored slate/copper/three-round sprite mark shares recovered infantry52 with runtime/48px Units portrait. Units/Controls/README/DESIGN/ARCHITECTURE/PLAYTEST/STATUS/task updated. Added production positive/negative regression and guide roster/load-order coverage.

## Chronological log

1. Director dispatch confirmed after prepared-session read-only inspection; implemented only TRI-077 in isolated feature worktree.
2. Director accepted ordinary1HP/1damage/290speed,0.1cadence and one-for-one first-soldier placement as routine tuning; requested production Guard/cancellation evidence.
3. Added focused tests; setup/three-round/reprepare, movement interruption, Guard immobility, inclusive range, terrain, headings/orders/profile/support tests passed. Director independently ran Corner/Tunnels/menu/guide and diff review without issue.
4. Resolved director muzzle-offset finding with110px remaining travel and specific lifetime clamp; endpoint/damage-negative and inclusive perception/focus/attack-move tests passed.
5. Background in-app browser inspection on own loopback2117: Undercity deployment, rendered portrait/text, matching ground/air options, save/reopen and Harbor exclusion observed. Reloaded final build to verify Controls copy. Screenshots and precise limits recorded separately. Temporary tab closed and own server stopped.
6. Full suite finished exit0 through director/GitHub offline mirror checks. Narrow final inclusivity/clamp/Controls changes landed during suite; reran affected combat/recreation/Corner/guide against final files, all exit0. Full suite was not repeated without cause; relevant final files received affected checks.
7. Acceptance checked, handoff finalized, scoped implementation commit prepared for director Review. No open scope question.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Full automated suite | pass, exit0 | `node tools/dev.cjs test`; syntax91 scripts, project references, all gameplay/support/input/music/custom terrain/objective fixtures, director tooling and87-ticket offline Project mirror. No production access. |
| Final affected checks | pass, exit0 | `node tools/check-combat.cjs`, `node tools/check-recreation.cjs`, `node tools/check-corner-ambusher.cjs`, `node tools/check-unit-guide.cjs`; final inclusivity/clamp and copy files. |
| Focused production coverage | pass | Exact1.0/1.1/1.2 three rounds and3.2 next eligible; pre-shot movement1s reset and partial interruption2s; actual Guard updates immobile off-lane/out-of-range and firing in lane; exact120px production boundary; long-step endpoint120px and outside-radius negative hit; eight headings, walls/doors/props, Follow/force/use/focus/attack-move; all profiles/waves/objectives, original/world isolation and real carrier/parachute free-slot count. |
| Browser UI inspection | pass for observed UI only | [Separate report](../playtests/2026-10-08-corner-ambusher.md), with committed portrait/menu screenshots; in-app browser version not exposed. |
| Live controlled combat/delivery/audio/hardware/balance | not run | Exact mechanics/factories are VM proof; no live timing, audio, physical German key, human victory/balance claim. |
| Diff integrity | pass | `git diff --check`; no asset/research/runtime-contract/map/board files changed. |

## Unresolved issues and risks

No automated failures or material unanswered questions. Controlled live combat timing/Guard/orders, actual live carrier/air delivery/cap, all-profile human balance/victory, audio and physical keys remain explicit playtest limits. Ordinary bullet hit radii and terrain collision conventions remain; no stealth or new specialist. Director decides review acceptance; worker has not merged or published.

## Next action / handoff

Director next: review the tip of `feature/undercity-trooper-roster` (implementation commit titled `Add Undercity Corner Ambusher roster and stationary bursts (TRI-077)` containing this handoff; exact SHA returned in worker report and available via `git rev-parse feature/undercity-trooper-roster`). Check range/cancellation/strict Guard versus explicit order priority, one-for-one profile deployment, support cap/factory parity, and browser limitations. Rerun `node tools/check-corner-ambusher.cjs` from assigned checkout if needed. All acceptance criteria have implementation and evidence; awaiting independent acceptance and squash integration. No squash SHA exists yet; director records it in later checkpoint. Worker remains available for review findings.
