# Build 147: Reina repair and Deep Woods

Checkpoint: `checkpoint-before-reina-repair147` at Build146 / 95bc324bc1e0a72bc5ef0935b1e320e1232eeace.

## Confirmed defects
- Charge view drew a hip-anchored atlas at a ground anchor. Feet extended below the logical floor; its .5 import scale also exceeded established 138.3-unit standing reference. Neither was actual combat-plane movement.
- Charge pose fully replaced locomotion, leaving stationary legs while the root walked.
- Bruno's damage-time random guard could activate during an attack's vulnerable recovery. The base anti-air completion reset its cooldown to two seconds.
- Uptown reused zone IDs4/5; core zone-clear logic called Downtown's automatic Velvet Room door walk using Downtown coordinates. This took control away and walked the hero left. The door entry now rejects all Uptown states at the source.
- Deep Woods used one 1086x362 atlas strip enlarged to2400x540; its canvas used only960x540 backing. It had a separate crude procedural playable bridge.

## Changes
- Preserve the latest user-confirmed 2s charge; ignore the attachment's stale3s references. Reina charge walk60%; other hero speeds unchanged. Displacement-driven eight-step lower-body gait below a focused upper-body charge stance. Fixed atlas import scale across every Tornado frame; measured sole anchor during ground phases. Root/lane stays independent from visual height. Existing choreography,40 damage, counters, costs and recovery remain.
- Bruno Normal three-hit timing20/34.8/50.4 frames, final active end59 then~27 recovery frames. Counter hook20 startup/27 recovery. Grabs24 startup,6 active,36 missed recovery. Anti-air3s cooldown after completion; invalid-state gate retained. Two completed commitments lead to.8s moving tactical reset. Same damage and health/60% grab eligibility. Core random damage-time guard requires idle and no recovery; attack-specific armor classifier unchanged.
- Flint retains existing damage, weapons, variety, counter rules and director. Minimum36-frame final active-to-end recovery; missed heavy adds8 frames to the existing longer recovery. Facing latched for the string. Show follow-through before weapon-ready stance; retain existing post-string gate. No armor added to recovery.
- Dedicated2172x724 Deep Woods panorama. Background bridge retained. ONLY playable foreground crossing becomes illustrated fallen log with textured flowing water underneath. Existing logical ground bounds unchanged.
- Lake and deep stream water receive subtle displaced water texture and moving highlights masked to blue/cyan water regions. No geometry deformation of land or camera. Reduced motion disables these water effects. Both scenes render with2x backing at unchanged960x540 gameplay coordinates.
- Two existing large PNG backgrounds converted losslessly to WebP (pixel-identical) to fit hosting asset cap. No other scene resolution reduced.
- F9 JSON export includes `reinaRepair147`: world/lane/render anchor/import and world scales, charge state, enemy timing/armor/cooldowns/reset/actionability/attacker counts. F8 and existing damage logs remain. Updated charge130 inspector uses production scripts, moving charge controls and scene fixtures.

## Validation
-69.33s supplied Reina recording: sampled contact sheet confirms context; source and deterministic fixtures establish defects. No exact input or damage attribution inferred from video alone.
-`tests/reina-repair147.cjs`: five charge directions, release/root invariants,60% speed, enemy startup/recovery/armor/punish/reset, all four heroes×three woods/lab clear gates.
-13 compatible full-chain legacy regressions throughreina-repair147;72 standard/raw/DSX charge fixtures with current chain;308 grapple cases;104 powerbomb/104 tackle cases;10 Forest grip cases.
-112 seeded10s mixed/solo fixtures with current repair loaded; finite coordinates/integer score/at most2 director commitments. ResultsNORMAL147-results.json. These are automated stress fixtures, not human difficulty certification.
-Browser: stationary charge and moving charge poses, grounded feet and focused upper body; Deep Woods panorama/log/background bridge review and water-motion previews. Inspector-only fixture controls do not change game controller mappings.
-Physical DualSense, exhaustive human balance playtests and matched human before/after recordings remain unverified. No global damage or health reductions.

## Art generation
Built-in image generation. Final installed assets: `dist/assets/deep-woods147.webp`, `dist/assets/trail-log147.webp`.
Final backdrop prompt: dedicated crisp3:1 second-panel Deep Woods panorama, resolved foliage/bark/rocks/stream, shaded canopy, small wooden lab, level trail; keep background bridge. Final log prompt: isolated massive horizontal fallen trunk, worn flat walkable top, rough bark/moss/growth-ring end, transparent background, no rails/posts. The intermediate backdrop replacing its background bridge with a log was rejected after user clarification and is not used.
