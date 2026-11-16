# Build 282 implementation

Recovery: checkpoint-before-reina-scale282 at 53365dd8ff7a0fd5e34518b4e974c49e926ab2d5.

Reina uses a single anatomical scale across idle, walking, running and existing action families. New eight-frame walk and run cycles follow resolved world displacement; blocked movement freezes gait progression. Near-side hand metadata anchors both weapon classes consistently, with fingers composited above the handle. Existing combat ranges, movement speeds and global scale remain unchanged.

Pizza restores exactly 30% maximum HP, limited to missing health, including Gunner delivery. Other food and enemy self-healing remain unchanged.

Deep-woods flow uses bounded source-space stream polygons, a conservative water mask, integer displacement and one opaque source sample. Trees, banks, cabin and bridge are excluded. A false Downtown-only zone-four clear exception was repaired for Uptown. Clear notifications now use one fixed HUD banner; old player-anchored clear effects are suppressed.

Developer Menu → Enemy practice supports mixed implemented enemy types and counts, up to eight targets with existing worker and scripted boss safety limits. Unlimited health retains real hit damage/reactions and refills after lethal contacts without deaths, loot, kills or equipment regeneration. Finite health remains available. Existing shared fixed-step Precision Playback provides 0.1, 0.25, 0.5, 0.75, 1, 1.5 and 2×, pause/resume and exact +1/+5/+10 ticks. Restart preserves roster, health setting and speed. Native Director commitment limits remain enforced.

Files: dist/core.js, companion126.js, game.js, index.html, woods139.js, playback-ui265.js, repair259.js; new practice282.js, reina282.js, reina282-data.js, reina-view282.js and assets/reina282. Regression fixtures, suite registration and storage-proof inventories updated for changed requirements.
