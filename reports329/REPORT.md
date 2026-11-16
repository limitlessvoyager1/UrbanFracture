# Build329 — Nightshade rear-grab forward launch

User approved the reviewed storyboard on 11 November 2026. Recoverable predecessor: 85ca1d12fcf27391357b650e489551b7d166aba4, tag checkpoint-before-nightshade329. Revert only this build's files to restore the previous throw; preserve later unrelated work.

## Implemented
- Existing rear-grab + forward + attack input retained, mirrored. Other three directional grapples unchanged.
- Twelve original grounded Nightshade poses, generated with built-in image generation from her existing design; full prompt recorded in art-source329/PROMPT.md. Uniform atlas scale, anatomical grip track and gradual eight-frame capture adjustment.
- Frame24 atomic release clears holder, forest lock and active native119 session. A native actor hook integrates independent low-arc velocity with 120Hz collision substeps, suppressing double integration by the legacy flight loop's bornAt guard.
- Hero action remains86 frames, with release-to55 follow-through and56–85 final recovery. Protection ends at release. Primary27 damage occurs once on actual terminal impact, previously fixed frame50. These reviewed timing changes are intentional.
- Swept body contact, native plane eligibility, at most3 distinct successful contacts, momentum loss. Nominal secondary damage15 regular /10 heavy /8 boss; native defenses can modify the applied result. Boss/armor reactions retain native rules. Resistant impacts stop the body. Solid props and locked arena/stage bounds stop flight.
- Native knockdown, landing, get-up and recovery protections. Hero interruption after release does not cancel the independent body; reset cleans it.
- Later identity renderer explicitly respects this move's paired/flight projection. Uses existing identity-specific fall art during independent flight. No enemy artwork replaced.
- Developer menu link: Nightshade — Rear Grab Forward Throw. Separate native practice tab, quarter speed, Marcus +3 Kevins, rear hold prepared. Existing exact frame-step/playback controls remain. Audit export includes actual release/velocity/elevation/contacts/state.

## Tests and evidence
- tests/nightshade329.cjs:3645 assertions, 30/60/120Hz, both facings,12poses, detach, damage once,3-contact cap, momentum, heavy/boss, props, wrong plane, interruption, reset.
- nightshade258:12568 assertions,12archetypes ×4moves, both facings/rates, locked arenas/recovery, no teleports.
- nightshade258-view:1574 assertions, atlas geometry; nightshade258-input:28 actual game.js keyboard/simulated standard/raw Sony/DSX assertions.
- gamepad and controller-recovery passed; Nightshade257,263,264 runtime/input passed; Nightshade276 runtime1017, playback265137 and practice2824147 assertions passed.
- One retained legacy nightshade276-input assertion (fresh physical tap retained) fails identically with the checkpoint move source restored in memory. It is not counted as passing and has not been masked or modified.
- Native simulation renders160 ticks and records real secondary collisions. Normal/half/quarter speed videos are derived from those same rendered simulation frames. These are native engine QA renders, not a live browser recording.
- Managed browser navigation to preview timed out. Physical hardware, every level obstacle variant and full campaign are not certified.

## Packaging / rollback
Unused prior vault8/9 shipping images moved to art-source329; their unused indices alias frame0 before preload. Other directional moves do not use these indices. New12-pose atlas replaces their shipping budget, original sources preserved. No generic game.js renaming/compaction shipped. Existing production source is unchanged outside the scoped throw/view/preset/cache edits.

## Remaining limits
Enemy in-flight presentation reuses original identity fall sequences rather than twelve newly authored enemy-specific throw sheets. The renderer and flight have been inspected, but final artistic preference requires player review. The preset's attached state is intentionally a testing convenience, not a campaign capture change. No claim of whole-game regression certification.

Final rendered inspection: scoped final identity renderer bypasses incompatible legacy re-projection for this move. Frame20 shows continuous controlled rotation; frame28 shows released body in independent flight; native fall poses progress through extension/impact. Final160-frame sequence inspected through these key frames and contact sheets. Body trajectories are simulation-driven. Quarter-speed output repeats rendered tick images and does not invent source frames.
