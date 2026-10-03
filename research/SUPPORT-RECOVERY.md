# Reinforcement and movement recovery

All records come from the installed original's decoded objects, movements and event tables. `tools/recover-movements.cjs` reads the MMF 1.2 variant's fixed 14-byte path steps; the newer variable-size format in Anaconda did not match this executable. Nineteen paths and the bouncing-ball movement settings were recovered. Path coordinates, segment speeds, direction, pause values and loop/reverse flags are preserved in `assets/original-data.js`.

`tools/derive-support-rules.cjs` extracts each map's Commander1 pickup events in event order. The engine selects the first applicable creation list using the original global-value guards. Creation offsets, object handles, parent helpers and samples are retained in `assets/support-rules.js`. The other commanders have matching creation events in the recovered tables.

## Implemented behavior

- Ground reinforcements outdoors create a troop carrier at the moving Ground spawner. It follows its original approach/turn/stop/departure path. The original rule creates infantry once per second while stopped and below the troop limit, rather than adding eight troops immediately.
- Air support uses the original aircraft object, initial direction mask and movement speed. It makes a pass, fires at 330 ms intervals, drops troops at one-second intervals over unobstructed floor, and bombs at one-second intervals. Landing animation completes before infantry joins the army.
- Indoor air support creates a hidden zipline creator that moves across the field for ten seconds and creates drops once per second. The drop animates, throws an explosion during the descent, then creates a troop.
- Ground reinforcements in the later indoor maps use five Troop creation actions at a telepad-selected Ground spawner, with the original arrival sound.
- Indoor Ground Support uses the seven-hit ground bot sprite. Its full random targeting/firing behavior is still reconstructed.
- BLITZ creates one carrier, two aircraft and one tank, with the source offsets. The help text describes two reinforcements, but the executable's creation list contains one carrier. The recreation follows the executable.
- Active carriers and aircraft can support commander respawn. Pending arrivals prevent the reconstruction from ending a mission prematurely. The full original survival counter rules remain to be reconciled.
- Carriers absorb alien spit and crush nearby bugs while moving. Destruction by carrier does not increment the damage-threshold kill counters, matching the separate source Destroy action.

## Timing and limits

Movement conversion uses speed / 8 pixels per tick at 50 Hz and path pause / 50 seconds. This compatible-clock model was checked against [Anaconda's path implementation](https://github.com/Matt-Esch/anaconda/blob/master/mmfparser/player/movements/path.py) and [movement implementation](https://github.com/Matt-Esch/anaconda/blob/master/mmfparser/player/movements/common.pyx). Live timing comparison with the original remains pending.

The browser engine follows path nodes exactly but uses time interpolation. Original helper collision responses, movement randomizer/security fields, global event selection and pixel collision behavior are not fully emulated. Infantry capacity is based on the recovered maximum counter. Existing prototype instances at (0,0) are still excluded and need runtime comparison.

Bombs currently explode directly under aircraft; the original uses thrown grenade objects with their own trajectory. Drop animation duration is derived from the saved frame count/speed using an approximate playback conversion. Zipline helper movement currently bounces at field edges. Landing on terrain and nearby unit separation need comparison. Telepad activation and other hazards remain incomplete.

## Verification

Mock-canvas fixtures pass for: carrier pause/drop/departure without instant troops; aircraft pass and animated troop arrivals; indoor five-troop delivery; zipline expiration and troop production; seven-hit robots; BLITZ creation counts; and carrier-supported commander respawn when no infantry remains.

All previous nine-map, input, mission-rule and health checks still pass. These fixtures verify the JavaScript state transitions, not live visuals, audible playback or equivalence to every original event. Browser preview remains denied, and recent original launches through the computer tool timed out.
