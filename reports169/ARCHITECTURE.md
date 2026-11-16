# Urban Fracture architecture audit169

Baseline: source320936293950b3a87c1d26f7e7875a1e85cd35f0 (Cabin168), UI still says Build162 by prior restoration instruction. Checkpoint tag checkpoint-before-audit169 and complete tracked source/assets ZIP created before changes. Baseline tests are in baseline-tests.txt. No framework or build step: index.html loads ordered classic scripts; game.js owns Canvas rendering, keyboard/gamepad/UI and requestAnimationFrame; core.js defines Brawler. Source in dist is editable authoritative code, not generated/minified output.

runtime-ownership.json records every production script tag in exact order, plus the modules that replace each prototype function in VM loading. `outermost` is the last wrapper, not exclusive ownership: it calls a captured predecessor. Conditional early returns select character, scene or feature behavior. Simply deleting the older implementation would remove working moves.

| Area | Active ownership and delegation |
|---|---|
| Movement/input | game.js fixed60Hz accumulator; gamepad.js Reader; core tick/directionInput; character wrappers; charge130 owns hold-release; lab149 can suspend combat input during scripted states. |
| Combos/contact | core/broxton/nova97/forest125; combo-confirm129 gates openers; combat134 anatomical knife segments/Reina4-hit; audit135 persistent Reina contact; broxton-audit142 persistent active windows. |
| Hurtboxes | core lane/reach checks; DragonTail121 segment rectangle contact; Combat134.box anatomical body; explicit per-move tolerances. Images are not pixel collision masks. |
| Damage/guard/armor | core.damage and balance49/leroy102; Audit135 measures residual direct-HP paths without dealing damage again; Quality167 normalizes player death. DragonTail121.armor delegates strong windows to Audit135. Armor prevents stagger; invulnerability rejects damage. |
| Counters/defense | counters, broxton-counters51, weapon-counters122, forest-counters127; paid attempts/eligibility remain authoritative. |
| Charge/blitz/special | charge130/tornado130 plus character implementations; Combat134 coordinates Forest/Gunner and knives; Nova128/Powerbomb136 own paid wrestling specials. |
| Grab/throw | core acquireGrab/tryGrab, character holdAction, grip124 switching, paired-motion, Reina119/123, Nova116, Forest125, Spear137/Powerbomb136; grapple-recovery119 is shared victim recovery barrier. |
| Enemy AI | original type controllers (pressure101, leroy102, jackal100, encounters, lab-workers166, Dorian153, Quality167 Frankie). Audit135 mediates attack requests; director148 owns the shared3-point/two-attacker budget and observed behavior adaptation. |
| Companion | companion126 autonomous tasks/stun; Combat134 explicit command ownership and distance-driven gait; Forest125 action paths; forest-view125/repair-view134 fixed art/palette. |
| Environment | environment156 seeded fixed-time simulation; environment-game156 advances it once per active tick; environment-controller162 enrolls scenes. environment-view156 renders bounded cached albedo/sky/emission, rain160 pool; template162 adds reusable scene layers/audio. Lab149 does not replace world weather. |

## Findings and risk

Confirmed: Forest piercing projectiles force damage through guards and apply full push; they have no per-target falloff. Their detached telemetry can be attributed to the current player action rather than the firing action. Volley startup22 frames and post-shot recovery28 are shorter than the requested ranges. Ordinary core grab has a grounded-Marcus exception and Broxton bypasses ground/recovery checks, allowing repeat grabs. Existing grabImmune is cleared for Broxton. Director repetition currently uses6s/.28 chance and has no retained confidence decay. The renderer samples the same environment repeatedly for background, each fighter shadow and foreground.

Not defects merely because duplicated: predecessor wrappers; character-specific direct HP event observation; separate procedural and illustrated render fallbacks; old charge implementations gated off by Charge130. Existing contact135/contacts101/102/knifeHits134 prevent repeat damage and preserve legitimate multi-strikes. These were tested rather than replaced with one indiscriminate damage filter.

High risk: script order and circular dynamic namespace references; paired action owners/hold/pairVisual/recoveryNotBefore119; deferred defeat97; old direct HP paths; diagnostic modules accidentally loaded after a partial script chain; browser input edge state; asynchronous sprite ready; fixed world-vs-render coordinates. Future consolidation should move one proven interface at a time with production-chain fixtures. Do not introduce a second director or global hitbox inflation.

## Scope of corrections

Changes and measured balance results are tracked in BALANCE.md and final-tests.txt. Existing147 Bruno/Flint windows,130 charge scale/plane/gait,134 Gunner hysteresis/contact,119 recovery order, and136/137 paired actions already match most requests and are preserved. Only four missing Reina recovery-art poses were added; no new levels, health homogenization or replacement movement engine.
