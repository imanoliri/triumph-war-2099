# All-Worlds Soundtrack Batch (`3C. Soundtrack Batch`)

Style: tactical sci-fi orchestral synth, driving military percussion, crisp retro bassline, 128 BPM

## Target World Tracks

| World / Theme | Key / Root MIDI | Lead Program | Duration (s) | Musical Identity & Motif |
|---|---|---|---|---|
| `<World A>` | `<pitch>` | `<0..127>` | `<sec>` | `<motif & rhythm>` |
| `<World B>` | `<pitch>` | `<0..127>` | `<sec>` | `<motif & rhythm>` |

## Wiring & Provenance Checklist
- `tools/compose-soundtrack.cjs` deterministic composition output matches `assets/audio/music-data.js` (`ROYALTY_FREE_MUSIC`).
- Line 1 of `assets/audio/music-data.js` (`ORIGINAL_MUSIC`) SHA256 preserved (`ae55655ab6f14a3fa1c7cb286c84a9af3574ea9be60f9fc48c9e6dae55a93f5c`).
- `assets/audio/catalog.json` intact (`62` sounds, `14` original music tracks), zero network calls in `music.js` or `tools/compose-soundtrack.cjs`.
- `docs/SOUNDTRACK.md` and `TriumphMusic` aliases synchronized; `node tools/check-music.cjs` passing (audible timbre requires human listening).
