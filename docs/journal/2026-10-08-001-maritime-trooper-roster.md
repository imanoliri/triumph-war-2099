# 2026-10-08 / 001 — maritime-trooper-roster

- Task: [maritime-trooper-roster](../tasks/maritime-trooper-roster.md)
- Date: 2026-10-08 (Europe/Berlin); replacement recovery run
- Branch: `feature/maritime-trooper-roster`
- Checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-maritime-trooper-roster
- Starting commit: `17c185d794c1810fd10ad1bce204dd8a9a462cf1`
- Status: Review ready; not merged

## Starting context

Replacement worker read AGENTS, WORKER, WORKFLOW, task and [previous handoff](2026-10-07-015-maritime-trooper-roster.md). Director rebound TRI-076 In progress and confirmed dispatch before mutations. Preserved all prior dirty implementation, tests, documentation and browser evidence; no reset/clean, asset regeneration or research. Previous implementation was complete with immutable support/full suite pending.

## Work performed

Completed final verification and supported all four task acceptance criteria. Suppressor and Grenadier tuning/orders/terrain are documented in DESIGN and Controls/Units; distinct Maritime world roster, actual carrier/air factories and cap handling are covered by production fixtures. Harbor conservatively replaces the first two infantry with one of each specialist on every profile, preserving total infantry, map hashes, objectives and finite pressure. Added concise current candidate/evidence paragraph to STATUS, clarified immutable comparison comment and corrected browser report handoff link. No gameplay changes during recovery.

## Chronological log

1. Created this new run journal after reading prior durable handoff and receiving director dispatch confirmation.
2. `node tools/check-custom-support.cjs` passed with exit 0: all seven customs/five profiles, real cache routes, delivery/cap/reservation lifecycle and immutable original isolation, including exact approved Harbor replacements.
3. `node tools/dev.cjs test` completed with exit 0: syntax checked 89 scripts; complete production/simulation/music/tooling/director/GitHub mirror suite passed. Maritime exact burst/stop/attack/freeze, prediction/eight headings/render parity/flight/blast/thin terrain/friendly rules, orders/profile/menu/factory/cap coverage passed; Harbor lifecycle and mask hashes passed.
4. Director reported independent Maritime/Harbor/Units/reinforcement-menu checks and source/screenshot review passed with no current finding. Existing browser evidence preserved; no new browser run claimed.
5. Marked acceptance supported; updated STATUS and this Review handoff. Prepared scoped implementation commit; its exact SHA is discoverable as this journal's introducing commit (`git log -1 --format=%H -- docs/journal/2026-10-08-001-maritime-trooper-roster.md`) and reported directly to director.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Immutable support rerun | pass, exit 0 | `node tools/check-custom-support.cjs`; exact approved roster deltas and all other baseline data retained |
| Full suite | pass, exit 0 | `node tools/dev.cjs test`; 89 syntax scripts and complete checks through GitHub Project offline mirror |
| Diff whitespace | pass | `git diff --check` |
| Live browser | inherited limited pass | [Separate prior report](../playtests/2026-10-07-maritime-troopers.md): menus, portraits, deployment and one default-AI completion |

## Unresolved issues and risks

No material mechanic question or known regression. Controlled live stop/refresh/attacks and grenade timing, manual specialist orders/delivery, all-profile human calibration, audio and physical German-key hardware remain unverified. VM evidence is not live timing or human balance acceptance. Publication remains outside this ticket; none performed.

## Next action / handoff

Director independently reviews the scoped commit, then squash-integrates only after acceptance and records resulting main SHA in its later checkpoint. Worker stops at Review and remains available for findings. No board/director checkout edits, delegation, merge or publication occurred. Prior implementation evidence and session015 remain preserved.
