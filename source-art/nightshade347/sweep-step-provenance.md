# Nightshade347 sweep and walking transition masters

Created with the built-in image-generation tool. `../nightshade346/hero-melee.png` was the sole character/style/proportion reference for both generations. Neither original346 master was modified. New files are1536×1024 RGBA,6columns×4rows,24 sequential whole figures each.

## Shared prompt invariants
Original Nightshade identity: brown bun, blue spyglasses, ivory short sleeves, fitted black/gold tactical outfit and black boots. Same right-hand black baton and physically attached cyan rectangular left-forearm device in every pose. Right-facing side/three-quarter view, same body pixel density/proportions. Generous gutters and perimeter, complete heads/boots/limbs. Genuine transparent RGBA; no floor, shadow, text, labels, scenery, enemy, or additional limbs. Crouched figures must become shorter rather than being enlarged to fill cells.

## hero-sweep347.png
Final action prompt: a real baton ANKLE SWEEP. Baton travels within a boot-height of the floor through a progressive low horizontal arc, not a chest/waist swing.0–3brace/bend,4–7deepcrouch with baton drawn backwards/down near rear boot,8–15successive low forward arc positions across unseen ankles with hip pivot,16–19low followthrough,20–23retract into shallow squat. No overhead strike, knee or kick.

Observed output:0–3progressive knee bend;4–7deep crouch and low backswing;8–11baton near rear/center ankles;12–14extended forward low contact;15low followthrough;16–18rising/retracting;19–23shallow squat ready. Use12–14ascontact plateau. This output visibly sweeps the baton along the floor line rather than merely lowering her upper body. Forearm device appears cyan on near cuff as well as the farther left cuff in some views, so anatomical-left-only certainty remains a source-art limitation.

## hero-step347.png
Final action prompt: two short deliberate walking steps then shallow squat.0ready;1–8first heel-to-toe step with raised heel, leg swing, heelcontact and soleplant;9–16opposite step;17–23plant bothboots and lower into shallow squat with baton chestready. No running/airborne pose, sliding lunge, repeated static idle, deep kneel or attack.

Observed output: recognizable foot-lift/swing/heel-first extension/plant phases, including forward heel at5and10, flat-foot support6/11/16. Shallow squat grows through18–23, with the baton returning from thigh to chest. Two legs sometimes overlap in side view, so which leg is anatomical left/right is less explicit than the heel/sole motion. The parent engine must match root displacement to planted-foot phases and not move the root continuously through held support frames. No target is baked into either sprite atlas.

## Source integrity and limits
Both sheets were visually inspected and contain24large connected alpha components with unique6×4cell occupancy. No main body touches a source boundary. Exact alpha metrics are in the neighboring JSON. Brown RGB remains beneath alpha zero and some low-alpha brown halo pixels remain; use whole connected-figure extraction and matte ownership, not opaque rectangular crops. No pixel resizing, compositing, per-frame scaling or programmatic artwork changes were performed. Source images are original full outputs copied from the generated image paths.

These source-only assets do not certify runtime ground contact, enemy sync or transition speed. Parent integration and rendered QA remain necessary. No dist, tests or engine files were edited by this task.

## hero-beat347.png — standing shallow-squat stroke
Built-in image generation using the same sole `hero-melee.png` reference. Exact brief:24poses6×4, fullbody, right-facing, boots flat and planted, pelvis well above knees, modest shallow squat, no kneeling/heel-sitting/deep lunge. Right black baton and visible attached left cyan device.0chestready,1–5raise,6–8overhead,9–11progressive downswing,12low/shin contact,13–16followthrough/withdraw,17–19retract,20–23return to0. Transparent alpha, constant source density, generous gutters, same face/costume/proportions.

Observed: both boots remain planted, knees modestly bent throughout; there is no kneeling.0–5raise,6–8overhead,9acrosstheface,10–11diagonallydown,12low contact near forward shin,13lowfollowthrough,14–16withdraw,17chestready.18–23are very similar chestready settling poses. To meet the requested continuous four-strike rhythm, parent should spend very little time on18–23 or loop0–17 directly; holding all six settling poses would reintroduce a pause. Source density is consistent with the other new347standing figures, but parent must calibrate a whole-sheet scale from standing/reference body landmarks rather than from maximum overhead baton extent.

Inspection:1536×1024 RGBA;24large connected figures atalpha>100 in24unique6×4cells; no main-body source-edge contacts;910,248fully transparent pixels. Brown RGB/low-alpha haze remains under/near transparent edges. Complete face/hands/legs/boots and attached wrist device were visually inspected; rendered contact/alignment is untested here.

## hero-rise347.png — eight-pose planted-foot recovery
Built-in image generation with `hero-melee.png` as sole identity/style reference and `hero-beat347.png` as the requested shallow-bend starting stance. EIGHT poses, FOUR columns by TWO rows, right-facing. Brief: both feet fixed flat, no walking/kneeling/deep crouch/jump, progressive knee/hip straightening into ordinary idle-ready, right baton lowered/ready and left cyan wrist visible. Constant body-part density, complete bodies, transparency and gutters.

The first candidate is preserved as `hero-rise347-raw.png`; it had a small dip around3→4. Final `hero-rise347.png` is an imagegen improvement requesting monotonic knee/hip rise, identical planted boot coordinates and no source-density change. Visually the final progresses from a shallow bend to a taller combat-ready stance, lowering the baton through the latter frames. No boots leave the ground. The final shares the source character's face/outfit/limb proportions, but it is not a pixel-exact copy of the original idle drawing; parent should align the final idle transition in actual rendering.

Final metrics:1774×887 RGBA;8large connected bodies atalpha>100;8unique4×2cells;no main-body source-edge contacts;1,143,399fully transparent pixels. Minor low-alpha fringe remains. No programmatic artwork changes or per-pose resizing. No engine/test changes.
