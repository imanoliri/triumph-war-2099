# 2026-10-08 / 011 — floating-habitats-trooper-roster

- Task: [floating-habitats-trooper-roster](../tasks/floating-habitats-trooper-roster.md)
- Date: 2026-10-08 (Europe/Berlin); session 011 across all features that day
- Branch: `feature/floating-habitats-trooper-roster`
- Starting commit: `326c8496fee9e9d0346113b815acc80d3371e5c6`
- Status: Review

## Starting context

Read AGENTS, WORKER, WORKFLOW, authoritative task and prepared session011. Starting checkout had only preparation task/session edits. All earlier kits integrated at326c849; no Floating Habitats mission exists. Director confirmed bounded dispatch before edits.

## Work performed

Added explicit Floating Habitats kit module, opt-in roster and starting arrays, ordinary support/delivery/cap integration, fixed eight-direction weapons and finite swept projectiles, runtime/Units marks and Controls/DESIGN text. See chronological milestones for accepted routine tuning and actual regression evidence. No assets/source research, mission creation, board edits, merge or publication.

## Chronological log

Milestones below preserve dispatch, decisions, corrections, verification and final handoff chronologically.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Automated checks | passed | node tools/dev.cjs test exited0; syntax105 scripts, entire registered suite. Final affected Floating/Toxic/immutable combat and syntax checks also passed after review corrections. |
| Live browser playtest | not run | [Separate browser absence record](../playtests/2026-10-08-floating-habitats-troopers.md). No shipped matching mission; no browser availability inference and no rendering/audio/playability claim. |

## Unresolved issues and risks

No open design question or automated failure. Live browser rendering/audio/playability remains unverified. No matching runtime mission; TRI-091 owns mission creation. Explicit attack/focus does not gain arbitrary aiming or new platform traversal. Publication/original-asset distribution remains outside scope.

## Next action / handoff

Director next action: independently inspect scoped branch/commit, run focused check (tools/check-floating-habitats-troopers.cjs), verify recorded full-suite exit and browser limitation, then accept/squash-integrate if authorized. Worker stops at Review; no squash main commit exists yet. Exact task commit is reported to director after commit creation; resolve branch HEAD with git rev-parse HEAD. Director records resulting squash SHA in subsequent checkpoint.

### Milestone 1 — dispatch and implementation decisions

Director confirmed dispatch. Clean assigned branch apart from prepared task/session files; starting HEAD326c849. No Floating Habitats runtime mission exists: only opt-in roster, starting arrays and disposable fixtures; TRI-091 remains separate. Director accepted both kits at1HP/36px/s, ordinary eight-direction290px/s bullets. Skirmisher1damage/.75s, no burst or firing-driven navigation; existing explicit focus/Attack may pursue. Force/use suppress combat. Defender1s setup,2damage/1.5s, immutable.5s pack on deployed travel requests. Interrupted partial setup cancels without packing; outstanding blocked travel forbids setup. After packing/travel, fresh setup. Guard returns to actual anchor. No material unanswered questions. Added a small explicit module and runtime/roster/factory/support/Units/rendering/projectile integration; focused regressions next.

### Milestone 2 — focused production regressions

`node tools/check-floating-habitats-troopers.cjs` passes sustained route+firing, no aim sidestep/pursuit, Normal/Follow/Attack/focus/force/use, exact setup/packing boundaries, partial setup and cancelled/repeated orders, Guard anchor, near-object32px threshold/blocked sight, walls/doors/props, grounded gap collision, tactical freezes, configured carrier/parachute/zipline/pending cap, production starting/restart/menu and every shipped custom/original mission isolation. `node tools/check-unit-guide.cjs` passed new distinct portraits and recovered sprite parity. Earlier arrival assertions overshot actual setup windows; fixed fixtures to detect actual arrival, retaining1s readiness. Added useSight to outstanding use travel so inside-range blocked sight cannot deploy. `node tools/dev.cjs syntax` was an unsupported command; actual suite includes syntax automatically. Browser playtest explicitly not run: no shipped matching scenario; no live rendering/audio/playability claim. DESIGN, Controls, Units and browser checklist/absence record updated. Full suite next.

### Milestone 3 — shared integration and order review

Director identified Tracker recipient-range map gap: added exact160/300 entries, positive/outside range and actual update priority fixtures. Floating and Toxic Marsh focused checks pass. Preserved ordinary Defender non-force attack-move: legal in-range contact stops travel with destination retained,1s deployment, then .5s packing/resumption upon death/lost terrain sight/invalid lane. Skirmisher alone continues route while firing. Director accepted this routine distinction. Lane callback probes prospective diagonal heading without changing actor travel; east-bound/north-contact positive fixture plus true off-axis/terrain rejection and contact arrival/death/resume pass. A draft arrival fixture bypassed API and retained Guard3, causing intentional anchor-cost rejection; corrected to actual attackMoveTo/order2. `node tools/check-floating-habitats-troopers.cjs` and `node tools/check-combat.cjs` now pass final correction, including immutable prior heading/combat traces. Locked-use timing fixture now samples after enough actual travel(.5s pack +188px travel +1s setup), preserving no fire while pending use. Full suite currently passed new/existing kits, guide, immutable rendering and later mission fixtures; awaiting actual exit.

### Milestone 4 — final verification and Review handoff

Full `node tools/dev.cjs test` session12327 exited0. Registered syntax105/runtime refs, original/difficulty/AI/control/combat/support, every integrated kit, new Floating check, immutable rendering and Units, custom objectives/maps/routes/pressure, MIDI, tooling/director and94-ticket offline mirror checks all passed. During the long run, final shared-range/Defender encounter corrections and regression additions were independently rerun: Floating and Toxic Marsh passed, immutable check-combat passed, game/module/Toxic syntax passed. No failing final check. Expanded tests distinguish legal prospective north heading from true off-axis/terrain contacts; using actual API avoids bypassing order2 transitions. Task criteria checked against this evidence and separate browser absence record. Scoped staging including new files and cached whitespace check next; final commit reported to director. Stop at Review, await review only.
