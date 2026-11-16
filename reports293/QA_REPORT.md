# Casino combat and pool update — Build293

Recovery: `checkpoint-before-casino-ai293`, commit `816960070ec4bb55243741bc19615b222d5b8d7d` (published Build292). Restore that commit/saved version for build rollback; Developer Panel defaults are a separate operation.

## Implementation

- Security sizing uses the rendered Bruno reference:226px Bruno /248px Security at identical canonical idle conditions (~10% taller, raster rounding). The shared scale used by collision/grapple anchors and production rendering agrees. Ophelia and Jameson are reduced15% across their actor transforms, including the waiting couple, reactions and water poses. Their measured heights are206px and235px, versus242px/276px before.
- Security pursuit112 world units/sec (previous94), recovery positioning94 (previous65), decision interval.20s (previous.35). Each offensive commitment rolls a50% continuation decision. Continuing preserves all authored startup/active/recovery and Director reservations; stopping adds.65s of punishable opening. The existing one-two extension also uses the50% decision, retains its six-second extension cooldown and cancels after a missed opener. Guard-only actions do not get the offensive stop penalty.
- Every configured active strike frame retains damage-taking armor. Early startup and recovery remain vulnerable. Existing weapon armor bypass, synchronized-grab safety, offscreen restrictions and enemy commitment budgets remain.
- Ophelia opens with the electric baton combination. Her cycle advances on successful admission, so denied attempts do not skip attacks. Her dedicated boss controller owns action selection while native Director attack admission still applies. Pursuit rises88→96 and ordinary interattack cooldown multiplier becomes.90. Existing damage values and attack timelines remain.
- A second pool is placed behind the couple at the rear of the terrace. It uses existing approved pool-water texture with stone coping and bounded pixel ripples. It introduces no combat-lane collider. Separate floating positions avoid stacking both bodies. Water bodies have gentle bob/roll motion, then existing swim/climb poses; their scale now follows the actual actor scale.
- Pool victims cannot act or take damage while out of play. After the fall, floating lasts10s; swimming takes2.4s and climbing.9s. Both return on the native442 ground plane, with unchanged HP. Existing entry immunity, return cooldown, survivor rage and paired victory gates remain. HUD and inspector shortcuts now use the revised sequence.
- Grab198's shared breakout and reversal entry points reject held regular targets and heavies/bosses at or below40% HP. This covers both internal legacy calls and exported calls. Normal counter-held targets no longer trigger the old timed enemy escape. Player release, completed throws, defeat cleanup and third-party interruption remain valid. Heavy/boss contested-grab rules above40% remain.

## Evidence and verification

- New deterministic suite:198 mechanical assertions, including actual damage attempts on every Security active strike frame;50/50 threshold; pursuit; front/rear holds across eight ordinary archetypes; player release; heavy40% threshold; both bosses'10-second float/swim/climb; opening baton registration and actual production damage/electric shock.
- Existing Security216:all attacks at30/60/120Hz, manual counters, dodges, synchronized grabs, interruption recovery, offscreen returns, commitment budgets and seeded mixed encounters passed.
- Pool193:all12 attacks, five-hero counter/block interactions, autonomous paired AI, damage contacts, pin/throw cleanup, survivor rage and paired victory passed.
- Current15026-suite integration and Prison224 campaign/controller/environment aggregates passed. Stats266 passed after stale historical-body checks were reconciled.
- Rendered size assertions passed; screenshots include terrace and two float phases. Browser inspector confirmed float state,10-second countdown and subsequent swim state. Browser_Pool.jpg is actual browser evidence. These are review candidates, not owner-approved visual baselines.
- Syntax and Git whitespace checks passed.

The first broad run was blocked:140/142 passed, with an old Reina185 walk-speed assertion and historical unchanged-body hashes for files intentionally changed in Build292/current pool work. The speed fixture now reads the actual approved walkSpeed; edited files are explicitly excluded from the old comment-removal-only proof, preserving its other byte-identity assertions. No production speed was changed to satisfy these tests. Initial results are retained in initial-run.json. The fresh final run passed143/143 executed suites, failed0, with5 explicitly unexecuted review checks. Source inputs remained unchanged during the run. Its gate is needs-review, stable=false, pending those separate approvals. See release.log/final-release.json.

## Packaging and limits

No bitmap asset was resized, recompressed or replaced. Metadata/source whitespace compaction retains identical canonical JavaScript AST;3564 bytes saved. Readable originals are retained under source-archive/build293. Runtime balance changes are limited to those described above.

Physical DualSense testing, exhaustive all-moves certification, owner-approved screenshot comparisons, human art review and human balance approval are not claimed. The full release report identifies unexecuted checks. Automated success alone does not certify artistic approval or human combat balance.
