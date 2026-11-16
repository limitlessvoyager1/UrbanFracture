# Original master-item artwork — Build319

Built-in image generation produced one original transparent ten-object atlas. The untouched output is items-original.png. PROMPT.md contains the complete generation prompt. pack-art.py creates the isolated shipping atlas; validate.py checks its metadata and symbols.

Shipping files:

- dist/assets/items319/pickups.webp — 320×144 RGBA WebP, quality80, 17,092 bytes.
- dist/item319-data.js — Item319Art metadata,735 bytes.
- Total17,827 bytes, below the19KB asset budget.

Ten identities: green1UPtoken; large red-cross first aid case; smaller green-cross health pouch; pizza slice; gold energy battery; gold energy canister; cash bundle; collectible phone; necklace jewelry; three diamonds. Existing ammunition sprites are deliberately not duplicated.

Each crop is complete and isolated. Rectangles are source-atlas coordinates. ax/ay are LOCAL to the source rectangle and use the measured alpha>32 body center/sole; width is recommended world drawing width. When drawing, use scale=width/rect[2], draw at(-ax*scale,-ay*scale) so the opaque sole lands on logical ground. Do not apply an arbitrary vertical bob to ground anchors. A separate subdued world shadow can be drawn beneath it.

Recommended world widths:1Up28, First Aid42, Small Health28, Pizza32, Battery28, Canister38, Cash30, Phone24, Jewelry30, Diamonds32. The first aid case is therefore visibly wider and taller than the smaller health pack. The canister is tall and substantial; its world-height is roughly61units at the recommended width.

Visual review inspected both the generated original and packed artwork. All medical crosses remain distinct at pickup scale, pizza/phone/valuables retain readable silhouettes, the token's1UPmark survives, and no adjacent object is included in another crop. True alpha is preserved. No existing game assets were changed.47 automated bounds/alpha/anchor/symbol/budget checks pass. Native scene placement, collision and final HUD integration remain the runtime owner's checks.
