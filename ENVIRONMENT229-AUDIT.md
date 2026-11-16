# Environment229 audit
Checkpoint: checkpoint-before-environment229 (8e8a9b4, includes Orion228). Production remains Build227: interrupted228 publication did not save a version.

| Feature | Confirmed starting status | Existing owner / defect |
|---|---|---|
| Global clock/weather, save/replay | Functional | Environment156; deterministic separate RNG, persistent run |
| Registry/transitions | Partial | Nine states, fixed35s blend, missing moderate/mix/mist/windy/cloud variants |
| Temperature/wind | Partial |217 analytic seeded smooth signals; no climate adapter or registry wind targets |
| Snow/accumulation | Partial |218 strict freezing gate, ledge masks/ground/melt; abrupt pure rain/snow swap |
| Precipitation | Malfunctioning visibility |156 rain160*s.rain and218 flakes; light effects too sparse/faint, no proper three depth passes |
| Clouds/sky/celestials | Partial |156 cached gradients, sun/moon/stars; composite assets have limited recoverable sky masks |
| Lighting/shadows | Functional with limits |156 background tint, emission/windows, native actor shadows; no character flash beyond screen illumination |
| Lightning/thunder | Partial |156 fixed20s buckets; short thunder polling window can be missed, single storm class |
| Weather audio | Partial |game.js generated rain/wind noise and delayed thunder; no recorded thunder samples |
| HUD/settings | Partial |217 persistent settings and DualSense navigation functional; icon only except snow labels, missing icons/labels |
| Developer controls | Partial |156 F6 overrides/replay; cloud/storm/snow/thunder controls absent |
| Level integration | Functional with asset limits |162 auto enrollment; sealed interiors exclude precipitation, configured lab window clipping; future metadata adapter |
| Pooling/performance | Partial |Fixed typed rain pool and bounded cache; procedural snow hashes repeated, no adaptive quality telemetry |

No duplicate weather/time controller will be added. Extend156,217,218 and162 in place. Preserve geometry, combat, camera, scripted encounters, controller bindings and player settings. Static raster foliage masks are cosmetic estimates, not segmented branch animation; unsupported artwork must be reported.

Implementation results: registry/transitions, pooled precipitation, storm scheduling/audio, HUD/settings, overrides and shared adapters repaired in place. All automated model/HUD/integration/regression suites passed. See ENVIRONMENT229.md for exact verification evidence, timing measurements, configuration and remaining asset limitations. Gates4/6 remain asset-limited for independently articulated baked branches and inaccessible sky regions; this is not claimed as automatic support. Gate9 remote CPU benchmarks passed, while physical pad/hardware FPS/listening acceptance remains unverified.
Final continuation repair: a forty-seed regional eligibility check reproduced stale labels after loading. Continuation now retains classification/candidate timing. The same clock retains canonical snow/wind accumulators independently of developer presentation previews; forty regional save/restore, forced-preview, and reset scenarios now pass without changing the underlying save.
