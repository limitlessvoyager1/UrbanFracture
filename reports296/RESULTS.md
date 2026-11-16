# Build296 verification

Scope: Bruno repairs and Gate2 continuity foundation, with Reina/Marcus/Bruno pilots. Gate3 has not started.

- Runtime continuity:30,272 assertions; exact interrupted-pose ownership, native recovery labels, phase handoff/stop expiration,1,440 captured actor ticks of mechanically identical combo/recovery behavior, archived fallback hash.
- Render checks:1,358 assertions; all24 Bruno poses, both facings, fixed opaque soles and no clipping; shared actual attack pose selector.
- Pinned-source equivalence:1,200 native ticks;450.54 unit movement envelope exercised and native group AI hook/knifeSlash selections identical. No damage/timing/aggression changes.
- Mechanical probe:81 assertions; first contact at frame 10,33-frame applied stun, first zero at frame 42; actual next AI Marcus at 63 / Bruno at 88, matching audit295.
- Playback:137 core/full-world assertions,14 keyboard/simulated-controller assertions. Physical pad untested.
- Full enemy raster roster:22,507 assertions,30 identities,2,520 pose samples. Initial pass was interrupted by resource pressure while another render task ran; completed identical-input samples were retained and remaining identities passed sequentially. Historical build290 trace equality is not fresh296 mechanical proof; the separate pinned-source296 comparisons above provide that evidence.
- Browser UI: build296 practice against Bruno at0.25x; paused234→235, exactly one frame, 3.900→3.917seconds. No game-controller hardware certification.

Full frozen release profile: **149 passed, 0 failed, 5 manual gates not executed**. Decision: **needs-review**, not stable certification. The runner returned exit2 for the outstanding review gates, with no failed or missing automated suites. Source remained unchanged during the run. See release-summary.json and release.log.

Source fingerprint: `94b093f54cb31b52fdd6dfec07550d21a6f3b3a5bb897f54df4d03128fc98a99`.

## Evidence

[Before/after Bruno stills](comparison/bruno-before-after.png) · [Interrupted punch sequence](after/current/bruno-withdrawal.png)

[Before1x](before/reina-enforcer-1x.mp4) · [After1x](after/current/reina-enforcer-1x.mp4) · [After0.25x](after/current/reina-enforcer-025x.mp4)

Marcus before/after and0.25x captures are adjacent. All runs use seed295 and360 native ticks, with AI disabled only for the isolated contact/fall/get-up captures. Native group AI was tested separately.

## Remaining limitations

New art and capture candidates still require owner artistic review; no automatic baseline approval. Whole-cast continuity, complex rotation/throw improvements, attack polish, contact effects, spacing, civilians and later gates remain outside this pass. No all-level or physical-controller certification. Approved damage/frame data/AI aggression remain unchanged.
