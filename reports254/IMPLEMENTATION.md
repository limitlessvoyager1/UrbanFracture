# Nightshade size · Playtest254

Checkpoint: `checkpoint-before-nightshade-size254` at `b65b7c739c0590519b678f196088baa714bbbf46`.

Latest user request supersedes253 size. Nightshade's idle presentation height is144rather than131logical pixels: another9.9% increase. The existing144/123 presentation multiplier is fixed across every pose and foot/waist anchor. Source artwork, aspect ratio,253 sampling rules,252 walking/running/recovery, collision and gameplay are unchanged. No new assets/controllers were created.

Updated existing size/art assertions verify the user's latest target. Renderer regression checks retain uniform scaling, grounded soles, sampling-state isolation and all8 gait phases. Initial/release QA reports and browser evidence are retained separately. Art acceptance remains manual; this is not full-character or stable-build certification. Combat gates are unchanged.

Rollback: retained Playtest253 saved version or isolated checkout at the checkpoint.

The two controller/open-in-own-tab links used a hard-coded legacy hostname. They now use the current Site's own origin via`./`, preventing these shortcuts from leaving the current build. This does not change controller bindings. The first initial run preceded this link repair; accepted final checks are rerun after it.
