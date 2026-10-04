# Implement Desert Rider soldiers and convoy crawler

- Ticket: TRI-040; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Implement Desert Rider soldiers and convoy crawler

## Acceptance criteria

- [ ] Implement approved scout auto-evade, five-pellet short-range shotgun guard, vehicle-repair mechanic and6HP route-following crawler with diagonal charge evade and finite automatic mines, isolated from existing units.

## Scope and decisions

Confirmed user mechanics in [desert brief](../planning/campaigns/missions/desert-operation.md): Rider scout auto-evades nearby bugs; Dune guard fires five pellets across a short-range arc; Field mechanic repairs nearby vehicles; crawler has6HP, follows ordinary route, diagonally evades committed cardinal worm charges and drops finite automatic mines behind itself after evasion. Worker-owned explicit tuning for range, damage, cooldown, repair rate, mine ammo/arming/damage. Evasion/mines honor terrain/collision; avoid safe immunity loops. Preserve enemy-only damage convention; no new friendly fire/wall destruction. Existing units unchanged. Depends on035worm charge phases for correct evade trigger. Implement opt-in faction types first;036 activates roster/route/objective in desert mission. No sand buggy or campaign persistence included. New art provenance separated from source and uses existing art workflow; no director drawing. Separate bounded worker after035 stops Review; no parallel/nested worker.

## Sessions
