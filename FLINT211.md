# Build 211 — Flint weapon refinement

Based on Build210 (`b426f4497be98c5885b1b9569bafc4d5daef7d55`), with reversible tag `checkpoint-before-flint211`.

Flint remains95HP, wears the existing orange prison uniform, uses the existing four weapon identities, and retains the native disarmed punches/front kicks. No other character's move definitions were replaced.

## Definitions

`dist/flint211.js` is the data-driven source of timing, damage, ranges, swing paths, armor and diagnostics. Existing actions remain `flintWild` / `flintHeavy`. Knife, pipe, plank and bat (`woodBat` alias) use different configurations.

| Weapon | Wild startup/active/recovery | Power startup/active/recovery | Forward tip reach | Wild contact damage | Power damage |
|---|---|---|---|---|---|
| Knife |11/4/28|22/5/38|88|8/8/10|20|
| Pipe |15/5/36|28/7/46|143|11/11/15|27|
| Plank |18/6/40|34/8/52|176|10/12/15|29|
| Bat |20/6/42|38/8/56|198|12/13/17|34|

Damage is base damage before existing difficulty, blocking and hero modifiers. The width reference is110 world units; ranges are .8/1.3/1.6/1.8 of this reference. Actual rendered hand-to-tip segments and collision use the same positions. Target hurtboxes remain the existing sizes.

Wild attacks have three individually timed swings. Each has its own startup, active interval and follow-through, with6/8/10/12 transition frames between swings. Wild follow-throughs are4/7/9/10 frames; power follow-throughs6/10/12/14. The listed recovery begins after the final follow-through, rather than being overlaid on it. No old1sec/1.15sec recovery or .75sec post-action cooldown is stacked onto the definition.

## Directional danger and defense

Long weapons have rear swing preparation spans of8/10/12 frames, with damaging rear portions lasting4.4/5.5/6.6 frames while the weapon is actually behind him, active only while the actual weapon travels behind Flint. Pipe emphasizes longer standing recoil; plank/bat wild finishers knock down on a clean frontal final hit. Rear impacts deal50% of that swing's base damage and cause standing stagger. One shared contact set prevents the same swing from hitting again in front. Knife has no rear hitbox.

Long weapons receive120-degree frontal armor only during committed swing intervals. The arc uses combat-plane depth weighting consistent with existing directional defenses. HP damage remains unchanged. Rear/side hits, vulnerable startup, transitions and recovery can interrupt; knife receives no special armor. Existing armor-breaking moves/counters retain their eligibility. A resisted stagger produces a short metallic-white sprite flash, a restrained spark and the existing armored-impact sound; it never changes Flint's permanent colors.

Native sprite pieces are articulated at the shoulder/elbow/wrist. Body scale and floor anchors are constant; weapon segments stay attached to the sampled hand. No new raster assets or blurry background recompression were introduced.

## AI / integration

Knife favors quicker close pressure; pipe medium pressure; plank broader sweeps; bat slower heavy commitments. Initial power preferences22/33/38/48%, modified by observable blocking/crowd circumstances. Existing entry, stun, grappling, status, Director and unarmed controllers stay in place. New dispatch lives inside the native specialist AI rather than bypassing outer condition handling.

The same Director retains3 pressure points/max2 commitments and forecasts both rear and forward threats. Both `beforeAI` and explicit `reposition` respect mandatory recovery. Attacks cannot cancel into guarding, dodging, retreat or another attack. Punishing an already recovering Flint does not restart a fresh full recovery timer. An interrupted earlier commitment enters vulnerable recovery overlapping native stun.

Human Shield uses the actual sampled weapon segment and consumes the same swing identity; it cannot leak duplicate damage onto Broxton after interception. Disarm stops the scripted weapon attack and restores the existing unarmed fallback.

## Diagnostics / validation

`Audit135.report(game).flint211` and the existing `video207.html` review display weapon, attack, range, frame data, transitions/follow-through, forward/rear states, actual segment,120-degree armor direction, damage taken while armored, remaining recovery, interruption reason and AI history. The review has weapon, target-side, frame-step and playback controls.

`tests/flint211.cjs` covers all four profiles at30/60/120Hz, both facings, damage ownership, actual range/depth misses, rear windows, directional armor, vulnerable/uncancelable recovery, no stacked legacy timers, all six unarmed fallbacks, existing counter gates/dodges, weapon-specific AI selection and shared threat admission. Native counter eligibility restrictions and Orion's reserved counter framework remain unchanged.

Existing210 mixed encounters,209 street enemies,181 shield, controller157 and26 current150 regression suites were checked separately. These tests verify mechanics and regressions; sustained human playtesting remains useful for Normal balance tuning.

Four older developer review pages now load their shared script chain from current `index.html`; their UI and inspection code remain intact. This removes repeated script lists and preserves deployment space without sacrificing art quality.

Final validation also passed 24 live mirrored counter interceptions, 24 mixed-group fixtures across six heroes and four weapons, physical Human Shield interception, bank zoom geometry and armed entrance completion. Visual review checked knife, pipe, plank and bat attachment, proportions, ground alignment and rear arcs.
