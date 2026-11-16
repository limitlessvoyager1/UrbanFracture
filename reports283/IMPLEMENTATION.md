# Build 283 — Marcus presentation and Niko front throws

Recovery checkpoint: `checkpoint-before-niko283`, published source `6facb8fd50d4ad5f583956205802a1dcf195b43b`. Preserve the original source and original Niko atlas bytes under `art-source283`.

## Recording audit

Reviewed the supplied screenshot plus the 91.50-second gameplay recording (`201635`), the 11.17-second forward-throw reference (`204022`) and the 9.23-second away-throw reference (`204418`). Contact sheets and focused samples around the reported14-second hit and26-second grab were used before editing.

Confirmed causes:

- The Niko arm-injury adapter could select `frontKick` for Marcus, but Marcus had no front-kick sprite dispatch. The actual damage could arrive while the renderer returned his idle pose. The movement presentation adapter also retained the originally requested combo name after an injury-driven move substitution; it now records the actual resulting action/contact clock.
- An injury presentation overlay erased an approximate arm region and rotated another copy over the original. It could leave two arm silhouettes visible. This overlay is removed; the real injury status, damage effects, duration and behavior remain.
- Marcus used an old generic held atlas rather than a consistent version of his current costume/body. Native pair rendering could rotate that generic body independently from Niko's sparse pose changes.
- Idle front grabs used the generic32-world-unit offset despite Niko's visible arm reach and the current sprite scale. His hands extended past the target.
- The old forward throw had one hero pose and a generic rotated victim. The away move jumped to the floor and separated arm injury from its later stomp.

## Changes

`Niko283` extends the existing Niko185 pair owner; it is not a second input reader or grapple controller. Existing `throat` and `armbar` dispatch names, Grab223 eligibility, GrappleRecovery119 sessions, deferred lethal settlement and Forest125 floor/cleanup remain authoritative. Two explicit eight-stage sequences replace the old sparse presentations:

| Forward frame | Stage | Away frame | Stage |
|---:|---|---:|---|
|0|Shoulder control|0|Arm capture|
|8|Wrist capture|10|Backward step|
|16|Raise arm|20|Turn and pull|
|24|Pivot under wrist|30|Knee descent|
|34|Controlled rotational descent|44|Prone control|
|48|Ground contact / damage|57|Load stomp|
|62|Release|70|Simultaneous arm twist and head stomp|
|72|Recovery|86|Release / recovery|

Forward total88frames; away108frames. Authored hero recovery poses remain visible until the native action completes; the away recovery rises into its standing return pose at98. Base damage remains14 and12 respectively, including the existing capped injury/retaliation rules. The away finish applies8+4at the same simulation tick; it retains the arm-injury roll. Committed protection still begins at10 and ends at the respective recovery boundary. No instant get-up, damage repetition or mid-move escape is added.

The opponent remains on the captured combat plane, follows the authoritative clock, lands prone and stays down through recovery. Forward landing faces forward; away landing faces away from the starting position. Body sole anchors stop at the floor. Native paired-motion yields only while this precise Niko visual owner is active. Grounded bodies no longer receive a competing generic rotation. Target removal, interruption, hero defeat, reset and normal completion release every native lock.

Marcus has dedicated matching restrained/flinch, captured-arm, turning, falling, prone and knife-ready bodies. He retains his ivory tank top, charcoal trousers, brown boots, tattoos, hair and face. His knife uses authored empty-hand sockets, with source fingers rendered over the handle; walking uses the existing exact gait hand metadata. A complete eight-pose front kick is timed to the actual active contact. Invalid stale/incapacitated standard-enemy contacts are rejected without changing valid attack damage or timing. Other enemy families retain their own identity-specific held/ground sources under the shared pair clock.

Niko's shoulder hold aligns two source-textured hand controls to the target's shoulders. Wrist and stomp contact adjustments deform one connected source body; they do not paint duplicate arms. Bounded64-entry texture caches keep this work off repeated per-frame draw paths. The knee lift/stomp lower body and controlling upper body are assembled once at the same waist reference, with one anatomical scale and no alpha crossfade. Grounded Niko pair actions render the hero in front of their own victim so a boot/hand cannot disappear behind the opponent. Other actor depth ordering remains unchanged.

## Inspection

Use Developer Menu → Enemy practice, choose Niko and a target, then slow/step using the existing Precision Playback toolbar. Developer-only `?qa259` buttons provide exact shoulder, knife, kick and throw-stage reproductions and live sequences. `choreography.json` records actual native60Hz positions, phase, pose indices, health and ground state throughout both moves. It is runtime evidence, not theoretical frame data.

## Scope and limits

No new AI controller, production balance override, weather system, campaign progression or controller mapping is introduced. The dedicated new victim bitmap family is Marcus; other families keep their identity-specific native artwork, with shared motion/ground synchronization. This is not an all-character artistic certification. Physical DualSense, owner-approved screenshots and human animation/balance review remain manual gates.
