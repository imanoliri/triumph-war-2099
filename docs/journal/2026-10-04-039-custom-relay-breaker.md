# 2026-10-04 / 039 — custom-relay-breaker

- Task: [custom-relay-breaker](../tasks/custom-relay-breaker.md)
- Date: 2026-10-04 (Europe/Berlin); session 039
- Branch: `feature/custom-relay-breaker`
- Starting commit: `fea4f1d51d6aa0b28fbd92551420ccafd01f23ee`
- Status: Review

## Starting context

Read AGENTS, WORKER, task and linked initial session; preserved preparation edits. Approved TRI-024 is registry plus Relay Breaker only. No delegation, board writes, original installation access, asset generation or publication.

## Work performed

Added immutable classic-script custom registry with accepted Relay Breaker coordinates. Separate custom loader overlays the existing source terrain/support construction, replaces explicit actors/pickups, shallow-copies objective rules and disables custom random pickups/plants/waves/vents. Keeps source support map index and all nine original rules/data unchanged. Unique terminal instance keys drive relay requirements. Separate selector groups, brief/results/retry, HUD, public custom API and in-memory merit ledger prevent original progression/merit mixing. Reset/F2/difficulty changes reset flags and tactical state. Updated DESIGN, Controls, Architecture and candidate implementation status. Existing src server/package patterns already admit the script; explicit index/project/runtime/tooling checks include it.

## Chronological log

- Loaded task/prepared session in isolated branch. Existing task/session preparation changes were the only initial edits.
- Implemented runtime seam, metadata, objectives and custom/original merit isolation.
- Focused disposable fixture verifies both relay orders, missing key gates, nests/ground/transition actors, cancellation of a dead busy nest, tactical freeze, single award/replay, restart/difficulty/switching, source support eligibility, troop/tank delivery and rally.
- Full dev suite passed, including original nine objective/support/control/movement/vent/music checks and packaging/tooling diagnostics.
- Applied computer-use skill for browser attempt. Visible subagent IAB rejected; hidden IAB succeeded. Smoke found wrong initial actor sprite IDs and misleading original HUD index; fixed to Commander1/2/3/4 and Troop object IDs and CUSTOM HUD. Subsequent browser observation verified corrected sprites and tactical objective overlay. Director independently observed initial smoke issues; fixes reported. Director reloaded and independently verified corrected four-commanders/eight-soldiers sprites, CUSTOM HUD, separate selector and tactical objective overlay; full playthrough/audio/balance remain unverified.
- User's separate soldier hunt/aim issue TRI-027 remains outside this ticket.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| `node tools/dev.cjs test` | pass | Syntax, project/private package, breeding, recreation, custom scenarios, vents, music, tooling and director disposable fixtures |
| `node tools/check-custom-missions.cjs` | pass | Relay order/flags, birth/clearance/freeze, isolation, restart/difficulty, source support/rally/caps and actor identities |
| `node tools/check-custom-mission-design.cjs` | pass | Existing geometry diagnostics: 88 placement/route entries, 18 target lanes; no live balance claim |
| Live browser smoke | partial pass | [report](../playtests/2026-10-04-relay-breaker.md): custom selection/brief/HUD/sprites/tactical deployment |
| Full Normal live playthrough/audio/balance | not run | No completion time/casualties/support/birth count; no live objective-route or LOS-softlock claim |

## Unresolved issues and risks

Full live Normal mission completion remains required to establish playability/balance beyond smoke and simulation. Browser version/audio could not be verified. Accepted asset geometry is reused; no terrain redesign. No material design question pending. Original medals/progress untouched; custom state is in memory only.

## Next action / handoff

Director independently review scoped branch and tests, and either request a full live run or explicitly carry its documented limitation before squash integration. Worker stopped at Review; not merged/published. Exact checkout: `C:/Users/user/Documents/Codex/2026-10-03/he/outputs/triumph-custom-relay-breaker`. Commit is the branch HEAD with subject `Add custom Relay Breaker assault mission`; retrieve via `git rev-parse HEAD`. Director records resulting squash SHA in its subsequent checkpoint; none exists yet.

## Director acceptance checkpoint

Director independently reviewed runtime diff, passed the full suite and confirmed corrected sprites, CUSTOM HUD and tactical deployment in live smoke. Director accepted implementation with the explicit unverified full Normal playthrough/balance/audio limitation. Task acceptance is checked on that basis; all unverified live details above remain in force. Implementation commit: f3c7dc0a22ac9e940dd818898942ee33d6432736. Documentation-only acceptance checkpoint requires no new tests. Next action: director squash-integrates the accepted scoped implementation and records resulting main SHA in its subsequent checkpoint; worker has not merged or published.
