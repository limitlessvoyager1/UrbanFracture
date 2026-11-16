# Golden energy pickup art — Energy316

Built-in image generation produced one original transparent2172×724RGBA source atlas, retained as pickups-original.png with the exact prompt inPROMPT.md. Three different clear silhouettes were inspected before and after packing: short cell, squat two-terminal battery, tall carry-handle canister. Golden electric cores match the shared gold energy-meter direction; gunmetal frames keep them readable on light backgrounds. No text, value labels, brand logos, detached effects or floor shadow is baked in.

Shipping: dist/assets/energy316-pickups.webp,288×96RGBA,7946bytes atWebP quality90, below20000byte cap. Metadata: dist/energy316-data.js, globalEnergy316Art. Repeatable source packer: pack-art.py.

| Key | Energy metadata | Rect[x,y,w,h] | Sole[ax,ay] | Opaque longest world edge | Shared draw scale |
|---|---:|---|---|---:|---:|
| cell |15|[0,0,96,96]|[48,90]|18|.225|
| battery |35|[96,0,96,96]|[48,90]|24|.3|
| canister |60|[192,0,96,96]|[48,90]|30|.375|

Draw at(-ax×scale,-ay×scale) relative to the logical ground point. World-size recommendations measure the longest opaque edge: battery is24wide and19.2high, while cell and canister use18/30height. Object aspect ratios are preserved. Item values are metadata for integration; this asset task changes no game resource logic.

All three opaque crops have clear margins and support bottom90; no terminals or handle are cut off. A preview at the actual recommended world sizes is preserved as world-sizes-preview.png (magnified4×nearest for inspection). Genuine alpha is preserved; WebP transparent RGB can be codec-filled, but alpha0pixels do not render. No native raster, runtime, index, registry or pre-existing art was changed.
