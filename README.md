# Triumph — reconstruction

Open `index.html` in a current desktop browser. No installation, server, network connection, or external assets are needed.

This is a playable reconstruction foundation, written from scratch after researching Triumph! War 2099 and reading its in-game instructions. It is **not recovered original source**. The nine mission layouts, pixel drawings, audio, AI, and balance are approximations and need comparison against the original. The original title, art, music, and level data have not been extracted.

Implemented: four commanders, two optional computer teammates, allied infantry, tanks, air support, alien nests and spawning, evolver plants, weapon pickups, grenades, squad orders, terminal-operated gates, shared survival through remaining non-player troops, ten-second respawn, merits and continuation, nine editable reconstructed scenarios, pause, and keyboard presets.

You control 1 and 4. Computer teammates control 2 and 3 by default; switch that off in Controls to play with four people. German keyboard inputs use `KeyboardEvent.code`, which refers to physical key position. See the Controls dialog for the corresponding German labels. Gamepad support has not yet been reconstructed.

Space: pause. Enter: start/advance/continue. Fire + order: grenade. Order key cycles Normal / Follow / Attack / Defend. Shoot an orange terminal to unlock a nearby gate. Movement direction sets aim.

`game.js` contains the complete editable engine and mission definitions. `window.triumph.state()` returns a readable current game snapshot; `window.triumph.command(2, {...})` and `command(3, {...})` accept short movement/fire/order/grenade instructions for an assistant. This is an added feature to make shared play easier, not a feature of the original.

Research:
- Creator's description: https://www.create-games.com/download.asp?id=3185
- Original game archive (Multimedia Fusion 1.2): https://kliktopia.org/details/triumphwar2099.html
- Walkover developer says they obtained DarkSun's abandoned 2142 source: https://steamcommunity.com/app/348700/discussions/0/618456760259146409/
- Separate remake: https://xcompany.itch.io/triumph-war-2142

No public download of the original 2099 project source was found in this search. This does not establish that none exists. The local original executable is a compiled game, not an editable project.
