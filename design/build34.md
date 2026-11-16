# Build 34 — Broxton heel, footwork and grip switch

Neutral jump still has no attack until Attack is pressed. The heel kick now tests contacts throughout .10–.34 seconds instead of only once at .12. Forward reach is108 pixels, close overlap extends34 pixels behind the center, and lane tolerance is32. One hit per enemy per kick remains enforced by the hit set. Damage stays25. Guard, armor, wake immunity and anti-air behavior are preserved.

The360 backward throw is .76 seconds (was1.02), releases at .36 (was.48), and completes its shared full turn from .02–.70. Holder art and victim orbit use the same shortened clock, keeping release and landing continuous.

The walk now uses an eight-frame atlas with distinct contact, weight acceptance, passing and knee-lift poses, replacing the repeated wide-stride silhouettes. Frames advance by distance at100 pixels per cycle. Discrete foot poses replace alpha-blended duplicate boots. Body anchors use the belt center and floor baseline.

Grip switching uses a smooth path around the fixed victim. Front-to-rear finishes38 pixels away; rear-to-front finishes52 away, in the actual direction across the opponent. Front/back orientation poses lead into the mirrored destination grip, matching the facing change at completion. Both directions preserve the hold and stationary victim without an endpoint position snap. The shared path correction also applies to Reina.

## Asset provenance

`dist/assets/sprites/broxton-walk-v3.png` generated with built-in image generation, transparent1774×887 output copied unchanged. Reference: existing Broxton motion-v2. Prompt: preserve exact Broxton face, muscular proportions, medium brown skin, beige muscle shirt, tattoos, black pants and boots; eight right-facing walk frames in4×2 cells; successive heel contact, weight acceptance, narrow passing, knee lift, opposite-leg heel contact, weight acceptance, passing and knee lift; opposite arm swing, consistent torso and anatomy, transparent gutters, no text/ground/shadow. Alpha components were inspected only to extract crops and anchors; no bitmap editing.

## Verification

New build34 tests exercise moving into the active kick after the first collision check, toe reach, single-hit damage and wrong-lane rejection, both facings, both grab-switch directions with fixed victim and bounded per-frame movement, corrected final grip spacing, faster full360 throw and single landing. Existing gameplay and simulated controller suites also run. Browser QA verified25 damage from neutral aerial Attack, new contact/passing steps and rear-view grab switch. No physical DualSense hardware testing.
