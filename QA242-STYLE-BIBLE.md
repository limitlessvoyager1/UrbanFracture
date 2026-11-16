# Urban Fracture — Visual Style Bible, initial retained references

This is the project standard for future art reviews. Existing production art is retained as a reference; this document does not automatically approve new images or screenshot baselines. A high-resolution file or a “16-bit” label is insufficient.

## Visual identity

Detailed16-bit arcade beat ’em up: coherent human anatomy, readable silhouettes, substantial environment detail, convincing depth, connected characters and deliberate lighting. Preserve source texture/pixel density, rich material variation, believable industrial/city interiors, and clear combat telegraphs. Avoid flat low-detail replacements, arbitrary enlargement, stretched buildings, mismatched torsos/legs and giant props without physical justification.

## Retained reference board

Open these source images alongside the frozen gallery. Exact dimensions and hashes are in `qa/system242/asset-inventory.json`; changes trigger review rather than automatic artistic acceptance.

| Reference | Qualities to preserve | Rendering rule |
|---|---|---|
| `dist/assets/stadium/elevator-lobby240.webp` | Embedded elevator, consistent architectural proportions, detailed tile/door surrounds | Uniform aspect-correct crop; no squeezed full panorama. |
| `dist/assets/stadium/single-approach239.webp` | One stadium, Rhinos identity, coherent approach and tailgate composition | One world structure, no repeated facades; preserve approved perspective. |
| `dist/assets/casino-floor192.webp` | Dense casino materials, varied machines/patrons, chandeliers, deep skyline | Keep furniture behind combat when decorative; exterior effects only through valid glazing. |
| `dist/assets/casino-suite192.webp` | Warm interior, detailed furniture, believable windows and city depth | Exterior light/weather use the global state; no indoor snow/rain. |
| `dist/assets/uptown-promenade113.webp` | Detailed urban storefronts and readable pedestrian ground | Preserve source aspect and depth; no skinny buildings. |
| `dist/assets/woods139.webp` | Forest/laboratory detail, consistent terrain and distinct atlas rows | Crop rows correctly; no unintended atlas seams or artificial floor gaps. |
| `dist/assets/sprites/forest-run240.webp` | Eight connected poses, consistent costume and pixel density | Fixed.36 source scale; preserve planted-contact anchors and natural aerial stride phases. |
| `dist/assets/sprites/casino-security192-0.webp` | Established heavy anatomy, uniform and connected body | Shared1.10 actor factor,130HP; no stretched composite grab body. |

## Scale and perspective

The measurement reference is approximately200 logical pixels for an adult combatant in the960×540 world. This is a comparison envelope, not a command to normalize everyone. Actual hero transforms remain unchanged. Heavy enemies may be larger; children and distant adults may be smaller. Record category, source body bounds, actual renderer scale, depth factor and any explicit reviewed exception. A distant adult at half depth scale can be100 logical pixels without being a miniature.

Category ratio ranges live in `qa/system242/standards.json`: adultNPC0.80–1.15, hero0.82–1.18, regularEnemy0.78–1.18, heavyEnemy0.95–1.40; apply relative to200×depthScale. Doors1.05–1.85; slot machines0.85–1.20; forklifts1.10–1.90. These are broad suspicion thresholds. Signs and decoration vary widely and need purpose-specific review; the initial broad ranges are not artistic certification. Vehicles need width, context and plane review as well as height.

## Aspect and contact

Preserve source aspect with uniform scale and deliberate crops. A perspective projection must carry an intentional transform, reason and reviewer. Transparent padding is not body height: measure opaque anatomy or documented source anchors. Foot soles, ground shadows, collision and logical plane should agree within3 logical pixels for grounded contact. Airborne strides, jumps, boosters, throws, knockback and dedicated animation offsets need explicit exceptions, never a generic exemption for all movement.

Moving grounded characters require actual gait advance driven by travel. Static legs during entry are a defect. Review planted-foot sliding across consecutive contact samples. A run's airborne phase is not a floating defect. Do not repair visual anchors by teleporting logical bodies or changing synchronized throws.

## Composition, collision and lighting review

Doors attach to walls; lifts sit inside valid structures; signs have supports. Main fighting lanes remain readable. Decorative tables and parked vehicles do not trap enemies or block required exits. Destructible footprints match their visible scale. Rain, snow and celestial effects use the global environment and appropriate indoor/outdoor masks. Day/night changes must preserve readable combat, and ambient crowds need convincing ground/depth anchors.

## Artistic acceptance checklist

Review detailed materials, silhouette consistency, anatomy, local pixel density, composition, depth, lighting, weather masking, object scale and combat readability. Compare day/night and bright/dark backgrounds. Record scene/asset ID, source hash, renderer/capture metadata, reviewer, date and decision. “Review required” is an acceptable outcome. Never reduce this decision to image dimensions, entropy, style prompts or filenames.
