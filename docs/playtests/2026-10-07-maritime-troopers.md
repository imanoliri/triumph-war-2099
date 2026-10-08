# Maritime specialist browser inspection — TRI-076

- Build: feature/maritime-trooper-roster working tree based on17c185d794c1810fd10ad1bce204dd8a9a462cf1; final implementation commit is recorded in recovery session 2026-10-08-001/Git history. Initial screenshots precede one-pixel collision refinement; final portraits captured after final source reload.
- Date:2026-10-07 (Europe/Berlin).
- Browser: Codex In-app Browser; engine/version not exposed; viewport1265x712.
- Difficulty: Normal. No ignored MIDI bank generated; fallback available, audible playback not verified.
- Tester: implementation worker via computer-use UI, loopback127.0.0.1:2106.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Maritime ground/air menu | pass | All ten slots offer Infantry/Suppressor/Grenadier/Commando. Saved Suppressor in ground1 and Grenadier in air1. [Menu screenshot](2026-10-07-maritime-menu.png). |
| Units portraits/descriptions/context | pass | Distinct navy ammo-band Suppressor versus teal amber-launcher Grenadier; actual rendered recovered frame. Final reload shows eight-direction Grenadier alignment and correct ranges/damage/reload. Context8 starting infantry,4 nests,48 finite arrivals; specialist capacity text includes Maritime. [Portrait screenshot](2026-10-07-maritime-portraits.png). |
| Initial runtime appearance | pass | Harbor deploy shows both specialists at the first two replacement coordinates, preserving original troop sprite registration. [Start screenshot](2026-10-07-maritime-start.png). |
| Live runtime progression | pass, limited | Scene resumed through UI while worker performed other checks; next observation showed MISSION COMPLETE, merits228 and living actors. [Observed completion](2026-10-07-maritime-live.png). Default AI with saved future composition; no controlled commander/troop play. Exact elapsed time, combat sequence and support collection were not observed; no difficulty calibration claim. |
| Controlled stop/refresh/attacks, burst cadence and grenade projectile/blast timing | not run live | Production VM tests cover mechanics; no controlled live encounter/timing observation. |
| Specialist focus/use/follow/force and actual carrier/air landing/cap | not run live | Production VM paths pass; live manual control/delivery acceptance remains a gap. |
| All profiles, human completion, audio, physical German keys | not run live | Normal automatic scene only; hardware/audio/human balance unverified. |

## Acceptance

UI/portraits/start and one automatic live completion observed; detailed mechanics and other-world isolation remain simulation evidence. Awaiting director review with listed live gaps. No original-game research, asset regeneration or publication.
