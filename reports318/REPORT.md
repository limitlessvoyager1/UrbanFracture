# Build318 — One-second charged moves

Approved checkpoint:2d9ecd7e040eeb61901f8cbc3470f4d50faf03f6.

Reina's Tornado Kick, Forest's Gunner Maul, Niko's Thunder Palms and Nightshade's Poison Dart Pen now become ready after one simulation second. Native hold/release, interruptions, action recovery, stored unavailable moves and all existing damage/resource costs remain in their existing controllers. Nova, Broxton and Orion keep their previous charge thresholds.

These four heroes' in-game HUD displays their move name without a duration, percentage or READY indicator. Their ordinary readiness label above the body is suppressed; stored/unavailable feedback remains useful and is retained. A scoped final-render wrapper keeps each hero's existing color glow visible throughout the fully charged hold, including character-specific and walking render paths. It restores the canvas context and removes the glow when readiness ends. Developer diagnostics still expose actual timing.

Validation:128 production-runtime/HUD/glow assertions passed, including not-ready one frame before one second at30/60/120Hz, ready at one second, release at exactly one second, early release, cancellation, sustained hold and unchanged other heroes. Nine integration suites passed: controller240, Nightshade melee/input257, playback265, diagnostics307 input, Niko284, Reina278 Energy316 and contact/HUD302. Native authored-body ready/unready pairs for all four heroes were rendered and inspected in ready-glows.png. No full216-suite release rerun was needed for this scoped charge/HUD adjustment. Physical-controller testing remains unverified.

Exact318 source receipts reverse the changed existing lines to the approved checkpoint before prior source proofs. No existing art or animation assets were changed.
