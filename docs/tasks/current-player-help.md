# Synchronize player help and playtest expectations

- Ticket: TRI-048; state in [local board](../BOARD.md).
- Branch: `chore/current-player-help`

## Goal and user-visible outcome

Synchronize player help and playtest expectations

## Acceptance criteria

- [x] Correct stale displayed mission pressure and tank-rest descriptions against accepted runtime; preserve behavior and clearly distinguish original/custom rules

## Scope and decisions

Approved bounded autonomous queue maintenance; director dispatched TRI-048 after accepted TRI-047. Review evidence is recorded in the linked session.

## Sessions

## Bounded evidence — 2026-10-05

Director live Controls modal on final accepted-plus046 preview still says Relay Hard/Very Hard adds24/48 arrivals, but TRI-037 profiles now total33/44. PLAYTEST step7 still says tank rests2.5–3.5s, superseded by accepted TRI-0283.5–4.5s. Audit displayed Controls/Units, mission brief summaries and PLAYTEST expectations for these accumulated accepted changes; correct factual stale copy without gameplay/balance changes or broad UI redesign. Distinguish original profiles, custom intervals and explicit verification gaps. TRI-046 owns related new original-profile guide updates; inspect merged result to avoid duplicating that work. Include concise live DOM evidence and applicable copy/recreation checks; no new screenshots or asset generation required for pure text edits. Execute after047. User autonomous queue mandate authorizes bounded fix.
- [2026-10-05 / 031](../journal/2026-10-05-031-current-player-help.md)
