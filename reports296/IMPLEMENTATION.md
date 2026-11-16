# Build296 — Bruno and Gate2 continuity pilots

Checkpoint: `checkpoint-before-continuity296`, source a33670a76f4b5b1a0f42a34f63b54b9ee863e459. Live predecessor294;295 was audit-only. Scope: ordinary unarmed Bruno, Marcus, Reina presentation handoffs. Stop before Gate3; this is not a full-cast animation redesign.

## Confirmed defects and correction

| Before | Confirmed cause | Correction | Evidence |
|---|---|---|---|
| Bruno gait cycles too quickly |281 later stride90 overrode130stride144 |Restore144; root speed unchanged |native-equivalence.json; continuity296 tests |
| Generic Bruno floor/rise became a broad squat |290has no enforcer-specific joint profile |Original 24 whole-body poses, fixed source scale, source sole anchors |after/current/enforcer140/160; view-validation.json |
| Interrupted extended punch jumps to idle-source recoil |290source caches act:null body |Retain actual interrupted pose, authored withdrawal5/6/7 within 6 native frames, then native-clock recoil |bruno-interruption.png; interrupt-render.json |
| Walk/run phase restarts and stopping snaps |Independent animation phases |Preserve phase at run/walk handoff; bounded 6-frame finish to contact, render-only copies |continuity296.js; equivalence test |
| Stunned actor marked actionable |Playback fallback used absence of action only |Resolve native stun/down/recovery/pair owner and label actual state |mechanical-audit.json; browser frame235 |

## Source ownership

`continuity296.js` observes native damage/ticks and writes cosmetic metadata. It does not mutate action clocks, hitboxes, world coordinates, damage or AI. `continuity-view296.js` uses whole authored poses; no ghost crossfade, anatomy morph or per-pose body rescaling. `enemy-view281.js` shares its pure pose selector with interrupted-pose capture, including retraction between hits. `enemy-motion281.js` restores Bruno's original stride. `playback265.js` exposes real current locks; no simulated rewind has been added.

Native airborne, armor, weapon, boss and synchronized-grapple render owners remain authoritative. Review294 still registers down/get-up bodies to the logical floor. Marcus retains his existing original 24-pose atlas. Reina retains her existing art/palette/approved scale. Whole-cast and complex choreography transitions remain later-gate work.

## Asset preservation

New Bruno source and fixed-scale import metadata are archived in source-archive/build296. The obsolete redundant enforcer-walk-v1 fallback is archived byte-identically (see asset-migration.json); its reference now uses the unchanged native Bruno130gait already active in gameplay. This reclaims hosting capacity without recompressing unrelated art.

## Mechanical verification contract

Compare current versus pinned approved source across 600 movement ticks and 600 native group-AI ticks, plus 1,440 actor ticks in the exact prior Reina/Marcus and Reina/Bruno combo captures. Compare actual positions, HP, action clocks, stun, down/flight, protection, damage events, RNG and effects. Cosmetic pose hashes intentionally differ.

Normal and quarter-speed evidence uses identical 360 native ticks; 0.25x inspection videos expand those same ticks to 24 seconds. Playback clock is independently tested, including one-frame stepping, rather than inferred from video speed. Browser UI independently showed paused frame234→235 and3.900→3.917simulationseconds at0.25x.

## Limits

New original art remains a review candidate. No claim of physical-controller latency, all-level/civilian coverage, whole-cast continuity, later-gate choreography, or artistic approval. No damage, frame data, aggression or hitstun tuning. Gate3 has not started.
