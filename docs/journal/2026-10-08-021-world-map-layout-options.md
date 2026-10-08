# 2026-10-08 / 021 — world-map-layout-options

- Task: [world-map-layout-options](../tasks/world-map-layout-options.md)
- Date: 2026-10-08 (Europe/Berlin); session 021 across all features that day
- Branch: `chore/world-map-layout-options`
- Starting commit: `1e9be6300710c52df4731373ff10dc5de8bf67ca`
- Status: Review — design atlas complete, selection and director integration pending

## Starting context

Assigned isolated checkout `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-world-map-layout-options`, branch `chore/world-map-layout-options`, starting1e9be630. Read AGENTS, WORKER, WORKFLOW, approved TRI-095 task and this initial session. Task/session preparation edits were the only existing changes and belong to this ticket. Director explicitly confirmed worker binding before authoring. Continue this same execution/session across the October8/9 date boundary.

## Work performed

Created `docs/design/world-map-atlas/`:39 authored route-network proposals for13 newer worlds, each with specific pros/cons and specialist roles; standalone HTML atlas under1MB with world/option controls, goal summaries, readable five-profile budget tables, export links and proposed coordinate metadata;39 individual native SVG/PNG pairs,13 world SVG/PNG sheets and one all-world SVG/PNG sheet. `layouts.cjs`, `template.html` and deterministic `build.cjs` remain editable source. Optional bundled Sharp raster export adds no browser/game runtime dependency.

`geometry.json` separates custom proposal geometry/hotspots from immutable checked-out mission objective/roster/profile snapshots with source SHA256. Normal placements and all special anchors are mapped: Snow/Jungle three survivors plus acquisition/return areas, Undercity all-ground extraction, Capital three70s friendly relief landings, existing thermal/vent/ambush anchors, nests, bugs, support and plasma. Source wave counts/timestamps and five-profile budgets are retained, with distinct proposed anchor mapping. No runtime, asset, baseline, director board, installed-game or earlier proposal file is changed.

Planned Abandoned/Orbital use an explicitly labelled existing-system two-relay clear assault default. Abandoned includes1 Incendiary,1 Recovery and one existing7HP robot, permitting useful finite healing after injury without new HP rules. Orbital includes1 Mine-layer and1 Breacher; no automatic mines, hull demolition or flight. Final five-profile tuning/integration is TRI-092/093 scope, after matching roster tickets.

## Chronological log

1. Read earlier Relay Breaker/Beneath Dunes packets and current runtime source, planned mission/roster tasks and visualize skill. Durable standalone native authoring matched the task; no inline-only visualization workflow was applied. No original-game research or delegation.
2. Director corrected an initial Recovery eligibility misunderstanding using sibling TRI-085 session019: existing tanks8HP/robots7HP/crawlers6HP/Heavy Troopers3HP are useful recipients; two finite+1HP kits after1s stationary within40px visible clear lane. Read that record, corrected descriptions before delivery and proposed a legal existing robot recipient. Jungle rescue narrative was independently corroborated from current source after a stale director concern was withdrawn.
3. Authored initial39 networks and built atlas/sheets. Fixed-position clear-area audit caught JungleA/FloatingA93.3% and IndustrialC/AbandonedB92.5% near-clones. Redesigned those, MercenaryC, JungleB and OrbitalC to distinguish actual topology, objective approaches and exposure rather than only terrain color.
4. Director static review requested visible compact deployment, Capital relief projection and extraction identity. Added D, L1–L3 at70s, three separate R survivor hotspots, proposed objective/landing coordinate projection, green acquisition/extraction rings and shared D/X marker. Focused source-count checks caught and removed an erroneous generic pair of Maritime terminals; final Maritime has its actual timed-defense goal and zero terminals.
5. Director reviewed13 PNG sheets and asked for stronger within-world FloatingA/B distinction. A now immediately offers three deployment branches with a710px exposed inner transfer and separate lower tank/climate circuit; B retains a compulsory staged tower chain; C retains overlapping rings.
6. Added reflection/±64px translation audit, not only fixed-position masks. It exposed a mirrored OrbitalB similarity; redesigned B as rectangular port hull plus triangular starboard circuit with a four-mouth shared boarding bay. Final maximum overlap82.4% across741 pairs and tested transforms. Remaining similar-family cases and metric limits are explained in README; graph signatures are descriptive, not an originality certificate.
7. Added meaningful negative geometry fixtures and exact five-profile source-contract comparisons. Navigation fixture tests all13 worlds/39 option views in a disposable DOM shim. Static PNGs were inspected, including final Floating/Snow/Orbital review iterations; director confirmed visible findings resolved. No browser workaround or live gameplay claim.
8. Final source-to-prose review placed Undercity hack hotspots before their common exit, explicitly kept CapitalC terminals at north/south transit ends and VolcanicB at both remote pressure vaults. Updated comparison guide, task acceptance/review packet and this handoff. Rebuilt final artifacts, reran geometry/UI/export checks and syntax-checked all five authoring/check scripts. Prepared scoped design-only commit and stopped at Review.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node docs/design/world-map-atlas/build.cjs` | pass |39 options;50,950 route samples;49px circular route envelope;8px actual-union flood fill; every placement connected/clear;387 eight-direction64px firing opportunities |
| `node docs/design/world-map-atlas/raster.cjs <bundled-sharp-path>` | pass |53 native PNG exports from retained SVGs (39 options+13 sheets+global sheet) |
| `node docs/design/world-map-atlas/check.cjs` | pass | Exact source objectives/waves/support/nest budgets across55 existing-world profiles; Normal force/special placement counts;39 SVG/PNG pairs; negative boundary/disconnected/non-edge fixtures; fixed/reflected/translated overlaps below85% |
| `node docs/design/world-map-atlas/check-ui.cjs` | pass | Disposable DOM navigation/export/metadata fixture for13 worlds and39 single-option views; no browser rendering proof |
| `node tools/dev.cjs test` | inherited failure, exit1 | Syntax110 scripts and runtime/reference/portable-doc/asset/gamepad/breeding stages passed before `Custom baseline custom-floating-habitats-station-strike veryeasy` in `tools/check-difficulty-profiles.cjs:35`; Skirmisher/Defender baseline mismatch owned by parked TRI-085 sibling. Later suite stages did not run. No runtime/baseline modification here. |
| Static visual review | pass within schematic scope | Director reviewed13 sheets and final Floating/Snow/Orbital revisions; worker inspected native PNG/SVG rendering. Deployment, relief, rescue/extraction identities and per-world option distinctions were revised from review. |
| Live browser/playtest | not performed | Local-file browser access blocked during director review. No browser UI rendering, runtime collision, audio, formation/pathfinder, delivery path, balanced gameplay or live mission completion claim. |

## Unresolved issues and risks

Required suite remains red only at the inherited Floating baseline assertion observed above; do not duplicate TRI-085's narrow repair. Proposal clearance uses a17px provisional actor body and49px circular route envelope, not final sprites, diagonal evade swept shapes or calibrated balance. Intersecting clear corridors connect in the actual union; named-node graph metrics are only descriptive. Real delivery, crowd/AI, final collision mask and all gameplay/audio/playability checks belong to selected implementation tickets. Similarity audit excludes arbitrary rotation/scaling and cannot certify uniqueness. User A/B/C choices and refinements remain pending; no material gameplay-system expansion was introduced.

## Next action / handoff

Director independently reruns `node docs/design/world-map-atlas/check.cjs` and `node docs/design/world-map-atlas/check-ui.cjs`, reviews the comparison guide plus actual PNG/SVG sheets, and presents `docs/design/world-map-atlas/atlas.html` or static exports for user selection. Record A/B/C per world and requested refinements before separate existing-map replacement tickets. Abandoned/Orbital choices feed TRI-092/093; no runtime work or publication is authorized by this atlas.

Recover the exact candidate SHA from `git rev-parse chore/world-map-layout-options` in this checkout; this handoff is included in the scoped design commit and the director records its exact SHA in authoritative review metadata. No squash merge was performed by the worker; resulting main SHA belongs to the director's subsequent integration checkpoint. Worker remains available for Review findings.
