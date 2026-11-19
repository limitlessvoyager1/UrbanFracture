# Nova Showstopper — Assignment 2 local QA candidate

Owner authorized only activation, heel taunt, aura, timers and HUD, with exactly50 actual energy spent even while Tacos is active. Stop for QA. No merge or deployment. Base GitHub source: b922a96cae5567429387cc2a3874297c9a42add9. Assignment1 audit and raw source comparisons remain in the external Nova-Showstopper-Assignment1 output folder.

## Runtime contract

Nova registers with the existing UniqueAction251 dispatcher. Native R2/F pressed edges enter the existing shared admission path. Weapons248.free plus additional cinematic/transition/traversal checks reject hitstun, shock, recovery, blocking, jumping, knockdowns and paired states. Failed admission spends nothing. Successful admission creates a .9s vulnerable planted taunt, immediately starts10s active and40s cooldown deadlines, and debits50 through Energy316.change with a specific intrinsic reason. There is no HP fallback or Tacos/free-special exemption. Repeated calls during active/cooldown are rejected.

Simulation time owns both deadlines and subtitle time. Pause stops simulation; no render/wall-clock timer advances gameplay. Death, reset, time rewind and hero replacement clear owned active state; testing-mode immediate life restoration is handled before the underlying tick. Taunt cannot be voluntarily canceled; actual damage may interrupt it under the existing Hype/defense rules. Interruption does not refund an accepted activation. No new invulnerability/armor is added.

Hype's existing charge path, damage/defense multipliers, speed, heal, hold protections and clocks are unchanged. Showstopper state has no outgoing/incoming damage hooks, grab eligibility exceptions, knockback, wake-up or AI modifications. Those are later assignments. HUD reports STREAK0 and an unavailable throw bonus (dash), rather than presenting an unimplemented multiplier or internal assignment labels. Initial aura is cosmetic: dark magenta contour, violet accents, black wisps, star glints, brief spotlight, faster last-two-second pulse and .35s visual fade. Reduced motion reduces movement/particles; maximumfive procedural wisps, no per-frame particle-array growth.

## Visual and dialogue contract

Eight authored poses use one common import scale, native alpha pixels and per-cell planted sole anchors. Current Nova costume/reference is retained, no existing asset is overwritten. Final dimensions/artistic continuity still require human approval. View-only code cannot change action clocks or native state.

Corrected compact status panel occupies logical rectangle[145,69,152,33], beneath the life/energy meters. Nova's original reserve renderer is translated235 pixels to[308,69,196,34]; all other heroes retain their existing reserve position. FeastFleet's icon/duration space remains atx74–143 and Hype atx620; target HUD begins aty109. Taunt subtitles use a temporary centered strip at413–441, above existing bottom hints/dialogue. Main page provides a Nova dialogue disclosure with subtitle toggle and volume slider; preferences persist separately. System voice follows Sound and selected volume. A paused, muted or queue-blocked first delivery remains pending until eligible or its simulation-clock subtitle deadline expires. Delivery is marked only after speak succeeds; a started utterance canceled by pause/mute is not replayed. Ownership tokens protect against stale callbacks and state-scoped receipts survive same-actor reset safely. Browser voice availability/quality and audible playback remain manual gates.

## QA boundary

New runtime and renderer suites are registered as critical initial/release checks; new feature remains partial and registry remains pilot. Source-specific asset/content and ownership registration are proposals requiring review, not artistic certification. Both index and Downtown entrypoints load the new native/data/view modules. Frozen preservation evidence, tests, old reports and other source/art remain intact.

No full Showstopper acceptance, game certification, physical controller, approved performance target/baseline, owner art/balance or gameplay recording is implied by the targeted tests. See reports435/REPORT.md and the external source-bound run logs for final results and omissions. Assignment3 and later must not be implemented before their approvals.
