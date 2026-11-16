# Hospital witness sprite asset

Built-in image generation produced one original transparent2172×724source atlas. Same middle-aged male witness, clean forehead/wrist bandages and pale hospital gown/trousers/slippers in three complete non-graphic states: frightened crouched hostage, relieved standing speaker, deceased lying still. Source and exact prompt are preserved here. Artwork was inspected before and after packing.

Shipping asset: dist/assets/hospital315-witness.webp,540×176RGBA,11770bytes, below strict38000byte cap. Metadata: dist/hospital315-witness-data.js, globalHospital315WitnessArt. Every frame uses one anatomical scale0.925 and common draw anchor(ax90,ay170); standing anatomical height148logicalunits. The same identity serves all six floors.

| State | Source rect | Anchor | Packed opaque bounds within frame |
|---|---|---|---|
| hostage | [0,0,180,176] | [90,170] | [68,79,123,170] |
| speaking | [180,0,180,176] | [90,170] | [63,10,137,170] |
| deceased | [360,0,180,176] | [90,170] | [9,137,171,170] |

Rect fields are[x,y,width,height]; opaque bounds are[left,top,right,bottom]. Paint each crop at[-ax×scale,-ay×scale] relative to its logical ground point, multiplying destination size by the common scale. The crouching/prone states are naturally shorter; do not independently normalize them to standing height. All three bodies have transparent margins and uncut limbs, with the opaque support bottom at170. No ground shadow is baked in; native shadow remains separate.

Packing keeps the three complete connected bodies rather than naïvely cutting equal original thirds (a few prone-head pixels crossed the nominal middle-cell edge). Subpixel detached speckles are discarded, full anatomy retained. Common source reduction is160/692, giving160source pixels for the upright body before the shared0.925world conversion. WebP alpha is preserved; transparent RGB may be codec-filled but alpha0pixels do not draw. No native raster test, runtime, index or registry was changed.

Repeatable packer: source-art/hospital315/pack-witness.py. It uses the retained original PNG if generation cache has expired. Basic validation confirms complete opaque bounds inside each crop, common support anchor, true alpha and11770byte output.
