# Current gameplay design

This is the current approved recreation design. Recovered source rules live in assets/original-rules.js; custom balance constants live in src/balance.js. DEVELOPMENT-NOTES contains history and superseded values.

## Directional asymmetry

On foot, regular soldiers, robots and AI commanders fire in four cardinal directions. Their AI aligns to firing lanes and only fires when the actual quantized projectile ray overlaps the target within weapon reach and is unobstructed. Pursuers reposition when targets leave the lane; Defend holds and waits for a legal shot. Commandos fire in eight directions. The selected commander's mouse aiming supports arbitrary directions. Bugs spit only along their facing with a ±11.25° cone. This asymmetry is intentional: disciplined infantry wins direct engagements, while bugs use movement and facing differently. Do not make all units omnidirectional as a cleanup.

## Combat values

| Unit | HP | Damage | Burst | Rest | Acquisition delay |
| --- | --- | --- | --- | --- | --- |
| Soldier | 1 | 1 | 3–6 | 0.8–1.8 s | 0.2–0.8 s |
| Commando | 1 | 1 | 5–7 | 0.8–1.2 s | 0.2–0.4 s |
| Robot | 7 | 1 | 3–6 | 0.8–1.8 s | 0.2–0.8 s |
| Tank | 8 | 5 | 9–12 | 3.5–4.5 s | 0.4–1.2 s |
| Commander | 1 | 1 | Continuous player fire | Weapon cooldown | None |
| Normal bug, normal difficulty | 4 | 1 | One spit | 3.8–5.4 s | AI decision timing |
| Queen, normal difficulty | 50 | 1 | One spit | Normal bug + 0.4 s | AI decision timing |
| Red bug | 5 | 1 | One spit | 2.6–4.2 s | AI decision timing |

Normal infantry shot intervals: 0.38 s, Defend 0.20 s, flame 0.18 s. Commandos retain 0.38 s in Defend; flame remains 0.18 s. Tanks use 0.20 s. Their custom 3.5–4.5 s rest runs from the final shot to next-burst eligibility with a continuously valid target; target reacquisition can add delay. Commander normal/plasma interval 0.25 s, flame 0.18 s. Target loss interrupts bursts; target switching preserves rest and adds acquisition delay. Perception adds separate reaction delays. No armor or defense roll exists.

Tank autonomous barrages choose the densest visible bug group within 300 px, sweep 25–80°, lock the arc for that burst and reverse direction next burst. A nest is the fallback. Explicit focus attacks sweep 15° centered on the assigned target. Tank shot volume is twice its original recreation setting (0.16 versus 0.08).

Red bugs have 200 px sight and fixed HP/cooldowns across difficulty settings. Each newly created ground bug independently has a 10% red chance. Placed source bugs remain normal. Red and normal bugs can consume a growplant to become a queen. Commandos have a blue bandana; red bugs a red abdomen band, drawn over source sprites.

## Normal breeding and evolution baseline

Recovered difficulty values use `evolutionRollMax` (22/23/24/25/27); the third value is a growplant item-roll ceiling, not source movement speed. Explicit custom motion multipliers preserve existing movement on all five settings (22/24, 23/24, 1, 25/24, 27/24). Existing AI, health, placements, wave quotas, resources and red-bug policy remain unchanged.

Normal nests independently roll 0–99 every 0.5 simulation seconds, beginning at 0.5 seconds. Rolls 0–3 start a finite birth phase only below the ordinary-bug cap. Busy nests cannot restart; frame9 emits once at 1.8 seconds and the phase finishes at 2.4 seconds. A full cap at emission consumes that birth without deferred retry. Destroyed nests cancel pending births; live nests already count toward completion. Tactical mode freezes the clock; mission restart resets it. The recovered twelve-frame birth animation is displayed during the phase. Independent coordinate-seeded RNG and the 50 Hz animation-speed conversion are explicit approximations, not measured native timing/correlation. TRI-046 extends the same finite lifecycle to all original-mission settings with2/3/4/5/6 successful bins; custom missions retain their own intervals. See [original profile matrix and evidence](design/difficulty-profiles.md).

Normal growplants use the existing one-second item opportunities and source Random(100) in Canyon / Random(150) elsewhere. Only rolls22–24 qualify, with at most three live plants before creation (allowing a fourth). Recovered global15 guards permit missions1–3 and block copied branches in missions4–9; placed Hanger/Caves plants remain. Plants use their source helper/offset when clear, otherwise the existing bounded clear-terrain item placement fallback. They are flowers, never pickup rewards. Commander consumption and ordinary/red bug evolution to a full-health queen remain unchanged. See [verification and fidelity limits](research/normal-difficulty-baseline.md).

## AI and terrain

Friendly troops detect visible targets at 245 px, tanks at 300 px, cannon operators at 360 px. Bugs detect at 175 px, red bugs at 200 px. Walls block sight and projectiles. Walking clearance is separate from projectile visibility, allowing attacks on boundary nests.

Bugs have randomized approach/wander/pause choices (40/35/25%), short remembered movement goals, limited focus and breaks between pursuits. Friendly troops retain visible targets, align to firing lanes and react faster. Normal patrols, Follow tracks the assigned commander, Attack advances, Defend holds nearby. Keep randomness; bugs should not behave as perfect pursuit agents.

Navigation uses a shared 16 px grid and four-neighbor distance fields. Human routes plan through closed unlocked doors, then open them within 45 px before actual movement crosses. Locked doors require their terminal and remain solid to planning and movement; destroyed doors are traversable. Alien routes treat closed doors as solid. Static backdrop placements use top-left coordinates; active sprites use hotspots. Rendered terrain and collision masks must be regenerated together.

## Player orders and tactical mode

Physical KeyboardEvent.code bindings support German QWERTZ. Commander selectors transfer WASD/V/B and mouse control to the selected commander; all four commanders use AI unless explicitly selected. Missions start in troop-control mode. Clicking the selected commander button again or selecting troops deselects direct control; empty selections stay in troop mode. Only the explicitly selected commander responds to physical WASD/V/B, mouse aiming or keyboard orders. Hold left mouse to aim/fire, right mouse to grenade. Immediate drag selects troops; Shift adds/toggles selection.

With troops selected: ground right-click attack-moves; double right-click empty ground force-moves without stopping to fight; enemy right-click focuses attacks (double-click also works). Double right-click usable objects forces travel/use. Groups toggle a door once; locks and terminal flags retain source dependencies. Infantry/commandos collect pickups, consume flowers and occupy cannons. Tanks/robots can operate doors and terminals.

Every mission deploys into tactical mode, including after restart or mission change. The battlefield stays visible within a blue-green tactical visor and prominent banner. Selection, squad orders, movement/focus/use orders remain available and execute on exiting tactical mode. Combat, movement, arrivals and timers freeze. Space/Escape and the Tactical mode button toggle the mode. Controls/Units preserve the prior tactical state.

## Reinforcements and rally flags

Yellow eagles call ground soldiers, bronze support calls tanks or indoor robots, blue calls aircraft/infiltration commandos. BLITZ uses each map's recovered creation list. Outdoor carriers stop at least five seconds, unloading one soldier each second below the population cap. New ground units land on clear terrain; aircraft headings that miss the map turn toward it.

Rally button: top-right beside Army/Wave. Physical R toggles placement, left-click clear ground places numbered flags, right-click a flag removes it, Escape exits before toggling tactical mode. Multiple flags and tactical editing work. Yellow/bronze/BLITZ soldiers, tanks and robots attack-move to the nearest reachable flag by grid route distance. Locked doors block routes; unlocked doors are traversable. Commandos are excluded, including BLITZ. Each arriving unit chooses its destination independently. Player orders override it. Removing flags changes future arrivals; assigned units keep their destinations. Flags reset on restart/mission change.

Infantry/commandos automatically seek reachable usable eagles within 250 px when no enemy/nest is visible within 245 px and no explicit movement/use/focus order is active. Each eagle has one claimant. Combat pauses the trip; afterward the unit resumes and returns to its origin (or current leader for Follow). New player orders cancel it.

Commanders return after ten seconds while live army units or incoming support remain, with a brief shield. An empty army without commanders/support loses. Barrels and lingering barrel fire damage enemies only; all friendly units and commanders are immune.

## Mission completion

All living bugs and nests must be cleared. Additional original requirements are retained:

| Mission | Additional requirement |
| --- | --- |
| Desert Canyon / Desert Rocks / Retake Base | 35 seconds elapsed |
| Flash Back | 35 seconds and laser terminal 257 active |
| Hold Base | 200 normal bug kills; 30 seconds elapsed |
| Hanger | Source completion uses enemy clearance |
| Inside 1st Level | All eight required security terminals active |
| Caves | Required terminal 436 active |
| Crystal Chamber | 150 normal and 50 queen kills; crystal extracted and intact |

The Remaining HUD uses the same progress calculation as automatic victory. Queen death offspring are still enemies. Carrier kills count toward wave quotas. Crystal HP is 7; destruction loses its mission. Final extraction starts after its source-derived terminal/kill trigger, then completion additionally requires the wave quota and clearance. New bug births resolve to clear playable terrain.

## Fidelity and ownership

Original art, maps, audio, MIDI and decoded data came from the user's installed game by Anthony Lopes / DarkSun Games. Editable source was not found. Engine/AI and many timings are reconstructed; current custom balance is not claimed to reproduce all original behavior. Audio uses original notes plus an optional ignored machine-local Windows sample bank; synth envelopes/effects differ.

Attack-moving regular soldiers opportunistically collect usable reinforcement eagles and mount empty plasma turrets within 56 px, at most 24 px from the next terrain-route segment and at most 72 px of reachable route travel. Clear areas prioritize eagles over turrets; visible enemies/nests within 245 px prioritize turrets over combat and defer eagle detours. Mounted soldiers hold the turret until a new movement/use/focus order dismounts them. Occupied cannons render the seated operator only; the ordinary human sprite returns on dismount, with selection feedback retained while mounted. The original attack-move destination survives eagle collection. Force-move, explicit focus/use orders, commandos, robots and tanks retain their existing behavior. Existing eagle-trip claims are respected; occupied turrets are skipped.

Random reinforcement eagle creation uses the same recovered mission/support guards and population eligibility as collection. Hanger bronze support is disabled by its recovered global-15 guard, so random bronze eagles are not created there. Existing eagles rejected by a current direct-troop population cap stay on the map and show TROOPS FULL · WAIT FOR SPACE; collection becomes available again after population drops. A missing applicable mission support case shows SUPPORT UNAVAILABLE. These labels explain rejection without bypassing caps or source guards.

Music continues during tactical mode and Controls/Units dialogs after the browser audio gesture unlock. Gameplay freeze does not change the music pause state; explicit audio API controls and mission track selection remain independent.

Commanders leave weapon pickups matching their current equipment on the map, with no reward, effects or lifetime refresh. Auto is weapon 0 (including default equipment), flame/rapid share weapon 1, plasma is weapon 2. Switching to a different weapon remains normal; commander AI ignores matching weapon pickups while still seeking useful weapons/support. Other units retain existing weapon collection behavior.

Mounted plasma cannons retain 16 equally spaced visual headings (22.5°), independent of whether regular infantry or a commando operates them. Each burst samples a total arc uniformly between 0° and 15°, centered on the target direction when the burst starts. Projectiles smoothly traverse the locked arc in evenly spaced steps; successive bursts alternate clockwise/counterclockwise direction. The visual turret heading rounds each projectile angle to the nearest of its 16 headings. Target death, loss of sight/range, or a new order interrupts the burst. This mounted rule takes precedence over on-foot cardinal/eight-direction rules. Mounting, range, plasma damage and operator burst/cooldown rules are unchanged; dismount restores the operator’s normal on-foot direction rules.


Ceiling / vent bugs use recovered lifecycle events only in missions 7–9. One source shadow starts at (0,0), recovers toward (512,270), crosses terrain and periodically moves/stops or redirects toward commanders/infantry. Contact rolls every0.1s permit drop at rolls0–29 <=10 for commanders and<=20 for Troop; missions8/9 require clear floor. Ceiling, drop and jump actors cannot be targeted or damaged and each counts once toward clearance. Landing creates a normal difficulty-health ground bug. In missions7/8, any ordinary ground bug can ascend on a5% mode roll every2s while ceiling count<=9; ascent gives no kill/score credit. Final-mission ascent remains in its inactive source debug group. Red bugs/queens retain existing custom rules. See [source evidence and explicit geometry/movement/animation approximations](research/vent-bugs.md). Tactical mode freezes the lifecycle.

## Custom scenarios

Desert Rider scout, Dune guard, Field mechanic and 6-HP convoy crawler are custom types used by Beneath the Dunes. Infantry aims and fires in eight directions, with the rendered weapon matching its quantized heading, and keeps shared troop movement/focus/use orders with fixed on-foot kits; scout retreats from nearby visible bugs, guard fires exactly five short-range pellets and mechanic repairs nearby living vehicles. The crawler follows waypoints, counters a locked worm lane once with a terrain-swept 32 px diagonal on both axes, and places at most four finite enemy-only mines behind it. Blocked or late counters remain vulnerable. See [explicit tuning, limits, collision and visual provenance](design/desert-riders.md).

Original and Custom selector groups are separate. Relay Breaker (assault, `custom-rocks-relay`) uses purpose-built Split Ridge terrain with four commanders, eight soldiers, six ordinary bugs and four nests (two original custom eastern pockets plus north/south approach nests). Activate north relay (800,200) and south relay (800,560), in either order, then clear all living nests and ground/transition enemies. Relay instance keys remain stable and independent despite sharing sprite 257. There is no minimum-time gate; finite flank arrivals must finish before clearance. Yellow support (224,576), bronze support (576,600) and plasma (352,176) are explicit; random pickups and growplants are disabled only here. Desert Rocks remains the rules/support template; source support eligibility/caps remain; every difficulty uses an explicit custom nest interval. Wide northern/southern approaches and the eastern connector support infantry formations and the tank outer circuit. Saved B Relay Basin and C Switchback Mesa remain unregistered concepts.

Custom awards stay in memory separately from original merits. Enter after a custom win/loss retries that scenario; F2, Restart and difficulty changes reset its actors and relay flags. Custom victory never advances the original campaign. Tactical start, controls, aim and enemy-only barrel damage are unchanged. Relay Breaker, Last Convoy, Silent Return and Beneath the Dunes are implemented. See [custom mission design](design/custom-missions.md) for coordinates and live acceptance limitations.

Last Convoy (`custom-base-last-convoy`) is a separate defense scenario on unchanged Hold Base terrain/cannons. Four commanders, ten soldiers, one 7-HP robot and four initial bugs use the approved placements. No nests, flowers, vents or random pickups are generated. Scheduled arrivals total 26: six at 20s, eight at 50s and twelve at 80s, queued and emitted at half-second intervals. Ordinary bug-cap pressure retains every arrival and resumes at the next half-second opportunity; large simulation steps consume chronological opportunities without losing or duplicating emissions. Victory requires 120 simulation seconds, all arrivals emitted, enemy cleanup and a living noncommander. Losing the last noncommander defeats immediately even with commanders or support inbound. Tactical mode freezes the schedule; restart resets queue, timer and actors. Source support, caps, cannon narrow-sweep fire, difficulty and original wave kill quotas stay unchanged.

Silent Return (`custom-flash-silent-return`) uses unchanged Flash Back terrain, doors and support rules. Four commanders and four commandos begin at the approved northern placements; six bugs, optional air support (520,648) and plasma (520,520) are explicit. Three reachable nests and finite arrivals pressure the approach and return routes; flowers, vents and random pickups stay disabled. At 20 simulation seconds three friendly aircraft enter from the north with 64-pixel vertical spacing. Their three parallel columns have 48-pixel horizontal center spacing around x520. They drop one standard commando each at (472,328), (520,392), (568,520), then exit south. A capped scheduled plane waits at its exact drop point and retries; pending parachutes reserve infantry slots. The schedule, aircraft and parachutes gate extraction. Access terminal 253 must be used to unlock door 252, which remains physically closed until opened; activate laser 257 inside the room. Victory then requires every currently living ground human within inclusive radius 96 of (392,72), at least one living noncommander, and no unfinished reinforcement or drop actors. Support arrivals join this living-human requirement. Dead/missing commanders need not return; enemies may remain. Ordinary total army/commander/support exhaustion loses, without Last Convoy’s immediate last-noncommander defeat. Tactical freeze, restart and difficulty resets preserve ordinary behavior and clear terminal use/activation. Original Flash Back keeps its 35-second, laser and enemy-clear requirements.

TRI-034 historical retune (superseded for Relay by TRI-037, unchanged for Last Convoy): Relay starts with 6/4 soldiers, no tank eagle, two nests at fixed 3/2.4-second births (first birth after that interval), and 24/48 finite arrivals from the existing six bug hotspots: Hard 12 at35 and12 at80; Very Hard18 at25,18 at60,12 at100. Pending arrivals block victory and appear in Remaining. Last Convoy starts with6/4 soldiers plus the robot, no tank eagle, and80/120 arrivals:16/24 from all four existing approaches at8,30,54,78,100 seconds, emitted at ordinary half-second cadence. Both keep troop support/plasma, HP/damage/AI/caps and objective identity. Original nine scenarios and Split Ridge terrain/mask are unchanged. Counts are pressure tuning; human challenge calibration remains a playtest limitation in the TRI-034 record.

TRI-037 covers Relay Breaker and Silent Return at all five difficulties; Last Convoy profiles remain exactly TRI-034. Relay fixed nest intervals Very easy/Easy/Normal/Hard/Very hard are 7/6/4.5/2.6/2s with 11/14/22/33/44 finite arrivals; 8/8/8/6/4 soldiers start, and easier through Normal retain tank support. Silent intervals are 9/7/5/3.8/3s with 7/10/14/21/28 finite arrivals; four starting commandos and the announced three scheduled commandos remain at every difficulty. Clear all four Relay nests and pending arrivals; Silent extraction permits enemies/nests and future enemy arrivals to remain. Captured before/after metadata and full-runtime scripted tactical encounter evidence live in `design/tri-037-pressure-evidence.json`; scripted losses are stress evidence, not proof of human-achievable difficulty. Terrain/masks, original combat rules and nine original missions stay unchanged.

Ground robot movement (TRI-038 custom balance): multiply the prior recreation movement rates by 1.5 across squad orders, use/focus/attack-move approach, force travel, rally, patrol and firing-lane alignment. Ordinary travel is 54 px/s instead of 36; patrol is 36 instead of 24. Aim callers retain their existing dt fractions. This is an approved custom movement change, not a recovered original-source speed. Other units, robot 7 HP, weapons/projectiles, shot/burst/rest/reaction timing, mounted cannons and support delivery retain their existing rules. Terrain collision and usable-door routing apply at the faster rate.


## Desert charging worm (TRI-035 custom unit)

Custom unit `desert-worm` appears in Beneath the Dunes only; original missions and earlier custom scenarios omit it. Human convoy types use TRI-040 rules. Initial custom balance, not recovered or calibrated: 16 HP, 60 px/s burrow travel, minimum 1 s underground after recovery, 180 px acquisition range, 1.2 s exposed warning, 300 px/s charge up to 260 px, 2 damage per living ground human once per charge, and 1.5 s exposed recovery. Air units and support vehicles outside the human combat list are excluded. Damage respects existing commander shields.

Underground sand ripples are visible but immune and unavailable to human AI/manual focus; projectiles pass through. Shared damage/kill guards also protect against grenades, support explosions, barrels/fire and carrier contact. Warning reveals the body with a gold outline and committed lane. The worm first approaches a stationary diagonal target until its cardinal lane lies within 8 px of the target center and the body can travel to it without wall blockage. It then locks horizontal or vertical direction at warning start, keeps it throughout charge and never tracks later target movement. Sidesteps evade it. Burrow uses existing navigation with an inflated footprint and movement substeps. All phases preserve walls/doors; a blocked charge ends in exposed recovery. No spit, growplant evolution, wall destruction or source changes.

Physical clearance is a 24 px square (radius 12); exposed authored body fits inside it. Charge contact adds target radius (8 px infantry, 17 px tank). Cosmetic sand trail/outline may extend outside the body. Weapon hit radius is 12 px. The `telegraph` object is serializable: `{x,y,dx,dy,range,width,warningRemaining}`. Origin and cardinal direction lock at warning start, range=260 and width=24; countdown decreases only during warning. It persists into charge and clears in recovery. Future evasion consumers should inspect phase plus this contract; no evasion behavior is implemented here.

Visual provenance: `src/desert-worm.js:draw` is newly authored canvas geometry (segmented ochre body, dark mouth/light teeth, gold warning outline/lane and sand ripples). It uses no original sprite, image-generation output or generated asset pipeline. Existing generic alien death sound/effect/accounting remains shared. The Units manual identifies its Beneath the Dunes custom deployment.


## Beneath the Dunes (TRI-036)

Custom `custom-desert-beneath-dunes` uses selected A—Twin Crescent, a new1024×768 terrain/mask with exact approved mesa envelopes; B/C proposals remain saved. Two real6HP crawlers start disabled at2HP. Field mechanics repair at existing0.5HP/s; reaching full6HP permanently unlocks a crawler, so subsequent damage does not disable it again. Disabled crawlers cannot travel or evade and remain vulnerable. A repaired crawler travels its own approved crescent at30px/s only while a living noncrawler ground human is within110px and visible. Worm evasion retains swept17px bodies, diagonal32px axes, four finite mines and no immunity; counters may still occur when an escort has fallen behind.

Saving one living repaired crawler requires completing its entire route and reaching the eastern48px extraction radius at(910,390). Enemies and pending waves may remain. Both crawlers destroyed loses. If all living crawlers still need repair and no living Field mechanic remains, rescue fails explicitly rather than silently stalling. Loss of other troops or one crawler does not itself fail rescue. Four commanders retain standard return behavior while any army remains; crawlers count as army. No special rescue support, infantry surrogate, producing worm nests, random pickups or new ability balance was added. Each HUD status reports repairHP, waypoint stage, absent escort, lost or saved; progress calculation is read-only.

Every difficulty starts four commanders, two scouts, two mechanics and two crawlers. Very easy/Easy/Normal/Hard/Very hard start8/7/6/5/4 guards,1/2/2/3/3 worms and4/5/8/11/14 finite ordinary bug arrivals. First waves begin18/16/14/12/10s at(300,100)/(700,690); second36/32/28/24/20s at(900,570), retaining half-second emission spacing/cap queue. Waves were moved earlier after the initial stationary probe showed late encounters could be bypassed during a clean ~40s rescue. Existing source difficulty/aim/control rules remain separate from these mission-only counts.

The two empty-route module probes finish north29.4s/south35.2s after unlock (0.2s steps), with a deliberately repositioned escort and no enemies; these are route integration proofs, not mission wins. Current actual-runtime default and UI-equivalent troop attack-move strategy results are in [pressure evidence](design/beneath-dunes-pressure.json); [initial timing evidence](design/beneath-dunes-initial-pressure.json) preserves the superseded probe. These do not establish human-calibrated difficulty. [Live smoke and gaps](playtests/2026-10-05-beneath-dunes.md) and [immutable art contract](art-kit/beneath-dunes/contract.md) separate baseline rendering from later decorative polish.

Gamepad controls (TRI-007, custom): standard-mapping browser controllers only. A bumper explicitly claims one controller and cycles living commanders; all other commanders retain AI. Left stick uses a radial .22 dead zone and scaled analog speed; right stick freely aims, RT continuously fires (cardinal when no right-stick aim), LT throws one grenade per press, A interacts, D-pad Up/Down/Left/Right orders Attack/Defend/Normal/Follow, Start toggles tactical mode. Tactical mode permits orders but freezes simulation actions. Disconnect returns owned commander to AI; mouse ownership changes revoke the pad. Selection, pause, modals, focus loss and mission replacement discard held pad intent and require neutral rearming. Keyboard/mouse and existing infantry/enemy asymmetric aiming remain unchanged.

## Whiteout Signal (TRI-049)
New authored Nivalis snow terrain: activate station relay, approach within70px to acquire three designated human soldiers, extract at least one living designated soldier inside western80px pad. Commander/start-army extraction cannot win. Party acquired once and only with three free noncommander population slots including pending landing drops; HUD reports slot shortage. Party loss after acquisition or ordinary total army exhaustion causes defeat; enemies may remain, no timeout. Fixed three yellow troop eagles on north/south/station supply finite carrier arrivals; no random refill. Four nests maintain pressure until destroyed. Five explicit profiles: initial soldiers8/8/7/5/4, fixed nest intervals6/5/3.6/2.5/1.8s, flank budgets27/37/47/61/78. Snow affects visuals/collision only, no freezing or visibility mechanic. Controls/aiming/barrel rules unchanged.

Whiteout troop caches wait at full infantry population (including pending landing drops) with the existing TROOPS FULL / WAIT FOR SPACE feedback; successful carrier calls are finite and unload only while slots are available. Existing original/other-custom support eligibility remains unchanged.

## Harbor Watch (TRI-050)

Custom `custom-maritime-harbor-watch`, Pelagos local Navy defense, uses newly authored harbor terrain. Three docks connect west defense yard to east breakwater; southern causeway is a flank and west yard is sheltered repositioning. Water is blocked. Existing soldiers/robot/bugs/commanders/support are reused; no boat, structure HP, amphibious movement or campaign persistence.

Hold at least120 simulation seconds, exhaust or destroy the four finite nests and emit all finite waves, then clear every living bug/transitioning bug. Empty nests may remain alive. Destroying a nest cancels its unused birth budget. A source birth blocked by cap stays due and retains budget; scheduled waves retain pending entries and drain at existing0.5s cadence after capacity returns. Last noncommander dying is immediate defeat even with a commander/carrier remaining. No timeout or additional survivor quota. Existing Last Convoy contract is unchanged.

| Difficulty | Soldiers + robot | Initial bugs | Nest births each / interval | Finite wave budget | First wave |
| --- | --- | --- | --- | --- | --- |
| Very easy | 10 + 1 | 7 | 4 / 7s | 26 | 24s |
| Easy | 10 + 1 | 7 | 5 / 6s | 37 | 20s |
| Normal | 8 + 1 | 7 | 7 / 4.5s | 48 | 16s |
| Hard | 6 + 1 | 7 | 10 / 3s | 59 | 12s |
| Very hard | 4 + 1 | 7 | 13 / 2.4s | 74 | 10s |

Second/final waves trigger at50/85s. Wave points are dock mouths (440,170),(455,375),(440,585), with causeway (400,680) joining later. Nests are (475,150),(505,355),(475,565),(450,675). They engage existing short-range combat/patrol without changing AI. Seven initial bugs and profile totals are finite maxima; nest destruction reduces actual births. Stronger difficulty keeps source HP/combat conventions and increases source/wave work while reducing defenders.

Three finite yellow troop eagles at(150,205),(150,540),(300,680) invoke recovered carrier support and never refill. Full infantry cap including pending drops retains the pickup and shows TROOPS FULL / WAIT FOR SPACE. Ordinary AI may collect caches. Supply counts in balance; carrier soldiers land through existing reachable-clear-ground correction. Army exhaustion is stricter than recoverable ordinary campaigns. Plasma is available at(180,460).

`design/harbor-pressure.json` records one seeded default-AI full-runtime120s probe: Normal69kills/Army19/four remaining bugs, Hard91/Army10/seven bugs, Very hard103/Army1/27bugs. Easier settings clear bugs but still respect hold. Default AI may gather eagles, so army counts include reinforcements. This measures engaged pressure/casualties, not skilled-player difficulty or completion. A remote eastern first draft produced little contact and cap congestion; final near-mouth placements correct this without combat changes. Dedicated VM lifecycle tests cover cap-deferred births/waves, cleanup/destruction/hold/loss, routes and all three real carrier deliveries. Browser evidence remains distinct in the Harbor playtest record.

TRI-051 custom reinforcement audit: Relay Breaker retains one yellow and, through Normal, one bronze eagle; Last Convoy retains the same supplies/profile placements and pressure. Silent Return retains its optional blue eagle (520,648), reachable along the access-terminal approach through already-unlocked door244 without using terminal253 first, and its three timed friendly commandos. Beneath the Dunes adds two finite yellow eagles at(250,230) and(330,590) on north/south escort routes. Whiteout Signal and Harbor Watch each retain three yellow caches. No mission refills these pickups. Custom support producing infantry retains the eagle and shows TROOPS FULL · WAIT FOR SPACE when living soldiers/commandos plus pending landing drops fill the existing cap. Carrier/ordinary-air/infiltration drops respect those reservations; Silent scheduled formation remains unchanged. Specialist riders/crawlers/robots/tanks keep their existing exclusion from the infantry support cap. Dunes commanders collect eagles; arriving ordinary soldiers can escort, never repair. Original support eligibility/delivery remains unchanged.


## District Twelve (TRI-053)

Crown local Metropolitan Guard mission `custom-capital-district-twelve` uses authored streets, west connected guard rooms, east plaza and north/south transit approaches. Activate terminals at(880,170)/(880,600), hold120s, wait for the once-only70s north-entering existing-aircraft relief (three commandos at210/258/306,385) and all support landings, then clear bugs, finite waves and unspent live nest budgets. Empty nests may remain. Destroying a nest cancels its remaining births. Army loss (last living noncommander) fails immediately, even with relief inbound; no timeout.

| Difficulty | Soldiers + robot | Nest births each / interval | Wave budget | First wave |
| --- | --- | --- | --- | --- |
| Very easy | 10 + 1 | 4 / 7s | 26 | 24s |
| Easy | 10 + 1 | 5 / 6s | 36 | 20s |
| Normal | 8 + 1 | 7 / 4.5s | 46 | 16s |
| Hard | 6 + 1 | 10 / 3s | 62 | 12s |
| Very hard | 4 + 1 | 13 / 2.4s | 78 | 10s |

Four commanders and six initial bugs at all settings. Second/final waves50/85s. Two finite yellow eagles at(150,170)/(150,600) invoke actual recovered carrier unloads; no refill and full infantry cap retains pickup. Scheduled aircraft wait at cap and reserve pending landing slots through the existing lifecycle. Plasma at(210,385). No civilian/new-unit/faction/campaign/rooftop/destruction/environmental mechanic. Controls, asymmetric aim, sprite hotspots and enemy-only barrel damage remain unchanged. Pressure evidence in design/district-pressure.json is a seeded default-AI120s encounter including autonomous supply gathering, separate from human calibration and fixture objective proof.

TRI-053 seeded120s default-AI results: Very easy41kills/army22/7bugs, Easy55/21/6, Normal59/21/21, Hard52/10/50 (56of62 waves emitted), Very hard57/13/49 (48of78 emitted). All nest birth budgets exhausted. Hard settings reached the50-bug cap and retained finite wave backlog, which continues gating cleanup. Counts include autonomous eagle collection and timed relief. These probes establish substantial contact and finite pressure, not monotonic kill counts, human difficulty or guaranteed objective completion.
