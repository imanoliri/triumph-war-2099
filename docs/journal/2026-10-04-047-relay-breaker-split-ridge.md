# 2026-10-04 / 047 — relay-breaker-split-ridge

- Task: [relay-breaker-split-ridge](../tasks/relay-breaker-split-ridge.md)
- Date: 2026-10-04 (Europe/Berlin); session 047
- Branch: `feature/relay-breaker-split-ridge`
- Starting commit: `cef46e763c14a3ddc96ffa6fe257505020144afe`
- Status: Review; implementation complete, full live completion remains unverified

## Starting context

Approved TRI-032: implement A Split Ridge, preserve B/C unregistered. Read AGENTS, WORKER, WORKFLOW, task, proposal coordinates and PLAYTEST. Initial worktree only contained prepared task/session changes. Retained stable custom ID and Desert Rocks rule/support template.

## Work performed

- Authored deterministic custom sand/rock pixel art, collision preview and packed mask under assets/custom/split-ridge. Color palette references assets/maps/7.png only; no source pixels/actors/silhouettes copied. Three irregular stratified ridges stay inside A envelopes, preserving 1024x768 hotspots and quiet HUD strip. Artwork and mask share a two-pixel raster grid; lit rim is decorative.
- Added custom scenery override, removed inherited props/cannons/doors only for new terrain. Original nine map masks and source support paths remain unchanged. Exact A 25 hotspots: four commanders/eight soldiers/six bugs/two nests/two relays/three pickups. No new waves/timer/units/balance or dependencies.
- Added focused physical-route regression to full suite: body/tank clearance, connected positions, legal interaction/LOS, both relay orders, actual eight-soldier formation circuit, timed source carrier unloading/rally assignment, delivered tank turning/full outer circuit, five difficulty/restart paths and all-nine original isolation.
- Updated DESIGN, architecture, guide-facing brief/provenance wording, current scenario design, README and STATUS. B/C proposal documents are untouched.

## Chronological log

1. Inspected runtime loader/support boundaries. Chose custom terrain/mask override while retaining recovered rules/support template. Source support geometries proved compatible; no delivery override needed.
2. Generated artwork/mask locally using build-only Python/Pillow. Visually inspected raster; refined angular lit slabs and stratified outlines. Recompiled collision using identical authoring grid.
3. Full suite passed before and after focused checks. Final `node tools/dev.cjs test` exited 0 after final mask/check changes (38 scripts syntax checked). Private package command passed, 14,575,994-byte ZIP; default exclusion of ignored MIDI bank retained.
4. Browser first hidden option failed in subagent; retry omitting visibility option succeeded. Served loopback 8032, loaded custom selection, deployed in tactical mode, resumed and drag-selected five troops. Actual squad advanced around northern ridge approach to northern relay front, then east/south toward bronze. Actual delivered tank appeared at western staging, and infantry count increased through support. Tank arrival/live movement seen; full live tank circuit not proved.
5. Reloaded final assets and rechecked tactical start/final art. Saved full-page final screenshot and earlier live screenshot. Director independently reported custom terrain/actors/CUSTOM HUD/visor smoke and north-relay squad arrival; southern use-route review ongoing, not counted as completed acceptance here.
6. Director resumed this same session after usage interruption; inspected preserved work and polled final test process, confirmed exit 0. No duplicate journal or scope expansion. Director independently reran the full suite after resume (exit 0), reviewed runtime override/B-C preservation, and confirmed only partial live objective evidence.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/dev.cjs test` | pass | Final exit 0, includes check-split-ridge and unchanged source/custom/control/music/tooling/director checks |
| `node tools/check-split-ridge.cjs` | pass | Exact 25 hotspots, 18px clearance, three wide routes, actual formation/carrier/tank simulation and original isolation |
| `node tools/dev.cjs package` | pass | ZIP contains custom assets via recursive assets packaging; 62 WAVs/995 sprites/9 originals validated; bank excluded |
| `git diff --check` | pass | No whitespace errors |
| Browser deployment/render and squad route | pass, partial smoke | [Playtest](../playtests/2026-10-04-split-ridge.md); screenshots linked there |
| Full live Normal completion/audio | not run | No completion time/casualty/birth count or audio claim |

## Unresolved issues and risks

Full Normal browser mission completion and balance evidence remain a review limitation. Live support arrival and infantry motion were observed, but full tank circuit/support-rally tests are VM physical simulation, not browser claims. Browser viewport cropped vertically; full-page artifacts retain page context. No gameplay failure identified by focused/full tests. No unanswered design question. Public publication/original-asset distribution remains outside ticket authority.

## Next action / handoff

Director independently reviews scoped commit and final artwork/route evidence, completes or explicitly accepts the live completion limitation before integration. Start `node serve.cjs` according to SETUP if existing loopback8032 server is unavailable. Review `tools/check-split-ridge.cjs`, custom assets/provenance, and docs/playtests/2026-10-04-split-ridge.md. Worker stops Review; no merge/publication performed. Commit is the branch tip containing this handoff; director records any resulting squash SHA in a subsequent checkpoint.


## Director acceptance checkpoint

Director accepted implementation commit e451deded44ecec649cc222c9177ef6b3951be87 after independent full-suite pass, runtime/mask/art/source-isolation review and actual live deployment/northern-route smoke. Requested checked task acceptance with all full Normal completion/audio/balance limitations retained. Documentation-only checkpoint; diff check only, no repeated runtime tests. Worker remains Review; director owns squash integration and resulting main SHA record.

