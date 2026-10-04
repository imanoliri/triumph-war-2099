# Keep music playing in tactical mode

- Ticket: TRI-013; state in [local board](../BOARD.md).
- Branch: `fix/tactical-music`

## Goal and user-visible outcome

Keep music playing in tactical mode

## Acceptance criteria

- [x] Entering or starting tactical mode freezes simulation without pausing music; switching missions and audio controls retain their normal behavior.

## Scope and decisions

User explicitly requested on 2026-10-04 that tactical mode should not pause music. Decouple gameplay freeze from music pause in the dependency-free runtime. Music continues through tactical startup/toggles and tactical Controls/Units dialogs, subject to normal browser gesture/audio restrictions. Preserve mission track switching, synthesis scheduling, volume/mute behavior if present and gameplay freeze. Add relevant audio/gameplay regressions and current descriptions/session handoff. Do not modify decoded tracks or regenerate assets. No publication.

## Sessions


- [2026-10-04 / 016](../journal/2026-10-04-016-tactical-music.md)
- [2026-10-04 / 017](../journal/2026-10-04-017-tactical-music.md)
