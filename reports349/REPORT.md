# Nightshade / Downtown correction review — Build349

Checkpoint: checkpoint-before-nightshade349, source b7c7d25f46ffd25bf073152c4eff017ac13b0ea6. Build348 remains recoverable. New entry downtown349.html loads scoped349 adapters; current production engine/controller and other entries remain intact.

## Requested corrections

- **Blitz:** original12-pose flying side kick based on the supplied video's0–2second motion principles. Coiled anticipation, rising knee, raised arm, horizontal boot-led kick, retraction, landing and grounded recovery.360world-unit travel; existing22damage and83frame total preserved; native ordinary attack input recognizes double-tap/run window. It is an original animation, not copied game art. Both directions and distant contacts tested.
- **Baton:** new telescopic metal baton with textured grip and thinner nested shaft sections. After the user's review, the new sheet's baton was shortened approximately5%; tasers and pipes unchanged.
- **Jump:** default jump pose is tucked, not a kick. Actual air attacks require Attack. Down+Attack selects authored overhead-to-downward baton-swing poses. Landing shortens outstanding air action to its actual recovery instead of holding an airborne attack pose near the floor.
- **Charge:** native Charge130 hold/release input restored with the one-second poison-dart adapter. The drone prototype had replaced attackInput and bypassed that owner. Current melee actions are now recognized as ordinary charge-eligible actions.
- **Weapons:** native Weapons248 pickup, equip, swing and throw dispatch restored. The prototype explicitly rejected pickup and routed armed attacks into its own baton combo. Existing authored native weapon animation/hand-socket system is used, not a separate inventory.
- **Grab combo:** each attack press advances one stage: knee, knee, handheld taser, baton backhand. Only a separate queued press advances the next stage. New six-pose hand-taser draw/contact/retract segment lasts54frames and contacts at32. Total damage remains4+4+5+10=23. Final backhand releases and knocks down. One press no longer automatically performs all four hits.
- **Hit registration/stun:** rejected invulnerable contacts are no longer permanently marked hit before an accepted contact; active windows may retry. Baton contact compares the target's near hurtbox edge rather than only its center, addressing broad enemies such as Bruno. Accepted unarmored melee cancels the interrupted action object's outstanding hitboxes and enforces recoil/stun. Real armor/block rules remain. Live-AI combat tests verify normal enemies and unarmored Bruno cannot continue attacking through a clean baton hit.
- **Throw missile:** body/nose/fins/exhaust model retained from348 for both missile paths; assisted throw missile now produces a timed bright explosion on impact and increases released victim's horizontal knock-away velocity. No duplicate missile damage/energy debit.
- **Scenery:** current-section-only drawing left uncovered camera space at native overlap boundaries and the extended hotel route. The new renderer covers the entire camera with ground-aligned illustrated tiles. Small frontage overlays on every pickup window were removed. Optional storefronts now occupy full reserved facade bays with opaque matching wall backing rather than a miniature shop placed in front of another shop. This is a modular illustrated environment, not newly unique artwork for every street meter.
- **Grand Hotel:** readable lower facade plaque says THE GRAND HOTEL. One elevated GO marker is drawn at the existing native entrance; the old duplicate hotel label is suppressed. Native hotel lobby, kitchen, rear alley, nightclub and VIP route logic is retained.

## Evidence / checks

- tests/nightshade349.cjs:39 checks passed: jump versus Attack, long blitz in both directions, one-press grab progression, contact retry after invulnerability, one-second charge, full-width renderer coverage at both edges of all seven Downtown sections, native Flint attack activity.
- tests/nightshade349-combat.cjs:180 checks passed: active AI clean-hit interruption and actual stun for Marcus, Kevin, Frankie, Carmen, Flint and unarmored Bruno; native pipe pickup/equip/hit; missile throw damage and effect cleanup.
- Existing gamepad and controller-recovery suites passed: synthetic standard DualSense, raw Sony, DSX, reconnect and neutral rearming. Physical hardware was not tested.
- Native illustrated frame captures:13 scenarios, initially2,300 simulation frames, then refreshed downward-swing and press-driven grab-sequence captures after contact-pose review. Normal/.5×/.25× videos. Captures use the production scene/actor scale and native jump elevation. They are silent native renders, not browser gameplay/FPS certification.
-36 new whole-body action figures imported at constant per-sheet scale, plus the targeted baton-length edit. No proprietary video artwork imported.

## Confirmed limitations

Flint attacks in armed and disarmed native-AI tests; the exact cause of the user's inactive Flint could not be reproduced. No speculative aggression/balance change was made. He has genuine native commitment/recovery/armor rules, which remain. Further live-play evidence is needed if the inactivity recurs.

Weapon/poison-dart actions reuse their native legacy authored art; they have not all been repainted into the new illustrated identity. The new hand-taser, standard baton and downward-swing art and new blitz are illustrated. Human art approval, live browser performance, physical controller testing and complete campaign certification remain open. Existing performance holds are not declared resolved.

## Files

New dist349 runtime/view/entry/data adapters, source-art/nightshade349 masters and provenance, tools/nightshade349 import/render/video/build scripts, tests/nightshade349*.cjs. No core gamepad or general enemy AI source was changed. Restore the348 entry or checkpoint to revert.
