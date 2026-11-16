# Build37 — Broxton balance, opaque movement and venue depth

Walking and running now draw one opaque whole-body frame at a time. Alpha crossfades of neighboring locomotion poses caused the duplicate arm/leg afterimages in the supplied screenshots; removing those crossfades removes the extra silhouette. Running atlas scale is .62 instead of .54, maintaining Broxton body mass through the forward lean.

Balance: stomach punches10 each, headbutt remains20; clothesline primary26; German suplex24 plus grounded elbow12 =36 total; forward special slam45 and21HP paid once on hit or whiff. Its existing paid-special grab-resistance bypass remains. Other attacks/collateral damage unchanged.

Dash punch now requests knockdown at every connected range, with no startup-distance target list. After a valid hit against armor that suppresses ordinary knockdown, it explicitly floors the enemy. Guarded/invincible/dormant targets still reject damage and do not get forced down. Recovery .76 seconds and no extra cooldown are preserved.

Velvet Room occupied table groups move to y375–380 behind the fighting lane minimum393. Patrons scale .36, formerly .27–.32. Patrons now share the foot-depth sorted draw queue with fighters and props, fixing the always-behind layering that made Broxton appear to stand on their tables. Separate foreground tables/chairs remain destructible collision props and retain loot behavior.

Validation:43 Node test files passed, including both campaign route tests, simulated controller regressions,43rd build37 suite with exact strike damage/costs, close and long-contact dash knockdown against regular/heavy/security/boss actors, and occupied seating behind the playable foot plane. Browser QA inspected opaque walk, larger intact run, and the updated venue scale/depth. Physical DualSense hardware was not available. No new raster assets generated; existing art is reused unchanged.
