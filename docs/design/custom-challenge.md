# TRI-034 measured custom pressure

Base profiles retain pre-TRI-034 data. Hard and Very Hard use explicit custom parameters; original campaign, collision and combat rules are unchanged.

| Mission/profile | Initial noncommanders before → after | Finite waves before → after | Live nests before → after |
|---|---:|---:|---|
| Relay Hard |8 →6|0 →24|5–9s divided by25/24 →3s|
| Relay Very Hard |8 →4|0 →48|5–9s divided by27/24 →2.4s|
| Convoy Hard |11 →7|26 →80|none|
| Convoy Very Hard |11 →5|26 →120|none|

Both retain five-troop carrier support and plasma; Hard/Very Hard omit tank support. Waves reuse existing clear coordinates; no terrain or hotspot addition. Relay finite queue adds a cleanup obligation after nests are destroyed, visible in Remaining and briefing. Convoy all four approaches attack at8,30,54,78,100s; actual half-second emission can defer under cap.

Run `node tools/check-custom-challenge.cjs --record` to reproduce [logs](custom-challenge-evidence.json). Seed34, actual runtime update(.02), 180 simulation seconds, default autonomous commanders/troops; no manual orders or shooting. AI does collect nearby support. This deliberately stationary combat probe measures sustained pressure and attrition, not tactical player skill or balanced difficulty.

At120s, Relay Hard active bugs38→50, army14→11; Very Hard bugs43→50, army11→6. At180s, final Relay armies13→9 and10→5, with finite queues still awaiting8/15 arrivals under cap. Destroy nests early to stop their competing supply. Convoy at120s active bugs11→35 (Hard),10→50 (Very Hard); surviving armies16→9 and15→4. At180s armies16→9 and14→4; kills24→61 and22→90. Hard emitted all80 by120s; Very Hard had114/120 emitted at120s and all120 by150s. Before Convoy waves finished by90s. Higher enemy counts do not by themselves prove a satisfying or achievable human challenge.

Regression command without --record verifies all profile budgets, traversable existing hotspots, cap queue retention/drain, pending-arrival victory gates, restart reset, fixed nest cadence and original Hold Base200-kill isolation. Existing map route/LOS/support tests remain relevant. [Browser record](../playtests/2026-10-05-custom-challenge.md) separates observed live results. Human tactical victory/casualty/support/time calibration across both Hard/Very Hard remains unverified.
