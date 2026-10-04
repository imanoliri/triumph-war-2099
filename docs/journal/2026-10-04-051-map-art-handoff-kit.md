# 2026-10-04 / 051 — map-art-handoff-kit

- Task: [map-art-handoff-kit](../tasks/map-art-handoff-kit.md)
- Session started 2026-10-04 Europe/Berlin; same run continued across midnight into 2026-10-05.
- Branch: `chore/map-art-handoff-kit`
- Starting commit: `5447e595b36009af357bd8dce5488d1ccaf2dcad`
- Status: Review; implementation acceptance supported, awaiting director independent review/integration.

## Starting context

Prepared isolated checkout `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-map-art-handoff-kit`. Only task preparation edits and this initial session were present. TRI-033 explicitly prepares reusable art references/prompts/workflows without changing runtime assets or gameplay. Current implemented Split Ridge, not concept rectangles, owns the immutable mask.

## Work performed

Added `docs/art-kit/README.md`, exact geometry contract, director intake/dispatch/review workflow, bounded artist-session workflow, reusable dispatch prompt and filled Split Ridge brief. Added baseline manifest with 17 repository references/hashes, full immutable packed mask, 25 exact hotspots/routes/polygons/palette; 13 frame/hotspot sprite references and 16 recovered Desert Rocks backdrop handles. Generated five local previews: library, recovered elements, recovered sprites, palette and fixed-mask/hotspot overlay. Added catalog/render/verify scripts that only write inside the kit, with Python/Pillow supplied by the existing bundled runtime. DIRECTOR/WORKER gain concise entry links, preserving their policy.

Use repository Markdown rather than a dedicated installed Codex skill: WORKFLOW explicitly recommends it for feature workflows. Artist tool selection states when to read/invoke installed imagegen skill; no imagegen invoked or new generated game art delivered in this ticket. No dependency or plugin installed, board edit, nested delegation, original-installation access, MIDI-bank inclusion, remote upload, merge or publication.

## Chronological log

- Read AGENTS, WORKER, approved task/initial session, WORKFLOW, Split Ridge authoring source/README, proposal metadata and historical browser report. Extracted references strictly from checked-out original-data and images.
- Authored kit, previews, reproducible catalog/render scripts and full-mask verifier. Existing terrain was visually inspected separately from entity/HUD-bearing historical screenshots; supplied source has no baked actors. New previews are explicitly reference overlays/contact sheets, never terrain replacements.
- Visually inspected all five previews. Fixed advanced-bug text overlap and western hotspot-label overlap; inspected resulting sprite and geometry images again. Element roles are visually inferred and labeled as such; palette is actual current custom generator colors. Full source images remain available for native-scale inspection.
- Director temporarily requested parking for TRI-034, then immediately corrected priority to finish TRI-033 before TRI-034; same run/session continued, no duplicate handoff created.
- Required dev test and focused kit verifier passed. Acceptance updated and scoped Review commit prepared.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Catalog generation | pass | `node docs/art-kit/catalog.cjs`: 17 references, 13 sprites, 16 backdrop handles, 25 hotspots |
| Preview generation | pass | bundled Python `docs/art-kit/render.py`: five previews; no runtime writes |
| Kit verification | pass | bundled Python `docs/art-kit/verify.py`: reference SHA-256/path checks, sprite dimensions/provenance, 1024x768 current terrain/mask, all 786432 collision bits matching PNG and terrain.js, readable preview files and local Markdown targets |
| Required existing checks | pass | `node tools/dev.cjs test`, exit 0: syntax/project/breeding/recreation/custom/Split Ridge/Silent Return/vents/music/tooling/director checks |
| Visual artifact inspection | pass | all five local PNGs viewed with image tool; sprite/hotspot label overlaps corrected and final versions re-viewed |
| Diff whitespace | pass | `git diff --check`; normal Windows LF-to-CRLF notices only |
| Live browser playtest | not run / not needed for kit | no runtime/game art changed. Historical screenshots retain TRI-032 partial-smoke limits; no new rendering/audio/playability claim |

Bundled Python executable used: `C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`. Generic python alias was unavailable; no installation attempted. Regeneration needs existing Pillow-capable Python; catalog and gameplay tests need only Node.

## Unresolved issues and risks

No open scope questions. Kit is a self-contained instruction/catalog set in the repository, not a portable bundle of every reference binary; keep checked-out referenced assets with it. Recovered-derived previews remain local references under existing provenance/distribution constraints. Future art needs its own approved ticket/worktree and editable output, visually verified no-baked-entity proof and unchanged-mask evidence. Current historical live screenshot precedes final baseline facet refinement; full Normal completion/audio remain unverified as documented historically.

## Next action / handoff

Director independently reviews `docs/art-kit/README.md`, workflows/prompts, `library.png` and fixed `geometry.png`, then reruns `node docs/art-kit/catalog.cjs` and bundled Python `docs/art-kit/verify.py` to check the baseline. Compare scoped diff: only docs/kit references, no runtime assets. If accepted, squash-integrate per WORKFLOW and record resulting main SHA in director checkpoint; not merged by worker. Present concrete kit before deciding a separate art implementation. User priority then starts TRI-034 custom-mission challenge. This Review implementation is the scoped commit titled `Prepare map art reference kit and bounded artist workflows`; obtain exact SHA with `git log -1 --format=%H` in this checkout.

Director review correction: dispatch wording risked duplicating detailed prompts and violating TRI-022 compact pointer contracts. Director workflow/reusable dispatch now send the existing generated concise worker contract plus one exact filled-brief path; detailed brief/reference links remain in repo. Split Ridge preamble updated consistently. Docs-only correction checked with kit verifier and diff whitespace; broad suite not repeated. Initial implementation SHA: 6fa4332c464fdc9b33024c46753d630963ea2cb8; corrected Review SHA is the commit titled Keep art dispatch compact with a repository brief pointer.
