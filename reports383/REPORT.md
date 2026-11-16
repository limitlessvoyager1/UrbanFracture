# Urban Fracture — Build 383

Reina's neutral guard follows the supplied upright Taekwondo reference, replacing Build382's deep wide guard. Her long blue hair, blue/white dress, guards, sandals and sheathed sword remain her design.

## Corrections
- Applied one 0.86 display multiplier to Reina across her entire draw stack: neutral, armed, airborne, sword stance, combat, grapples and throws. She now matches the scale of Downtown's actual HD enemies. This changes presentation; native move definitions, damage, energy, action timing and hit geometry are preserved.
- Replaced the normal walk and run with eight authored poses each. A shared distance-driven visual phase carries across speed changes and stops advancing when movement stops. Frame registration follows the pelvis horizontally. Walk/run head registration preserves a controlled stride bob instead of snapping each flying foot to the floor.
- Replaced the final get-up sequence with eight loose-haired recovery poses. The initial knockdown, flight, prone hold and death continue through the previous owners.
- Existing throws and suplex use their previous native pose clocks and artwork, with the same display multiplier applied throughout. No throw-specific enlargement was added.
- Kept the 155-unit neutral sword strike and Dragon Tail's native leaping sword uppercut counter from Build382. Other action artwork, selection logic and move mechanics remain delegated to Build382.
- Removed the separately tiled upper-floor facade strip. Each exterior facade now draws top-to-sidewalk from one source, eliminating the horizontal architecture mismatch; the road keeps its shared ground plane.

## Checks
Passed: 85 gait/registration/preservation assertions; Build382 (32); Build381 (204); grab system (17,892); stance (2,249); simulated controller mapping (32); weapon families (484); unique/counter (91).

Native render review covers 19 scenarios and 950 captured frames, with 195 checks. A separate 33-check audit renders every authored gait/recovery frame, native hip-throw sample poses, and the corrected condo facade using Downtown's HD enemy draw owner. Frame-by-frame proof and native video are adjacent to this report. Physical controller hardware and a live browser playthrough were not tested.

Checkpoint: checkpoint-before-reina383. Generated sprite source: source-art/reina383/motion.png; exact prompt: source-art/reina383/PROMPT.txt. The built-in image tool created the raster art; the project packer registers sprite cells. No prior move implementation or earlier source assets were deleted.
