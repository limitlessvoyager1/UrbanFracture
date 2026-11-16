# Build 236 — Shopping Mall

Checkpoint: `checkpoint-before-mall236` at `38aa0b19ac33b149e062610fef8f8739699b5c27`.

## Routes

Start from Scene Select → Shopping Mall → Entrance / Floor Choice. No campaign predecessor was specified, so existing campaign links are unchanged.

- Entrance: UP at elevator → second floor; straight/right → first floor.
- First floor: fashion, shoes, outlet, pharmacy, jewelry, food court → department store (men/women, electronics, appliances) → maintenance (HVAC/security office) → parking lot.
- Second floor: electronics, phones, video games, coffee/pastry, restaurants → ticket arcade → garage rooftop.
- Both parking areas contain finite ordinary-enemy fights and explicitly reserved final encounters. No boss or false level-clear victory was invented.

## Optional rooms

First-floor pharmacy: full health pack and one extra life. First-floor jewelry: 3,500-point jewelry and 1,500 cash. Second-floor electronics: 2,200-point electronics pickup and 1,500 cash. Second-floor Italian restaurant: 45-health food and 1,000 cash. Rewards appear once after all enemies and mandatory defeats settle. The player may collect or leave manually through the left GO. The outside GO disappears after returning. Same parent enemy/prop/item/encounter instances survive detours, including already broken kiosks and collected loot. Full-health health pickups convert to the established 250-point supplies reward rather than becoming uncollectible.

## Integration

`mall236.js` loads after Chinatown235 before Input226; `mall-view236.js` loads after sprite/view modules. Content appends twelve native scenes and uses one existing Adaptive/Locked222 system (two locks maximum in main sections, one in optional/finale fights), Director148 (three threat points/two commitments), 119/223 grapple framework and 156/162 environment. Scripted room reinforcements visibly enter from the side. No new enemy AI or weather controller. Scene Select, retry/restart, accessible canvas description, 2× rendering and HUD use native paths.

Breakable kiosks (cologne, sunglasses, shirts, popcorn) and arcade cabinets use generated high-detail sprites. They retain collision until destroyed by real attack events and release exactly one collectible reward; ordinary walking cannot topple them. Per-action contact sets prevent duplicate damage. Forest/Niko/Orion character-specific contacts use their existing action clocks, with no move timing/damage changes elsewhere. Seated patrons and finite shopping-bag runners reuse native casual artwork, cached and normalized to measured opaque sole rows on tile; their motion never participates in enemy AI or combat. Massage chairs, food tables and prize cases remain scenery. Arcade colors remain steady: no new flashing/strobing effect.

## Art pipeline

Built-in image generation supplied three production atlases: eight mall areas, four optional interiors, eight transparent kiosk/arcade objects. Final runtime assets are `dist/assets/mall/*236.webp`; import scripts are `tools/import-mall236.py` and `tools/import-mall-props236.py`. The area prompt specifies a 2×4 side-on 16-bit atlas with elevator/clothing/pharmacy, upper gallery electronics/phones/games/coffee, food court, department store, HVAC maintenance, parking lot, ticket arcade and garage roof; open foreground fighting floors, no people/UI/weather. The room prompt specifies a 2×2 atlas of pharmacy, jewelry, electronics and Italian restaurant with clear tile foregrounds. The object prompt specifies a transparent 4×2 atlas of perfume/sunglasses/shirts/popcorn kiosks and video cabinet/pinball/dual racing/basketball machines. Sprite import crops the main connected object bounds, retaining disconnected detail inside them and removing adjacent-cell fragments. Exterior sky cutouts feed the existing global sky.

Three existing sprite WebPs were repacked to meet the deployment size limit. Alpha and every visible RGBA pixel remain identical; only invisible RGB below zero alpha may normalize. See `qa/mall236-lossless.json`. No dimensions/anchors/animation changes.

## Validation

Passed `mall236`, `mall236-props`, `mall236-integration`, `mall236-view`: six heroes × both complete routes and all four optional rooms, collection/leave gates, persistent identities, one-time rewards, real prop contacts, collision, retry; 30/60/120 Hz transitions/recovery/arena reentry/Director pressure and grounded crowd state; twelve scene/camera-edge renders and twenty runtime assets. Existing full Prison224 suite (combat, grabs, controllers, weather), Chinatown235 and native Government/Casino handoffs passed. Browser review confirmed two entrance GO signs, grounded shopping-bag runners, detailed arcade/prize displays and correctly scaled pinball. Subsequent browser inspection timed out, so the Italian seated composition and all-room visual review are not claimed as browser-tested. Physical controller and human balance playthrough remain unverified.
