# Gate 6 — synchronized grapple audit

**Status: audit complete; Gate 6 visual acceptance blocked. No gameplay or animation changes shipped.**

Reference source: approved Build 299, commit `32ec28b85a505b1b611f1976c2fda01352e79c95`. Recoverable checkpoint: `checkpoint-before-grapples300`.

## Scope and method

Inspected Reina's Outer Reap and German Suplex against ordinary Marcus and Bruno, and ordinary Bruno's Powerbomb against Reina. Used the production script order, current pose metadata, current renderer, fixed seeds, empty unobstructed practice fixtures, and actual simulation ticks. The capture adapter reproduces `game.js` pair translation, direction, rotation, pivot and the reap grounded-render flag. It records native state and whole bodies, not a recreated illustration.

Five normal-speed recordings and contact sheets are in `before/`. `gate6-audit-1x.mp4` joins the Bruno Outer Reap, German Suplex and Powerbomb; `gate6-audit-025x.mp4` presents those same simulation frames at quarter speed. These are diagnostic recordings, **not before/after evidence of a repair**. Individual PNGs and JSON state traces include contact-boundary frames.

The automated native audit covers 40 scenarios: five actor/move pairings × two directions × two combat planes × 60/120 simulation ticks per second. Bruno is below the established heavy-grab health threshold. AI is disabled to isolate the pairs. No health, damage, armor or recovery constants were changed.

## Mechanical results

All 40 scenarios passed these limited checks: finite coordinates, stable logical plane and actor scale, completion without a stuck move, expected impact count, released holds/pair references, and the victim remaining down until attacker completion.

| Move and target | Total simulation frames | Damage contacts | Actual fixture damage |
|---|---:|---|---:|
| Reina Outer Reap → Marcus | 90 | 42: takedown; 61: punch | 13 + 9 = 22 |
| Reina Outer Reap → Bruno | 90 | 42: takedown; 61: punch | 12 + 8 = 20 |
| Reina German Suplex → Marcus | 90 | Release 43; impact 61 | 28 |
| Reina German Suplex → Bruno | 90 | Release 43; impact 61 | 28 |
| Bruno Powerbomb → Reina | 63 | Impact 42 | 33 |

The last value is observed HP loss with current runtime modifiers; it is not a proposal to change the configured 31 base damage. These tests do not establish general boss, collision, interruption, lethal-hit or environmental safety. They also do not establish artistic approval.

## Confirmed defects and source causes

### 1. German grip and displayed hands use different trajectories

In `dist/reina123.js:6`, `rigWhole130()` Hermite-interpolates the hand coordinates while choosing a single body pose with `index130: u < .5 ? a[1] : b[1]`. `dist/reactions-view130.js` draws that one whole body. The target follows the interpolated hand through `held()` and `apply()`.

The native audit measured a maximum **57.5034 world-unit difference** between the grip path and the hand anchor on the selected displayed body, before release. This is a metadata-based attachment error, not a pixel-perfect measurement of visible finger contact. It confirms the two systems disagree independently of artistic judgement.

The rendered sequence shows pose snapping during the lift/arch. Simply attaching the victim to the nearest body pose would transfer those discontinuities into the victim's world position. Smoothing the victim alone is already the current failure. Stretching a whole sprite would violate the anatomy/proportion requirements.

### 2. German victim remains an idle body through the lift and flight

The `contact123` branch of `dist/sprites.js` selects `sheets[f.type].frames[0]`, translates its waist anchor, and rotates the whole idle body. That does not supply bracing, abdominal contraction, changing leg posture or a purpose-built upper-back landing. Inspect German frames 22, 30, 43, 48, 55 and 60 in either target sheet.

At impact the controller removes the paired visual and switches to a grounded presentation. The consequence is an abrupt change in body articulation at the most important contact boundary. A shared clock exists; compatible intermediate victim art does not.

The authored German kip-up is present: `dist/kip-view169.js` owns frames 66–90. It must remain part of the repaired choreography. This move must not be replaced by a generic backward throw or recovery roll.

### 3. Outer Reap uses a different victim artwork family

The `contact119` branch of `dist/sprites.js` routes through `heldPose23()`. In the captured Marcus sequence, the restrained body has visibly different clothing/appearance from his standard standing and grounded bodies. Bruno's restrained and grounded bodies likewise change presentation. Inspect frames 0, 14, 30, 41 and 42.

`dist/grab-view245.js` deliberately excludes active synchronized pairs from its ordinary-held correction. Therefore the improved ordinary grab artwork does not repair this branch. This is a renderer ownership/asset-family problem; increasing hitstun or changing AI cannot correct it.

The Reap controller computes the victim transform and Reina's approach separately (`dist/reina119.js:6–18`), without a shared pose-specific hand/shoulder contract. Captures show contact separation during the balance break and sweep. Its geometric ground estimate uses representative points, not the opaque bounds of the selected body.

### 4. Bruno Powerbomb carries an upright idle Reina

`drawPairedVictim()` in `dist/sprites.js:164` explicitly chooses Reina's base frame 0. The renderer rotates that idle frame during a motion whose actual grip is driven by `dist/enemies210.js:69`. Inspect Powerbomb frames 14–30: Reina remains an upright idle body above Bruno rather than a folded, braced participant in a Powerbomb.

`drawPowerGrip210()` builds the arms from cropped sprite segments with an IK approximation, while the target body has no corresponding capture/lift/slam pose sequence. A shared numerical center is insufficient to make the palms, pelvis and shoulders stay visually connected. The post-impact legacy `landMix` also produces a ghosted handoff; see frame 48.

## Correction to an initial suspicion

An early capture omitted the game's `grounded114` flag for reaps. That made the victim appear to reverse orientation after the move. After matching `game.js` and regenerating all five recordings, that particular post-landing flip disappeared. **It is not a confirmed gameplay defect in these fixtures.** The committed captures are the corrected ones.

## Shared correction required

The current uncertainty is the mapping between three independent representations: actor whole-body keyframes, interpolated grip metadata, and legacy grounded victim art. There is no verified compatible pose/contact set covering the prioritized pairs. Consequently it is unsafe to certify a timing-only or interpolation-only fix as satisfying Gate 6.

The next implementation should:

1. Define a single pose/contact descriptor per paired simulation frame: actor and victim pose IDs, imported scales, planted-foot anchors, both hand contacts, victim shoulder/waist anchors, release ownership and impact event ID.
2. Author original compatible intermediate bodies where missing, especially the German lift/arch and Powerbomb capture/fold/slam. Keep Marcus and Bruno recognizably consistent across held, airborne and grounded poses. Do not stretch, crossfade or substitute an unrelated enemy.
3. Have actor presentation, victim transforms and developer diagnostics consume that same descriptor. Keep the existing native session guard and one-shot damage flags.
4. Calibrate ground contact against actual rendered opaque bodies and explicit upper-back/shoulder impact anchors. Keep logical plane separate from elevation.
5. Preserve the 90-frame Reap, contacts 42/61; 90-frame German, release 43/impact 61 and kip-up 66–90; 63-frame Bruno Powerbomb, impact 42. Preserve current damage and recovery rules. If authored motion cannot fit, report the timing conflict before tuning.
6. Verify capture, lift, rotation, release, impact, get-up and cleanup in both directions; add bounds, lethal hits, interruption, removal/reset and collateral cases before broadening to other enemies.

## Gate decision

**Do not proceed to Gate 7.** This audit found significant pose/contact architecture gaps, so it stops at the audit/verification boundary required by the master instructions. No production source or assets changed. There is no repaired build or after-video to claim yet.

Evidence: `native-audit.json`, the five per-move state traces and contact sheets in `before/`, and the two joined recordings. Reproduction: `node tools/grapples300/audit.cjs`; `node --expose-gc tools/grapples300/capture.cjs before` from the checkout root. Capturing loads the full original renderer and should run serially due to memory usage.
