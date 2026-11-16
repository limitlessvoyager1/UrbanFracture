# Gate 3 — Attack animation polish / Build 297

Recovery checkpoint: `checkpoint-before-attack297`, approved source `e0e9fcfdf5298b7c117ca2cae5e0d6b3a003e5c9` (Build296).

This is the Gate3 presentation pass for Reina, ordinary Marcus, and ordinary Bruno. Gate4 hitstun tuning is not started. Native damage, startup, active windows, recovery, world movement, collision, armor rules, cooldowns and AI definitions are preserved.

## Confirmed presentation gaps and changes

| Existing behavior | Cause in source | Original implementation |
|---|---|---|
| Marcus hook and straight punches reused one punch family | `enemy-view281.js` selected `marcusPunch` for both | Separate authored straight and rotational-hook sequences, eight poses each |
| Marcus knife thrust/slash delegated to older art |281 only replaces Kevin's singular thrust; Marcus remained below that layer | Separate eight-pose Marcus thrust and diagonal slash; blade remains part of the authored hand/body image |
| Bruno hook reused the straight punch sequence |281 `brunoPunch` shared for hook/oneTwo | Distinct eight-pose hook with shoulder/hip rotation |
| Bruno uppercut had three main poses | `sprites.js:drawAntiAir` | Eight whole-body coil/rise/contact/follow-through/withdrawal poses, using native uppercut contact and recovery |
| Bruno grab approach used older reach/idle switches | `sprites.js:frameIndex`, bombGrab | Eight short-clinch anticipation/reach/whiff-recovery poses, revised after an extended-hand whiff was observed; successful capture delegates immediately to the native paired Powerbomb owner |
| Reina combo had16source poses across three kicks | `combat134.js` key selections and `repair-view134.js` |24whole-body poses: eight per existing kick, selected from actual native active intervals |
| Reina blitz relied on a few key bodies and duplicate motion trails | `sprites.js:drawBlitz` | One eight-pose circular axe-kick arc, clear takeoff/turn/descending contact/landing; no duplicate body trails |
| Neutral sword mixed source bodies; dash sword used older sparse transitions | `sprites.js:drawSpinCombat`, generic mixed attack path | Separate whole-body sword-spin and downward dash-slash sequences; no ghost crossfade; blade stays in the authored hand |
| Held knees/elbow/palm switched between sparse key bodies | `reina-grab-view279.js:index` | Authored knee chamber/contact/retraction plus elbow load/extension and opposite-hand crouching palm. Four native contacts and existing grip/root motion remain |
| Counter arming lacked a distinct preparation pose | Native armed counter window without an active move | Two bracing poses during the actual native Reina counter window; no timing or resource changes |

The exact native frame conventions are retained. For example Reina's standing actions remain22/30/38frames with damage7/8/10, and held strikes remain32/34/40/46frames with damage6/6/5/6. Actual damage received can include existing difficulty/defense modifiers; before/after tests compare observed events as well as configured definitions.

## Ownership and safety

`attack297.js` is a read-only presentation planner plus a cosmetic damage observer. Native `motionHits281`, active intervals and action clocks select poses. Missed-opener follow-through/retraction remains visible without shortening mandatory recovery. An interrupted vulnerable attack loses its native action/hitboxes immediately, while its authored body withdraws for at most six simulation frames before existing recoil. No physics or action state is kept alive for that visual handoff. The tornado kick retains the small airborne lift measured from its authored source-cell floor gaps, interpolated through existing native phases; logical plane and hitbox positions stay fixed. If interrupted, the sampled native action time drives a short visual settle instead of relying on a stale render marker.

`attack-view297.js` paints one whole body with one fixed import scale per source family. No per-pose size fitting, anatomy mesh or blended duplicate limbs. Reina's existing148/138family calibration is preserved. `reina291.js` only gains a prepared-palette registration hook, so already-blue new assets are not recolored a second time; existing artwork's palette function is unchanged.

Native counters, held victims, committed Powerbomb lifts/throws, German suplex, outer reap, synchronized grapple transforms, weapons inventory attacks, bosses and unrelated characters retain their current render owners. The held279 strike body is the explicit exception; its actual shared hold/action identity must still match. Full paired choreography and hand/target synchronization remain Gate6, rather than being replaced by a generic attack-body animation.

## Assets and provenance

128original poses in six new atlases. Only Urban Fracture's own character sources were used. Six new assets and their authored source PNGs are retained; no unrelated source art was compressed, replaced or resized. All new art remains a review candidate.

Reina's palette-only edit uses her original pre-edit alpha silhouettes during import, preserving geometry and preventing matte halos from joining adjacent sprites. Oversized new dash/slash sources receive one uniform family-wide nearest-neighbor import resample; individual poses are never resized independently. Source hashes, source/import dimensions, calibration and sizes are in `art-import.json`.

## Verification design

The final BEFORE captures come from an isolated worktree of the exact approved296commit, with the same capture script. Thirteen native scenarios use seed297, normal hero/enemy HP, fixed starting positions and native action admission. AI is disabled only to isolate the action sequence; the uppercut is admitted through native AI after a real jump and its existing reaction delay. The early inflated-HP test fixture was rejected and is not used in the final evidence.

Each scenario records180native ticks, both actors' positions, action clocks, HP, stun, knockdown, cooldown and scale, plus actual damage events. Thirteen cases therefore compare2,340simulation ticks. A separate pinned-source test compares600movement ticks and600native group-AI ticks including RNG. Rendered poses, palette, opaque soles, source bounds, both facings and diagnostic ownership receive separate pixel checks.

Normal-speed and0.25x clips use the same native ticks; the clock itself is verified separately by the existing Playback265 tests. Time-expanding a video is not presented as an independent simulation run. Full release and roster results are recorded in RESULTS.md only after execution.
