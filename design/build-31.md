# Build 31 — visible movement, bank gunmen and connected counters

Published changes:

- Jesse portrait uses an explicit 116×116 head/shoulder crop at source164,0; all of his hood now fits.
- Truck reaches impact in1.0s instead of1.35s, using the same306px travel and final parked location. Glass/impact timing follows the faster arrival; rear-door exit timing stays readable.
- Four keyed sprint poses per civilian, blended over a2.8Hz cycle, replace the old two near-identical poses. Two frightened worker identities populate the bank. Some stay and others flee when fighting comes nearby.
- Two extra bank Jesses enter in a group with Marcus support. Only one Marcus in that authored support sequence is alive at once; the next enters after defeat. Bank plan15 enemies, previously12. One extra outdoor Frankie in plaza and Carmen in Investment Row. Existing one-Bruno/one-Frankie concurrency limits retained.
- New reinforcements visibly walk in from below the screen, with1.1s entry travel and brief entry protection; the opening truck and elevator retain their dedicated entry animations. Downtown intermediate initial groups also enter visibly. Dormant Brick/escorts and cinematic Jackal remain authored placements.
- Enemies knock solid furniture aside rather than being trapped or repeatedly pushed back by collision. Player furniture collision/toppling stays active. All breakable kinds roll once at20% for loot; fixedItem is supported. Random drops still share a5-per-stage budget. Enemy defeat chances rise slightly: Marcus4.5%, Kevin6.5%, Carmen15%, Frankie21%, Bruno28%, Brick/Otis60%, Jackal/Leroy75%, Jesse11%.
- Connected Reina/Bruno paired counter artwork shows a wrist in her hands after a punch or an ankle after a kick, including mirrored facing. These replace the generic held pose only during the waiting follow-up window. Throws and follow-ups retain the live actors and simulated damage/state.
- Blitz recovery3s after completion (3.82s initial reservation includes the .82s action); guide and HUD agree.
- Walk175 versus165, run250 versus235; jump apex104 versus96. Aerial knee/dive start heights use the same104. Uniform7% increase to combat sprite rendering; Otis additionally8% taller and8% wider across every action. Elevator's existing proportional multiplier retained.
- Otis has a four-key walk cycle and visible overhead/side baton animation. Baton is two hits:13 then19 raw, second knocks down. Shorten first-hit protection to .24s only after it connects so the .36s follow-up is valid; blocking/evasion remain available. Whole combo still counts as one action toward his four-action breath break.
- Marcus has a22% chance to evade an incoming aerial attack in range, with3s between decisions. No anti-air was added to Marcus.
- Fades wait for all fatal flights/falls to land. Boss-ending updates also advance fatal throw flights, preventing a deadlock while waiting for Jackal to land.
- Gunfire has a dedicated procedural sharp crack, low body and brief room tail, separate from melee effects; all gunmen emit it through existing gunshot events and Sound toggle.
- Native DualSense standard/raw Sony/DSX/custom mappings and L1/R1/L2 functions preserved.

## Validation

34 Node suites including new Build31 functional checks, existing controller regressions, renderer suites, full downtown route, and financial route. Financial route uses ordinary movement/combat/food and now responds to gun aiming by changing lanes and closing distance; no player HP/damage overrides. Legacy expectations updated only for requested drop rates, jump height, enemy counts and landing wait. Native browser QA confirms full Jesse portrait, Otis walk/baton poses, connected wrist/ankle counters, visibly different civilian sprint phases and bank workers. No physical PS5 hardware available; controller checks are simulated.

## Generated assets

Built-in image generation used. Original files copied unchanged into the project; only alpha-component bounds/anchors were extracted with Python. Rendering and frame blending happen in the game.

- `/workspace/sites/neon-knuckle-build31/dist/assets/sprites/animation-update-v31.png`:12-frame atlas. Prompt: transparent detailed16-bit arcade style matching existing financial-enemy and Bruno references;4 columns×3 rows. Row1 four walking Otis key poses with alternating stride/passing positions. Row2 Otis overhead windup, downward follow-through, side windup and extended horizontal baton strike. Row3 Bruno extended punch and kick, frightened white-shirt/tie male worker and cream-blouse/navy-skirt female worker. Full bodies, consistent size, no labels, gutters.
- `/workspace/sites/neon-knuckle-build31/dist/assets/sprites/civilian-run-v31.png`:8-frame atlas. Prompt: transparent arcade pixel art,4 columns×2 rows; same white-shirt/tie man running through stride, passing, opposite stride, passing poses; second row same ivory-blouse/navy-skirt woman with ponytail doing matching frightened sprint cycle. Arms pump, knees bend, full bodies and no shadows/background/text.
- `/workspace/sites/neon-knuckle-build31/dist/assets/sprites/bruno-paired-counter-v31.png`:two full-body paired poses using existing Reina technique and Bruno references. Prompt: Reina left facing right, Bruno right facing left,12% taller; retain blue dress/sash/sandals/armguards/scabbard and burgundy tank/tattoos/boots. First pair Reina visibly grips his extended wrist/forearm in both hands at chest level as he leans forward. Second pair she visibly cradles his extended kicking ankle while he balances on one leg. Anatomically connected limbs, same baseline/proportions, transparent, no text/shadows.

Metadata: animation31-data.js, civilian-run31-data.js, bruno-counter31-data.js. Unused standalone Bruno frames in first atlas remain available as a fallback; the final game uses the paired counter asset for Bruno's waiting counter hold.
