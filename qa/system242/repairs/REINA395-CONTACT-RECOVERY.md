# Reina contact and recovery repair

User evidence: Screen Recording 2026-11-17 103636.mp4 (274.07s), timestamps 6/7/52/128/172/226 seconds.

Repairs: authored rear grip and knee body, authored Kevin pain response and existing identity-specific held pain frames, one opaque authored chain pose per tick with matching socket, loose-hair running family and matching frame socket, complete hip throw art at one fixed scale, no legacy cyan/bright-blue recolor over the current design, matching held-blade crop for Kevin projectile/drop, native grounded hook pose retained through down/death, detailed 62-unit plank. Native shortened plank contact tip follows its rendered extent.

Requested mechanics: sword descent takes 1.10 times its former 0.22s (0.242s); 10 damage, 0.85s stagger and native grab conversion remain. Flint single heavy swing has no added exhaustion hold; triple swings have 76/84/88/90 frames for knife/pipe/plank/bat, using the existing weapon-specific recovery plus 24 frames per extra swing. Active contacts, damage, commitment and armor remain. No merge or protection changes.

Focused current-native art audit: 18 mirrored scenarios, 4320 ticks. Initial retained 394 audit: 14 cases, 1680 ticks, passed before final swing-art replacement. Input/native/view regression initially 34 passed and two failures because old floor fixtures used fake Image objects; actual decoded image fixtures now pass all seven view cases. Preserve reports395-regressions.log and reports395-floor-fixture.log as historical local evidence. Tests retaining old 0.22s/180-frame expectations are preserved under repair-references/reina395 and changed only for the requested mechanics.

Remaining evidence: no physical DSX DS4 approval, artistic approval, performance or full game certification. The sheet checks are automated native execution and still captures; a visible passing QA check is not owner acceptance. Recheck rear contacts on every enemy size, walk/run smoothness, chain full arc, all costume/hair families and native get-up continuity in the published playtest. Do not merge while evidence or QA blockers remain.

## Generated art
Built-in image_gen, transparent, reference identity-preserving generation. Runtime assets: dist/assets/reina395/contact.webp and swing-throw.webp; exact hashes in reina395-contract.json. Original generated PNGs remain in the Codex generated_images directory; packaging keeps one fixed scale per identity without stretching bent poses to standing height.

Prompt set: contact atlas requested eight adult complete-body poses, Reina loose-hair rear waistlock/knee, Kevin gritted-teeth pain, Flint slumped/doubled-over exhaustion, no blur/glow/blood/weapons. Swing/throw atlas requested sixteen complete Reina bodies in a 4x4 grid: eight natural chain wind-up/swing/follow-through/recovery frames and eight hip-throw frames; constant anatomy, dark royal-blue floral dress, white trim, gold bracers, sandals, cheek scar, scabbard, untied dark-navy hair, transparent background and no opponent/weapon baked into art.
