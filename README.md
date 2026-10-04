# Triumph! War 2099 — local recreation

Open `index.html` in a desktop browser. All game assets are included locally. Alternatively run `node serve.cjs` and open http://127.0.0.1:2099. The server serves only game files on loopback; it supports no writes or directory listing.

## Current checkpoint

The JavaScript engine is newly written. The original editable Multimedia Fusion project has **not** been recovered. The installed `C:\Games\DarkSunGames\2099_23.exe` supplied:

- 995 original images, including animation directions, frames and hotspots.
- 623 object definitions and placements across 26 frames.
- All nine gameplay map backgrounds and static collision masks.
- The original help text and mission briefings.
- 62 sound effects, converted from Microsoft ADPCM to PCM WAV.
- 14 original MIDI tracks, decoded for offline browser playback.

Original game and assets: Anthony Lopes / DarkSun Games. `assets/provenance.json` records their source. The local Git repository records development. `main` contains the project baseline; the initial playable checkpoint and subsequent improvements are on `initial-recreation`, descended from `main`.

## Playing together

Use the four Commander buttons to select commander 1–4. WASD moves only that commander, holding left-click aims and fires continuously at the weapon’s normal rate, and right-click throws a grenade with the existing cooldown and stock limit. Mouse aim fires directly toward the cursor at any angle, including diagonals; mouse grenades use that direction too. V fires and B selects a keyboard order for the active commander. The four order buttons above the selectors issue Normal, Follow, Attack or Defend to troops near that commander. Computer teammates control 2 and 3 while they are not selected. Physical `KeyboardEvent.code` positions support German QWERTZ.

The remaining legacy keyboard presets support additional players; WASD/V/B follow the selected commander.

| Commander | Movement | Fire | Orders |
| --- | --- | --- | --- |
| 1 | W A S D | V | B |
| 2 | I J K L | Ü (US `[`) | + (US `]`) |
| 3 | Arrow keys | Numpad * | Numpad − |
| 4 | Numpad 8 4 5 6 | Numpad 0 | Numpad 1 |

Commander 4's keyboard preset and computer teammates are additions. Original input options included joysticks; gamepad support remains unfinished.

Press Orders then a direction: Up = Attack, Down = Defend, Right = Follow, Left = Normal. Hold Fire + Orders for grenades, up to eight carried. Regular infantry and AI commanders aim and fire along the four cardinal directions; the selected commander’s mouse aim allows any direction. Bugs spit within a narrow ±11.25° cone around their facing. Aim follows movement. Walk over pickups and evolver plants. Press Fire near terminals and unlocked doors. Regular infantry can collect ground, air, ground support and BLITZ reinforcement eagles by walking over them, triggering the same support calls as commanders. Eagles remain if the call cannot be made. Troops can also collect weapons and occupy plasma cannons; commanders cannot occupy cannons.

Start a left-drag immediately to select infantry, tanks and ground robots; hold still briefly to begin autofire, then move the cursor to aim while firing. Shift-drag always selects troops. A left-click selects one troop; Shift adds troops (Shift-click toggles one). Right-click orders selected troops to attack-move: route toward spaced destination positions, engage visible enemies, then resume travel and hold on arrival. Troops assigned to cannons dismount when ordered. Clicks inside terrain resolve to nearby reachable ground. Selecting a commander button exits troop selection and restores mouse shooting/grenades. Right-click while troops are selected remains attack-move. Nearby commander orders replace mouse destinations.

Enter starts/advances/continues. Escape or Space pauses. F2 restarts. The mission selector supports development comparisons. Commanders return after ten seconds while army units or incoming reinforcements remain. Indoor zipline arrivals and unfinished landing drops count. A brief spawn shield blocks attacks and clears nearby bugs; returning positions resolve to clear ground. If the entire army and all commanders are gone with no reinforcements pending, the mission is lost. Continuing a failed mission costs 100 merits.

## Fidelity gaps and verification

Collision masks now apply backdrop layering, allowing non-obstacle floors to clear earlier rock layers; this fixes Caves previously being entirely blocked. Image-free rectangular quick backdrops also contribute collision.

Map art and sprite pixels are recovered; gameplay remains reconstructed. All 7,172 original event groups are decoded, and a subset is translated into `assets/original-rules.js`: terminal/door dependencies, mission time gates, health for five difficulty levels, enemy limits, difficulty culling markers, final kill targets and crystal extraction requirements.

Random reinforcement eagles, weapon pickups and grenades regenerate from recovered one-second item rolls: Random(100) on Desert Canyon and Random(150) on later missions. Pickup count and troop limits follow the decoded events. Ground/air/tank eagle types use each map’s original object handles. Placement prefers the moving item creator and falls back to open terrain. The original BLITZ random-spawn condition checks a secondary variable fixed at 20 against ≤11; that contradictory condition is preserved, so BLITZ is collectible where placed but does not randomly regenerate.

Support pickups now use source-derived creation rules and original sprites. Outdoor carriers follow recovered paths and drop infantry while stopped. Aircraft pass through the map, strafe, drop troops and bomb. Later maps use five-troop telepad arrivals, ten-second zipline creators and seven-hit ground robots. BLITZ uses the executable's creation list: one carrier, two aircraft and one tank.

Squad AI routes around terrain using shared distance fields, checks line of sight, and opens nearby unlocked doors. Friendly troops react faster than bugs, retain visible targets without repeatedly hesitating, and prefer easier cardinal firing lanes. They fire while aligning, including in Normal and Follow; Defend holds position while shooting. Normal infantry patrols between fights, Attack advances, Follow stays near its leader, and AI commanders 2/3 accompany players 1/4. Bugs see only 175 pixels, focus for 1.5–3.5 seconds then take a 1–3 second break, and choose between approach, wandering and pauses. Their approach uses a briefly remembered, randomized goal rather than continuously tracking a soldier. They turn more slowly and may skip a spit opportunity. Targets behind walls are lost immediately. Patrol headings, pauses, target choices and following offsets vary. Movement, collision details, weapon ranges and some damage, spawn probabilities, scores, telepad functions, chemical hazards and campaign transitions still need comparison. Carrier paths are recovered; their clock conversion uses a compatible 50 Hz model and remains unverified against the original. Aircraft bombing currently resolves directly at the aircraft position; landing animation timing and helper bouncing are approximate. Wave spawn positions, queen offspring and crystal beam duration remain approximate. Sound assignments are partly inferred. Original MIDI notes, tempo changes and sustain now play through samples prepared from this PC’s installed Windows MIDI bank, including program-specific instruments, percussion, tuning and sustain loops. Oscillator synthesis is a fallback when the local bank has not been generated. Envelopes, effects, pitch bend and some controllers still differ from the original synthesizer; exact audible matching is unverified. Difficulty culling uses sprite bounding boxes rather than exact per-pixel overlap.

Local mock-canvas checks pass for all nine mission initialization/drawing paths, movement, directional orders, grenades, assistant ownership, pause, controls, restart and combat simulation. Browser rendering and audio playback remain unverified: the browser tool denied preview permission. Recent original-game launches through the computer tool timed out.

## Development

Enemy spit cooldowns are randomized: Normal 3.8–5.4 seconds (previously 1.5), Easy 4.8–6.4, Very easy 5.5–7.1, Hard 3.2–4.8, Very hard 2.7–4.3. Advanced bugs add 0.4 seconds. These are feedback-driven balance values rather than a claim of recovered original timing.

Music starts after a keypress or Start click, uses the original track assigned to the selected mission, loops, and pauses with the game.

`game.js` is the editable engine. `navigation.js` handles squad routes; `music.js` plays the original performances from `assets/audio/music-data.js`. `assets/original-data.js` contains definitions and placements. `window.triumph.state()` returns a snapshot; `loadMission(1..9)` selects a mission. `command(2, {...})` and `command(3, {...})` accept movement/fire/order/grenade commands lasting up to three seconds. Numeric orders: Normal 0, Follow 1, Attack 2, Defend 3.

Recovery scripts in `tools/` run from this repository directory:

1. `node tools/inspect-original.cjs`
2. `node tools/recover-original.cjs`
3. `python tools/render-recovered.py` (Pillow required)
4. `python tools/build-original-assets.py`
5. `node tools/recover-audio.cjs`
6. `node tools/decode-sounds.cjs`
7. `node tools/enrich-object-data.cjs`
8. `node tools/recover-events.cjs`
9. `node tools/event-report.cjs`
10. `node tools/derive-original-rules.cjs`
11. `node tools/recover-movements.cjs`
12. `node tools/derive-support-rules.cjs`
13. `node tools/build-music.cjs`
14. `python tools/build-windows-midi-bank.py` (Windows local sample bank)
15. `node tools/derive-pickup-rules.cjs`

The generated `assets/audio/gm-bank.js` is local to your Windows installation and excluded from Git. Regenerate it after cloning using step 14; the game falls back to simple synthesis if it is absent. The original MIDI files remain included unchanged. DLS regions, tuning and loop metadata follow Microsoft’s [DirectMusic region documentation](https://learn.microsoft.com/nl-nl/previous-versions/ms808241%28v%3Dmsdn.10%29).

Run `node tools/check-recreation.cjs` for local logic checks and `node tools/check-music.cjs` for MIDI scheduling checks. Intermediates go in ignored `work/`. Observations are saved in `DEVELOPMENT-NOTES.md`.

`research/events.json.gz` preserves the complete decoded event tables for inspection. `research/EVENT-RECOVERY.md` records the rules recovered this pass. Browser play, visual rendering and audible playback remain unverified.

`support.js` implements recovered path following and support-rule selection. `assets/support-rules.js` records each map's pickup creation lists, global-value guards and helper positions. See `research/SUPPORT-RECOVERY.md` for evidence and remaining differences.

## Research

- [Creator's description](https://www.create-games.com/download.asp?id=3185)
- [Original game archive; Multimedia Fusion 1.2](https://kliktopia.org/details/triumphwar2099.html)
- [Walkover developer on the separate abandoned 2142 source](https://steamcommunity.com/app/348700/discussions/0/618456760259146409/)
- [Separate 2142 remake](https://xcompany.itch.io/triumph-war-2142)
- [Anaconda's MMF format readers](https://github.com/Matt-Esch/anaconda/tree/master/mmfparser/data)
- [FFmpeg ADPCM decoder, consulted to confirm the sound format](https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/adpcm.c)

No public download of the original 2099 project source was found in the search so far. That does not establish that none exists.

### Units field manual
Click **Units** below the battlefield for sprite previews, health, damage, firing intervals, defense and behavior for every current unit and structure type. Includes weapon rules and difficulty-dependent bug stats. Opening pauses the game; closing restores its previous pause state. These describe the current recreation.

### Friendly burst fire
Infantry, robots and cannon operators fire randomized 3–6-shot bursts, rest 0.8–1.8 seconds, and take 0.2–0.8 seconds to begin shooting after target acquisition. Tanks fire 9–12-shot bursts, rest 2.5–3.5 seconds, and take 0.4–1.2 seconds to begin. Each unit varies independently. Existing shot intervals apply inside bursts (tank 0.20 s; infantry 0.38 s, Defend 0.20 s, flame 0.18 s). Target loss interrupts a burst; reacquisition adds a delay, and target switches preserve any remaining rest. Commanders and aircraft retain continuous fire. Units shows these rules.

### Specialist units
**Commandos** arrive through blue-eagle aircraft drops and indoor infiltration/zipline drops. They reuse infantry animations with a blue bandana overlay, retain 1 HP and 1 damage, and fire in eight directions. Burst: 5–7 shots at 0.38 s intervals, 0.8–1.2 s rest, 0.2–0.4 s acquisition delay. They support selection, orders, attack-move, pickups, cannons and reinforcement population limits. Flame retains its 0.18 s shot interval.

**Red Krate bugs** reuse ground-bug animations with a red abdomen band. Every newly created ground bug (nest, queen birth/death offspring, wave) independently has a 10% chance to be red. Existing map placements are unchanged. Red bugs have fixed 5 HP, 200 px terrain-blocked sight and 2.6–4.2 s spit cooldown at every difficulty. Damage remains 1, with the existing facing cone and randomized behavior. Growplants turn them into normal queens. Both variants appear in Units.

### Tank sweeping barrage
Tanks fire 9–12 shots at 0.20 s intervals, with 2.5–3.5 s rest and 0.4–1.2 s acquisition delay. At burst start they choose the densest visible bug group within 300 px, with closer groups breaking ties. The sweep spans 25–80° based on angular spread, is locked for that burst and reverses direction next time. Each shot advances evenly across the arc. Without visible bugs, a visible nest can serve as the fallback. Terrain still blocks shots and sight; losing the burst's anchor target interrupts it. Tank HP (8) and damage (5 per hit) stay unchanged.

### Automatic eagle collection and force move
Regular infantry and commandos temporarily seek reachable, usable reinforcement eagles within 250 px when no visible enemy or nest is within their 245 px combat range. One soldier reserves each pickup. Combat pauses the trip; it resumes once clear. After collection (or another unit taking the eagle), they return to their departure position; Follow troops return toward their commander's current position. Existing squad orders are retained. New orders and explicit movement cancel supply trips; cannon operators stay at their guns.

Right-click with troops selected issues attack-move. Double right-click the same destination within 350 ms issues **force move**: troops route around terrain without stopping to shoot, acquire cannons or seek eagles. On arrival they hold position and resume normal behavior. The force-move destination marker is blue. Tank sweeping barrages now use 0.20 s shot intervals and 2.5–3.5 s rest; 9–12 shots and 0.4–1.2 s initial delay remain.

### Focus attacks
Right-click a living bug or nest with troops selected (double-click also works) to assign it as their focus target. Units pursue it through terrain, fire only when in range with clear sight, and keep the order until the target dies or a new player order replaces it. This cancels automatic supply trips. Tanks sweep a minimum 15° arc across the assigned target, retaining their burst/rest timing. A red ring marks the focus target. Double right-click empty ground still force-moves; single right-click on empty ground still attack-moves.

### Reliable reinforcement arrivals
Carriers now stop for at least five seconds, unloading one soldier each second below the troop cap. New troops, tanks and robots resolve their arrival positions to clear ground. Aircraft starting off-map keep their recovered heading when it crosses the battlefield; otherwise they turn toward the map center. This fixes Flash Back's one-soldier carrier stop, stranded off-map tank and horizontal flight above the map.

Static backdrops use their recovered top-left frame coordinates; image hotspots apply only to active sprites. Map backgrounds and collision masks are rebuilt together using this rule. Solid-color quick backdrops are rendered as well as contributing collision.

Explosive barrels/canisters damage enemies only: blasts deal 8 damage to bugs and 12 to nests, while the remaining fire affects bugs. Friendly soldiers, commandos, tanks, robots and commanders are immune to both the blast and its fire. Nearby container chain reactions remain.

Focus input preserves the clicked enemy across a double-click even if it moves. Repeated clicks on the same enemy retain the active burst and reaction timer. Enemy clicks never become force-move; empty-ground double-click retains that command. Firing LOS uses projectile clearance to the target body, separately from walking clearance, so nests along the bottom edge remain attackable. Focus orders approach only when out of weapon range or behind cover.

Tank focus attacks use a 15° sweep centered on the assigned target. Autonomous barrages also have a 25° minimum, widening up to 80° for spread-out groups. Tanks no longer concentrate every focused shot on the exact center.


### Forced interaction orders
With troops selected, double right-click a door, terminal, pickup, cannon, alien flower or crystal objective to send eligible units there and use it. They route around terrain and pause combat and automatic eagle trips until the action finishes. New movement, attack or squad orders cancel the interaction. A cyan marker indicates the order.

Groups operate doors once: closed doors open, open doors close. Locked doors wait for their linked terminal to unlock them. Terminals preserve their recovered door unlocks and objective flags. Pickups, flowers and cannons require infantry or commandos; tanks and robots can operate doors and terminals. Crystal objectives retain mission prerequisites and extraction rules.


### Automatic mission completion
Missions complete automatically when all living bugs and nests are cleared and the mission's wave, terminal, timer and crystal requirements are satisfied. A bottom-right battlefield status lists remaining requirements. New bug births resolve onto clear playable terrain, preventing unseen off-map survivors; carrier kills count toward wave quotas.


### Tactical pause
Space, Escape or Pause freezes the simulation and shows a small banner at the top of the battlefield. You can still select troops and commanders, issue attack-move or force-move orders, assign focus targets, order interactions, and give squad orders with buttons or keyboard. Orders execute when play resumes. Movement, firing, grenades, timers and support arrivals stay frozen. Opening and closing Controls or Units preserves an existing pause.


### Reinforcement rally flags
The **Rally** button sits at the top-right of the battlefield, beside Army/Wave. **R** toggles placement mode. Left-click clear terrain to place numbered flags; right-click a flag to remove it. R, Escape or the button exits the mode. Placement and removal work while paused and do not fire or throw grenades.

New soldiers, tanks and robots from yellow ground, bronze support and Blitzkrieg eagles receive an attack-move order to the nearest reachable flag, using the navigation grid's terrain route distance. Carrier soldiers choose when they unload. Locked doors block routes; unlocked doors can be opened en route. Commandos ignore flags, including those arriving from Blitzkrieg aircraft/infiltration. Units stop to fight along the way and hold near their destination on arrival. Player orders override rally orders. Deleting a flag affects future arrivals; already assigned units keep their destination. Without reachable flags, arrivals retain their usual behavior. Flags and placement mode reset on mission restart/change.
