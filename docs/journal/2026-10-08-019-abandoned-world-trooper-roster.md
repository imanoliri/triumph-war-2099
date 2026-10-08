# 2026-10-08 / 019 — abandoned-world-trooper-roster

- Task: [abandoned-world-trooper-roster](../tasks/abandoned-world-trooper-roster.md)
- Date: 2026-10-08 (Europe/Berlin); session 019 across all features that day
- Branch: `feature/abandoned-world-trooper-roster`
- Starting commit: `303d3dea0446dbdb97f3a767efd17e81db874739`
- Status: Review; all automated acceptance complete, browser evidence remains not run

## Starting context

Read AGENTS, WORKER, WORKFLOW, authoritative task and this initial session. Starting checkout had only director preparation edits to the task and this new journal. Director confirmed binding TRI-085 to this worker/worktree before implementation. Starting main includes TRI-072 menus and latest matching-world missions, but no Abandoned mission.

## Work performed

Implemented authored opt-in Abandoned roster, Incendiary/Recovery starting arrays, fixed-kit selection/orders, menus and actual ground/air factory/cap integration. Shared Units portraits use recovered infantry52 with authored distinct marks; no asset regeneration or original-game research.

Incendiary has120px/45-degree enemy-only cone with1 damage per0.18s pulse, fixed1s firing/2s cooling even through target loss, ordinary terrain/prop sight, exposed-worm-only damage, no building or terrain fire. Recovery uses ordinary infantry rifle and two finite+1HP kits after1s stationary within40px. Patient selection never causes pursuit; stationary Normal patrol holds while healing, Guard returns first, Follow travel and Attack/explicit movement/focus/use suppress healing. Orders cancel partial progress without spending stock.

Eligibility audit: ordinary infantry/commanders are1HP and cannot be living injured at integer HP. Existing tanks8HP, robots7HP, crawlers6HP and Heavy Troopers3HP provide useful recipients without baseline changes; director accepted this scope and40px nearby tuning. Recovery writes HP only, leaving crawler disabled/full-repair/escort/route/mine state unchanged. No mission integration applies; future opt-in arrays are incendiaries/recoveryTroopers. Current missions retain objectives, maps, authored payloads and enemy budgets.

Added legal Tracker recipient reach entries and production marked-target positive/beyond-range cases. Repaired an inherited difficulty baseline-fixture omission: new Floating Habitats Station mission postdates immutable6b41ca15 oracle and now receives the same exclusion as the other later missions, retaining its dedicated regressions. HEAD runtime reproduced12 actors/2 specialists vs historical oracle10/0 on Very easy, independently confirming the pre-existing comparison mismatch.

## Chronological log

1. Read assigned records and inspected preparation edits. Waited for director board binding.
2. Director confirmed binding and authorized existing ground-allies eligibility audit; reported useful existing HP caps without a health change. Director accepted recipients/tuning and requested crawler lifecycle and order evidence.
3. Implemented module and runtime adapters, opt-in registry/factories, shared restrictions/caps, marks/Units/Controls. Added finite treatment and cone regressions.
4. First focused test uncovered a test assumption about pre-existing empty fires array; corrected assertion to no fire entries. Mark rejection test needed to inspect acquired ai.target during ordinary hesitation; preserved runtime behavior and corrected fixture evidence.
5. Director draft review requested Tracker range-table coverage and production treatment/order evidence; implemented both. Attack suppresses treatment entirely to preserve combat/pursuit priority.
6. First full test stopped at inherited Floating baseline-oracle mismatch. Reported director and received approval for narrow fixture exclusion; independently reproduced mismatch with HEAD versus immutable oracle. Full suite rerun after code/test changes cleared difficulty and all prior stages, then hit a second inherited omission: unchanged HEAD Floating specialist test line55 assumed no matching mission. Both worker and director independently reproduced it. Narrow repair adds positive shipped matching-world specialist/menu checks and preserves other-world/original isolation. Director approved both fixture repairs. Ran later suite stages individually before final full rerun. Every later stage passed except Volcanic Forge existing ground placement(800,110) blocked on Very easy at check-volcanic-forge.cjs49. Independent unchanged HEAD and candidate runtime both report blocked=true; director independently reproduced on main. This is a real inherited geometry/placement gap, not an obsolete fixture assertion. Director prohibited out-of-scope TRI-085 terrain/placement edits and requested a separate bounded user decision. Final TRI-085 full run captures this known inherited failure; never claim full pass.
7. Updated DESIGN, ARCHITECTURE, STATUS, Controls, Units and separate browser record. No live opt-in scenario was exercised; no rendering/audio/playability claim.
8. Resumed on2026-10-09 with director binding confirmed. Clean candidate7cecf9f preserved. Explicit director authorization permitted merging current main767cf30 into this feature branch; routine merge completed without conflicts, importing separately integrated TRI-094 geometry/placement repair and TRI-095 design-only atlas. Removed harmless trailing blank EOF in TRI-085 regression. Same session019 retained; final full suite rerun on merged sources.
9. Final resumed node tools/dev.cjs test completed exit0, including the repaired Volcanic map checks and all later stages. Updated all acceptance criteria and current descriptions; git diff main --check passes after EOF cleanup. Scoped verification/handoff commit prepared for independent director review.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| TRI-085 focused regression | passed (exit0) | node tools/check-abandoned-troopers.cjs: cone/cycle/terrain/immunity, all useful caps/finite kits, interruption/production orders, crawler state, pause, actual factories/deliveries/caps, world isolation, legal/beyond-range Tracker preference |
| Affected compatibility checks | passed (exit0) | check-toxic-marsh-troopers, check-combat, check-unit-guide, check-reinforcement-menu; Floating repaired matching-world assertion iterates all5 profiles |
| Pre-TRI-094 full node tools/dev.cjs test | failed (exit1), inherited baseline | Final sources passed syntax112 scripts and every suite stage through Jungle Canopy, including TRI-085 and repaired Floating all-profile assertions. Stopped at tools/check-volcanic-forge.cjs49: AssertionError `veryeasy clear 800,110`. Same current-main failure independently reproduced by director; no TRI-085 terrain/placement changes |
| Resumed final full node tools/dev.cjs test | passed (exit0) | 2026-10-09: final merged sources; syntax112 scripts and every registered test passed, including TRI-085, all-profile Floating assertions, repaired Volcanic Forge map checks and tooling/director/GitHub fixtures. No gameplay changes during resume |
| Later-suite audit | passed except inherited Volcanic failure | All stages from check-custom-support through check-github-project independently exit0 except check-volcanic-forge.cjs49: veryeasy clear800,110 |
| Live browser playtest | not run | [Separate record](../playtests/2026-10-08-abandoned-troopers.md); no shipped Abandoned scenario and no live visual/audio/playability claim |

## Unresolved issues and risks

No open TRI-085 scope/design questions or automated blockers. Historical Volcanic failure was resolved by separately integrated TRI-094; final resumed full suite passes. The two demonstrated obsolete Floating test assumptions were narrowly repaired with director approval and positive matching-world coverage across all five profiles. No live browser playtest performed; no shipped Abandoned mission exists. Disposable simulations and drawing-command parity do not prove live visual quality/audio/playability. No main merge, publication or original-asset distribution performed.

## Next action / handoff

Review-ready candidate is the HEAD commit containing this handoff (retrieve with git log -1 --oneline on feature/abandoned-world-trooper-roster). All task acceptance criteria are met with explicit browser absence recorded. Earlier implementation7cecf9fd037d193f03d97f98a7c6e3ace908ce94 is preserved; authorized feature-branch integration merge8982966 imported main767cf30. No main squash SHA yet.

Exact next action: director independently reviews current branch versus main, checks full-suite exit0 evidence and browser limitation, then squash-integrates the accepted TRI-085 implementation as one meaningful main commit. Worker stops at Review and remains available for findings. Same session019 continues if review requires fixes. No new mission, terrain/placement edits, research, delegation, publication or merge to main is authorized here.

Reviewer should inspect fixed flame cycle/terrain semantics, finite useful stationary treatment/order priority/crawler preservation, world-only menus/actual arrivals/caps, distinct Units marks and the two narrow inherited Floating fixture repairs. Live browser record remains not run.

Director accepted squash4efb7897ba11c3be5520b7a17503ca3fb1bc40a5 fromab9bc3ee155c4d4ec7f4cebfe454a9c966f50615; Done immediately mirrored96items, fullsuiteexit0 and independent checks reviewed.
