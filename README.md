# Triumph! War 2099 — fan recreation

A local browser recreation using art, maps, sounds and MIDI recovered from the user's installed version 2.3 game by Anthony Lopes / DarkSun Games. The JavaScript engine and AI are reconstructed; the original editable MMF project has not been found. Original assets retain their authorship and no new asset license is granted.

## Run

Node.js 20+ and a desktop browser. No npm install is required.

```text
node tools/dev.cjs doctor
node serve.cjs
```

Open http://127.0.0.1:2099, or open index.html directly. The preview server is read-only and binds to loopback.

## Play

- All four commanders default to AI and missions start in troop control. Select Commander 1–4 explicitly (click again or select troops to return to troop control); WASD moves that commander. Hold left mouse to aim/fire, right mouse to grenade. V fires, B chooses a keyboard squad order. Physical keys support German QWERTZ.
- Drag selects troops; Shift adds. Right-click ground attack-moves, double right-click empty ground force-moves, enemy clicks focus attacks, double right-click usable objects travels/activates them.
- Missions deploy in tactical mode with a blue-green visor and prominent banner. Space/Escape or the Tactical mode button toggles the frozen simulation. Selection and orders remain usable and execute when you exit tactical mode.
- Top-right Rally button or R toggles flag placement. Left-click clear ground places, right-click removes, Escape exits. Yellow/bronze/BLITZ soldiers/tanks/robots use the nearest reachable flag; commandos are excluded.
- Units shows health, damage, burst behavior and descriptions. Remaining shows mission requirements. Enter starts/advances, F2 restarts.

Regular infantry is deliberately cardinal-only; commandos use eight directions, mouse-controlled commanders arbitrary angles, bugs a facing cone. Current balance and all mission requirements: [DESIGN](docs/DESIGN.md). Full key presets are available in the in-game Controls panel.

## Develop in fresh chats

Start with [WORKFLOW](docs/WORKFLOW.md), [STATUS](docs/STATUS.md) and the chosen task. Repository instructions are in [AGENTS.md](AGENTS.md).

```text
node tools/task.cjs start feature/example-feature
node tools/task.cjs session example-feature
node tools/dev.cjs test
node tools/dev.cjs package
```

The task helper creates branch instructions and chronological journals named `YYYY-MM-DD-NNN-feature-name.md`. Browse [journals](docs/journal/README.md) by date, or use each task’s session links to follow a feature; every journal includes a handover. [SETUP](docs/SETUP.md) covers worktrees, Python/image recovery, optional local MIDI samples and packaging. [ARCHITECTURE](docs/ARCHITECTURE.md) explains module boundaries. [BACKLOG](docs/BACKLOG.md) tracks pending work; [PLAYTEST](docs/PLAYTEST.md) defines browser acceptance.

## Verification and provenance

Automated checks use mocked canvas/audio and cannot establish live graphics, audio fidelity or balance feel. Check [STATUS](docs/STATUS.md) and recorded playtests for actual verification. The reported mission-completion issue remains pending live reproduction despite all nine simulation completion checks passing.

995 sprites, 623 object definitions, nine gameplay maps, 62 PCM sound effects and 14 MIDI tracks are included. The generated Windows sample bank is machine-local and ignored; default packages use fallback synthesis if it is absent. See [PROJECT](PROJECT.md), assets/provenance.json and research/ for authorship and recovery evidence.

Local main preserves the accepted playable milestone; individual branches carry new work. Accepted task branches are always squash-merged into main as one commit per task. GitHub publication state/visibility is documented in STATUS. No publishing is implied by local commits.

[DEVELOPMENT-NOTES](DEVELOPMENT-NOTES.md) is chronological history. The [archived prototype README](docs/archive/README-prototype.md) records early details, some superseded by DESIGN.

Director coordination: [local board](docs/BOARD.md), [director instructions](docs/DIRECTOR.md), [worker instructions](docs/WORKER.md).

Reinforcement eagles use mission support eligibility. Random eagles only spawn when currently usable; existing temporarily capped eagles remain and show TROOPS FULL · WAIT FOR SPACE until troops are lost. SUPPORT UNAVAILABLE marks a missing applicable mission support rule.

Music continues during tactical mode and Controls/Units dialogs after the browser audio gesture unlock. Gameplay freeze does not change the music pause state; explicit audio API controls and mission track selection remain independent.

Custom selector scenarios: Relay Breaker assaults four breeding nests on custom Split Ridge terrain, activates two relays and clears all enemies and scheduled flank arrivals through northern/southern approaches and an eastern connector. Last Convoy defends Hold Base terrain for 120 simulation seconds, then clears four initial bugs and 26 finite scheduled arrivals while retaining a living noncommander. Silent Return reuses Flash Back terrain: unlock access, activate the laser, and extract every living ground human with a noncommander after all support has arrived; three nests sustain pressure, and three north-entering aircraft at 20 simulation seconds each drop a friendly commando along the central vertical line. Bring these arrivals home too; enemies and nests may remain. All five difficulties have custom pressure profiles for Relay and Silent. Tactical planning freezes the clock; restarting resets the scenario. These custom scenarios have separate merits from the original campaign.

Beneath the Dunes is selectable under Custom scenarios: repair one of two disabled Desert Rider crawlers to6HP, then escort it within110px along its crescent to eastern extraction. Both destroyed, or loss of all mechanics while every remaining crawler is disabled, fails rescue. Difficulty restarts preserve scenario identity. See [mission rules and initial tuning](docs/DESIGN.md#beneath-the-dunes-tri-036) and [live verification limits](docs/playtests/2026-10-05-beneath-dunes.md).
