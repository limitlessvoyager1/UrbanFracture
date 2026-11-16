# Build 313 — Stadium and combat correction report

Approved source checkpoint: `49e9395640452feb44fc29a4280983e995308592` (Build312). Supplied stadium screenshots and the20.93-second recording were inspected. Original source and replaced raster art remain recoverable in Git and source-art; this build does not replace the game's art direction.

## Corrections

| Reported problem | Confirmed cause / correction | Evidence |
|---|---|---|
| Civilians glide, run slowly or freeze in running poses | Old two-pose exports and render-time95u/s motion replaced with original eight-pose running cycles,235worldu/s native movement and matching planted idle. State is serializable for replay. | stadium/runtime-results.json; run-cycle.png |
| Stadium seams, overlay doors, angled lockers | Complete perspective rooms were tiled with black borders; primitive door boxes and incompatible generic floor strips overlaid art. Original flat background strips, overlapping edges and actual illustrated openings replace them. | stadium/concourse.png; facilities.png; lockers.png |
| Small elevator fan and mixed cabin materials | Consistent adult scale, clear elevator footprint, adjoining cabin crop and actual ride-only0.65pixel vibration. Reduced motion respected. | stadium/cabin.png; elevator-runtime.log |
| Split/discontinuous football field and wrong markers | One6600unit route now spans both goal lines with aligned turf, hashmarks and10…50…10numbers. Tunnel behind start, side-on goal orientation, no midpoint portal. Original12normal enemies plus450HP Baylor retained. | field-goal.png; field-mid.png; field-far.png; routes.log |
| Reina jump/dodge/blitz changed after new art | Requested legacy actions now use the approved pre-style310 native choreography and original root motion. Unique Action and other311moves retain their owner. | reina-moves.png; reina-visual.json |
| Forward jump kick misses late contacts | Old contact was a single instant. Contact now evaluates throughout its active animation with once-per-target receipts and native block/invulnerability handling. | reina-runtime.json |
| Aerial downward attack | Original eight-pose sword-draw/descent/landing/recovery art; sword points down during descent. Blade contacts use actual world ray and target hurtbox. Same combat plane,10damage retained,0.85second clean-hit stagger permits native grab after recovery. | reina-runtime.json; reina-moves.png |
| Knife too little recovery; weapon hits lack knockdown | Reina short-weapon recovery18→26frames; current approved restore baseline is26. Hero-owned single-hit foreignweapon attacks request native knockdown without bypassing guards or invulnerability. Reina’s three-slice knife sequence retains all three contacts and approved full damage, with knockdown on its final slice. Enemy weapon balance unchanged. | reina-runtime.json |
| Detached pixels on Reina action sheets | Low-alpha and small disconnected raster debris removed from16registered action atlases; original files archived. Full bodies, anchors and choreography retained. Legacy special/blitz use original native assets. | alpha-cleanup.json |
| Tornado/Frankie apparent growth | Reina Tornado uses one fixed family calibration; Frankie matched ready/attack anatomy at constant scale, not per-frame scale normalization. Wrist sockets carry chain through punch. | reina-moves.png; enemies/after.png |
| Flint floats above shadow | Connected boot sole lies above detached black source fragment. Renderer anchors connected sole, not raw alpha extent; native ticks clear only unowned leftover grapple elevation. Logical lane unchanged. | enemies/REPORT.md; visual.json |
| Baylor becomes Bruno, slides, loses helmet | Generic enforcer selectors incorrectly admitted Baylor; eight native poses omitted helmet. Narrow exclusions, original helmeted counterparts and eight real gait poses preserve identity. Permanent native armor now applies as requested; legal weapon/force/grab exceptions and recovery remain. | enemies/before.png; after.png; runtime.json |

## Validation and limitations

Targeted native tests cover actual blade contact/grab follow-up, active jump contact, invulnerability, weapon knockdown, approved reset baseline, armor and ground ownership. Stadium routes pass for six heroes across both branches, retaining Director3point/max2offensive limits. Rendering is inspected from actual game runtime, with original generated sources retained for all new art. Full release results are recorded separately in qa-progress.json when complete.

The exact paused Flint screenshot cannot be reconstructed from the short Baylor recording; connected-sole and stale-elevation defects are confirmed independently, rather than claiming the screenshot proves the internal cause. Native captures and simulated input do not certify live-browser, physicalDualSense, all-art or human balance approval. No unrelated enemy damage, AI aggression or general attack timing was changed.

The first full regression attempt caught premature knife knockdown preventing the remaining two slice contacts and reducing actual damage. This was corrected in production hit ownership, rather than weakening the three-hit regression. The old timeline assertion50frames was updated to58solely for the explicitly approved8frame recovery increase. Preliminary results remain available; final results use a fresh frozen source run.

## Final automated release result

203 unique automated suites pass,0fail after explicit validation rechecks. The full frozen runtime run executed all203 with197passing and6validation failures. Five validation-only files were then updated: exact approved313source reversal was composed into historical proofs; the geometry-disabled reference fixture retains weapon-action ownership; the old projectile assertion now requires knockdown and blocked attack admission instead of standing stun. Twelve affected and related suites were re-executed and pass. No failed check was waived.

FINAL_VERIFICATION.json records merged results, original failure logs, each recheck and the exact five validation file deltas. pre-harness-manifest.json verifies that every production script, HTML and asset remains byte-identical to the full203-suite run. All original comparison bytes remain protected outside the explicit approved substitutions.

Five manual acceptance categories remain unexecuted. The managed preview server started, but the cloud browser timed out navigating to its exact returned URL; the server was stopped. Native runtime renders were inspected; this does not certify live-browser, physicalDualSense, all-art or human balance approval. Release status is needs-review, not stable certification. Static tar preflight is268339200expanded bytes, below268435456; replaced source art and retired assets remain archived outside shippingdist.
