# Build 33 — Broxton motion and paired grapples

Broxton now jumps with a neutral tucked-leg pose. Only Attack activates the aerial heel kick or moving punch. A new eight-frame, consistently side-facing walk replaces the staggered three-pose cycle. New close-hand front and waist grips preserve character proportions.

The front backward throw turns Broxton through a full 360 degrees, releasing the victim backward at the half-turn and completing the follow-through. The forward throw uses an open-hand wrestling clothesline with an arm sweep. German suplex lift, bridge, landing and elbow follow-up share the victim timeline and use normalized body scale.

`paired-motion.js` coordinates holder and victim body centers, facing, rotation, release and landing for Reina and Broxton throws, rear takedowns and slams, and enemy slam variants. Release inherits the exact paired position. A fatal throw lands once. Stage transitions wait for the throw follow-through. Interrupted holds clear paired transforms.

Broxton Rising Breaker steps forward approximately 45 pixels, reaches 110 pixels, and deals 52 damage. Reina charged palm deals 48. Both retain charge vulnerability and five-second cooldowns.

## Art provenance

Built-in image generation produced transparent 1536×1024 atlases, copied unchanged. Python inspected alpha bounds only to define frame crops and foot anchors; no image pixels were modified.

- `assets/sprites/broxton-motion-v2.png`: twelve poses in a 4×3 grid. Prompt specified the established medium-brown-skinned Broxton, short black hair, circle beard, stud, tucked necklace, beige muscle shirt, tattooed arms, black cargo pants and boots; consistent anatomy and normal hand size; eight consecutive side-profile walking phases with unchanged torso angle; neutral tucked jump; close front grip; rear waist grip; step-in uppercut. Transparent gutters, no opponent, text or shadow.
- `assets/sprites/broxton-grapples-v2.png`: twelve poses in a 4×3 grid, referencing original Broxton and motion atlas. Prompt specified consistent anatomy and natural hands, right/back/left/front rotational grappling views, wrestling clothesline wind/contact/sweep/recovery with open hand and inner-arm contact, German waist grip/load/back arch/low shoulder-and-boots bridge. Transparent, no opponent, text or shadow.

## Validation

Build33 tests cover neutral jump versus explicit aerial attack, 72 throw trajectories across both heroes and nine enemy types, finite continuous paired transforms, single landing including fatal throws, full spin direction, synchronized German impact/elbow, charge damage/range and interrupted lift cleanup. Both actual Financial District route tests load paired-motion and pass with normal hero HP. Browser inspection checked neutral jump, close grip, walk, clothesline, German bridge and Reina suplex. Controller tests simulate Gamepad API input; no physical DualSense was available.
