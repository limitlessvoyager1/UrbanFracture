# Niko final counters and weaponless Flint

Reversible checkpoint: `checkpoint-before-niko-counters186`, commit `b2d9fc07e4424fff8f6dd07903b4c784baa16522` (Niko185). This supersedes185's reserved manual counter resolver. Niko remains110HP, Reina105HP. Ordinary damage budgets remain16 standing/14 grab; no ordinary attack damage increase.

## Integration and input

`niko185.js` retains the authoritative command/catch hooks; `niko-counters186.js` supplies character definitions, eligibility and paired timelines through those hooks. No second input listener or controller reader exists. Shared119 recovery sessions,125 floor/settlement and185 status/hit ownership are reused. Counter direction is latched from facing. The weapon classifier and difficulty timing tables come from WeaponCounters122. Normal timing is8.4frames versus7 (1.2×); easy/hard keep their existing baseline times1.2. Visible committed attacks and real forward/depth/range checks are required. Explicit uncounterable/phase/anti-air/cinematic and unbreakable states remain excluded. Bosses keep the prior50% HP gate and explicit eligible attack restrictions.

Both same-frame controller buttons and either keyboard order are supported. Three frames (50ms) of chord tolerance allow Special-before-Counter or Counter-before-Special. An ordinary interception can upgrade during its initial four-frame contact pause, before any ordinary strike. A standalone Special waits this short tolerance then continues its existing low-damage offensive move. This preserves offensive specials while making the chord authoritative.

## Costs and damage

| Definition | Base damage | Meter | Injury base chance |
|---|---:|---:|---|
| Circular arm control |68|27|Arm75%|
| Double-kick arm throw |68|27|Arm80%|
| Leg capture stomp |64|27|Leg75%|
| Leg capture elbow flip |64|27|Leg80%|
| Disarm/strike/break |64|40|None|
| Battle Cry combination |100|50|Concussion90%|

Strong/mini counters cost60; every boss counter costs100. Special Counter costs50 for nonbosses and100 for bosses. Failed attempts pay the same category cost. Battle Cry additionally costs8% maxHP (8.8 for110HP), once on commitment, clamped at1HP. Failure never refunds it. Existing defense regeneration delay remains meaningful. A three-frame chord upgrade adjusts only the same attempt's meter payment, never doubles health or costs.

The strongest current comparable Forest ordinary counter is52.2:68is130.3%,64is122.6% against that global maximum but127% against the comparable kick50.4 and133% against the comparable weapon48. Battle Cry100is191.6% of52.2. These are explicit budgets, not universal multipliers. Boss damage scales once by.65 and optional configured per-impact counter caps remain honored. The established newly-applied-injury bonus is capped at25% of move base across the whole sequence. Active injuries neither stack nor refresh nor grant repeated bonuses. Strong/mini/boss chance and duration multipliers remain unchanged.

## Timeline and protection

Each definition has one shared timeline, distinct contact poses and impact events. Arm control flips at38 then injures at57. Forward arm counter kicks at23/36, injures at51 and throws at73. Leg capture drops at31 and stomps at51. Forward leg counter elbows at31 and flips at54. Weapon disarm occurs24 and the single damaging strike/break45. Battle Cry begins at5 only after interception and its initial contact pause; five punches hit19/27/35/43/51, then a low jumping spin kick73.

Hand/limb anchor transforms rotate the victim about the controlled wrist/ankle during standing portions. Floor states retain shared ownership and mandatory recovery locking without using standing held art. The actor scale stays fixed. Success protects only committed mandatory frames; recovery starts before the action ends and is vulnerable. Failed-counter recovery lasts22frames and has no invulnerability. A4frame local participant timeline pause follows normal contacts,5frames follows newly successful injury impacts or the final special kick. Weather, director/world time and unrelated actors continue; hit-stop does not alter damage or status clocks.

Broken weapons are removed, used once, fragmented visually and never added to pickups. Existing boss weapon restrictions apply; a later scripted phase's different weapon is not silently deleted. Essential boss armor and transitions remain protected.

## Weaponless Flint

Any Flint with no weapon, against any of the five heroes, switches to the existing coordinated close-pressure AI and unarmed strong punch/front-kick definitions. HP, name, costume and identity remain Flint; no weapon regrowth, grab/bomb substitution or hidden armor. Punches hit22 (two-hit string14 per hit), front kick20, with visible startup and normal recovery. Existing director admission still controls pressure. Injuries retain their ordinary damage/movement effects. Two new full-body alpha atlases provide raised guard, punches/front kick and a four-frame advancing guard walk. Each uses one fixed140-unit import height and sole anchors. Assets are `dist/assets/sprites/flint-unarmed186.webp` and `flint-unarmed-walk186.webp`; exact built-in ImageGen prompts/references are in `design/flint-unarmed186-image-prompt.json` and `design/flint-walk186-image-prompt.json`.

## Diagnostics and validation

F9 now includes incoming classification, eligibility/window/input, selected definition, costs, damage, chances/resistance/status, local hit-stop, cry event, contact anchor and synchronization/recovery. `/niko-counters186.html` is a developer frame-step lab using production simulation and rendering; +1/+10/play controls support every counter, failure and unarmed Flint. Its forced-injury checkbox is fixture-only.

`node tests/niko-counters186.cjs`: definitions at30/60/120Hz in both facings; exact budgets/costs; chord orders; boss gates/scaling; armor/illegal states; failure health/death; injury timing, probabilities, nonstacking and capped bonus; participant-only hit-stop; committed/recovery protection; cleanup/lethal outcomes; weapon destruction and Flint fallback; pre185 versus186 comparison of all four heroes' directional punch/kick counters. Existing niko185, current150, shield181, government182, environment162, gamepad and controller157 suites also pass. Browser checks verify arm control/ground art, Battle Cry and Flint guard/approach. Physical controller hardware and human balance remain unverified.
