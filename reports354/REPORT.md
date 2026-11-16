# Build354 — Reina reference design

Checkpoint: checkpoint-before-reina354 at e359385ae99b3a00e7b1f85217ec0f48e4b0833c.

Recreated Reina artwork for her existing animation library from the supplied waterfront concept. Long loose navy hair, scar, earrings, wrap dress with white trim/sash/blossom, black shorts/gloves/sandals and black/gold guards/scabbard. Latest user shade #0000FF supersedes the earlier navy dress request. Runtime dress material mapping preserves white/gold/skin/hair and alpha. 17 atlases contain 441 mapped source slots plus eight dive poses; slots include shared legacy bindings and are not a claim of 441 distinct heroine animations.

Native frame dispatch, combat timing, collision and choreography remain. Uniform image normalization retains original silhouette height and grounding. Shared frame swaps are scoped to Reina and restored after drawing. Explicit recovery, interrupted-combo, unique, dive and foreground paths are covered. Portrait comes from new idle artwork. Downtown354 defaults to Reina, retaining the previous Nightshade test option. Full campaign source includes the new art; hosted capped review remains Downtown only. Estate presentation is excluded from review package, not deleted from source.

Files: dist/reina354-data.js, reina-bindings354.js, reina-view354.js, assets/reina354, downtown354.html, game354.js; narrow exports in sprites.js/review-view306.js, campaign index/game portrait hook; tools/reina354, fighter-render manifest, tests/reina354-palette.cjs, qa/system242/suites.json, source-art/reina354, AGENTS.md.

Validation: palette/crop/alpha tests passed across all 17 atlases (26,749,601 assertions, mostly per-pixel); 1,484 native renderer/binding checks passed for 413 bindings, including unchanged Brawler prototype. Native simulation capture: 24 cases, 2,635 frames. Existing hip118, german120, counters130, counters248, reina279, gamepad and controller-recovery suites passed. JS syntax passed. Full campaign renderer loader checked separately.

Evidence: contact-sheet.jpg; Reina354-Animation-Review-1x.mp4 and 0.5x.mp4. Native fixed-seed renderer/simulation, not browser or hardware footage. AI suppressed in fixtures. Counter inputs use seeded native incoming-action capture; counter-kick fixture has no damage receipt, so this is visual coverage rather than an all-counter-hit certification. Dive-labelled fixture resolves to airKnee in this scenario; dive art loads and is validated but actual sword-dive input needs manual confirmation.

Known limits: no browser performance or physical DualSense certification; no full campaign playthrough. Existing manual/performance holds remain open. Images are original generated redraws, with native frame timings retained; final player feedback is needed for likeness/motion. Next: playtest Reina across Downtown and manually verify sword-dive, varied counters, equipment sockets and controller flow.
