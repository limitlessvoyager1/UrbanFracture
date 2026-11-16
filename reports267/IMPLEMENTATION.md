# Nightshade Gate8 — integration playtest / Build267

Recovery checkpoint: checkpoint-before-nightshade267, source f2cd260faeed14d8e650db058653f52947065c5f. Previous private deployment remains recoverable as Build266.

Gate8 extends verification of the existing hero, without new combat controllers, artwork, scale changes or damage retuning. The new current-order suite measures84 scene/ammunition launches across21 registered scenes,28 combo/contact trials across7 scenes,27 native-AI duels,6 actual locked crowd clear/unlock trials, finite gun and Counter Special resources, heavy/boss counter thresholds, native destructible loot, highway pit recovery and laboratory fire.

Confirmed defect and repair: ordinary melee could miss casino slots because its local prop box was too short. Connect active melee to existing Casino/Mall/Route74 prop-contact helpers, retaining one-hit sets and native rewards. Remaining ordinary breakables use forward/lane contact consistent with shared prop interactions. Regression cases reject startup/repeated/behind/distant/wrong-lane hits. A real slot machine also had a generic bullet-cover box inconsistent with its rendered195-unit body; use its existing artwork dimensions, preserving explicitly configured dimensions.

The failing-before-props log preserves the original slot contact failure. Fixture staging was corrected to use actual registered scene IDs and explicit enemy coordinates after a legacy factory clamps to Financial bounds. Those fixture mistakes are not reported as production defects.

Results:803 assertions in tests/nightshade267.cjs. Zero-ammunition policy defeats regular and heavy opponents across3 seeds. Six ordinary shots defeat a regular opponent but not full-health heavy/boss opponents. All6 two-enemy native locked trials clear and release, with no ammo refill or exceeded commitment limit. The simple policy times out against the boss: zero-ammo full boss playthrough and human balance are not certified. No numerical balance changes are justified by these limited policies.

Browser: preview launched current Build267 in Casino, rendered Nightshade and ammo5/6, accepted gunfire/melee and showed actual contact (Marcus54/60), preserved combat laboratory, visible locked arena and finite recovery. Touch/native keyboard interactions were used; no physical controller was connected. This is a spot check, not a screenshot baseline comparison or full Casino completion. Screenshot browser-casino.jpg. Browser completion-summary call was rejected by tool schema (code field required); outcome screenshot was retained.

Not executed/accepted: owner-approved screenshot comparisons, full art review, complete all-move/all-level campaign coverage, physical DualSense, human balance. Nightshade foreign-weapon pickup/idle/attack artwork and proficiency remain absent; no invented placeholder moves were added. Historical ammo256 economy output remains a model, supplemented here by realAI zero-ammo and mixed-policy trials. Environmental geometry, civilian art and unrelated heroes are unchanged.

Modified runtime: dist/nightshade267.js, nightshade-melee257.js, nightshade-gun255.js, game.js, index.html. Added harness/test and registered suite. reports266/header-storage.json removes the two intentionally modified executable bodies from its formatting-only proof and restores their archived comment headers;208 untouched body hashes remain. QA logs/report source fingerprints identify exact inputs.

Execution: node tests/nightshade267.cjs; node tools/qa242/run.cjs --profile initial; node tools/qa242/run.cjs --profile release. QA242 exit2 means needs-review; it must not be labeled stable.
