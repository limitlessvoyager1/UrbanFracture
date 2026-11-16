# Dynamic environment upgrade — Build229

Checkpoint: `checkpoint-before-environment229`, source `8e8a9b4f5cb13df743985249a1ec5eb9b1d3cc30`. No level geometry, combat data, enemy admission, camera boundaries or controller mappings were replaced. This release also contains the previously completed Orion228 rebuild; its interrupted publication had not created a saved version.

## Active ownership

Environment156 remains the sole seeded clock/weather scheduler and save/replay owner.217 adds shared temperature/wind sampling and persistent display preferences.218 partitions precipitation using actual Fahrenheit temperature, integrates wind drift/snow cover on the existing deterministic clock, and supplies the active lightning implementation. View156 owns the single production precipitation pool; the old218 standalone flakes helper remains compatibility-only and is not called by the game renderer. Controller162 supplies existing/future scene metadata. No additional weather clock, combat controller or level state machine was introduced.

The registry now contains18 conditions and21 distinct pixel icon variants. Rain and snow have light/moderate/heavy densities; Wintry Mix is a true simultaneous phase. Snow is always excluded at32°F or above. Near-freezing mixed precipitation changes continuously; stable weather classification uses the existing one-second integration clock with a two-second candidate hold. Legacy transition graphs gain intermediate cloud/rain/snow/storm states. Small blends use45s, heavier blends60s, storm weakening75s and rain/snow changes120s where applicable. Explicit developer transition durations remain available.

The HUD is centered in its own upper-middle region, with temperature, inline icon/name, wind, and time. The score/charge block moved right to make room; HP and enemy bars retain their positions. Existing Settings and saved preference keys remain authoritative. Hiding either HUD group does not affect simulation.

Wind uses smooth seeded direction and gust signals with integrated drift, avoiding particle jumps when speed changes. The fixed8KB precipitation pool has512 slots, three depth groups, foreground combat exclusion and reduced distant detail under rendering pressure. Rain ripples/wet reflections, snowfall/melt and conservative ledge/foliage masks are retained. Fog/mist drift behind combatants. Lightning intervals are25–50s /15–35s /8–20s for light/moderate/severe storms, with delayed once-only thunder. Audio uses one shared ambience loop and seeded procedural thunder variations, not downloaded recordings; indoor ambience is muffled. Reduced-flash/motion controls remain in force.

F6 retains the existing developer dashboard and adds cloud/storm/snow controls, thunder testing, exact simulation diagnostics and immediate numeric override updates. Player saves omit preview effects; replay exports retain them. Reset to Dynamic restores underlying snow/wind state. Regional save continuation preserves weather RNG, climate, allowed-weather rules and integrated wind position.

## Future-level configuration

Use the existing level `environment` object or registered profile. Supported metadata includes `outdoor`, `floor`, `windows`, `climate: {offsetF}` or `{minF,maxF}`, `allowedWeather`, `windExposure`, `windObjects`, and `runoffSurfaces`. Climate ranges are approached gradually rather than causing an instant temperature jump. A wind object supplies world x/y, a segmented image or draw callback, anchors, flexibility and optional phase. Runoff surfaces supply world x/y and width. Reuse Controller162 and View156; do not create a level clock or precipitation system.

## Verification and limits

Passed: environment156/162/217/218; environment229 model/HUD/integration; all six heroes' weather/HP/geometry/pause/thunder checks; Orion228; full prison224 campaign plus current combat, universal-grab, locked/adaptive encounter, weather and controller regressions; standard/raw Sony/DSX gamepad suites. Tests cover18 states,21 unique icons, strict freezing, mixed phases, reversible overrides, deterministic30/60/120Hz progression, regional save/load continuation, exact unit/noon/midnight conversions, persistent preferences, HUD independence and bounded particle density.

Browser inspection: actual game light rain/HUD; production inspector moderate rain, heavy nighttime snow, Wintry Mix, laboratory window exclusion and immediate temperature overrides. On this remote browser,180 full-render CPU frames measured moderate rain6.6ms median/12.7ms p95 and heavy snow5.2ms/10.6ms; precipitation alone averaged approximately0.16–0.32ms. These numbers exclude compositor/presentation and are not a hardware FPS guarantee.

Build230 completes the baked-scenery preparation follow-up. See SCENERY230.md for separated foliage/branches/flags, source-space runoff edges and sky mattes. Closed-canopy areas intentionally retain occlusion. Physical controller hardware and full human listening/hardware FPS acceptance remain separate.
