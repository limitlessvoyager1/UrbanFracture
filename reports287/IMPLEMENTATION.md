# Build 287 — recording repair

Recovery checkpoint: `checkpoint-before-recording287`, commit `a7f8eb77bb5c44a2bcc7e3702bdf7c3bb0ebfecd` (published Build286).

## Confirmed causes and corrections

- The old leg-lock presentation clamped individual mesh vertices to the ground and deformed different body regions. This could collapse source pixels and distort clothing. Replaced it with whole-body rigid placement before impact, the victim's own native prone texture after impact, and two connected textured leg segments. Horizontal body placement keeps limb extension near the original anatomy (observed maximum approximately 1.05). The hero uses unwarped complete poses. The raised near leg renders in front of Niko with his source hands above its ankle. Rolling takedown, quick snap, native injuries, timing, class eligibility, deferred defeat and get-up remain native.
- Niko's moving aerial kick mixed an absolute-position update with native jump movement and sampled contact only once. Native movement now owns horizontal travel. The starting combat plane is captured before the first jump tick and retained through landing. The kick samples its bounded active window, once per eligible target, with range/plane/protection checks.
- A physical Attack hold begun in recovery could fail to arm a charge. Eligible recovery-tail holds now arm native Thunder Palms after recovery completes. Mandatory recovery, charge duration, release input and interruption rules remain enforced.
- Normal Marcus/Kevin could still select or retain guards. Their guard probability is zero and the actual damage guard branch excludes ordinary variants. They retain interruptible attacks and the existing half-second clean-hit reaction. Specialist variants and genuine wake protection retain their own rules.
- Stale grapple offsets/grounded presentation could leak into subsequent knockdowns. Those fields clear before an unrelated normal fall.
- Niko's walking grip metadata and grip-overlay source coordinates did not match his fists. Corrected per-frame sockets and source-to-display conversion. His short weapon attack now has six complete poses driven by the same rig used for contact. Kevin's armed movement uses the complete eight-pose gait with per-frame hand coordinates.
- Idle Niko rear holds now use a wrap/clasp pose, victim-specific behind/foreground ordering, and the native held enemy identity.
- Bruno's gait cadence was too slow for his resolved movement. Its stride is now90 world units per complete eight-frame cycle. Native clean one-two-three contacts retain the target long enough for the next strike, with bounded follow-through movement and final knockdown. No new AI controller or first-hit range bypass.
- Saito's flying-kick lift retained a positive floating-point remainder throughout recovery. Lift now terminates exactly. His clean combo opener maintains enough hitstun for the actual three native kick contacts. Whiff, block, protection, range and plane rules remain.
- Kevin/Saito backward falls now use six consecutive authored full-body frames and a supine final pose, with the original facing retained and normal get-up rendering restored at recovery. No generic double rotation.

## Verification

`recording287.cjs` exercises real physical hold/release, jump launch/travel/landing, contact, ordinary enemy defense, three-hit follow-through and stale-pose cleanup at30/60/120Hz. `legthrow286.cjs` retains all23 native opponent factories, both facings,14 stages,132-frame timing, damage/injuries, interruption and deferred-death checks.

`recording287-render.cjs` uses the actual image assets and canvas rendering, not rectangular stand-ins. It tests23 opponents ×132 frames ×two actors for visibility and ground penetration. The retained old-source replay in `recording287-baseline.cjs` reproduces source-pixel loss from the checkpoint and verifies restored body coverage. `recording287-view.cjs` covers fall stages, armed gait, short-weapon sockets and near-leg layering. An offline frame gallery is available in Niko practice; it uses native pair setup and does not modify the live campaign.

Full frozen release results are recorded in `reports242/latest.json`. Do not infer a full stable/artistic/hardware certification from automated passes. The final QA status is recorded after execution.

## Source and packing

Generated source sheets and import scripts are retained in `art-source287`. The directly affected Bruno gait was repacked at the same dimensions and with byte-identical alpha; original bytes remain in `art-source287/retained`. RGB encoding changed slightly (mean opaque-channel error approximately2.37/255), geometry and frame metadata did not. No unrelated backgrounds were resized or recompressed. `reports287/gait-packing.json` records the comparison.

The historical Build266 unchanged-body proof explicitly excludes the intentionally changed martial controller; the original proof record and checkpoint remain recoverable. The former regular-enemy frontal-guard test now asserts the user's current no-block rule. Other eligibility and protection checks remain.

## Limitations and rollback

Physical DualSense, human balance, source-art approval and owner-approved screenshot baselines remain manual. New fall and slash artwork has been inspected but is not an owner-approved visual baseline. The leg-lock still uses authored key poses with rigid/textured limb placement between them; this is not a hand-painted unique full sprite for every simulation tick and opponent.

Rollback: deploy the previously saved Build286 version, or restore checkpoint `a7f8eb77bb5c44a2bcc7e3702bdf7c3bb0ebfecd` through the repository workflow and rebuild/package that exact source. Preserve any later work before source rollback. Developer Restore Defaults remains separate from code/build rollback.

## Final frozen run

142 automated suites passed;0 failed;5 manual gates not executed. Source did not change during execution. Fingerprint: `e7e6335185a768d63dd7e39c794c3bf5ccceefe7a95983a289d2559697a57b0b`. Status: needs-review, not stable. Actual raster coverage:12144 checks across23 opponents and132 frames; no sampled below-ground opaque pixels.
