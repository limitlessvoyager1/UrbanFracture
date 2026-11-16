# Combat audit273 — Gate1

Scope: source/runtime audit of approved Build272. No production behavior, balance, artwork, level layout or controller mapping changed. Gate1 runtime audit complete; recording-specific visual comparison remains NOT TESTED. Gates2–10 not started.

## Recovery

Checkpoint `checkpoint-before-combat-audit273` at `321178a29373cb9f1ebe75327980d6e4b1c90aeb`. Build272 remains the live version. The Git tag and original commit preserve every approved source/asset. Restore through Git or the saved Build272 deployment; do not discard newer work without review.

## Executed evidence

`node tools/audit273/run.cjs`:46 isolated runtime probes plus6 seeded three-enemy simulations,600 ticks each at60Hz. Actual production script order loaded through QA242 adapter;47 damage wrappers and40 AI wrappers identified. Machine evidence runtime.json includes full ownership chain and every measurement. Direct probes isolate valid damage handling rather than pretending to reproduce exact video contacts.

`node tests/reina269.cjs`: passed70 checks, including real native ordinary armor exclusion, contact, pressure/recovery and Director-mediated anti-air trials.

`node tests/hook272.cjs`: passed40768 assertions; retained40/60 damage, native release/cleanup, heavy eligibility and mirrored/lane behavior.

No full93-suite rerun: production source unchanged. Build272's prior93pass report remains its release evidence. This audit is not a new stable build or all-enemy certification.

## Confirmed observations and causes

| Finding | Evidence | Interpretation / next gate |
|---|---|---|
| Shared baseline reaction is mechanically real | Nine tested types took clean startup damage and canceled their action. Generic6,14,30damage non-knockdown probes all applied.28s stun; ordinary displacement5units. | Missing universal stun is not the cause. Generic path has no light/medium/heavy category; Gate2 should classify actual move impact without deriving strength solely from damage. Preserve move-specific overrides. |
| No delayed attack damage after interruption in sampled cases | Marcus,Kevin,Bruno,Frankie,Carmen startup action canceled;50ticks each with AI disabled caused zero hero damage. | Do not replace functioning cancellation. Expand multi-hit/projectile/grapple fixtures in Gate2. |
| Immediate legal reengagement exists | Kevin begins knife and Bruno oneTwo at tick17 after.28s stun (16.8frames). Marcus hook at21. All reported stun0 at action start. | No hitstun bypass demonstrated. No guaranteed post-hit reassessment beat in these paths. Gate4 should add bounded personality-aware decision handling, not extra universal stun or lower aggression. |
| Bruno committed armor is independent of attack direction | Native hook tested frame2/18/22/40, front/rear. Frame18/22 retain action with14damage and0stun from both sides; frame2/40 interrupt with.28s stun. | Damage applies and armor expires. `enemies210`/core armor lookup has no source-facing predicate; bruno130 only clears rear guard. Resolve intended directional policy in Gate3, preserving legitimate commitment/wake rules. |
| Marcus/Kevin ordinary armor suppression works in sampled runtime | Prior269 test injects armor/unbreakable/wake flags, tests held/committed/idle/wake; damage still interrupts. | Do not add another armor-removal controller. Remaining visual claims require recording/render comparison. |
| Crowd stacking persists despite budget fairness | Six10second group runs max reservations2/max pressure3,zero violations. Free,non-grapple,non-flight,non-knockdown enemies reached center gaps.715–.995units in5seeds. | Director reservations work; tactical desired positions do not guarantee local body separation. Gate6 needs bounded continuous enemy separation, excluding grapples/throws, without pushing the hero or snapping. Center gaps alone are not pixel silhouette measurements. |
| Security differs materially | Generic `security` actor's6damage probe applied4HP,0stun and retained startup;14/30 probes likewise resisted interruption. | Core Otis fallback has broad.72reduction/armor outside open/combo/winded states. This is existing behavior, not automatically an accidental bug; Gate3 must distinguish Otis/special variants before changing it. |
| Renderer paths are inconsistent | `sprites.js` has type-specific early returns before generic frameIndex. `drawCarmen` has no ordinary stun-to-recoil selection; idle index0 is default after canceled action. Kevin's older helper instead rotates a body on stun. | Static renderer risk confirmed; full composited pose/body quality remains unverified. Gate5 must test final renderer rather than treating a hitFlash as recoil certification. |

## Existing systems to reuse

- Core damage, unlink, knockDown, flight and hitbox/action timelines.
- Audit135 runtime traces and Director148 reservations/role assignment/release pruning. Normal cap3/max2 are already enforced in tested trials.
- Street209/Enemies210 native eligibility, recovery and move contact data; security216/gus219 specialist recovery ownership.
- GrappleRecovery119 and Grab223 for synchronized capture/recovery/anti-regrab.
- Precision playback265 and stats266. No duplicate Director, hit controller, weather controller or HUD required.

## Not tested / limitations

The two attached text specifications are present. The referenced November7 Downtown093655 gameplay recording is not among the locally supplied videos. The available090842 video is the hook-kick tutorial, not that combat recording. Consequently this report does not claim timestamp-specific reproduction at Grand Hotel/Boutique/Sneakers/Mart, browser visual certification, HUD/GO correctness, full collision/ground-anchor art checks, all-move knockback/collision behavior or physical DualSense testing.

Generic synthetic startup actions are intentionally used for damage-pipeline isolation; only Bruno armor probes start a native action. The group simulations retain native AI/Director but enlarge hero/enemy HP to prevent early termination. No production HP changed. Random results are seeded and scoped, not universal guarantees. No proposed timing range is adopted yet.

## Gate sequence

Gate2: failing fixtures for move-class reaction strength, actual clean contacts, interruptible multi-hit cancellation and normal combo continuity; extend existing damage path only. Gate3: directional armor and specialist approved windows, diagnostic distinction. Gate4: legal recovery/reassessment, preserving mandatory recovery. Gate5: final-render recoil/fall/rise/anchors. Gate6: continuous local separation with native roles. Gates7–10: lane/contact, collision event safety, actual diagnostics/reversible controls, regression and visual review. Each gate requires its own demonstrated results. No wholesale damage/HP/aggression reduction proposed.
