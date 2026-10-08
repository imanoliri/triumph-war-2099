# 2026-10-08 / 004 — jungle-trooper-roster

- Task: [jungle-trooper-roster](../tasks/jungle-trooper-roster.md)
- Date: 2026-10-08 (Europe/Berlin); session 004 across all features that day
- Branch: `feature/jungle-trooper-roster`
- Starting commit: `304cba69cd19f56a8ec8bf964b2a62e2504189e8`
- Status: blocked — independent Recon checkpoint; Field Medic decision pending

## Starting context

Director prepared branch from304cba69cd19f56a8ec8bf964b2a62e2504189e8 and session004. Initial worktree contained only the prepared task/session changes. Read AGENTS, WORKER, task and prepared journal. Dispatch explicitly authorized Recon work while requiring production Field Medic eligibility evidence.

## Work performed

Independent approved Recon implementation: src/recon.js explicit-clock prediction/swept candidate dash/cooldown/immunity; central unit factory and human simulation integration, melee damage hook, combat firing gate and movement gate. Jungle-only support menu roster, actual ground/air factory initialization and cap accounting. Canopy Recon replaces first soldier(155,320) on all five profiles without objectives/headcount/terrain/pressure changes. Distinct green runtime/Units portrait over unchanged recovered infantry52; Units description and current DESIGN/ARCHITECTURE/STATUS updated. Relevant focused production regressions added to full suite. No recovered asset changes, health increases, original-game research or publication.

## Chronological log

1. Read production factories and damage resolution before mutations. game.js unit factory29, original actor40 and custom make61 all assign infantry1 HP; vehicle overrides are tank8/air5/robot7/crawler6. damage154 subtracts damage then kills at0 HP. Existing ordinary projectiles/melee deal integer1; directional shield absorbs integer hits without creating surviving injured1HP infantry. Production fixtures confirm every starting infantry across all original/custom missions is1HP and a1damage hit is lethal.
2. Sent material question to director: no useful Field Medic recipient exists under approved limits. Recommend defer Medic until an explicit health-rule decision; alternatives (health increase/fractional damage) are outside this ticket authority. Director records/mirrors TRI-078 Blocked and instructs independent Recon completion then parked partial checkpoint. No elapsed-time answer inferred.
3. Implemented Recon with ordinary soldier weapon tuning:1HP/1damage/290px/s/3–6-round burst and ordinary acquisition/rest/cadence. Dash0.25s/up to48px/3s cooldown. Moving route preferred, otherwise side avoidance; stationary side avoidance; melee can retreat. Candidate48/36/24/12px distances allow a shorter legal dash. One-pixel swept center samples retain existing runtime actor collision conventions. Dynamic route obstruction cancels immunity without refunding cooldown. Prior order objects and Guard anchor are preserved.
4. Jungle placement is one-for-one first soldier(155,320), retaining difficulty headcounts, pressure and objective/source records. Default support remains soldiers/commandos; opt-in configured ground/air slots can deliver Recon. No Medic roster placeholder falsely implies usable healing.
5. Focused check-recon.cjs passes real prediction, no-safe melee hit, dynamic-door cancellation, shared cooldown, tactical clock freeze, no firing during dash, moving route preference, stationary side-step, focus/use/force/Guard resume, all mission health eligibility, all-profile placements and actual ground/air cap-slot factories. Units portraits are covered by existing shared sprite/mark parity check extended with Recon.
6. Initial full suite failed the previous Jungle roster exact expectation in check-recreation.cjs. Updated it to the implemented Jungle roster; no production health or other-world rule changed. Second full suite passed with exit0 (93 syntax-checked scripts; all configured runtime/mission/rendering/tooling/director/Project checks passed). After its Recon section, tightened Recon-only Guard return with a visible threat and added production projectile/no-safe-corridor evidence; reran the affected node tools/check-recon.cjs successfully at final state.
7. Live browser work intentionally not run for this blocked partial checkpoint; no rendering/audio/playability claim is made. DESIGN/Units describe behavior; existing controls remain unchanged. Use timestamps only when known.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Focused production checks | passed | node tools/check-recon.cjs; includes current health-eligibility evidence |
| Full automated suite | passed | node tools/dev.cjs test exited0; 93 scripts syntax-checked, every configured suite check passed. Final Recon Guard return/corridor additions checked separately afterward. |
| Whitespace check | passed | git diff --check |
| Live browser playtest | not run | Blocked partial checkpoint; no live rendering/audio/playability evidence or claim. Historical Jungle playtests predate Recon. |

## Unresolved issues and risks

Field Medic is unimplemented. No useful injured infantry exists under current health/damage rules; director/user health-rule decision is pending. No baseline health increase, fractional damage change, resurrection, shield or vehicle repair was substituted. Full acceptance criteria remain unchecked and TRI-078 is not Review-ready. Recon numbers are initial authored tuning; live visual/playability verification and human balance remain unverified.

## Next action / handoff

Park this exact checkout/feature branch after the scoped partial commit. Await the director-recorded explicit Field Medic decision; read task and this session then resume only its authorized outcome. If healing becomes useful, implement the agreed48px/1HP/2 uninterrupted seconds with interruption/range/no resurrection/no vehicle checks, integrate eligible roster/placements/UI and run focused/full checks. If Medic is deferred or scope changed, director must record that acceptance decision before full-ticket Review. Review the independent Recon legal-path/no-free-immunity/order/cap behavior. No merge, squash integration or remote publication occurred. Final partial commit will be reported to director (commit containing this handoff).
