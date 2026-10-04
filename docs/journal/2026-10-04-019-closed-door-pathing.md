# 2026-10-04 / 019 — closed-door-pathing

- Task: [closed-door-pathing](../tasks/closed-door-pathing.md)
- Date: 2026-10-04 (Europe/Berlin)
- Branch: fix/closed-door-pathing
- Starting commit: 1f386e93978b65e74603d2bf7443bcc7bc0a9f7b
- Status: Review

## Starting context

Read approved task/session018, WORKER, AGENTS, navigation/rally implementation and design. Initial worktree edits were director task/session only, preserved. Started session019. Queued weapon/cannon tasks excluded; worker publication authority unchanged.

## Reproduction and diagnosis

Director reproduced on main using a clear-mask fixture with a rectangular room: left wall x480 split y200..380 and y420..600, closed unlocked door spanning y380..420, room bounded x480..780/y200..600. Soldier starts (300,300), goal (650,300); 1500 ticks of 0.02 s at speed36 stalled at (471.744,301.572), door closed. Main route fields treated the closed unlocked door as solid, disconnecting the room; fallback steered into the wall before ever reaching the 45 px automatic door-opening range.

The navigation cache held one field map regardless of callback passability. Existing rally revision already had its own namespace, but other APIs with equal revisions/different callbacks could reuse incompatible fields. Door revision also missed lock/destroyed transitions.

## Work performed

Human navigation plans with a stable openable-door predicate; actual move collision retains solid closed-door rules until approach opens the door. Alien planning stays solid. Route revision includes open/locked/destroyed bits. Destroyed doors no longer block actual collision even if their open bit remains false.

Navigation contexts partition field caches by stable collision callback and revision; switching policy keeps the other policy's valid cache rather than rebuilding it. Line/destination queries select their own context too. Rally callbacks are memoized per supplied blocked function to avoid a new policy identity each selection. Mission reset clears all contexts. Supply reachability and short attack-move route checks use the same human planning predicate. No terrain/source coordinate or asset changes.

Exact post-fix reproduction reaches (650.502,299.679); door opens and no tick occupies blocked terrain. Added regressions for soldier/commando/robot/tank/commander room routes, per-tick actual collision, locked then unlocked route without initial open-bit change, destroyed closed door, same-revision policy isolation, cached field reuse, line-query policy switching, alien non-opening and supply route consistency. Updated DESIGN/ARCHITECTURE/STATUS.

## Chronological log

- Read and reproduced the director's closed-room fixture with corrected planner inputs.
- Added stable human collision policy, all door revision bits and independent cache contexts.
- Memoized rally callbacks and aligned human supply/route checks.
- Added adjacent locked/destroyed/alien/cache/per-unit regressions.
- Full node tools/dev.cjs test passed.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Pre-fix room stall | director reproduced | Exact fixture and stall coordinates above. |
| Post-fix same fixture | passed | Reaches within 2 px of goal; door opens; every tick checked against actual blocked collision. |
| node tools/dev.cjs test | passed | Full syntax/project/simulation/music/disposable tooling/director suite, including all new navigation regressions and prior feature checks. |
| Live room-route playtest | unverified | No new browser routing evidence supplied; VM movement does not establish live rendering/playability. |

## Unresolved issues and risks

No failing checks or scope questions. Unreachable locked rooms still cannot be entered; source terminal guards remain. Broad live route/balance/audio remains unverified. No map regeneration or queued feature changes.

## Next action / handoff

Director independently reviews planner versus movement collision, cache ownership/revisions and evidence, then squash-integrates if accepted. Worker stops at Review; no merge/publication. Implementation SHA is the commit containing this session (git log -1). Record resulting main squash SHA in subsequent director checkpoint.
