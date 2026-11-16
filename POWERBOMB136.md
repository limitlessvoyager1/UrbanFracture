# Broxton jumping powerbomb — Build136

Checkpoint: `checkpoint-before-powerbomb136`, source `982dd43a0b8b2c0c5308bfd4667ee234ae1d354a` (Build135).

## Scope and controls

Grab + Special (DualSense Triangle) now executes the jumping powerbomb. Inspection found that this input previously released Broxton's hold; the old paid jumping slam was reachable only through Forward + Special. This update creates a distinct held-special path using that slam's existing23 HP cost,1.2-second special cooldown and shared1.14-second grappling/recovery framework. Forward Special remains the original47-damage grab dash, clear-out remains unchanged, and other heroes/controls are untouched.

## Shared animation

The move reuses Broxton's existing complete load, shoulder carry, slam and recovery art. Both sprites use their fixed import/render scales throughout. The same registered paired sampler drives attacker height and victim position/rotation; logical combat lane stays fixed, separate from visual height.

- Lift:0–.26 seconds.
- Brief load: .26–.37.
- Explosive ascent: .37–.56, to.625 of Broxton's character height.
- Faster accelerating descent: .56–.70.
- One impact: .70 seconds (frame42 at60Hz), with floating-point tolerance.
- Existing slam follow-through/rise: through1.14 seconds, plus brief impact hit-stop.

No horizontal jump travel, hover or size squashing is used. The existing shared recovery session prevents the primary opponent from waking/fading before Broxton completes recovery, including lethal impacts.

## Configurable damage and priority

`NeonCombat.Powerbomb136.config` contains the multipliers, jump timings, radius and resource values. Standard combo damage comes from the same `[6,7,9,13]` table used by Broxton's actual attacks, not an independent duplicated total.

| Contact | Multiplier | Current base damage |
|---|---:|---:|
| Grabbed opponent |1.80|63|
| Secondary direct body contact |.65|22.75|
| Shockwave only |.30|10.5|
| Outside both |0|0|

Fractional HP damage is retained internally; HUD presentation may round. Existing armor, guard, boss phase and invulnerability rules still apply to eligible secondary targets, so a protected target can receive a reduced/blocked result under its established rules.

The direct footprint is derived from the same held-body pose metadata, render scale, rotation and landing transform used by the renderer. Its long axis follows the actual falling body. Depth uses a narrow anatomical ground-plane envelope rather than confusing visual height with lane position. Enemy ground-plane hurtboxes must overlap it. The landing transform places the body's lower bound at the floor.

The shockwave uses2.5 Broxton widths (currently about140 world units), measured on the ground plane. It is tested only after direct-contact priority. One shared per-move contact set excludes the primary and prevents double-tier or repeat damage. No collateral is applied during lift/ascent/descent.

Direct hits knock standard enemies down with stronger travel; vulnerable strong enemies stagger with reduced push, while committed armor/boss resistance remains. Shockwave-only hits use smaller push/stagger. Impact adds a heavy ground sound,45ms hit-stop, restrained shake, dust/ring effect and a lighter shockwave cue.

## Verification

-104 primary cases:13 enemy types × both facings × foreground/background lanes × lethal/nonlethal.
- Direct single/two-target overlap, shock-only, just outside radius, off-plane/outside, Bruno, armored/boss resistance, priority and duplicate-hit tests.
-30/60/120Hz simulation checks for one impact, exact damage, fixed scales and shared recovery.
- Standard DualSense, raw Sony and DSX input simulations: grab + Triangle, both facings, held-button no-repeat, one23 HP cost and63 primary damage.
-15 established focused regression suites with the full Build136 logic chain: other heroes, charge moves, counters, grabs, companion, routes, startup and controller behavior.
- Browser inspector `powerbomb136.html`: production simulation, sprite-measured landing metadata, mirrored/lane/group controls, frame stepping and playback. Verified apex feet clearance, impact damage tiers and post-move grounded state. Physical controller hardware was not available.
