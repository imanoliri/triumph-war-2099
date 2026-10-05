# 2026-10-05 / 032 — extract-combat-bursts

- Task: [extract-combat-bursts](../tasks/extract-combat-bursts.md), TRI-042.
- Date: 2026-10-05 (Europe/Berlin); session 032.
- Branch: `chore/extract-combat-bursts`.
- Checkout: `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-extract-combat-bursts`.
- Starting commit: `6a39b420da2b30c9a2f0550b2c95c2e2d93ce2ea`.
- Status: Review ready; implementation and verification complete.

## Starting context

Director dispatched one approved behavior-preserving TRI-003 child ticket. Read AGENTS, WORKER, task and this prepared initial session. Initial changes were only the director-prepared task/session records. No sibling checkout, board, original installation or assets were modified.

## Work performed

- `src/combat.js` extracts burst target/reaction/rest state, tank group/focus/sweep calculations, mounted continuous projectile sweeps versus quantized visual headings, human firing-lane/alignment movement, enemy firing delay, shot emission and visual burst creation.
- `src/projectiles.js` independently steps explicit state with named world/damage/audio callbacks. Preserves reverse iteration, collision priority, six appended plasma sparks deferred to the next tick, expiry, shields/carriers, destructible doors, nest credit and exposed-only worm hits.
- Runtime owns mutable units/world, damage/kill/score accounting, prop explosions/grenades and update orchestration. A limited `getState:()=>s` follows mission replacements. All numerical rules, RNG consumption, callback order and projectile owner fields remain unchanged. No generic environment proxy or whole-game wrapper.
- Added classic script load/VM fixture wiring, project load-order checks, and `check-combat.cjs` in `dev test`. Existing src allowlists/package traversal cover both new modules unchanged.
- Immutable pre-extraction game.js comes from Git commit `6a39b420da2b30c9a2f0550b2c95c2e2d93ce2ea` into a disposable VM, test-only. CI fetch-depth 0 already supplies this history. Comparison covers thirty 18 s firing traces (three seeds × infantry, commando, robot, tank, both mounted operators, commander and three desert fighters), RNG continuation, target switching/loss/rest, focus/movement of targets, plus six 20 s real Desert Canyon/Flash Back/Beneath the Dunes simulations. Serializer retains repeated-object aliases, including cyclic AI targets.
- Independent standalone projectile checks assert prop priority, nest owner credit, spark deferral/expiry, exposed worm hit/passthrough, damage owner, shield/carrier interception, door destruction and crystal damage. Existing semantic regressions remain in place.
- Updated ARCHITECTURE. DESIGN/Controls/Units remain current because behavior is unchanged.

## Chronological log

1. Chose explicit-service aim/fire/burst boundary and sent it to director; director accepted exact RNG/order and world ownership constraints.
2. Extracted calculations/lifecycle without balance edits. Temporary extraction scripts were removed.
3. Baseline traces matched; integration test initially rejected cyclic AI state serialization and an incorrect test-only custom ID. Fixed the fixture ID and reference-preserving serializer; no production workaround.
4. Started full suite. During its early execution, moved enemy delay into combat and split projectile stepping into its own smaller module. Recorded this timing with director; final affected syntax/project/focused checks follow the split rather than asserting initial syntax covered the later file.
5. Full suite passed. Added independent isolated projectile contracts; final affected check rerun passed. Final `dev check` checked all 53 scripts and runtime load references. A subsequent optional shell read used a nonexistent workflow filename; locating `checks.yml` confirms the existing full-history setup. This was not a check failure.
6. IAB smoke started/unpaused Desert Canyon, observed real rendered actors/projectiles, inspected Units and empty error logs. Reloaded after final split, repeated runtime smoke, then switched/started Beneath the Dunes. [Narrow browser report](../playtests/2026-10-05-combat-extraction.md) separates observed rendering from unmeasured timings/audio.

7. Director review identified a silent self-comparison risk if the VM source-loader anchor changed. Added an exactly-one anchor invariant, verified exactly-one applied replacement, and negative checks for missing/duplicated anchors. This bounded test guard does not alter runtime behavior. Follow-up syntax and harness-prefix check passed (valid injection plus both rejection cases); no broad suite rerun. Initial implementation commit: `81b9083cd706dcc49846cd020c86b79d37d5c665`.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/dev.cjs test` | pass | Session 71602 exited 0: full existing suite and immutable seeded combat comparison. |
| Final `node tools/dev.cjs check` | pass | All 53 scripts syntax checked; load-order/project/assets validation passed. |
| Final `node tools/check-combat.cjs` | pass | Session 2379 exited 0; includes newly added isolated projectile contracts and all immutable baseline scenarios. |
| `git diff --check` | pass | Final diff check exited 0; only CRLF advisory messages. |
| Baseline injection guard follow-up | pass | `node --check tools/check-combat.cjs`; isolated execution of harness prefix verifies valid injection and missing/duplicate-anchor rejection. |
| Live browser | narrow smoke pass | Separate playtest report; exact timed sweeps/headings/audio and full checklist not manually verified. |

## Unresolved issues and risks

No implementation question or balance change. Tests require the immutable starting commit in local/CI history, like existing historical difficulty comparisons. Broad manual playtest and audible verification remain outside this narrow smoke; no fidelity/playability completion claim. Director must review and squash-integrate before ticket Done. No merge or publication performed.

## Next action / handoff

Acceptance criterion met. Director next action: review this scoped commit, then squash-integrate if accepted. Resolve the worker Review commit with `git log -1 --format=%H -- docs/journal/2026-10-05-032-extract-combat-bursts.md` on this branch (latest scoped follow-up touching this completed record); exact SHA is also returned directly to the director. Check explicit services/current-state reset handling, unchanged callback/RNG/order and baseline comparisons. Worker stops at Review; no squash merge performed. The resulting main squash SHA belongs in director's subsequent checkpoint.
