# Build265 — Developer Console Gate A

Checkpoint: checkpoint-before-lab265 at cce2215c13721e9005926867d5060c78beb9da57 (published Build264). No production balance or approved artwork changed.

## Audit

Browser Canvas2D game; production game.js already owns a fixed 1/60 simulation loop. F9 dashboard135 includes combat exports, Director148 telemetry, environment156/162/217/218 and Gunner173 tools. F8 shows collision/contact references. F10 compares exported playtests. Separate retained pages provide counters/weapons, grabs223, animation189, director148 and QA242. Their existence is not certification of every requested feature. No complete world snapshot/replay or generic duel/move checkpoint exists. Environment-only replay does not restore combat.

Gate A extends the same F9 dashboard. Playback265 is a scheduler/observer, not another combat controller: it calls the existing full simulation tick at 60 Hz and scales the number of ticks per wall-clock interval. No independently slowed animations, no modified damage/timings, no new character AI. All seven requested speed choices, developer pause/resume, exact 1/5/10 steps, current simulation frame and elapsed time are available in a persistent developer-only toolbar after explicit Enable playback.

Keyboard/touch and simulated controller action edges are queued to the next simulation tick while developer playback is enabled, preventing a paused action from consuming resources. Direction edges retain existing native direction admission. Ordinary pause/focus loss blocks stepping and clears queued commands. Disabling returns to the unchanged normal loop at 1×. No playback preference or balance override is saved across reload.

Up to900 detached telemetry frames are retained (15 seconds at60Hz), with logical position/displacement/HP deltas, runtime action phase/time, configured contact/total timing, target selection and paired references. Hero and selected enemy can be reviewed together. Timeline phase classification uses the existing Audit135 adapter and is labeled as such; exact authored hitbox/hurtbox/cancel/animation-frame adapters belong to Gate C. HP delta is not presented as an invented damage-event cause.

Previous-frame / scrub navigation reviews captured telemetry ONLY; it never rewinds the live simulation. Full rewind, restart current move and generic duel restart are visibly disabled with reasons. Existing isolated labs remain accessible. Section restart uses the native scene retry and warns about lost encounter/item progress. These limitations are explicit rather than unsafe object cloning or reverse physics.

F9 integration preserves the original audit pre element using a dedicated selector so the new captured-frame pre cannot be overwritten by legacy refresh. No source art/baseline migration.

## Gate roadmap and restore contract

B: registry-derived stats and measured logical movement; N/A for absent definitions. C: authored timing/contact adapters and actual multi-hit events. D: temporary damage/frame/movement overrides plus immutable approved-per-build baseline, per-value/move/character/subsystem/global resets, change indicators, undo/redo/history and safe-boundary queues. E: actual AI evaluation instrumentation, history, usage and temporary tuning. F: matched A/B conditions, presets, validation, explicit proposed-source export/approval.

Restore Defaults means current approved build values, never historical defaults. No editor or reset system is falsely exposed before Gate D. Large resets must show affected counts and require confirmation; individual values do not. Active synchronized actions must finish before queued changes. Experimental presets must not silently load after restart or overwrite approved source.

Restore Last Known Good Build is a separate privileged version-control/deployment operation, not a browser balance reset. It must select a verified checkpoint, warn what later changes may be lost and require confirmation before restoration. No stable checkpoint has been certified by this build's automated tests alone; no automatic rollback/deployment credential is embedded in the page. Prior Build264 remains recoverable through the saved Sites version and source checkpoint.

Stop after Gate A. Unsupported restoration is still an explicit limitation; do not call the whole six-gate specification complete.
