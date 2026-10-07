# 2026-10-07 / 012 — desert-trooper-roster

- Task: [desert-trooper-roster](../tasks/desert-trooper-roster.md)
- Date: 2026-10-07 (Europe/Berlin); session012
- Branch: feature/desert-trooper-roster
- Prepared starting commit: d5cf5c074718b2e649036035bde04b038420a90f
- Actual execution base:6399c6b33ea75abfa6731654b71b83e6fee7841d (accepted reinforcement menu)
- Status: Review; worker implementation complete, not merged

## Starting context

Read AGENTS, WORKER, task, initial session and WORKFLOW. Assigned isolated checkout was on feature/desert-trooper-roster, with only prepared task modification and this untracked session. Preserved them. Director confirmed dispatch and bounded Scout-only scope; generic roster acceptance means preserve existing types/menu/deployments and update Scout guide, with no new specialist.

## Work performed

- Completed Scout dash creates a three-round volley retaining the triggering actor identity; first round emits immediately. Remaining rounds use0.06s elapsed schedule (frame-boundary emission, bounded catch-up on coarse updates), ordinary1damage/290px/s/638px projectile lifetime, 180px target eligibility and shared eight-direction lane/terrain/sight gates.
- Volley cancels for dead/removed/underground/hidden/out-of-range/off-lane targets, without substitution. Failed or terrain-aborted incomplete dash grants no counter. Existing dash38px/100px/s and2.5s evade rest remain.
- Volley briefly owns movement while preserving current/new explicit orders. Shared controller resumes afterward with ordinary0.6s rifle cooldown from last counter shot. Shared ordinary factory preserves projectile collision, acoustic event and sound behavior; no immunity added.
- Updated DESIGN, detailed Desert rules, Scout Units cadence/body and browser checklist. No controls/bindings changed. Dune Guard/Mechanic/crawler, roster/menu eligibility, Twin Crescent/Broken Wells placements and payloads, maps/objectives/pressure/assets remain unchanged.

## Chronological log

1. Director confirmed dispatch on actual menu-integrated base and clarified Scout-only acceptance.
2. Added post-dash state and explicit shared combat callback; added positive/negative production update checks. Initial fixture failures exposed paused simulation setup, counting bullets after impact and wrong test rock shape; corrected fixtures without changing gameplay for these issues.
3. Added new explicit force order during volley, incomplete/terrain-aborted dash and coarse-frame cadence checks. Elapsed schedule retains overshoot and bounded catch-up rather than accumulating frame delay.
4. Browser inspection: visible IAB is unsupported in a subagent; hidden IAB succeeded against assigned checkout loopback2073. Inspected original/Dunes Units text and actual screenshots of portrait/card wrapping. No live counterattack/audio claim.
5. Full suite passed; focused combat/rider checks rerun after final scheduler/test additions passed. No board, other checkout, assets, research, merge or publication changes.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| node tools/dev.cjs test | pass, exit0 | All83 script syntax checks and complete automated suite; original rules, all-five Dunes/variant-B routes/rosters, menu/delivery isolation, guide/sprite parity, source/music/tooling/director checks passed. |
| node tools/check-combat.cjs | pass, exit0; final rerun | Immediate first shot despite ordinary cooldown; three rounds at0/.06/.12, ordinary damage/speed/heading, trigger identity, no replacement, invalid/LOS/lane/range/terrain cancellation, retained/new order resume and coarse update catch-up. Immutable ordinary combat comparisons remain passing. |
| node tools/check-desert-riders.cjs | pass, exit0; final rerun | Partial dash retains source/no shot; new obstacle aborts with cooldown/no volley; existing guard/repair/crawler/mine contracts pass. |
| Browser UI | pass | [Actual report](../playtests/2026-10-07-desert-scout-counterattack.md): original/Dunes guide text, existing Scout portrait and readable wrapping inspected. |
| Live combat timing/audio/playability | not run | Separate verification gap; VM checks do not prove live timing, audible sound or difficulty. |
| git diff --check | pass | No whitespace errors. |

## Unresolved issues and risks

No material open questions. Live counterattack/audio observation and difficulty calibration remain unverified.0.06s is the elapsed simulation schedule; emitted projectiles become visible on frame boundaries. Counter volley briefly suspends order movement, retains orders and resumes them afterward, matching existing reactive dash precedence.

## Next action / handoff

Director independently reviews the scoped worker commit titled Add Desert Scout post-dash counterattack; retrieve exact tip with git rev-parse feature/desert-trooper-roster in this checkout. Review target identity/cancellation, ordinary cooldown restoration, elapsed cadence and newly issued order resumption. Browser report explicitly separates UI pass from unobserved combat/audio. Worker stops at Review. No squash merge performed; director records accepted worker SHA and resulting main squash SHA in its integration checkpoint.
