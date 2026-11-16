# Build316 energy architecture audit

Approved checkpoint: 4808adc0f7f1e4ecfd35d747f17aec3db4b40b19 (published Build315).

The existing golden Energy HUD reads player.defense/maxDefense. Keep these compatibility fields as the sole resource. core.js spendDefense owns native defense deductions; core.js tick adds9 units/second after defenseDelay. No separate meter is needed.

Blocking is explicitly excluded from the new behavior: retain core.js damage guardCost210 calculation, Niko/other chip ratios, guard break and positive-meter eligibility. The new specification's zero-energy weakened guard does not apply.

Approved defensive costs: dodge25; Counter248 attempt15% and confirmation40%/80%; Reina Dragon Tail50%. These remain unless a specific test override is applied. Unique311 reports9 regeneration and must report0 once the new controller is enabled.

Legacy special HP payments occur in core.js, nova77/128, forest125 and forest-grapples177, broxton179, niko185, orion-special205, nightshade-special263, counters248 and Reina's Unique311 aerial wheel. Some are direct API entry points, so command-only interception would miss them. Payments must be adapted at these actual commitment points. Counter special confirmation can execute later from advanceHeroAction: charging on the input edge would charge buffered/rejected inputs incorrectly.

Damage attribution must use action169/native callback context and explicit classifications. Never infer detached projectile attribution from the player's current move. Forest bolts, player thrown weapons and autonomous Gunner need explicit separate receipts. Poison cannot generate energy. Per-event/target deduplication and action caps must precede awards.

Orion repair is once per life and restores health/meter at its completion event; route its meter grant through the controller without HP overflow. Encounter/room travel already preserves meter; do not add room refills. Native major-mission entry is the right place for the configurable40 minimum.

Items: core.js collection treats unknown items as score; adding new kinds without an early collection/draw adapter risks invalid score or pizza rendering. Preserve existing enemyDrop before adding optional low-probability energy drops. Developer settings must remain separate from approved configuration and queued while actors are busy.

Gate1 audit complete. Later gates require runtime tests, current rendered HUD/item inspection and equivalent seeded encounters. No balance certification follows from functional tests alone.
