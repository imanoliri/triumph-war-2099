# 2026-10-05 / 014 — mounted-soldier-duplicate-sprite

- Task: [mounted-soldier-duplicate-sprite](../tasks/mounted-soldier-duplicate-sprite.md)
- Date: 2026-10-05 (Europe/Berlin); session 014 across all features that day
- Branch: `fix/mounted-soldier-duplicate-sprite`
- Starting commit: `7fd9fb228813fcab94022717ff4140b7a56fef23`
- Status: Review ready

## Starting context

TRI-030 approved as bounded rendering fix. The seated cannon animation already includes its operator; the later ordinary human pass also drew the occupant. Preparation's task/session files were the only initial edits. No assets or gameplay rules required modification.

## Work performed

The sorted human draw list now excludes a human only when its cannon index resolves to a cannon whose occupant is that same human. On-foot humans and stale mount indexes remain visible. Cannon rendering, combat, selection and all mount/dismount logic are unchanged. DESIGN now describes seated-only mounted rendering and selection preservation.

Added an instrumented sprite-call fixture around the actual draw function, restored after each draw. Checks exercise normal use mounting for soldier/commando, suppression of object 52, retention of animation 11 cannon composite and selection ellipse, ground-order restoration, stale-index visibility, dead-human exclusion, active-update occupant cleanup and restart ownership reset.

## Chronological log

- Read AGENTS, WORKER, task/session, WORKFLOW, SETUP and PLAYTEST; inspected isolated branch/status and draw/update/mount paths.
- Initial browser Retake Base attempt did not exercise stationary cannons; corrected to Hold Base. Baseline build remained loaded while code was edited, allowing before-fix observation there.
- First test fixture assumed Retake Base had a stationary cannon; corrected to Hold Base. Next death-cleanup assertion exposed the fixture's tactical-start gate. Explicitly set playing/resumed before update; production lifecycle was not changed. Director independently reported the same gate and later confirmed the corrected full suite passes.
- Completed full suite, browser refresh/repeated Hold Base mounting, paused ground-order dismount, and saved before/after/dismounted screenshots.
- Ran negative regression with only the old human draw predicate substituted in memory: fails exactly at mounted soldier standing suppression. No tracked source mutation for the negative check.
- Updated task acceptance, current DESIGN, scoped playtest report and this handoff. No delegation, board changes, merge, publication or asset regeneration.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/dev.cjs test` | pass (exit 0) | Syntax/references/assets, recreation including new draw regression and existing sixteen-heading/continuous sweep rules, music and disposable tooling/director checks. |
| Old-predicate negative check | expected fail (exit 1) | In-memory game.js predicate substitution yields `Mounted soldier standing sprite suppressed` (actual 1, expected 0); ignored log `work/mounted-negative-check.log`. |
| Live browser playtest | pass for scoped soldier visual behavior | [Hold Base report and screenshots](../playtests/2026-10-05-mounted-soldier/report.md); actual normal canvas mount, selection, seated-only after reload, ground-order standing restoration. |
| Director independent full suite | pass reported by director | Director reran after tactical fixture correction and reported exit 0. |

## Unresolved issues and risks

No open scope/design questions. Browser did not exhaustively verify all sixteen headings, commando mounted appearance, death/reset, audible sound or full missions. Those applicable gameplay/lifecycle checks pass in VM; broader release playtesting is not claimed. Browser version is not exposed. Different elapsed times in before/after screenshots preclude whole-scene pixel comparison.

## Next action / handoff

Director independently review scoped diff and evidence, then squash-integrate if accepted. This branch is not merged or published. Exact Review commit is the commit containing this journal (obtain with `git rev-parse HEAD` in the assigned checkout). No worker work remains pending review; no final main squash SHA exists yet.
