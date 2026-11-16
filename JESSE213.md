# Build213 — Jesse inventory, retreat and gunfire

Checkpoint `checkpoint-before-jesse213` preserves the tested Saito/Akari212 update. Build205 Enemy Field Guide page14 was read against current financial.js / leroy102 / counters122 / Niko186 / Director148 implementations. Runtime baseline is65HP,6rounds,24 base gunshot damage (existing Normal outgoing reduction still applies),18 knife damage; no HP or damage increase. Dirk and Colt variants retain their own controllers and moves.

## Persistent knife loss

`hasKnife` is separate from ammo/maxAmmo. Native counters remain authoritative for removing the weapon and creating/breaking drops. Jesse213 observes successful knife removal, latches `knifeDisarmed213`, clears any remaining knife commitment and disables every future knife or substitute melee action. It creates no extra pickups. Reload, roll, knockdown, type/AI transitions and attempted rearming cannot restore the knife. Real Reina, Niko, Broxton and Forest weapon counters were exercised. A fresh enemy actor starts with its own knife state.

A disarmed Jesse never punches, kicks, grabs or throws. At close range he seeks finite escape waypoints. Movement is visible and collision-tested along the whole path against solid furniture, persistent car wrecks and the player. If all paths fail, he remains vulnerable. He cannot cancel attack/reload/roll recovery to escape. Runs135units/s, slower than ordinary hero approach; normal reposition95–115. A blocked ally lane can trigger one bounded, collision-tested route to a different firing side, with cooldown and deadline; no indefinite wall running or input prediction.

## Native action definitions (60Hz)

| Action | Timing | Behavior |
|---|---|---|
| Initial aim |33frames|Gun raises, feet planted; direction/lane lock11frames before discharge.|
| Subsequent stationary aim |14frames|Only within2s of the previous shot and without intervening movement.|
| Post-shot recovery |20frames|No immediate attack/retreat cancellation.|
| Knife stab |16startup /4active /26recovery|18base, short100world-unit reach, no armor/KD; existing weapon counters.|
| Reload |108total /magazine event96|No guarding, firing or melee. Interrupted before96: no ammo refill; after visible magazine insertion, committed new ammo remains.|
| Recovery roll |4prepare /20movement /18recovery|95units, same lane, actual clear path; no automatic invulnerability.|

Single-shot commitments consume one of the existing six rounds; they do not automatically empty a magazine in a burst. A completed magazine requires reload. The gun remains native hitscan, with muzzle flash, recoil and gunshot event at actual discharge. No projectile controller was added.

The ray starts at the measured existing muzzle83,-107 in actor-local coordinates, using normal actor and bank scene zoom. It resolves against the current elevated anatomical box and locked lane, rejects tall solid cover and allies, and uses ordinary damage with `unblockable102:true`. It does not ignore existing dodge invulnerability. Target locking/stun at release withholds the shot rather than creating unavoidable damage. Human Shield uses the same measured ray, including the last round.

Jump controls and responsiveness are unchanged. Gunfire no longer grants blanket immunity whenever jump>0. The live visual sine elevation shifts the hurtbox. Takeoff remains hittable. Reina/Nova/Forest/Niko/Orion apexes can clear the measured ray; Broxton's present lower jump can still graze it. All six native dodges were tested successfully during their actual evasive frames. Changing logical depth before discharge remains a reliable option; no new plane movement is introduced.

## Shared coordination and feedback

The existing Director budget stays3points /2commitments. Gunfire adds an exclusive firearm-commitment filter within that same request path (gunFire and Colt gun204), plus.42s minimum spacing before another shooter's planned discharge. Other gunmen can reload/reposition. There is no additional attack budget.

`AIMING` / `FIRING` remain above gunmen; `RELOADING` remains nearby, including Colt's corresponding states. Jesse reload shows the native magazine pose with separate hand/magazine motion. His weapon-raise and native recoil/flash match discharge. Retreat uses the existing connected gait; roll uses native grounded/crouched art at fixed scale.

Roll selection is15% abovehalf HP,25% atquarter–half,40% belowquarter. One roll decision per knockdown,6s after a completed roll before another; shared119 throw ownership, mandatory grounded/recovery clocks and grab-only anti-regrab rules remain active. No ammunition or knife restoration occurs from rolling.

## Diagnostics / validation

`Audit135.report(game).jesse213`: HP, knife inventory/loss, ammo, mode, retreat destination/path, distance, aim frame/lock/lane, muzzle/ray, collision result, elevated hero box, dodge invulnerability, reload timer, roll probability/eligibility, firing eligibility, coordinator and rejected action reason. `jesse213.html` provides scene staging, single-frame stepping and playback.

`tests/jesse213.cjs` checks native shots at30/60/120Hz; six-hero startup/block vulnerability and current apex/dodge/lane/cover geometry; real four-hero disarms; permanent inventory across reload/down/roll/rearm; no substitute melee; physical retreat and corner vulnerability; locked reload; magazine consumption/refill; fixed aim; HP roll probabilities; four30s mixed groups with bounded pressure; all six actual dodge controllers. Existing212 martial/211 weapons, current15026suite regressions and gamepad/controller157 are checked separately with current changes. Physical DualSense hardware was not available.

Normal balance still benefits from human playtesting: these automated scenarios demonstrate bounded behavior and regressions, not certification of player reaction time. No unrelated boss damage, hero startup or controller mapping is changed.
