# Triumph! War 2099 — play notes

## Shared controls
- User controls soldiers 1 and 4. Assistant controls soldiers 2 and 3.
- User has a German keyboard: verify actual bindings, especially Y/Z and punctuation.
- User will remain in the game; follow the observed screen without requiring chat replies.

## Confirmed setup
- Game executable: C:\Games\DarkSunGames\2099_23.exe
- Title screen identifies version 2.3.
- Window title: TRIUMPH (war 2221).
- Screen capture became black after menu interactions/minimizing. Bindings and reliable gameplay input are not yet confirmed.

## Research
- Creator describes up to four commanders, nine missions, reinforcements, power-ups, and recovering the Plasma Cannon Energy Crystal.
- Source: https://www.create-games.com/download.asp?id=3185
- Gameplay review describes Attack, Defend, Follow, Normal orders and an army counter that reaches game over at zero.
- Source: https://mangoesdontplayvideogames.blogspot.com/2010/10/game-review-triumph-war-2099-action.html

## Session log
- Waiting to observe the controls screen that the user is opening.

## In-game instructions observed
- Commanders can collect reinforcements and grenades, crush evolver plants, operate doors and computer terminals, and give troop commands.
- Objective: destroy enemies and eggs, plus mission-specific tasks.
- Respawn occurs after 10 seconds if at least one non-player troop remains; default weapon and current grenades are retained as described by the game.
- Failed missions cost 100 merits to continue.
- Controls menu offers WASD with V/B; IJKL with [/]; arrow keys with */-; Joystick 1; Joystick 2.
- These are selectable input presets, not yet confirmed assignments for P2/P3. P1 appeared selected with WASD highlighted.
- Screen capture now successfully shows Options/instructions.

## Recreation research and implementation
- User prefers the original look and gameplay as closely as possible.
- Public source download for 2099 was not found in this search; absence is not proven.
- Kliktopia identifies the original as Multimedia Fusion 1.2 (build 98), and lists a compiled executable download: https://kliktopia.org/details/triumphwar2099.html
- Walkover developer states that DarkSun supplied source and permission for its abandoned 2142 project: https://steamcommunity.com/app/348700/discussions/0/618456760259146409/
- Separate 2142 remake offers an EXE: https://xcompany.itch.io/triumph-war-2142
- Created outputs/triumph-recreation with an original JavaScript engine, four commanders, optional computer teammates 2/3, army survival and respawn, orders, pickups, aliens/nests/plants, grenades, terminal gates, and nine reconstructed scenarios.
- This is a foundation, not a faithful complete restoration: original sprites/music, exact maps, balance, gamepads, and behavior remain unverified or unreconstructed.
- Keyboard presets use physical key codes for German layout compatibility.
- Verification: JavaScript syntax check passed. Logic checks passed for start, movement, squad orders, grenades, assistant ownership restriction, pause/resume, combat simulation, controls dialog, and restart.
- Browser preview was blocked because the browser tool disallows file:// URLs; no workaround attempted. Visual rendering is unverified.
- Packaged initial reconstruction as outputs/triumph-recreation.zip. Open index.html manually in a desktop browser after extracting.

## 2026-10-03 — recovery and Git checkpoint

- Created an active development goal at the user's request. Initialized a local Git repository in `outputs/triumph-recreation`; first commit `341f158`.
- Recovered the installed MMF 1.x image bank: 995 RGB555 images, animation frames/directions/hotspots, and 623 object definitions. Decompression sizes matched and each bank was consumed exactly.
- Recovered all 26 frame records. Gameplay frames are 5, 7, 9, 11, 13, 15, 17, 19 and 21: Desert Canyon, Desert Rocks, Flash back, Retake Base, Hold Base, Hanger, Inside 1st level, Caves and Crystal Chamber.
- Generated original map backgrounds and pixel collision masks from original obstacle backdrops. These replace the first prototype's invented maps and art.
- Recovered original mission briefings and help text. Corrected Orders to directional selection: Up Attack, Down Defend, Right Follow, Left Normal. Fire + Orders throws grenades; capacity is eight. Fire near doors/terminals operates them.
- Corrected ordinary bugs to several hits, queen spawning, commander spawn offsets and default-weapon respawn. Added troop weapon pickup, plasma cannons, breakable walls, barrel chain explosions and plasma impact sparks. Numerical balance is still inferred.
- Recovered 62 sound effects and 14 MIDI tracks. Original sounds use Microsoft ADPCM; converted to 16-bit PCM WAV and integrated named effects. MIDI tracks are preserved but not played yet.
- Added a mission selector, original briefings, German physical-key bindings, F2 restart, Escape pause and local steering for AI around terrain.
- Verification: JavaScript syntax passed. Mock-canvas checks passed for all nine mission initialization/drawing paths, movement, directional order selection, grenades, assistant ownership, pause/resume, combat simulation, controls dialog and restart. This does not verify real browser rendering or audible playback.
- Browser preview at loopback was denied by the browser tool's permission policy; stopped the preview server and did not retry through another browser or computer surface.
- Recent original-game launches through the computer tool timed out. No original game process was running afterward. Side-by-side live play remains unverified.
- Remaining: original event-table translation; exact terminal/door dependencies; difficulty gates; transport and airborne support behavior; telepads/chemical hazards; MIDI playback; numeric balance and campaign transitions; live visual/audio/play comparison.
- Format research: https://github.com/Matt-Esch/anaconda/tree/master/mmfparser/data ; ADPCM confirmation: https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/adpcm.c . Recovery and decoding tools are independently written.

## 2026-10-03 — original event rules

- Decoded all 7,172 event groups in all 26 frames, including every repeated ERev section. Group, condition, action and parameter lengths were validated. Full records are preserved as `research/events.json.gz` inside the recreation repo; readable reports can be generated with `tools/event-report.cjs`.
- Integrated exact terminal-to-door unlock targets, initial door locks and selected alien damage thresholds. Terminal activation now follows the original object's completion flag; unlocking a door does not automatically mark a terminal as a required objective.
- Added original mission time gates: >35 seconds for the first four missions, >30 seconds for Hold Base. Inside 1st level requires eight terminal flags; Caves requires computer area 6, whose y=30 placement was previously filtered out.
- Original egg damage threshold is 50, crystal threshold seven. Difficulty levels 1–5 use ordinary bug thresholds 2/3/4/5/6 and advanced thresholds 20/40/50/65/80. Original movement values 22/23/24/25/27 are used proportionally; conversion remains approximate.
- Final battle counts kills, not a fixed number of spawned enemies: 150 ordinary + 50 advanced. Extraction begins after 150 ordinary + 40 advanced kills and both terminal flags. Victory requires the crystal outside the field. Hold Base counts 200 ordinary kills. Timing and interval gates are recovered; spawn locations are approximate.
- Restored the original 50-alien limit and difficulty culling helper rules. Culling uses bounding boxes; exact pixel overlap remains pending.
- Corrected Fire interactions to fresh key presses, source commander firing/grenade intervals, initial commander creation positions, crystal targeting, and selector synchronization.
- Logic checks passed for terminal dependencies, completion flags, mission timers, cave terminal presence, health and kill targets, plus all prior mission/input checks. Live visual/audio/play comparison remains unverified under the existing browser denial and launch timeout.
- Next work: further event translation for transport arrivals, infiltration, telepads and chemical hazards; MIDI playback; original UI; exact movement/combat/score/campaign behavior; live comparison when access works.
- Added passing fixtures for all five difficulty health values, Hold Base's first spawn after 25 seconds, kill-count progression (spawn count does not satisfy the target), victory after 200 kills, doors staying open while Fire is held, and final victory only after crystal extraction. Fixtures operate the real JavaScript engine under a mock DOM/canvas; they are not live play evidence.
