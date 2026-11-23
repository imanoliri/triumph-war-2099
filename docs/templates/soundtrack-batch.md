# Planet Soundtrack Batch (`3C. Soundtrack Batch` — Optional, 1 Song Per Planet)

Style: tactical sci-fi orchestral synth, driving military percussion, crisp retro bassline, 128 BPM

- **Policy:** Optional (`skip` `s-audio` if all campaign planets already have themes: `Snow`, `Maritime`, `Capital`, `Desert`, `Jungle`, `Volcanic`, `Undercity`). Compose strictly **1 shared song per new or unscored planet** — all missions on the same planet reuse its single planet track.

## Target Planets (1 Song Each)

| Planet | Key / Root MIDI | Lead Program | Duration (s) | Shared Across Missions & Motif |
|---|---|---|---|---|
| `<Planet A>` | `<pitch>` | `<0..127>` | `<sec>` | `<missions sharing track + motif>` |
| `<Planet B>` | `<pitch>` | `<0..127>` | `<sec>` | `<missions sharing track + motif>` |

## Wiring & Provenance Checklist
- `tools/compose-soundtrack.cjs` deterministic composition output matches `assets/audio/music-data.js` (`ROYALTY_FREE_MUSIC`).
- Line 1 of `assets/audio/music-data.js` (`ORIGINAL_MUSIC`) SHA256 preserved (`ae55655ab6f14a3fa1c7cb286c84a9af3574ea9be60f9fc48c9e6dae55a93f5c`).
- `assets/audio/catalog.json` intact (`62` sounds, `14` original music tracks), zero network calls in `music.js` or `tools/compose-soundtrack.cjs`.
- `docs/SOUNDTRACK.md` and `TriumphMusic` aliases synchronized; `node tools/check-music.cjs` passing (audible timbre requires human listening).
