# New missions

- Ticket: TRI-019; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

New missions

## Acceptance criteria

- [x] Refine mission concepts, count, objectives, maps and measurable acceptance here before dispatch.

## Scope and decisions

User requested this ticket on 2026-10-04 for refinement in the director conversation. Creation authorizes planning only. Refine mission concepts and number, campaign placement/unlocking, environments, objectives, army/support, difficulty progression, allowed assets and success/failure criteria. Keep recovered original missions distinguishable from new custom content. Treat this as intake; split approved concepts into bounded implementation tickets when scope is known. No maps, assets, implementation branch or worker dispatch yet.

## Sessions


User explicitly requested creating new missions after TRI-022 on 2026-10-04. Workflow task is now integrated. Scope question presented: three mixed-objective missions (assault/defense/infiltration), one polished mission first, or five-mission mini-campaign, using existing assets and separate custom campaign. Await scope preference while completing workflow checkpoint; fresh bounded workers own design/implementation. No expansion of recovered source campaign or unrelated regeneration.

[TRI-023](custom-mission-design.md) owns independent concrete design/feasibility for assault/defense/infiltration candidates while count preference is pending. This necessary preparation does not assume silent approval of campaign size. Implementation follows agreed scope in bounded mission branches; original nine missions remain distinguishable.

Director working scope is three independent custom scenarios using existing assets, starting with [TRI-024](custom-relay-breaker.md), then Last Convoy and Silent Return in separate tickets. This is a stated working assumption under the explicit creation request; no submitted count answer is claimed. Designs accepted in d49158a; no forced unlocking or new artwork.

Bounded follow-up tickets: [TRI-025 Last Convoy](custom-last-convoy.md), [TRI-026 Silent Return](custom-silent-return.md). Begin only after preceding registry/mission review and acceptance.

User steering: requested visual proposals for a new Relay Breaker map, for direct review/alignment before implementation. [TRI-029](relay-breaker-map-proposals.md) follows active defense ticket; infiltration remains queued. Existing Relay Breaker currently reuses Desert Rocks, disclosed honestly.

User selected new-map A Split Ridge; TRI-032 implements purpose-built terrain after active turret sweep. Preserve B Relay Basin and C Switchback Mesa for potential later missions.

Initial three scenarios implemented: Relay Breaker, Last Convoy, Silent Return. Purpose-built Split Ridge accepted a7d2a18; alternatives saved. User reports first two tooeasy even on harderdifficulty, recorded TRI-034; do not claim balanced/playtested release. TRI-033 art handoff kit next by explicit user priority. Intake remains open pending further balance/art work.

## Director umbrella closure — 2026-10-05

Agreed bounded mission set is implemented: Relay Breaker, Last Convoy, Silent Return and selected A/Twin Crescent Beneath the Dunes. Accepted children TRI-023/024/025/026/032/033/034/035/036/037/040/041 cover concepts, objectives, custom geometry, art handoff workflow, pressure and desert roster/worms. Director verified all recorded squash commits are on main. The fourteen-world brainstorming pack and saved alternative maps remain future concepts, not fourteen approved implementation tickets. Withdrawn TRI-039 stays withdrawn. This administrative planning umbrella closes without a separate implementation or fabricated squash. Full live outcomes remain TRI-001/002; no balanced-release claim. See [director checkpoint029](../journal/2026-10-05-029-director-queue.md).
