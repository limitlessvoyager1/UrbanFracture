# Build137 — Broxton football spear

Only normal front-grab Forward + Attack is replaced. Broxton tackles the held victim, mounts, punches four times, dismounts and returns to guard. Other throws, counters, combos, charge, blitz and the paid Grab Special Powerbomb remain unchanged.

Checkpoint: `checkpoint-before-spear137` at `efb93fc4532bd668bc1d05bb090152ceed08c4b3`.

The shared 108-frame timeline delivers damage at frames40,59,67,75,83. Existing total26 is preserved:7.8 tackle,3.9 each first three punches,6.5 final punch. There is no special resource cost or collateral damage. Configuration is in `dist/spear137.js`. The victim remains grounded until Broxton completes recovery, then receives an additional .25-second wake delay. Lethal damage cannot remove the victim before the final blow.

One logical combat plane and fixed sprite scales are retained. A shared head anchor carries standing/falling/grounded victim poses; mounted height accounts for torso height. Both actors stop independent movement. Cleanup handles interruption, cancellation, death, removal and scene changes. During mounted frames54–86 one readable melee threat may engage; new attacks outside that interval are deferred. Block or Dodge can cancel the mount. Broxton does not receive a whole-move invulnerability flag.

## Artwork

Asset: `dist/assets/sprites/broxton-spear137.png`. Created with built-in image generation using the existing Broxton base as reference. Connected whole-body poses replace an abandoned articulated-arm pass that showed a shoulder seam. All frames use one fixed import scale; no sprite scaling simulates the tackle.

Generation brief: Create a transparent 4×4 production sprite atlas matching Broxton's existing design, face, medium-brown skin, muscular proportions, black hair/beard, shoulder tattoo, white tank, black cargo trousers and boots. Right-facing full-body poses: hold, lower shoulder, drive step1, drive step2, grounded follow-through, mount step, mounted guard, right windup, right impact, left windup, left impact, heavy windup, heavy impact, dismount, kneeling rise, guard. Preserve consistent anatomical size and clean connected anatomy. Show only Broxton, no victim, weapon, text, gore or background.

## Verification

- 104 mirrored enemy-size/lane/lethal cases; five exact impact events, no early/duplicate damage,26 total, no resource cost, fixed scale/plane, boundary safety and attacker-first recovery.
- Simulation at30/60/120Hz; safe interruption, earned lethal damage settlement, defensive cancellation and one admitted threat.
- Standard, raw Sony and DSX controller mappings in simulation, both directions; no held-button repeat.
- All15 full-chain audit135 regression suites pass through spear137.
- Powerbomb136 logic and controller suites also pass through the new full chain, preserving63/22.75/10.5 damage priority and original resource cost.
- Browser checks: Marcus tackle/impact and punches; Bruno mirrored mounted contact and recovery. Whole-body art is connected; the final pose keeps the opponent grounded beside Broxton.

Physical controller hardware and human difficulty playtests were not performed. The developer inspector is `dist/spear137.html`.

Build138 correction: removed the damage filter that previously rejected attacks outside the mounted threat window or from another attacker. Broxton now takes eligible damage throughout every phase and safely interrupts immediately. Sequence start clears invulnerability. The director still limits NEW attack commitments to one readable mounted threat; existing attacks/projectiles are never cancelled by this move. Block/Dodge remains available during mounted punches. Tests now explicitly damage/interupt at six phases and accept an existing attack from an unassigned enemy.
