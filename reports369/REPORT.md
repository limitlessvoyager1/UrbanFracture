# Build369 - coordinated Broxton idle, walk and run

User reference: Screen Recording2026-11-15 144504.mp4,40.53s. Recording demonstrates wide/crouched combat idle swapping to upright/narrow relaxed-arm walk, with another independently generated run identity. User explicitly included running in the correction.

A single28pose painted source now owns4breathing-idle,12guarded-walk and12run frames. All three use one common image import scalar, head registration, wardrobe/lighting/physique and local151.8/416 draw scalar, wrapped by the existing95% body policy. Walk keeps idle's bent-knee guard rather than dropping arms and standing upright. No independent per-mode body-width/height resizing. Idle breathing uses0,1,2,3,2,1 at0.4s per frame. Paused simulation time freezes the pose. Native walk/run speeds and88/112cosmetic strides remain unchanged.

BroxtonGait359 now renders eligible idle and blocked/stopped movement from the unified idle atlas. It does not return to the older idle owner for free movement states. Combat/block/jump/hold/down/shock/reaction states still go to their existing owner with the original actor identity. All181combat poses remain intact. Phone367scale/timing is preserved. Foreign props attach to per-pose opaque glove sockets. No control, meter, damage, AI or gameplay changes.

Reproduce: python tools/broxton369/pack.py; node tools/broxton369/render.cjs; node tools/broxton369/gait-order.cjs; python tools/broxton369/build.py; python tools/broxton369/verify.py. Registration records every pose/common scale; native-comparison.png renders all28poses in both facings with the same draw owner/scale. Frame-order tests include all24direction/rate cases and ensure stopped/blocked movement uses the new idle while combat retains its owner. Synthetic controller tests remain separate from physical hardware. Earlier manual/performance holds remain.

Checkpoint-before-broxton369 retains368. Sources and prior atlases stay editable in dist/source history; superseded gait files are excluded only from bounded deployment. Current review scope/audience is unchanged.

Passed118native render checks (all28poses/both facings, distinct frames, nonempty/unclipped bounds),24ordered movement cases, full idle/walk/idle/run/idle transition checks with no old-idle fallback and pause-frozen breathing, plus gamepad/recovery/controller157 regressions. Final package source/retained-asset integrity and deployment size checks pass. These are native/synthetic checks, not physical DualSense or browser FPS certification.
