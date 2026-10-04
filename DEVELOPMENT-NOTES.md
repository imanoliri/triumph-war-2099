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

## 2026-10-03 — source support arrivals

- Recovered 19 native movement paths and bouncing-ball parameters. MMF 1.2 uses fixed 14-byte path steps here; the newer documented variable-size format failed boundary validation, so the reader was corrected from the actual bytes.
- Replaced instant support with recovered per-map creation lists, guard conditions, offsets, sounds and helper positions. Carriers approach, pause, drop infantry once per second, then leave. Aircraft make passes, fire, bomb and create animated troop drops. Indoor air calls ten-second zipline creators; later indoor ground calls create five troops at a telepad-selected spawner. Indoor ground support uses seven-hit robots.
- BLITZ now follows the executable's one-carrier/two-aircraft/one-tank list. This differs from the help text's description of two reinforcements.
- Added transport-supported respawn, pending-arrival survival, carrier spit blocking and moving-carrier bug destruction. Full survival counter semantics remain pending.
- Passing fixtures cover carrier lifecycle, aircraft pass/drop, indoor delivery, zipline expiration, robots, BLITZ counts and carrier-backed respawn, together with all previous checks.
- Compatibility timing uses 50 Hz movement and pause conversion based on Anaconda's player implementation: https://github.com/Matt-Esch/anaconda/blob/master/mmfparser/player/movements/path.py and https://github.com/Matt-Esch/anaconda/blob/master/mmfparser/player/movements/common.pyx . Live timing remains unverified.
- Remaining differences are documented in `research/SUPPORT-RECOVERY.md`: approximate bomb/drop timing and helper movement, unresolved (0,0) prototypes, exact survival counters, robot AI, hazards/telepads, MIDI, original UI, score/campaign flow, and live comparison.

## 2026-10-04 — music, terrain and aiming feedback

- User reported missing music, terrain-unaware AI and unrestricted aiming. Added offline scheduling of all 14 original MIDI performances, preserving tempo maps, note timing, programs and sustain. Mission tracks come from decoded original events. Browser oscillator instruments approximate Windows General MIDI; pitch bend, percussion and some controllers remain gaps. Playback starts on a user gesture and loops; pause suspends its audio clock.
- Added shared four-neighbour distance fields at 16-pixel spacing, radius clearance and line-of-sight sampling. AI can route around long walls and open nearby unlocked doors. Fields invalidate on mission/door/wall changes. Tight corridors and moving-unit congestion remain unverified.
- Infantry/commanders fire only in four cardinal directions, without diagonal flame spread. AI aligns onto firing lanes and avoids firing through terrain. Bugs preserve their facing and may spit only within ±11.25 degrees; this angle is an approximation requested as a small cone.
- Existing nine-mission logic suite passes, plus cardinal bullets, facing-constrained spit and a long-wall route fixture. Audible playback and browser rendering remain unverified because browser access was denied.
- GitHub connector identifies account imanoliri but has no repository-creation operation. Browser creation at github.com/new was denied by the browser security policy; no alternate browser route was attempted.

- MIDI checks pass for all 14 decoded tracks, every mission track assignment, user-gesture start, oscillator scheduling, pause/resume and track switching.
- Git branch layout prepared: minimal main baseline; all five development commits rebased onto it on initial-recreation. Original local history is retained under local-history-before-github. GitHub creation remains blocked pending an empty private repository URL.

## 2026-10-04 — lower firing rate, less direct AI and Windows MIDI instruments

- User reports excessive enemy firing, over-direct/over-smart AI, walls not being perceived and different music sound. Original MIDI files were unchanged; the oscillator-only instrument implementation caused a major timbre mismatch.
- Normal alien cooldown is now 3.8–5.4 seconds with per-shot variation, vs 1.5 seconds. Initial cooldown is 2–5 seconds; five difficulty values and a +0.4 second advanced-bug offset are documented. These are requested balancing adjustments, not source-derived exact timing.
- Units acquire only visible enemies within bounded ranges. Random scan/reaction timing and randomized nearby target choice replace continuous omniscient nearest-target selection. Targets disappear immediately when blocked by walls or doors. Patrols vary headings, pauses and durations. Normal infantry wanders; Attack advances; Follow/Defend retain their purpose. AI commanders accompany players instead of automatically completing hidden objectives and instantly dodging every projectile.
- Prepared 495 PCM samples and 137 instrument definitions (including 128 melodic programs and percussion banks) from installed C:/Windows/System32/drivers/gm.dls. Samples, region key ranges, tuning, gain and loop points now drive local music playback. Generated bank stays outside Git and is reproducible with tools/build-windows-midi-bank.py. Original MIDI performances and mission assignment remain the same. Exact Windows synthesis envelopes/reverb/controllers remain gaps.
- Nine-mission suite, wall-limited perception, delayed acquisition, immediate wall target loss, randomized cooldown ranges, music scheduler and Windows sample/loop integrity checks pass. Actual listening and live browser play remain unverified due prior tool permissions.

## 2026-10-04 — mouse troop selection and attack move

- Added left-pointer drag rectangle, click selection, Shift additive selection/click toggle, selection rings and selected count. Coordinates scale from the displayed canvas to the original 1024x768 battlefield. Pointer capture handles drags outside the canvas; cancellation/blur/reset clears an active drag. Commanders remain under keyboard/assistant controls.
- Right-click issues spaced attack-move destinations to selected infantry/tanks/robots. They engage visible enemies within 160 pixels, resume navigation after combat and hold on arrival. Cannon occupants dismount. Ground-blocked destinations resolve to nearby reachable cells. Commander orders replace attack-move orders. Mission resets clear selection.
- Logic tests pass for scaled mouse coordinates, drag/click/Shift selection, commander exclusion, formation spacing, long-wall routing, blocked destination resolution, cannon dismount, combat interruption/resumption and holding on arrival. Live mouse play and rendering remain unverified due browser permissions.

## 2026-10-04 — random reinforcement pickups and commander return

- User reports reinforcement eagles stopped appearing and commanders not returning. The engine disabled legacy random spawning for original maps but had no replacement for the decoded item-creator events. Added tools/derive-pickup-rules.cjs and assets/pickup-rules.js. Each original map rolls every second, using Random(100) on frame 5 and Random(150) later, native item handles, variable checks and count/troop limits. Ground, air, ground support, guns and grenades regenerate. Placement uses moving helper positions with open-terrain fallback. Original BLITZ random condition is contradictory (secondary variable 20, required <=11) and remains disabled rather than inventing its intended probability.
- Validation exposed Caves collision mask being entirely solid: the builder accumulated obstacles over a full rock backdrop without clearing its later floor overlays. Backdrops now overwrite collision in drawing order; opaque non-obstacle floors carve out passages. Image-free rectangular quick backdrops also contribute masks. Caves now has about 24.5 percent blocked pixels. Art, objects, placements, movement metadata and original image pixels are unchanged. Provenance fields are preserved when rebuilding.
- Respawn timers now count down independently from support eligibility. Incoming indoor zipline creators and unfinished landing drops count as support, as well as existing army and outdoor carriers/aircraft. Respawning commanders receive clear-ground positioning and temporary protection, approximating the original shield’s 2-frame/15-repeat animation at 50 Hz as 0.6 seconds. It intercepts spit/melee and damages overlapping bugs. HUD shows when reinforcements are needed. A complete army wipe without incoming support still loses the mission.
- Logic checks pass for all nine maps: random pickup types, ground pickup cap, terrain placement, time-based generation, all four commanders returning after ten seconds, temporary protection/expiry and pending indoor arrival eligibility. Caves regression check confirms traversable floor. Live play remains unverified due prior browser permissions.

## 2026-10-04 — infantry reinforcement eagle pickup

- User requested regular soldiers be able to collect reinforcement eagles. Expanded infantry contact pickups to ground reinforcement, aerial reinforcement, ground support and BLITZ, using the existing support creation rules, sound and single-use removal. Rejected calls leave the pickup available. This is a requested extension of the original commander-only collection events.
- Logic checks pass for all four eagle types on outdoor and indoor maps, confirming troop-triggered support, one activation per eagle and preserving a ground eagle when the infantry cap prevents its use. The full nine-map regression suite also passes. Live play remains unverified.

## 2026-10-04 — commander selection and mouse weapons

- User requested four commander selectors and four order buttons above them, with WASD and mouse weapons for the chosen commander. Added two rows below the battlefield: Normal/Follow/Attack/Defend above Commander 1/2/3/4, active highlights and mode guidance.
- WASD and V/B follow the selected commander. Selecting commanders 2/3 temporarily overrides their teammate AI; unselected commander 1 no longer duplicates WASD/fire input. Mouse clicking aims and fires in the nearest cardinal direction, and right-click throws a grenade with existing cooldown/count limits. A selection ring identifies the controlled commander. Dead commanders cannot fire; order buttons disable when unavailable.
- Troop drag selection and right-click attack-move remain available. Dragging/selecting troops switches mouse to troop mode; clicking a commander selector clears that selection and returns to mouse firing/grenades. Mouse short-clicks on empty ground fire; drag gestures do not.
- Checks pass for every selector, exclusive WASD ownership, selected-shot owner/direction, mouse grenades and cooldown, all four order buttons, canvas pointer actions, troop-mode switching and dead commander input. Full gameplay regression suite passes. Live UI appearance/input remains unverified due browser permissions.

## 2026-10-04 — diagonal mouse aiming

- User requested diagonal mouse shooting. Selected commanders now aim/fire toward the exact cursor angle, with a scoped fire override so regular infantry and AI keep their cardinal aiming rule. Mouse grenades use the same direction; V fire also follows an active mouse aim. Original sprite animations still choose the nearest available facing.
- Logic checks pass for diagonal shots in all four quadrants, a non-45-degree cursor direction, mouse grenade direction and existing cardinal infantry behavior. Live play remains unverified.

## 2026-10-04 — held mouse autofire

- User requested continuous mouse firing. Holding left mouse in commander mode now repeats shots at the existing weapon cooldown, and continues aiming as the cursor moves, including diagonals. Release, cancellation, commander switch, death, blur, pause and opening Controls clear the held gesture. A brief stationary hold starts autofire; immediate drags still select troops, and Shift-drag always selects. Quick clicks retain single shots.
- Checks pass for repeated shots, normal weapon rate, moving aim, release/cancel stopping and drag/Shift selection without shots. Full gameplay suite passes; live mouse play remains unverified.

## 2026-10-04 — active friendly combat and less persistent bugs

- User says friendly infantry does not actively fire while bugs seek/fire too intelligently. Found friendly Normal/Follow aim alignment was disabled (zero movement time) and fire required perfect lane alignment, leaving them staring at diagonal targets. All friendly orders now fire toward the nearest cardinal direction while targets are visible; Normal/Follow/Attack adjust into lanes. Defend still holds. Human acquisition delay is shorter, scans are more frequent, easier lanes are preferred and unchanged targets no longer incur a new hesitation every scan. Infantry sees 245 pixels.
- Bugs now see at most 175 pixels, acquire/react more slowly, focus for only 1.5–3.5 seconds then wander for 1–3 seconds, and keep randomized goals briefly rather than constantly retargeting movement. Intent selection is 40 percent approach, 35 percent wander and 25 percent pause; near-target turning is limited to 1 radian/second. Spit opportunities can be skipped with 50 percent probability, in addition to existing randomized cooldown and facing/line-of-sight requirements. These are requested balance choices, not claimed recovered original AI.
- Logic checks pass for active friendly shots under every order, Normal/Follow lane adjustment, faster friendly acquisition, bounded bug attention/sight, all randomized intent modes and no firing through walls. Full gameplay regression suite passes. Real combat balance/feel remains for user play feedback; live agent play remains unverified due browser permissions.

## 2026-10-04 — Unit field manual and shooting doctrine
- User explicitly retained cardinal friendly shooting versus directional bug spit as asymmetric design; no omnidirectional infantry change was made.
- Added Units button and responsive, scrollable modal with 16 entries: commanders, infantry, tanks, robots, bugs, queens, nests, growplants, carriers, aircraft, cannons, crystal, containers, walls, doors and terminals. Original sprite thumbnails accompany entries.
- Shows HP, per-hit damage, cooldown/rate, behavior and defense; weapon notes cover flame/plasma, spark damage, travel ranges, grenades, explosions, fire and friendly-fire rules. No armor or defense roll exists in the current engine. Support vehicles have no damageable health pool.
- Bug/queen health and nest spawn intervals reflect the mission difficulty snapshot; bug firing intervals use the same difficulty base table as combat. Explains health at mission start versus immediately changed firing difficulty.
- Opening clears held input and pauses; close/Escape restores the prior pause state. Keyboard gameplay input is blocked in the modal.
- node --check game.js and tools/check-recreation.cjs passed, including unit-guide content/pause/input checks and existing cardinal-fire/cone tests. Live browser layout remains unverified.
