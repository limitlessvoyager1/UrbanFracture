# Build340 — Player unlimited resources

Added independent Player unlimited health and Player unlimited energy checkboxes near the top of the existing Developer Panel. Both default off. Changes apply immediately, including while paused, and follow the selected hero through Restart and scene changes in the same tab. Practice links carry explicitly selected overrides. They are not campaign save fields.

Unlimited health prevents depletion and lethal damage while retaining native hit reactions, interruption, knockdowns and recovery. It does not revive an already defeated hero; restart is required. Unlimited energy keeps the native meter at its normal maximum while preserving action eligibility, recovery, cooldowns and ammunition. Unchecking restores ordinary depletion. Enemy resource rules are unchanged.

Changed: dist/player-resources340.js, dist/player-resources-ui340.js, dist/audit-view135.js, dist/index.html. Added runtime and UI critical suite registrations and tests.

Focused verification: 231 runtime assertions across all seven heroes; 19 UI assertions including actual Developer Panel mount; existing energy316 249 assertions and both controller regression suites passed. Browser preview verified both actual native checkboxes default off, both checked, live resource status and practice URL propagation. Physical controllers and full campaign playthrough remain untested. Mandatory initial QA completed: 182 executed, 153 passed, 29 failed, 73 not executed. Both new critical suites passed; source fingerprint remained unchanged. This is not a stable release certification. Home navigation replay also passed 7,345 exact runtime checks over 1,469 frames.

Known release blockers inherited from339: global QA failures and expanded package exceeds 256MiB. No production deployment performed. No unrelated gates implemented.
