# Nightshade 346 grapple raster provenance

Created 2026-11-13 with the built-in imagegen tool. Original game character referenced only from `../downtown345/heroBase.png` and `heroExtra.png`; enemy-reference-board inspected for style/context but no opponent is baked into these atlases. Existing masters were not modified.

All three candidate atlases are 1536×1024 RGBA, six columns × four rows, row-major, 24 complete Nightshade poses. `-raw.png` preserves each original generation. Unsuffixed PNGs are imagegen background-removal edits, not programmatic painted replacements.

## Generation constraints

Original polished comic game sprite atlas, exactly 24 complete full-body poses, strict six-column/four-row equal-cell grid, generous gutters; transparent background, no ground, shadows, text, opponent or anatomy-obscuring effects. Ivory short sleeves, black/gold fitted tactical outfit, brown bun, blue spyglasses, gloves/boots, consistent black collapsible baton holstered when both hands are needed. Gold-framed cyan screen on anatomical left forearm requested in every pose. Constant body scale/proportions; no extra limbs.

## Requested row-major sequence

| Atlas | Poses 1–6 | Poses 7–12 | Poses 13–18 | Poses 19–24 |
|---|---|---|---|---|
| grapple-vault.png | rear hold, step, crouch, shoulder plant, spring, tuck | ascend, tuck, inverted vault, legs pass overhead, horizontal transit, descend | clear, pull, land, hinge/pull, momentum, release | lunge, crouch, straighten, rise, recovery, guard |
| grapple-backroll.png | rear hold, tighten, bend, sit, tuck, descend | back contact, hips rise, boots arc, inversion, roll through, knees down | kneeling control, stabilize, elbow chamber, raise, drive, contact | withdraw, kneel, foot plant, lunge rise, stand, guard |
| grapple-combo.png | front clinch, draw close, knee one lift/contact/withdraw/plant | transfer, knee two lift/contact/withdraw, plant, clinch | control, left wrist align, taser reach/contact/withdraw, baton draw | baton chamber, turn, backhand extension/followthrough, retract, guard |

Background edit prompt: “Background-removal edit only. Preserve all EXACTLY TWENTY FOUR character sprites, poses, anatomy, positions, six-column four-row grid, dimensions and colors. Make every non-character background pixel completely transparent alpha zero, removing ALL white, brown, gradient and haze backgrounds between sprites. Keep clean opaque character interiors with soft anti-aliased edges. No ground or shadows. Do not draw anything new. Export true transparent RGBA sprite atlas.”

## Actual inspection and limitations

All three originals and all three cleaned outputs were visually inspected. Vault has visible overhead tuck/inversion/transit rather than only a standing shoulder throw. Backroll visibly progresses through inversion into kneeling elbow and get-up. Combo has two knee cycles, wrist contact and baton backhand. No enemies or labels are baked in. No obviously severed limbs observed at atlas view.

Cleaned alpha ranges are 0–254 (not fully opaque 255). Alpha-zero coverage: vault 68.95%, backroll 62.59%, combo 59.32%. Sampled grid corners are alpha zero. RGB channels retain brown studio background color behind transparent pixels; partially transparent edge/halo remnants may remain. Treat as candidate source art requiring extraction/compositing QA, not a certified drop-in atlas.

Important unresolved visual details: device visibility is strong but anatomical-left-only placement is not guaranteed: some frames show cyan wrist accents on both arms. Several knee poses read similarly rather than decisively alternating legs. Vault forward-clear/pull phase is less explicit than its airborne inversion. Some backroll knee/contact poses are close to cell edges. Exact shoulder/hand placement and kneeling astride an enemy can only be verified with synchronized target rendering. No integrated animation, opponent sync, hit timing or gameplay certification is claimed.

No damage, frame data, engine files, tests or QA output were edited by this asset task.
