# Browser acceptance checklist

Run the loopback server, record browser/version, commit, difficulty and sample-bank state in a copy of templates/PLAYTEST.md under docs/playtests/. Mark each scenario passed, failed or not run with evidence. Never infer these results from VM tests.

## Short regression pass

1. Load Desert Canyon; start, select each commander and verify exclusive WASD ownership, German physical-key presets, mouse diagonal aiming, held fire, grenade stock/cooldown and control hints.
2. Drag/select/Shift-add troops. Single ground right-click attack-moves; double empty ground force-moves. Click/double/triple a moving bug or boundary nest: focus persists and never becomes force move. New orders replace old ones.
3. Pause. Battlefield remains visible, clock/units/projectiles freeze, selection and orders still work. Close Controls and Units: existing pause remains. Resume and verify units execute orders.
4. Flash Back: activate first terminal, unlock/open door, activate laser terminal. Double right-click usable objects sends troops there; a group toggles one door once. Closed/locked doors and intervening walls behave correctly.
5. Flash Back yellow eagle unloads a squad; bronze tank arrives on clear ground; blue aircraft enters and delivers commandos. Kill a commander: it returns after ten seconds while support/army exists. No army/support causes defeat.
6. Place at least two rally flags using top-right Rally/R; remove one with right mouse. Escape exits placement without pausing. Repeat while paused. Placement never fires/grenades. Collect yellow, bronze and BLITZ: soldiers/tanks/robots attack-move to nearest reachable flag; commandos ignore flags. Test locked door detour and player override. Delete a flag after assignment: traveling unit retains destination. Restart clears flags.
7. Inspect troop 3–6 bursts, commando 5–7 bursts/diagonal fire, tank 9–12 shots at 0.20 s with 2.5–3.5 s rest. Tank autonomous arc minimum 25°, focus arc 15°. Mounted plasma turrets: sixteen visual headings and smooth locked total 0–15° sweep, alternating burst direction; soldier/commando burst timing remains their own. Red bugs: marked sprite, 5 HP, limited sight and slower spit. Check terrain blocks sight/attacks.
8. Detonate a barrel beside friendlies and bugs. Friendlies/commanders survive blast/fire; enemies take damage and chain reactions continue.
9. Clear Desert Canyon, Desert Rocks and Retake Base after 35 s. Verify automatic victory and single reward. Flash Back additionally needs laser terminal. Hold Base needs 200 wave kills. Indoor security/Caves require their listed terminals. Final needs wave quotas plus intact extracted crystal. Record all nine mission results and Remaining values if any stalls.
10. Listen to music and tank sound, verify pause/resume/mission switching, open Units to compare descriptions with observed rules. Inspect all map backgrounds at several positions and responsive HUD/rally layout at normal and narrow window widths.

## Original comparison

When available, run the original v2.3 game and compare the same mission/track. Record discrepancies as evidence for TRI-004/005; preserve the installed executable. Custom balance and specialist units intentionally differ from the original.

## Release criteria

Automated suite green; required scenarios passed with recorded evidence; open failures classified; no live verification claims for skipped checks. A known limitation may be accepted explicitly by the user, with its scope documented.
