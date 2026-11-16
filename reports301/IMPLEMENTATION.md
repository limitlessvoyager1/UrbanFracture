# Gate 6 — synchronized grapple corrections

Scope: Reina's Outer Reap and German Suplex against ordinary unarmed Marcus and Bruno, and ordinary Bruno's Powerbomb against Reina. This completes the corrections identified in the Gate 6 audit for those five prioritized pairings. It does not enroll unrelated heroes, armed variants or specialized bosses in a generic throw renderer. Gate 7 has not begun.

Checkpoint: `checkpoint-before-grapple-corrections301`, based on audit source `9f9584f044807d7be6f062c19263eeec221afcca`.

## Corrections

- Added original paired body atlases. During attached phases both bodies are rendered from one authored contact pose selected by the existing action clock. The second actor's legacy idle/held body is suppressed, preventing doubled bodies and incompatible hand paths. No body morphing, stretching or ghost crossfade is used.
- Replaced the Outer Reap's incompatible victim artwork with recognizable Marcus/Bruno bodies through control, off-balance, leg reap, fall, ground preparation, punch and withdrawal. Ground-strike alignment and two backward steps now use the landed target's position rather than retreating through the victim.
- Preserved the German Suplex's planted stance, loading, backward arch, native release at frame 43, independent flight, upper-back impact at frame 61, and original kip-up at frames 66–90. Whole released bodies are isolated by their actual connected alpha components; they are not cut across torsos or stretched. The released body's rendered hip and floor trajectory share the same sample as the native pair motion.
- Replaced Bruno's upright-idle carried Reina and cropped-arm approximation with capture, folded lift, high lift, downward drive, impact, release and standing recovery poses.
- Grounded Marcus/Bruno continue through their existing original impact, down and complete get-up pose families. Direction is retained across the German landing instead of handing off to an incompatible body orientation.
- Kept native one-shot damage events and the existing attacker-first recovery guard. Added cleanup when a grapple's attacker is removed, and prevented a rejected/repeated start from reinitializing an existing paired action.
- Developer diagnostics now show the actual shared frame, pose family, attachment/release mode, ground plane and fresh rendering receipt. The old legacy interpolated hand metric is not presented as the new joint pose's hand contact: attached bodies are authored together, while released bodies have no attached-hand gap.

## Approved timing and balance

| Pairing | Total frames | Contact/release | Actual fixture damage |
|---|---:|---|---:|
| Outer Reap → Marcus | 90 | 42 takedown; 61 punch | 22 |
| Outer Reap → Bruno | 90 | 42 takedown; 61 punch | 20 |
| German Suplex → either target | 90 | 43 release; 61 impact; 66–90 kip-up | 28 |
| Bruno Powerbomb → Reina | 63 | 42 impact | 33 HP loss with existing modifiers |

Forty pinned before/after native comparisons match on total duration, contact frames and damage. No approved damage constants, hitstun, attack timing, recovery, AI weights, armor rules or threat budgets were retuned. Throw trajectory/contact positioning changes are scoped to these authored pairings.

## Files and asset handling

`grapples301.js` supplies shared descriptors and scoped motion/cleanup; `grapple-view301.js` renders complete paired/released/grounded bodies; `grapple301-data.js` provides per-source rectangles, fixed import scales, alpha-component metadata and roots. `reina119.js` and `reina123.js` delegate only enrolled pair samples. `playback265.js` exposes actual diagnostics. `index.html` loads the new modules after the existing owners.

Original full-resolution authoring images and byte-identical prior assets are preserved in `source-archive/build301/`. Each new atlas has one uniform import resample for the entire family, with fixed axes/scale and no per-pose resizing. The old German and Reap sheets were repacked without changing their rendered body pixels or local anchor geometry. The related oversized rear-grip source was imported uniformly at half resolution with doubled import scale, preserving its world size/anchor. The hosting archive remains below the expanded static size limit; unrelated level art was not recompressed.

## Verification and evidence

- `runtime-validation.json`: 22,798 checks, 40 mirrored 60/120 Hz plane fixtures plus interruptions, attacker death, reset, lethal victims, removed participants and bounds cleanup.
- `view-validation.json`: 9,418 checks across ten mirrored rendered sequences, inspecting every simulation frame through the throw and recovery. Checks include visible complete bodies, no duplicate victim, fresh receipts, logical-state immutability, opaque floor contact, released-body floor penetration and intermediate get-up poses.
- `approved-balance-equivalence.json`: all 40 approved timing/contact/damage comparisons equal.
- `art-import.json`, `repack-validation.json`, `reap-repack-validation.json`, `rear-import.json`: source and import proofs.
- `after/`: five normal-speed native-renderer recordings, selected contact-boundary PNGs, contact sheets and state traces, visually inspected for all prioritized pairs.
- `before-after-1x.mp4` and `before-after-025x.mp4`: matching audit baseline on the left, corrected sequence on the right, all five pairings.

The new raster suite runs in bounded subprocess batches because loading the complete legacy sprite renderer and retaining many native canvas allocations in one process exceeded the container memory budget. That test-harness failure was corrected; it was not a gameplay failure. Full-release results are in `RESULTS.md` after completion.

## Limits

The cloud browser's documentation request timed out, so this turn does not claim a successful browser UI session or physical DualSense verification. Visual inspection uses the production renderer in the repeatable native harness. The five prioritized ordinary pairings are covered; this is not a claim of newly authored pair animations for every hero, weapon variant or boss. Owner art/balance approval and the existing whole-game manual gates remain separate from automated passing checks.
