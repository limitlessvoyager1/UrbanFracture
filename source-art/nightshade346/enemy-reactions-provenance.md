# Nightshade346 original enemy reaction masters

Generated with the built-in image generator from the five corresponding `source-art/downtown345/<pair>.png` identity references. Existing masters were retained unchanged. These PNGs are original full-body comic-style reaction art, not extracted assets from a reference game. No engine, timing, damage, or AI edits are included in this art task.

## Layout

Each sheet requests six columns and four rows, 24 figures. First named enemy occupies the top two rows; second named enemy the bottom two. Each enemy has twelve reading-order states:

| Local index | Reaction |
|---|---|
|0|Held upright, restrained arms|
|1|Knee impact curled recoil / grimace|
|2|Hand-taser muscle clench / gritted teeth|
|3|Baton backhand recoil|
|4|Swept legs / loss of balance|
|5|Falling backward|
|6|Supine neutral|
|7|Supine clenched pain|
|8|Supine stronger wince / shoulder lift|
|9|Flat prone stomach|
|10|Prone head-hit flinch / clenched arms|
|11|Kneeling / rising in pain|

## Generation requirements

Use reference solely for character identity, costume and original comic rendering style. Preserve each costume, facial identity and equipment. Full figures inside equal cells, generous gutters, no overlaps or clipped limbs, upright right-facing, horizontal grounded figures completely contained. Genuine alpha background, no floor, shadows, captions, sparks, gore, exposed injury or detached anatomy. Pain conveyed with face and full-body acting. Generated originals were copied without creative pixel edits.

## Inspection and limitations

Visual inspection covers sheet pose presence, complete figures and character recognition. This is source art, not proof of runtime animation synchronization or combat behavior. These are authored key poses, not an assertion that every simulation frame is a distinct image. Importer must use per-figure alpha bounds and common ground anchors; simple equal-cell cropping can trim wide bodies that sit near nominal dividers. Equipment not visible when behind the body must not be interpreted as a dropped weapon. The PNG RGB channels include a matte which the viewer can display, but the alpha channel is genuinely clear in the background; use alpha compositing. Some background alpha is1–4/255 rather than exact zero; importer may threshold it.

## Final source inspection

|File|Size|Figures at alpha>128|Pixels alpha<5|Body edge contacts|
|---|---|---|---|---|
|enemy-brick-jackal.png|1254×1254|24|79.56%|0|
|enemy-bruno-frankie.png|1536×1024|24|71.92%|0|
|enemy-carmen-flint.png|1536×1024|24|70.65%|0|
|enemy-marcus-kevin.png|1536×1024|24|74.69%|0|
|enemy-saito-akari.png|1536×1024|24|80.59%|0|

Connected-component count is a technical isolation check rather than an anatomy validator. All five sheets were visually inspected. Saito/Akari underwent a spacing-only regeneration. Brick/Jackal underwent spacing repair and removal of an incorrectly generated baton from unarmed Brick.

Generated master IDs: Marcus/Kevin exec-c0a7edb3-4ef9-4a1a-bb6a-7581a9436af4; Bruno/Frankie exec-3091df83-2556-4d0c-881e-794ef2fe2572; Carmen/Flint exec-a3cc3954-7d27-4456-aac0-0ea760fd59d9; final Saito/Akari exec-a450c90e-e175-47b7-9001-7f889988e24b; final Brick/Jackal exec-6cbb9f6b-4a7c-42c3-9818-0b223c6ecbbd.

## Synchronized victim motion supplement

New `victim-motion-<pair>.png` masters add authored body rotations. No runtime synchronization is claimed by this source-art task.

For full48-figure sheets, first24poses belong to first named enemy and next24 to second. Six columns by eight rows. Per-enemy local states:

|Index|Victim pose|
|---|---|
|0|Rear capture|
|1|Shoulder brace|
|2|Head duck|
|3|Tipping|
|4|Lifted|
|5|Horizontal facedown|
|6|Tucked airborne|
|7|Airborne back|
|8|Falling|
|9|Back impact|
|10|Flat supine|
|11|Kneeling rise|
|12|Rear hold|
|13|Bend|
|14|Seated|
|15|Tucked roll|
|16|Rolling shoulders|
|17|Inverted|
|18|Turnover|
|19|Prone|
|20|Prone clench|
|21|Prone elbow impact|
|22|Kneeling getup|
|23|Standing|

Marcus/Kevin is1254×1254 full48. Saito/Akari and Bruno/Frankie were repaired to1086×1448 portrait full48. Bruno/Frankie has49 substantial alpha components due to a343-pixel wrist-chain island at bounding box(471,823)–(492,846), which belongs to Frankie pose2. It is48 bodies, not49 poses. Several artwork figures sit near nominal row/column boundaries; importer must isolate complete bodies and attach related equipment islands, not truncate them to equal cells. Tiny colored RGB mattes outside characters are transparent alpha, not rendered effects.

Brick/Jackal and Carmen/Flint main sheets are1254×1254 with42figures: first enemy24 complete, second enemy local0–16 valid, local17 incorrectly repeats standing. Companion tail sheets supply replacement second-enemy17–23. Tail layout4columns2rows:0 inverted→local17;1 turnover→18;2 prone→19;3 prone clench→20;4 prone head-hit→21;5 kneeling→22;6 standing→23;7 spare back-facing idle, unused. Use main indices0–40 and tail0–6; discard main index41 and tail7. This yields48 mapped poses per pair without falsely claiming the main sheets themselves contain48.

|Motion master|Dimensions|Substantial alpha components|Nearly clear pixels|
|---|---|---|---|
|victim-motion-brick-jackal-tail.png|1774×887|8|74.25%|
|victim-motion-brick-jackal.png|1254×1254|42|66.46%|
|victim-motion-bruno-frankie.png|1086×1448|49|71.52%|
|victim-motion-carmen-flint-tail.png|1774×887|8|79.95%|
|victim-motion-carmen-flint.png|1254×1254|42|68.11%|
|victim-motion-marcus-kevin.png|1254×1254|48|69.34%|
|victim-motion-saito-akari.png|1086×1448|48|70.85%|

All seven motion files visually inspected, including full-body inversion and turnovers. Companion sheets were generated specifically for Jackal and Flint; they are4×2 and1774×887. Final source IDs: Marcus/Kevin exec-de6ee6b8-c0a8-4348-ad7c-ae337c52263f; Saito/Akari exec-af1ab72a-9b86-4c8c-b1c2-7a03e3eaa3ad; Bruno/Frankie exec-0f4219c5-9619-4647-a3e2-bc5f322b22cd; Brick/Jackal exec-01a20c37-a114-4909-be57-58c5d2976721 plus tail exec-683116bd-50cd-4159-ae4e-b86260a1fa84; Carmen/Flint exec-647fe11d-14e2-45f4-ac0a-a706df38d834 plus tail exec-0244637a-e7c7-41eb-b708-530cc8253dbd.

### Marcus/Kevin portrait replacement

Replaced `victim-motion-marcus-kevin.png` with generator master exec-91a3c058-1979-4897-a4d1-7b08afa027e8 after portrait and uniform-gutter repair.1055×1491 RGBA,48 body components at alpha>128,zero body edge contacts. Original square preserved as `victim-motion-marcus-kevin-square-source.png`, excluded from runtime import. All48poses retain original ordering. First standing rear-capture alpha height154 vs rear-hold141; Kevin147vs139. Remaining approximate8%/5% pose-height difference means source body-density consistency is improved but not mathematically identical. No per-row pixel scaling applied.
