# Universal environment — Build156

Reversible source checkpoint: `checkpoint-before-environment156`, source `db5ec85b5d5443a6dabff432ab07826a30ddc745`.

## Runtime contract

Every run owns one `Brawler.environment156`. It is independent of the per-level combat clock. No scene, original daylight/rain flag, hero, enemy, item or combat random call selects its starting conditions. New-game starts generate fresh crypto-backed seeds; numeric and text seeds are supported. Explicit developer seed restarts before Play are carried into that new run. Checkpoint retries, scene changes during a run, automatic level transitions and indoor visits retain the same environment. Game pause/focus loss stops its advancement. Time spent playing indoors still advances the outside world.

Default world day:3600 active gameplay seconds, equivalent to24 game hours in60 real gameplay minutes. Weather holds180–480 seconds, followed by a35-second smooth blend. Clock speed, timing, transition weights, initial weights and wetting/drying rates are versioned configuration. Configuration is immutable during a run; Restart applies a new configuration.

`environment156.js` is a pure simulation module:

- Dedicated integer PRNG for weather; separately hashed clock initialization and lightning. Rendering, audio noise and AI do not consume the weather stream. Thunder noise also has its own generator and does not consume AI/drop random calls.
- Adjacent weighted weather graph:Clear, Partly Cloudy, Overcast, Light Rain, Heavy Rain, Thunderstorm, Fog. No forced daytime/sunshine or night/rain relationship.
- Weather boundaries are scheduled in elapsed simulation seconds, never frame counts. Compensated elapsed accumulation plus microsecond canonicalization gives matching30/60/120FPS results.
- Ground wetness uses a fixed one-second reconstruction grid with exact exponential substep evaluation. Rain increases wetness; dry weather gradually removes it. Seeking rebuilds the schedule and wetness from the saved origin/configuration, rather than rerolling or only changing the clock display.
- Dawn, Morning, Midday, Afternoon, Sunset, Dusk, Night and Midnight have interpolated lighting.
- Script overrides have separate fade-in/hold/fade-out lifetimes; the underlying simulation always continues. Jackal's introduction uses a short temporary storm/lightning override. Indoor lab fire remains an interior story effect and is not replaced by weather.

## Existing scenery adaptation

`environment-view156.js` creates cached albedo, sky-tint and emissive layers from the existing artwork. Downtown's night sources are brightened for daylight; colored wet-floor reflections are reduced in the dry base. Financial's baked wet floor is similarly neutralized. Dynamic wetness adds bounded puddles, highlights/reflections, rain ripples and stepping splashes. Soft forest soil uses dampening, puddles and splashes rather than a broad hard-surface mirror. No movement, hit detection, collision, enemy damage, sprite size or level geometry changes.

Only visible sky subregions are refreshed; off-screen sky and floor draws are skipped. Sky tint uses multiplicative blending to preserve glass-building and skyline detail. Window, streetlight and neon emission grows at night. Foreground darkness/fog is deliberately capped to keep fighters and attack cues readable. Actor shadows change direction/intensity with time and cloud cover, from their existing ground anchors. Existing hand-authored building/canopy shadows remain part of the art; these are not physically ray-traced shadows.

All outdoor profiles, including Downtown/hotel exterior routes, Financial7–9, Uptown0–4/7, park, woods and Riverfront, use the same renderer. Interiors are identified from the existing scene metadata plus explicit hotel/lab profiles. Outdoor precipitation/fog is suppressed indoors. The lab's mapped window panes show outside darkness/rain without affecting room lighting or painting over window frames.

Future scenes participate by default unless declared interior. `UrbanEnvironment156.registerScene(id,{outdoor,forest,floor,windows})` supports explicit profiles. New background images are automatically recognized in the scoped scenery renderer, with explicit `image.environmentScenery156=true` available. Custom composite canvases should inherit `environmentSource156` from their source, as the Uptown caches now do. Future indoor window panes can use the same world-anchored profile mechanism.

No source scenery was removed/replaced/downsampled. Existing enemies, bosses, route choices, hero controls, gait, grapple synchronization and progression remain unchanged.

## Developer controls

F9:existing combat dashboard, now with the Environment section. F6:environment panel directly. The footer links to `environment156.html`, a visual/benchmark lab using the production scenery functions and renderer.

Controls include Dynamic/fixed weather and phase; seed entry/display/random generation/restart/copy; exact hour; clock pause/acceleration preview; intensity/wetness; gradual15-second forced weather transition; test lightning; Reset to Dynamic; elapsed-time reconstruction; day length/weather timing configuration; rendering quality, particle amount and reduced flashes; save/load and replay JSON export/import.

Weather/time overrides are temporary. A seek is a detached preview:the real underlying world continues, and autosaving saves that underlying world. Reset to Dynamic returns to its current state without rerolling. Only an explicit simulation restart replaces its seed/configuration. A clock preview can be frozen/accelerated while the underlying saved clock continues normally. Pausing gameplay freezes both.

Reports show seed, world time/phase, elapsed seconds, from/current/previous/next weather, scheduled boundary, transition, intensity, wetness, RNG state/schedule index, overrides, scene profile and render cache information.

## Save and reproduction

The browser autosaves the **environment** every5 active seconds and on pause/page exit. “Continue Saved World” restores it when starting the selected scene; it is not a new full-combat-position save system. Existing scene/retry progression remains in place.

`g.saveEnvironment156()` returns a versioned complete underlying environment; `g.loadEnvironment156(data)` restores it. The payload contains seed, immutable configuration, initial origin, world time, elapsed time, weather/intensity, transition boundaries/progress, next state/intensity, wetness at the completed second, fractional wetness, RNG state/index and scripted overrides. Loading reconstructs the deterministic state from the saved origin, avoiding stale scheduling artifacts.

“Export Replay JSON” additionally includes developer overrides and render settings. Import can reproduce that preview; reduced-flash accessibility preferences are never weakened by import. Reliable reproduction requires the seed, origin/configuration, elapsed seconds and matching scripted/developer/render overrides. Seed alone does not reproduce an arbitrary later visual state.

## Performance and accessibility

Rain uses one160-slot typed-array pool with analytic positions. Low/Medium/High caps are48/90/160 before intensity/particle multipliers. There are no per-drop objects or frame-loop RNG calls. Derived scenic layers are cached with an LRU budget of128MiB. Sky/cloud cache samples use canonical quarter-second positions so matching elapsed times do not depend on render history. No full-scene pixel reads occur after an asset's first preparation.

Browser warmed CPU rendering,180 animated frames, maximum wetness/intensity and High quality:

- Financial midnight/thunderstorm:median2.40ms,p953.70ms.
- Deep woods2× canvas backing/midnight storm:median1.00ms,p951.70ms.

These measurements exclude browser compositing/presentation and are not certification of60FPS on every device. Cold cache preparation occurs when new scenery is first encountered; it is separate from the warmed figures. Low quality/particle reduction controls are available. Lightning flashes are bounded, with a persistent reduced-flash option and reduced-motion suppression. Physical DualSense/hardware performance testing is not claimed.

## Verification

- `node tests/environment156.cjs`:random starts, numeric/text seeds, same/different sequences, exactly matching30/60/120FPS progression at1020s,24-hour clock, seek/save/load/replay, transition-state continuation, private RNG, scripted return, temporary clock/forced-weather/lightning controls. Full24-hour environment seek ~7–12ms in the Node test runtime.
- `node tests/environment-integration156.cjs`:all four heroes have identical combat/score/position/AI-RNG results under weather vs the pre-environment chain;16 mirrored/lane grapple and grab-special comparisons; pause/indoor continuity;22 scene classifications; run/level/reset reference persistence.
- `node tests/current150.cjs`:26 compatible current-contract combat/controller/director/grapple/route regressions; focused full-chain fixtures now include the environment integration.
- Browser combination audit:1132 rendered cases, comprising20 outdoor scene starts ×7 weather ×8 phases plus12 indoor starts under a storm; zero rendering exceptions or failed scenery preparations.
- Browser:daylight Downtown, Financial midnight rain, Uptown dawn fog, high-resolution deep-woods storm, dry lab interior with continuous outside simulation; hero readability; seed controls, temporary seek/reset and save/load. Visual fixtures remain available for additional combinations.

No global enemy health/damage/aggression adjustments, excessive invulnerability, weather-based slipping or movement penalties were introduced.
