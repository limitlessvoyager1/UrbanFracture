# Original attack art provenance

Built-in image generation was used, with only Urban Fracture's own `reports290/sources/thug.png`, `reports290/sources/enforcer.png`, and `art-source278/reina-three-kicks.png` as identity/style references. No reference-game sprites, artwork, audio or code were used.

Prompts requested consistent anatomical scale, whole-body poses, actual transparent backgrounds, original illustrated pixel art, no clipped bodies, no extra limbs, no trails/blur, and explicit anticipation/contact/follow-through/recovery. Family briefs:

- Marcus: eight straight punches, eight rotational-hook phases, eight knife-thrust phases; a separate eight-pose diagonal slash. Dirty ivory tank, charcoal cargo trousers, brown boots and short brown hair.
- Bruno: eight straight punches, eight hooks, eight rising uppercut phases and eight grab-approach/whiff-recovery phases. Maroon vest, charcoal cargo trousers, black gloves/wraps/boots and short black hair.
- Reina kicks: eight phases each for the existing roundhouse, tornado roundhouse and spinning hook kick, including back/hip turning poses.
- Reina extra: eight circular axe-kick blitz phases, eight short-sword spin phases, eight knee-strike phases, four elbow phases and four opposite-hand crouching-palm phases.
- Reina dash sword: eight phases of the existing forward downward short-sword slash, not a thrust or spin.

Targeted revisions restored margins/complete boots, corrected the knee contact from an extended leg into a bent-knee strike, and recolored only dress fabric to approved bright blue #0095FD while keeping black gloves/sandals and pale embroidery. The final RGB sources and preserved original alpha references are in `source-archive/build297`.

`tools/attack297/import.py` extracts connected bodies, preserves fixed source roots/opaque soles, uses one anatomical scale per atlas, and records source hashes. New oversized dash/slash families are uniformly imported at approximately256source body pixels, above their logical render height. New atlases use WebP quality86 with binary alpha; no existing artwork is recompressed. Source paths and full numeric import evidence are in `reports297/art-import.json`.

These are original playtest assets, not automatic artistic or screenshot-baseline approval.

Final short-clinch correction: `bruno-grab-close.png` contains eight replacement poses authored with deeply bent elbows and hands kept near the upper chest, rather than an extended lunge. The importer replaces only the old grab row, using one fixed 181/314 transform for all eight poses and fixed source-root/sole registration. Punch, hook and uppercut source pixels remain unchanged. This addresses the rendered reach of the missed-grab approach without enlarging the native capture range. Both original and replacement sources are retained.
