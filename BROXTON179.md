# Broxton combat overhaul 179

Checkpoint: `checkpoint-before-broxton179` at18a92d803be0242aeaa0f759526801031b817a97. Existing costume, portrait, counters, front-grab body combo, tackle, other specials, enemy roster, world geometry, progression, weather seeds and pad mappings preserved.

## Controls and balance
- Hold Attack3 seconds and release: Iron Will. One release produces one activation; holding never reactivates it. Thirty-frame activation: planted stance, two chest beats, rising battle holler and glow at frame26.
- Iron Will lasts10 seconds. Ordinary incoming attacks deal50% damage once, retaining the game's Normal difficulty modifier. Stagger, normal knockback/knockdown and enemy grabs are suppressed. Health still decreases and lethal hits defeat Broxton. Fire/acid keep their existing hazard rules; explicitly flagged cinematics/stage hazards can bypass armor.
- Cooldown75 seconds starts at armor expiration (or defeat ending it), persists across room changes and pauses with gameplay. Armor time continues during grabs/throws. A warm outline pulses gently and fades over its final2 seconds, without changing body size or invulnerability blinking.
- Normal movement remains145 walk/210 run: no general speed increase.
- Standing combo requires four separate presses:6/6/12/16 =40 damage,12/12/16/22 frames =62 total. Opener whiffs cannot continue. Short per-attack contact windows and lane predicates; final short27-unit step uppercut staggers and does not automatically knock down. Guard contact can confirm the string.
- Forward, forward+Attack:68-frame clothesline,12-frame vulnerable startup,20–40 contact frames,170-unit committed travel,64 first-target /48 subsequent-target damage, one contact per enemy,2.2-second cooldown after the full action. No steering or tracking; no automatic armor. Strong/boss resistance and staging rules remain.
- Rear forward+Attack: overhead forward throw,72 frames,48 primary damage,12 secondary collision damage,190-unit throw travel.
- Rear away+Attack: overhead backbreaker36 damage, maintained grip through the pivot, then24-damage short105-unit backward toss;9 secondary collision damage,92 frames.
- Front Grab+Special: one-handed chokeslam,88 frames,72 damage,23HP existing cost,1.2-second special cooldown. One slam damage event; cosmetic single bounce; target remains down through recovery. Rear Special requires a front grab and does not spend the resource.
- Cosmetic cancellable55-frame flex after5 idle seconds, suppressed near active attacks. Movement/attack input cancels it immediately.

## Shared framework and art
New throws register with GrappleRecovery119, retain one owning action, and use explicit commitment/startup/recovery windows. Protection discards ordinary damage rather than queueing it. Startup and post-throw recovery are vulnerable. Removed targets, interrupted actions, death and scene changes clear pairs, visuals and deferred victim damage safely. Flying victims use the existing physical flight/collision controller, once per secondary target, excluding wrong lanes and staged/protected actors.

Broxton has one proportional1.05 world-scale factor applied across all frames; no vertical stretch or animation-dependent scale. The shared body-box and new attachment math use the same scale. Old locomotion, jump, knockdown and recovery art remain. Supplemental poses use one fixed import factor and foot anchors; run legs use the existing gait.

Approximately30% of ordinary enemies may briefly reposition during each Iron Will activation, preserving strong/boss/ranged personalities and Director148 pressure budget. Fast melee enemies can occasionally create space during ordinary recovery decisions; committed attacks and clothesline startup do not cause perfect automatic evasion.

Main HUD displays charge progress/READY, IRON WILL seconds, or IRON WILL CD seconds. F9 report includes broxton179 lifecycle/timers. Animation inspector has dedicated throw/armor/clothesline fixtures using production logic.

## Validation
Automated tests: new three throws ×2 facings ×30/60/120Hz, exact primary/collateral damage, retained backbreaker grip, attacker-first recovery, startup/recovery vulnerability and forced cleanup. Three-second release control, one half-damage calculation including bullets, hazard exclusions, lethal armor hits, pause/room persistence, cooldown, armor time during throws, four-press confirmation/whiff behavior, and clothesline travel/one-contact/lane rules. Existing26-suite combat regression, cabin fire, environment162 and gamepad suites also run. Historical test adapters recognize the new action name and current charge threshold; their behavioral assertions remain.

Browser QA inspects grounded activation, overhead/chokeslam attachments and fixed scale. Physical DualSense testing, supported-hardware60FPS certification and human balance playtesting remain unverified; listed damage values are initial Normal tuning.

## Asset provenance
Built-in ImageGen, reference identity preserved. New atlas: `dist/assets/sprites/broxton-combat179.webp` (1774×887); old assets retained. Cached connected alpha cutouts, fixed import scale. Full production prompt:

Use case: identity-preserve. Production 16-bit beat-em-up sprite atlas, reference image ONLY identity/style reference. Create NEW atlas of Broxton same muscular stocky tattooed man, short black hair, beard, white tank top, dark gray cargo pants, black boots. Preserve face, costume, muscular proportions. Exactly FOUR columns TWO rows, eight full body poses facing RIGHT, true transparent background, no text/grid/shadow/enemies/weapons. All eight same anatomical scale, same foot baseline within each row, generous margins, unclipped. Top row: 1 planted stance both fists pounding chest, 2 head tilted slightly upward hollering arms out, 3 wrestling clothesline windup right arm drawn back torso twisted knees bent, 4 rushing clothesline arm extended horizontally right legs running. Bottom row: 5 both arms extended above head lifting imaginary opponent overhead, 6 one knee raised backbreaker pose arms gripping imaginary opponent no opponent drawn, 7 one-handed chokeslam lift right arm extended forward-up hand gripping imaginary collar at head height no opponent drawn, 8 standing two-arm biceps flex. Crisp opaque pixel illustration detailed matching reference, no glow painted in, no gore, no changes in size or clothing. Standing figures occupy about75 percent cell height, overhead raised hands fit cell.


Hosting package: superseded, unreferenced Riverfront151/160 panoramas retained in art-archive179 rather than dist/assets. Active174 panoramas and all current scenery loaders remain unchanged. This keeps the expanded deployment below the256MiB limit.
