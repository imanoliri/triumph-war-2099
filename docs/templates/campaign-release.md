# Campaign Release & Playtest Handoff (`5. PR, Board & Playtest Handoff`)

## Repository Sync Checklist
- [ ] `docs/board.json` & `docs/BOARD.md` updated (`node tools/board.cjs render`)
- [ ] `docs/STATUS.md` & `docs/DESIGN.md` synchronized with shipped behavior
- [ ] Chronological handoff added under `docs/journal/YYYY-MM-DD-NNN-<slug>.md`
- [ ] `node tools/dev.cjs test` verified passing on integrated branch (`exit 0`)

## Honest Verification Split
- **Automated VM / Static Evidence:** `<exact commands and results>`
- **Unverified Live Browser & Audio Scope (Playtest Checklist):**
  Run `node serve.cjs` and inspect `http://127.0.0.1:2099` for:
  1. Visual clarity, contrast, and HUD legibility across all new/updated worlds
  2. Live enemy telegraphs, specialist aiming, German QWERTZ keys, and difficulty pacing
  3. Audible soundtrack mix, loop transitions, and tactical-mode music continuity

## Publication & Project Mirror
- Clean 1-commit squash PR ready for operator review
- Mirror command after integration: `node tools/github-project.cjs` (GitHub Project `#6`)
