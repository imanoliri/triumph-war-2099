# 2026-10-07 / 002 — custom-mission-eagle-collection-fix

- Task: [custom-mission-eagle-collection-fix](../tasks/custom-mission-eagle-collection-fix.md)
- Date: 2026-10-07 (Europe/Berlin); session 002 across all features that day
- Branch: `fix/custom-mission-eagle-collection-fix`
- Starting commit: `34df73e5af9d696ef83825fe03a80f8ab34e535d`
- Status: complete (ready for review)

## Starting context

Read task document and original issue where starting reinforcement eagles were uncollectible by infantry and attack-moving troops in custom scenarios (Whiteout Signal, Harbor Watch, District Twelve, Beneath the Dunes, Jungle Recon, Volcanic Forge, Undercity Tunnels).

## Work performed

- Removed `s.originalMap&&` restriction in `game.js` at line 199 (`infantryType` pickup check), allowing infantry walking over pickup items to collect eagles and cannons across all custom scenarios.
- Removed `!s.originalMap` restriction in `src/orders.js` at line 50 (`attackMoveInteraction`), allowing attack-moving soldiers to perceive, seek, and collect starting reinforcement eagles and unmounted cannons across custom scenarios.
- Added automated regression checks in `tools/check-recreation.cjs` testing infantry walking over starting reinforcement eagles and attack-moving soldiers collecting eagles across all 7 custom scenarios (`custom-snow-whiteout-signal`, `custom-maritime-harbor-watch`, `custom-capital-district-twelve`, `custom-desert-beneath-dunes`, `custom-jungle-canopy-recon`, `custom-volcanic-forge-strike`, `custom-undercity-tunnels-breach`).
- Ensured test state overrides `maxAliens = 50` so reinforcement troop caps in scenarios starting at cap (e.g., Whiteout Signal) do not prevent testing pickup collection.

## Chronological log

- Inspected `game.js` line 199 and `src/orders.js` line 50 for `originalMap` guards.
- Removed `s.originalMap&&` from `game.js` pickup collision block.
- Removed `!s.originalMap` guard from `src/orders.js` attackMoveInteraction detour block.
- Updated `tools/check-recreation.cjs` to add regression test assertions verifying starting eagle collection for walking infantry and attack-moving soldiers in all 7 custom scenarios.
- Verified all baseline and custom scenario regression checks pass via `node tools/dev.cjs test`.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Automated checks | pass | `node tools/dev.cjs test` passed all syntax, runtime, gamepad, breeding, and custom mission eagle collection checks |
| Live browser playtest | unverified | Browser rendering/audio playback unverified per `PLAYTEST.md` guidelines |

## Unresolved issues and risks

- None. Custom scenario eagle collection works consistently without affecting original game map behavior or balance.

## Next action / handoff

- Implementation commit: `c7a124eed7f5ff88294c20845fc4d3d5a6681e5e`
- Stop at Review per `WORKER.md` instructions and notify parent agent with commit SHA and verification summary.

