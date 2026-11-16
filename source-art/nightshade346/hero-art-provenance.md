# Nightshade346 hero animation masters

Generated with the built-in image generation tool, using `source-art/downtown345/heroBase.png` and `heroExtra.png` as identity/style references. Original masters remain unchanged. Three new1536×1024 RGBA PNGs, each6columns×4rows,24 sequential full-body figures. Constant character-size instruction, right-facing side/three-quarter painted comic style, no enemy baked into sprites.

## Shared final prompt constraints
Original Urban Fracture character Nightshade: brown bun/ponytail, blue spyglasses, ivory short sleeves, fitted black/gold tactical outfit and boots. Preserve reference body proportions/style. Exactly24 separate full-body poses on6×4 grid, chronological left-to-right and top-to-bottom; generous gutters, no clipping or overlaps. Gold-framed cyan-screen device physically fixed to LEFT forearm and visible in every pose, never floats or changes hands. Same black collapsible baton and right-hand grip throughout attacks. Genuine transparent RGBA background; no labels, text, floor, shadow, enemies, extra limbs, deformation, costume changes or sexual framing.

## hero-sweep.png — final action prompt and ordering
Front-grab forward attack, hero only; unseen target swept by baton at ankle height, then struck while supine. Four slow steady dramatic overhead baton downswings, distinct anticipation/contact/follow-through, then rise into combat stance.

| Index | Authored pose |
|---|---|
|0|Ready with baton and open left hand|
|1|Lower sweep anticipation|
|2|Hip rotation, baton lowering|
|3|Deep low horizontal sweep|
|4|Full sweep extension/follow-through|
|5|Plant and pivot beside target|
|6|Settle low side stance|
|7|First overhead baton windup|
|8|First downward contact|
|9|First recoil/follow-through|
|10|Second overhead windup|
|11|Second downward contact|
|12|Second follow-through|
|13|Third overhead windup|
|14|Third downward contact|
|15|Third follow-through|
|16|Fourth overhead windup|
|17|Fourth downward contact|
|18|Fourth follow-through|
|19|Retract from floor|
|20|Low ready / knees straighten|
|21|Half rise|
|22|Standing|
|23|Combat-ready|

Contact keys for parent timeline: sweep3–4; beatdown8,11,14,17. Use authored anticipations7/10/13/16 and follow-throughs9/12/15/18 for steady strike cadence, not rapid pose toggling. Exact gameplay timing and paired target positioning belong to the parent engine implementation.

## hero-melee.png — final action prompt and ordering
Four-hit sequence: two baton strikes, left wrist-device forward laser command (no long beam baked in; engine draws VFX), then forward flying kick and landing. Device remains visible even during baton/kick frames.

0ready,1first baton windup,2shoulder/hip rotation,3first full extension/contact,4follow-through,5recoil;6second/backhand anticipation,7wind torso,8elbow leading second strike,9second contact,10second follow-through,11center;12begin wrist lift,13right index presses left device,14left forearm/device aimed right,15device firing hold,16recoil,17leg gather;18forward takeoff,19knee tuck,20fully extended flying kick,21descent,22landing crouch,23standing-ready.

Contact keys:3,9,14–15,20. The wrist beam itself is intentionally absent; no baked enemy or impact VFX.

## hero-command.png — final action prompt and ordering
Drone command gesture: stable planted feet, left wrist lifts as if checking the time, right index approaches and presses left wrist button, command holds, arms lower smoothly. Baton stowed in right-thigh holder. No offensive strike or drone baked in.

0neutral,1elbow bend,2left hand starts lift,3forearm chestward,4rotate watch face toward eyes,5look to wrist;6right hand rises,7index approaches,8hover,9button press,10held press,11release;12raised wrist,13small second finger tap,14release,15right hand withdraws,16elbows settle,17left wrist raised;18right hand lowers,19wrist rotates outward,20left arm half lowered,21arm near waist,22hands ready,23complete ready stance.

Command press keys9–10; hold12–17; recovery18–23. Most mid-command changes are deliberately subtle; they are a watch interaction, not attack windups.

## Inspection and limits
All three were visually inspected. At alpha>100 and connected component area>500, each has exactly24 main figures mapping uniquely to all24 nominal cells. No main figure touches its master-canvas boundary. Fully transparent pixel counts: sweep1,034,370; melee1,023,304; command1,032,760. Brown RGB is present under zero-alpha pixels; faint low-alpha halos remain around some figures, especially melee. Use the established connected-source-figure importer/alpha ownership approach, not naive opaque rectangular grid crops. No actual engine pose import or rendered paired animation certification was done by this bounded asset task.

The large command device is on the left wrist/forearm as prompted; the established costume also contains small cyan details on the opposite cuff. These are not a second command action. Mirroring behavior is an engine concern. Baton projection varies with forearm foreshortening, so parent should inspect actual strike contact at the shared timeline keys. Hero-only images cannot establish opponent hand placement or impact synchronization.
