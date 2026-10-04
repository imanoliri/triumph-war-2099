# Difficulty levels

- Ticket: TRI-018; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Difficulty levels

## Acceptance criteria

- [ ] Refine desired difficulty behavior, agreed balance parameters and measurable acceptance here before dispatch.

## Scope and decisions

User requested this ticket on 2026-10-04 for refinement in the director conversation. Creation authorizes planning only. Existing difficulty selection is present; clarify whether the goal is original-game fidelity, better balance, distinct challenge profiles or another outcome. Refine affected parameters (enemy health/speed/spawns/AI, reinforcements, resources), mission coverage, default choice, UI descriptions and observable acceptance before Ready. Preserve source-derived behavior versus custom balance distinctions. No implementation branch or worker dispatch until bounded scope is agreed.

## Sessions


## Refinement decisions — 2026-10-04

User selected both original fidelity and custom balance (option 3). First, a delegated worker will audit the original difficulty rules and current recreation, distinguishing recovered evidence, live observations and approximations. Present findings to the director/user before choosing custom values. Then agree deliberate improvements with original rules retained as a documented baseline. This direction does not authorize unspecified balance changes or dispatch yet. Still refine desired player challenge, preferred balance levers, setting count/default, mission coverage and acceptance; split research and implementation into bounded tasks if needed.

User chose a mixture of tactical pressure and attrition. Proposed difficulty levers: enemy nest count and positioning, controlling enemy regeneration/spawn pressure, total destruction effort (HP/damage required for victory) and attack approaches/venues. These are candidate design levers, not approved numeric changes. Worker research should identify which original settings already alter nest placement/count, spawn cadence and durability; proposed custom tuning should distinguish enemy throughput, objective durability and map geometry rather than conflating them. Consider meaningful attack approaches and tactical choices alongside resource/reinforcement pressure. Per-mission layouts should remain deliberate and playable; preserve original layouts as a documented baseline. Pending: reference/default difficulty, intended challenge across settings, exact profiles/values and measurable acceptance after research.
