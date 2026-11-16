# Reina: Rising Dragon Blade

Checkpoint `checkpoint-before-rising-blade187` at `feeed37314fb1a5ddc2071d8d32558936eceeee0`. Existing site identity, audience, stage art, Niko/Flint186, other heroes and Reina105HP are preserved.

## Input and resources

Counter + Special uses the existing186 three-frame chord tolerance, through the same keyboard/controller command path. Either event order and same-frame held buttons work. Counter-first may upgrade an already confirmed ordinary capture before its strikes, ending only that old session and adjusting only that attempt's resource payment. An armed ordinary counter upgrades without extending its original deadline. Special alone waits the short chord tolerance, then executes its existing special; damage, costs and move definitions are unchanged.

Reina retains the existing difficulty table: Normal7frames, easy10, hard5. She does not inherit Niko's20% timing bonus. Successful eligibility uses the existing punch/kick classifier, anatomical range/depth, wake/armor protections,50% strong/boss health thresholds and explicitly permitted boss attacks. Weapon strikes, projectiles, explosions, grabs, environmental effects and uncounterable/cinematic/phase/anti-air attacks do not qualify. Readiness is canceled by invalid states; a failed attempt is never an ordinary-counter fallback.

Costs on commitment:8% maximum HP (8.4 of105), clamped to leave1HP;50defense ordinary,75strong/mini,100boss. Failure keeps both costs. Insufficient resources cannot commit. Counter-first upgrades pay the delta of the same attempt, without double HP charges or unrelated refunds. Failure has24frames of vulnerable recovery, no sword draw/attack/blue effect and no new invulnerability. The move has a private.45second post-action cooldown; ordinary counters retain their own timing/costs.

## Damage and timeline

Current strongest Reina single-target special is Twin Fang,21+22=43. Rising Dragon Blade deals56 once,130.2% of43. It also exceeds her35-damage forward sword and28-damage clear-out. Boss counter reduction is applied once at.65 (36.4), with optional per-victim configured cap; protected boss phases remain protected. This is below Niko's64/68 manual counter budgets and100 Battle Cry budget.

The shared119 successful-counter session lasts64authoritative frames: deflect1–8; draw9–16; planted20unit step17–23; low launch24–37; one sword contact at30; descending follow-through38–54; vulnerable recovery55–64. Two participant frames of hit-stop follow deflection, five follow the hit. World/weather/director time continues. The shared launch call does not create a second zero-damage event. Every currently present or newly spawned enemy is excluded from collateral contact: this remains a single-target move.

The actual blade segment and target hurtbox must intersect at the impact event before damage or launch. Each action consumes that event once. No contact or a newly protected target means no damage/launch. Enemy launch uses the existing flight system with70/42/16height and135/80/36travel for ordinary/strong/boss targets. Ground depth stays fixed for each participant; no teleport-to-player lane. The successful session owns the victim, prevents separation/wake and protects Reina through frame54. Recovery is vulnerable. Furniture cannot drift the committed root. Hazards retain damage rules. Lethal damage is deferred until the victim lands, then settles through the existing defeat system. Interruption/removal/death/reset release ownership and clear the pose.

## Artwork and feedback

`dist/assets/sprites/reina-rising-blade187.webp` contains eight generated alpha poses. Fixed import scale matches the existing138.3unit standing Reina, with no per-animation scaling. Padded component extraction retains extended feet and raised hand. Sword hand sockets drive the same rendered sword and collision segment, with visible extraction, low-to-high rotation and re-sheathing. The shared release routine's height reset is corrected immediately so the leap remains aligned at impact. Existing portrait and unrelated animation atlases remain unchanged.

Built-in ImageGen mode was used. The exact prompt/reference and original PNG path are in `design/rising-blade187-image-prompt.json`. Only the weapon blade and restrained blue trail are Canvas geometry. Deflection, draw, sword impact, enemy reaction and landing have separate audio events. Failure emits none of the successful sequence events.

## Diagnostics and checks

F9 includes input, category, eligibility, seven-frame window, HP/meter cost, success/failure, draw, active frames, blade/hurtbox intersection, damage, flight, synchronization, protection, cooldown and recovery. `/rising-blade187.html` provides +1/+10 frame stepping and play/pause for punch/kick/strong/boss/miss fixtures and both facings, using production simulation/rendering.

`node tests/rising-blade187.cjs` verifies54 class/facing/depth/rate fixtures (30/60/120Hz), no early damage or flight, one exact56hit, reduced boss damage, costs, failure and health floor, ordinary capture upgrades, illegal states/attacks, boss gate/full defense, interruption/cleanup/death/landing, separate cooldown, furniture/depth stability and hazards. Actual button-reader fixtures cover standard DualSense, raw Sony and DSX/XInput, including held-button no-retrigger. All five heroes' ordinary directional punch/kick results match the checkpoint. Solo Reina specials remain28/35 with12/18HP costs; Tornado remains40 with her existing charge threshold. Existing current150, niko-counters186, environment162, shield181, government182, gamepad and controller157 checks pass. Browser frame inspection verifies deflection, draw/step, blade contact and leap/landing. Physical controller hardware and human playtest balance remain unverified.
