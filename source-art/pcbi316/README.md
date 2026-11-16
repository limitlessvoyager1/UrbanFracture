# Original PCBI character art

Generated with the built-in image generator using the exact prompts in `prompts.json`. No proprietary assets, existing Spectre art, or other characters' frames were used. Original full-resolution transparent PNGs are preserved as `talon-original.png` and `jaguar-original.png`.

`tools/pcbi316/pack.py` extracts the eight principal connected full-body components in each of six rows. This deliberately avoids nominal-grid clipping: several hands, the extended baton, and Jaguar's prone body cross the nominal cell boundary. Small detached alpha noise is excluded. Source alpha is preserved with only import threshold96; no body part stretching or independent frame scaling occurs.

Shipping atlases use224×224cells in an8×6grid. Frame index i has exact rect `[224*(i%8),224*floor(i/8),224,224]`. All sole anchors are `[112,220]`; opaque pixels finish at local−1 after anchoring. Root is centered within each whole body footprint. The uniform anatomical conversion is170/172 for Talon and170/165.5 for Jaguar, based on the median eight walk source heights. Crouched/prone poses remain naturally shorter.

Complete per-frame source bounds, rects, opaque bounds, weapon flags and socket coordinates are in `metadata.json` and `dist/pcbi316-data.js`. `animations` is the explicit authored index map. Sockets are cell-space pixels; local world coordinate = `(socket−[ax,ay])*scale`. Guns, baton and handheld taser are baked into listed frames. Runtime must not double-draw a second weapon. Talon fire frame18 includes a small baked muzzle flash; Jaguar fire19 has visible firing extension but no large flash, so runtime may add one at its muzzle socket.

Talon is a stern gray-templed older man; Jaguar is a younger dark-haired clean-shaven man. Rear PCBI lettering is clearly authored. Small front chest lettering varies with folded cloth and should be inspected at actual gameplay scale; do not claim typography certification from this atlas review. These are original full-body key poses, not a certification of synchronized two-person grapples. Runtime must retain a shared grapple clock/positioning and validate hand contact against actual hero bodies.

96 isolated frames were visually inspected in `reports316/pcbi-art/{talon,jaguar}-compiled.jpg`. Compilation checks: `node tools/pcbi316/check.cjs`. Talon WebP278606bytes; Jaguar253140bytes; total531746bytes (about519KiB). Transparent originals and metadata remain outside dist. No existing source/assets/index/registries were modified.
