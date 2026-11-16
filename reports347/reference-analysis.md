# Build347 — observed vault reference

Analysis only. No engine/art files changed. Proprietary game frames are used solely to inspect choreography; none are game assets.

## Inputs inspected

- `Screen Recording 2026-11-11 113509(2).mp4`:6.533s,1320×764,30fps. This is the external throwing reference (not Urban Fracture). Inspected each displayed source frame across approximately2.033–3.533s, using a timestamped contact sheet.
- `Nightshade346-Native-Frames-0.5x.mp4`:65.017s,1344×536,60fps. Build346 inspection capture. Its vault section starts near11.2s; its displayed “native simulation frame” is the useful action index, since this file is half-speed playback.

Timestamps below are source-video PTS. Several source frames repeat the same pose. This recording cannot establish the original game's startup, active frames, recovery, hitstun, input rules, or internal attachment implementation.

## External reference: observable order

| Source timestamp | Observable pose / paired relationship |
|---|---|
|2.033–2.067s|Both characters upright before capture. Actor starts left, facing right; victim is right, facing left toward the actor's starting side.|
|2.100–2.133s|Actor steps into contact and places hands at victim's upper chest/neck/shoulder area. Victim leans back slightly but feet remain planted.|
|2.167–2.200s|Actor leaves the ground, body approximately horizontal to the left/above victim. Arms remain visibly connected to the upper-body capture. Victim stays upright and nearly fixed in place.|
|2.233–2.333s|Actor rises above the victim and begins rotating over the head/shoulder line. Victim remains standing, with the upper-body lean/arm position acknowledging the contact.|
|2.367–2.467s|Actor is inverted over the victim; legs pass to the far/right side. Victim still stands on the original ground point. The victim is not already lying, tumbling or flying.|
|2.500–2.533s|Actor clears the victim's right side and descends. The hand/upper-body connection persists. Victim remains upright, leaning with the pull.|
|2.567–2.633s|Actor reaches the far side at ground level, pivots/lowers into the throw lever, arms extended back toward the victim. Victim is still substantially upright; this is a pull preparation, not an earlier independent fall.|
|2.667–2.733s|Actor's downward/forward pull finally lifts the victim. Definite victim foot departure is visible by2.700s. Victim starts rotating and traveling to the right, in the direction the actor vaulted.|
|2.767–2.800s|Release occurs in this interval:2.767 still has the final extended lever pose; by2.800 the actor has dropped low/prone and a clear gap separates the airborne victim.|
|2.833–3.167s|Victim follows independent rightward flight and rotates through inverted/backward-falling orientations. Actor remains low on the floor; the actor does not stand immediately while still posing a fake held target.|
|Approximately3.200–3.267s|Victim reaches the far-right ground area. Some of the body is at the edge of the recorded image, so precise first body-contact point is not fully visible. Actor is still in low recovery.|
|3.367–3.533s|Actor rises from low recovery into standing guard. Victim remains down at the right side.|

## Critical choreography anchors for original Nightshade implementation

1. Hold the victim upright/braced throughout the hero's initial shoulder plant and overhead vault. The hero vaults around a stable victim, rather than both actors making unrelated airborne motions.
2. Preserve the visual hand/shoulder relationship during ascent, inversion, far-side descent and the final pull. A shared clock alone does not prove the hands and body are attached.
3. Start the victim's lift only after Nightshade clears to the far side and performs the final lever/drop. Then release into a single independent trajectory; do not show a horizontal/prone victim before that pull.
4. After release, keep Nightshade in the appropriate low landing/recovery sequence while the victim continues along the throw path. The victim's actual world coordinates/elevation must drive rendering and collision.
5. Use the original game art/poses and preserve approved mechanical windows. Reference proportions/assets/audio must not be copied. The observed contact→release interval is roughly0.67–0.70s, but this is a visual observation, not a requirement to replace Urban Fracture's frame data.
6. Secondary victim collisions are not demonstrated in the external clip. They must be tested in Urban Fracture with enemies placed on the actual flight path; do not claim the reference proves a collateral rule.

## Confirmed Build346 comparison

In the supplied346 capture, the victim changes through bent/lifted/horizontal/near-ground images while Nightshade is still in her initial overhead vault. It then returns to a more upright/tucked image near the final pull and is launched. The actor and victim therefore read as two separate motions rather than a stable upright anchor followed by a shared lever and release. This is visually confirmed; exact internal causes must be established by source inspection.

The346 capture contains no visible drone in the command demonstrations. A hero pressing the wrist button proves only the hero pose; it does not establish visible drone presence or that a projectile/effect was rendered. The capture alone cannot prove whether drone mechanics are absent or only their render pass is omitted.

## Evidence files (internal inspection)

`reports347/reference347/throw-all.jpg` contains every displayed30fps frame in the selected interval. `reports347/reference347/timed.jpg` includes source PTS labels. These are analysis-only extracts from the user-supplied video and must not be imported as Urban Fracture sprite artwork.
