# 2026-10-08 / 020 — volcanic-forge-map-regression

- Task: [volcanic-forge-map-regression](../tasks/volcanic-forge-map-regression.md)
- Date: 2026-10-08 (Europe/Berlin); session 020
- Branch: `fix/volcanic-forge-map-regression`
- Starting commit: `e6751bda26035502051d4a9d5ce2561f5d84d989`
- Status: Review

## Starting context

TRI-094 repairs the map-only magma-core change 0ffef94. Director and separate worker reproduced blocked mission point (800,110) on main. Assigned isolated checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-volcanic-forge-map-regression. Initial task/session records were supplied; unrelated working edits were absent. Read AGENTS, WORKER, task and this initial journal. Waited for director board binding before implementing. TRI-085's Floating fixture fixes remain parked in another checkout and are outside this scope.

## Work performed

- Retained every basalt/pillar/core polygon and every terrain/collision pixel. Adapted the northeast initial bug and its repeated wave spawn from (800,110) inside the pillar to (880,110), east of it.
- Adapted middle thermal hazard and its first/final wave positions from (520,390) inside the core to (650,390), on the east bypass. Director accepted both relocations. Other positions, roster mechanics, objectives, counts, wave chronology/budgets, support and controls are unchanged.
- Synchronized hazard metadata in generator and geometry.json. No production asset regeneration or recovered/installed-game access.
- Updated base mission description from central conduit to magma-core bypass and documented placement rationale in DESIGN. Resolved difficulty-specific descriptions retain original mechanics text.
- Strengthened existing focused test without removing original checks: all-five exact headcounts/budgets/intervals/support counts, geometry placement agreement, blocked original pillar/core points, both relocated 8px square footprints, weapon and actual specialist starts, and all-five ordinary/Demolition/Cooling route traversal through both terminals and both relocated positions. Sampled each swept center segment at <=1px, matching production center-collision movement. Existing nest-birth samples, hazard behavior, freeze and victory checks retained.

## Chronological log

1. Director confirmed TRI-094 In progress binding and instructed placement repair over broad redesign.
2. Disposable VM audit found only bug (800,110) and hazard (520,390) blocked in all five profiles; human/specialist starts and nest-birth samples were clear. Static profile wave points also reused the blocked coordinates and were updated with them.
3. Director accepted (880,110)/(650,390) relocation, required retained solid original positions and all-five clearance/travel checks.
4. Focused Volcanic passed after implementation. Expanded route test initially used navigation's extra 4px corner clearance rather than production center collision; replaced that diagnostic with independently sampled center segments. This passes all three infantry types on all five profiles; full footprint clearance is separately verified at both relocated sites. No runtime navigation changes were made.
5. Full-suite command reproduced inherited Floating baseline failure. No excluded scenarios, altered oracle or unrelated fixture changes were introduced.
6. Rebuilt generator in a disposable temporary directory only. Terrain/collision PNG bytes match exactly; geometry matches semantically and terrain.js matches as text after checkout newline normalization. All 786432 collision PNG pixels match packed runtime mask bits. First byte comparison of geometry failed solely on checkout newline differences; semantic comparison then passed.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/check-volcanic-forge.cjs` | PASS | All five profiles, clear/connected points, four nest birth samples per nest/profile, fifteen infantry route runs plus swept center samples, hazard mechanics/freeze/victory. |
| `node tools/check-volcanic-troopers.cjs` | PASS | Production cone/timing/slow/terrain, charges/cancel/finite/arming/trigger/blast, factories/caps, world isolation. |
| `node tools/dev.cjs check` | PASS | Syntax110 scripts, runtime references/load order, portable docs and asset counts. |
| `node tools/dev.cjs test` | FAIL — inherited | Syntax/project/gamepad/breeding pass, then check-difficulty-profiles.cjs:35 Custom baseline custom-floating-habitats-station-strike veryeasy (specialist roster/state differs from stale baseline). Runner stops there; later checks are not implied green. TRI-085 owns this repair. |
| `node tools/check-recreation.cjs` | PASS | Broad disposable gameplay regression independently invoked after full runner stopped. |
| `node tools/check-custom-missions.cjs` | PASS | Custom objective/chronology regression. |
| `node tools/check-custom-support.cjs` | PASS | Actual VM support delivery including Volcanic troop/tank caches. |
| `node tools/check-rendering.cjs` | PASS | Immutable rendering-command comparisons; mocked canvas, no live rendering claim. |
| `node tools/check-unit-guide.cjs` | PASS | Guide/runtime sprite/mark parity. |
| Generator/source/mask consistency | PASS | Copied build-volcanic-forge.py to temporary tools directory and ran it with bundled Python/Pillow; compared all four outputs with checked-in files. Polygon-generated PNG/runtime mask all-pixel equality verified separately. |
| `git diff --check` | PASS | No whitespace errors. |
| Live browser playtest | NOT RUN | No browser evidence generated this session. VM movement checks do not prove rendering, audio, human completion or live playability. Existing TRI-081 browser record is prior-session evidence only. |

Terrain PNG SHA256: `1adb8053eecc9adbb7471befc18b024500ce7660ad2ab8b83244f66df94f6eb0`. Collision PNG SHA256: `c10caa43dacd5fd2734f36b60462f73f496ef6faf4d2d02ab59f2c15770d1fc4`. Both unchanged and reproduced by generator. Bundled Python: C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe.

## Unresolved issues and risks

Full-suite result is red due to inherited Floating fixture drift awaiting TRI-085, not TRI-094 geometry. No live browser playtest in this session; geometry-route simulation is narrower evidence. No scope/design question remains.

## Next action / handoff

Director independently reviews scoped placement/wave changes, unchanged map assets, expanded checks and these limitations; then squash-integrates if accepted. Worker stops at Review, does not merge or edit board. TRI-085 must subsequently resume against corrected main and rerun its final full suite. Exact worker implementation commit is the commit containing this journal (resolve with `git log -1 --format=%H -- docs/journal/2026-10-08-020-volcanic-forge-map-regression.md`); final SHA is reported to director after commit. No squash merge performed by worker.
