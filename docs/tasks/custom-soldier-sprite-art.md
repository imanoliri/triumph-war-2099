# High-fidelity pixel art sprites for custom soldier types

- Ticket: TRI-065; state in [local board](../BOARD.md).
- Branch: `feature/custom-soldier-sprite-art`

## Goal and user-visible outcome

Custom specialist soldier types (Desert Scout `rider-scout`, Dune Guard `dune-guard`, Field Mechanic `field-mechanic`, Snow Sniper `snow-sniper`) render distinct, high-fidelity pixel art sprite overlays matching original Triumph 2099 aesthetic conventions across directional headings instead of generic procedural shapes.

## Acceptance criteria

- [x] Custom soldier types (Desert Scout, Dune Guard, Field Mechanic, Snow Sniper) render authentic multi-directional pixel art sprites matching original Triumph 2099 aesthetic instead of procedural shapes.
- [x] Automated unit test / regression checks pass via `node tools/dev.cjs test`.

## Scope and decisions

- Multi-directional pixel art sprite overlay rendering in `src/rendering.js` / `variantMark()`:
  - Desert Scout (`rider-scout`): desert reconnaissance gear, tracking visor, light armor palette.
  - Dune Guard (`dune-guard`): reinforced desert armor, wide shotgun scabbard, blast helmet.
  - Field Mechanic (`field-mechanic`): field maintenance toolkit harness, repair scanner visor, utility belt.
  - Snow Sniper (`snow-sniper`): winter ghillie hooded cloak, cyan optics scope, high-contrast snow camouflage.
- Directional heading alignment (cardinal + 8-way / 360-degree).
- Preserves original game sprite indexing and rendering performance.

## Sessions

- [2026-10-07-006-custom-soldier-sprite-art.md](../journal/2026-10-07-006-custom-soldier-sprite-art.md)
