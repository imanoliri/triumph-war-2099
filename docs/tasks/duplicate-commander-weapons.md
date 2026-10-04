# Preserve duplicate commander weapon pickups

- Ticket: TRI-015; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Preserve duplicate commander weapon pickups

## Acceptance criteria

- [ ] Commanders do not consume weapon pickups matching their equipped weapon; the pickup remains usable by units who need it.

## Scope and decisions

User requested on 2026-10-04 that commanders must not consume weapons they already have. Use existing weapon identities/aliases, preserve weapon switching and commander AI defaults. Reject matching equipped-weapon pickup without removal, reward or effects; unselected commander AI should not get stuck seeking a useless duplicate. Preserve non-commander weapon behavior, reinforcement eligibility and grenades unless directly required by this fix. Add focused regressions for duplicates, switching and another collector; update current descriptions/handoff and run full checks. No asset regeneration or publication.

## Sessions

