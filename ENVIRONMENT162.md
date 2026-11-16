# Automatic outdoor-level environment architecture — Build162

Checkpoint: checkpoint-before-environment-template162 at aa256e6608af74e41a2f8374a519b99401ec42f5. Park161 lighting/casual-visitor/night-crowd work was committed and pushed before this extension. No implementation restart.

## Integration contract

`environment-controller162.js` wraps the central scene lookup used by simulation and rendering. Every previously unseen scene auto-enrolls on its first tick/render. Level metadata (`id`, `outdoor`/`indoor`/`interior`, `geometry.floor`, optional `environment`) is honored; otherwise the existing outdoor defaults apply. New definitions made with `EnvironmentController162.defineOutdoor` register immediately. Neither enrollment nor entering a level replaces the run's Environment object, seed, weather schedule, intensity, wetness, elapsed time, or transition progress. Existing reset/hero/scene continuity and saved-state APIs remain authoritative. New levels never instantiate their own clock or consume combat randomness.

`templates/outdoor-level162.js` is the reusable authoring template. Supply geometry metadata, visual art and world-space assets, and enter it alongside the ordinary gameplay scene loader. The main game renderer recognizes the template automatically. Geometry/collision/enemy/progression data remain the responsibility of the existing scene loader; the environment template does not replace the gameplay engine.

`outdoor-template-view162.js` supplies standard semantic sky/clouds, shared ambient lighting, rain/fog, wetness, actor shadows and environmental audio. It reuses156's bounded particles, cache, shared lighting/time/weather and wetness. Declarative streetlight/window/puddle/reflection assets respond to night/rain/wetness. Future transparent skies and explicit light assets avoid heuristic segmentation of painted buildings or water. Existing artwork keeps its current adaptations. Rain/fog/wetness effects and outdoor ambience stop inside; the simulation continues. Sound follows the existing Sound toggle and pause state. A single pooled filtered-noise audio buffer per AudioContext uses a separate deterministic PRNG. Existing centralized thunder events remain intact. Audio initialization failure is isolated and cannot stop combat polling/rendering.

Existing F6/F9 developer overrides, replay/seek, save/load, seed/configuration and Reset to Dynamic remain unchanged. The environment dashboard now includes controller registration/layer/validation diagnostics. Missing required layers, invalid floor configuration, missing template scenery or invalid asset metadata issue deduplicated console warnings. Runtime developer diagnostics expose the issues without player-facing interruption.

## New sample level

`dist/environment-template162.html` / `environment-sample162.js` define **Observation Terrace**, a new outdoor test level with a shelter. It uses only the template plus art/asset metadata, not its own weather/time simulation. Its developer controls demonstrate outdoor → shelter → outdoor → existing park continuity, pause, advancing simulation time, weather/time overrides, responsive lights/puddles/reflections and missing-layer warnings. This isolated test page does not write saved-world storage or alter campaign progression. It intentionally uses simple diagnostic scenery, not replacement campaign artwork.

Browser verified: sample starts in the current shared seeded environment with every layer registered; shelter suppresses precipitation while elapsed time advances by60seconds; returning outdoors retains the same seed/weather/intensity and `sameWorldObject:true`; the missing-rain fixture reports `Missing environment layer: rain`. Existing midnight park was visually checked after161: no lake/sky rectangle, uniform soil lighting, opaque casual standing visitor.

## Tests

- environment162: automatic unknown-level enrollment; explicit future indoor/outdoor metadata; same object/seed/full saved state and active weather transition across entry; indoor clock progression; temporary overrides excluded from saves; deduplicated validation; identical30/60/120Hz progression without combat Math.random; pooled audio and indoor/mute silence.
- environment156: deterministic seeds/seek/replay/save/load,24-hour cycle, frame-rate independence and temporary override controls.
- environment-integration156 (now including162): four heroes have identical combat/geometry/score/AI random stream with and without storm;16 mirrored grappling comparisons; interior/pause/scene continuity.
- current150 (now including162):26 current combat/controller/grapple/director/route suites.
- lake161, park-visitors161, civilians155, park158 and riverfront160: ground/sky/emission fixes, nighttime animated crowd density, opaque casual idle/run soles, path grounding, park exits and unique Riverfront/boat masks.

No enemy damage/health, AI balance, hit detection, sprite scaling, combat-plane coordinates, campaign geometry, controller mappings or progression was changed. Physical controller testing is unavailable. Ambient count reduction affects animated visitors; people painted into existing scenery remain in that artwork.
