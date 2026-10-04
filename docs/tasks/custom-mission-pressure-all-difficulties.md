# Increase custom mission pressure across every difficulty

- Ticket: TRI-037; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Increase custom mission pressure across every difficulty

## Acceptance criteria

- [ ] Relay Breaker and Last Convoy sustain materially higher pressure at every selectable difficulty through additional nests and encounter/resource tuning, with original campaign isolated and measured evidence.

## Scope and decisions

2026-10-05 user confirms seeing TRI-034 changes but says missions are still not hard enough, asks to add nests and increase all difficulty levels. Scope: both Relay Breaker and Last Convoy, every selectable difficulty including Normal/easier, not original campaign or Silent Return. Additional nests and worker-selected enemy/replacement pressure, approach placement, finite arrivals and starting resources are authorized. Keep existing mission identities, victory/loss gates, terrain/masks, controls and combat rules. Last Convoy must destroy/clear any new nests under its existing clear-enemies objective; briefing/remaining count must explain this. Do not add global cheats or unrelated enemy/unit mechanics.

Run after the currently active TRI-027 alignment fix, before remaining queued timing/render fixes. Use a fresh bounded worker. Inspect current birth systems at all difficulties; explicitly custom parameters must work at Normal and easier too, rather than assuming Hard intervals apply to Normal breeding. New nest positions must have real infantry access/firing lanes and never block required routes or support. Maintain art-kit versioned geometry/profile records if placements change; terrain stays immutable. Require before/after birth/arrival/army/time evidence, full regression, and actual tactical encounter testing where available. Preserve honest limitations: stationary pressure measurements alone do not establish satisfying or achievable player difficulty.

User approved this concrete follow-up scope after prior bounded retune was merged; do not reopen/rewrite TRI-034 history. Numerical choices belong to worker with evidence, refinement via director only for material new mechanics/layout.

## Sessions
