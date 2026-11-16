# Gate 5 — Knockdown and get-up continuity

Build 299. Baseline: Build 298, `bae028754fb745408eee084e8e63891bae2c32c3`. Recovery checkpoint: `checkpoint-before-knockdowns299`.

## Confirmed defects and repair

| Finding | Source cause | Correction |
|---|---|---|
| Marcus's get-up skips authored intermediate poses17 and23, then selects idle before the sequence completes | The `rise` table in `reaction-templates289.js` jumps16→18 and terminates at0. The poses already exist in the original24-pose atlas. | The new native-clock presentation uses every get-up pose13–23: grounded preparation, side brace, hands/knees, planted foot, crouch, rising guard and stand brace. |
| Knockdown starts directly in the falling family | Existing289/296 selection begins at fall pose6. There is no separate initial impact-recoil step in the fall selector. | Prepend an existing original impact-recoil pose, then loss of balance and the full fall family, within the same native0.32s falling interval. |
| An older visual landing flag remains false after a real landing | `recording287.js` initializes `fall287.landed`; ordinary `core.js:land` updates `actor.landed`, not that historical field. | Read the authoritative native `landed` state. Actual impact is observed once; no second physics impact or duplicate damage is introduced. |
| Get-up immediately hands back to the unrelated idle renderer | The down condition expires, so the authored get-up owner disappears at once. | Finish with an original stand-brace pose and at most six frames of cosmetic settling inside existing post-get-up recovery. No extra recovery time. |
| Direct offensive start calls can bypass the normal AI admission path during an existing down/recovery lock | `start` is a generic action constructor; normal native AI readiness usually prevents this, but it is not itself a knockdown/recovery barrier. | For enrolled knockdowns, reject offensive `start`/`enemyAct` calls while the same native down/recovering/standing-lock values remain positive. Scripted/paired and other enemy owners retain their native handling. |

The ordinary unarmed Marcus and Bruno pilots reuse their original289/296 full-body atlases at their existing fixed family scales. No art was regenerated, recolored, morphed, or resized. Bruno retains his heavier authored fall/get-up shapes. Native bosses, armed variants, martial wake-up attacks, throws, pool/pit states and synchronized grapples retain their existing owners. This is not a claim of new attack/fall artwork for the entire cast.

## Native mechanics preserved

`core.js`, `combat134.js`, `enemies210.js`, `martial212.js`, `recording287.js`, `paired-motion.js` and `reactions298.js` are byte-identical to the approved baseline. Damage, startup/active/recovery definitions, knockdown duration, root trajectory, combat plane, invulnerability, wake armor and AI weights are unchanged.

Two complete native Reina standing combinations, one against Marcus and one against Bruno, are captured from both builds. The native input commands queue all three kicks; each scenario runs300ticks. All600ticks match for both actors' HP, positions, facing, action clocks, knockdown clocks, stun, recovery, standing lock, protection and scale. Native damage contacts remain7/8/10 at capture frames9/38/74.

The new safety guard enforces the already-existing recovery locks; it does not lengthen them. For a controlled1.45s knockdown started outside a tick, native measured events are:

| Enemy | Impact | Standing | Recovery locks clear | First observed native action |
|---|---:|---:|---:|---|
| Marcus |0.333s|1.467s|2.467s|hook at2.617s|
| Bruno |0.333s|1.467s|2.467s|oneTwo at2.883s|

These are seed299 observations, not universal AI decisions. Native floating-point/tick behavior is preserved, including the existing extra fractional tick at the end of the configured knockdown. No attack occurs during remaining native recovery in these runs. `ai-recovery.json` contains the actual observations.

## Rendered evidence

- [Before/after overview](comparison.png).
- [Normal speed](before-after-1x.mp4) and [0.25×](before-after-025x.mp4). The same60Hz frames are time-expanded for slow inspection; this is not presented as a second independent slow-simulation run.
- The normal-speed clip shows Reina versus Marcus at0–5s and Reina versus Bruno at5–10s. Baseline is on the left, current rendering on the right. Their third kick lands at1.233s of each five-second video segment (capture frame74; frame0 displays the first completed tick).
- Full per-frame state/pose traces, individual clips and selected PNGs are in `before/` and `after/`. Baseline runs against a detached worktree of the exact approved298commit. AI is disabled only for these repeatable choreography captures.
- [Browser screenshot](browser-proof.jpg), [fall telemetry](browser-fall.json), and [rise telemetry](browser-rise.json). Actual browser inputs at0.25× complete three kicks: Marcus60→53→45→35HP. His loss-of-balance state is non-actionable; subsequent native impact and get-up remain on the same logical ground plane. The rise capture reports15down frames remaining and native `landed:true`; its timeline retains the observed impact time.

The before/after fall, ground and get-up samples were visually inspected. The renderer tests inspect both facings throughout the sequence for complete visible bodies and opaque ground contact. These remain artistic review candidates, not approved screenshot baselines.

## Runtime diagnostics and files

`dist/knockdowns299.js` provides a read-only presentation plan, actual knockdown-event observations, and offensive admission guards over native recovery. `dist/knockdowns-view299.js` draws one whole original body, after the previous ground-registration wrapper, at its fixed import scale and sole anchor. It emits a fresh native-phase/frame/ground receipt. It introduces no visual elevation or logical motion.

`dist/playback265.js` includes actual landed state, phase, remaining down frames and observed impact/stand/recovery-lock times in captured runtime JSON. The existing developer panel remains in place. Other integrations are `dist/index.html`, the render harness, QA registry, tests and reproducible capture script. The old289/296 assets and selectors remain available for delegated cases.

Actual native actionability is separate from visible standing: completing a rising pose does not make an enemy actionable while recovery/standing locks remain. Defeated enemies stay grounded and never receive a get-up plan. Already-grounded and scripted/synchronized cases preserve their native ownership.

## Validation and remaining limits

`runtime-validation.json`: targeted phase order, all eleven get-up poses, native source invariance, one impact/one stand, offensive start denial throughout existing recovery, eventual release, defeated targets and special-owner exclusions. `view-validation.json`: both characters/facings over the full rendered sequence, complete visible bodies, opaque sole alignment, no mutation of native state, actual pose receipts and playback telemetry. `native-equivalence.json`:600equal native ticks and equal damage contacts.

`release-validation.json` records the full regression run and frozen-source result. Manual art approval, all-move/all-level coverage and physical DualSense certification remain separate. No new reference-game sprites, animations or frame data were used. Full paired throw/grapple choreography is Gate6 and has not started.

Final frozen-source regression: **156 automated suites passed, zero failed; five manual review gates remain unexecuted.** Source fingerprint `6de03145e103de7ccd739fe715d41c53ee2b588dec3ef5d3b0bc5c7c43e40bbe` remained unchanged. Targeted runtime:2,195assertions; rendered checks:1,585. The automated gate remains `needs-review`, not human art/controller/stable-build certification.
