# Hide standing soldier sprite while mounted in turret

- Ticket: TRI-030; state in [local board](../BOARD.md).
- Branch: `fix/mounted-soldier-duplicate-sprite`

## Goal and user-visible outcome

Hide standing soldier sprite while mounted in turret

## Acceptance criteria

- [x] Mounted soldiers render only the seated turret operator; standing sprite returns after dismount without changing turret combat or controls.

## Review evidence

The human draw pass excludes only a live human whose indexed cannon still identifies it as the occupant. Cannon animation 11 and the separate selection pass remain intact. Draw-call regressions cover soldier/commando mount, seated composite, selection, dismount, stale index, death cleanup and restart. Existing sixteen-heading/continuous-sweep checks and the full suite pass. [Live Hold Base report](../playtests/2026-10-05-mounted-soldier/report.md) records before/after and paused ground-order dismount screenshots. Ready for director review; not merged.

## Scope and decisions

User observed 2026-10-04 that a soldier manning a turret appears both correctly seated in it and incorrectly standing in the turret center. Record Backlog rendering bug; do not interrupt mission/map-proposal tasks. Later isolated fix should suppress ordinary standing human rendering for actively mounted soldiers, retaining seated operator/turret composite and restoring normal sprite on dismount/death/mission reset as applicable. Preserve selection feedback if meaningful, mount/dismount controls, collisions, ownership, aiming and all16 plasma headings regardless operator type. No sprite regeneration, balance change or unrelated rendering refactor. Reproduce in browser and add only meaningful coverage for duplicate render suppression/restoration, existing mounted behavior checks and full suite; document live result separately. Director approves scoped worker dispatch later.

## Sessions

## Queue execution approval

2026-10-05 user authorized continuing the queue. Execute this scoped rendering fix after TRI-028 with the existing observable acceptance, preserving mounted combat and controls. Separate worker ticket; no asset regeneration.


- [2026-10-05 / 014](../journal/2026-10-05-014-mounted-soldier-duplicate-sprite.md)
