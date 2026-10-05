# 2026-10-05 / 026 — beneath-the-dunes

- Task: [beneath-the-dunes](../tasks/beneath-the-dunes.md), TRI-036
- Date:2026-10-05 (Europe/Berlin); session026
- Checkout: C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-beneath-the-dunes
- Branch: feature/beneath-the-dunes
- Starting commit: cde0b1b894d8cbd0accc56b7f9f16e3ab72ec7a5
- Status: Review — worker implementation complete; director review/integration pending

## Starting context

Used director-prepared checkout and this initial session; inspected inherited task edit/untracked initial journal and preserved them. Read AGENTS, WORKER, WORKFLOW, accepted A geometry, artist workflow/kit and scoped task. TRI-035 worms and TRI-040 roster were already present; B/C proposal files remain unchanged. No delegation, board edit, merge, publication, original-game research or recovered asset regeneration.

## Work performed

- Selectable Beneath the Dunes uses independent deterministic terrain/mask, exact approved A rock rectangles and two real crawler routes. Authoring source tools/build-beneath-dunes.py seed36036 exports only this map; bundled existing Pillow runtime used. The first attempted system Python command was unavailable; no install or original-file access followed.
- Mission metadata adds all-five roster/encounter profiles: four standard commanders, two scouts/two mechanics, two2/6HP disabled crawlers,8/7/6/5/4 guards and1/2/2/3/3 worms. Three initial ordinary bugs; no producing nests, infantry substitute, random pickups or support eagles. Full6HP repair permanently unlocks a crawler. It travels only with visible living noncrawler ground escort within110px (commanders eligible), retaining prior speed/evade/vulnerability/four-mine rules.
- Completed full route + eastern48px extraction wins with one living repaired crawler; enemy cleanup/pending waves are irrelevant. Both destroyed loses. No mechanic + every living crawler still disabled and below6HP also fails explicitly. A launched crawler remains feasible after all mechanics/other escorts die. Read-only mission progress reports repair/stall/stage/lost/saved.
- Briefing, Controls and Units explain mission eligibility, health, escort and loss gates. Docs/design/status/setup/architecture describe current custom behavior and evidence. Original asymmetric aiming/physical-key controls/barrel rules remain unchanged.
- Added focused all-five full-body/route/repair/gate/reset/isolation tests and registered them in full suite. Updated two predecessor assertions: worms/Riders are now opt-in to this new mission only, while earlier custom/original scenarios remain free of them.
- Built map-specific immutable art manifest/contract/verify command using existing kit references and all profile hotspots. Baseline visuals are plain original authored terrain; decorative polish is separate.

## Chronological log

1. Accepted worker-owned tuning:2HP disabled start, full repair launch,110px visible escort,48px extraction, existing ability values. Director asked to avoid irreparable silent stalls; implemented and regression-tested explicit mechanic-loss failure.
2. Initial test accidentally supplied49px to navigation.line, which adds its own4px corner sampling. Investigated proposal validator and resolved53px-vs49px mismatch; direct2px samples against packed runtime mask prove accepted49px envelopes. No geometry change. Runtime17px bodies, return routing and swept evades remain required. Static fixture policy memoization speeds route tests without changing blocked cells.
3. First bounded pressure probe used late40/90-style waves and found default Normal could win109.2s. Saved those superseded results in beneath-dunes-initial-pressure.json. Director requested an honest intended-play probe and earlier relevant pressure.
4. Final first waves18/16/14/12/10s, second36/32/28/24/20s; budgets4/5/8/11/14. Reproducible probe seed36036 uses actual0.1s runtime update, either default orders or two Rider groups attack-moving60px ahead of their crawler every2s after repair. No actor teleport, manually forced health, player shots or support. Both methods retained in beneath-dunes-pressure.json; nonmonotonic outcomes are explicitly diagnostic, not human calibration.
5. Browser skill read; hidden Codex IAB supported, visible subagent tab rejected. Ordinary UI showed briefing, tactical terrain, actual full-repair launch and both arcs with NEEDS ESCORT2/4. A reload gave stale frames; excluded them and retried a fresh tab, which confirmed final-build tactical and live progression. Did not capture a clear warning/counter or full rescue. Tabs closed; partial evidence/limits recorded separately.
6. Full suite initially caught old global dormant-worm/Rider assertions; corrected their opt-in expectation. Full suite then passed. Final Units wording/count change passed affected check-recreation. Director separately reported full suite exit0. No subsequent gameplay changes.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/dev.cjs test | pass, exit0 | Syntax49 scripts; project, breeding, all-nine recreation, prior custom challenge/pressure/Split Ridge/Silent Return, new dunes, vents/worm/Rider, music, tooling/director groups. Disposable fixtures only. |
| node tools/check-recreation.cjs (final Units copy) | pass, exit0 | All original/runtime controller and guide checks, worm/Rider mission opt-in isolation. |
| node tools/check-beneath-dunes.cjs | pass | All-five exact49px packed-mask route envelopes,17px actual crawler routes, repair/unlock/LOS/escort stalls, pure progress, tactical freeze, actual runtime repair, mechanic-death feasibility, dead escort/heal rejection, one-save/both-loss/irreparable gates, reward/reset and all-nine original masks. |
| Empty-route module motion | pass | North29.4s/south35.2s after unlock,0.2s steps, artificially repositioned escort and no enemies. Route proof only, not full mission gameplay. |
| node tools/probe-beneath-dunes.cjs | complete | Final default: four profiles still playing120s, Very hard loses36.2s. Scripted Rider escort: Very easy wins39.9s; Easy stalls120s with one crawler lost; Normal wins66.9s with2HP saved crawler and3 army; Hard stalls stage3 at120s, one1.1HP crawler/one army; Very hard loses both50.3s. All final waves emitted in hard/veryhard probe. Live commanders can still escort after troop loss, per focused regression. |
| node docs/art-kit/beneath-dunes/verify.cjs | pass | Immutable hashes, references,1024×768 exports, every packed mask bit matches approved rectangles. |
| git diff --check | pass | Only expected line-ending warnings. |
| Live browser smoke | partial | [Separate record](../playtests/2026-10-05-beneath-dunes.md); final baseline scene/full repair/arc motion/escort-stall feedback observed through ordinary UI. Warning/counter/full human mission/audio unverified. |

## Unresolved issues and risks

No code/task-scope question remains. Human difficulty is initial tuning; seed probe is not a calibrated monotonic ladder. Easy probe can fare worse than Normal; hard/veryhard require better commander/escort intervention than the naive strategy. No all-five human playthrough or live complete rescue/defeat gate proof. Warning/counter/mine legibility remains an explicit live gap. Art is intentionally plain baseline; later decorative polish must obey immutable contract. Existing original-assets/publication restrictions remain unchanged.

## Next action / handoff

Director independently review this branch versus main, especially rescue gates, living commander eligibility, mask/route proof and final encounter evidence. Review visible warning/counter and commanded full rescue if desired; do not relabel automated probe as live proof. Acceptance implementation/check criteria met with recorded browser limitations. Worker stops Review; not squash-merged, no resulting main SHA yet. Commit identification is appended after scoped commit. Director owns later integration checkpoint/board and publication decisions.

Scoped implementation commit: b450bf23534d7b3968f68f3e51c98db33dd36ae4. A subsequent scoped handoff/portable-checksum checkpoint records this SHA: verifier canonicalizes text line endings because this Windows checkout has core.autocrlf=true; binary collision hashes remain raw. Verifier rerun passed. No gameplay change after the final green checks; director may squash both branch commits into one implementation milestone.

Director final diff review found an extra blank EOF line in tools/check-beneath-dunes.cjs. The earlier working-tree diff check did not cover the new untracked file, so that evidence was incomplete. Removed the blank in a scoped follow-up (no runtime change/no suite rerun); git diff --check main...HEAD rerun after committing is the authoritative final whitespace evidence.
