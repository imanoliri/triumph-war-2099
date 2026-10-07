# TRI-072 director browser check

- Date: 2026-10-07, Europe/Berlin.
- Build: implementation candidate in feature/reinforcement-composition-menu; final reviewed worker SHA will be recorded in integration handoff.
- Tester: /root; Codex In-app Browser (inventory id2), hidden tab; exact engine version not exposed.
- Loopback server: candidate checkout, port8372. Shipped audio fallback; audio not tested.

## Observations

1. Started Desert Canyon through normal UI; mission deployed paused in tactical mode.
2. Opened Reinforcements. Two independent groups, five Ground squad slots and five Air pattern slots, offered only Infantry and Commando for original mission roster. Menu explains repeating air pattern, variable actual arrival count and immutable inbound deliveries.
3. Changed Ground slot1 to Commando and Air slot1 to Infantry through visible controls; saved. Menu closed and tactical indicator changed to unpaused.
4. Reopened menu: separate edited values persisted. Scrolled between heading and action buttons; controls remain reachable.
5. Closed without changes: returned to unpaused game. Switched to Whiteout Signal and started it normally; reopened menu. Ground default Infantry and Air default Commando restored; legal options are Infantry, Snow sniper and Commando, excluding Desert types.

Actual screenshots: [menu controls](2026-10-07-reinforcement-menu-director.png), [menu heading](2026-10-07-reinforcement-menu-director-top.png).

## Limits

Live UI save/persistence, mission reset, roster options and automatic resume observed. Actual configured eagle collection/delivery, flight patterns and inbound immutability are tested in disposable VM fixtures, not observed in this browser check. No live campaign completion, difficulty calibration, audio or hardware claim. Worker browser surface was separately unavailable; director observation does not rewrite that evidence.
