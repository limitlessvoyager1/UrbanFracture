# Gate 3 — Attack animation polish

Build 297. Baseline: approved Build 296, commit `e0e9fcfdf5298b7c117ca2cae5e0d6b3a003e5c9`. Recoverable tag: `checkpoint-before-attack297`.

## Delivered

128 original whole-body attack poses for Reina, ordinary Marcus and ordinary Bruno. Distinct anticipation, contact, follow-through, withdrawal and guard poses replace the shared/sparse attack families described in [IMPLEMENTATION.md](IMPLEMENTATION.md). Reina retains her bright-blue dress, fixed anatomical scale and existing choreography. Her tucked turning kick now has a small authored visual lift, independent of logical ground position. Bruno's short-clinch approach was revised after visual review caught excessive reach; its entire forward silhouette now stays within the unchanged 68-unit capture-center range at his actual scale.

These changes preserve approved damage, native action duration, active windows, root displacement, combat-plane positions, armor, cooldowns and AI. Paired counter executions, successful Powerbomb lifts/throws and full grapple choreography retain their current native renderers for Gate 6. Gate 4 has not started.

## Evidence

- [Before/after overview](before-after.png)
- [Standing combo — normal speed](reina-combo-comparison-1x.mp4)
- [Same simulation frames — 0.25× presentation](reina-combo-comparison-025x.mp4)
- [Actual developer-panel frame-step capture](browser-proof.jpg): paused 0.25× practice, native attack input from idle, advance ten simulation frames; displayed frame10/time0.167s and new kick body. The out-of-range attack correctly caused no damage.
- [Counter preparation](counter-readiness.png)
- [Final Bruno grab approach](after/bruno-grab-27.png)
- [Exact damage-contact frames](CONTACTS.md)
- Thirteen complete before/after action recordings, native-tick JSON traces and every-third-frame images are in `before/` and `after/`. Individual native ticks remain available in JSON; the videos are 60 FPS.

The BEFORE captures were generated from a separate worktree of the exact approved commit, with the same fixture script and ordinary HP. Early inflated-HP fixtures were discarded. The slow clip is a time-expanded copy of the same simulation ticks, not a second independent slow-simulation run.

## Tests

Final machine-readable results are in `runtime-validation.json`, `view-validation.json`, `native-equivalence.json` and `release-validation.json`.

- 13 native actions, 2,340 before/after ticks: identical damage events, HP, positions, facing, action clocks, stun, down state, cooldown and scale.
- 1,200 additional pinned-source movement/group-AI ticks: native behavior and RNG unchanged.
- 128 authored bodies, both facings: complete visible silhouettes, opaque soles, fixed family scale, palette, actual render ownership, interruption withdrawal, counter-ready admission and native-time visual-lift checks.
- Full 30-identity reaction roster: 2,520 mirrored rendered samples, 22,507 assertions. This checks the shared reaction system; it does not imply every enemy gained new attack art. The later Bruno grab-row replacement does not participate in this recoil-only harness. Its fresh visual validation is included separately.
- Frozen full release results are recorded in `release-validation.json`. Manual art approval, broad visual review and physical controller certification remain separate from automated passes.

## Files and remaining limits

Simulation/presentation: `dist/attack297.js`, `dist/attack-view297.js`, `dist/attack297-data.js`, six `dist/assets/sprites/attack297-*.webp` atlases. Integration: `dist/index.html`, the palette-registration export in `dist/reina291.js`, and the capture render loader. Reproducible import/capture/equivalence tools, original art sources, tests and QA registry entries accompany the change.

No reference-game assets were used. Original art remains a playtest candidate, not owner-approved final art. Full paired grapples, whole-cast attack redesign, Gate 4 hit-reaction/hitstun work and later gates are outside this delivery. A full reference-video timestamp reanalysis is not claimed by this attack-polish pass; its source-level findings and actual current/baseline recordings are provided instead.

Final frozen release: **152 automated suites passed, 0 failed; 5 manual gates remain unexecuted.** Source did not change during testing. Gate status is `needs-review`, not stable/artistic certification. Final source fingerprint: `6db1a622f55d4c576c57114172d4f26bdc9e3cb69fbb4db234f6f0d2eaf652ca`. The final targeted runtime suite passed 2,590 assertions; renderer suite passed 1,324.
