# Airport traffic, entrance and stadium fan corrections — Build332

Reference inspected: supplied2026-11-11 18:29:39 recording,77.73s. Sampled0,8,16,24,32,40,48,56,64,72s, including the blank entrance sign around35s.

| Defect / request | Correction and source | Verification |
|---|---|---|
| Transparent airport travelers | Traveler atlases were large enough to be treated as weather scenery. Explicit `environmentSprite161` excludes people/vehicles from scenery extraction. People render at opacity1 with isolated composite/filter state. | Native rendered departures; explicit asset-classification test. Original traveler identities retained. |
| Vehicles lack drivers / appear translucent | Updated original vehicle atlas with visible drivers; solid body alpha and transparent exterior. Vehicle draw resets opacity/composite/filter state and bypasses scenery processing. | `visual/airport-departures.png`, `Airport-Traffic-1x.mp4`. |
| Wheels do not rotate | Authored tire patches rotate around measured wheel centers. Angle is road distance divided by rendered tire radius; bottom contact remains423. No whole-body wobble or wheel translation. |120 native render frames; vehicle geometry tests. |
| Blank departure sign | Text is drawn inside the existing architectural sign at its world-space location: PRIME CITY INTERNATIONAL / DEPARTURES. | Rendered entrance. |
| No usable entrance cue / clipped entrance | Clear-state GO↑ / DEPARTURES / CHECK-IN is anchored at the door, with a screen-edge fallback while approaching. Portal and background center moved together to3150 so the complete entrance and sign fit in the final viewport. Bottom HUD now uses actual airport status instead of generic NEXT BLOCK text. Combat/clear gates remain. |295 airport assertions and both native full route progression tests pass. |
| Repeated stadium fan looks | Four new original standing fans, for8 standing appearances; existing two fully animated runner identities remain. New fan bodies are not palette swaps. | `visual/stadium-fan-variety.png` shows8 looks together. |
| Ground and size checks | All stadium civilians remain on logical y432 at canonical193 height. Existing runner/idle atlas roots corrected to measured source-pixel sole positions. New fans have individual source calibration to193. Running retains a fixed scale through all poses. | `fan-anchor-audit.json` records original small offsets;11416 checks cover3 scenes,300 steps each, ground/scale/navigation and vehicle geometry. Existing run silhouette height180–198 reflects bent-leg stride poses; no per-frame scale normalization. |

The eight-fan comparison intentionally places the looks side-by-side for inspection; production positions are unchanged. All vehicle and people evidence uses native renderer fixtures, not browser gameplay. Wheel-motion video is120 rendered frames at60FPS. Live browser and physical-controller verification limits are described in `../reports331/REPORT.md`.

Source: `airport309.js`, `airport-view309.js`, `airport-view312.js`, `airport332-data.js`, `stadium313.js`, `stadium313-data.js`, `stadium-view237.js`, `fans332-data.js`, `game.js`, `index.html`. Original generated source assets and reproducible importers are retained. Unused traveler and running-fan generation candidates were not substituted into the game.
