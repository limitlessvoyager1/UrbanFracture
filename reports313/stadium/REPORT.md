# Stadium313 corrections

## Confirmed causes and changes

The legacy view tiled complete perspective rooms, including1pxblackassetborders, and then drew a generic floor432strip over their existing floors. This created vertical black seams and two incompatible playing-field surfaces. The locker image itself had inward-angled banks. Primitive door boxes in the view additionally covered real open catering/tunnel entrances.

Four new original illustrated background strips replace concourse,lockers,field,endzone assets. Sources and exact overwritten assets remain under source-art/stadium313. The new locker wall is perpendicular and straight. Art tiling overlaps1logicalpixel; a single grass texture spans the full fighting depth. Correctly positioned yardlines, hashmarks and numbers are world-anchored once across a6600-unit field. Goal lines are550 and6050; numbers10…50…10 occur only every10yards, with a55-unit yard. Endzone letters and the narrow side-on far goalpost preserve the lengthwise fight direction. The entry tunnel is behind the player's initial goal-line position.

Section7 now owns the entire original field and endzone normal waves (8+4enemies), then the same450HP dormant Baylor at the far end. No field midpoint portal,fade,teleport or scene change remains. Direct section8 practice is retained, with global field offset4000; it views the same field rather than an unrelated endzone picture. Boss activation/reward,450HP, native threat3/max2commitments and2encounterlocks are preserved. HUD field title is shortened to avoid central-score overlap.

Elevator walls and floor use adjoining regions of one source picture; generic tile overlays are removed. Actual ride-phase cabin vibration is0.65logicalpixels and honors reduced motion. The foam-finger fan no longer spawns inside the elevator footprint. Adults share193logical-pixel background height.

The original two-pose runner images included colored RGB trails, and the renderer moved roots95u/s based on elapsed render time while showing a running frame even before activation. New original eight-pose cycles for both fan identities use235u/s native tick movement and124-unit stride. Four matching planted idle/alarm poses are used whenever movement is stopped. State is serializable at game.stadium237.civilian313.scenes; no RNG, new clock, render-controlled root movement or WeakMap-only state exists. OS reduced motion and optional game reduced flags stop roots and show planted poses.

## Verification

- node tests/stadium237.cjs:PASS six heroes×two complete routes; highway transfer; same hero/world; boss and one completion preserved.
- node tests/stadium237-view.cjs:PASS scene/proxy render and asset/geometry checks.
- node tests/stadium239-layout.cjs:PASS physical entrances and revised crowd role/size contracts.
- node tests/stabilization240.cjs:PASS elevator selection/transition/input and city/financial/stadium entrance regressions at30/60/120Hz.
- node tools/stadium313/render.cjs:PASS seven real native scene captures, eight distinct run frames, native distance/speed and reduced-motion planted idle. First supplementary crowd fixture failed because its manually teleported hero still had native locked-encounter/previous-position constraints; the isolated fixture now disables those constraints and sets prevX, without changing production movement or lock rules.

Native captures inspected: concourse,cabin,facilities,lockers,field-goal,field-mid,field-far,run-cycle. They show continuous turf/yardlines, flat lockers, actual open exit, single cabin material and real cyclic leg poses. These are native renders rather than live-browser or physical-controller certification.

## Integration

Load stadium313.js after stadium237.js in native simulation order, before woods139. Load stadium313-data.js before stadium-view237.js. Exact runtime source substitutions for historical byte proofs are tools/stadium313/approved-patches.json. Full authorized presentation replacements are stadium-view237.js and fans-data237.js; parent owns exact-source adapters. No index,game,weapon,Reina,enemy or publication files edited here.

Built-in image generation was used for the original four-row stadium atlas, sixteen running poses and four planted idle poses. Prompts and full PNGs remain in source-art/stadium313. The four obsolete two-pose runner exports are archived outside shippingdist and removed from the static fan registry. Current shipping run/idle WebP is intentionally packed from original PNGs, not repeatedly recompressed artwork.

The final optional image-only recapture was briefly blocked by a shared index reference to `stadium-civilian313-data.js`, while the actual produced module is `stadium313-data.js`. Parent was notified to correct the integration reference; existing successful real captures/results remain intact, and parent will rerun the final integrated test.
