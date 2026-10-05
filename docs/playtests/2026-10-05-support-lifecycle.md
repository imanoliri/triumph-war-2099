# TRI-044 support lifecycle smoke

- Build: TRI-044 candidate on `chore/extract-support-lifecycle`, based on `1e866aafd06268e6dc47ae3b791b5a2dd2e1dad0`; implementation unchanged between this smoke and Review commit.
- Date: 2026-10-05 (Europe/Berlin)
- Browser: Google Chrome 154.0.8037.93; observed window 1251 x 1365 including browser chrome and open side panel.
- Difficulty: Normal (Silent Return briefing)
- MIDI bank: absent; oscillator fallback configured. No listening/audio quality claim.
- Tester: replacement TRI-044 worker via computer-use skill, ordinary UI only.
- Launch: direct candidate `index.html`, supported by SETUP.

| Scenario from PLAYTEST | Result | Mission and evidence |
| --- | --- | --- |
| Commander/mouse/keyboard | not run | Full control ownership/aiming not exercised. |
| Troop orders/focus/use | not run | No order regression pass. |
| Pause and queued orders | partial | Flash Back and Silent Return deploy into visible tactical mode with battlefield and tactical border/banner. Silent Return exits tactical mode and actors subsequently move. Exact clock/freeze and queued orders not measured. |
| Doors/terminals | not run | |
| Support/respawn | partial | Silent Return starts army4; after ordinary running screenshot shows army7 and three commandos, matching scheduled delivery outcome. Aircraft had departed before observation: precise flight timing/animation, cap retries and commander death/return not verified live. Restart returns to Silent Return briefing and army4. |
| Rally flags and excluded commandos | not run | |
| Bursts/sweeps/AI/terrain | not run | |
| Barrels | not run | |
| All nine victory requirements | not run | |
| Maps/UI/audio/manual | partial | Desert Canyon and Flash Back recovered backgrounds/actors and Silent Return custom briefing render. No audio listening, narrow responsive layout or all-map pass. |

## Failures and reproduction

No failure observed in this focused smoke. Startup snapshots were refreshed after asset loading and UI frame changes. No browser debug API, injected state or time acceleration used.

## Acceptance

Focused startup/delivery/restart smoke only; full PLAYTEST checklist remains unrun. VM immutable baseline comparisons independently cover timing, cap/retry, return, replacement and tactical sequences and do not count as live verification.
