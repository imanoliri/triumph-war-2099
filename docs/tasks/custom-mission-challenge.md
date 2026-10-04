# Increase challenge in Relay Breaker and Last Convoy

- Ticket: TRI-034; state in [local board](../BOARD.md).
- Branch: `feature/custom-mission-challenge`

## Goal and user-visible outcome

Increase challenge in Relay Breaker and Last Convoy

## Acceptance criteria

- [x] Implement bounded, explicit Hard/Very Hard profiles for both missions that reduce force/resource advantage and increase sustained enemy pressure; retain mission identities, combat rules and objective/cap/restart behavior.
- [x] Record reproducible before/after pressure, surviving-army, kills, timing and emission evidence, plus actual available Hard browser smoke observations; distinguish simulations from browser results.
- [x] Preserve original campaign and Normal/easier custom profiles, immutable Split Ridge terrain/mask and existing reachable hotspots; version the art-kit difficulty subsets and verify its contract.
- [x] Update briefing/Controls/Units/progress descriptions and task/session records; pass relevant regression checks and the full suite.

Skilled-player calibration is a pending validation limitation, separate from acceptance of this bounded pressure retune: full tactical victories, difficulty satisfaction, casualties/support use and completion time across both Hard and Very Hard have not been verified. This task makes no claim of calibrated difficulty.

## Scope and decisions

User reports both existing new missions (Relay Breaker and Last Convoy) are way too easy on 2026-10-04. Capture as a custom mission balance defect, separate from original difficulty/source fidelity and map art. Director asked optional clarification: Normal low enemy pressure, Normal excess starting army/support, or harder setting still too easy. Record actual response when received; do not pretend first versions were balance-validated. Existing route/objective regression and partial live smoke prove mechanics only. Current Silent Return finishes, then TRI-033 art workflow kit runs directly as explicitly prioritized; this task follows later.

A bounded worker should inspect current custom force ratios, actual encounter timing, finite Normal nest births, routes/support/cannon opportunities and survival conditions, reproduce low-pressure behavior with deterministic scenarios and real playtest where available, and propose concrete mixed tactical/attrition changes. Levers include enemy/nest count and placement, nest spawn pressure or custom HP if agreed, defense wave budget/timing/approach directions and starting army/support. Preserve original nine mission data/difficulty/birth rules; custom tuning remains clearly labelled and independent. Preserve approved Split Ridge geometry and art handoff collision contract, relays/extraction rules, asymmetric aiming, German controls and enemy-only barrel damage. Avoid a global damage/AI cheat or unrelated tank/turret change. All actors/nests/wave points must remain reachable and targetable; test victory/cap/restart/isolation. Difficulty level and desired target challenge/tuning scope should be refined before Ready, with measured casualties/time/support/births/wave logs and honest live balance limitations. Do not mark easier-to-hard estimate as verified difficulty. Isolated fresh worker stops Review; no delegation/board edits/merge/publish.

## Sessions



Actual user answer: a harder difficulty was still too easy. Prioritize meaningful Hard/Very Hard custom pressure and force/resource ratios; do not infer that Normal was tested. Starting settings alone are insufficient. Exact Hard versus Very Hard was not specified; worker should assess both, with Normal regression and explicit custom profiles as needed. No automatic global original-difficulty change.

User explicitly authorized starting the balance worker on 2026-10-05, then immediately clarified queue order: finish TRI-033 first; start TRI-034 directly afterward. Do not park the art kit. This supersedes other Backlog work. Harder difficulty remains too easy; scope now approved for bounded tuning of both custom missions, with worker-owned concrete parameter choices supported by evidence and review. Keep original campaign and Split Ridge geometry immutable. Preserve each mission identity/objective and existing unit combat rules; tune custom initial enemy/nest pressure, defense finite-wave sizes/timing/flanks and starting force/resources. Prefer explicit per-custom-difficulty parameters to global changes; assess Hard and Very Hard and regression-check Normal, without claiming user tested Normal. If a genuinely new mechanic or layout change is needed, return a material question before expanding scope. Deliver before/after pressure logs and a concrete playable implementation rather than a research-only report; verify all placements/routes/caps/objectives/restarts and actual playtest challenge where available. Full completion/balance limitations must remain explicit. Fresh isolated worker after art kit stops Review; no unrelated aiming/tank/turret fixes.

Maintain art-kit integrity while tuning: compiled Split Ridge terrain/mask stay fixed. If approved custom actor/profile placements change, refresh or explicitly version art-kit manifest/geometry/filled brief and clarify per-difficulty placements so future artists cannot use a stale25-hotspot snapshot as current truth. Run focused kit verification too; historical screenshots stay labelled historical. Avoid unrelated art changes.
- [2026-10-05 / 002](../journal/2026-10-05-002-custom-mission-challenge.md)

## TRI-034 implementation evidence

Hard/Very Hard profiles implemented with smaller starting armies, troop/plasma retained, no tank, faster custom Relay nests and24/48 finite Relay flank arrivals; Convoy80/120 finite four-approach arrivals. Normal/easier data and original campaign remain unchanged. Existing coordinates/terrain/collision immutable; art snapshot v2 explicitly stores active per-difficulty subsets and wave points/timing, preserving25-point geometry superset.

See [parameter and before/after stress evidence](../design/custom-challenge.md), [raw deterministic logs](../design/custom-challenge-evidence.json), and [separate browser smoke/limits](../playtests/2026-10-05-custom-challenge.md). Bounded implementation/pressure/isolation acceptance criteria above are supported by the recorded checks and evidence. Full tactical human challenge/victory calibration on Hard and Very Hard remains explicitly pending. On 2026-10-05 the director relayed user authorization to continue the queue and requested separating these verified criteria from that limitation; this clarification does not certify balanced difficulty or mark the ticket merged. Director review/integration remains next.
