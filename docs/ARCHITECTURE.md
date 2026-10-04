# Architecture

## Runtime and load order

index.html loads recovered asset globals, music.js, navigation.js, support.js, src modules and finally game.js. Files remain classic browser scripts so local index.html and the loopback server both work without a bundler or dependencies.

| File | Responsibility |
| --- | --- |
| game.js | State lifecycle, simulation orchestration, combat, support integration, input and main drawing |
| src/balance.js | Custom burst, specialist and sweep tuning; separate from recovered rules |
| src/missions.js | Pure mission progress/automatic completion requirements |
| src/rally.js | Reachable rally destination selection and flag rendering |
| navigation.js | Collision-aware route fields, reachability, destinations and route distance |
| support.js | Recovered path stepping and creation-rule choice |
| music.js | WebAudio scheduling, original MIDI notes, optional sample bank and fallback |
| assets/original-data.js | Images, objects, nine map instances and collision masks |
| assets/original-rules.js | Source difficulty, terminal, door, mission and wave requirements |
| assets/support-rules.js / pickup-rules.js | Source support creation and pickup roll rules |
| serve.cjs | Read-only loopback runtime allowlist |

game.js owns mutable `s`, unit selection, rally placement state and input. Extracted modules receive state/callbacks explicitly and do not hold stale state across begin/loadMission. The seeded random generator supports repeatable fixtures.

## Simulation

requestAnimationFrame caps dt at 0.04 s, updates only while playing/unpaused, draws, and refreshes controls. Support/pickup clocks precede unit decisions. Humans prioritize use, focus, force move, attack-move and supply before general squad AI. Combat resolves bullets, melee, nests, props and lingering fire. Dead aliens are filtered; waves, extraction, defeat and victory are checked afterward.

Unit orders and object references are mutable runtime state. Never persist raw live references in handoff documents. window.triumph.state() provides a JSON snapshot; loadMission(1..9) selects a mission; command(2/3,...) controls the assistant's commanders. Simulation fixtures expose internal helpers only in the test VM.

## Coordinates and collision

The world is 1024×768; the top 36 px is HUD. Pointer coordinates scale from the canvas CSS size to world coordinates. DOM Rally button overlays the HUD; pointer actions on the canvas use the same scaled coordinates.

Backdrop image positions are top-left; active sprites subtract hx/hy. Static masks are layered with map art; non-obstacle floors clear prior collision. Dynamic doors, breakable walls and fallback rocks add collision. Movement/body clearance, projectile sight and usable-object sight have different endpoint rules; do not combine them casually.

Rally assignment uses grid route distance and allows unlocked doors; walking opens them. Navigation cache revisions include relevant terrain state. A flag's destination is copied into attackMove at spawn, so later deletion cannot silently retarget existing units.

## Build and verification

tools/dev.cjs roots commands at the checkout. tools/package-recreation.py validates assets and packages an explicit runtime allowlist. Asset recovery reads an explicit original executable and writes scratch data under ignored work/. Python image tools use Pillow; runtime and checks need only Node/browser.

tools/check-recreation.cjs creates a mocked DOM/canvas VM, injects fixtures and exercises gameplay. tools/check-music.cjs uses mocked audio nodes. tools/check-project.cjs checks portable project invariants. These cannot establish live rendering, audible synth fidelity or balance feel; PLAYTEST defines those checks.

## Gradual module extraction

The first maintenance step extracts balance, mission progress and rally helpers without changing gameplay. game.js still contains combat, input/support orchestration and most rendering. Next extract combat/burst functions with explicit callbacks, then orders/input, support lifecycle and rendering as separate behavior-preserving tasks. Add/update regression coverage at each boundary; do not combine extraction with new balance changes.

Route fields are cached separately per stable collision callback and revision. Human planning uses an openable-door predicate; actual move/weapon collision and alien planning use solid-door rules. Door revision includes open, locked and destroyed bits so terminal unlocks and destruction invalidate the appropriate fields. Rally collision callbacks are memoized, avoiding a fresh policy identity per selection. Mission begin resets all route contexts.


TRI-017: src/vent-bugs.js receives state and random/collision/spawn/sound callbacks explicitly. s.vents holds one actor per ceiling/drop/jump phase outside normal combat lists; grounded actors transfer into s.aliens. Mission progress counts s.vents separately, avoiding premature victory or duplicate counting. Source extract and conversion limits are recorded in research/vent-bugs.md.
