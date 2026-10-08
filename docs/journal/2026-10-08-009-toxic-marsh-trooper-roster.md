# 2026-10-08 / 009 — toxic-marsh-trooper-roster

- Task: [toxic-marsh-trooper-roster](../tasks/toxic-marsh-trooper-roster.md)
- Date: 2026-10-08 (Europe/Berlin); session 009 across all features that day
- Branch: feature/toxic-marsh-trooper-roster
- Starting commit: c2594c90c0b939b0e2e42e84113586f5bb884494
- Status: Review — implementation/checks complete; director review and squash integration pending

## Starting context

Assigned isolated checkout triumph-toxic-marsh-trooper-roster. Read AGENTS, WORKER, WORKFLOW, task and prepared session009. Only prepared task/session changes existed. Director confirmed dispatch before edits. No matching Toxic Marsh runtime mission exists; TRI-089 is separately queued and excluded. No original-game research, asset regeneration, board edits, delegation, merging or publication.

## Work performed

Implemented src/toxic-marsh-troopers.js with actor-owned explicit-clock Tracker marks and Chemical single delayed doses. Integrated central starting/support factories, optional trackers/chemicals arrays, Toxic Marsh roster/menu eligibility, infantry capacity/orders/fixed kits, eight-direction cone combat, shared sprite/Units portraits and transient mark/cone/dose duration drawings. Existing missions and recovered assets remain unchanged.

Routine tuning: 220px friend radius, 45-degree cone, 1.25s spray cadence, ordinary1HP and infantry movement/rifle. The cadence deliberately exceeds1s delay so sustained one-trooper AI damage resolves. Refresh replaces dose deadline and latest owner without stacking. Application and resolution honor shields and underground worm immunity; resolution consumes immune/dead doses. Removed actors receive no effects. Nest credit/acoustics use existing conventions. Green mark brackets expire after2s or dead source/target. Mark preference needs current legal sight/range/quantized lane/candidate cost and excludes explicit competing orders/distant Follow. Shared Guard/Follow priority and terrain gates stay intact.

## Chronological log

- Director dispatched TRI-082 and confirmed In progress; read-only inspection preceded authorization to edit.
- Added opt-in module/factories/UI integration and focused disposable production tests; no new mission.
- First cone-edge test exposed floating-point100px boundary drift; used chemical-only1e-9 tolerance, keeping Cooling reach unchanged.
- Director preliminary review requested dormant unrelated mark-state protection and focused retained-target/expiry/orders/immunity/ownership evidence. Marks now allocate only on successful mark, remove dead source, and do not install empty state in unrelated worlds.
- Focused tests pass: actual AI sustained chemical damage, real update old-target replacement/expiry, terrain/range/cone, refresh/latest owner, shield/worm/dead/removed target semantics, tactical freeze, fixed kits/terminal/Follow/Guard/force, starting factories, actual carrier/parachute delivery, capacity and original/world isolation.
- Director independently passed Toxic Marsh/Units/menu/immutable-input checks and accepted implementation preliminarily.
- Updated DESIGN, ARCHITECTURE, Controls and Units. Separate browser record explicitly Not run: no matching shipped mission; live API availability is not claimed absent.
- Started node tools/dev.cjs test; running at handoff checkpoint below. No failure observed so far. Production code final adjustment restricted cone epsilon to Chemical, preserving prior Cooling exact range; rerun affected Chemical/Volcanic checks before commit.

- Final self-review made Tracker burst tuning explicit in balance registry: the exact ordinary soldier3–6 rounds/.8–1.8s rest/.2–.8s reaction values. Focused production verifies actual rifle burst/projectile creation; no existing kit values change. Rerun affected burst/combat checks.

- Full node tools/dev.cjs test completed exit0. After final scoped Tracker registry/test addition, node tools/check-toxic-marsh-troopers.cjs, node tools/check-volcanic-troopers.cjs and node tools/check-combat.cjs all passed exit0; immutable combat includes30 seeded18s traces, RNG continuation, four20s mission simulations and asymmetric headings. Final modified/new scripts syntax checks pass. No further implementation changes.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Focused production | passed | node tools/check-toxic-marsh-troopers.cjs exit0, repeated after additional real-update/immunity tests |
| Units portraits | passed VM only | node tools/check-unit-guide.cjs exit0; recovered sprite/mark command parity |
| Full automated suite | passed, exit0 | node tools/dev.cjs test:101 scripts syntax-checked and all repository/simulation/music/tooling/director/project checks passed |
| Live browser playtest | Not run | [separate browser record](../playtests/2026-10-08-toxic-marsh-trooper-roster.md), including Units UI/canvas/audio/playability absence |

## Unresolved issues and risks

No material question open. Routine initial tuning awaits human balance feedback. Live visual/UI/audio/playability is unverified; VM evidence must not be described as a browser pass. No matching mission was invented. Scoped Review commit includes this journal. Exact current implementation SHA is the branch HEAD, resolvable with git rev-parse feature/toxic-marsh-trooper-roster; director review/checkpoint records it.

## Next action / handoff

Implementation finished at Review. Director should independently review the branch HEAD and the focused production evidence, then squash-integrate if accepted. No merge/publication performed; resulting main squash SHA remains for the director checkpoint. Checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-toxic-marsh-trooper-roster. Resolve scoped commit with git rev-parse feature/toxic-marsh-trooper-roster. Review priority: legal mark preference versus explicit orders;1.25s spray cadence/refresh ownership; transient effects and opt-in-only factories/menu/caps. Browser limitations remain as recorded.
