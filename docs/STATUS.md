# Project status

Updated: 2026-10-04. Latest integrated gameplay tasks: TRI-009 through TRI-017, covering commander selection, attack-move interactions, tactical mode, eagle availability, music independence, closed-door routing, duplicate weapon protection, sixteen-direction plasma cannons and ceiling vent bugs. All passed independent director review and were squash-integrated; integration commits are recorded in BOARD.

TRI-077 current candidate (2026-10-08): Undercity Corner Ambusher1s stationary setup, three rapid0.1s rounds,120px lane,2s reprepare/movement cancellation and assigned-position Guard are complete on `feature/undercity-trooper-roster`, awaiting director Review. Tunnels Breach replaces one existing soldier on every profile, preserving headcount/objectives/maps/enemy budgets. World-only menus, actual support initialization/caps and distinct Units previews/Controls are integrated. Full automated suite passed; [session handoff](journal/2026-10-08-003-undercity-trooper-roster.md) records exact evidence. [Browser inspection](playtests/2026-10-08-corner-ambusher.md) covers Units portrait/text, menus/save persistence, deployment and Harbor exclusion. Controlled live timing/orders/delivery, all-profile human balance, audio and physical-key hardware remain unverified.

TRI-076 Maritime Suppressor/Grenadier was reviewed and integrated at46aebc7. [Recovery handoff](journal/2026-10-08-001-maritime-trooper-roster.md) and [browser evidence](playtests/2026-10-07-maritime-troopers.md) preserve checks and remaining live limitations.

TRI-079 Industrial candidate (2026-10-08): Heavy Riveter2 damage/180px/1.2s/90px/s/75% movement and Arc Technician1 damage/110px/one clear40px jump/1.5s recharge implemented as opt-in roster definitions. No shipped Industrial runtime mission exists; disposable production fixtures cover integration without adding a mission or altering existing scenarios. Distinct Units portraits/Controls, orders, terrain and reinforcement factories/caps are integrated. See [session005](journal/2026-10-08-005-industrial-trooper-roster.md); live evidence/absence is [recorded separately](playtests/2026-10-08-industrial-troopers.md).

## Checkpoints

- `milestone-playable-2026-10-04` preserves eab0bb0: the playable state through rally flags before this maintenance task.
- Local main was advanced to that milestone. `initial-recreation` retains the original development history.
- `chore/development-foundations` introduced project/session instructions, portable commands, verification workflow and initial module extraction; it was fast-forwarded into local main after maintenance review. The branch and milestone history are retained.
- Git origin is configured for imanoliri/triumph-war-2099. The user explicitly authorized publication on 2026-10-04. Reviewed main was pushed successfully through ordinary Git. Repository visibility is unchanged; the ignored Windows MIDI bank is excluded.

## Merge policy

All accepted task branches now squash-merge into main as one commit per task. Earlier fast-forward history and milestone tags are retained; this policy does not rewrite existing history.

## Session context

Chronological session journals use `docs/journal/YYYY-MM-DD-NNN-feature-name.md`, with Berlin dates and daily numbering across features. Each task links its sessions; journals preserve context, verification and the next-action handover. See WORKFLOW.

## Implemented

Nine recovered maps/sprites/audio/MIDI; all four commanders use AI unless explicitly selected, with troop-control default and German physical keys; selection/attack-move/force/focus/use orders, soldier route-side eagle collection and enemy-dependent turret priority; terrain-aware randomized AI; burst fire; commandos/red bugs; tank sweeps; support/respawn; enemy-only barrels; Units manual; visible mission progress; tactical mode with startup freeze and blue-green visor; yellow/bronze/BLITZ rally flags excluding commandos.

Normal baseline correction (TRI-021, integrated): corrected recovered evolution-roll semantics; Normal finite seeded nest breeding and mission-eligible growplant regeneration. TRI-046 subsequently adopts original-mission mixed profiles; the accepted Normal baseline and resource intervals remain preserved. See [current matrix and live limits](design/difficulty-profiles.md). Source animation conversion/RNG correlation and live pressure remain unverified; see [baseline evidence](research/normal-difficulty-baseline.md).

## Verification distinction

Full project/simulation/music/tooling checks passed both in the working checkout and a clean export of tracked source without the local bank. The mocked simulation checks cover all nine missions and recent controls/support behavior. Music checks verify scheduling with mocked audio. The director recorded limited live browser commander selector/toggle UI checks; full AI, attack-move interaction and balance playtests remain unverified. The director checked tactical-mode start/restart visuals, mode button toggling, Controls/Units restoration and a 390×844 viewport; limited live queued movement and mission-selector deployment also passed. Details are in the [limited browser playtest](playtests/2026-10-04-commanders-tactical-mode.md) and tactical-mode session. Audible matching remains unverified. The user's own play reports informed fixes but are not a recorded comprehensive acceptance pass.

The reported mission-not-finishing issue was not reproduced as a universal completion failure. All nine completion fixtures pass; off-map births and carrier wave accounting were corrected. Keep TRI-001 open until the live scenario is reproduced or a full acceptance pass establishes resolution.

## Important gaps

- Source fidelity: no editable original MMF project recovered; event translation remains partial. Grenade travel, hazards, joysticks/gamepads and some support/wave timing are approximate or unfinished.
- Music: original MIDI data is present; sample envelopes/effects/controllers differ. Optional Windows bank is ignored and machine-local.
- Recovery: pipeline targets version 2.3 binary chunk layout. The complete pipeline was rehearsed successfully in an isolated checkout against the installed v2.3 executable; regenerated data matches shipped assets semantically. Ordinary development uses shipped assets.
- Modularization: balance, mission progress and rally helpers are extracted. Combat, orders/input, support integration and most rendering still live in game.js; split gradually under TRI-003.
- Publishing: original asset authorship is preserved; no new asset license is granted. Reviewed main publication was explicitly authorized and completed. Repository visibility remains unchanged; CI/templates are now present remotely.

## Next recommended work

1. Run and record the browser acceptance checklist, especially victory, rally behavior and tactical mode UI.
2. Extract combat/burst logic as one behavior-preserving task.
3. Configure native GitHub Issues/Projects if desired; keep the local board authoritative until migration is approved.

Use BOARD for workflow state, linked task records for scope, and DIRECTOR/WORKFLOW for starting or recovering a worker. Do not use the old conversation as the only source of instructions.

## Director coordination

A thin local ticket board and one isolated implementation worker support director-only user interaction. See DIRECTOR and BOARD. Native GitHub Project [Triumph War 2099](https://github.com/users/imanoliri/projects/6) is active and mirrored from docs/board.json via `node tools/github-project.cjs`. Local board.json remains authoritative.

TRI-012 eagle fix (integrated): deterministic Hanger random bronze creation had no eligible support rule; new random eagle creation now shares collection eligibility. Existing temporarily capped eagles remain with an availability label. All-mission random-eagle collection by commanders and soldiers is regression-covered; the user report of intermittent unpickability in every mission is not fully reproduced, and live eagle-fix playability remains unverified.

TRI-013 tactical-music fix (integrated): gameplay freeze no longer drives music pause, including tactical startup and modal dialogs. Frame integration and existing scheduler/API tests verify independence; actual audible playback remains unverified.

TRI-014 closed-door routing fix (integrated): the reproduced room-wall stall now routes through an unlocked door and opens it before crossing, while actual collision/locked requirements remain. Fields are isolated by stable passability policy and door-state revision. All human-type room fixtures and locked/unlock/destroyed/cache/alien regressions pass; live room-routing playtest remains unverified.

TRI-015 duplicate commander weapons (integrated): matching auto/flame/rapid/plasma pickups remain without score/effects, and AI skips those duplicates. Different equipment and other collectors work as before. VM contact/AI-choice regressions cover the behavior; live collection remains unverified.

TRI-016 plasma cannon directions (integrated): both mounted operator types use 16-direction aim/projectiles, while on-foot infantry/commando rules remain. Direction/boundary/mount/dismount regressions cover the behavior; live cannon rendering/audio remains unverified.


TRI-017 ceiling bugs (integrated): source-backed missions7–9 placement/contact/drop, ordinary ground combat, probabilistic vent return in7/8 and lifecycle completion accounting. Final return debug group remains disabled. Dedicated source/lifecycle and runtime VM regressions cover the behavior. Original native launch timed out then returned access denied; no original gameplay or live vent rendering/audio/full mission completion was observed. Geometry, ballistic conversion and finite animation cadence are explicit approximations in [research notes](research/vent-bugs.md).

TRI-017 browser follow-up: worker in-app tab creation reports "Browser is not available: iab" and browser inventory is empty. No browser vent observations were obtained; [requested smoke scenarios are recorded as not run](playtests/2026-10-04-vent-bugs.md). Independent director source/diff review and full suite passed at7f640ce.


TRI-020 difficulty audit/proposal (integrated research): [source/current report](research/difficulty-audit.md) and [unapproved numeric profiles](research/difficulty-proposal.md) cover all five settings and nine missions. The recovered22–27 third value is a growplant roll ceiling, not source speed. Current nest cadence/AI scaling remain custom; no runtime/assets changed. Native fine collision, source realized throughput and live balance are unverified. Actual values/layouts require user agreement before later bounded implementation.

TRI-025 worker review: Last Convoy implements the approved finite defense schedule and survival/cleanup objective on unchanged Hold Base terrain. VM regression checks cover scheduler/cap/time/restart/loss and original quotas; browser smoke evidence is in `playtests/2026-10-04-custom-last-convoy.md`. Full manual survival/cleanup and audible playback remain unverified.

TRI-032 Review: Relay Breaker now uses custom Split Ridge terrain and exact proposal A placements. Packed mask, 18px wide routes, actual infantry formations, timed carrier unloading/rally and tank outer circuit have focused VM evidence. Browser deployment/render smoke passed; full Normal completion, casualties/time/birth counts and audible audio remain unverified. B/C remain saved unregistered proposals.

TRI-026 Review: Silent Return implements access/laser prerequisites and marked, support-aware living-human extraction on unchanged Flash Back terrain. Focused VM checks execute legitimate unlock, physical outbound/return door use and real air delivery; original mission requirements remain isolated. Browser selector/briefing/tactical terrain and extraction marker smoke passed; full manual completion and audible playback remain unverified.


TRI-036 branch Review: Beneath the Dunes now implements selected Twin Crescent terrain, two disabled2/6HP vehicle targets, full repair plus living110px escort, one-save win/both-loss or irreparable-convoy failure, all-five encounter profiles and map-specific immutable art contract. Original missions and other custom masks remain isolated. Full automated suite passed; actual scripted strategy probes show casualties/stalls/Very-hard defeat and some successful rescues, not calibrated human difficulty. [Partial browser smoke](playtests/2026-10-05-beneath-dunes.md) verifies baseline rendering/repair launch/arc progress; final warning/counter/full human rescue remain unverified. Decorative polish and publication are not part of this branch.

Whiteout Signal (TRI-049) implements newly authored snow terrain, relay rescue/extraction, three finite eagle caches and five pressure profiles. Focused VM checks pass real cache contact/cap feedback/finite carrier delivery, pending-drop rescue reservations, update victory/reward, inbound-support exhaustion and original/other-custom isolation; full-suite outcome is in the latest task journal. Live evidence includes the worker's actual Normal army-loss and independent director ordinary-UI Normal relay activation, party acquisition (3/3) and MISSION COMPLETE (Merits128/Army1); see [playtest record](playtests/2026-10-05-whiteout-signal.md). All-difficulty skilled-player challenge, audio listening and existing TRI-001/002/original/publication gaps remain open.
TRI-050 Harbor Watch candidate: new selectable maritime Navy hold/clear defense with authored water/docks/causeway/sheltered terrain, five finite source/wave profiles and three finite usable reinforcement eagles. Current acceptance, live evidence and review status are in tasks/harbor-watch.md and journal/2026-10-06-003-harbor-watch.md. Single seeded pressure probes are not all-difficulty skilled-player calibration. Worker did not publish this candidate; director integration/publication remains next. Original assets retain authorship and no new license; the ignored Windows MIDI bank remains excluded.

TRI-051 custom reinforcement audit candidate: all six integrated customs retain adequate supply; Beneath the Dunes adds two finite yellow caches on escort approaches. Custom infantry calls retain eagles at full soldier/commando cap including pending landings, and actual carrier/air drops respect reservations. Last Convoy placements/pressure and Silent Return's three timed friendly drops remain unchanged; original support behavior stays isolated. Exact evidence, current review status and browser limits: [task](tasks/custom-mission-reinforcement-eagles.md), [session](journal/2026-10-06-004-custom-mission-reinforcement-eagles.md).


TRI-053 District Twelve is in implementation review: selector, capital terrain, terminals120s hold70s relief, finite five-profile sources, two carrier eagles and immediate noncommander loss. See task/session and playtest for current evidence; skilled-player balance remains uncalibrated. No remote publication or original-asset distribution decision is implied.

TRI-075 Capital roster branch: Shield Trooper and infantry Laser Cannon added with Capital-only support menus, distinct Units/runtime visuals and one-for-one District Twelve replacements. Objectives/headcounts/terrain/enemy source budgets preserved. Scoped production checks and full suite evidence are recorded in [session014](journal/2026-10-07-014-capital-trooper-roster.md); browser inspection in [Capital playtest](playtests/2026-10-07-capital-troopers.md). Combat numbers are initial authored tuning; full human completion, shield break/recharge visual timing and audible playback remain live verification gaps. Awaiting director review/squash integration. Historical District default-AI pressure figures describe its pre-specialist roster.
