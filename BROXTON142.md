# Broxton recording audit — Build142

Checkpoint: checkpoint-before-broxton-audit142 / Build141.

Reviewed the supplied Uptown strip-mall recording using a five-second contact sheet across approximately80 seconds. It shows repeated grapples, strong-enemy pressure, knockdowns, fractional score strings and translucent overlapping poses. This is sampled visual review, not an input trace or a completed frame-by-frame attribution of every missed strike. No before/after human gameplay comparison is claimed.

## Confirmed fixes

- Score previously added fractional attack damage directly, exposing binary floating-point tails in the HUD. The award path now carries fractional credit forward and credits only whole points; rewards are preserved cumulatively, extra-life thresholds unchanged. Last raw award/credited integer/remainder are recorded. No duplicate kill-award defect was established.
- Several Broxton grapple/uppercut transitions used whole-sprite crossfades, producing two translucent bodies. Existing intermediate poses now display as opaque poses. This removes ghosting without new sprite scaling; additional bespoke in-between artwork remains a future visual refinement.
- Dash/spin/uppercut/aerial strikes now retain contact for their short explicit active intervals, using the existing directional/depth predicates and per-target hit set. A target entering during the visible active interval can connect; each target is damaged once. No blanket hitbox enlargement.
- F9 live diagnostics/export includes animation/frame/contact timing, grab session/victim, hero/target coordinates, recovery/down timer, integer score/last score event and enemy commitments/armor. Existing F8 active/hurtbox overlay is retained and now matches the high-resolution lakeside canvas transform.

## Existing systems verified and preserved

Football tackle and Powerbomb are inspected/retested rather than rebuilt. Tackle keeps four punches,26 damage, no special cost, no sequence immunity, Block/Dodge mounted cancellation and victim recovery after attacker+.25s. Powerbomb preserves63 primary/22.75 direct/10.5 shock, one secondary category per enemy. Shared grappling/recovery and strong-enemy armor/director settings remain. No HP/damage/difficulty nerf, new immunity or move redesign.

Tests: targeted integer-score accumulation, mirrored lanes and one-hit active contact; charge141 (two-second/Nova-auto behavior); tackle104 cases; Powerbomb104 cases. Existing combat, counters, armor/rear vulnerability, grip, recovery, Forest/Gunner, first-hit confirmation, German suplex, Nova DDT, scene controller and startup regression suites run against full142 chain. Legacy charge130/controller expectations still assume3-second release-only Nova and are superseded by charge141; do not report those obsolete assertions as passing.

## Remaining verification

The recording alone cannot establish intended controller inputs, exact unseen hitboxes or whether every damage stack was avoidable. Export F9 telemetry during the next playtest for precise event attribution. Physical controller playtests, all requested group compositions under human control, exhaustive frame-by-frame grab art review and matched before/after recordings remain unperformed. No claim that every possible grappling/footwork issue is resolved.
