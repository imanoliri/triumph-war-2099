# Limited commander and tactical-mode browser playtest

- Date: 2026-10-04 (Europe/Berlin)
- Tester: director /root
- Browser: Codex in-app browser; engine version not exposed by available browser tools
- Viewport: default 1265 by 712 during tactical inspection; temporary 390 by 844 responsive check, restored afterward
- Difficulty: Normal
- MIDI bank: worktree fallback; no audible acceptance claim
- Builds: commander worker d7cef2e (main squash 766607c); tactical worker b13c96a (main squash 03f75fc), containing attack-move squash c8c4d5e

| Scenario | Result | Evidence |
| --- | --- | --- |
| Commander default / selector toggle | pass, limited UI | Fresh briefing all selectors unpressed; troop-control hint. Commander 4 button activates only its selector/orders; clicking again restores troop mode. |
| Tactical start / restart / mission selector | pass | Desert Canyon Start and restart+Start enter pressed Exit tactical mode state. Flash Back selected and started also enters tactical mode. |
| Visor / notice | pass | Screenshot inspection shows cyan outer glow/frame, green corner brackets, prominent two-line TACTICAL MODE banner. Exit removes visor and changes button label. |
| Frozen queued movement | pass, limited smoke | Selected soldier stayed at initial position with selection ring and right-click destination marker while tactical. Space exits; next inspected screenshot shows that selected soldier advanced along its route and simulation moving. |
| Controls / Units restoration | pass | Open/close each while tactical retains Exit tactical mode pressed state. |
| Narrow responsive UI | pass | At 390 by 844, map/frame stays contained, controls wrap, Exit tactical mode button remains readable. Canvas banner naturally scales with battlefield. |
| Live eagle/turret priority mechanics | not run | Covered by VM regressions, not this browser session. |
| All-nine live completion / balance / audio | not run | Requires comprehensive PLAYTEST pass; no inference from simulation checks. |

## Acceptance

Limited requested UI and queued-order smoke accepted. Broader gameplay, eagle/turret live balance and audible matching remain unverified. Automated full suite independently passed for all three tickets; simulation evidence is separate from this browser record.
