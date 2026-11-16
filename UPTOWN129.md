# Build 129 — Standing contact and Uptown strip mall

Standing combos for all four heroes now require the opening attack to connect with a live enemy. Damage or a real blocked contact qualifies; hitting furniture or an invulnerable enemy does not. A whiff finishes its existing recovery, clears queued continuation and leaves the next attack at stage one. Nova retains her faster confirmed tap chaining and one-second final recovery. Forest's existing opening slash check remains unchanged. Damage, later stages, charges, airborne moves, grabs and counters retain their previous behavior.

The Uptown route is Promenade (7200 units), Outdoor Strip Mall (3600), Lakeside Park (3400). The added section has ten staggered encounters, daylight, fleeing pedestrians and health pickups, followed by the normal clear-and-move-right fade to the park. Both stage changes award the existing 15 HP checkpoint recovery. Scene Select, controller navigation, retries and restart identify all three sections. The existing park route fork remains intact; Downtown and Financial global zone tables are unchanged.

## Artwork

New project asset: `dist/assets/uptown-mall129.webp`. Created with built-in imagegen, then compressed to WebP without resizing. The generation brief requested a wide, sunny, detailed retro side-view outdoor shopping strip: bookshop, sneaker boutique, homewares, florist, café and a large HARRINGTONS department store, plus the Lakeside Park entrance; level horizontal ground and empty foreground combat plaza. Fixed storefront proportions and cached integer parallax avoid wavy movement; a separate ground layer follows the camera 1:1. Traffic remains in the existing street section rather than driving across this pedestrian plaza.

## Verification

- Actual fixed-step simulation for all four heroes in both directions: contact and guard chaining, range/plane/immunity/prop whiffs, Nova's queued whiff recovery, later missed attacks, and standard/raw Sony/DSX input decoding.
- Four-hero route progression through both fades, bounds, daylight, waves, park exits and restoration of the original Downtown route.
- Live game-controller VM: standard/raw DualSense mall selection, retry/restart, paused R1 scene menu, park selection and park retry.
- Gamepad mappings/recovery, Nova controller/special, Forest controller/movement, DDT, shared recovery, grip transition and original-hero parity regression suites pass. Hardware controller testing was simulated.
- Browser: Build129 loads, the new mall can start via Scene Select, sunny shop art and the open plaza render, active enemies and fleeing pedestrians appear, with no application error logs.

Checkpoint: `checkpoint-before-strip-mall-129`.
