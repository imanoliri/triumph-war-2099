# Ruin Terraces — TRI-092

One selectable custom Abandoned assault uses retained atlas `abandoned-world-a` (source name Reclamation terraces; selected/runtime name Ruin Terraces). Deployment (150,620) ascends western terraces via (150,390), (430,390), (430,170) to upper relay (710,170); the eastern loop via (870,620)/(870,390) flanks the second relay. Exact 144px corridor union and 88px node pads become authored collision/terrain, with sealed masonry and vines drawn only on solid regions. All39 atlas alternatives remain unchanged.

Activate both relays and clear every enemy plus live finite source: existing mission semantics allow destroying nests or exhausting their births, leaving spent nests. Four commanders, one existing full7HP robot, one Incendiary and one Recovery start on every profile. No pre-injury or HP change. Six ordinary bugs, four nests, one finite yellow troop eagle and one plasma pickup; no tank, air cache, waves or new environment rules. Ground support delivers up to five configured world troops using ordinary cap/reservations. Air menu remains the existing world pattern UI, but this mission has no air eagle.

| Profile | Ordinary infantry | Births per nest | Interval | Total finite enemies |
| --- | ---: | ---: | ---: | ---: |
| Very easy | 6 | 2 | 8s | 14 |
| Easy | 6 | 3 | 7s | 18 |
| Normal | 6 | 4 | 6s | 22 |
| Hard | 5 | 5 | 5s | 26 |
| Very hard | 4 | 6 | 4s | 30 |

Conservative finite budgets demonstrate established short-range flame and stationary Recovery roles without new mechanics. One legal support squad adds five infantry slots; starting armies use at most eight infantry slots, below the unchanged source cap. Fixtures verify actual arrivals with that production cap, and separate full-cap/reservation retries.

`tools/build-abandoned-terraces.py [disposable-output-directory]` builds only this terrain using Pillow as an authoring dependency; browser runtime and checks stay dependency-free. Production fixtures independently decode the collision PNG and compare every pixel to the runtime bitset, compare source points/edges/pad/corridor declarations, traverse actual production routes (including recovered robot24px sprite envelope), locate reachable eight-direction firing positions for every initial enemy/nest and emitted birth, and verify finite births, both relay interactions, controlled victory/defeat/restart and physical eagle/support delivery.

Birth-only fixture isolates externally held commanders, with cooldown/shield protection, to avoid specialists destroying sources before their budget is observed. Clear and defeat states are controlled fixtures. Enemy-tagged traversal calls production attackMoveStep, demonstrating collision/path access; it is not autonomous enemy AI behavior or an unmodified combat playthrough. Flame and robot injury/two-kit Recovery are legal production calls on actual terrain. No human difficulty calibration or full live wins are inferred.

The compact relays/nests/births/bugs status is inset above this mission's tactical corner strokes. All-five briefing and Normal terrain/UI spot checks are recorded separately in [the live record](../playtests/2026-10-09-abandoned-terraces.md). [Structured fixture results](abandoned-terraces-evidence.json) identify their limits.
