# Hide standing soldier sprite while mounted in turret

- Ticket: TRI-030; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Hide standing soldier sprite while mounted in turret

## Acceptance criteria

- [ ] Mounted soldiers render only the seated turret operator; standing sprite returns after dismount without changing turret combat or controls.

## Scope and decisions

User observed 2026-10-04 that a soldier manning a turret appears both correctly seated in it and incorrectly standing in the turret center. Record Backlog rendering bug; do not interrupt mission/map-proposal tasks. Later isolated fix should suppress ordinary standing human rendering for actively mounted soldiers, retaining seated operator/turret composite and restoring normal sprite on dismount/death/mission reset as applicable. Preserve selection feedback if meaningful, mount/dismount controls, collisions, ownership, aiming and all16 plasma headings regardless operator type. No sprite regeneration, balance change or unrelated rendering refactor. Reproduce in browser and add only meaningful coverage for duplicate render suppression/restoration, existing mounted behavior checks and full suite; document live result separately. Director approves scoped worker dispatch later.

## Sessions


