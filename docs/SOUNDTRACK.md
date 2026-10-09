# Local environment soundtrack (TRI-067)

Controls → Soundtrack offers Auto, all fourteen recovered MIDI tracks and eight new environment compositions. Auto follows each mission's existing `rules.music` assignment. Choosing a track overrides that assignment across restart, difficulty change and mission transition until Auto is selected; reloading the page restores Auto. Tactical mode and dialogs retain the existing independent music lifecycle. Title / Briefing is a selectable theme, not a new automatic screen cue.

## Authored provenance

The eight new compositions were authored during TRI-067 recovery on 2026-10-09 by the Codex implementation worker for this project. The complete deterministic composition source is `tools/compose-soundtrack.cjs`: explicit root pitches, bass progressions, eight-note motifs, General MIDI program choices and local note construction. No downloaded MIDI, audio sample, melody reference, original-game research or third-party track was used. Prior unfinished new note arrays had no durable provenance and mismatched numeric/theme keys; they remain recoverable in local checkpoint `d15c41c` and are not retained as shipped new material. This provenance record makes no legal guarantee and grants no rights over recovered original game material.

| Theme | Root MIDI pitch | Lead program (zero based) | Loop seconds |
| --- | --- | --- | --- |
| Title / Briefing | 72 | 0 | 16 |
| Arctic / Snow | 60 | 88 | 19.2 |
| Maritime / Harbor | 65 | 10 | 16 |
| Capital / Urban | 62 | 62 | 16 |
| Desert | 64 | 104 | 16 |
| Jungle | 67 | 12 | 16 |
| Volcanic | 57 | 81 | 12 |
| Undercity | 59 | 89 | 16 |

`node tools/compose-soundtrack.cjs` replaces only the appended `ROYALTY_FREE_MUSIC` matrix in `assets/audio/music-data.js`, preserving the recovered `ORIGINAL_MUSIC` first line. Do not run original asset recovery for this feature. The recovered first-line SHA256 (UTF-8, no trailing newline) remains `ae55655ab6f14a3fa1c7cb286c84a9af3574ea9be60f9fc48c9e6dae55a93f5c`.

Runtime playback uses the existing local WebAudio scheduler and oscillator fallback. A pre-existing machine-local MIDI bank may supply timbres, but it is not required, redistributed or uploaded. All notes ship locally; playback/composition adds no network calls. The existing original assignments and recovered fourteen tracks remain unchanged.

## API and verification

`TriumphMusic.select(handle)` sets the current mission assignment. `setOverride('auto' | handle)` sets the manual override; `bindSelector(element)` connects the change gesture. `getThemeTrack(theme)` and `getThemeTrackKey(theme)` accept case-insensitive theme aliases. Numeric original handles and their string selector values remain supported; numeric handles 14–21 address the eight new themes. Unknown handles fall back to original track 0, or the local title composition if recovered data is absent. `currentTrack()` exposes the selected handle and `override()` the override mode.

VM checks verify note bounds/order, all original assignments/handles, aliases, actual game startup binding, change callbacks, override persistence and Auto restoration, mute/gesture/scheduler lifecycle, no network API and deterministic source parity without writing production assets. Browser UI evidence is separate in [the TRI-067 playtest](playtests/2026-10-09-tri067-soundtrack.md). Audible musical quality, loop seams, output-device behavior and sample-bank timbre need human listening.
