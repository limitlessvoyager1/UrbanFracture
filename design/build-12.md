# Build 12 — expanded downtown, Frankie and smoother throws

Marcus renders at 92% of his former scale. Throw caster poses now blend from grab into the technical throw and back to idle with eased timing. Paired victim movement and airborne travel ease between positions. Flight inherits the lifted release height and rotation, blends into the fall pose, and lands on the ground rather than teleporting to floor height on release.

The world grows from 2200 to 6200 units. Six checkpoint encounters: Pizza Row, Market Block, Arcade/Nightlife, Restaurant Row, Condos/Post Office, Service Alley/Jackal. Enemy count increases from 7 to 15. The final alley contains Jackal and two Marcus thugs; defeating only Jackal does not finish the stage. Camera/world limits, progression, retries, food, target HUD and controller checkpoints use the expanded route.

New panorama storefronts: game room, bar, club, Chinese restaurant, burgers, Greek food, donuts, post office, offices and condos, with upper residential windows and city skyline. A separate rear-facade alley arena has fire escapes, garage, graffiti, dumpsters, service doors and security lights.

Frankie is an 80-HP biker in leather motorcycle pants, boots, vest, sunglasses and silver chains. His interrupted windups are vulnerable. He tries to maintain 110–165 units of spacing, attacks with a 185-range chain lash (14 damage) or 195-range sweep (16 damage/knockdown), and uses a close punch when crowded. Long windups and recovery give opportunities to close distance. The chain is a weapon, so it can be blocked or dodged but cannot be caught as an unarmed punch. Frankie has walking, attack, falling and grounded art, portrait, red health HUD target, roster card and Sprite Room previews.

Built-in generated asset prompts:
- dist/assets/downtown-extension-v1.png: night side-scrolling pixel-art panorama matching the original stage, the ten specified storefront/office/condo frontages, wet clear fighting lane, no characters.
- dist/assets/service-alley-v1.png: matching rear brick alley boss arena, fire escapes, service garage, graffiti and security lights, clear fighting lane, no people.
- dist/assets/sprites/frankie-v1.png: eight isolated transparent pixel-art biker poses in a 4x2 atlas, sunglasses/leather motorcycle clothes/boots/chains; idle, two walking strides, chain windup/lash, punch, fall and grounded. Metadata in dist/frankie-data.js.

Validation: full ordinary-input simulation clears all six encounters and 15 enemies with Reina alive. Regression checks pass for combat, balance, catch/defense meter, controllers, actual rendering, recovery, HUD and sprite initialization. Added tests for expanded bounds/checkpoints, final boss backup gate, Frankie range/lane/retreat/interruptibility and throw release height. Browser inspected the new nightlife panorama, Frankie chain and portrait, and alley boss crew. Temporary QA page removed before publishing.
