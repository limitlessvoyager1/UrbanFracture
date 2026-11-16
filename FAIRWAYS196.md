# Fairways Estates — build196

Reversible source checkpoint: `checkpoint-before-fairways196`, opening commit914fe6f8c9678336979a6ddc0cdedbe233a35526.

The completed woodland-lab escape now leads to Fairways Estates with the same hero, HP, weather session and ability cooldowns. Failed lab escapes still lose normally. The level is also in Scene Select under Uptown continuation.

Eight editable sections:

| Section | Exits after its enemies are defeated |
| --- | --- |
| Gate & village | Up at day spa → spa passage; continue right → club front approach |
| Club front approach | Automatic walk through front doors → members lounge |
| Day spa passage | Continue → rear residential street |
| Rear residential street | Automatic downward walk off bottom edge → club rear entrance / members lounge |
| Members lounge | Up at golf doors → golf course; continue right → pool/fitness grounds |
| Golf course | Final green reserved for a later encounter |
| Pool / fitness grounds | Continue → rear-most tennis court |
| Rear tennis court | Arena reserved for a later encounter |

The spa sits about halfway along the complete4900-unit main neighborhood route. Front/rear routes converge into one clubhouse scene; no duplicate interior encounter. All transitions wait for living enemies, pending waves and defeat landings, and use visible walking plus a short fade. No automatic healing. The rear doorway is deliberately below the screen. Final areas stay playable without awarding an invented boss win.

Distinct high-elevation panoramas show the city, forest, mountains, airport/terminal/runway lights, damaged gate, luxurious homes, winery, Whole Foods grocery, restaurant and dry cleaner. Diverse wealthy adults flee or cower. Background Marcus/Kevin/Bruno/Frankie perform cosmetic property attacks; selected finite figures visibly enter combat with unchanged identity. Others remain scenery. Existing enemy stats, combat-plane rules and Director pressure budget are reused; maxthree living enemies and at mostone Bruno at a time.

Distant takeoff/landing trajectories and golf carts use simulation time. Carts are opaque, tires meet the grass, and rotating spokes align to the actual wheel hubs with travel/radius cadence. Reduced motion freezes cart travel/spokes and running crowds. Night/weather continues outdoors; clubhouse windows have local exterior shading/rain without darkening the room as though it were outside. No new input controller, hero attacks, loot economy or boss AI.

Source: dist/estates196.js (campaign), estates-view196.js (presentation), estates196-data.js (cutout metadata). Developer inspector: estates196.html (area/camera/exit staging, pause/frame, exterior lighting). Run a static HTTP server from dist/; the existing HTML/CSS/JavaScript/Canvas stack remains. Buildless, no new runtime dependency.

Original generated PNGs and prompt set are in art-archive196/. Rebuild assets with scripts/import-estates196.py (Pillow/scipy/numpy). Runtime WebP images preserve source detail; no lossy downscaling. To fit the static package capacity,43 legacy PNGs were migrated to lossless WebP with alpha/visibleRGB equality verified; originals and per-file savings are archived. Consumers/cache versions updated.

Validation: tests/estates196.cjs covers5heroes×8sections, both complete branches,30/60/120Hz Up choices, automatic entrances, real cabin escape, naturally walked finite waves/real lethal landing gates, pending final arenas, flag/retry cleanup, persistent Iron Will, ambient trajectories/wheel timing/reduced motion and promotion identity. Existing current150 (26suites), gamepad/controller157, environment162/integration156, shield181 and pool-polish194 pass. Browser reviewed production gate, club choice, golf and rear court. Physical controller hardware and human difficulty playtesting are not claimed.
