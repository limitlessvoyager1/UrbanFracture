# Presentation and scale repair — Build275

Recovery: `checkpoint-before-presentation275` at `aea30ed1ca20b4761d016db59e9fd092a61b6965` (Build274). Preserve this checkpoint for rollback. No level geometry, progression, HP, weapon damage, combat controllers, or encounter limits rebuilt.

## Requested repairs

- Dynamic actor rendering enlarged by exactly 15%, uniformly in both axes; native type multipliers preserved. Matching render/body/local-to-world calibrations use the same shared scale. Live ambient pedestrians/patrons, Fairways residents/gangs, mall/subway passengers, stadium fans and government citizen/inmate renderers enlarged correspondingly. Raster-baked people inside background images are scenery and have not been individually segmented/resized. Old inspection pages use the new scale too.
- Dirk advances walking phase only by actual post-clamp displacement. A blocked retreat no longer cycles his legs in place. Existing retreat hysteresis, firearm coordination and attack timing retained. This repairs the confirmed blocked-wall shaking cause; it is not a guarantee against every possible camera/hit-shake event.
- Kevin's native 17-frame release is retained. After frame26, the throw renders a complete empty-hand recovery body. The ordinary unarmed stationary fallback uses this same body rather than the extended-arm composite. Specialist identities remain excluded from the ordinary street controller.
- Held/pickup/thrown short weapons use Kevin's existing knife helper: silver blade, dark handle. World pickup and thrown blade sizes match the actor scale. Short thrown weapons retain release height and a horizontal blade orientation; release origin uses the hero's authored throw-hand metadata. Native contacts, one-hit ownership, lifetime, thrown break and five-successful-sequence durability are preserved. Normal hero jump apexes and Nightshade action-specific vertical clearance scale15% with the bodies/barrels, preserving jump-duration and horizontal travel; low-sweep collision reads the actual configured jump apex instead of a stale90-unit constant.
- Civic emergency vehicles increased to 360/600/450 units (police/firetruck/ambulance), preserving each image's aspect ratio and road baseline. No traffic collision or speed change.
- Courthouse atlas rows use equal horizontal/vertical scale, with camera progress mapped across each row. Indoor architecture is no longer horizontally compressed. Existing section lengths, exits and encounter geometry retained.
- Reina's two idle and eight walking poses now share one imported art scale, sole baseline and consistent anatomy. Authored glove anchors keep walking knife attachment synchronized. Running and combat art delegated to established renderers.
- Hook Kick remains native rearTakedown/119/223. Smooth28-unit shove first, heel clearance68.8 units at the enlarged scale, contact25 instead of30 frames, total56 instead of66. Damage40, counter bonus60 unchanged. Victim falls in kick direction with accelerating forward pitch; cached native recoil bounds keep the falling body above the floor. Existing face-down prone poses are used on landing where supported, with native specialist fallback. Native recovery/get-up and interruption cleanup remain authoritative.

## Verification and fixture changes

Initial release run:89/98 passed,9 failed,5 manual checks unexecuted. Preserve `first-release.json`. Failures were investigated rather than suppressed:

- Weapon contact fixtures60/95 units became69/109.25 to retain the same relative authored blade contact at15% larger scale. All actual damage, armor bypass, miss preservation and fifth successful break assertions remain.
- Renderer test doubles now supply the existing shared knife drawing dependency.
- The obsolete four-stage throw source assertion now requires the new three release poses plus dedicated recovery; no limb overlay assertion retained.
- The input-edge test's formerly whiffing135-unit dummy is moved to135×1.15 so it still tests a whiff/restart, not a newly valid buffered hit combo.
- Low-sweep tests retain their original180-unit jump opportunity after proportional vertical clearance is restored; the wrong-plane fixture is46 rather than40 units away. Grounded connection and real jump/plane avoidance assertions remain.
- Human Shield fixture distances increase proportionally (100/130→115/149.5; captive45→51.75), retaining all four real interception and no duplicate player damage assertions.
- Forest's obstruction is positioned relative to the actual muzzle plus20, preserving its original22-unit plane offset. This prevents the larger pair from moving the target past the old fixed obstruction while still testing real projectile blockage.

New tests cover exact scale ratios across hero/enemy/companion types, blocked/moving Dirk gait, mirrored constant-height knife flight, shove/contact/fall/ground phases, common gait source scale, alpha and anchors. Full QA result is recorded separately after the frozen run finishes.

## Limits

Screenshots are review evidence, not approved baselines. Physical DualSense, broad all-level visual review, human artistic approval and combat-balance approval remain unexecuted manual gates. No stable-build certification. A short knife thrown into empty space expires/breaks at its established range timeout. Foreign-weapon Nightshade work is not added by this repair.

Second release:98/99 passed,1 failed,5 manual gates. The actual Jesse apex-evasion failure revealed unscaled vertical clearance; normal jump and action apexes are now proportional to the enlarged bodies. Current216 and Nightshade257 reruns pass. Background civilian size assertions updated by the exact15% multiplier; source sole/depth ordering unchanged.

Third release:98/99 passed,1 failed,5 manual gates; the remaining failure was the cross-system Broxton/subway view suite expecting an obsolete170-unit passenger height. Its height assertion now expects195.5 (exact15% increase); sign-mount, depth and sole checks unchanged. The targeted view suite passes. The final complete run follows with unchanged runtime. Its older console caption still mentions the pre-enlargement170-unit reference; the actual assertion and final result use195.5.
