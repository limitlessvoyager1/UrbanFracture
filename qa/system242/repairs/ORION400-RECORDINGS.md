# Orion400 recording repairs — review candidate

Source base: 686309c3fbde98b377265bbf96cbcac1d183ce3a. User recordings: Screen Recording 2026-11-18 130739.mp4 (115.27s), Screen Recording 2026-11-18 135127.mp4 (15.80s). Candidate GitHub/playtest publication authorized on 2026-11-18. No merge or stable certification. Existing unrelated untracked work is retained.

## Authorized gameplay deltas
- Orion walk 135 → 144.45 (+7%); run remains 285.
- Combo total frames 21/24/29/63 → 19/21/25/55; retain hit frames 11/13/16/23, active windows 4/4/5/6 and damage 5/6/7/12. Early chained poses retain preceding recoil for a short handoff. Final punch adds electrical hit presentation and native launch.
- Blitz radius 135 → 185, damage 22 → 25; existing action clock, costs, native admission and 3-damage launched-body collateral retained.
- Beam reaches the facing viewport boundary (solid obstacles still occlude); actual accepted hits create burn-smoke receipts. Body art uses the same latched direction as the beam.
- Neutral Current has three finite bilateral fronts reaching halfway to each visible edge, one 17-damage native hit per target per action, and resisted/diminishing electrical stop.
- Electric Ascension uses one shared 190-unit lift (previously 100), with no independent victim bob. Existing 10+38 primary damage, costs, hit/release frames and mandatory recovery remain. The 260-unit by 78-unit elliptical slam reaches every eligible nearby enemy (no two-target cap), applying the retained 10 collateral damage and radial native launch. Protection, immunity, guard and plane admission remain native.

## Presentation repairs
- Connect the dedicated Orion effects to the existing foreground layer. Add fist arcs, skeleton cues, larger blast arcs, three current fronts and smoke. Reduced-motion cues remain steady.
- Knife throw uses authored ready/cock/windup/release/follow-through frames; release stays at .22s and the prop disappears from the hand after release.
- Preserve complete HD Downtown enemy bodies through free/step walking and Bruno/Kevin idle. Use all four authored HD gait frames based on resolved displacement; do not fabricate eight painted HD poses or advance simulation in rendering. Other specialist/held/fall owners retain native priority.
- Move the Neon Cell display pickup from display y343 to y300 inside the broken pane; collection and ledger coordinates remain native.
- No bitmap, character costume, artwork source or alternate-costume changes.

## Verification boundary
Current native tests cover both directions at 30/60/120Hz, damage deduplication, blast range/plane, latched beam, finite bilateral fronts, protection, Ascension shared lift/release/cleanup and unlimited nearby targets. Historical pre-400 source text is retained. The 387 exact-preservation comparison now explicitly compares the historical 387 fix against the pre-400 source; current contact retry/admission tests still exercise the live implementation. Old special expectations are updated only for authorized Blitz damage and screen-relative Current extent.

Controlled native captures are not browser/hardware evidence or owner art/balance approval. Keep preliminary failures and all remaining QA/manual/full-release holds visible. The earlier PR35 fingerprint portability issue is separate and not silently waived here.

## Publication holds retained
The prepublication shared-smoke run has 14 passing suites and one blocked Windows skipped-fixture result. The frozen Reina399 native-preservation guard fails because it requires the pre-400 source membership and bytes. Its failure is retained, not silently scoped away. Owner art/balance, physical controller, full release and portable-fingerprint holds remain open. Hosted source may contain newer independent work; apply reviewed repair hunks without replacing that work.
