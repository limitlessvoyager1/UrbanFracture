# Environment HUD217
Checkpoint: checkpoint-before-environment217 (build216).

Settings in the game toolbar; pause + L1 opens with DualSense (also L1 before starting). D-pad up/down chooses, left/right changes, Cross cycles/confirms, Circle/Options returns. Keyboard Tab/Shift-Tab and native arrow keys select; Escape returns. Focus stays in the modal. Gameplay remains paused while editing and returns to its previous pause state.

Defaults: Fahrenheit,24-hour,weather on,time on. Validated environmentHUD object under urban-fracture-player-settings retains unrelated settings. Legacy/malformed/missing values safely default. Display values do not enter the Environment update or save/load state. Wind remains mph independently of temperature units.

Shared Environment.effective now exposes seeded analytic temperatureF,windMph,windDegrees (meteorological FROM),windGust,windGustDuration,windDrift. No combat RNG or new update loop. Seed/elapsed and weather reconstruct them across legacy save/load and seek. Developer temperature/wind overrides remain temporary and replay-exportable; Reset to Dynamic clears them. Existing daySeconds3600,weather scheduling/blends,wetness,indoor suppression,lighting and combat remain intact. Rain lean/drift and compatible sky clouds use shared wind. Sun/moon rendered inside masked sky regions and template sky, behind scenery. Small weather HUD icons support day/night and distinct rain/storm/fog.

HUD column405 on960-wide canvas between HP readout and combat status. Score/charge/blitz column moved to540. No added panel. Weather-only omits clock; time-only vertically centers; both off draws nothing.

Tests: reports217/tests.txt. Manual browser checked settings defaults,Celsius/12h changes and active gameplay. Hardware DualSense was unavailable; native mapping regression tests pass. Pixel-art foliage baked into flat backdrops remains static; articulated foliage was not fabricated. Existing richer per-level scenery remains preserved. This update does not claim a complete re-authoring of all foliage assets.

Three old developer pages now use the shared review loader to remain under the deployment archive cap without reducing art resolution.
