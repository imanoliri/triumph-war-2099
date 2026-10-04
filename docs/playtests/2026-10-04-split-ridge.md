# Split Ridge browser smoke — TRI-032

- Date: 2026-10-04
- Build: final TRI-032 branch changes; before scoped commit
- Browser: Codex in-app Chromium (version unavailable); approximately 1266x714 viewport, vertically scrollable game
- Difficulty: Normal
- MIDI bank: absent; fallback available, audio not listened to
- Tester: worker; director independent smoke reported separately

| Scenario | Result | Evidence |
| --- | --- | --- |
| Custom selection/brief/tactical start | pass | Split Ridge briefing, exact visible western formation, custom HUD/visor, no source baked actors |
| Final terrain rendering | pass | Reload after final generator/mask changes; irregular sand/rock art and actor scale coherent |
| Northern troop movement | pass, partial | Drag selected five soldiers and right-clicked northern relay approach; selected squad physically arrived at northern front |
| Eastern/southern approach | pass, partial | Right-click toward bronze; selected squad arrived near southern support position after moving east of ridge |
| Support delivery | pass, partial | Actual source tank appeared in western staging; live army grew from infantry support. No live full tank circuit/rally proof |
| Full Normal completion and relay interaction | not run | No time, casualty, birth-count or victory claim |
| Audio, full control regression/all originals | not run | Unchanged behavior is covered by VM suite, not this browser smoke |

Final art/deployment: [tactical screenshot](artifacts/2026-10-04-split-ridge-tactical.png).
Earlier live troop/support evidence (prior cosmetic facet refinement): [live screenshot](artifacts/2026-10-04-split-ridge-live.png).

Director independently observed custom terrain, four commanders/eight soldiers, two relays/nests, CUSTOM HUD and tactical visor, and reported a squad reaching the northern relay. Southern use-route review ongoing when worker prepared Review; not asserted complete here.

Awaiting director review, with full live Normal completion/audio/balance explicitly unverified. Actual physical formation/carrier/rally/tank circuits and both relay orders passed disposable VM checks on compiled custom mask, separately recorded in session047.
