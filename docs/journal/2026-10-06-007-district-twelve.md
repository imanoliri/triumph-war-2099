# 2026-10-06 / 007 - district-twelve

- Task: [district-twelve](../tasks/district-twelve.md)
- Date: 2026-10-06 (Europe/Berlin); session007
- Branch: feature/district-twelve
- Starting commit: 6206fa06af924c5b9c1c2304a6d32079a25a61f5
- Status: Review; full suite passed and director bounded browser evidence recorded

## Starting context

Read AGENTS, WORKER, WORKFLOW, bounded task, capital dossier, District brief, campaign agent-kit, art-kit README/manifest/artist-workflow and PLAYTEST. Prepared isolated checkout already had task scope and this initial session; no duplicate created. Director approved existing-unit bounded mission despite stale draft brief; all world dossiers, Last Convoy and original/recovered assets remain intact.

## Work performed

Added selectable custom-capital-district-twelve, deterministic Crown terrain and existing commanders/soldiers/robot/bugs/nests. Two terminal objectives,120s hold,70s once-only existing aircraft/three commandos and final finite assault cleanup gate with living noncommander. Immediate army loss even with relief inbound; no timeout/civilians/new-unit/ability/roof/destruction/environmental/campaign features. Two finite carrier eagles and plasma. Pending scheduled aircraft, reinforcements and landing animations gate victory/HUD through opt-in objective reliefDelivered; original/other custom progress shapes unchanged.

Five profiles: soldiers10/10/8/6/4, six initial bugs, four nests each4/5/7/10/13 births at7/6/4.5/3/2.4s; finite wave budgets26/36/46/62/78. Sources retain budget at cap, empty live nests stop gating, destruction cancels births. Scheduled aircraft wait at full infantry cap and preserve reservations. Two eagles at(150,170)/(150,600) invoke recovered carriers; actual five-soldier unloads connect to guard rooms at(92.9,224.5).

Editable tools/build-district-twelve.py seed53053 and geometry.json freeze new mask; manifest hashes/links sources and runtime-contract.json all-five profiles. Authored guard-room wall lockers, transit rails/platform paint/crosswalks, plaza paving/edge planters and facade seams/vents; no recovered pixels, baked actors or installed-game reads. Art refinements changed only terrain hash, preserving collision SHA3f482dae11d581f1e8445646c3f738b019afbc90276528208586395834357e4b and packed mask. Native-size terrain inspection performed with view_image; runtime actor browser observation belongs to director evidence.

## Chronological log

1. Inspected worker policy/scope/current registry/objectives/finite Harbor lifecycle/aircraft support and selected reasonable bounded defaults, relayed to director. Director confirmed routine defaults and pending-relief/source HUD evidence.
2. Authored geometry/art and registry entry; reused existing finite birth/wave and aircraft lifecycle, added mission-only pending relief gate, selector/load-order and Units description.
3. Added dedicated route/terminal/finite-cap/victory/loss/eagle/aircraft/reset/isolation/hash checks. Corrected copied Harbor fixture clearing assumptions for District terminals/relief; corrected diagnostic terminology to two eagles/three commandos.
4. Initial full suite stopped at tools/check-difficulty-profiles.cjs:35 Custom baseline new District because immutable historical game.js lacked finite-source loader. Scoped only that historical oracle exclusion alongside existing Harbor exclusion. check-custom-support historical snapshot iterates its prior-six registry; its real physical support loop still covers all seven/current missions/allfive. Harbor nonfinite-source isolation assertion explicitly excludes new finite District; dedicated tests cover new shape. No original baseline normalization weakened.
5. Director review caught new-text encoding replacement character; replaced victory label with ASCII and scanned new text. Added immutable-mask guard/transit/plaza detail and exact69.999/70s single-release/three-target tests. Refreshed runtime contract and geometry reference start to clear(210,70).
6. Ran seeded default-AI full runtime120s probes allfive, including autonomous eagle gathering and scheduled relief. Recorded docs/design/district-pressure.json. Substantial contact: kills41/55/59/52/57; army22/21/21/10/13; bugs7/6/21/50/49. All nest budgets exhausted. Hard emitted56of62, Very hard48of78 due50-bug cap; retained backlogs correctly prevent victory. No skilled-player calibration claim.
7. Worker browser attempt on separate loopback2153: hidden IAB creation rejected because visibility unsupported in subagent. No workaround or live verification claim. Director root hidden-tab proof requested; worker server remains available2153 for independent review. Read computer-use SKILL.md, used available browser API, no native input.
8. Updated current DESIGN/ARCHITECTURE/STATUS/README/PLAYTEST, bounded mission brief, map provenance and custom scenario guide. Full suite rerun progressing; broad support passed all seven/allfive real routes/contact/reservations/retry/actual carrier unloads/reset and originals.

9. Full node tools/dev.cjs test completed exit0. Director root hidden2153 Normal: split squads sent north/south, actual relay counter2to1; army9to3 casualties; southern eagle consumed and carrier squad rendered; later three blue commandos and relief gate gone at84s,20arrivals/36s wait/1relay/about38bugs still pending. No full-win observation. Director owns screenshots/playtest at main f37ad14: [record](../playtests/2026-10-06-district-director.md) and artifacts 2026-10-06-district-tactical.jpg/combat.jpg/eagle.jpg/relief.jpg. Worker links without copying.


## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/check-district-twelve.cjs | passed | Allfive exact profiles; physical street/plaza/shelter route and terminal orders; geometry/hotspots/birth clearance; tactical freeze; finite source/wave cap retention/drain/destruction; hold/cleanup/survivor loss; two actual carrier unloads; exact70s three aircraft/cap wait/reserved landings; reset/isolation/hashes/runtime contract |
| node tools/check-district-twelve.cjs --record | passed | Five deterministic120s encounters; district-pressure.json; actual defaults, no HP/cap/healing intervention |
| node tools/check-harbor-watch.cjs | passed | Prior Harbor finite source/hold/three actual carriers preserved |
| Full node tools/dev.cjs test | passed (exit0) | 70 syntax checks and complete local suite; current allseven/allfive actual support, allnine originals, historical runtime/input/render/support/balance, all custom lifecycle, MIDI/tooling/director |
| git diff --check | passed | No whitespace errors |
| Live browser playtest | director bounded Normal evidence | [2026-10-06-district-director](../playtests/2026-10-06-district-director.md), director-owned main commit f37ad14; tactical/combat/eagle/relief screenshots. Worker hidden IAB unavailable; no copied artifacts. Full victory/audio/skilled challenge not observed |

## Unresolved issues and risks

Human challenge/optimal routes/victory completion are not calibrated. Default-AI probes demonstrate substantial engaged pressure, not player difficulty or achievement. Hard/Very hard finite backlog remains at120s and must be killed/drained; no timeout. Original music uses existing fallback (no ignored MIDI bank uploaded/generated). No remote publication authorized. Full suite passed. Director recorded bounded Normal UI combat/support separately.

## Next action / handoff

Review candidate ready. Director independently compares feature/district-twelve against approved starting6206fa0, examines task/session, current geometry/profile/source hashes and bounded playtest, then squash-integrates if accepted. Review commit is the commit containing this session (`git log -1 --format=%H` in this checkout); no merge performed. Director independently reviews, then squash-integrates if accepted. Worker does not merge, publish or edit board. Rebuild: Pillow-capable Python tools/build-district-twelve.py; node tools/export-district-contract.cjs; node tools/check-district-twelve.cjs. Browser server isolated2153.
