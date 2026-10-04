# 2026-10-04 / 027 — vent bugs director acceptance

- Task: [vent-bugs](../tasks/vent-bugs.md)
- Branch: main
- Status: complete

## Decisions and evidence

User approved original-game vent bug research/recreation and explicitly required director delegation. One worker owned all original-source/native research and implementation in ../triumph-vent-bugs, feature/vent-bugs. Director performed intake, coordination, independent review and integration only.

Reviewed implementation7f640ce7245e7d57050e0f79c007e3cd881dc585 and documentation-only checkpointd9b35c7eee3d3fc448dc47588189c6b141f2dede. Independent node tools/dev.cjs test passed, including full recreation/source lifecycle/music/tooling/director checks. git diff --check passed. Inspected explicit-input module, ground birth hook, separate combat exclusion, phase accounting and source evidence with exact frame/event/group references. No code review findings. Squash-integrated as5672220f057bc9bdf10449a1ded352e1e8d526ca; board Done records this real SHA and reviewed worker checkpoint.

Source establishes missions7–9, excluding Hanger; wall-independent ceiling shadows, repeated human contact rolls, finite drop into ordinary GroundBug151, probabilistic ordinary ground returns in7/8, inactive debug return in9, untargetable ceiling/transitions and completion accounting. Exact native ballistic/contact/ink/animation conversions remain approximations documented in source notes.

## Verification limitations

Worker original-game launch timed out, then returned GetCursorPos Access denied; no original window/input/progress alteration. Requested worker browser smoke unavailable (iab unavailable; empty browser inventory). No live original comparison, browser rendering, audible lifecycle sounds or full mission playthrough verified. These limits were retained in separate playtest records and accepted within task criteria, not reported as passes.

## Next action / handoff

Publish reviewed main through previously user-authorized ordinary Git and verify remote HEAD equals local. No task branches/tags/ignored MIDI bank publication. Preserve unrelated assets/provenance.json edit. Implementation complete; browser/original fidelity follow-up should use the documented checklist when access is available. Native GitHub board migration remains separate.
