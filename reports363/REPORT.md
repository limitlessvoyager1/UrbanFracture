# Build363 — upper buildings, Nightshade agent movement and folding knife

Checkpoint: checkpoint-before-agent363 at5d998ee850fdfe2397f1c90eea666eaa6b818a98.

## Changes

Removed the procedural gray brick fill above the Downtown storefronts. All six exterior frontage groups now have painted upper-story continuations with matching masonry, windows and vertical architectural details. World scrolling, storefront sign positions, road plane, optional routes and weather remain on the existing systems. Dedicated six-row architectural atlas: dist/assets/agent363/upper.webp.

Nightshade has newly authored12-frame walk and12-frame run sheets, independently generated for her female-agent identity. Walking uses upright poise, low foot clearance, quiet shoulders and small arm counterswing; running uses a controlled forward lean and compact bent-arm motion. Guide bob is reduced to3px walk/5px run, versus the prior10px source guide. Cosmetic distance strides103/148 differ from Broxton359's88/136. Native movement speeds, combat clocks and controls are unchanged. The24 hand sockets were remeasured on the new figures, and hand-over-weapon occlusion remains. Body height/ground anchor use the same134-unit presentation as current idle. Broxton's movement adapter is byte-for-byte unchanged.

The standard knife now resembles the supplied open folding knife: long slim pointed silver blade, dark wood handle with pins, silver bolsters and pivot/guard. The shared drawKnife47 path, including original private sprite calls and native held/dropped/thrown weapon rendering, uses the new asset. Flint's independently drawn knife prop also uses it. Registration centers the handle at the hand and preserves the previous tip reach (`length +4`), so this visual change does not expand attack range. Character-specific pre-painted art is not a new weapon backend.

## Files

Runtime: dist/downtown-view351.js, nightshade-gait360.js, nightshade360-data.js, sprites.js, flint351.js, knife363.js; index.html/downtown360.html load/cache versions; fighter-render manifest. New imagery: dist/assets/agent363 (walk, run, upper, knife). Reproducible sources/guide/packer and exact built-in image prompts are under source-art/agent363 and tools/agent363.

## Verification

Passed6,213 native rendering/simulation assertions.24 movement cases cover walk/run, four directions and30/60/120Hz, with every frame visited in consecutive order. Both facings and knife/pipe carriage use complete12-frame cycles and opaque measured hand sockets. Unique-image hashes confirm24 separate full-body figures. All six street segments render architectural upper floors; the old flat strip is absent in sampled visible upper-region pixels. Native knife swing, throw, pickup and inventory retention pass, and the shared original renderer is exercised. Broxton movement is verified unchanged.

Separate consecutive-frame suite24cases, ammo-removal291, master-items170, active-combat352 suite180 and controller157 regression suites pass. Ammo remains removed. Syntax, dependency order and shipping entry checks pass.

Evidence: nightshade-walk-full.png, nightshade-run-full.png, street-*.png, knife-reference-proof.png, knife-walk.png, knife-run.png, verification.json and Agent363-native-capture.mp4. Reviewed all new gait sheets, calibrated hand contact crops, street screenshots and knife proof. The recording is native simulation/Canvas2D evidence, not browser or physical-controller verification.

Known limits: full browser performance, hardware DualSense and full-campaign manual traversal remain unverified. Existing manual/performance holds remain. Canonical game source is retained; hosted review is Downtown. Next recommended QA: judge the new agent gait at normal speed in the published playtest.

Persistent native capture: https://chatgpt.com/library?file_id=libfile_fde3_f-0a0f9ee881f481918646737e9274d578_883c12a6af488191be4a998f74e329db&account_id=personal
