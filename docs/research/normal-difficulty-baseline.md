# Normal baseline implementation evidence

TRI-021 implements the user-approved first correction from [difficulty audit](difficulty-audit.md). No proposed custom health, layout, wave, crystal or resource changes are included.

The recovered third difficulty value is renamed evolutionRollMax in the shipped rules and derivation generator. All17 recovered references are item-roll upper bounds. Growplant cases are recovered by tools/derive-pickup-rules.cjs with their parent, offset, count and global guards; no unrelated asset regeneration is required. Source offsets and probability/cadence distinctions remain in the audit. The installed original was untouched.

src/breeding.js has explicit capacity/emission inputs and per-nest deterministic independent RNG. Busy phase opportunities still draw rolls but cannot restart the animation. Cap rejection at trigger creates no pending phase; cap rejection at frame9 consumes the emission, with no delayed birth. Destruction cancels it. All lifecycle time is simulation time. The twelve-frame 2.4-second phase and frame9 at1.8 seconds use the agreed unverified 50 Hz conversion. Coordinate seeds reset on restart; this is not a claim about native RNG correlation.

Normal motion and all non-Normal movement/cadence multipliers remain custom constants in src/balance.js. Growplant placement uses the existing helper and bounded terrain-safe fallback; native exact placement/overlap remains unverified. Count<=3 is deliberately retained, not replaced by a three-plant cap. Plants never enter the collectible array or grant pickup score.

Run `node tools/check-breeding.cjs` for boundaries, finite phase, cap/destruction, independent repeatable rolls and controlled thirty-minute no-combat/no-pressure diagnostics. Run `node tools/check-recreation.cjs` for production integration: all-nine initializations/completion with pending birth destruction, tactical freeze, restart, retained other profiles, growplant guards/terrain/count and ordinary/red/commander contact. Full checks use `node tools/dev.cjs test`.

The diagnostic's 100000 independent opportunities have a 4%±0.3 percentage-point acceptance range. Realized births are separately reported, including busy-skipped and cap-skipped successes. A cap-cleared synthetic nest is not a gameplay pressure or playability measurement. Original launch and browser provider were previously unavailable; no new barrier workaround was attempted. Native animation timing, RNG correlation, live sprite rendering, audio, gameplay pressure and complete mission playthroughs remain unverified.
