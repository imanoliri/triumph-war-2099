# First desert operation — refinement

Status: user selected desert first on 2026-10-05 and chose convoy rescue plus burrow/warning/straight-charge behavior. User also chose repair/escort of actual convoy vehicles and underground protection with exposed-phase vulnerability. Numerical rules and map layout remain under refinement. Planet: [frontier desert colony](../planets/desert-frontier.md). Implementation intake: [TRI-035 worms](../../../tasks/desert-charging-worm.md), then [TRI-036 mission](../../../tasks/beneath-the-dunes.md); neither is dispatched yet.

## Confirmed direction

Hybrid expedition campaign with local-faction operations. Desert enemies include dune-like charging worms. Preserve all earlier worlds; the under-city instead receives perforator bugs automatically attacking through single-cell walls. This mission does not implement under-city mechanics.

## First mission options

User selected: rescue a stranded convoy, working title **Beneath the Dunes**. Local Desert Riders secure survivors and a return route while worm charges punish stationary formations. User selected repair and escort of the actual convoy vehicles; this requires vehicle repair/escort behavior rather than substituting rescued infantry.

## Worm behavior proposal

User selected: underground sand travel, a visible warning, then emergence and a straight committed charge players can dodge. Recovery is proposed to create a readable cycle. User selected protection while underground and vulnerability during warning, charge and recovery. The warning must visibly expose the worm so targeting agrees with vulnerability. Health, speed, wind-up, damage, hit width, cooldown, collision, sand eligibility and sprite footprint remain unset.

Default design recommendation for later refinement: charge damages only once per target per charge, does not pass through rocks/buildings, and has a visible recovery opportunity. These are proposals, not approved rules. Reuse original asymmetric aim and troop controls; no unrelated combat overhaul.

## Confirmed Desert Rider roster

User specified the human faction abilities and accepted crawler evasion plus limited automines on 2026-10-05:

| Unit | Agreed behavior | Numerical tuning still open |
| --- | --- | --- |
| Rider scout | Automatically evades when a bug gets too close | Trigger distance, displacement and cooldown |
| Dune guard | Shotgun fires five pellets in an arc with limited range | Arc width, range, damage and cadence |
| Field mechanic | Repairs nearby convoy vehicles | Repair rate, range and repair interruption |
| Convoy crawler | 6 HP; follows its escort route normally, automatically dodges diagonally when a worm commits to a charge; carries limited automatic mines | Dodge distance/cooldown, mine ammunition, arming, damage and placement |

Worm charges are restricted to vertical or horizontal directions, as specified by the user. The crawler's diagonal dodge is a defensive response, not a restriction on all route movement. User accepted the proposed automatic mine drop behind the crawler after an evade, with finite ammunition. Mines are included in this version, not deferred to an upgrade. A sand buggy remains an earlier unselected proposal, not part of the confirmed roster.

Implementation must resolve physical clearance for evasion and placement so units cannot dodge through walls or become trapped off the escort route. These are implementation requirements; exact tuning is left to the bounded worker with evidence. Do not infer new mine friendly-fire or wall-damage rules: preserve enemy-only damage conventions unless separately approved.

## Map proposal brief

Wide sand lanes connected around rock islands, a convoy or colony landmark, at least two viable approach/return routes, and a defensible regroup area that does not neutralize every worm. Prepare multiple schematic layouts for review before freezing geometry. Do not reskin Split Ridge or reuse its collision contract without explicit selection.

## Agent work sequence

After objective and enemy rules are agreed: bounded charging-worm ticket; bounded playable desert mission/map ticket; separate delegated art polish using a new map-specific reference/mask kit; challenge review. Existing art reference catalogs and compact dispatch workflow apply. No new worker is dispatched while TRI-034 remains the active board-bound ticket.

## Evidence required

Unit checks for warning/charge/recovery, wall collision, target damage and non-desert isolation. Mission checks for routes, objectives, defeat, support, cap, restart and original-campaign isolation. Browser review must show readable worm behavior and actual tactical response, not merely count enemies. Exact difficulty and human-play limitations belong in the handoff.

## Vehicle escort proposal for refinement

Convoy vehicles begin disabled at the ambush site. Friendly troops hold a marked repair area to restore them; repaired vehicles advance along a prevalidated route to extraction and can be damaged or destroyed. Recommend two convoy vehicles, victory when both surviving required vehicles reach extraction, and defeat if either required vehicle is destroyed. Exact repair duration, escort proximity, movement control, route and whether one surviving vehicle is sufficient remain proposals. Reuse existing vehicle rendering/movement only after capability inspection; do not imply existing tank support already provides this objective.
