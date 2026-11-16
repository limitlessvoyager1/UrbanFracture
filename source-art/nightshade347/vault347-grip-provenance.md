# Nightshade347 — targeted vault grip candidate

Built-in image-generation edit of `hero-vault347.png`, whose original is retained as `hero-vault347-grip-before.png`. Requested change: ONLY arms/hands in zero-based6–9 (second row, columns1–4); preserve torso/head/legs/rotations, face/costume/device and all remaining20poses. Narrow the inverted pose's T-shaped arms into a twohanded shoulder/neck support, palms about50sourcepixels apart and elbows bent. Other three vault poses keep the same shared support instead of spreading hands wide. No unseen enemy drawn, effects, floor, or text. Preserve1536×1024RGBA and6×4grid.

For strict preservation of the other20frames, the importer should select ONLY candidate figures6–9 and retain the original source figures for all other indices. A full-sheet generative edit cannot guarantee unrelated pixels remain byte-identical; do not silently replace every pose with the candidate.

## Inspected candidate

Final `hero-vault347-grip.png` is1536×1024RGBA,24 isolated whole figures occupying unique cells0–23, no edge contacts. Alpha0–254 with972,532 fully transparent pixels. `hero-vault347-grip-raw.png` preserves the first corrected-grip output that had an unacceptable semitransparent gray backdrop; final candidate received a background-only extraction edit. Some faint edge halos remain, so use the existing connected-figure importer.

Visually confirmed: candidate6horizontal has two arms reaching down to a close support;7tucked inversion keeps both hands down/inward;8vertical inverted has elbows down and palms approximately50sourcepixels apart instead ofT arms;9rotating descent likewise keeps both palms toward shared support. Head/torso/legs and general grid placement match the original closely. Some non-target details drifted during full-sheet generation, so ONLY6–9should be imported from this candidate.
