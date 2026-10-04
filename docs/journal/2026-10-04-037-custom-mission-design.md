# 2026-10-04 / 037 — custom-mission-design

- Task: [custom-mission-design](../tasks/custom-mission-design.md)
- Date: 2026-10-04 (Europe/Berlin); session 037
- Branch: `chore/custom-mission-design`
- Starting commit: `8a301b7089b2d74ff6b92bc833fa5000713b5f68`
- Status: Review

## Starting context

Prepared task edit and initial session were the only uncommitted files. Read AGENTS, WORKER, task, this prepared journal, WORKFLOW, ARCHITECTURE, DESIGN and parent new-missions intake. No unrelated edits were overwritten. Original browser access remains unavailable; no original-installation research was performed.

## Work performed

Created [three scenario designs](../design/custom-missions.md), [explicit metadata](../design/custom-missions.json) and a disposable geometry diagnostic (`tools/check-custom-mission-design.cjs`). Relay Breaker captures two relay stations and clears two nests on Desert Rocks. Last Convoy holds an army through 120 seconds and 26 finite scheduled arrivals on Hold Base. Silent Return raids Flash Back's access/laser terminals and extracts surviving ground humans without requiring enemy clearance. All use existing maps/masks/sprites and distinct custom objectives. No runtime, recovered asset, director board, original installation or gameplay change.

The design explains the custom-ID/terrain-template/progress seam, original index-dependent hazards, support/pickup/vent policy, selector/grouping, tactics, finite Normal births and bounded implementation acceptance. First proposed ticket: custom registry + Relay Breaker only. Further defense and infiltration tickets depend on it and director scope approval.

## Chronological log

1. Inspected prepared edits and current runtime constraints. Found `s.level`, nine-element legacy missions, original initializer, wave spawn edges and extraction/progression text cannot safely be extended by appending custom definitions.
2. Used tracked data and existing disposable VM bootstrap to inspect geometry and source support rules. Proposed terrain reuse openly; replaced only scenario actors inside the diagnostic VM.
3. Adjusted several sampled coordinates when stricter ±8px clearance failed; replaced one bug position lacking an accessible cardinal firing lane. Verified access terminal 253 is reachable before unlock, laser approach is blocked by locked door252, real interaction unlocks it, and return is reachable afterward. Source access is `used` without `active`; custom progress must respect that distinction.
4. Geometry diagnostic passed 88 placement/route entries and 18 enemy/nest firing lanes, support eligibility and five cannon approaches. Full dev suite passed.
5. Director steering: three candidates are working scope under the creation request; user count preference remains unsubmitted. Updated design/metadata accordingly, without presenting director inference as a user answer.
6. A formatting command temporarily corrupted uncommitted JSON coordinate arrays through shell interpolation. Replaced that file with actual explicit final coordinates and reran the diagnostic successfully. No placeholder file is committed. Removed only worker-owned root scratch file.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/check-custom-mission-design.cjs` | pass | 88 clear/connected placement and route entries; 18 accessible cardinal target lanes; real terminal use/unlock/activation; return route; five cannon approaches; source support applicability |
| `node tools/dev.cjs test` | pass, exit0 | 36-script syntax, project references/assets, simulation, vent lifecycle, MIDI/music and disposable workflow/director fixtures |
| `node --check tools/check-custom-mission-design.cjs` | pass | Added diagnostic syntax |
| `git diff --check` | pass | No whitespace errors |
| Live browser playtest | unavailable | No rendering, audio, delivered support, balance or live route/playthrough claim; future implementation tickets include live acceptance |

The geometry fixture retains original static masks, doors, breakable walls and cannons. Human planning traverses unlocked closed doors; actual opening/movement must be exercised during implementation. It does not validate tank footprint, troop formation spacing, hostile path tactics, custom progress or balancing. These scenarios are unregistered proposals, not playable releases. The diagnostic borrows the existing recreation fixture bootstrap and must be maintained if that bootstrap changes.

## Unresolved issues and risks

- User count preference remains unsubmitted; director working scope is three candidates. This is not a blocker to design review or the independently viable first ticket.
- Numerical starts/waves are proposed tuning. Live balance/playability remains unverified.
- Custom selector, separate in-memory merits/progression, per-instance terminal keys, finite emissions and extraction are proposed follow-up runtime behavior, absent from this branch.
- Existing original enemy/support/difficulty proposals remain untouched. Original assets retain their provenance and publication remains outside authority.

## Next action / handoff

Director independently review `docs/design/custom-missions.md`, metadata and diagnostic; run `node tools/check-custom-mission-design.cjs` from this checkout. Review first-ticket scope/acceptance in Runtime seam and Relay Breaker sections, then intake a separate registry + Relay Breaker ticket/branch. Worker stops at Review; no merge/publish. Commit is the scoped HEAD associated with this session (report exact SHA in the Review coordination message; no self-referential SHA embedded in commit content). Squash integration not performed; director must later record its resulting main SHA in its checkpoint.
