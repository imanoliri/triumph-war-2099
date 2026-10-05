# Add desert charging worms

- Ticket: TRI-035; state in [local board](../BOARD.md).
- Branch: `feature/desert-charging-worm`

## Goal and user-visible outcome

Add desert charging worms

## Acceptance criteria

- [x] Implement the agreed burrow, visible warning, straight charge and recovery behavior with collision, damage, rendering and original-campaign isolation verified.

## Scope and decisions

User chose desert first on 2026-10-05 and explicitly selected dune-like worms that burrow, visibly warn, then emerge into a straight charge troops can dodge. See [mission refinement](../planning/campaigns/missions/desert-operation.md) and [planet dossier](../planning/campaigns/planets/desert-frontier.md). User explicitly chose underground protection and vulnerability during warning, charge and recovery; warning must visibly expose the worm. Proposed recovery, wall collision and once-per-target charge damage need final scope refinement. No under-city perforator mechanics in this ticket. Preserve original enemies, aiming, controls and source assets. Use a separate bounded worker after the current TRI-034 review is resolved; do not dispatch from this Backlog record.

## Sessions

## Further user decisions

## Approved bounded unit implementation

User selected desert first and agreed burrow/warning/cardinal straight charge/exposed vulnerability. Queue execution is authorized. After038, implement the enemy as a separate opt-in custom unit without inserting it into original or existing custom missions. TRI-036 activates it in the approved desert mission later. Worker chooses reasonable explicit numerical defaults (HP, speeds, warning/recovery durations, charge damage/range) and records them for review. Collision-safe committed cardinal charges, once-per-target damage per charge, readable exposed warning/recovery and underground immunity are required. Preserve walls; no inferred wall destruction or perforator behavior. New authored worm visuals distinct from recovered data; explicit source/provenance and browser/simulation evidence limitations. No campaign mechanics or friendly roster in this branch.

2026-10-05: worm charges only vertically or horizontally. This makes the convoy crawler's approved diagonal auto-evade a meaningful counter. Preserve straight committed charges; no continuous target tracking during charge is implied. See the mission brief for the human roster; this ticket does not implement those units.
- [2026-10-05 / 019](../journal/2026-10-05-019-desert-charging-worm.md)

## Review implementation

Initial custom tuning and telegraph/provenance contract: [DESIGN](../DESIGN.md#desert-charging-worm-tri-035-custom-unit). Dependency-free module and runtime immunity/targeting/collision/drawing integration complete. No existing mission registration/placement changed. Focused lifecycle and runtime regression evidence plus bounded live browser sandbox: [playtest](../playtests/2026-10-05-desert-worm.md). Await director review; activation remains TRI-036.
