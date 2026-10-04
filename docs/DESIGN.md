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
| Tank | 8 | 5 | 9–12 | 2.5–3.5 s | 0.4–1.2 s |
| Commander | 1 | 1 | Continuous player fire | Weapon cooldown | None |
| Normal bug, normal difficulty | 4 | 1 | One spit | 3.8–5.4 s | AI decision timing |
| Queen, normal difficulty | 50 | 1 | One spit | Normal bug + 0.4 s | AI decision timing |
| Red bug | 5 | 1 | One spit | 2.6–4.2 s | AI decision timing |

Normal infantry shot intervals: 0.38 s, Defend 0.20 s, flame 0.18 s. Commandos retain 0.38 s in Defend; flame remains 0.18 s. Tanks use 0.20 s. Commander normal/plasma interval 0.25 s, flame 0.18 s. Target loss interrupts bursts; target switching preserves rest and adds acquisition delay. Perception adds separate reaction delays. No armor or defense roll exists.

Tank autonomous barrages choose the densest visible bug group within 300 px, sweep 25–80°, lock the arc for that burst and reverse direction next burst. A nest is the fallback. Explicit focus attacks sweep 15° centered on the assigned target. Tank shot volume is twice its original recreation setting (0.16 versus 0.08).

Red bugs have 200 px sight and fixed HP/cooldowns across difficulty settings. Each newly created ground bug independently has a 10% red chance. Placed source bugs remain normal. Red and normal bugs can consume a growplant to become a queen. Commandos have a blue bandana; red bugs a red abdomen band, drawn over source sprites.

## Normal breeding and evolution baseline

Recovered difficulty values use `evolutionRollMax` (22/23/24/25/27); the third value is a growplant item-roll ceiling, not source movement speed. Explicit custom motion multipliers preserve existing movement on all five settings (22/24, 23/24, 1, 25/24, 27/24). Existing AI, health, placements, wave quotas, resources and red-bug policy remain unchanged.

Normal nests independently roll 0–99 every 0.5 simulation seconds, beginning at 0.5 seconds. Rolls 0–3 start a finite birth phase only below the ordinary-bug cap. Busy nests cannot restart; frame9 emits once at 1.8 seconds and the phase finishes at 2.4 seconds. A full cap at emission consumes that birth without deferred retry. Destroyed nests cancel pending births; live nests already count toward completion. Tactical mode freezes the clock; mission restart resets it. The recovered twelve-frame birth animation is displayed during the phase. Independent coordinate-seeded RNG and the 50 Hz animation-speed conversion are explicit approximations, not measured native timing/correlation. Other settings retain their prior 2–9 second initial delay and custom 5–9 second recurring timers divided by the preserved multiplier.

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

Attack-moving regular soldiers opportunistically collect usable reinforcement eagles and mount empty plasma turrets within 56 px, at most 24 px from the next terrain-route segment and at most 72 px of reachable route travel. Clear areas prioritize eagles over turrets; visible enemies/nests within 245 px prioritize turrets over combat and defer eagle detours. Mounted soldiers hold the turret until a new movement/use/focus order dismounts them. The original attack-move destination survives eagle collection. Force-move, explicit focus/use orders, commandos, robots and tanks retain their existing behavior. Existing eagle-trip claims are respected; occupied turrets are skipped.

Random reinforcement eagle creation uses the same recovered mission/support guards and population eligibility as collection. Hanger bronze support is disabled by its recovered global-15 guard, so random bronze eagles are not created there. Existing eagles rejected by a current direct-troop population cap stay on the map and show TROOPS FULL · WAIT FOR SPACE; collection becomes available again after population drops. A missing applicable mission support case shows SUPPORT UNAVAILABLE. These labels explain rejection without bypassing caps or source guards.

Music continues during tactical mode and Controls/Units dialogs after the browser audio gesture unlock. Gameplay freeze does not change the music pause state; explicit audio API controls and mission track selection remain independent.

Commanders leave weapon pickups matching their current equipment on the map, with no reward, effects or lifetime refresh. Auto is weapon 0 (including default equipment), flame/rapid share weapon 1, plasma is weapon 2. Switching to a different weapon remains normal; commander AI ignores matching weapon pickups while still seeking useful weapons/support. Other units retain existing weapon collection behavior.

Mounted plasma cannons retain 16 equally spaced visual headings (22.5°), independent of whether regular infantry or a commando operates them. Each burst samples a total arc uniformly between 0° and 15°, centered on the target direction when the burst starts. Projectiles smoothly traverse the locked arc in evenly spaced steps; successive bursts alternate clockwise/counterclockwise direction. The visual turret heading rounds each projectile angle to the nearest of its 16 headings. Target death, loss of sight/range, or a new order interrupts the burst. This mounted rule takes precedence over on-foot cardinal/eight-direction rules. Mounting, range, plasma damage and operator burst/cooldown rules are unchanged; dismount restores the operator’s normal on-foot direction rules.


Ceiling / vent bugs use recovered lifecycle events only in missions 7–9. One source shadow starts at (0,0), recovers toward (512,270), crosses terrain and periodically moves/stops or redirects toward commanders/infantry. Contact rolls every0.1s permit drop at rolls0–29 <=10 for commanders and<=20 for Troop; missions8/9 require clear floor. Ceiling, drop and jump actors cannot be targeted or damaged and each counts once toward clearance. Landing creates a normal difficulty-health ground bug. In missions7/8, any ordinary ground bug can ascend on a5% mode roll every2s while ceiling count<=9; ascent gives no kill/score credit. Final-mission ascent remains in its inactive source debug group. Red bugs/queens retain existing custom rules. See [source evidence and explicit geometry/movement/animation approximations](research/vent-bugs.md). Tactical mode freezes the lifecycle.

## Custom scenarios

Original and Custom selector groups are separate. Relay Breaker (assault, `custom-rocks-relay`) uses purpose-built Split Ridge terrain with four commanders, eight soldiers, six ordinary bugs and two nests. Activate north relay (800,200) and south relay (800,560), in either order, then clear all living nests and ground/transition enemies. Relay instance keys remain stable and independent despite sharing sprite 257. There is no minimum-time gate or wave. Yellow support (224,576), bronze support (576,600) and plasma (352,176) are explicit; random pickups and growplants are disabled only here. Desert Rocks remains the rules/support template; source eligibility, caps and difficulty/nest lifecycle apply unchanged. Wide northern/southern approaches and the eastern connector support infantry formations and the tank outer circuit. Saved B Relay Basin and C Switchback Mesa remain unregistered concepts.

Custom awards stay in memory separately from original merits. Enter after a custom win/loss retries that scenario; F2, Restart and difficulty changes reset its actors and relay flags. Custom victory never advances the original campaign. Tactical start, controls, aim and enemy-only barrel damage are unchanged. Relay Breaker, Last Convoy and Silent Return are implemented. See [custom mission design](design/custom-missions.md) for coordinates and live acceptance limitations.

Last Convoy (`custom-base-last-convoy`) is a separate defense scenario on unchanged Hold Base terrain/cannons. Four commanders, ten soldiers, one 7-HP robot and four initial bugs use the approved placements. No nests, flowers, vents or random pickups are generated. Scheduled arrivals total 26: six at 20s, eight at 50s and twelve at 80s, queued and emitted at half-second intervals. Ordinary bug-cap pressure retains every arrival and resumes at the next half-second opportunity; large simulation steps consume chronological opportunities without losing or duplicating emissions. Victory requires 120 simulation seconds, all arrivals emitted, enemy cleanup and a living noncommander. Losing the last noncommander defeats immediately even with commanders or support inbound. Tactical mode freezes the schedule; restart resets queue, timer and actors. Source support, caps, cannon narrow-sweep fire, difficulty and original wave kill quotas stay unchanged.

Silent Return (`custom-flash-silent-return`) uses unchanged Flash Back terrain, doors and support rules. Four commanders and four commandos begin at the approved northern placements; six bugs, optional air support (520,648) and plasma (520,520) are explicit. No nests, flowers, waves, vents or random pickups occur. Access terminal 253 must be used to unlock door 252, which remains physically closed until opened; activate laser 257 inside the room. Victory then requires every currently living ground human within inclusive radius 96 of (392,72), at least one living noncommander, and no unfinished reinforcement or drop actors. Support arrivals join this living-human requirement. Dead/missing commanders need not return; enemies may remain. Ordinary total army/commander/support exhaustion loses, without Last Convoy’s immediate last-noncommander defeat. Tactical freeze, restart and difficulty resets preserve ordinary behavior and clear terminal use/activation. Original Flash Back keeps its 35-second, laser and enemy-clear requirements.

TRI-034 Hard/Very Hard custom profiles: base data above remains Normal/easier baseline. Relay starts with 6/4 soldiers, no tank eagle, two nests at fixed 3/2.4-second births (first birth after that interval), and 24/48 finite arrivals from the existing six bug hotspots: Hard 12 at35 and12 at80; Very Hard18 at25,18 at60,12 at100. Pending arrivals block victory and appear in Remaining. Last Convoy starts with6/4 soldiers plus the robot, no tank eagle, and80/120 arrivals:16/24 from all four existing approaches at8,30,54,78,100 seconds, emitted at ordinary half-second cadence. Both keep troop support/plasma, HP/damage/AI/caps and objective identity. Original nine scenarios and Split Ridge terrain/mask are unchanged. Counts are pressure tuning; human challenge calibration remains a playtest limitation in the TRI-034 record.
