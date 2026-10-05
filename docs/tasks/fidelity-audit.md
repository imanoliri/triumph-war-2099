# Fidelity audit

- Ticket: TRI-005; state in [local board](../BOARD.md).
- Branch: `chore/fidelity-audit`

## Goal and user-visible outcome

Evidence-linked comparison of five source systems with explicit, bounded parity recommendations and preserved custom policy.

## Acceptance criteria

- [x] Compare source grenade travel, hazards, telepads, waves and support timing; propose explicit parity tasks with evidence — [matrix, limits and recommended scopes](../research/fidelity-audit.md), [compact address/hash index](../research/fidelity-evidence.json), `node tools/audit-fidelity.cjs` resolver.

## Scope and decisions

Research-only approved mandate below supersedes the initial backlog proposal. TRI-003 remains an umbrella; parity implementation must be split into one system per separately approved task. Current custom balance is distinguished from missing recovered behavior; native measurements remain unavailable.

## Sessions

- [2026-10-05 / 039 — director review, integration and scope correction](../journal/2026-10-05-039-director-queue.md)
- [2026-10-05 / 041 — research worker](../journal/2026-10-05-041-fidelity-audit.md)

## Autonomous mandate — 2026-10-05

User authorized queue execution with logged decisions. Bounded research-only audit of the five named systems: grenade travel, hazards, telepads, waves and support timing. Compare recovered source/event data with current original-mission implementation; distinguish custom missions and deliberately custom balance. Produce an evidence-linked discrepancy matrix and concrete parity recommendations, without implementation or modifying/regenerating installed original data. Attempt only authorized native/live access; inability to run the original is a documented measurement limit, not evidence of parity. Existing files/source paths and reconstruction assumptions must be explicit. Run applicable source consistency checks and full suite; stop Review. New parity implementation requires a separate bounded child ticket under the autonomous mandate.

- [2026-10-05 / 041](../journal/2026-10-05-041-fidelity-audit.md)
