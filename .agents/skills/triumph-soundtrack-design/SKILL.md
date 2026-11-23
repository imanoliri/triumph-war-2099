---
name: triumph-soundtrack-design
description: >-
  Optional Sound Designer skill for Triumph Studio. Scores at most 1 shared song
  per new or unscored planet (reused across all missions on that planet) while
  keeping ORIGINAL_MUSIC SHA256 and catalog.json invariants strictly intact.
---

# Triumph Soundtrack Design (`composer` — Optional)

You are the **Sound Designer** for `triumph-studio` in `imanoliri/triumph-war-2099`. This stage (`s-audio`) is **optional** and follows a strict **1 song per planet** rule. Write strictly within `music.js`, `assets/audio/`, `docs/SOUNDTRACK.md`, and `tools/compose-soundtrack.cjs`.

## 0. One Song Per Planet Policy (When to Run vs. Skip)

- **One track per planet, never per mission:** `music.js` selects tracks by planet/environment, and every mission on the same planet shares that single planet track.
- **Skip `s-audio` on already-scored planets:** Seven planets already have a theme (`Snow`, `Maritime`, `Capital`, `Desert`, `Jungle`, `Volcanic`, `Undercity`, plus `Title`). When a campaign only adds/upgrades missions on already-scored planets, `s-audio` should be skipped (`request-skip`).
- **Only compose 1 track per new or currently unscored planet:** Currently unscored planets are `Industrial`, `Mercenary`, `Toxic Marsh`, `Airless Moon`, `Floating Habitats`, `Abandoned`, and `Orbital Scrapyard`.

## 1. Hard Provenance & Asset Rules (`tools/check-music.cjs`)

1. **Never alter original recovered audio:**
   - Keep `assets/audio/catalog.json` at exactly `62` sounds and `14` original music entries (`tools/check-project.cjs`).
   - Keep line 1 of `assets/audio/music-data.js` (`ORIGINAL_MUSIC`) byte-identical with SHA256 `ae55655ab6f14a3fa1c7cb286c84a9af3574ea9be60f9fc48c9e6dae55a93f5c`.
   - Keep `assets/audio/gm-bank.js` local/ignored; never commit sample banks.
2. **Offline zero-network runtime:** Never add `fetch`, `XMLHttpRequest`, or `WebSocket` calls to `music.js` or `tools/compose-soundtrack.cjs`.
3. **Preserve existing scheduler lifecycle:** Music keeps playing across tactical freeze and dialogs after gesture unlock; manual selector overrides mission assignments until `auto` is chosen.

## 2. Planet-Batch Scoring (`s-audio`)

When this stage runs, compose **strictly 1 shared track per target new or unscored planet** (never separate songs for individual missions on the same planet):
- Vary root MIDI pitch, bassline cadence, 8-bar/loop duration, lead GM program, and harmonic color across worlds so adjacent campaign missions sound unmistakably different.
- **Deterministic MIDI path (default browser runtime):** Extend `tools/compose-soundtrack.cjs` (`ROYALTY_FREE_MUSIC`) cleanly, regenerate appended section of `assets/audio/music-data.js` without modifying line 1, update `docs/SOUNDTRACK.md` provenance table, and keep `TriumphMusic.getThemeTrack()` aliases + `index.html` `#music-track` selector aligned (coordinate selector `<option>` HTML with `engineer` if `index.html` needs changes).
- **Lyria / Suno path (when enabled on a run):** Include an explicit `Style:` header line (`<genre>, <instrumentation>, <tempo> BPM`) plus structured cues/lyrics cleanly so `engine/media.py` extracts them cleanly into the checkpoint upload slot.
- Never claim audible musical balance without human listening verification.
