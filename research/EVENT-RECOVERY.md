# Original event recovery

Source: installed `2099_23.exe`, MMF 1.x frame chunk 0x333d. The independently written decoder follows documented binary record layouts from [Anaconda](https://github.com/Matt-Esch/anaconda/tree/master/mmfparser/data). No original editable MFA/GAM project was recovered.

All 26 frames contain event data: 7,172 groups in total. Each event section, group, condition, action and parameter boundary was checked against its stored length. `events.json.gz` preserves decoded records and raw parameter payloads. Expression tokens are decoded structurally; this is not a general MMF runtime interpreter.

## Rules now used by the recreation

| Mission | Minimum elapsed time | Required terminal flags |
| --- | --- | --- |
| Desert Canyon | more than 35 seconds | none |
| Desert Rocks | more than 35 seconds | none |
| Flash back | more than 35 seconds | computer area 2 |
| Retake Base | more than 35 seconds | none |
| Hold Base | more than 30 seconds | none |
| Hanger | none | none |
| Inside 1st level | none | computer areas 2 through 9 |
| Caves | none | computer area 6 |
| Crystal Chamber | none | crystal must leave the field after the battle |

All require enemy/egg clearance. Hold Base counts 200 ordinary bug deaths; the final chamber counts at least 150 ordinary and 50 advanced bug deaths. Hold Base starts spawning after 25 seconds at 250 ms intervals; the final chamber starts after 30 seconds and shifts from 250 ms ordinary spawning to 500 ms advanced spawning. Current spawn positions/motion are still reconstructed.

In Flash back the first terminal unlocks Door 2; the second terminal sets the mission completion flag. Activating a terminal does not unlock every door. Door restrictions and initial unlock flags are recovered per object. Some doors can be destroyed by alien attacks after five or fifteen hits.

Egg damage threshold: 50. Crystal damage threshold: seven. Crystal extraction requires 150 ordinary kills, 40 advanced kills, and both terminal flags; victory requires 50 advanced kills and the crystal outside the playfield. The current beam duration/motion remains approximate.

| Difficulty level | Ordinary bug hits | Advanced bug hits | Original movement speed value |
| --- | --- | --- | --- |
| 1 | 2 | 20 | 22 |
| 2 | 3 | 40 | 23 |
| 3 | 4 | 50 | 24 |
| 4 | 5 | 65 | 25 |
| 5 | 6 | 80 | 27 |

The recreation uses convenience labels Very easy through Very hard. Those labels have not been checked against the original menu art. Movement speed conversion to browser pixels is approximate. The original maximum alien counter starts at 50 in gameplay frames.

Commander fire intervals: autogun 250 ms, plasma 250 ms, flame 180 ms. Grenade interval: 330 ms. Physical bindings remain adapted for German keyboard co-op. Interactions use a fresh Fire press rather than repeatedly toggling doors while Fire is held.

## Verification and limits

Mock-canvas checks cover all nine mission initialization/drawing paths, directional orders, input, grenades, pause/restart, exact terminal flag and unlock dependencies in Flash back, its 35-second gate, the cave terminal at y=30, crystal health, ordinary health on all five levels, and egg health on level 3. Additional fixtures check the Hold Base spawn timer, kills versus spawns, victory after the kill target, fresh Fire presses for door toggling, and final victory after crystal extraction. Audio WAV structure and asset counts have also been checked.

No live browser/game comparison was completed. The browser tool denied preview permission and recent original-game launches timed out. Remaining work includes exact collision behavior, other event families, transports/infiltration, telepads/hazards, AI and numeric balance, scores/transitions, original HUD/menu flow and MIDI playback.
