# Build35 — Broxton close combat and continuous footwork

Held Attack now has dedicated low stomach-punch wind/contact art followed by collar-grip headbutt wind/contact art. The three strikes retain14+14+20 damage and final knockdown. This fixes visual reuse of ordinary punches without changing the grab input.

Walking and running use a continuous textured leg rig built at render time from the established walk atlas. Thigh, calf and boot sections follow continuous hip/knee/ankle transforms. Planted feet move backward at the actor movement speed; swing feet lift on a smooth squared-sine arc with matching endpoint velocity. A single distance clock blends100-pixel walking and160-pixel running cycles, with gradual lean/lift/bob changes. This removes full-body pose jumps and ghosted duplicate boots. The bitmap source is unchanged.

Clothesline steps58 pixels through contact plus12 follow-through pixels. The open arm sweeps continuously horizontally across the neck plane. Victim descent starts in the final30% of the contact timeline, keeping the enemy upright for the incoming arm instead of falling before the swing. Shared choreography retains single landing and continuous attacker follow-through.

Dash punch: targets within80 pixels and the correct lane at startup are knocked down if hit; targets met later in a longer dash retain knockback. Total action .76 seconds, previously .52: about14 extra recovery frames at60fps. Two-second cooldown begins after recovery. Armor/guard rules remain.

Moving aerial Attack is visually a downward punch with24 damage and brief stun (internal historical action key remains broxSuperman). Air+Down+Attack uses a new elbow-first, boots-trailing-left pose. Neutral heel reach reduced108→92 pixels; rear overlap34→20 and lane tolerance32→28. Damage25 and active window remain.

Enemy approach displacement increases8% and attack wait timers elapse10% faster while Broxton is selected. Active attack animations, anti-air cooldowns, invulnerability, entrances, dormant guards and fleeing enemies are excluded from this acceleration. Reina difficulty unchanged.

## Asset provenance

Built-in image generation produced `dist/assets/sprites/broxton-combat-v3.png`, transparent1774×887 PNG copied unchanged. Metadata extracted alpha components and assigned consistent anchors; no raster edits. Prompt used broxton-grapples-v2 reference, preserving exact medium-brown skin, short black hair/circle beard/stud, beige sleeveless top, tattoos, black cargo pants/boots, proportions and pixel detailing. Eight4×2 poses: collar grip with low fist windup; bent-elbow waist-height stomach strike; collar-grip headbutt windup/contact; rear-arm clothesline windup and open-arm neck-height contact; airborne downward/right punch; sideways elbow drop with boots left and elbow downward/right. Transparent gutters, no opponent/background/shadow/text.

## Validation

New tests cover close/far dash behavior/recovery, reduced heel reach, distinct grab attack states and damage,8% enemy displacement, faster wait timer and walk/run blend continuity. Full existing gameplay and simulated Gamepad tests run. The Broxton campaign bot now blocks imminent telegraphed melee or dodges with low defense to test ordinary defensive play under the increased pressure, without HP/damage overrides. Browser QA inspected stomach contact, footwork, run and elbow direction. Physical controller hardware unavailable.
