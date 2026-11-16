# Gate 9 — confirmed combat-plane and registration findings

Baseline: `2d8f4e3b154d769bac2ced871f66832563528b2d`; recovery checkpoint `checkpoint-before-plane304`. No production code changed during this audit.

## Confirmed defects

1. **A successfully countered hero attack can hit again.** Full production order: Saito's native ready state intercepts Reina's physical combo at frame 10, clears her action and starts `martialPunchCounter212`. The same tick subsequently invokes a stale `hitPlayerAttack` callback. It still reaches `Combat134` and damages Saito for 7, cancelling the counter. `counter-trace.json` records both calls through the actual wrapper chain: Martial212 returns false without damage on the first call and starts the counter; the next call enters with the hero action already absent and removes Saito's HP. Gate298 invalidates interrupted enemy melee, but the equivalent hero action-owner check is absent. This is a confirmed callback/state ownership defect, not insufficient hitstun or an armor issue.
2. **Native martial defenses misidentify current moves.** `Martial212.classify` falls through to the legacy generic combo rule, treating Reina's three-kick combo as punches. Niko's native action is named `niko185`, so his registered combo returns null. In addition, Niko's action uses `hitFrame185` for real contact and sentinel `hitAt=999`; martial defense timing reads the sentinel. Classification and timing must come from implemented moves, preserving the existing reaction delay and counter window.
3. **Bank-scene weapon geometry omits the draw transform.** The production fighter renderer uses the native 1.12 multiplier in zone11. Weapon contact sampling and target weapon hurtboxes in Weapons248 use only `Forest125.scale`, omitting that multiplier. Other shared body geometry already accounts for zone11. The result is a reproducible 12% relative weapon endpoint/hurtbox conversion discrepancy in that scene, not authorization to increase reach definitions globally.
4. **Existing negative-hit diagnostics are ambiguous.** Audit135 often records 'range / facing / lane or interception' and, after the cancelled hero action above, calls a stale melee callback 'projectile / detached event'. Gate9 must record actual evaluated eligibility/geometry and explicit stale-owner rejection rather than guessing a cause from unchanged HP.

5. **Reina's active collision segments still use older pose coordinates.** The third kick switches to a second old segment at action frame25 while Attack297 holds the same currently authored active pose20 through the native contact window. The active source foot and shin were inspected in `source-contacts.png` and the corrected geometry is tested against actual opaque source pixels. New source-space points use the existing family calibration, canonical148/138 import factor, actor scale, bank multiplier and second-kick visual lift. Configured reach and active/startup/recovery windows remain native. Startup/recovery segments in the inspection sheets are explicitly inactive references, not active hitboxes.
6. **Niko and carried weapons can contact entry-protected targets.** Niko's melee candidate filter omits entry/entering/liftEntry, and weapon candidates cover only part of that set. Native isolated Niko contact removes3HP for each entrance flag before correction; all three reject after correction. Existing wake/hit invulnerability continues to reject. This repairs target eligibility without adding new recovery or armor.

## Verified boundaries / not classified as defects

The baseline distance/depth grid uses actual native attacks, both facings and fresh seeded fixtures (`baseline-grid.json`). Reina rejects depth27 while allowing her approved depth26 boundary. Niko rejects depth24 and beyond under his existing strict24 rule. Their existing lane widths differ deliberately; this audit does not authorize unifying them or auto-snapping an airborne hero to an enemy's plane.

Front Saito guards chip normally (Reina2, Niko1 in these fixtures), rear attacks and recovery hits land cleanly, and wake protection rejects damage (`baseline-defenses.json`). These are not misses or armor defects. Ordinary health values are increased only in isolated test fixtures to prevent premature scenario termination; production damage/HP are untouched.

The actual renderer was inspected using registered pose families and native clocks (`baseline-geometry.jpg`). The first isolated pose harness incorrectly requested an unconfirmed later combo and was rejected by the legitimate ComboConfirm129 gate; it was corrected to mark the pose-inspection setup confirmed and assert the resulting combo index. This is pose inspection, not a claim of a physically earned combo. Actual input-driven full combo tests remain separate. Startup strike-segment overlays are not active hitboxes merely because a line is drawn; active-frame timing remains native.

## Correction scope and verification plan

- Reject stale hero melee callbacks after interruption/counter capture, including later targets in the same invocation. Preserve independent released projectiles and legitimate synchronized/held owners.
- Classify current Reina/Niko normals using actual move metadata and use actual contact time for Niko. Preserve reaction delay, counter timing, damage, cooldowns and native guard/armor rules.
- Apply the existing bank draw multiplier to sampled weapon endpoints and weapon hurtboxes only; preserve profiles, durability, strike timing and non-bank results.
- Expose bounded, actual candidate evaluations/outcomes to existing diagnostics, including range, depth, facing, protections, geometry, block/counter and cancelled action ownership.
- Test Reina/Niko versus Saito at 30/60/120Hz, both facings, complete combos, guard/counter/recovery/air/grab/weapon cases; include Marcus/Bruno/other heroes for shared regression coverage. Inspect normal-speed, half-speed, quarter-speed and individual-frame evidence. Retain native 3-point/two-commitment Director rules and all Gate6–8 ownership guarantees.

Gate10 civilians and Gate11 general diagnostic expansion are not included. Physical DualSense, owner art approval and whole-game human balance remain manual checks.

## Supplemental runtime findings

7. At nominal action frame15, accumulated floating-point time can remain infinitesimally below15 while the existing Audit135 phase correctly reports recovery. A newly entering target could still take7 damage. Hit admission now uses that existing phase, preserving all approved windows.
8. Martial target elevation uses an old90-unit/.72-second jump model, while the renderer uses the current hero-specific apex/.68-second model and other native elevation states. Weapons omit that elevation. Both now read the exact renderer height; logical combat-plane depth and jump motion remain unchanged.

The initial full regression run found a close-range Reina269 miss caused by a shin-only candidate. It was stopped (exit130), retained in initial-reina269-failure.log, and corrected with full thigh/knee/foot contact spans. The final fresh release run supersedes it; no test requirement was waived.

Additional native martial pose images show abstract configured strike lines offset from visible limbs. This remains a geometry limitation requiring outcome-based investigation, not proof of a newly diagnosed false hit or authorization for a global range change.
