# Architecture

## Runtime and load order

index.html loads recovered asset globals, music.js, navigation.js, support.js, src modules and finally game.js. Files remain classic browser scripts so local index.html and the loopback server both work without a bundler or dependencies.

| File | Responsibility |
| --- | --- |
| game.js | State lifecycle, simulation orchestration, world damage/kill accounting, support adapters, input wiring and rendering adapters |
| src/rendering.js | Per-draw explicit context/state/input/assets/view/services for battlefield, sprites, markers and HUD; no DOM or persistent mission state |
| src/support-lifecycle.js | Explicit-service source eligibility/creation, helper/carrier/air/infiltration and drop lifecycle, scheduled reservations and commander return |
| src/orders.js | Explicit-state troop order issue/step, shared use jobs, focus and attack-move interactions |
| src/input.js | Owned keyboard/selection/commander/pointer/rally state and decisions; modal pause restoration |
| src/input-dom.js | DOM event registration, CSS-to-world pointer normalization and native capture boundary |
| src/combat.js | Explicit-service firing/aiming/lane calculations and unit-owned burst/sweep lifecycle |
| src/projectiles.js | Explicit-state projectile advancement, collision priority, plasma spark lifecycle and owner propagation |
| src/breeding.js | Finite Normal nest opportunities, seeded RNG and birth animation phase with explicit capacity/emission inputs |
| src/balance.js | Custom burst, specialist and sweep tuning; separate from recovered rules |
| src/custom-missions.js | Immutable custom scenario registry, stable IDs and explicit placements; Relay Breaker and Last Convoy |
| src/missions.js | Pure mission progress/automatic completion requirements |
| src/rally.js | Reachable rally destination selection and flag rendering |
| navigation.js | Collision-aware route fields, reachability, destinations and route distance |
| support.js | Recovered path stepping and creation-rule choice |
| music.js | WebAudio scheduling, original MIDI notes, optional sample bank and fallback |
| assets/original-data.js | Images, objects, nine map instances and collision masks |
| assets/original-rules.js | Source difficulty, terminal, door, mission and wave requirements |
| assets/support-rules.js / pickup-rules.js | Source support creation and pickup roll rules |
| serve.cjs | Read-only loopback runtime allowlist |

game.js owns mutable `s` and simulation pause. `TriumphInput.createState` owns held keys, selection, commander mode, drag/click state and rally placement. Extracted modules receive state/callbacks explicitly and do not hold stale state across begin/loadMission. The seeded random generator supports repeatable fixtures.

## Simulation

requestAnimationFrame caps dt at 0.04 s, updates only while playing/unpaused, draws, and refreshes controls. Support/pickup clocks precede unit decisions. Humans prioritize use, focus, force move, attack-move and supply before general squad AI. Combat resolves bullets, melee, nests, props and lingering fire. Dead aliens are filtered; waves, extraction, defeat and victory are checked afterward.

Unit orders and object references are mutable runtime state. Never persist raw live references in handoff documents. window.triumph.state() provides a JSON snapshot; loadMission(1..9) selects a mission; command(2/3,...) controls the assistant's commanders. Simulation fixtures expose internal helpers only in the test VM.

TRI-070 authored defaults live in `window.TriumphBalance.combatAI` in src/balance.js; game.js owns local alarm/listener cooldowns, recruited-target provenance and friendly lane scoring. `tools/check-ai-balance.cjs` compares all affected runtime files to immutable starting commit `f5b627f5c569c122b226ae5e4504b92bb607715b`. Legacy weapon traces disable the named acoustic callback on both sides, and legacy input/support comparisons suppress autonomous acquisition/hearing/pack, because those unrelated AI decisions intentionally change RNG/outcomes. Their immutable source loaders and explicit firing/input/support assertions remain; full recreation and real combat simulations still execute production AI.

## Coordinates and collision

The world is 1024×768; the top 36 px is HUD. Pointer coordinates scale from the canvas CSS size to world coordinates. DOM Rally button overlays the HUD; pointer actions on the canvas use the same scaled coordinates.

Backdrop image positions are top-left; active sprites subtract hx/hy. Static masks are layered with map art; non-obstacle floors clear prior collision. Dynamic doors, breakable walls and fallback rocks add collision. Movement/body clearance, projectile sight and usable-object sight have different endpoint rules; do not combine them casually.

Rally assignment uses grid route distance and allows unlocked doors; walking opens them. Navigation cache revisions include relevant terrain state. A flag's destination is copied into attackMove at spawn, so later deletion cannot silently retarget existing units.

## Build and verification

tools/dev.cjs roots commands at the checkout. tools/package-recreation.py validates assets and packages an explicit runtime allowlist. Asset recovery reads an explicit original executable and writes scratch data under ignored work/. Python image tools use Pillow; runtime and checks need only Node/browser.

tools/check-recreation.cjs creates a mocked DOM/canvas VM, injects fixtures and exercises gameplay. tools/check-music.cjs uses mocked audio nodes. tools/check-project.cjs checks portable project invariants. These cannot establish live rendering, audible synth fidelity or balance feel; PLAYTEST defines those checks.

## Gradual module extraction

The first maintenance step extracts balance, mission progress and rally helpers without changing gameplay. Combat/projectiles and orders/input are now extracted. Support lifecycle and rendering are now extracted. Add/update regression coverage at each boundary; do not combine extraction with new balance changes.

Route fields are cached separately per stable collision callback and revision. Human planning uses an openable-door predicate; actual move/weapon collision and alien planning use solid-door rules. Door revision includes open, locked and destroyed bits so terminal unlocks and destruction invalidate the appropriate fields. Rally collision callbacks are memoized, avoiding a fresh policy identity per selection. Mission begin resets all route contexts.


TRI-017: src/vent-bugs.js receives state and random/collision/spawn/sound callbacks explicitly. s.vents holds one actor per ceiling/drop/jump phase outside normal combat lists; grounded actors transfer into s.aliens. Mission progress counts s.vents separately, avoiding premature victory or duplicate counting. Source extract and conversion limits are recorded in research/vent-bugs.md.

TRI-024: loadCustomMission(id) reuses the existing original terrain/support initializer, then replaces scenario actors and shallow-copies objective rules. Source map identity remains for support eligibility and geometry; custom identity overrides progress, briefing/results, HUD and restart. The nine-entry original list and loadMission(1..9) stay unchanged. An in-memory original/custom merit ledger isolates awards when switching. No persistent saves or custom unlock chain. Loopback and package src allowlists already include the new classic script; project/runtime/syntax checks cover it.

TRI-025: `TriumphMissions.createWaves` owns disposable finite arrival state; `emitWaves` receives state and a spawn callback. Custom progress counts future/queued arrivals separately from living enemies and the minimum-time/survivor gates. Only custom missions initialize this state; source kill-based waves retain their original update path.

Split Ridge is custom-owned under `assets/custom/split-ridge`: authored terrain PNG, matching collision preview and packed mask in terrain.js. `tools/build-split-ridge.py` deterministically rebuilds only these files from native geometry/palette; Pillow is build-only. The custom loader overrides scenery/mask and clears source static props, cannons and doors while retaining the original support/rule template. Original loaders reset that override.

TRI-035: `src/desert-worm.js` owns opt-in custom actor creation, phase stepping, footprint clearance, immutable numerical rules and authored canvas drawing. Runtime `spawnDesertWorm` validates full-body position; it is deliberately unused by current loaders. Actors reside once in `s.aliens` for progress/kill accounting. Runtime passes living human data, blocked/damage callbacks and a navigation step with a stable inflated collision policy; generic alien behavior is bypassed. Exposed-only targeting/projectile guards and shared damage/kill immunity enforce burrow protection. The telegraph contract is documented in DESIGN for future crawler evasion. `tools/worm-preview.cjs` serves only a standalone fixture and module on loopback port 2135; it does not expose campaign routes or modify runtime mission state.

TRI-036: Beneath the Dunes metadata/profile counts and routes live in src/custom-missions.js; its independent packed terrain registry extends the existing registry without altering Split Ridge. game.js constructs mission-only rescue actors and handles runtime win/loss from the shared read-only progress calculation in src/missions.js. src/desert-riders.js consumes explicit rescue/disabled/repaired flags and an escortRange input; other opt-in instances retain prior behavior. tools/build-beneath-dunes.py deterministically authors only this map; art-kit/beneath-dunes contains immutable collision/geometry/hotspot evidence for a separate decorative ticket.

TRI-042: `TriumphCombat.create` receives named rules, RNG, current-state/difficulty/audio getters and visibility, terrain, movement, quantization, desert-pellet and audio services. It owns no world state: bursts/sweeps stay on units, bullets/effects stay on the caller's current mission. The limited `getState:()=>s` getter follows every begin/loadMission replacement; it is not a generic environment proxy. The independent `TriumphProjectiles.step(s,dt,services)` advances backwards through the original bullet list, retains collision priority and appends six plasma sparks without stepping them until the next tick. World damage/kill/score, prop explosions and grenades remain in game.js and are invoked through named services. Human free/cardinal/diagonal aiming, mounted visual/projectile heading separation, tank grouping/focus locks, RNG order and numerical rules are unchanged.

`tools/check-combat.cjs` reads immutable pre-extraction game.js from commit `6a39b420da2b30c9a2f0550b2c95c2e2d93ce2ea` into a disposable VM alongside the post-extraction runtime. Thirty seeded firing sequences compare burst/sweep timers, bullets, units and subsequent RNG consumption; six real mission simulations compare full mutable state and reference aliases. This baseline is test-only, fetched from Git history (CI already fetches full history); it is never loaded by the browser or packaged. Existing independent rule regressions remain authoritative for intended behavior.

TRI-043: `TriumphOrders.create` receives the current mission getter, input selection and named navigation/combat/use services. It owns order replacement, shared use-job identity, focus validation and attack-move execution; supply lifecycle and world interactions remain named caller services. `TriumphInput.create` owns direct commander decisions, physical key presets, click timing/precedence, held mouse fire, rally and modal restore bookkeeping. `src/input-dom.js` converts browser events to point/code records; DOM panels/dialog content and rendering remain in game.js. The input object is retained across mission replacement while reset clears mission-specific references; neither decision module captures a mission state snapshot. Simulation pause stays with the runtime and is accessed through explicit getters/setters.

`tools/check-input.cjs` loads immutable game.js at `a6fed3313515a02bc2ab49e7ab6b380fd3bbe870` with fail-loud single-anchor substitution guards. Four seeded source-mission sequences compare full world state, public snapshots and reference aliases after keyboard/pointer decisions, tactical freeze, commander selection/deselection, physical key release/repeat, focus/use/force precedence, Shift selection, shared use jobs, rally, held free fire, modal restore, blur and mission replacement. Independent expected-behavior assertions ensure covered sequences remain meaningful. This Git-history fixture is test-only and never packaged.

TRI-044: `TriumphSupportLifecycle.create` receives a current-state getter and named source data/path, navigation, RNG, actor creation, rally, world damage/kill, combat and audio services. It initializes only support-owned arrays/helpers/clocks; actors and return timers remain mission-owned. Source pickup-roll generation, custom wave emission, world initialization/damage/kill and mission progress stay outside. Scheduled aircraft retain their distinct in-flight drop reservation rule; ordinary source drops retain their original cap checks and RNG chronology. Runtime wrappers preserve existing callers and test access. `tools/check-support.cjs` compares six seeded full-state/reference-alias sequences to immutable game.js at `1e866aafd06268e6dc47ae3b791b5a2dd2e1dad0`, guarded against missing/duplicate loader anchors. Baseline history is test-only and never packaged.

TRI-045: `TriumphRendering.draw` receives the current mission, input, context, original/background assets, view constants and named rendering/status services on every frame. Sprite lookup receives explicit time, source registry and image loader; image cache/load ownership remains in runtime. Rendering retains the historical invalid-selection Set cleanup, so it is stateless but not a pure function. DOM controls/input remain outside. Original sprite hotspots, direction/frame choice, source/custom overlays, draw ordering and mounted standing suppression are unchanged. `tools/check-rendering.cjs` compares all canvas calls, property assignments, transforms and image source/coordinates with immutable game.js at `23c6cf9f6a427bc6a0c85b63e148a75ffe3df52f`; guarded harness substitutions fail for absent/duplicate anchors. Git-history baseline remains test-only.

TRI-007: src/gamepad.js is a dependency-free standard Gamepad API adapter with explicit services, per-controller button history and one controller/commander ownership. game.js polls before every frame update (also while tactical), writes connection status, and steps analog commander input after existing direct keyboard/mouse input. The adapter gates actions on focus/modal/pause/mode, releases ownership on disconnect or commander/mission changes, and rearms only after neutral input. tools/check-gamepad.cjs uses disposable API/service fixtures; runtime fixtures load the module with no attached pads. Hardware behavior is not established by these fixtures.

Whiteout Signal adds custom terrain through the existing TriumphTerrains mask/image registry and custom mission resolver. Rescue state belongs only to its loaded state (`rescueAcquired`); no original or other custom state fields change. Designated survivors use existing soldiers plus `rescueSurvivor`, with mission-local objective progress. Acquisition reserves cap capacity atomically for three soldiers including pending drops; finite eagle support uses recovered carrier lifecycle. See authored assets/custom/whiteout-signal README and builder.

TRI-050 Harbor Watch reuses the custom mission registry and terrain loader with its own `harbor-defense` identity. Optional mission `nestBudget` creates `birthsRemaining` only on opted-in nests; ordinary/original source state shapes stay unchanged. Runtime decrements on an actual birth, retains due budget at cap and halts at zero. Shared progress reports finite source work and omits exhausted nests from clearance; other custom progress fields are unchanged. Harbor-specific support-cap handling reserves pending drops and checks carrier-backed troop eagles. No combat AI, source data or original support rules change. Editable map builder/export/overlay and frozen mask contracts live under assets/custom/harbor-watch and tools.


TRI-053 District Twelve reuses finite custom nest/wave lifecycle and scheduled aircraft. Custom objective reliefDelivered adds current pending schedule/reinforcement/drop counts to progress only for this mission; HUD and victory share the same pure gate. No new actor module. assets/custom/district-twelve has deterministic editable source, collision/terrain hashes, geometry and all-five runtime contract; originals and other terrain masks remain unchanged.

TRI-071: Units custom soldier portraits use `TriumphRendering.guideSoldier` with recovered infantry object 52 and the existing runtime `variantMark`. The 48px canvas keeps original hotspots and unscaled pixels; game.js owns DOM creation and repaint after image loading. Original guide entries retain their image path. `tools/check-unit-guide.cjs` checks entries and runtime drawing parity.
