# Nightshade347 base/extra identity alignment

Built-in image generation edits, 2026-11-13/14. Source-only asset task; no engine, tests or runtime metadata edited.

## Inputs and roles

- Edit targets: `source-art/downtown345/heroBase.png` (16poses,4×4) and `heroExtra.png` (24poses,6×4).
- **Single identity/style reference:** `source-art/nightshade346/hero-melee.png`.
- Final siblings: `heroBase347.png` and `heroExtra347.png`.
- Initial identity edits retained unchanged as `heroBase347-raw.png` / `heroExtra347-raw.png`.

## Identity-edit prompt constraints

Redraw target to make every pose the same original Urban Fracture woman as the melee reference: youthful face/jaw/nose/eyes, blue spyglasses, brown bun/ponytail, ivory short sleeves, black-and-gold fitted tactical outfit and boots, athletic proportions, physically attached gold-framed cyan LEFT forearm screen. Preserve exact original pose choreography/order/grid and full-body silhouettes, limbs, feet, baton. No new poses, omitted poses, floor/shadow/effects/enemy/text. Constant character pixel density; never enlarge crouched/curled/supine figures to fill cells. Generous gutters/margins; genuine RGBA transparency. Original detailed comic style only.

Base pose order preserved: row1 idle +3walk; row2 windup +2baton swings +standingkick; row3 wristforward +armsup +airtilt +landcrouch; row4 flyingkick +overheadbatoncrouch +standinghurt +supine.

Extra pose order preserved: row1 six running phases; row2 recoil/fallingseat/seated/sideground/kneelinggetup/crouchedrise; row3 armsreach/sittingtuck/backrolltuck/invertedbackroll/feetup/seatedrecovery; row4 armsupstand/armsupcrouch/armsupseated/backleansquat/lowland/standready.

## Extraction prompt

Remove ONLY background/matte/halo pixels. Preserve every pose, face/identity, outfit/device, proportions, exact positions/scale, grid and dimensions. All gaps between figures alpha ZERO, including white/gray/brown haze and stray red fringe. Keep opaque character interiors and antialias edges. Do not redraw or invent details, crop limbs or delete poses.

## Actual checks / limits

See `identity347-qa.json`.

- Base:1261×1247 (generator shortened target canvas by13px),16main bodies at alpha>100 and area>500,16unique4×4 cells, no body edge contacts.1,023,030 alpha-zero pixels; alpha0–255.
- Extra:1536×1024,24main bodies,24unique6×4 cells, no body edge contacts.884,801 alpha-zero pixels; alpha0–254.
- Both finals visually inspected, including upright, crouched, flat, inverted roll and device poses. No missing body/limb seen at atlas inspection.
- Extra's RGB contains brown under transparent pixels, but sampled background gaps have alpha0.70th alpha percentile is2, so faint low-alpha halos remain; use the established whole-connected-figure matte importer rather than opaque rectangular crops.
- Base can show low-alpha red fringe around some silhouettes. Do not treat RGB alone as opaque background.
- Cyan attached wrist device visible in every pose; anatomical-left-only placement is ambiguous in some profile/rolled poses, and tiny opposite-cuff accents remain.
- Facial rendering is aligned to the melee reference, but exact pixel-identical anatomy/face across independently authored images is not claimed. Parent must inspect integrated transitions and calibrate per-atlas source density.
- **Do not normalize the first Extra run pose to full upright standing height.** It is a stride with bent knees; calibrate the entire sheet to the common hero/head/body density to avoid artificial enlargement.
- No integration, gameplay sync, scale/ground-anchor runtime tests or visual certification performed by this bounded asset task.
