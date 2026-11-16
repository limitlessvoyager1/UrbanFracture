# Build 367 - Broxton sprint and phone scale

Video reference: Screen Recording 2026-11-15 141439.mp4, 7.53 seconds. Heavy athlete sprint, mild forward lean, bent-elbow arm drive, knee recovery, rear push-off and flight. New twelve-pose transparent whole-body atlas replaces the guarded jog; walk artwork stays intact. Cosmetic run stride changes from136 to112 world units before actor scale; native walk/run speeds and combat clocks remain unchanged. Foreign weapon socket remains on an opaque glove; actor identity is preserved during blocked locomotion fallback.

The phone artwork's upright figure had the same head-to-sole height as the bent-knee combat idle but a noticeably smaller head/torso. Rendering now uses170/240 height scale instead of151.8/240 and a1.10 width correction around the existing feet anchor. Shared95% body policy still wraps all Broxton states. Every phone frame and the141-frame timeline /114-frame connection remain unchanged. No AI or backup roster changes.

Checkpoint: checkpoint-before-broxton367. Built-in image generation produced the sprint source in source-art/broxton367; tools/broxton367/pack.py registers twelve complete frames into assets/broxton367/run.webp and the existing Broxton359Data namespace. Earlier source art remains recoverable. Reference screenshots are motion-only; Broxton retains burgundy tank, cargo pants, boots, black gloves and tiger tattoo.

Verification results are recorded in frame-order.json, after.json and package-verification.json. Automated input is simulated. Physical DualSense and final artistic approval remain unverified. Continue the current bounded Downtown review and preserve all earlier manual/performance holds.

Measured native alpha bounds at 2x draw scale: idle200x283; phone draw192x323, ear195x323, pocket196x323. All feet remain at Y379. The phone is naturally taller while upright than the bent-knee fighting idle, with comparable body width instead of the prior156-160pixels.

Passed3,541 native phone assertions,24 all-direction/rate ordered gait cases, gamepad/recovery/controller157, Broxton179 and lariat244/controller suites.
