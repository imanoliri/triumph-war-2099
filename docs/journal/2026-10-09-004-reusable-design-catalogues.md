# 2026-10-09 / 004 — reusable-design-catalogues

- Task: [reusable-design-catalogues](../tasks/reusable-design-catalogues.md)
- Date: 2026-10-09 (Europe/Berlin); session 004 across all features that day
- Branch: `chore/reusable-design-catalogues`
- Starting commit: `8f559de3f67f6a9c65e6c77813e38cb601e04e46`
- Status: Review; director-bound sole worker `/root/design_catalogue_worker`

## Starting context

Read AGENTS, WORKER, WORKFLOW, task and prepared initial session. Waited for director binding confirmation before mutations. Preparation edits retained. Abandoned A already selected/implemented; Orbital B selected with TRI-093 pending. Runtime/source assets/atlas/other worktrees/director board remain outside mutation scope.

## Work performed

Created [standalone catalogue](../design/catalogues/catalogue.html), [structured JSON](../design/catalogues/catalogue.json), [authoring/future contract](../design/catalogues/README.md), editable records/template, read-only disposable capture/builder and focused validation. Twelve generic patterns have independent IDs, diagrams and topology/sight/choke/exposure/clearance/objective/failure analysis. All39 atlas options plus three Relay Breaker and three Dunes proposals are indexed by retained source/export references. Catalogued34 implemented human/companion/vehicle/escort entries, exact rosters and contextual factory/Units/rules evidence; deferred Medic, rejected Listener and superseded/unapproved drafts remain distinct. Seven existing enemy roles/states and six proposed enemies have telegraph/counterplay/layout/budget risks and unresolved choices. Matrix and three compositions preserve hard roster/aim/terrain/health/support gates; future contract independently owns layout/art/units/enemies/objectives/placements/support/difficulty.

DESIGN now links library and records observed canopy spider discrepancy: factory gives6 HP/triggered births but declared speed160/damage2/ambushActive have no consumer. Generic nonqueen movement/combat applies (22 patrol/27 approach times profile multiplier; melee1). Documented without runtime changes.

## Chronological log

1. Binding confirmed before work. Read current factories/combat/orders/support/modules, atlas/Dunes/Relay packets and approval/defer records. No original-game or external research.
2. Director flagged generic infantry factory inadequate for vehicle/commander evidence. Restricted capture to infantry; separately validated mission robot7, commander1, disabled crawler2 with cap6. Guide/profile context explicit.
3. Director flagged symmetric fork; made shorter upper/longer lower graph visibly distinct. Added12 pattern-specific exposure/clearance analyses.
4. Enemy factory audit covers ground/red/queen, vent ceiling/drop/jump, worm and canopy spider. No actual hostile air/tank factory; generic guards are not implemented species. Phase restrictions explicit.
5. Corrected binary hashing and initial HTML parse error exposed by actual browser. Focused checker now executes inline artifact and validates exact snapshots, sources, IDs/links, cards/matrix/search and canonical initialization/phases.
6. Director clarified starting Abandoned robot versus delivery and historical unapproved identities. Improved human-facing link names, preserved stable targets. Dunes A selected; C older route note contradicted by packet lengths is explicit.
7. Actual hidden IAB browser rendered artifact at1264×712. Inspected diagrams/matrix/proposal/facts/original SVG disclosure/example/search. Search Snow Sniper yielded one matching card; clearing restored116. [QA record/screenshots](../design/catalogues/QA.md). Visible subagent tab unsupported; hidden tab worked. Artifact QA, not gameplay.
8. One full `node tools/dev.cjs test` process exec42166 completed exit0, including syntax/repository/runtime/roster/custom/terrain/music/tooling/director/offline mirror checks. No duplicate suite. Focused checks rerun after catalogue-only edits; unchanged atlas geometry/export and atlas UI checks also pass.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node docs/design/catalogues/build.cjs` | pass |12 patterns/34 implemented humans/7 existing+6 proposed enemies/45 maps |
| `node docs/design/catalogues/check.cjs` | pass | IDs/statuses/references; exact hashes;39 atlas graph/pro/con parity;45 sources/exports; exact factory/Units/module/roster evidence; robot/commander/crawler initialization; worm phases;116 rendered cards/12 matrix rows/search/links |
| Actual browser artifact QA | pass within inspected views | [QA.md](../design/catalogues/QA.md) and3 screenshots; diagrams/navigation/proposal/facts/map disclosure/example/search |
| `node tools/dev.cjs test` | pass, exit0 | Single exec session42166; complete suite |
| Atlas `check.cjs` / `check-ui.cjs` | pass |39 options/13 worlds, source budgets, geometry/exports,13 controls/39 option views; source files unchanged |
| Live gameplay/rendering/audio | not run | Documentation-only; runtime/assets unchanged. Artifact QA is not gameplay verification |
| Staged whitespace/preservation | pass before scoped Review commit | Only catalogue/DESIGN/task/session paths; runtime/assets/atlas files unchanged; staged whitespace clean |

## Unresolved issues and risks

New enemies/older soldier alternatives remain unapproved; Medic deferred under unchanged health; cross-world combinations unsupported. Schematics/VM/artifact do not prove collision/playability/balance. Spider discrepancy documented only. No publication/asset distribution. No blocking design question.

## Next action / handoff

All acceptance criteria met and checks passed. Scoped Review commit is the branch tip containing this final handoff: resolve exact SHA with `git rev-parse chore/reusable-design-catalogues` in the assigned checkout. Director receives exact SHA with worker report and records review/integration in its authoritative checkpoint. Review the standalone artifact, proposal/status separation, fact-context/source checks and retained map/source invariance; rerun `node docs/design/catalogues/check.cjs`. Director independently squash-integrates if accepted, then records resulting main SHA. Worker stopped at Review; no integration/publication/board mutation performed. No open question; next implementation ticket remains TRI-093 selected Orbital B under separate dispatch.
