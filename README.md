# Triumph! War 2099 — local recreation

Open `index.html` in a desktop browser. All game assets are included locally. Alternatively run `node serve.cjs` and open http://127.0.0.1:2099. The server serves only game files on loopback; it supports no writes or directory listing.

## Current checkpoint

The JavaScript engine is newly written. The original editable Multimedia Fusion project has **not** been recovered. The installed `C:\Games\DarkSunGames\2099_23.exe` supplied:

- 995 original images, including animation directions, frames and hotspots.
- 623 object definitions and placements across 26 frames.
- All nine gameplay map backgrounds and static collision masks.
- The original help text and mission briefings.
- 62 sound effects, converted from Microsoft ADPCM to PCM WAV.
- 14 MIDI tracks, preserved as files. Music playback is unfinished.

Original game and assets: Anthony Lopes / DarkSun Games. `assets/provenance.json` records their source. The local Git repository records development.

## Playing together

You control commanders 1 and 4. Computer teammates control 2 and 3 by default. Turn that off in Controls for manual four-player keyboard play. Physical `KeyboardEvent.code` positions support German QWERTZ.

| Commander | Movement | Fire | Orders |
| --- | --- | --- | --- |
| 1 | W A S D | V | B |
| 2 | I J K L | Ü (US `[`) | + (US `]`) |
| 3 | Arrow keys | Numpad * | Numpad − |
| 4 | Numpad 8 4 5 6 | Numpad 0 | Numpad 1 |

Commander 4's keyboard preset and computer teammates are additions. Original input options included joysticks; gamepad support remains unfinished.

Press Orders then a direction: Up = Attack, Down = Defend, Right = Follow, Left = Normal. Hold Fire + Orders for grenades, up to eight carried. Aim follows movement. Walk over pickups and evolver plants. Press Fire near terminals and unlocked doors. Troops can collect weapons and occupy plasma cannons; commanders cannot occupy cannons.

Enter starts/advances/continues. Escape or Space pauses. F2 restarts. The mission selector supports development comparisons. Commanders return after ten seconds while a non-player troop survives. Continuing a failed mission costs 100 merits.

## Fidelity gaps and verification

Map art and sprite pixels are recovered; gameplay remains reconstructed. Original event tables have not been translated. Door/terminal dependencies, difficulty gates, spawn timing, AI, weapon ranges, damage, scores, transport arrivals, air support, telepads, chemical hazards and campaign transitions need comparison. Reinforcements currently appear directly. Final waves and crystal behavior are approximations. Sound assignments are inferred from sample names and help text. MIDI playback remains pending.

Local mock-canvas checks pass for all nine mission initialization/drawing paths, movement, directional orders, grenades, assistant ownership, pause, controls, restart and combat simulation. Browser rendering and audio playback remain unverified: the browser tool denied preview permission. Recent original-game launches through the computer tool timed out.

## Development

`game.js` is the editable engine. `assets/original-data.js` contains definitions and placements. `window.triumph.state()` returns a snapshot; `loadMission(1..9)` selects a mission. `command(2, {...})` and `command(3, {...})` accept movement/fire/order/grenade commands lasting up to three seconds. Numeric orders: Normal 0, Follow 1, Attack 2, Defend 3.

Recovery scripts in `tools/` run from this repository directory:

1. `node tools/inspect-original.cjs`
2. `node tools/recover-original.cjs`
3. `python tools/render-recovered.py` (Pillow required)
4. `python tools/build-original-assets.py`
5. `node tools/recover-audio.cjs`
6. `node tools/decode-sounds.cjs`

Run `node tools/check-recreation.cjs` for local logic checks. Intermediates go in ignored `work/`. Observations are saved in `DEVELOPMENT-NOTES.md`.

## Research

- [Creator's description](https://www.create-games.com/download.asp?id=3185)
- [Original game archive; Multimedia Fusion 1.2](https://kliktopia.org/details/triumphwar2099.html)
- [Walkover developer on the separate abandoned 2142 source](https://steamcommunity.com/app/348700/discussions/0/618456760259146409/)
- [Separate 2142 remake](https://xcompany.itch.io/triumph-war-2142)
- [Anaconda's MMF format readers](https://github.com/Matt-Esch/anaconda/tree/master/mmfparser/data)
- [FFmpeg ADPCM decoder, consulted to confirm the sound format](https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/adpcm.c)

No public download of the original 2099 project source was found in the search so far. That does not establish that none exists.
