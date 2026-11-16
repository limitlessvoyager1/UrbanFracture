# Build266 — Developer Console Gate B

Checkpoint checkpoint-before-stats266, source08c024e816242d6f90c722902ffd7500ab6cef82 (Build265). Gate B only; Gate C timing adapters and Gate D editing/restoration are not implemented here.

The current game is a buildless Canvas2D/IIFE project with native Brawler actor factories, HEROES, ENEMY_NAMES, Adaptive222 catalog and EnemyIdentity233 metadata. Stats266 reads those actual registries and existing live actors. It never spawns a test actor, consumes RNG, changes HP/movement, alters enemy eligibility or writes production definitions. Catalog-only entries do not imply implemented or spawnable enemies. Spectre remains metadata-only; the scripted Baylor registration is implemented.

F9's existing dashboard gains a Character Stats & Hero Comparison details tab. Gate A playback, legacy reports, environment, Gunner and collision tools remain. Rows separate configured, live, measured and difference values, units and source/limitations. All seven registered heroes appear in the comparison; checkboxes select columns. Dynamic registry additions and live variants inherit the picker. Gunner is a separate companion entry.

Actual movement observations attach around the native tick only while the statistics tab is open in the visible dashboard. They use logical x/y displacement, never sprite gait or scale. Walk/run/plane samples require60 consecutive axis-motion samples; stopped, turning, incompatible states, clamped endpoints, modifiers changing category and section cutscenes invalidate a partial window. Samples retain timestamps, actor IDs, run identifiers and modifier context. A sample is an average over its window, not a claim that acceleration is absent. Actual AI supplies enemy movement; no AI actions are forced by the inspector.

Jump onset is observed through the existing command return and native transitions; measured duration/distance use actual ticks/positions. Peak height uses the exact production zheight function, not an independently invented sprite formula. Jump attack context is retained. Complete-action displacement/dodge duration and flight knockback measurements are observational. Exact authored startup/active/recovery certification still requires Gate C adapters. Incomplete/interrupted actions are not presented as clean completions. Removed live actors are pruned. Per-type measurement summaries remain available across character tests for comparison until reload; selected live instances retain their own values.

Undefined/non-universal quantities show N/A, not fabricated defaults. Enemy tactical speed cannot always be represented by a configured scalar. General received-damage, armor, stagger and block scalars do not exist as universal registry values: per-hit conditional logic remains authoritative. Counter windows read Counter248; ordinary grab thresholds read Grab223. Shared core meter defaults/regeneration/delay are source-backed display adapters (100/9 per second/1.5seconds), not new balance controllers. Per-character exceptions and scripted rules are preserved.

No experimental editors, undo/redo, default restoration or deployment rollback button is enabled. Restore Defaults must later target the approved current-build baseline. Privileged verified-build rollback remains separate from temporary settings and must require its own confirmation.

## Hosting storage

The deployment is close to the256MiB expanded-tar limit. No images were changed. Removed210 leading internal comment headers, retaining every removed header in header-storage.json. For every affected file its executable body hash is unchanged; third-party copyright/license headers were excluded. Test stats266 verifies every body. Existing Git checkpoint restores original source headers. This is source formatting for package storage, not a gameplay rewrite or artistic approval. Failed image re-encoding trials produced no asset changes.

## Validation

502 targeted checks cover actual seven-hero walk/run measurement, real enemy AI, Gunner isolation, jump duration/height, current/configured divergence, no implicit spawning/balance mutation, unknown values, active modifiers, future registry additions, cross-hero comparisons, disabled capture, actor pruning and all210 unchanged executable bodies. Initial77/77 and final release results are retained separately. Tests use simulated input; physical DualSense hardware, artistic approval and approved screenshot certification remain manual.

Playback265 received one necessary input-reset repair: a queued command for the current player/zone survives the first clock reset, while commands belonging to the previous player/zone are discarded. Tested explicitly; ordinary gameplay input remains unchanged when developer playback is disabled.
