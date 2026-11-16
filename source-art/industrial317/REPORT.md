# Industrial District art317

Built-in image generation produced two original images: a twelve-panel environment contact sheet and an isolated two-car freight train. The exact prompts are in PROMPT.md, untouched generated PNGs are retained beside this report, and pack-art.py rebuilds the shipping derivatives.

## Imported art

- assets/industrial317/district.webp: twelve cropped environment backgrounds with two-pixel edge extrusions and three shared original floor strips; 1459×934, quality70, 303916 bytes.
- assets/industrial317/freight.webp: two connected freight boxcars, transparent RGBA, 560×123, quality76, 26904 bytes. Wheels rest at local y122. No rails, ground or sky are baked into this prop.
- industrial317-data.js: exact scene/floor rectangles and train metadata;1633 bytes.
- Total shipping332453 bytes (about324.7KiB).

## Visual review

Inspected the original contact sheet, packed contact sheet and cropped train. All twelve scenes have distinct industrial identity, correctly connected architecture and no figures/UI. Outdoor scenes feature smokestacks, power infrastructure, smoke haze and polluted water where appropriate. Interiors have real cabinets, control consoles, shelving or tanks rather than placeholder boxes. The crossroads has a narrow access street receding behind the horizontal foreground sidewalk, suitable for Almeida Street routing; no painted road text is supplied. Checkpoint art contains a mounted guard shack and barrier, while the foreground combat strip remains open.

Atlas panels preserve original pixel dimensions when cropped. The repeated foreground lane is intentionally not included in each background cell: floor strips are available separately in metadata. The foreground surfaces should be rendered at one world-camera rate with backgrounds to avoid split scroll. Do not upscale a floor strip vertically into an entire background.

The train retains its actual generated alpha. Source edges have tiny low-opacity pixels; the cropped derivative is visually clean at native game scale. Two connected cars have level wheels. Align wheelBaseline122 to a background rail line, never to the fighting lane. This is an art review, not a guarantee of native game composition; final rendered ground alignment, smoke/sky integration and entrance locations remain runtime-owner checks.

No existing shipping artwork was changed. No proprietary artwork was copied. Rejected variants: none.
