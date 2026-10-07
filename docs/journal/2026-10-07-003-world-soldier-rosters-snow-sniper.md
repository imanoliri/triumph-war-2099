# 2026-10-07-003 Environment world soldier rosters and 360-degree Snow Sniper unit (TRI-066)

- **Branch**: `feature/world-soldier-rosters-snow-sniper`
- **Worktree**: `C:\Users\user\Documents\Codex\2026-10-03\he\outputs\triumph-world-soldier-rosters-snow-sniper`
- **Ticket**: `TRI-066`

## Goal
Implement environment world soldier rosters (`worldRosters`) across custom scenarios and introduce the Nivalis Snow Sniper (`snow-sniper`) specialist unit featuring 360-degree unconstrained aiming, 480px standoff range, 4 damage per shot, 1.2s cooldown, optics visor rendering overlay, and opt-in deployment in `custom-snow-whiteout-signal`.

## Key Changes
1. **`src/custom-missions.js`**:
   - Defined `worldRosters` mapping `Snow`, `Maritime`, `Capital`, `Desert`, `Jungle`, `Volcanic`, `Undercity` to their respective soldier types.
   - Added `environment` and `worldRoster` fields to all custom scenario definitions.
   - Configured `optInSniper: true` and `snipers: [[195,320], [195,460]]` in `custom-snow-whiteout-signal`.
   - Exported `worldRosters` on `window.TriumphCustomMissions`.

2. **`game.js`**:
   - Extended `s.humans` custom mission setup to instantiate `snow-sniper` units from `m.snipers`.
   - Updated `infantryType` to `const infantryType=u=>['soldier','commando','snow-sniper'].includes(u?.type);`.
   - Updated `perceive()` and `update()` target ranges (`perceiveRange = 480`, `closeRange = 450`) for `snow-sniper`.
   - Preserved 360-degree angles `Math.atan2(dy, dx)` in `move()` by omitting `'snow-sniper'` from 8-way `diagonal()` quantization array.

3. **`src/combat.js`**:
   - Updated `heading()` in `aimHuman()` to return exact continuous `Math.atan2(dy, dx)` for `snow-sniper`.
   - Bypassed 8-way cardinal/diagonal quantization in `fire()`.
   - Configured `snow-sniper` firing parameters: `u.cool = 1.2`, bullet `damage = 4`, `speed = 400`, `life = 1.5`, `sniper: true`.
   - Configured `humanFiringLane()` range to 480px for `snow-sniper`.

4. **`src/orders.js`**:
   - Updated `selectable(u)` to include `'snow-sniper'`.
   - Configured `focusAttackStep()` range (480px) and closeRange (450px) for `snow-sniper`.
   - Allowed `snow-sniper` in `attackMoveInteraction()`.

5. **`src/rendering.js`**:
   - Updated `variantMark(ctx, u)` to render `#f0f8ff` white camouflage and `#00e5ff` cyan optics visor overlay for `snow-sniper`.
   - Mapped `snow-sniper` to sprite object `52` in `soldier(u)`.
   - Rendered `#00e5ff` cyan optics tracer bullets for `b.sniper`.

6. **`tools/check-recreation.cjs` & `tools/check-whiteout-signal.cjs`**:
   - Updated `check-whiteout-signal.cjs` `maxAliens` assertions to accommodate the 2 opt-in snow snipers in starting army.
   - Added unit test suite in `check-recreation.cjs` validating `worldRosters` mapping, `optInSniper` deployment, 360-degree free aim, 480px range, 4 damage, 1.2s cooldown, tracer bullets, optics visor rendering, and selection.

## Evidence & Verification
- `node tools/dev.cjs test` passed syntax checks and all 32 test suites cleanly.
- `node tools/check-recreation.cjs` verified 360-degree unconstrained aim, 480px range, 4 damage, 1.2s cooldown, variant mark rendering, and scenario world rosters.
- `node tools/check-whiteout-signal.cjs` verified Whiteout Signal custom scenario rules, route passability, party rescue, and eagle pickup behavior with deployed snipers.

## Limitations & Handoff State
- Implementation is complete on branch `feature/world-soldier-rosters-snow-sniper`.
- All acceptance criteria met; ready for code review.
