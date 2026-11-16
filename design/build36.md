# Build36 — intact locomotion, counter capture and special rules

Removed the split thigh/calf/torso renderer that caused the detached waist and toe stance reported in the screenshot. Broxton now renders intact whole-body frames for separate eight-pose walking and running cycles. Walk uses upright posture with heel/flat-foot stance; run uses forward lean, bent elbows, lifted heels and longer strides. Neighboring complete frames blend on the existing distance clock. No independent body-part transforms remain in locomotion. All frame anchors use the same per-row ground baseline and consistent .54 scale.

Counter hold extends .85→2.85 seconds for both heroes. Both the absolute expiry and idle-break limit are updated, so neither timer prematurely breaks a captured punch/kick. Successful captures clear stale attack gestures, buffered inputs, stun and action cooldown. Broxton uses compact arm/leg capture spacing, distinct attack follow-up poses, visible captured limbs and a low-grip kick takedown. Direction+Attack or manual Grab still chooses a throw. Existing defense costs, strong-enemy HP gates and counter-attempt timing remain.

Broxton forward special costs17 health, including a whiff, instead of18. Its acquisition bypasses heavy HP/armor grab resistance and temporary ordinary-grab immunity, including full-health Bruno, Brick, Otis and Leroy. Invalid targets such as dormant, waking-invincible, dead, grounded, flying or already-held enemies remain ineligible. Normal touch grabs retain their restrictions. Clear-out remains12HP, aerial special16HP.

Broxton dash punch has no cooldown beyond the .76-second committed action/recovery. It can be started with a new forward-forward+Attack after recovery ends. Close/far hit behavior from build35 is preserved; Reina blitz recovery unchanged.

## Asset provenance

Built-in image generation created `dist/assets/sprites/broxton-locomotion-v4.png` (1536×1024 transparent PNG) referencing Broxton walk-v3. Copied without bitmap modification. Alpha components only inspected for crops/seeds/anchors. Prompt: exact Broxton identity/outfit/proportions,16 whole-body frames in4×4 grid; rows1–2 eight right-facing upright walk phases with heel contact, flat-foot acceptance, passing and opposite-leg swing; rows3–4 distinct eight-frame run with20-degree torso lean, bent arm swing, long strides/high knees/airborne phases; naturally connected waist, consistent head/body scale, transparent gutters, no text/shadow/ground. Full prompt supplied in the generating call; runtime aligns and blends whole frames.

## Verification

Build36 tests use actual incoming punch/kick actions, timed counter input and2+ seconds of waiting before attack/throw follow-ups for both heroes. They assert clean release, knockdown and expiry, healthy-heavy special bypass,17HP hit/whiff cost, unchanged clear-out cost, and repeated dash after recovery. Existing timeout/cost/cooldown tests updated for intentional new rules. Browser review checked intact waist, distinct leaning run, walking support foot and a kick held beyond2 seconds. Full gameplay/controller suites run with simulated input; no physical DualSense available.
