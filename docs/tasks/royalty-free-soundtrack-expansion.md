# Expand game soundtrack with copyright-free synth and MIDI tracks

- Ticket: TRI-067; state in [local board](../BOARD.md).
- Branch: `feature/royalty-free-soundtrack-expansion`

## Goal and user-visible outcome

Expand the game soundtrack matrix with copyright-free synth and MIDI track options integrated into `window.TriumphMusic` for campaign missions and custom scenario music selection without copyright risk or external network dependencies.

## Acceptance criteria

- [x] Integrate royalty-free MIDI/audio tracks into window.TriumphMusic selector matrix for campaign scenarios and UI selector without copyright issues or external network dependency.
- [x] Automated unit test / regression checks pass via `node tools/dev.cjs test`.

## Scope and decisions

- Soundtrack matrix in `assets/audio/music-data.js` & root `music.js`:
  - Royalty-free synth and MIDI track selections mapped to environment themes (Arctic/Snow, Maritime/Harbor, Capital/Urban, Desert, Jungle, Volcanic, Undercity, Title/Briefing).
  - Purely local offline data structure (embedded base64 / decoded MIDI track data), zero external network calls.
  - UI track selector dropdown in music controls allowing manual track switching.
  - Full backward compatibility with existing original campaign track assignments.

## Sessions

- [2026-10-07-007-royalty-free-soundtrack-expansion.md](../journal/2026-10-07-007-royalty-free-soundtrack-expansion.md)

## Recovery authority and limits
Prior sequential execution and preserved checkout recovery remain authorized. The actual runtime music entry is root music.js (the older scope path src/music.js was inaccurate). Preserve all three unfinished files and original campaign assignments; inspect provenance before retaining new music. Compose original local material or use explicitly licensed local sources with recorded attribution; no original-game research, asset distribution, ignored Windows MIDI bank upload, external network dependency or publication. Record actual audio/browser evidence and absence separately. Recovery worker owns final implementation, relevant selector/offline/backcompat regressions, full suite and new chronological handoff; stops at Review. Director preserved stale untracked proposal in scratch/royalty-free-soundtrack-expansion-pre-recovery-2026-10-09.md before canonicalizing this task.

- [2026-10-09 / 002](../journal/2026-10-09-002-royalty-free-soundtrack-expansion.md)

## Recovery implementation decisions

- Eight deterministic newly authored local compositions are retained; provenance/source and recovered-data separation are in [SOUNDTRACK](../SOUNDTRACK.md). Unproven prior new arrays remain preserved in checkpoint d15c41c.
- Auto keeps all existing mission assignments; manual selections persist through restart/difficulty/mission changes until Auto. Page reload restores Auto. Title/Briefing is selectable, without new automatic screen cues.
- Exact recovery run/evidence and Review handoff belong to the latest linked session. Audible quality/seams/output devices await human listening; bounded browser selector evidence is recorded separately.

Implementation is ready for **Review**, with human listening limitation recorded in the latest session and playtest. No merge or publication performed.
