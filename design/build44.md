# Build 44 — wake attacks, aerial kick, and enemy behavior

Sato’s displayed name is now **Saito**; the internal actor key and existing asset paths remain compatible. Akari is still the white-gi female martial artist (the request’s “Akira”).

- Nearby Saito finishes knockdown with an attacking kip-up: 16 base damage, 0.40-second windup, 0.95-second action. Akari uses a low sweep: 12 damage, 0.35-second windup, 0.90-second action. Neither triggers outside 120 pixels horizontally / 30 in depth. Both can be avoided by leaving range and intercepted by a timed counter.
- Both heroes’ charge attempts expire at three seconds. Continued holding cannot restart the charge or emit an attack; release resets the input latch.
- Reina’s neutral aerial is now a dedicated upward snap kick with three new poses. It remains 20 damage, versus the moving kick’s 13. Body anchors align the head across preparation, extension, and recoil.
- Marcus and Kevin receive zero invincibility during the last recovery frames and on standing. Other characters’ existing wake protection is preserved.
- Marcus receives a persistent random aggressive (40%), patient (30%), or opportunistic (30%) temperament. Aggressive types rush and recover their attack timer faster. Patient types hold about 145 pixels away; opportunists hold about 185, watch for engagement/openings, then commit. All still defend themselves at close range.
- Kevin approaches about 8% faster and recovers his attack timer about 10% faster. His close-range preference and 30% knife-throw decision remain. Thrown knives now have a pointed metallic blade, bright spine, crossguard, grip, and pommel.

## Validation

All 58 Node test files passed, including the current full campaign routes and simulated standard/raw DualSense and DSX controller tests. New tests cover wake attack windup, hit, miss, proximity and single-hit behavior; exact three-second cancellation for both heroes; absent Marcus/Kevin wake immunity; randomized temperaments and opportunistic commitment; Kevin’s increased approach; and distinct neutral-kick rendering at stable scale. Physical controller hardware was unavailable.

The isolated core-combat fixture now suppresses random knife draws except in its explicit knife-draw test, removing an unrelated intermittent failure. The legacy financial route budget increased from 1,200 to 1,500 simulated seconds; its unchanged tactics completed at the boss 2.8 seconds beyond the old total budget after the immunity change.

Browser QA inspected the new neutral kick, Saito’s kip-up, Akari’s low sweep, and the thrown-knife silhouette. Temporary QA was removed before packaging.

## Artwork provenance

Built-in image generation produced the transparent PNG, copied unchanged to:

`/workspace/sites/neon-knuckle-build43/dist/assets/sprites/reina-neutral44-v1.png`

Only sprite rectangles, seeds, and anchors were computed in metadata. No raster edits were made.

Generation prompt:

Use case: stylized-concept. Asset type: transparent sprite atlas, 3 equal columns in ONE row. Original retro beat-em-up heroine Reina, Asian adult woman, long flowing black hair, navy knee-length Japanese-style dress split for movement, pale sash, black fingerless gloves and forearm guards, sandals, sheathed short sword at waist. Detailed crisp illustrated 16-bit pixel art, dark outlines, consistent proportions and head size. Three airborne NEUTRAL JUMP UPWARD SNAP KICK poses, all face right: 1 knees tucked, guard raised preparing kick; 2 one leg kicked steeply UPWARD in front of her, bent other leg tucked underneath, upright torso, hands guarding; 3 recoil folding the kicking knee back in. This is a vertical rising snap kick, NOT a horizontal flying sidekick. Whole bodies visible, isolated poses with large transparent gutters, consistent body size, no text, no shadows, no scenery.

