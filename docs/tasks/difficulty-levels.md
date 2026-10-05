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

2026-10-05 autonomous queue mandate authorizes director selection of remaining initial tuning. [TRI-046](difficulty-profile-tuning.md) implements the documented TRI-020 mixed original-mission candidate profiles, retaining Normal reference and excluding the optional resource boost. Existing custom retunes do not substitute for these original-mission profiles. Parent closes after child review and evidence reconciliation; human calibration/native timing limitations remain explicit.


## Refinement decisions — 2026-10-04

User selected both original fidelity and custom balance (option 3). First, a delegated worker will audit the original difficulty rules and current recreation, distinguishing recovered evidence, live observations and approximations. Present findings to the director/user before choosing custom values. Then agree deliberate improvements with original rules retained as a documented baseline. This direction does not authorize unspecified balance changes or dispatch yet. Still refine desired player challenge, preferred balance levers, setting count/default, mission coverage and acceptance; split research and implementation into bounded tasks if needed.

User chose a mixture of tactical pressure and attrition. Proposed difficulty levers: enemy nest count and positioning, controlling enemy regeneration/spawn pressure, total destruction effort (HP/damage required for victory) and attack approaches/venues. These are candidate design levers, not approved numeric changes. Worker research should identify which original settings already alter nest placement/count, spawn cadence and durability; proposed custom tuning should distinguish enemy throughput, objective durability and map geometry rather than conflating them. Consider meaningful attack approaches and tactical choices alongside resource/reinforcement pressure. Per-mission layouts should remain deliberate and playable; preserve original layouts as a documented baseline. Pending: reference/default difficulty, intended challenge across settings, exact profiles/values and measurable acceptance after research.

User confirmed Normal should stay closest to the original, with easier and harder settings built around it. Normal is the source-fidelity reference; any necessary recreation approximation must be disclosed. Other settings use mixed tactical/attrition profiles with nest count/placement/spawn cadence/durability and resource/reinforcement pressure as candidate levers. Preserve deliberate per-mission layouts and avoid tedious durability-only cleanup. No exact values, layout variants or resource changes are approved yet. Next refinement step: bounded delegated audit of original/current difficulty behavior, then a concrete per-setting/per-mission tuning proposal for user agreement before implementation.

User explicitly authorized the delegated audit/proposal next step ('then do it'). Bounded research ticket [TRI-020](difficulty-audit.md) owns that work; TRI-018 remains Backlog/refinement for later agreement on actual balance changes. No gameplay implementation authorized by this research dispatch.

TRI-020 worker interrupted by account usage limit before Review; user requested continue. Director resumed the same worker in the preserved chore/difficulty-audit checkout, keeping completed diagnostics and uncommitted records. Ticket remains In progress; no gameplay implementation authorized.

TRI-020 research completed and squash-integrated as fe90071f20273e86894885119aa4405734bd2c0b. [Findings](../research/difficulty-findings.md) and [candidate profiles](../research/difficulty-proposal.md) are available for refinement here. Director independently reproduced45 initialization states and validated45 unique/nested source-coordinate selections, Normal geometric subset equality and17 third-value references. Worker full suite passed; live/source animation/fine collision remain unverified. Runtime/assets unchanged. Next user decision: adopt bounded Normal semantics/breeding/evolution correction first, then agree custom global/layout/wave profiles; optional easy resource boost recommended deferred. No proposed values/layouts or implementation stages are approved yet.

User approved first implementing Normal source-style spawning/growplant opportunities and corrected value meaning. Bounded [TRI-021](normal-difficulty-baseline.md) owns that implementation. All other proposed global/layout/wave/resource changes remain unapproved. Existing non-Normal gameplay is preserved through explicit custom constants; Normal motion/AI remains documented recreation behavior.

TRI-021 Normal baseline correction accepted and squash-integrated b95f73ff82c684392a8eabcadae99e2e0c9ea526. Independent full suite plus affected guide/recreation follow-up checks passed. Normal uses source-style finite breeding and guarded growplant opportunities; corrected recovered third-field semantics, preserving explicit custom motion and other settings. Numeric profiles, nest subsets, waves and resource proposals still need agreement; live balance/original animation fidelity remains unverified.
