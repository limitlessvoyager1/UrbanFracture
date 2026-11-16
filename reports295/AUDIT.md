# Urban Fracture - Combat Fluidity Audit / Gate 1

**Decision: Gate 1 complete; Gate 2 not started.** The requested audit stop applies because a universal pose handoff is not yet safe across authored sprites, the generic reaction mesh and synchronized pair renderers. No game code, art, timing, damage, AI tuning or approved baseline has been changed. Live Build294 remains in place.

Recovery: `checkpoint-before-continuity295`, commit `7043bc7e71ac854986be0e9b7179a5e3f84b9ac1`. Production-byte comparison:1506 files unchanged. Diagnostic tools and this evidence are new source-only work.

## Sources and method

Supplied clips: UF140945(2),173.205s; SoR090538(2),33.500s; SoR090317(2),44.567s. Times below are local file offsets, not the YouTube playhead or weather HUD. Overview sampling covers all three clips; detailed windows were sampled at0.167-0.25s intervals. Those samples support visible sequence observations, not exact source-game frame data, input latency, hidden hitboxes or AI rules. Paused/repeated source frames are not treated as animation holds.

The supplied UF clip predates Build294. Current-build findings are distinguished from older recorded defects. Current native60Hz captures use Reina against Marcus and Bruno, seed295, Normal difficulty and fixed starting positions. AI is disabled only for isolated combo/fall/get-up captures; separate native-AI probes measure return to attack and a10-second mixed group. Native renderer output was inspected. These are calibration captures, not identical camera/seed recreations of the supplied campaign recording.

## Video comparison

| Local clip time | Visible observation | Appropriate UF principle / limit |
|---|---|---|
| SoR0905380.2-1.4s | Close body control changes into an overhead/rearward body rotation; the initiating fighter folds toward the floor and recovers. | One readable capture-to-release trajectory with distinct anatomy. Exact input, damage and eligibility are unknown. |
| SoR0905381.8-3.8s | Airborne strikes, target lift/rotation, descent and grounded settling are visually distinct. | Do not substitute root translation for changing fall anatomy. No inferred source-game hitstun frames. |
| SoR0903170-5s | Closely spaced contacts produce visibly bent/raised opponents and distinct extended striking poses. | Match contact, recoil and follow-through. Crowd overlap alone is not proof of bad attack budgets. |
| SoR0903178.0-9.2s | A released body travels through tilted, inverted and descending orientations before it leaves the immediate fight. | Preserve continuity through release and independent flight. It does not establish a complete isolated get-up. |
| SoR09031718.834-20.0s | Visible contact bursts accompany short close strikes, then target launch and floor contact. | Contact timing and reaction readability. This window is not sufficient evidence for the exact grab/throw asserted in an older report. |
| SoR09053812-24s | Opponents occupy different depths/distances while nearby contacts displace bodies. | Useful depth separation; exact threat-slot probabilities are not observable. |
| UF2-4s | Close hold bodies overlap; some strike stages read mainly as a pose replacement. | Review stage-specific contact and recoil. Build294 already adds hit-driven held recoil; do not claim the old clip proves it is still absent. |
| UF8-10s | Running civilians differ visibly from nearby stationary adults. | Older sizing problem; Build294 changed runner source-height normalization. Fresh all-level/civilian behavior remains Gate10. |
| UF32-46s | Bruno/Frankie/Kevin converge around Reina; changes between ready, extension and reaction poses are abrupt. | Separate pose continuity from AI admission and mechanical hitstun. Video alone cannot prove illegal retaliation. |
| UF60-64s | Held knees/elbow/palm finish, release and return to movement can be followed, but the victim's anatomy gives limited stage-specific impact information. | Author contact-specific held reactions; preserve native four contacts and recovery. Full choreography belongs to later gates. |
| UF144-148s | Marcus goes through a kick/knockdown; Flint later reaches a low grounded body pose beside overlapping fighters. | Do not confuse different combat depths with floating. Ground height was addressed in294; new evidence confirms sampled current floors. |

No reliable isolated source-game armor/block example is established from color flashes alone. No source-game sprites, poses, audio or code were extracted into the game.

## Architecture actually loaded

The engine is a buildless Canvas2D browser game. Production order is `dist/index.html`. Native Brawler methods are incrementally wrapped; the current runtime audit records113 tick wrappers,51 damage wrappers,41 AI wrappers and31 enemyAct wrappers. Counts are not defects by themselves. They make the final owner important: editing an early renderer/controller may have no production effect. Full lists are in owners.json.

| System | Current relevant owner / source location | Contract and finding |
|---|---|---|
| Native simulation | core.js tick/actor, Playback265 pump/step | Fixed60Hz developer clock;1step=1tick,0.25x=15ticks per real second verified. Recorded navigation is telemetry, not rewind. |
| Reina combo | combat134.js:32-38; repair-view134.js:7 | Three native actions22/30/38frames; contacts10/17/22within each action;16 authored source poses. Keypose selection is discrete. No damage redesign required. |
| Marcus/Bruno attack art | enemy-view281.js:5-11; enemy-motion281.js | Eight whole-body punch intermediates, selected against actual contact times. Anti-air/grab actions delegate, so this layer does not certify their pose completeness. |
| Clean hit/stun | combat274.js:6-10; niko284.js; recording287.js | Actual damage reaction records; vulnerable attack cancellation; native AI/reassessment gates. First two Reina kicks apply33/38frames, not the provisional8-20range. |
| Ordinary Marcus reaction | marcus289-view.js:3-5; reaction-templates289.js | Original24-cell authored reaction/fall/get-up atlas. Current unarmed Marcus delegates here rather than using the generic290 mesh. |
| Shared enemy reaction | enemy-reactions290.js:2,6-12,20-26 | Native-clock mesh built from forced idle/act:null source. Bruno has no enforcer-specific profile, so joint anchors fall back to generic anatomy. See interruption proof and awkward deep-squat rise. |
| Ground registration | review-view294.js:3-6; game.js:99 | Floor-registers complete down/get-up body rasters; native grounded enemy height is0. Does not fix incorrect joint anatomy or pose handoff. |
| Movement/gait | bruno130.js config stride144; enemy-motion281.js:5 | Later281 layer returns90for enforcer and overwrites walkPhase. This overrides the documented144-unit Bruno stride. Root speed is separate and must not be tuned to hide the cadence mismatch. |
| Grapples | paired-motion.js:23,30-53; grapple-recovery119.js | Shared capture/release/landing and attacker-first recovery. Specialized pair renderers intentionally exclude generic reaction handling. No universal interpolation may take ownership mid-pair. |
| Reina German | reina123.js; kip-view169.js |90frame native pair, release43, impact61; later kip-up artwork66-90. The older ordinary bridge-rise note is superseded. Preserve kip-up and existing ownership. |
| Bruno Powerbomb | enemies210.js:57; paired-motion.js:23 | Actual enemy capture enters1.05s powerBomb, impact.70s. Different from Broxton's player Powerbomb136. Do not edit the wrong move. |
| Collision/plane | combat134.js box/hitPlayerAttack; audit135.js reinaContact; enemies210.js geometry/contact | Root plane and limb/segment geometry are separate. Existing26-depth checks remain; a video impression alone cannot establish a rejected-hit cause. Saito's exact rejection matrix is Gate9, not certified here. |
| AI/coordination | director148.js:3,25,35; combat274.js; enemy controllers209/210/212 | Normal budget3,max2commitments. One seeded mixed probe stayed within limits; this does not certify every encounter or strategic quality. |
| Runtime diagnostics | playback265.js:13 actor() | Confirmed misleading label: phase defaults to actionable for a stunned actor with no active action. animationFrame is explicitly null/GateC N/A. Runtime stun data is needed instead of trusting this label. |

All paths above are relative to `/workspace/sites/urban-fracture/.sites-checkout/dist/`; line/function references are captured against the checkpoint.

## Confirmed issues and classifications

**C1 - Interrupted pose is not preserved. Rendering / interpolation / missing pose metadata.** The shared290 source() sets act:null and walk:0, then caches that idle body by identity/weapon. The entry into recoil cannot retain the actual extended attack silhouette. A controlled native Bruno contact pose followed by a valid rear hit clears the action and immediately selects that neutral-source reaction. This is a presentation discontinuity, not proof that the hit failed. Simply capturing a different source is unsafe because the mesh joint anchors assume the current idle anatomy.

**C2 - Bruno's reaction/get-up anatomy is generic. Incorrect interpolation / missing character-specific keyposes.** No enforcer entry exists in290 profiles; fallback joints deform the source into a very wide squat during rise. Current frame160 shows the result. It is not a constant-scale increase: the shared actor scale remains unchanged. A natural support/kneel/rise requires authored heavy poses or validated pose-specific joint data.

**C3 - Bruno gait cadence conflict. Incorrect animation speed / later override.** The current native stride is90, while Bruno130 and the retained specification use144. Both change the same walk phase. The proposed repair is the presentation stride only, with identical world positions, speed, AI and combat trace. Not implemented in this audit.

**C4 - Actionability label is false while stunned. Diagnostics / invalid presentation-state mapping.** Both current isolated hit probes record phase='actionable' while stun>0. AI did not act during stun. A unified visual/state inspector must report actual locks and their owners; do not use that label to justify shortening hitstun.

**C5 - Cross-family transition handoff is unspecified. Missing intermediate poses / rendering ownership.** Reina has16kick poses, Marcus has authored recoil, Bruno's punch layer has8poses and generic reactions are mesh-based. Idle-to-walk, attack-to-idle, attack-to-hit and pair-to-flight do not share a pose-family handoff contract. This is not a request for a replacement combat state machine. Smooth crossfading would create ghost limbs; automatic morphing without per-pose anchors risks stretched anatomy/weapon detachment.

**C6 - One-tick timer convention differs from the metadata deadline. Timing/reporting.** The first hit assigns.55s at simulation frame10, then the same actor tick consumes one decrement. Stun first reads zero at frame42, while reaction.until corresponds to frame43. The interval contains33 tick exposures including contact. Native post-hit reassessment still prevents immediate offense. Record both conventions before proposing any timing change; no balance change is approved or applied here.

Suspected, not confirmed by this audit: input loss on hardware; phantom hits across all Saito moves; broken German hand contact for every enemy; all-level civilian navigation; universal clean-hit/block/armor audio distinctions. Those require the dedicated later-gate scenarios. Visible crowd overlap is not proof of a budget violation.

## Measured current behavior

Seed295,60Hz, same starting plane470. Three physical attack taps were queued only through the native playback input adapter.

| Measurement | Marcus | Bruno |
|---|---:|---:|
| Standing combo damage |7,8,10|7,8,10 outside armor|
| Damage event frames |10,39,75|10,39,75|
| Applied first/second stun |33f /38f|33f /38f|
| Grounded body baseline in sampled sequence |local y=-1|local y=-1|
| Actor scale through all360frames |1.347943842|1.6849298025|
| Standalone first-hit stun first zero |frame42|frame42|
| Next actual AI action |hook,frame63|frontKick,frame88|
| That action's observed stun |0|0|

First-hit probes use native AI after contact and reset only the pre-test cooldown to isolate recovery; action times are scenario measurements, not universal guarantees. The multi-hit recording intentionally suppresses enemy offense to expose the visual sequence.

All three vulnerable interruption probes (Marcus, Kevin, Bruno) canceled the old action and applied positive stun. The10-second three-enemy probe observed maximum1reserved commitment/cost2; it stayed under the configured2/3limits. This small result cannot establish pressure quality or claim that only one commitment is allowed.

## Gate 2 review decision

**Stop here as instructed.** The unresolved boundary is the pose-family/ownership contract for interrupted attacks, source-specific reactions and pair release. A universal interpolator implemented now could fix one view while distorting another or bypassing a specialized throw renderer. The current generic Bruno rig demonstrates that risk.

Recommended Gate2 scope after review:
1. Add one presentation-state resolver over native states, recording state owner, action ID, pose family, root, elevation, scale and ground anchor. It must not become a new combat controller.
2. Specify interruption entry poses and source-specific anchors for Reina/Marcus/Bruno. Use authored intermediate poses for large anatomical rotations; no full-body ghost blend or universal per-frame resizing.
3. Restore Bruno's approved144stride in the final phase owner, with world-motion trace equality.
4. Preserve all native attack/recovery/counter/grab timings; preserve33/38Reina stun and the German kip-up. Report any animation budget conflict rather than stretching the action.
5. Prove identical mechanics before/after, then review continuous idle/walk/run/stop/attack/recoil/fall/get-up and pair-release sequences at1x,0.25x and each simulation tick. Only then enter Gate3.

## QA and evidence status

Executed:81mechanical audit assertions;1200group budget assertions;2controlled interruption-render assertions; Playback265137existing assertions; Playback265-input14; retained Build29497mechanical assertions. All passed. Current renderer captures total720native ticks in two isolated six-second sequences. Current quarter-speed MP4s are time-expanded presentations of those exact60Hz captures, not independent new simulation runs. The separate fixed-clock probe verifies live0.25x behavior.

Inspected: supplied overview/detail contact sheets; current Marcus/Bruno combo/fall/get-up contact sheets; Bruno interruption and deep-squat rise renders. Source locations/override ownership recorded. No Gate2 before/after claim exists because there is no implementation in this audit.

Not executed: fresh full release profile, new all-roster reaction validation, all-move/level matrix, physical controller, human balance approval, approved screenshot comparison, after-change captures. Existing146-suite Build294 release remains historical evidence for that unchanged build, not a new295release claim. No full suite is necessary to claim an unchanged audit-only game, and none is falsely counted.

Files added: tools/continuity295/{capture,probe,group,interrupt-render}.cjs and reports295 evidence/report/CSV. Production files modified:none. Approved balance, art, weather, progression, controllers and screenshot baselines remain byte-identical.
