# Orbital Scrapyard specialists — 2026-10-09

- Ticket: TRI-086; branch `feature/orbital-scrapyard-trooper-roster`.
- Browser/version, difficulty, sample bank: not run / not observed.
- Result: **not run**. No matching Orbital runtime mission or browser fixture is introduced by this bounded ticket. Live Units portraits, placement UI, mine timing/effects, impact audio and playability were not observed this session.
- Disposable VM coverage: `node tools/check-orbital-troopers.cjs` exercises production placement controls, orders, runtime walk/plant/arming/reset, support arrivals/menu filters and weapon collision. `node tools/check-unit-guide.cjs` checks recovered sprite plus authored-mark drawing command parity. Neither is browser acceptance.
- Next live check: opt into the exported Orbital roster and optional `mineLayers` / `breachers` fields in a disposable browser fixture; inspect Units portraits, four inventory marks, Place mine label, tactical placement/cancellation, walking/arming/trigger effects, off-lane aiming/terrain/reload, no wall or locked-door breach, and original crawler/barrel behavior. Record browser/version and actual observations separately.
