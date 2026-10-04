# 2026-10-04 / 015 — eagle pickup fix director

- Task: [eagle-pickup-fix](../tasks/eagle-pickup-fix.md)
- Branch: main
- Status: in progress

## Chronological log

User reported seemingly random rendered reinforcement eagles not collectible. Clarified: thinks all missions, regardless of commander or soldier; no color specified. Approved bounded bug ticket TRI-012 and dispatched existing worker /root/commander_worker in isolated ../triumph-eagle-pickup-fix, fix/eagle-pickup-fix. Preserved unrelated assets/provenance.json modification; used equivalent manual worktree/session creation because helper refuses dirty director tree.

Director audited all nine initial support choices. Hanger global15=16 has no eligible Ground Support rule. Independent disposable VM probe on unchanged main: mission6, t2, pickups empty, spawnPickupRoll(9) creates a tank/bronze eagle; pickup(commander,eagle) returns false. Initial placed reinforcement eagles in all nine missions were eligible at initial population. Indoor direct-Troop support rules reject at population cap50. These deterministic failures do not establish the full breadth of user report.

Worker confirmed recovered Hanger creation group67620 omits support guard while collection group7096 requires global15<16. Approved shared eligibility gating for new random support eagles, preserving source rules/data/caps; concise availability feedback for existing temporarily unavailable eagles, preserving them until eligible.

## Verification

Pre-fix Hanger reproduction confirmed in disposable VM. Implementation checks/browser evidence pending. No full live gameplay/audio claims.

## Next action / handoff

Review worker final diff/commit/checks; independently verify actual reproduction and all-nine eligibility regressions, plus live feedback smoke if available. Squash-merge accepted fix, then record resulting SHA in subsequent administrative checkpoint. No publication authorized.

User subsequently confirmed: 'yeah, it seems to be population cap!' Prioritize clear temporary availability feedback and retain capped existing eagles until troop numbers drop. Cap unchanged.

User also requested tactical mode not pause music. Approved separate TRI-013 tactical-music, queued Ready after TRI-012; one worker remains active.

User reported closed-door room pathing wall-shortcut stalls. Approved separate TRI-014 closed-door-pathing, queued after TRI-013. Preserve locked doors and source coordinate conventions.

User requested commanders leave already-equipped weapon pickups. Approved TRI-015 duplicate-commander-weapons, queued after TRI-014; preserve existing weapon identities and other collectors.

User requested mounted plasma cannons always fire in16 directions independent of operator. Approved separate TRI-016 plasma-cannon-directions, queued after TRI-015; unmounted asymmetry preserved.
