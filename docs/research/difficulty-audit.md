# Difficulty audit: original evidence and current recreation

TRI-020, 2026-10-04. Research/proposal only; gameplay and asset files are unchanged. Baseline commit cdfb41908ed4720e81a6eeef3088e92ea4527e70. Original game: C:/Games/DarkSunGames/2099_23.exe, Anthony Lopes / DarkSun Games. This audit reads existing recovered data; it does not modify the installation or regenerate assets.

The original changes bug/queen destruction thresholds, removes different placed nests using helper flags, and changes a growplant item-roll ceiling. It does **not** use that third value as enemy speed. Current health values largely match, but nest throughput, speed scaling, AI firing and several combat/resource rules are reconstructed/custom. Easy sometimes retains more nests than Normal. A five-label menu alone does not provide an ordered challenge curve.

## Evidence and reproducibility

[Diagnostic results](../../research/difficulty-audit.json) record all 45 mission/setting initializations, nest instance IDs, source coordinates/cull subsets, current resources and a controlled current-pressure probe. [Diagnostic tool](../../tools/audit-difficulty.cjs) reuses the established disposable VM scaffolding, reads shipped source assets/events, and writes only the requested research report. Run:

~~~text
node tools/audit-difficulty.cjs research/difficulty-audit.json
node tools/dev.cjs test
~~~

Primary evidence: research/events.json.gz (all 26 recovered frames), assets/original-data.js (objects/maps/images/movements), assets/original-rules.js, support-rules.js and pickup-rules.js. Exact offsets below refer to each frame's event chunk, not absolute executable addresses. A source geometry count means source on-field centers plus recovered helper bounding-box overlap. It is not a claim of native fine-pixel collision equivalence. The diagnostic distinguishes sourceGeometryNestCount from actual runtimeNestCount.

No live original/browser observations were made for this ticket. Prior original launch timed out then returned GetCursorPos Access denied; prior worker browser creation returned Browser is not available: iab and its inventory was empty. No retries or permission workarounds were attempted. Native animation timing, UI persistence, realized source throughput and mission playability remain unverified.

## Five settings: what the source actually sets

Options frame 3, object 3 DIFFICULTY VALUES, actions31 set alterable values 0/1/2; actions35/36 set/clear helper flags 1/2. Source default is Normal: DS games frame 1 offset 62 sets 4,50,24 and medium on/easy off; Options counter object 34 starts at3, range1–5. INI settings can override the original saved selection; no installed save was read.

| Setting | Options offset | Bug threshold (value 0) | Queen threshold (value 1) | Growplant roll maximum (value 2) | Medium flag1 | Easy flag2 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| Very easy | 236 | 2 | 20 | 22 | on | on |
| Easy | 444 | 3 | 40 | 23 | off | on |
| Normal | 652 | 4 | 50 | 24 | on | off |
| Hard | 860 | 5 | 65 | 25 | off | off |
| Very hard | 1068 | 6 | 80 | 27 | off | off |

Source health uses accumulating damage counters/thresholds, rather than the recreation's decreasing HP. These values match assets/original-rules.js, but its speed property is misnamed. Complete decoded expression-token coverage finds **17 references** to DIFFICULTY VALUES[2] across all frames, all as ITEM CREATOR upper-bound comparisons. No recovered reference applies it to a movement-speed action. Raw third-party extension code and hidden native behaviors are not inferred from that coverage.

| Gameplay frame / mission | All value 2 reference offsets |
| --- | --- |
| 5 / Desert Canyon | 37324 |
| 7 / Desert Rocks | 53878, 54098 |
| 9 / Flash back | 70060, 70280 |
| 11 / Retake Base | 75214, 75434 |
| 13 / Hold Base | 73322, 73542 |
| 15 / Hanger | 68554, 68774 |
| 17 / Inside 1st level | 71118, 71338 |
| 19 / Caves | 70778, 70998 |
| 21 / Crystal Chamber | 67368, 67588 |

These compare item roll >=22 and <=value 2, then create growplant108 when growplant count<=3. Canyon rolls Random(100) every 1 s (35838); subsequent frames roll Random(150), e.g. Rocks 52392. Thus nominal eligible roll bins are 1/2/3/4/6, not speed values. Later copied cases also require global15<=10 or global15==13. The source assigns global15 from current frame number (e.g. frame 5 offset 3320); the recreation's recovered convention is frame index+1. Under that convention the extra growplant cases are eligible in missions1–3; the copied guards block later missions. Do not restore a global growplant spawner in all nine maps without respecting those guards. Count<=3 can permit a fourth newly spawned plant; existing placed plants are not removed to meet this cap.

Growplants are an evolution threat/opportunity: ordinary bugs that reach them become queens, while commanders destroy them. Current Hanger/Caves have placed plants (3/18), but the random pickup implementation omits growplant creation. Restoring eligible random plants is a distinct fidelity proposal requiring agreement, not a silent difficulty implementation.

## Current setting effects

| Setting | Bug / queen HP | Movement/spawn multiplier from misnamed speed/24 | Custom normal-bug spit delay | Current nest interval after first birth |
| --- | --- | ---: | --- | --- |
| Very easy | 2 / 20 | 0.9167 | 5.5–7.1 s | 5.45–9.82 s |
| Easy | 3 / 40 | 0.9583 | 4.8–6.4 s | 5.22–9.39 s |
| Normal | 4 / 50 | 1.0000 | 3.8–5.4 s | 5.00–9.00 s |
| Hard | 5 / 65 | 1.0417 | 3.2–4.8 s | 4.80–8.64 s |
| Very hard | 6 / 80 | 1.1250 | 2.7–4.3 s | 4.44–8.00 s |

Queen spit adds0.4 s; red bugs stay at5 HP, 2.6–4.2 s delay and 10% probability among newly spawned ordinary ground bugs. Friendly HP/damage/bursts are difficulty-independent. Commander/troop1 HP, robot7, tank8; bullets1, tank direct damage5; commander grenades12 to bugs/15 to nests, with independent splash/sparks/barrel rules. These are current values, not an assertion that native overlap-based explosions deliver identical totals. Source Egg bullet/Plasma/Flame damage-counter handlers increment1; grenade overlap increments2 and Big Explosion overlap10 (Canyon 25666–26102). Overlap duration/repetition means those source handlers are not verified total grenade damage.

Current movement starts from custom patrol/intent constants and applies the multiplier; native bug 151 has ballistic speed9 and source movement overrides such as frame 5 61942/62066 (climb-dependent expression / constant8), not difficulty value 2. Randomized intent, perception, burst behavior and firing delays remain custom even on Normal. Normal can be the closest source reference **among settings**, not a promise of full original AI/motion fidelity.

Current health, layout and motion values are set when beginning a mission. Changing the Controls difficulty selector calls begin immediately (game.js difficulty.onchange), restarting into briefing; it is not an in-place health change. Default HTML selection is Normal, without original INI persistence. The Units text says difficulty changes firing immediately, but production selection also restarts the mission; a future profile UI should state restart semantics plainly. All deployments remain tactical and all commander selection rules remain independent of difficulty.

## All nine nest layouts and culls

Each map uses source medium149/easy150 overlap helpers targeting Egg74. Runtime uses recovered sprite bounding boxes, not native fine-pixel masks. Original source cull events are not scoped to Start-of-frame; recreation applies them only at initialization. The menu/start behavior makes that distinction usually immaterial, but it is not an identical event interpreter.

| Mission / frame | Source geometry nests VE / E / N / H / VH | Current nests VE / E / N / H / VH | Source cull offsets |
| --- | --- | --- | --- |
| 1 Desert Canyon /5 | 2 / 3 / 3 / 4 / 4 | 2 / 3 / 3 / 4 / 4 | 55794,55958 |
| 2 Desert Rocks /7 | 3 / 6 / 4 / 7 / 7 | 3 / 5 / 4 / 6 / 6 | 51654,51818 |
| 3 Flash back /9 | 7 / 10 / 11 / 14 / 14 | 7 / 10 / 11 / 14 / 14 | 67736,67900 |
| 4 Retake Base /11 | 3 / 7 / 5 / 10 / 10 | 3 / 7 / 5 / 10 / 10 | 50870,51034 |
| 5 Hold Base /13 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | 52778,52942 |
| 6 Hanger /15 | 18 / 36 / 24 / 42 / 42 | 18 / 36 / 24 / 42 / 42 | 52778,52942 |
| 7 Inside 1st level /17 | 20 / 20 / 20 / 20 / 20 | 20 / 20 / 20 / 20 / 20 | 54726,54890 |
| 8 Caves /19 | 17 / 28 / 22 / 33 / 33 | 17 / 28 / 22 / 33 / 33 | 54436,54600 |
| 9 Crystal Chamber /21 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | 51938,52102 |

Rocks nest instance303 at(734,21) is inside the source field, but the runtime y>35 filter excludes it. Medium helpers remove it for Very easy/Normal; hence the discrepancy appears only Easy/Hard/Very hard. Its native visibility/targetability at the upper boundary needs a separate fidelity check, not speculative relocation. Origin/off-field template nests are excluded; Hold Base's second Egg at(304,827) is outside the field and Crystal Chamber only places an off-field template. No non-debug terminal-triggered Egg creation was found in the recovered event audit. The wave maps are not nest-pressure maps; terminals affect doors/objectives rather than adding nests. Inside 1's helper markers lie outside the relevant nests, so all five settings retain20.

Initial runtime ordinary bugs / queens / noncommander army are: 24/0/14, 10/0/11, 26/0/13, 6/1/13, 0/0/35, 0/0/9, 0/0/1, 16/1/20, 0/0/28. These counts do not change with the selector, though enemy HP does. Missions7–9 each retain one ceiling shadow; return rules in7/8 and disabled final return are independent of difficulty. See vent-bugs.md for the separately audited lifecycle.

## Birth throughput, durability and completion are different levers

All nine frames use Egg Random(100) every 500 ms, start birth animation2 when its value<=3 and GroundBug151 count<MAX CHARACTER LIMIT, then create a bug at animation frame 9. Running animation2 has12 frames, speed10, one repeat; native timing/force-animation behavior is not live-measured.

| Mission frame | Roll / trigger offsets | Birth frame 9 / Egg destruction>=50 offsets |
| --- | --- | --- |
| 5 | 25116 /25200 | 25428 /26188 |
| 7 | 31678 /31762 | 31990 /32750 |
| 9 | 32196 /32280 | 32508 /33268 |
| 11 | 24582 /24666 | 24894 /25654 |
| 13 | 25426 /25510 | 25738 /26498 |
| 15 | 25692 /25776 | 26004 /26764 |
| 17 | 27390 /27474 | 27702 /28462 |
| 19 | 27100 /27184 | 27412 /28172 |
| 21 | 25710 /25794 | 26022 /26782 |

4/100 success per0.5 s gives a nominal opportunity rate0.08/s per eligible nest, and geometric waiting time12.5 s **for a fresh independent trial stream**. This is not measured birth cadence: animation busy/restart behavior, cap, retained value between rolls, initial alterable values and collision/selection semantics intervene. The timer event is shared; the Random expression is assigned to selected Eggs, but independent per-object evaluation/correlation is not proven by the decoded event alone. Original initial delay cannot be asserted as the recreation's2–9 s. Queen births are animation/mode gated too, not the recreation's guaranteed7 s spawn timer. Native queen death crouching can create bugs every 330 ms (Canyon 68342); current death creates exactly4 with a red lottery.

Current nests assign independent2–9 s initial timers, then independent (5+Random*4)/mult timers and instant births under cap. A controlled one-nest, no-combat, cap-kept-clear300 s VM probe measured:

| VE | E | N | H | VH |
| --- | --- | --- | --- | --- |
| 39 births, mean 7.535 s | 41,7.229 s | 42,6.975 s | 44,6.703 s | 48,6.162 s |

The means exclude the first birth (6.92 s for that seed); min/max and fixture setup are in JSON. This is a reproducible current-engine probe, not a source simulator or live playtest. Removing all spawned aliens after each tick intentionally measures eligible birth cadence without combat/cap feedback. More nests increase attempted throughput, but cap 50 and player kill throughput prevent summing nominal rates into an observed mission spawn rate.

Egg destruction threshold50 is source-derived and independent of setting. Crystal threshold7 is also independent (final frame 21 offset 93144). Doors have source hit thresholds5 or15, and source terminal dependencies; changing their HP is not a necessary difficulty lever. Plain objective durability does not control how many reinforcements spawn, and extra wave quota directly increases victory work even after routes are secured.

Hold Base: no playable nest/crystal; source starts25 s, opportunities every 0.25 s from two ground spawners selected by item roll<=75/>75, counter target 200 (frame 13 offsets2138/2348, victory1828). Current uses two side edges with random y and stops births when the quota remainder reaches0. Source <=quota and <=cap guards can allow an inclusive extra opportunity; current strict cap checks/stopping are not exact native event emulation.

Final: no playable nest; source starts ordinary wave at30 s/every 0.25 s until counter 150, then queens every 0.5 s until50 (frame 21 1480/1652). Current also uses sequential150/50 quotas and cap 50, with random upper/lower border births. Victory additionally needs crystal extraction and all lifecycle actors cleared (2450). Extraction currently uses hardcoded normal150/queen 40 plus both terminals; any proposed reduced quota must parameterize those thresholds together. Wave rates/quota do not currently vary with difficulty.

## Resources / recovery

Difficulty token/flag auditing found no explicit setting-dependent friendly HP, damage, reinforcement grant, grenade count, pickup interval, wave quota or objective HP rule. Existing support/creation cases are mission/global/cap gated. Outdoor support includes carrier/air/tank; indoor cases include direct five-Troop packets/robots and infiltration. Hanger bronze support is unavailable under its actual source guard; preserve that and current cap feedback rather than pretending every map has the same support types.

Random pickup event cadence is1 s, range100 in Canyon and150 elsewhere; cases/count caps are shared across settings (yellow<=5, blue<=4, bronze<=1, Blitz<1, guns<=3, grenades<=7, subject to mission/other guards). Current generation further checks actual collection eligibility and uses reachable/clear points. Packets, carrier unloading1 s, minimum pause5 s, infiltration lifetime10 s and commander return10 s are current reconstruction rules; not difficulty knobs. Actual availability may be capped even when nominal roll rates are unchanged.

Placed current resource counts are identical across settings. Canyon/Rocks have no initial pickups; Flash back has3 blue/2 bronze; Retake has3 Blitz,41 grenades,4 flame,4 plasma,4 yellow,2 bronze; Hold has37 grenades and4 each flame/plasma; Hanger12 flame,5 blue,6 grenades; Inside 1 has16 plasma/32 grenades; Caves11 flame,24 grenades,2 plasma,2 yellow,1 bronze; final24 grenades/4 plasma. Exact coordinates are in the diagnostic JSON. Current commanders start3 grenades, cap 8. Source grenade counter definitions start1, while arrival branches can set8 (e.g. Canyon 4192 for commander4); global/persisted arrival ordering prevents claiming verified native mission-start stock from those constants alone.

## Decision handoff

The [numeric proposal](difficulty-proposal.md) separates source-semantic corrections from custom profiles and layout/pressure choices. Normal remains closest to evidenced source health/culling/objectives, while existing approved AI/aiming/support approximations are disclosed. Restoring a source-style birth model may lower pressure versus today's Normal: that change and its animation approximation need explicit agreement before implementation. No values/layouts in this report are approved gameplay changes.
