# Build 43 — arena boundaries, clearer counters, and new enemies

Movement limits follow the visible camera edges (22 and 938 pixels), rather than an interior district seam. Camera scrolling and stage transitions remain intact. Reina’s grab chop lasts 0.22 seconds and lands at 0.085 seconds, versus 0.34/0.15 previously. Its shorter arm arc ends at neck height; damage remains 6 + 6 + 11.

Successful punch, kick, and knife captures pause for 0.20 seconds before the response. Reina proceeds automatically; Broxton retains manual choices and buffers an early follow-up input. Meter costs, timing, health gates, and controller mappings remain unchanged. Captured limbs are visible; Sato and Akari retain their actual extended-kick artwork at the catch. Non-knife weapon evasions remain evasions.

## New opponents

| Enemy | HP | Moves and behavior |
|---|---:|---|
| Sato | 90 | Kick combo 8 + 9 + 14; flying drop kick 20; high kick 17; counter 15. Walk speed 92 pixels/second. |
| Akari | 72 | Kick combo 6 + 7 + 11; flying drop kick 15; high kick 13; counter 11. Walk speed 110 pixels/second. |
| Flint | 110 | Random knife, pipe, 2×4, or wooden bat. Wild swings 11 + 11 + 15 or heavy strike 27, followed by a long recovery. |

Sato and Akari block ordinary offense. Counters and grabs provide the intended openings; paid grab specials and throws work. Their high kicks respond to jumps and blitz attacks, with a two-second cooldown and the standing recovery restriction. Block retaliation has a 0.36-second windup.

Sparse replacements introduce Sato in retail, Flint near hotels, Akari near condos, and a possible Sato/Akari pair inside the Velvet Room. The Financial District also includes sparse specialist and convict encounters. No specialist enters a crowd with three active enemies, and no more than two specialists can be active. Entries use the existing side and bottom entry animations.

## Validation

All 56 Node test files passed. New checks cover traversal across district seams, capture timing and Broxton’s buffered choice, chop timing, specialist defenses and kick attacks, all Flint weapons and recovery, disarming, crowd limits, 36 sprite poses, and captured-limb rendering. Full downtown and Financial District route simulations complete using ordinary inputs, with counter/grab tactics against specialists. Standard DualSense, raw Sony, and DSX controller simulations pass. Physical hardware was unavailable.

Browser QA checked all three enemies at ground level, attack poses, the caught-kick alignment, and Reina’s chop. Temporary QA files were removed before packaging.

## Artwork provenance

Generated with the built-in image tool, retaining transparency. The original PNGs were copied unchanged; only sprite metadata (component rectangles, seeds, and anchors) was computed.

Saved assets:

- `/workspace/sites/neon-knuckle-build43/dist/assets/sprites/sato-v1.png`
- `/workspace/sites/neon-knuckle-build43/dist/assets/sprites/akari-v1.png`
- `/workspace/sites/neon-knuckle-build43/dist/assets/sprites/flint-v1.png`

Each generation used the following shared prompt followed by its character prompt.

**Shared prompt:** Use case: stylized-concept. Asset type: production game sprite atlas for an original 16-bit-inspired detailed illustrated pixel-art side-scrolling beat-em-up. Transparent background. A strict 4 columns by 3 rows grid of 12 full-body poses, equally sized cells, generous transparent gutters, no text, no shadows, all face right, consistent character proportions and head size, feet baseline in each cell, nothing clipped. Crisp detailed colored pixel art with dark outlines.

**Sato:** Sato: shirtless Asian male martial arts expert, athletic lean muscular adult, long straight black hair, loose slate gray martial-arts pants, bare feet, determined expression. Row1: fighting guard, walking left leg forward, walking right leg forward, first straight front kick. Row2: second mid-height kick, extended spinning roundhouse kick, airborne flying dropkick, vertical high kick anti-air. Row3: blocking with crossed forearms, counter forearm strike, bent forward grabbed hurt pose, lying knocked down on back.

**Akari:** Akari: Asian adult woman martial arts expert, athletic slender, long black hair tied back, full white karate gi with black belt and white loose pants, bare feet, focused expression. Row1: fighting guard, walking left leg forward, walking right leg forward, first straight front kick. Row2: second mid-height kick, extended spinning roundhouse kick, airborne flying dropkick, vertical high kick anti-air. Row3: blocking with crossed forearms, counter forearm strike, bent forward grabbed hurt pose, lying knocked down on back.

**Flint:** Flint: rough adult escaped convict, powerful stocky build, orange prison jumpsuit with sleeves rolled up, dark boots, short cropped dark hair, angry expression. NO WEAPON in image: empty closed hands shaped to grip weapon, weapon will be drawn in code. Row1: fighting guard, walking left leg forward, walking right leg forward, weapon windup fists pulled behind shoulder. Row2: first wild horizontal swing with empty grip, second return swing with empty grip, powerful overhead downward strike empty grip, exhausted crouch recovering from swing. Row3: hurt recoil, reaching fist punch, bent forward grabbed pose, lying knocked down on back.
