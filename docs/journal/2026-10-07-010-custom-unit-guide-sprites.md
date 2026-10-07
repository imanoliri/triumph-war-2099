# 2026-10-07 / 010 — custom-unit-guide-sprites

- Task: [custom-unit-guide-sprites](../tasks/custom-unit-guide-sprites.md)
- Date: 2026-10-07 (Europe/Berlin); initial prepared session 010.
- Branch: fix/custom-unit-guide-sprites
- Starting commit: b06b998185c384fe54ee4a58f587b5418d468785
- Status: Review; implementation and scoped verification complete.

## Starting context

Director dispatched TRI-071 into isolated triumph-custom-unit-guide-sprites checkout. Only prepared task/session changes existed. Earlier planning pause was revoked by authorized sequential execution. Read AGENTS, WORKER, WORKFLOW, task and this prepared initial session. No original-game research required.

## Work performed

The guide's Rider scout, Dune guard and Field mechanic rows used null portrait sources; Snow sniper was absent entirely. Runtime infantry taxonomy includes these four custom soldier types and standard soldier/commando. Added four guide canvases using recovered infantry object 52 plus the same existing TriumphRendering.variantMark used by the battlefield. Preserve recovered hotspot, standing direction/frame and unscaled pixels in 48px canvas. Runtime owns image loading and repaint on first load; portraits are transparent and fit card headings. Added Snow sniper's existing HP, damage, cooldown and sight description without modifying its gameplay. Original entries/art and all vehicle/enemy presentation remain unchanged.

Focused regression checks guide entries in original/Dunes/Snow contexts, recovered drawing, exact runtime sprite/mark command parity, distinct marks and deferred image load repaint. Added to full suite. Current architecture and targeted browser checklist describe guide rendering.

## Chronological log

1. Read prepared scope/session and waited for director dispatch confirmation before edits.
2. Director confirmed dispatch and coverage of all implemented custom soldier types. Inspected runtime renderer and guide; identified three null sources plus absent Snow sniper.
3. Implemented shared renderer canvas portraits and missing guide row; added regression. Initial test harness missing module argument was corrected; focused regression passed.
4. Used computer-use browser capabilities for actual hidden Codex in-app browser preview on loopback 2171. Visible IAB is unsupported in subagent threads; hidden IAB succeeded. Inspected existing original portraits and four custom portraits; adjusted guide canvases to transparent borderless styling and reloaded. Saved actual screenshots. Closed/reopened guide in Whiteout Signal and verified four portrait entries. Direct DOM pixel counting unavailable because read-only browser DOM scope does not expose canvas getContext; screenshot inspection establishes nonblank rendered portraits.
5. Director independently inspected both screenshots and reported no visual finding.
6. Full node tools/dev.cjs test completed with exit 0: syntax, repository, simulations, immutable rendering/input/support comparisons, guide regression, music and disposable workflow/director/mirror checks passed. Added a final regression guard against any implemented infantry taxonomy missing portrait coverage; reran affected check successfully. No repeated broad run needed for that test-only addition.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/check-unit-guide.cjs | pass | Original/Dunes/Snow entries, source sprite/mark parity and cold image repaint |
| node tools/dev.cjs test | pass | Full suite exit 0; 82-script syntax pass, all registered checks passed |
| git diff --check | pass | No whitespace errors |
| Actual browser guide preview | pass | [Report](../playtests/2026-10-07-custom-unit-guide-sprites.md); two rendered screenshots |
| Broad combat/audio playtest | not run | Guide-only scope; no gameplay/audio changes |

## Unresolved issues and risks

No open design questions. Exact IAB engine version not exposed by available tools; recorded browser name and screenshot viewport. No new art generation or recovered source-data changes, publication, board edits or merge performed.

## Next action / handoff

Review commit: branch HEAD, title `Show existing custom soldier sprites in Units guide`; resolve exact SHA with `git log -1 --format=%H fix/custom-unit-guide-sprites`. Scoped implementation/docs/evidence committed; working tree clean. Next action: director independently review diff, focused/full-suite evidence and actual screenshots, then record Review and approved squash integration. Director reviews and squash-integrates; branch is not merged and resulting squash SHA belongs in a subsequent director checkpoint.
