# Gate 10 — civilian movement and scale

Baseline:5697c3a9f49e4382a90ab4d384ca73ec04210f54. Recovery checkpoint:checkpoint-before-civilians305.

## Changes

One shared background controller now owns simulation-time movement and distance-driven gait for subway, Fairways, mall and Uptown civilians. Fleeing actors depart continuously instead of wrapping across the level; blocked paths stop and turn safely. Room-return state stays in the native mall session, and reduced motion freezes both roots and gait.

Source-root placement, fixed family scale and ground tracks are consistent. Subway columns occlude people behind them. Fairways decorative gangs and civilians interleave by actual ground position. Native standing poses replace stopped running poses. Confirmed mall chair crossings are prevented; the controller also respects any live native kiosk footprint intersecting the path (current authored kiosk placement already clears that path). Destroyed kiosks release their footprints.

Hero/enemy size, damage, move timing, combat AI, world settings, controller mappings and progression code remain unchanged. Original source artwork is retained.

## Verification

Final fresh release: **173/173 automated suites passed**, zero failed, five manual checks not executed. Source remained unchanged during the run. QA correctly retains `needs-review`, not a stable-build certificate. Earlier interrupted/historical runs are not substituted for this result.

Tested production fingerprint: `eb8d6e4128bb1219f80f1a09d3729355a9488b20073eb8debc0f007c6abd5229`. Native view suite: **266 checks**, across seven bounded subprocesses. See [release validation](release-validation.json) and [streamed log](release-run.log).

Runtime matrix:1,618,881 assertions across66 section/rate trials, plus native source/RNG equivalence and obstacle/room/pause checks. Native-render checks cover complete source crops, opaque bodies, fixed family scale, ground/depth tracks, camera alignment, reduced motion and actual mixed-group draw order. The former gang/crowd order and a one-pixel shifted body are real negative fixtures.

All1,440raw recorded frames match fresh native simulation replays. Each of four scenarios contains180before and180after frames at60Hz. The recordings use actual sprites/backgrounds over controlled practice conditions, with no audio.

## Evidence

**Left is the prior build; right is Gate10.**

- [Normal speed](before-after-1x.mp4)
- [Half speed](before-after-05x.mp4)
- [Quarter speed](before-after-025x.mp4)
- [Subway frame](after/subway-60.png)
- [Fairways frame](after/fairways-60.png)
- [Mall frame](after/mall-60.png)
- [Uptown frame](after/uptown-60.png)
- [Audit](AUDIT.md)
- [Implementation](IMPLEMENTATION.md)
- [Recovery and interrupted-run record](RECOVERY.md)

Before the workspace reset, the real browser preview loaded the subway and Developer Menu/Save&Close; paused playback advanced0→1→6→16frames. That playback counter is relative to enable time. Final-source recordings and runtime checks are newly regenerated. Physical hardware was not tested.

## Limits

Retained two-pose families remain two-pose; no intermediate artwork, ghost crossfade, morphing or per-frame resizing was introduced. Baked-in people, distant spectators, dedicated workers and train seating retain their native owners. This is not an all-NPC artistic certification.

The native Canvas adapter makes pixel writes ignore transforms, matching browser semantics; its backend discrepancy is not described as a browser opacity defect. Camera comparisons use the documented small antialiased-edge envelope and reject actual shifted-body errors. No screenshot baseline was automatically approved.

Five existing manual acceptance items remain separate: approved screenshots, artistic review, all-move coverage, physical DualSense, and human balance. No stable-build or whole-game certification is claimed. Gate11/Gate12 have not started.
