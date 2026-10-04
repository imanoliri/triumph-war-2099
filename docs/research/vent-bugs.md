# Ceiling / vent bugs: recovered evidence and recreation

Research date: 2026-10-04, TRI-017. Original source path: C:/Games/DarkSunGames/2099_23.exe (read-only). Evidence comes from shipped research/events.json.gz and assets/original-data.js; research/vent-bugs.json is a focused unchanged-record extract, not regenerated assets. Event offsets below are offsets within each recovered frame event chunk, not absolute executable addresses. Original authorship remains Anthony Lopes / DarkSun Games.

## Source conclusions

Only gameplay frames 17, 19 and 21 contain the lifecycle: missions 7 Inside 1st level, 8 Caves and 9 Crystal Chamber. Hanger (mission 6) has no placed ceiling shadow or lifecycle. Each affected map places one shadow at (0,0), instance handle 173: object448 in frame17, object475 in frames19/21. It is retained despite the usual recreation on-map filter. Shadows are active ballistic objects with recovered speed9, randomizer20, angles2, security60 and no deceleration; the source has no shadow/backdrop collision rule. This is ballistic wandering with periodic redirection and edge bounce, not an evidenced literal circular orbit.

| Rule | Frame17 offsets | Frame19 offsets | Frame21 offsets |
| --- | --- | --- | --- |
| Shadow mode Random(20), every 2000ms | 106874 | 97738 | 86686 |
| Contact roll Random(30), every 100ms | 106958 | 97822 | 86770 |
| Start when mode<=5 / stop when mode>=15 | 107042 / 107106 | 97906 / 97970 | 86854 / 86918 |
| Modes6–9 look toward commanders1–4 every100ms | 107170–107548 | 98034–98412 | 86982–87360 |
| Mode11 rerolls without Troop / looks toward Troop every50ms | 107674 / 107838 | 98538 / 98702 | 87486 / 87650 |
| Commander contact roll<=10, troop contact<=20 creates drop446 | 108002–108874 | 98866–99794 | 87814–88742 |
| Boundary bounce / outside playfield aim at (512,270), start | 109092 / 109138 | 100026 / 100072 | 88974 / 89020 |
| Drop animation end creates normal Ground Bug151 | 106730 | 97594 | 86542 |
| Ground mode Random(20), every2000ms | 55630 | 55340 | 52622 |
| Ground mode15 creates jump447 when ceiling count<=9 | 1548 | 1536 | Inactive debug rule3622, count<=3 |
| Jump animation end creates ceiling shadow | 1426 | 1414 | 1904 |
| Victory additionally requires shadow/drop/jump counts all zero | 2256 | 2244 | 2450 |

Contact is with commanders or Troop (object398 in7/8,532 in9), not tanks, robots or aircraft. Recreation commandos are infantry Troop variants and remain eligible. Caves/Crystal add condition-23 with otherFlags1: NOT overlapping backdrop before drop; Inside1 does not. Condition flags32 alone are not negation. Drop sound15 and ascent sound53 are recovered. Ground return is a 5% mode roll every2seconds, not a fixed lifetime; any ordinary GroundBug151 can return, not just bugs descended from vents. Return does not award kill credit.

Final return3622 is inside DEBUG(2), group header3494 through end4760. Header parameter code38 starts raw03000100: flags0x0003 indicate the inactive debug group. Event flags8320 = grouped0x2000 plus complex0x0080, not inactive by themselves; the existing event-report decoder identifies actual event inactive bit0x4000. The final return remains disabled. Debug test-spawn groups are also excluded. No direct or parameter-reference source attack/damage rule targets shadow448/475, drop446 or jump447; their qualifiers are empty. They enter ordinary ground combat only as object151.

Objects446/447 have finite, nonrepeating stopped animation: drop speed15, frames822,822,827,825; jump speed20, fiveframes per direction at source cardinal directions0/8/16/24. Shadow stopped image829 is the recovered dark circle. All frames already ship; no asset recovery/regeneration was needed. Source includes both early drop-end destroy and later drop-end creation groups; recreation performs one atomic transition to prevent a lost/duplicated actor.

## Explicit recreation approximations

Source wall-independent movement and event intervals/roll thresholds are preserved, but this engine does not emulate native MMF ballistic/fine sprite collision. Speed9 converts to56.25px/s using a50Hz/8 scale; native ballistic randomizer/security details are not simulated. Object overlap uses a14px center distance; clear-drop guard uses existing solid terrain collision. Multiple candidate humans use stable first matching order. Outside recovery includes the placed boundary origin; edge overshoot recovers toward the source center. Ceiling transparency is50%, rather than claiming the original ink renderer is identical.

Animation duration uses an unverified50Hz percentage-speed conversion: fourframes at15 =>0.5333s drop, fiveframes at20 =>0.5s jump. Frame progression follows those finite sequences with source cardinal orientation. Jump faces a living growplant when available, otherwise keeps the ground heading. Ground birth resolves to clear playable terrain using the existing bugArrival helper, and restores source difficulty health. Existing randomized ordinary combat and custom red-bug/queen behavior remain unchanged. The final mission may drop its placed shadow but never returns ground bugs through the disabled debug rule.

## Verification / limitations

Dedicated disposable tests assert placement, wall crossing, boundary/center recovery, thresholds/eligible humans, clear-floor restriction, finite transitions, probabilistic return and cap, final debug exclusion and frame orientation. Runtime VM tests assert tactical freeze, exclusion from AI/focus/projectiles/grenades, one-per-phase completion counts, source ordinary landing health and subsequent damage/victory in all three missions. Cleared-mission fixture setup explicitly clears ceiling actors; runtime defaults are preserved.

Native original-game launch via the computer-use skill and @oai/sky failed: first request timed out, second returned GetCursorPos Access denied (0x80070005). Refreshed window inventory had no original-game window. No native game inputs or progress changes were performed; installed files were not modified. No original live observation, browser vent rendering, audible lifecycle sounds or complete mission playthrough has been verified. Source evidence is strong for lifecycle/mission rules; exact motion, overlap, ink and animation conversion fidelity remain unverified.

Follow-up browser smoke (session026): cua in-app tab creation returned "Browser is not available: iab"; refreshed browser inventory was empty. No browser page or inputs obtained. Requested scenarios remain not run in [separate playtest report](../playtests/2026-10-04-vent-bugs.md).
