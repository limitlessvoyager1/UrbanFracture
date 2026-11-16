# Build 20 — Kevin and Brick

Marcus starts unarmed, uses the three-punch combo and heavy hook, and rolls exactly once when first below 50% HP: 25% draw chance. A failed roll stays failed. Knockdown disarms him as before.

Kevin is a separate knife thug in a hunter green tank. He starts armed, alternates 17-damage close stabs and 18-damage step slashes (132 reach), and closes distance by default. At 220–600 range in the same lane he rolls 30% to throw; failed rolls are separated by 2.5 seconds, successful throws have a 6-second cooldown. Knives travel at 420 units/s, deal 17, respect lane, jump and guard, and cannot hit twice. He visibly throws then draws another knife in a dedicated 0.65-second action.

Carmen: 48→56 HP; AI baton 9/11/14, taser20, leap22, wake sweep18. Still lower HP than Marcus/Kevin.

Brick: 275 HP, taller than Bruno, sunglasses, three-piece charcoal suit. Waits arms-folded at x8000 by the Velvet Room door, flanked by Marcus/Kevin. Within 300 units the formation activates. Dash punch travels during its windup, 25 damage, heavy hooks25, uppercut21 with the existing one-second anti-air cooldown and wake recovery guard. Clinch deals two stomach punches of8 then a26-damage throw with145-unit displacement. Brick and Bruno resist ordinary grabs until below25% HP; timed catch counters retain their existing behavior. Brick has committed-hook resistance and punishable recovery. Once the first door escort pair is defeated, one replacement Marcus/Kevin pair arrives. Brick's death cancels unspawned waves, makes every living ally flee, and opens automatic entry after a1.2-second escape beat. Survivors do not have to be defeated.

Some ordinary planned Marcus spawns are replaced by Kevin throughout the streets/venue, and the third initial alley escort is now Kevin. One active Bruno/Frankie restriction remains. The complete test route defeated46 enemies (including door replacement escorts); Brick can be killed earlier to skip surviving supports.

Food drops are clamped to the playable ground so street drops above the curb remain collectible.

## Art

Built-in image generation; direct alpha preserved. Asset `dist/assets/sprites/kevin-brick-v1.png`; component metadata `dist/kevin-brick-data.js`. Six Kevin poses and six Brick poses, integrated into gameplay, portraits and Sprite Room. Fall/get-up motion rotates their own costume art; some actions share poses.

Prompt: Production sprite atlas for polished16-bit arcade beat em up. Transparent background, no text. Exactly12 full-body isolated sprites in4 columns and3 rows, facing right three-quarter side view. First6 Kevin: rough dark brown hair, hunter green tank, rugged charcoal pants, boots, tattoos, knife; idle, two walking strides, stab, step slash, throw. Last6 Brick: tall muscular bouncer, sunglasses, charcoal three-piece suit, waistcoat/tie, polished shoes; arms folded, walking, dash punch, heavy hook, uppercut, stomach punch. Generous transparent gutters, crisp pixel clusters, rich shading, no floor or labels.

## Validation

All22 regression suites pass, including exact probability boundaries, one-shot low-HP decision, rearm/projectile logic, Brick HP/grab threshold/escort replacement/flee/door gate, existing throws/controller/anti-air and sprite loaders. Full ordinary-input route:252.1 simulated seconds,46 kills,98HP remaining, zero retries; fixed RNG seed20 for reproducibility, no HP/damage overrides. The bot uses movement, blitz, cartwheel, throws, ground attacks and food. Browser QA verified new atlas silhouettes/alpha, Kevin green tank, tall suited Brick waiting with escorts, dash punch,275HP portrait HUD and post-defeat interior transition. Temporary QA page removed before publication.
