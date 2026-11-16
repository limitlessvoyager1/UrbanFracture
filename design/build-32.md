# Build32 — Broxton, the turncoat

Broxton is a second selectable playable hero, available from either stage's start and retained through checkpoints, retries, lives and stage transitions. Character choice persists locally; it is available before runs and after game over. Keyboard menu arrows or controller stick/D-pad select a hero; Options/Cross start with that choice. In-game mappings remain L1 block, R1 counter/weapon evade, L2 grab/release, Square attack, Cross jump, Triangle special, Circle dodge.

## Hero balance

The browser loads broxton.js after financial.js. It installs HEROES and extends the shared simulation with hero-specific attacks; the core's standalone legacy110-HP Reina fallback is kept for existing isolated regressions, while the campaign configuration now sets Reina100 and Broxton125 as requested. actor() also reads installed hero configuration. All live HUDs and full heals use selected hero maximum. Shared normal difficulty damage, grab resistance, defense meter, wake protection and enemy AI remain active.

| Parameter | Reina | Broxton |
|---|---:|---:|
| Maximum HP |100|125|
| Walk / run px per second |175 /250|145 /210|
| Jump apex |104|82|
| Basic combo damage |6,8,10,16|8,10,12,22|
| Combo reach |70–98|86–124|
| Blitz |Aerial multi-kick, knockdown|.12s startup dash punch,22 damage, ~157px travel,75px recoil, no knockdown|
| Blitz recovery |3s|2s|
| Charged attack |Thunder Palm42|Rising Breaker44,86 reach,.9s hold,5s cooldown|

Broxton has no passive armor or blanket interruption immunity against heavies. Marcus retains the existing inability to interrupt committed player attacks. Broxton's .64s hammer finisher is slower than Reina's .48s finisher. Dash punch has no invincibility and is vulnerable before connection. Special grabs respect heavy/boss resistance; they do not grant free grabs against healthy Bruno/Brick, protected wake states, dormant actors or a resisting Leroy. Whiffs spend health.

## Moves and controls

- Four-hit punch string ends with clasped two-handed downward hammer and knockdown. Longer reach than Reina.
- Forward, forward + Attack: quick dash punch.22 damage, visible pushback, keeps enemies standing,2s post-action cooldown.
- Neutral Special: Iron Cyclone spinning punch clear-out,30 damage,12 HP cost, short protection.
- Forward + Special: Skybreaker dash grab,18 HP. Connection starts a1.14s jumping paired slam for50 main damage and14 nearby knockdown damage. Startup is interruptible. Victim rotates about torso at the carried height and descends to a single floor impact; nearby furniture can break.
- Air Special: targeted body press,32 damage,16 HP.
- Front grab Attack:14+14 stomach punches,20 headbutt, knockdown on the third. Existing hold buffering supports choosing a directional finisher after a blow.
- Front back + Attack: spinning backward throw32 damage, collateral10.
- Front forward + Attack: clothesline34 main damage,22 to other enemies in front, knockdown.
- Rear back + Attack: German suplex28 then automatic ground elbow16,1.42s total. Broxton moves alongside the victim's landing before the elbow. Victim cannot wake before the elbow. Fatal flight/fall completion remains part of transition gating.
- Rear forward + Attack: full nelson slam46 plus14 nearby.
- Neutral jump Attack: heel kick25, knockdown.
- Moving jump Attack: Superman punch24, brief .7s stun against an interruptible target, approach stops at the target's near side.
- Air down + Attack: elbow drop24. Ground down + Attack: sweep18 or grounded stomp16.
- Hold/release Attack: charged uppercut44,5s cooldown, canceled by being hit while charging.
- Block/counter/weapon evade retain shared defense costs. Unarmed counter follow-up is10+10+18, final knockdown; kick counter follow-up slam30. Direction + Attack or L2 can choose a throw.
- Dodge is a compact sidestep, .32s/~99px/2s cooldown; manual recovery moves horizontally away. Jump while holding maneuvers around the victim while keeping the hold.

## Visuals and audio

Two new original16-frame transparent sprite atlases (32 keyed poses total) retain medium brown skin, short black hair, circle beard, stud earring, tucked necklace, fitted beige sleeveless shirt, tattooed arms, black rugged pants and boots. Broxton renders slightly larger than Bruno at a consistent per-pose scale .59; crouches and airborne poses use their actual drawn anatomy. No recolored Reina or Bruno sprite substitution. Dedicated walk, punches, hammer, dash, spin, kick, Superman, hurt/fall, hold, body punch, headbutt, clothesline, lifting, slam, German, elbow, guard, sidestep, get-up and shock poses. Existing enemy identities are preserved during paired moves.

HUD portrait/name/max HP/power/charge labels adapt. Selectable roster, Broxton guide and sprite room updated. Lower procedural hurt/breath/defeat voice and distinct heavy impact/landing sound events added; existing Sound toggle respected. All sprite/data/game script cache versions32.

## Assets / image generation

Built-in image generation, no CLI fallback. Generated PNGs copied unchanged into the Git-backed Site. Python extracted alpha component metadata/anchors only; animation/cropping/blending is runtime canvas code. Files:

- `/workspace/sites/neon-knuckle-build32/dist/assets/sprites/broxton-base-v1.png`
- `/workspace/sites/neon-knuckle-build32/dist/assets/sprites/broxton-grapples-v1.png`
- `dist/broxton-data.js` metadata and `dist/broxton.js` simulation.

Prompt1: production transparent16-bit arcade sprite atlas, exactly16 full-body poses in4×4 grid. Medium brown extremely muscular hero slightly larger than enforcer, short black hair, connected mustache/goatee circle beard, silver stud, necklace tucked under tight beige sleeveless muscle shirt, tattooed arms, black cargo pants/combat boots. Row1 guard and three walking key poses; row2 jab, cross, rising body punch and clasped two-hand hammer; row3 dash punch, torso-twisted spinning punch, crouched charge and uppercut; row4 heel kick, Superman punch, hurt and lying fallen. Consistent anatomy, right-facing, whole figures, transparent gutters, no text/shadows/weapons.

Prompt2: same Broxton base atlas as identity/style reference;16 additional isolated full-body poses in4×4 grid. Row1 high guard, forward grip, stomach punch and headbutt; row2 spinning throw windup/release, clothesline and full nelson lift; row3 jumping carry, downward slam followthrough, arched German bridge and ground elbow; row4 sweep, compact dodge, kneeling get-up and rigid taser shock. Only Broxton, invisible-opponent grip spaces for live enemy sprites, no opponent art or identity changes, same clothes/anatomy, transparent with no labels/shadows.

## Validation

Existing34 suites plus new Broxton moves, Broxton Financial District route, current100-HP Reina route, and shipped UI/controller/hero-selection regression =38 suites. New move tests cover actual damage, reach, knockdown versus recoil, cooldowns, held-state release, all four throws, collateral, slam resistance/cost, aerial stun, charge cancellation, counters, death during lift, full heal and checkpoints. Both hero routes use ordinary inputs, food and checkpoint retries with no HP/damage overrides. Native browser checks: selection/start, dynamic HUD/portrait, distinct sprites, grab spacing, jumping carry, slam, and suplex elbow. All new atlas loads report no failures. PS5 mapping tests simulated; no physical DualSense available.
