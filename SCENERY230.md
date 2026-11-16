# Build 230 — baked scenery preparation

Recoverable checkpoint: `checkpoint-before-scenery230` (Build229).

Scenery230 is an asset preparation pass, not another environment controller. Existing156/217/218/162 continue to own weather, clock, wind, snow, audio and level exposure. Original raster files and gameplay geometry are unchanged.

Prepared asset families: Uptown park (three native sources and the production6000px panorama), lakeside, deep woods/woods atlas, Route74, estates, riverfront, Uptown streets/mall, and exposed prison yards/checkpoint. Each profile supplies bounded sky eligibility, vegetation extraction bounds, and roof edges where present. The truck-stop and golf flags have separate cloth masks with fixed attachment edges. Conservative no-sky profiles preserve genuinely closed canopy or building occlusion.

The importer extracts uniquely owned plant/branch/cloth pixels into cropped transparent layers and fills the exposed underlay from surrounding source colors. Calm composition reconstructs the original source exactly. Wind deformation is bounded, rooted, reversible and reduced-motion aware; it reads the existing sample. Snow frost follows the same moving parts. Authored exclusions protect cabin roofs, signs, park furniture and golf terrain. These are bounded pixel-layer deformations, not a skeletal animation of every individual twig.

View156 now composites the existing celestial/sky renderer in screen coordinates through prepared occlusion mattes. Water, buildings and canopy remain opaque; camera movement does not push the moon out of the sky by scaling it to panorama width. Existing roof runoff uses actual source-space edges and the same image crop/camera transform. LRU eviction releases extracted canvases, and diagnostics include preparation/memory totals.

`scenery230.html` is a developer-only visual inspector (not a player menu): original/prepared, sky matte, wind layers, calm/strong/reversed wind, day/night, rain/snow, camera sweep and180-frame CPU rendering benchmark.

Verification: seven real-asset import fixtures check exact calm reconstruction, exclusive ownership, wind direction/root/calm, both flags, protected water/closed canopy, rigid cabin and golf ground. Environment229 model/HUD/integration,156/162/217/218, full Prison224 regressions, Prison227 art/sections and gamepad/controller157 suites pass. Browser inspection covers park night silhouettes, truck-stop rain/flag, golf terrain, cabin, prison and production panorama. Park180-frame CPU rendering median3.80ms/p955.50ms; this is not end-to-end hardware FPS.
