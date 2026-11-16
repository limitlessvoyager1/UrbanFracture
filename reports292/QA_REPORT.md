# Casino and Chinatown repairs — Build292

Recovery checkpoint: `checkpoint-before-casino292`, commit `3f5e9dc8319b7f32fce6887edc0ce8188f3867f3`.

## Confirmed causes and changes
- Casino scenery used a compressed background-camera offset while a separately stretched floor used the full camera. Both casino interiors now render architecture, window lighting and carpet in world coordinates using the same camera displacement and original uniform artwork scale. Reused interior bays extend the scenery without stretching buildings or repeating the penthouse elevator. Fixed architectural separators cover bay boundaries. Window compositing now resets its drawing mode each frame, avoiding a first-frame-only lighting mask.
- The gaming floor is4200 units, up from2800 (+50%). Spawn thresholds and its existing Akari specialist placement move proportionally. The same enemy budget, enemy roster and maximum two locked encounters remain.
- Combat props are exactly three slots (850/2050/3300 at rear edge444) and one table (2650 at front edge506). Other logical roulette/video/table props are removed. Baked background games and patrons remain scenery. Enemy entrances use the clear central plane480, outside all prop collision depths.
- Destroyed casino props immediately stop drawing/colliding and are removed from the live prop list. Dust and the existing single loot decision remain; slots50%, table30%. Damageable furniture was missing native contact dispatch for later Orion/Nightshade controllers; those controllers now use their own configured combo contact frames to hit casino props. Enemy damage, attack timing and recovery are unchanged.
- The gateway screenshot mixed a gate scene and market scene at a hard vertical join. Gateway Street now uses one continuous street backdrop, with the existing gate artwork isolated as a structural landmark. The original incompatible full-scene cut is gone. Mirrored street extensions trim image borders; no new low-resolution replacement background is introduced.

## Executed checks
- check.cjs:78 assertions covering exact prop count, both directions through every entry corridor, removal, single loot roll, portals, environment continuity and native entry locations across the whole extended floor.
- destruction.cjs:42 assertions, actual attacks from all7 heroes against both object types; no remaining collider/renderable prop, one loot decision.
- progression.cjs:all7 heroes traverse the extended first section and enter the penthouse. Native damage is used to defeat required enemies; enemy offense is disabled for this layout rehearsal. Each run uses at most2 locked encounters and retains the same environment controller.
- pixels.cjs:four wall/floor comparisons across both casino interiors,576000 spatial pixel pairs under a100-unit camera move. Only516 color-channel differences across2.304million comparisons (subpixel edge sampling). Both geometry offsets advance by the full100 units. Destroyed props issue no draw calls.
- Existing casino192, stabilization241, Chinatown235 runtime/view/campaign, practice282, Orion228 integration and Nightshade257 checks passed. Casino count/transition fixtures were updated to the new approved requirements rather than retaining obsolete five-machine assertions.
- Browser:live gaming floor, penthouse and repaired Chinatown gateway loaded and rendered. Evidence:Browser_Gateway.jpg. Native fixed-camera candidates are included for the start, middle and end of both casino sections and Gateway Street.
- Syntax and git whitespace checks passed.

## Preservation and limits
No character artwork, size, damage, attack recovery, armor or AI aggression changes. Weather and room transitions retain their existing controllers; existing pool ripple rendering remains. The deploy archive remains268431360 bytes, below268435456. To stay within that existing hosting ceiling, one metadata script (broxton-refined-data.js) has whitespace removed with identical canonical AST and zero renamed bindings; its readable original is retained. No bitmap asset is recompressed or reduced in quality.

A fresh full142-suite release profile, physical DualSense verification, human balance testing and owner-approved screenshot baselines were not executed for this build. The progression rehearsal is not an automated balance certification. Artistic review remains available through the supplied candidates. Do not label this build stable solely on these targeted checks.

Files modified:casino192.js, casino-view192.js, chinatown-view235.js, combat200.js (scaled specialist threshold), stabilization241.js (later hero prop contacts), index.html/cache versions/guide, metadata-only broxton-refined-data.js, affected fixtures, tools/casino292, source-archive/build292 and reports292.

Rollback:restore the checkpoint/saved Build291 version, preserving the existing private audience. This is separate from resetting temporary Developer Panel overrides.
