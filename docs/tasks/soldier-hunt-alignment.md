# Fix soldier hunt stopping before aim alignment

- Ticket: TRI-027; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Fix soldier hunt stopping before aim alignment

## Acceptance criteria

- [ ] Soldiers pursuing bugs reach a valid position and aim before firing; avoid ineffective stopping or shots while preserving deliberate aiming rules.

## Scope and decisions

User report 2026-10-04: soldiers hunting and shooting bugs often stop moving and start shooting before their gun is actually aligned with the enemy. Capture as a Backlog bug; do not interrupt current custom mission ticket or dispatch a second worker. Investigate hunt/attack-move approach, valid firing-lane selection, movement-stop conditions, aim/facing transitions and fire eligibility. Establish a reproducible disposable fixture before choosing the correction. Preserve deliberate asymmetric soldier/commando/commander aiming, German controls, mounted plasma 16 headings and enemy-only barrel damage. Do not broaden to global targeting/balance or generic pathfinding rewrite.

Proposed observable acceptance for later approved fix: ordinary soldiers pursuing a stationary or moving bug keep closing/repositioning until the current weapon has an unobstructed legal firing direction; fire only once actual facing/weapon heading meets existing alignment rules, and recover/reposition when the target leaves that lane. Check stationary and moving targets, close-range/diagonal cases, obstruction and mounted/dismounted exceptions, with no regression in other unit aiming. Record actual reproduction and diagnosis, run relevant regression plus full node tools/dev.cjs test, and distinguish simulation from live playtest. Director will refine/approve bounded scope before dispatch; fresh isolated worker stops at Review.

## Sessions


