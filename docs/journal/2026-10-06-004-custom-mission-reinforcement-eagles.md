# 2026-10-06 / 004 — custom-mission-reinforcement-eagles

- Task: [custom-mission-reinforcement-eagles](../tasks/custom-mission-reinforcement-eagles.md)
- Date: 2026-10-06 (Europe/Berlin); initial prepared session 004 reused
- Branch: feature/custom-mission-reinforcement-eagles
- Starting commit: 69e4f9af76ddc4292eff270eac7891a4be0e8698
- Status: Review; all acceptance criteria supported, scoped commit ready for director review

## Starting context

TRI-049/050 already integrated three finite yellow troop caches in Whiteout Signal and Harbor Watch. All six custom missions are audited here; no original assets, enemies, objectives, stats or terrain changes. Last Convoy balance was explicitly withdrawn by user; existing placements/profiles remain unchanged.

## Work performed

| Mission | Before audit | Final supply / feasibility |
| --- | --- | --- |
| Relay Breaker | yellow(224,576), bronze(576,600) through Normal; no bronze on Hard/Very hard | adequate, unchanged; actual routes and 5-soldier carrier / tank delivery on real Split Ridge |
| Last Convoy | yellow(520,584), bronze(584,648) through Normal; no bronze on Hard/Very hard | adequate, unchanged; actual routes and carrier/tank delivery on unchanged Hold Base |
| Silent Return | blue(520,648), three timed friendly commandos | adequate, unchanged; route opens ordinary unlocked door244; no terminal253 prerequisite for eagle; optional aircraft delivers commandos, scheduled three retained |
| Beneath the Dunes | no eagles, no random supply | underserved; add two finite yellow caches at(250,230),(330,590) on north/south escort approaches; commanders can reach/collect, ordinary carrier soldiers land on clear connected ground |
| Whiteout Signal | three yellow caches at(245,200),(285,650),(945,245) | adequate, unchanged; all three actual routes/carrier deliveries |
| Harbor Watch | three yellow caches at(150,205),(150,540),(300,680) | adequate, unchanged; all three actual routes/carrier deliveries |

Two Dunes carrier calls are conservative finite support (up to ordinary 5-soldier stop per call when slots stay available), with no refill. Delivered soldiers can escort; repair still requires mechanics. Existing specialist riders/crawlers/robots/tanks remain excluded from recovered soldier/commando support population cap. No new support types or change to specialist abilities.

Older outdoor custom carrier/air calls could consume an existing eagle at full cap: source eligibility gated direct Troop creation, not carrier/air creation. Custom infantry-producing support now retains pickup with existing TROOPS FULL · WAIT FOR SPACE feedback; pending landing drops reserve slots at collection and actual carrier/air/infiltration emission. Original eligibility and delivery unchanged. Scheduled Silent targeting/wait/formation condition unchanged.

## Chronological log

1. Read AGENTS, WORKER, WORKFLOW, approved task and initial journal; clean isolated branch contained only prepared task/journal changes.
2. Audited source placements and real support lifecycles. Initial naive blocked-only reachability reported Silent blue cache unreachable; physical human navigation proved ordinary door244 opens en route. Corrected interpretation before final documentation; no relocation needed.
3. Director explicitly authorized narrow Last Convoy cap retention/feedback usability fix as restoration of unusable blocked-state pickup, not balancing. Immutable pre-ticket mission-data regression compares all six/five profiles allowing only briefing text and exact two Dunes supply entries; Convoy enemies/objective/placements/counts/types/pressure remain identical.
4. Added focused disposable VM audit: 61 individual profile/cache cases physically navigate commander from authored spawn with real masks/doors intact, exercise actual full-cap/pending contact and release, run support to delivery/finish, assert clear connected landings, finite supply and reset. These isolated tests remove threats for collection update, do not claim combat playability. Troop attack-move collects Relay/Convoy/Whiteout/Harbor caches; commando explicit-use reaches Silent optional cache while access remains unused.
5. Real overlapping Relay carrier and optional aircraft with one free infantry slot prove pending airborne reservation never permits living+reserved cap overflow. Silent optional air one-slot pass caps; original three scheduled planes wait at exact points while full, then deliver exactly three after release. Dunes one-slot carrier proves ordinary infantry cap semantics remain.
6. Updated briefings, README, DESIGN, Controls and Units/current playtest checklist. Added test to full runner; normal tests only emit diagnostic stdout, never regenerate pressure/art records.
7. Focused custom audit and unchanged six-sequence original-support oracle passed; loopback worker preview http://127.0.0.1:2108 supplied to director. First full run reached custom-mission checks and failed an obsolete Relay expectation that full-cap carrier calls remain eligible. Updated only that expectation to custom cap retention/feedback; affected Relay/Convoy lifecycle check passes. Full suite restarted.
8. Second full run passed all checks through custom challenge, then historical TRI-037 Convoy profile comparison failed solely because its full JSON includes the newly approved supply brief suffix. Updated comparison to assert and remove only the exact authorized suffix before unchanged full profile comparison. All downstream checks (pressure/split/Silent/Dunes/snow/harbor/vents/worm/riders/music/tooling/director) then passed in sweep79022. Final full runner77531 exited0, including syntax, all immutable behavior/source comparisons, all custom support/mission checks and disposable tooling/director checks. No gameplay changes after narrow assertion corrections.
9. Director independent focused audit exited0. Controlled separate browser tab4 Normal Dunes used selector/Start/Space only, no orders/state injection/clock advancement: north cache consumed, five ordinary soldiers visibly rendered on clear north-west ground, south cache remains, Army13 despite casualties from initial12. Carrier-in-motion was not captured. Earlier tab3 visible MISSION COMPLETE164/Army18 has unclear actor attribution and is not used as controlled completion evidence. Worker performed no browser tab control (only inventory read). Director owns [browser record](../playtests/2026-10-06-eagles-director.md) and screenshots in main checkpoint6b97146; no duplicate worker copy added.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/check-custom-support.cjs | passed | all six × five profiles; exact pre-ticket unaffected mission comparison; physical routes/contact, cap/pending retry, carrier/tank/air delivery, connected landings, no refill/reset, troop orders, Silent schedule/optional and original replacement isolation |
| node tools/check-support.cjs | passed | six immutable original support sequences (source guards, cap retry, carrier/air/zipline, freeze, death/return, reset/replacement/schedule reservations) |
| node tools/check-difficulty-profiles.cjs | passed | 45 original layouts/profile behavior and custom isolation; retained existing oracle |
| node tools/dev.cjs test | passed; final77531 exited0 | 68 syntax scripts and complete runner including unchanged original support/combat/input/rendering oracles, focused custom audit and all mission/music/tooling/director checks; two stale custom expectations narrowly updated |
| git diff --check | passed | no whitespace errors; normal Git CRLF conversion notices only |
| Downstream sweep79022 | passed | all modules from custom-pressure through director tooling; no generated source/pressure/art files |
| Browser Dunes pickup/delivery | passed limited scope | independent director tab4 controlled Normal default-AI collection and five rendered ordinary soldiers; [record](../playtests/2026-10-06-eagles-director.md), main checkpoint6b97146; carrier animation/full-cap/manual completion/audio not claimed |

Normal seeded isolated deliveries: yellow calls each delivered five ordinary soldiers; bronze one tank; Silent optional blue five commandos. Counts are diagnostic when all slots stay free, not guaranteed under later population pressure. Carrier unload coordinates follow moving recovered helper path; clear-ground correction places soldiers on connected custom terrain rather than at cache coordinates.

## Unresolved issues and risks

All-difficulty skilled-player balance/completion and audio remain unverified. No broad manual playthrough is inferred from isolated route/support fixtures. Existing carrier finite stop can finish with fewer soldiers if capacity stays occupied after successful call; no refill or unlimited retry. No original research, publication, asset regeneration, board edits or merge performed.

## Next action / handoff

Worker stops at Review in C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-custom-mission-reinforcement-eagles, branch feature/custom-mission-reinforcement-eagles. Review the scoped branch HEAD containing this finalized session (resolve exact SHA with git log -1 --format=%H), especially custom-only reservation guard, two Dunes caches and narrowly allowed historical assertion deltas. All checks pass; no unresolved design questions. Director-owned live artifacts already committed on main6b97146 will be present at squash integration; links intentionally refer to those current-main artifacts. Director independently reviews and squash-integrates if accepted, recording feature/squash SHA in its subsequent checkpoint. Worker did not merge or publish. Preview process session81853 serves port2108 from this checkout; do not stop unrelated port2101 server.
