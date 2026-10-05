# Implement mixed original-mission difficulty profiles

- Ticket: TRI-046; state in [local board](../BOARD.md).
- Branch: `feature/difficulty-profile-tuning`

## Goal and user-visible outcome

Implement mixed original-mission difficulty profiles

## Acceptance criteria

- [x] Implement documented five-setting tactical/attrition profiles for original missions, keeping Normal baseline and custom mission profiles isolated; verify layouts and pressure

## Scope and decisions

Backlog proposal; director must record user agreement before Ready.

## Sessions

## Scope — autonomous mandate 2026-10-05

Child of TRI-018. User requested both fidelity and mixed tactical/attrition difficulty, Normal closest to source, with nest positions/counts/regeneration and attack approaches as levers. Their later autonomous mandate authorizes selecting documented tuning. Adopt TRI-020's [candidate profiles](../research/difficulty-proposal.md) and machine-readable source-coordinate layout selections as the initial bounded target for all nine original missions: five settings, Normal default and already-accepted Normal breeding/evolution baseline unchanged. Other profiles use candidate HP/motion/opportunity probabilities, nest subsets and wave interventions; no optional random-resource boost. Preserve friendly stats, aiming, controls, support caps and custom mission overrides. Source and custom decisions must remain distinguishable.

Verify exact source-coordinate selection matrix, all-nine objectives/door/terminal dependencies, monotonic relevant pressure, finite waves/cap retries and reachable nest firing opportunities. Compare seeded pressure and cleanup effort; do not claim calibrated human challenge from VM metrics. If candidate geometry creates unreachable cleanup or excessive measured stall, make small documented corrections within same levers rather than redesign maps or inflate durability. Run full suite and appropriate browser evidence. Document numeric final profiles and honest native/live limits. Stop Review.
- [2026-10-05 / 028](../journal/2026-10-05-028-difficulty-profile-tuning.md)

## Implementation evidence — 2026-10-05

All45 exact source-coordinate layouts and HP/motion/opportunity/wave/crystal profiles implemented; Normal-all-nine and custom-all-five initialization compare against pre-ticket6b41ca baseline. Focused checks prove progressively reachable terminal/door interactions, actual projectile firing venues, cap/probability/quota/extraction boundaries and monotonic seeded cap-clear pressure. [Current values/evidence and limits](../design/difficulty-profiles.md) record nominal cleanup work separately from human timing. Director supplied limited Very Hard UI/guide/deployment smoke; full live calibration/native parity remain unverified and are required before calibrated release claims. Optional resource relief remains deferred. Worker stops Review after final suite and scoped commit.
