# Build362 — directional identity, storefront and Flint corrections

Checkpoint: checkpoint-before-visual362 at 2e27e024cbbe1393d6d55de1d4d44e6ca869a47f. Reviewed the supplied 103.93-second recording, including the Flint at 32 seconds and early Neon Cell/depth movement.

## Corrections

- Nightshade: the blocked/stopped gait branch passed a copy to a renderer that identified the current hero by object identity. That copy fell through to unmapped gold Downtown345 art at a different size. Neutral rendering now preserves the actor identity and restores temporary flags, and the HD owner recognizes valid render copies by actor ID. Up/down, boundary motion, idle and carrying weapons stay on current magenta artwork. Measured idle is 134 native units; all walking frames are 134–138 and running frames 133–138, reflecting natural pose/bob rather than a separate character scale.
- Neon Cell: dedicated 2172×724 painted facade replaces enlargement from a 641-pixel crop. Keeps the same world frontage, English sign, doorway and broken left window; rendering downsamples the new source. New artwork: dist/assets/visual362/neon-cell.webp.
- Battery: shared window anchor puts it at world X2055/display baseline343 inside the open broken aperture. Existing saved pickups are corrected too, without changing item identity or claimed ledger. The pickup renders in the background pass, behind fighters, and remains physically collectible from its ground lane.
- Flint: eight new full-body walking frames use the same orange jumpsuit, mustached face, build, boots and 144-unit figure height as armed idle/attack artwork. Idle uses that same armed source, including unarmed neutral stance. Per-frame measured fists replace guessed walking grips. Dedicated painted rectangular wood artwork replaces the cartoon rounded line for the 2×4. Length is 78 local units during movement, idle and attack, with the gripping fist composited over it. The actual native attack segment uses that same shorter length. Existing attack clocks, armor and three-second armed recovery remain.

## Files

Runtime: dist/nightshade-gait360.js, nightshade-view352.js, downtown-view351.js, downtown345.js, flint351.js, visual362.js, flint-walk362-data.js; assets/visual362; index.html and downtown360.html load/cache versions. The visual362 adapter is inert in canonical campaign entries that do not load the opt-in Flint351 review family.

Source artwork: source-art/visual362, including exact prompt set in prompts.json (built-in image generation). Tests: tools/visual362 and updated gait-order observation snapshot. Full campaign source and all prior levels remain. Published artifact remains the bounded Downtown review.

## Verification

- 9,130 native render/simulation assertions pass.
- 16 movement combinations: four directions × moving/blocked × unarmed/pipe; no old345 owner selected, all twelve gait frames exercised during movement. Active hero copies select current HD art.
- Pixel measurements for all 24 walk/run frames versus current idle.
- Eight Flint walking frames, both facings; matching identity/height, measured sockets and consistent board length.
- Twelve armed attack scenarios: both facings × wild/heavy ×70/240/480-unit target distance. Near targets hit; remote targets do not. Every sampled attack segment has the same 78-unit board length as drawing.
- Battery fresh placement, correction of saved coordinates, actual collection and persistent claimed state pass; high-resolution facade/downsampling checks pass.
- Separate 24-case consecutive gait-frame suite passes; master item suite170, ammo removal291, active combat352 suite180 and controller157 regressions pass. Ammo remains removed.
- Source and shipping entry dependency/syntax checks pass.

Evidence: corrections-contact.png, storefront.png, flint-1.png, flint--1.png, scale.json, verification.json and Visual362-native-capture.mp4 (1,981 frames at60Hz). Reviewed native contact sheets and screenshots. This is native simulation evidence, not a live-browser or physical-controller recording.

Initial QA harness failures used practice-lane bounds and omitted the item renderer; harness was corrected to use the Retail scene, real item renderer and valid test camera/bounds. Final targeted runs pass. Browser performance, physical DualSense and full-campaign manual traversal remain unverified; preserve prior manual/performance holds. Next recommended QA: repeat the supplied controller sequence in the published review.

Persistent native capture: https://chatgpt.com/library?file_id=libfile_fde3_f-142c6090b3688191af0f745e0d58fece_883c12a6af488191be4a998f74e329db&account_id=personal
