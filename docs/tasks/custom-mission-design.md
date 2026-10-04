# Design playable custom mission candidates

- Ticket: TRI-023; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Design playable custom mission candidates

## Acceptance criteria

- [ ] Deliver distinct assault, defense and infiltration mission designs with existing-asset layouts, reachable objectives, support/enemy placements and measurable checks; identify bounded implementation tasks and pending count choice, without gameplay changes.

## Scope and decisions

User explicitly requested creating new missions after workflow simplification on 2026-10-04. Parent TRI-019 new-missions. Necessary independent design phase while count preference is pending: prepare three distinct assault/defense/infiltration candidates, with first viable alone or candidates extensible to campaign. Count question does not block inspecting feasibility or concrete design, but does block claiming agreed campaign size. Fresh worker owns design/code inspection and optional disposable feasibility diagnostics; director owns user contact and later implementation dispatch. Use current dependency-free runtime and existing sprites/map art/collision assets; distinguish custom mission metadata from recovered originals. Do not modify original installation, recovered assets, gameplay or UI. Inspect current architecture and source/runtime constraints, propose precise mission names/story brief/objectives/victory/defeat/start army/reinforcement and enemy placements at verified clear existing coordinates, plus waves/doors/terminals/vent use as appropriate. Designs must have distinct player goals and meaningful routes, not merely renamed original maps. Explain map reuse openly, no invented art fidelity or unverified route claims. Identify minimal custom-mission registration/runtime seam that keeps original nine missions/results intact, custom selector/grouping, tactical deployment and Normal finite births, physical controls and mission progress. Verify layout/LOS/access with disposable existing navigation fixtures where feasible, explicit legitimate unlock order and targetability; documented tests do not replace live playthrough. Original/browser access previously unavailable; no permission workaround or new dependency install. Provide concise design and implementation plan, exact metadata candidates/acceptance, limitations and questions, and stage one bounded mission/framework task followed by further mission tasks after user count reply. No runtime implementation, balance redesign, unrelated refactor, automatic merge/push or nested delegation. Existing original/remaining difficulty proposals untouched. Use prepared initial session only; send material questions through director. Commit scoped design/diagnostics and stop Review.

## Sessions

