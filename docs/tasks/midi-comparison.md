# Audible MIDI comparison

- Ticket: TRI-004; state in [local board](../BOARD.md).
- Branch: not started

## Goal and user-visible outcome

Audible MIDI comparison

## Acceptance criteria

- [ ] Compare original/recreation tracks with local bank; document envelope/controller differences; verify any changes by listening

## Scope and decisions

Backlog proposal. Agree bounded scope and verification with the user before Ready. TRI-003 is an umbrella; split into one system per approved task before execution.

## Sessions

## Autonomous mandate — 2026-10-05

User authorized queue execution with logged decisions. Compare original/recreation MIDI playback using the existing machine-local optional bank, with recovered track/controller/envelope evidence. Never upload the ignored bank or modify the original installation. Actual listening is required by this ticket; mock scheduler checks, waveforms and playback-start UI alone cannot complete audible comparison. First verify allowed original launch/audio capture/listening capabilities. If unavailable, preserve research and log the exact blocker and next action; do not silently replace the listening requirement with simulations or claim audible verification. Any proposed synthesis fixes need a separately reviewed bounded child ticket with listening evidence.

