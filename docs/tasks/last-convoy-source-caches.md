# Restore original map grenade and weapon caches in Last Convoy

- Ticket: TRI-039; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Restore original map grenade and weapon caches in Last Convoy

## Acceptance criteria

- [ ] Last Convoy includes the original Hold Base map's recovered grenade and weapon caches at their source positions without changing current difficulty or wave profiles.

## Scope and decisions

2026-10-05 user explicitly requests Last Convoy include grenade/weapon caches from the original map. Inspect recovered Hold Base source map/fixture and enumerate exact grenade and weapon pickup types, coordinates and quantities; restore those static pickups in Last Convoy. Preserve source attribution and distinguish any preexisting custom pickup. Avoid accidental duplicate at identical location/type. No inferred restoration of source support eagles, enemy actors, props or random pickup generation; original campaign unchanged. Preserve current Last Convoy waves/roster/nests/objective/difficulty from TRI-034, user says challenge was sufficient. This is a separate pickup restoration ticket, not part of pressure037.

Verify correct source enumeration, all caches represented, reachable actual positions/door use, ordinary collection including duplicate commander weapon retention, cap-independent grenade/weapon behavior, restart/difficulty initialization and original/custom isolation. Run relevant/full checks and record actual browser evidence separately. After current TRI-037, before remaining timing/render/speed tickets, one isolated worker stops Review. Do not modify installed original game or regenerate unrelated assets.

## Sessions
