# 2026-10-09 / 001 — orbital-scrapyard-trooper-roster

- Task: [orbital-scrapyard-trooper-roster](../tasks/orbital-scrapyard-trooper-roster.md)
- Date: 2026-10-09 (Europe/Berlin); session001
- Branch: `feature/orbital-scrapyard-trooper-roster`
- Starting commit: `e2bca11337cb291d0a167420aace0876e311e9f0`
- Status: Review; implementation and local checks complete

## Starting context

Read AGENTS, WORKER, WORKFLOW, task and preparation journal. Isolated worker checkout is `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-orbital-scrapyard-trooper-roster`; initial dirty files were the prepared task session link and this new journal. Director confirmed authoritative board binding before implementation. Existing custom registry contains no Orbital Scrapyard runtime mission. Worker owns only TRI-086 implementation; director owns board, review and integration.

## Work performed

Added authored `src/orbital-troopers.js`, exported opt-in Orbital roster and optional `mineLayers` / `breachers` starting arrays. Both types flow through central unit/support factories, cap reservations, eligible world menus, shared selection/orders/fixed-kit restrictions, Units descriptions and recovered52 sprite previews with distinct authored marks.

Mine-layer retains existing1HP infantry movement/rifle tuning (1damage,3–6 rounds,0.38s ordinary or0.20s Defend rounds,0.8–1.8s burst rest). Four finite mines use shared Place charge / Place mine control and `placeCharge` cancellation semantics. Reachable explicit points are validated before acceptance; arrival within4px plants without added delay; blocked point cancellation spends nothing. New squad/move/focus/use orders cancel pending placement. Mines arm1s/trigger20px/blast32px/damage2. Ordinary crawler mine updater takes optional rules; its original defaults remain untouched. Mine-layer reuses crawler exposed-hostile-ground/sight/terrain/friendly immunity convention; no nest/prop damage. Routine unspecified defaults: no extra planting delay or expiry; mines persist until trigger, blocked footprint or reset. No AI auto-placement or refill.

Breacher retains1HP infantry movement, eight-direction aiming and shared firing lane. Single ordinary290px/s collision projectile travels90px including10px muzzle, deals3 to first hit and reloads2s with no added infantry burst delay/rest. One-pixel lifetime-clamped sweep prevents frame overshoot. Wall props absorb shots without taking damage; locked doors stay closed. Other prop/barrel collision follows established enemy-only explosion behavior.

No mission, objectives, map assets, recovered assets, original-game research, dependency or publication changes. DESIGN, ARCHITECTURE, STATUS and Controls/Units describe the final opt-in behavior.

## Chronological log

- Read starting records and waited for director board binding; proceeded on confirmation.
- Inspected existing Abandoned opt-in and Volcanic explicit placement patterns plus crawler mine conventions.
- Implemented bounded roster/factory/order/combat/renderer/UI integration and focused disposable fixtures.
- Initial terrain fixture used a padded rock overlapping the mine footprint; adjusted barrier to test sight blockage separately. An exact heading assertion distinguished JavaScript -0 from0; changed to numeric tolerance. No runtime workaround for these fixture issues.
- Focused checks passed; added production walk/arrival, force-move priority, exact runtime2s reload and locked-door protections on director steering.
- Corrected final-source full suite completed with exit0;114 scripts passed syntax and all listed checks passed. Final whitespace check passed; prepared scoped Review commit.
- Full suite launched after runtime implementation; focused additions completed before suite reached the Orbital check. It caught an accidental list edit in the Recovery starting factory call, which created the wrong type. Restored the exact Recovery factory call; Abandoned and Orbital focused checks passed, then restarted the full suite on corrected final sources. Browser acceptance explicitly recorded not run.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/check-orbital-troopers.cjs` | passed | Production UI/tactical/walking/arrival/cancellation/reset; finite4/1s/20px/32px/2damage; invalid bounds/nonfinite/unreachable/terrain; ground/air/burrow/friendly/nest/prop exclusion; shared crawler defaults; factories/actual ground-air support/cap/menu/world isolation; Breacher exact range/reload, lane alignment, single hit, wall/locked-door absorption; Mine-layer force priority |
| `node tools/check-unit-guide.cjs` | passed | All custom entries/portraits, original cards, recovered-frame plus authored mark command parity |
| `git diff --check` | passed | No whitespace errors |
| `node tools/dev.cjs test` | passed, exit0 | Complete suite on corrected final sources:114 script syntax checks, all runtime/simulation/render/guide/mission/music/tooling/director/offline GitHub mirror checks |
| Live browser playtest | not run | [Separate live-check record](../playtests/2026-10-09-orbital-troopers.md); no matching runtime mission or browser fixture added. No live rendering/audio/playability claim. |

## Unresolved issues and risks

No material scope/design questions. Initial numerical tuning is approved; routine unspecified defaults are documented above. Live appearance/audio/playability remains unverified and is separate from simulation evidence. Public/private publication and original-asset distribution remain unresolved project constraints; this work does not publish.

## Next action / handoff

Director next action: independently review the scoped branch commit (`git log -1 --format=%H feature/orbital-scrapyard-trooper-roster`), rerun appropriate checks, then squash-integrate only after acceptance. Worker stops at Review with clean scoped commit; exact SHA reported to director. Do not merge or edit the director board. Reviewer should inspect shared optional mine-rule defaults, explicit placement/cancellation and fixed-kit/cap/menu integration,90px firing guards/collision/reload and unchanged original/world mission behavior. Branch has not been squash-merged; director records resulting main SHA after acceptance.

## Director review correction

Director functional review accepted the implementation and retained full-suite exit0 evidence. Exact committed diff checking found a new blank line at EOF in tools/check-orbital-troopers.cjs (the earlier working-tree diff omitted that then-untracked file). Removed only the trailing blank line. The affected focused fixture passed again; committed range whitespace verification passed. Full suite was not repeated for this formatting-only correction. Worker returns to Review; next action remains director accepted squash integration.
