# Build38 — Broxton/Bruno contacts and Carmen locomotion

Reina rear-hold Forward+Attack takedown is38 total:18 takedown+20 grounded punch. Broxton front-hold Back+Attack spin throw is24. Other build37 damage/cost changes retained.

Broxton opening jab reaches102 instead of86; following strikes108/116/124. Normal combo strikes test a .14-second active window after their contact time and retain a hit set to prevent repeat damage. Counter combo poses now use strike times rather than the already-incremented next-strike index, keeping the first impact visible.

Broxton guard now uses the same full-body guard stance/scale as idle instead of the oversized technical guard image. During Bruno oneTwo/hook/frontKick, guard/counter spacing prevents body interpenetration, with118-pixel punch and150-pixel kick spacing and matching reach140/170 for contact at the guard. Live counter tests exercise the actual incoming strikes. The prior below60% HP gate is retained; a premature attempt now displays WEAKEN TO COUNTER. Clinch/bomb grabs remain grabs to dodge rather than catch. Counter attempts/costs/2.85-second captured hold remain.

Broxton movement art now tucks the far hand behind his torso to remove the apparent second near-side arm. Locomotion remains one opaque frame per time, no blended duplicate silhouette. Low clinch art was revised with fist at belt height and elbow bent; the victim pulls closer during each stomach blow then returns to normal hold distance. During these punches the holder draws after the victim, keeping the striking forearm visible. Headbutt remains distinct.

Carmen gets eight dedicated walking poses. Her leap travels to the aimed lane and a45-pixel stand-off over .10–.62 seconds. A .32–.58 contact window checks actual player position, with125-pixel forward reach and30-pixel lane tolerance. One connected hit per leap, with ordinary block/invulnerability rules; moving outside the aimed lane avoids it. This replaces the early one-time collision test that missed long approaches.

## Generated asset provenance

Built-in image generation, transparent PNG output copied unchanged. Python inspected alpha components to define frame crops/anchors only; no pixel edits.

- `dist/assets/sprites/broxton-locomotion-v5.png`,1536×1024, reference locomotion-v4. Prompt: preserve exact Broxton identity, beige top/tattoos/black pants/boots and consistent scale,16 right-facing full-body poses4×4; eight upright alternating heel/flat-foot/passing walk phases and eight forward-lean running phases; one clear near arm, far arm occluded behind torso with only small far hand, no ghosting/shadows/text, transparent gutters. Runtime crops separate adjacent row frames; walk scale .54, run .62.
- `dist/assets/sprites/carmen-walk-v2.png`,1536×1024, reference original Carmen. Prompt: exact female dirty cop identity, brown-blonde ponytail/navy shirt/badge/black pants/gloves/boots/baton, eight sequential right-facing contact/flat-foot/passing/knee-lift walk phases4×2, opposite legs, fixed torso and anatomy, transparent no extra limbs/shadows/text. Runtime scale .31.
- `dist/assets/sprites/broxton-clinch-v4.png`,1774×887, reference combat-v3. Edit prompt preserved4×2 layout and existing other moves; only first two clinch poses requested lower fist at belt/navel level, elbow tucked/bent90degrees, left collar grip high, right fist wound back then short stomach strike, crouch and hip rotation, exact anatomy/identity, no extra arms/trails, transparent. Complete resulting atlas is stored with freshly extracted bounds/anchors.

## Validation

New build38 suite covers live Bruno punch/kick catches below gate, guard spacing and reduced damage, opening-jab range/late entry/single-hit, exact38/24 throw totals, and Carmen kick connections from160/240/295 pixels with single damage and lane evasion. Existing campaigns and simulated controller tests run. Browser review checked guard body separation/stable scale and visible belt-height grab punch. Physical DualSense unavailable.
