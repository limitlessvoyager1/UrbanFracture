# Yacht and enemy corrections 200

Checkpoint: checkpoint-before-combat200 at dc7be8d4.

## Yacht
The upper structure, rail, floor and window masks share the same world X translation and width. Only distant scenery moves independently; heave and roll still affect the whole ship scene. Arthur uses measured foot/body roots rather than the center of a frame widened by his scepter. His anatomical hurtbox matches his232px body and normal attack reach accounts for that body edge without increasing global hero reach or ignoring depth, guard, wake or invulnerability rules.

The Riverfront escape has a continuous grounded dock/gangway route to a visible stern opening. The opening and NPC occlusion share one world anchor. The story NPC recedes with background perspective; combat Arthur and other fighters never use that perspective scale. No alpha disappearance, teleportation or invisible clipping line.

## AI
Audit135 recovery relief now follows enemy-imposed incapacitation only. Player-chosen attacks no longer endlessly renew the Director response window. Pressure limits, telegraphs and externally imposed recovery relief remain intact. Martial artists retain their existing controllers; a queued guard counter is consumed only when admitted, not during cooldown.

Native Bruno observes3 confirmed hits in4 seconds, then can guard the next new string for.48s, at most once per5 seconds. Existing confirmed follow-ups remain valid. A queued18damage hook still requests Director admission and uses20frame startup and27frame recovery. No permanent armor or HP increase, no extra reaction during punishable attack recovery; excludes Security and trucker variants.

Five finite wave replacements: Akari at Fairways spa370 and casino floor1130; Saito at country club1590, casino penthouse2080, Route74 truck stop2710. Same wave size/timing, native entry and Director admission.

## Validation
combat200 covers both martial artists idle/spam at30/60/120Hz; forced vs voluntary recovery; between-string guard and punishable recovery;5heroes x2facings x3distances contacting Arthur;5placements; continuous dock route/visible occlusion. yacht-view200 verifies identical hull/floor transforms and seam at4camera positions in both rooms. Regression suites: current150, grab198, yacht195, dock176, riverfront160, scenes199, reina-repair147, environment162/integration156, controller157, gamepad. Browser reviewed ship scene and dock path. Physical controllers and human difficulty tuning are not newly verified.
