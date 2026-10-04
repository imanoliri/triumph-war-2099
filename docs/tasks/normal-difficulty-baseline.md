# Restore Normal breeding and evolution baseline

- Ticket: TRI-021; state in [local board](../BOARD.md).
- Branch: `fix/normal-difficulty-baseline`

## Goal and user-visible outcome

Restore Normal breeding and evolution baseline

## Acceptance criteria

- [x] Normal uses corrected difficulty semantics, source-style nest opportunity/finite birth and eligible growplant rolls; other profiles and approved gameplay remain intact, checks and explicit fidelity limits recorded.

Implementation/evidence: [Normal baseline](../research/normal-difficulty-baseline.md). Worker stops at Review; director acceptance/integration remains pending.

## Scope and decisions

User explicitly approved on 2026-10-04 the recommended first Normal correction after TRI-020 audit. Parent [TRI-018](difficulty-levels.md); evidence [audit](../research/difficulty-audit.md) and agreed bounded section [Separate Normal fidelity correction](../research/difficulty-proposal.md). Worker implements corrected recovered third-value meaning evolutionRollMax (22/23/24/25/27), removing source-speed interpretation. Preserve current Normal motion/AI as documented custom approximations. Preserve non-Normal runtime movement/birth behavior through explicit custom constants where needed; no unapproved profile values/layout/wave/resource boosts. For Normal only, nests receive independent seeded Random(100) opportunities every0.5 s, success rolls0–3, finite12-frame birth busy phase2.4 s with spawn at frame9/1.8 s, first opportunity0.5 s; disclosed50Hz percentage-speed approximation and independent RNG rather than claimed native measurement. Preserve nest placement/HP50, actual source population cap, ordinary/red bug creation policy, visibility/coordinates and sound conventions. Busy phase cannot restart or spawn twice; cap, destroyed nests, tactical freeze/restart and mission completion must be correct during pending births. Restore Normal growplant opportunities with recovered roll range, exact lower22/upper24 bounds, count<=3 and applicable source/global guards, eligible missions rather than universal copied branches; blocked terrain and source placement rules must be respected. Keep placed growplants, commander destruction/ordinary and red evolution semantics unchanged. Rename schema/generator together as needed but do not regenerate unrelated assets or modify original installation. Use small explicit-input module if appropriate. Relevant tests include roll boundaries, busy/frame timing, cap-at-trigger/at-birth/destroy handling, tactical pause/restart, all-nine initializations/completion, plant guards/caps/contact, no accidental collection reward, preserving non-Normal profiles and all prior mechanics. Add reproducible seeded controlled opportunity/birth diagnostics separating realized births/busy/cap time (4%±0.3pp over100000 independent opportunities); no live balance claim from simulations. Update DESIGN/Units/Controls/current docs and durable sessions; run full node tools/dev.cjs test and committed-range diff checks. Original/browser access was unavailable previously; use browser/native skill only through authorized available tools, no barrier workaround, record limitations honestly. Do not implement any proposed custom HP/layout/wave/crystal/resource changes. Stop at Review with scoped commit; no delegation, director/board edits, merge or publish. Director owns review/integration.

## Sessions

- [2026-10-04 / 032](../journal/2026-10-04-032-normal-difficulty-baseline.md)
- [2026-10-04 / 033](../journal/2026-10-04-033-normal-difficulty-baseline.md)

- [2026-10-04 / 034 — director acceptance](../journal/2026-10-04-034-normal-difficulty-baseline-director.md)
