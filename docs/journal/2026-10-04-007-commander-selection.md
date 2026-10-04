# 2026-10-04 / 007 — commander-selection

- Task: [commander-selection](../tasks/commander-selection.md)
- Date: 2026-10-04 (Europe/Berlin)
- Branch: feature/commander-selection
- Starting commit: f136b4526a04ba87cee029bb550e73f30046da22
- Status: Review

## Starting context

Director approved TRI-009 and supplied task/session 006. Initial worktree contained only those task/session edits; preserved and included them. Started this worker session with the task helper.

## Work performed

All four commanders use AI without an explicit selection; troop control is the mission default. Only the selected commander accepts WASD/V/B and mouse combat. Removed alternate physical-key manual-control fallback and the obsolete AI checkbox. Selecting troops, including an empty drag, clears direct control; clicking the selected commander button toggles back to troop control. Empty clicks in troop mode preserve troop mode. Mission load clears selection and held keys. AI leaders exclude self-following for newly AI-controlled commanders 1 and 4. Existing bounded assistant API remains unchanged.

Updated README, DESIGN and in-game Controls. Added deterministic fixtures proving all four AI paths, manual-key isolation, button toggling, empty-click/selection behavior and mission reset; adapted existing commander/door tests to explicit selection.

## Chronological log

- Read task, latest journal, WORKER and WORKFLOW; inspected branch/status and started session 007.
- Implemented the approved control behavior and focused regression coverage.
- First full check exposed an old door fixture implicitly controlling commander 1; changed that fixture to explicit button selection.
- Full checks passed after adding control-mode regressions.
- Director reported limited live browser UI checks passed: initial briefing has unpressed selectors/troop hint; mission start/pause then commander 4 selection enables only its pressed state/orders; clicking again restores troop mode.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/dev.cjs test | passed | Syntax/repository checks, all simulation regressions including default AI/manual isolation, music and disposable tooling/director fixtures. |
| Live browser UI | limited pass, director-reported | Initial troop mode, commander 4 selection/toggle and button/order states checked by director via loopback browser. |
| Live AI gameplay/audio | unverified | Worker used VM simulation; broader live playability and audio were not verified. |

## Unresolved issues and risks

No scope questions or failing checks. Existing asymmetric combat and physical-key WASD/V/B behavior retained for explicit selection. Broad live AI/playability remains a verification limit.

## Next action / handoff

Director independently reviews this branch and test evidence, then squash-integrates if accepted. Worker stops at Review; no merge or publication. Review the default state, all commander AI branch, removal of legacy manual inputs, selector toggle and selection paths. Implementation commit is the commit containing this session; use git log -1 to resolve its exact SHA. Resulting main squash SHA must be recorded by a subsequent director checkpoint.
