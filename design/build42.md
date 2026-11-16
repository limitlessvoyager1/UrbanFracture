# Build42 — Carmen scale, continuous gait and fair wake sweep

Carmen render factor .86 (14% smaller) applied at the shared actor transform across idle,walk,combat,getup,grabs and paired throws. Feet remain anchored on the same ground plane; collision reach unchanged.

Replaced hard-cut8frame walking with an opaque continuously articulated walk using the existing Carmen body/limb artwork. Stable torso/hip overlap, textured thigh/shin joints, planted flat boots, alternate swinging feet and small continuous upperbody motion. No alpha crossfades or duplicate silhouettes.148sourcepixel stride matches85px/s approach at existing cadence.

Carmen no longer exits knockdown early to sweep. She completes her full getup, waits .6s standing, then (if player still nearby) starts a1.05s sweep with .45s startup. Sweep windup shows a crouched ready pose, then active sweep. If player has already moved away she skips this one wake opportunity. Repeated knockdowns reset opportunity normally. Existing damage18 and reach102 unchanged.

Reina moving jump kick13damage. Neutral aerial20, knee18, Broxton moving aerial24 unchanged.

Validation:50testfiles pass including sharedcounter/controller simulations and bothfinancialroutes. New tests verify completegetup/standingdelay/telegraph,retreat afterautomaticcountertakedown,avoidingsweep,13damagewithotheraerialsunchanged.64sample actualspritesloader render test checks finiteIK,continuous subframe transforms across oldposeboundaries and opaque limbs. Oldwakeassertion now expects standingdelay;controller script inclusion check versionagnostic. Browserpreview inspected sameplaneReina/Carmen proportions and gaitpassingposes. TemporaryQA removed. Physicalcontrollerhardware unavailable.
