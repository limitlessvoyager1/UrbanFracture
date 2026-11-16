# Nightshade foundation repair · Playtest252

Checkpoint: `checkpoint-before-nightshade-repair252` at `0c130207890c31a93078984c0685ca49ff4d415a` (Playtest251). This repairs Gate1; Gates2–3 have not begun.

## Confirmed causes and changes

The supplied25.97-second recording was sampled for review. The previous sprite atlas, importer, production renderer and native input paths were audited against those complaints.

| Report | Confirmed cause | Repair |
|---|---|---|
| Hopping run | Four disparate running silhouettes; two raised8px at the feet | Eight low-bounce running frames, no alternating foot offsets, measured sole/waist roots |
| Injured/uneven walk | Four asymmetric poses, coarse pose changes and mismatched cadence | Eight alternating walking poses; distance-based150logical-unit walk cycle and185run cycle |
| Stray get-up pixels | Cell boundaries and unfiltered alpha included detached neighboring/edge pixels | New three-stage recovery art; largest connected body per authored cell; expanded prone/elbow cells to preserve complete silhouettes |
| Rough sprite |251 importer reduced art to150pixels and gameplay enlarged it again | Retain native335–416px-tall source frames, drawn at one fixed uniform scale per atlas; no downsample/re-enlarge stage |
| Too tall |150logical-pixel Nightshade versus roughly126–129 for rendered Marcus/Kevin |123logical-pixel Nightshade standing; retained Marcus/Kevin now approximately2.6–4.8% taller |
| R2 appears inactive | Gate1 accepted the event only in diagnostics; no visible confirmation | VisibleR2 received/state-lock cue in ordinary HUD and inspector; heldR2 still produces one edge, not auto-fire or running |
| Other combat buttons appear inactive | They are intentionally unavailable at Gate1 | Explicit per-button “later combat gate” feedback; no borrowedReina attacks or premature full moveset |

HP110, defense100, movement speeds, jumping/collision, AI, arena controllers, grab rules, weapons/counters for existing heroes and environment systems remain unchanged. Visual gait advances from actual resolved movement and freezes at rest. Physical movement is still the native controller's responsibility.

`nightshade251.html` now includes same-plane Marcus/Kevin comparison actors, repeatable native walk/run cycles and1/10-frame stepping, plus controller diagnostics. Comparison actors are developer-only background probes, not a second enemy AI controller.

## Art and storage

New source assets are in `art-source252/walk.png`, `run.png`, `foundation.png`; the approved identity remains `art-source251/approved-reference.png`. These were generated with the built-in image tool from the supplied character reference and previous atlas, then imported with deterministic cell/connected-alpha extraction. Requests specified clean detailed arcade silhouettes, consistent teal/ivory/gold costume and anatomy,8 symmetric walking phases,8 restrained running phases, and12 foundation poses. No detached pixels, shadows, captions, extra guns or motion trails were requested. Original source resolution is retained at runtime. Art remains review-required rather than automatically approved.

The20 superseded251 runtime frames and metadata are preserved in `art-source252/retired251/`; `asset-migration.json` documents hashes and replacements. The sole active renderer consumes252 metadata. No competing Nightshade animation controller was added.

To fit the existing256MiB expanded hosting limit without reducing visible art quality,9 existing lossless WebP assets were repacked, saving1,490,774bytes. `lossless-repack.json` proves identical dimensions, alpha and every visibleRGBA pixel; only hiddenRGB beneath fully transparent pixels may differ. Existing artwork paths, proportions and anchors are unchanged. Inventory updates are hash-only storage evidence.

## Verification

- `node tests/nightshade252.cjs`: resolved-distance gait at30/60/120Hz; stationary phase; visible accepted/lockedR2 and unavailable-button feedback; no borrowed attacks.
- `node tests/nightshade252-view.cjs`: all8 walking/run phases, fixed aspect/sole contact,3get-up stages, landing priority, visible feedback expiration, other-hero renderer/HUD delegation.
- `python tests/nightshade252-art.py`:28 distinct connected silhouettes; a deliberately bad disconnected-pixel fixture is rejected; fixed atlas scales; native resolution; no run-foot offsets; gait-height variation under2logical pixels; modest Marcus/Kevin height advantage.
- Existing251 foundation and actual production keyboard/standardDualSense/rawSony/DSX input-pump regressions remain applicable.251 art/view test entrypoints explicitly delegate to the repaired252 contract.
- Browser: native renderer comparison, walk/run stepping, clean knee get-up and completed return to idle, acceptedUnique feedback. Physical controller behavior and artistic acceptance are not certified by simulated input.
- Frozen QA242 initial/release results are saved separately after completion. Do not count manual gates as passes.

## Remaining scope

R2 now visibly acknowledges input but does not fire: the handgun, bullet HUD and firing rules are Gate2. Ammunition placement/drops/balancing are Gate3. Standard combat, grabs, specials and counters belong to their later specified gates. PhysicalDualSense testing, human animation/art acceptance, approved screenshot baselines and Normal balance remain manual. This is a playtest repair, not a stable/full-character certification.

Rollback is the retained Playtest251 saved version or isolated checkout of the checkpoint, without discarding later unrelated work.
