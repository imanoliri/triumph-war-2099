# 2026-10-04 / 043 — relay-breaker-map-proposals

- Task: [relay-breaker-map-proposals](../tasks/relay-breaker-map-proposals.md)
- Date: 2026-10-04 (Europe/Berlin); session 043
- Branch: `chore/relay-breaker-map-proposals`
- Starting commit: `ea6eadac80352601416e853aad9f6ca13af8fcaa`
- Status: Review

## Starting context

Director dispatched TRI-029 for three user-reviewable map concepts only. Existing Relay Breaker reuses Desert Rocks; no new playable map was authorized. Read AGENTS, WORKER, WORKFLOW, task and initial journal. Prepared task/session edits were present; no unrelated worker changes were present.

## Work performed

Created [proposal comparison](../design/relay-breaker-maps/README.md), three paired native SVG/PNG schematics, contact sheet, explicit 1024×768 geometry/actor JSON and small local render/geometry scripts. A Split Ridge provides parallel fronts, B Relay Basin provides a shared hub, C Switchback Mesa provides a staged approach and long southern bypass. All preserve existing actor counts/objective and support types; rectangles represent blocked rock concepts, not finished art. No runtime, source assets, current gameplay description or director board edits.

Recommendation: refine A for clear assault routing and smallest terrain-authoring scope. The user must select/refine a concept before a separate implementation ticket. Comparison records route widths, sightline risks, new terrain image/mask needs and the originalBegin/custom-mission/support coupling that follow-up must address.

## Chronological log

1. Inspected current placements/objective and runtime terrain/support seams without accessing original installation.
2. Authored new layouts directly from independent geometry; did not trace Desert Rocks.
3. Generated previews/native SVGs and metadata; visually inspected A and the contact sheet. Director independently inspected contact sheet and found concepts distinct/readable at individual scale.
4. Added explicit east connector routes so both relay approaches are shown. Verified 25 placements per concept, both nest lanes and all route segments under conservative clearance.
5. Geometry verifier initially failed on its zero-length segment arithmetic; corrected denominator guard and reran successfully. No design geometry needed changing.
6. Addressed director review: corrected P to plasma weapon pickup (object 54), regenerated previews, and added explicit deployment-connectivity assertion for nest firing positions. Geometry checks passed again.
7. Ran complete repository test suite successfully. Documented proposal-only limitations and decision requested. Marked acceptance delivered; worker stops at Review.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/dev.cjs test` | pass, exit 0 | Syntax 37 scripts; runtime/project, simulation, custom mission, music, tooling and director fixtures passed. Runtime assets/code untouched. |
| `python docs/design/relay-breaker-maps/verify.py` | pass, exit 0 | 75 total placements connect on 16 px cardinal grid; main/flank/connector segments reserve 64 px square corridor; each nest has clear reachable 128 px cardinal firing lane. |
| `python docs/design/relay-breaker-maps/render.py` | pass | Three paired SVG/PNG assets plus JSON/contact sheet generated using bundled local Python/Pillow. No package install or runtime dependency. |
| Visual review | pass for schematic artifacts | Worker viewed A/full contact sheet; director viewed contact sheet. Full-size files have legend, world convention, starts/objectives/enemy/support markers and limits. |
| Live browser playtest | not applicable / not performed | No playable new map exists. Runtime collision/rendering/audio/support delivery/balance unverified. |

## Unresolved issues and risks

User selection/refinement remains pending. Real collision masks, decorative terrain, tank delivery and actual firing/interaction/pathfinding behavior need a separately approved implementation. Concept 32 px square margin is a conservative planning reserve, not a statement of runtime actor radius. Current original nine maps and Relay Breaker remain unchanged. No publication or distribution permission inferred.

## Next action / handoff

Director reviews scoped commit and presents the actual PNGs. Request A/B/C selection, visual style and route/support/relay refinements. Create an implementation ticket only after user decision. Checkout: `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-relay-breaker-map-proposals`. Artifacts: `docs/design/relay-breaker-maps/`. This branch is not merged or published; scoped commit is the commit containing this journal (obtain exact SHA with `git rev-parse HEAD`). Director records any resulting squash SHA in a later checkpoint.

