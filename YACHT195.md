# Arthur Sterling’s yacht — build195

Checkpoint: `checkpoint-before-yacht195` (e4454c351d87058db78cb291e3a87a68082c535e).

Riverfront’s finale is Bruno and Kevin. Its existing boarding walk now enters the yacht without healing or changing hero, weather session or ability cooldowns. Two editable scenes are also in Scene Select: main deck and Sterling’s lounge.

The deck has five spaced enemies, a clear-gated lounge doorway, open railings and passing city scenery. The short lounge approach has two standard enemies. Arthur orders one Dorian to attack and joins after ten seconds of simulation time. The final encounter is confined to the lounge and completes only after both bodies settle.

Arthur has200HP, light defenses and an independent canonical AI admitted through the existing pressure Director. Scepter side/reverse swings, an interruptible rushing overhead bash with three grounded followups, an aimed850px/s energy projectile, brief occasional guards and a pressure-triggered shove/followup use native damage/block/dodge/shield rules. Grounded followups require the initial bash to actually knock down; guarding, missing and armor do not create a free ground sequence. His artifact is not an eligible disarm weapon. All moves have recovery; no perpetual armor or new counter controller.

The scene root rocks subtly while fighters, floor and effects remain together; the skyline stays level and scrolls behind transparent railings/window masks. Reduced-motion preferences disable rocking and reduce scenery speed. Muted/paused play stops the marine mix. Audio uses restrained engine tones, filtered water and occasional creaks; no external audio dependency or simulation RNG consumption.

Source: dist/yacht195.js (encounters/combat), yacht-view195.js (art/motion/audio), yacht195-data.js (cutout metadata). Run locally by serving dist/ with any static HTTP server. The existing HTML/JavaScript/Canvas stack is unchanged. Developer inspector: yacht195.html, using the production simulation and assets. tests/yacht195.cjs covers all heroes,30/60/120Hz delay, route handoff, gates, real contact events, block/offlane chain denial, lethal completion and autonomous AI.

Generated source art and rebuild script are retained in art-archive195/ and scripts/import-yacht195.py. Eighteen legacy atlases were converted to exact-RGBA lossless WebP to fit the static hosting package; source PNGs are archived, all consumers updated and cache versions bumped. Per-file savings are in art-archive195/lossless-conversions.json. No lossy resizing of legacy sprites.
