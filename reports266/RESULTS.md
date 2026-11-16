# Build266 results

Targeted stats266:502 assertions passed. Gate A playback137 assertions and Nightshade actual-input28 checks also passed during development. No physical controller was tested.

Initial profile:77 executed,77 passed,zero failed,10 not executed (five release-only plus five manual gates). Final release is recorded in release.json after completion; no unexecuted test is marked passed.

Browser review confirmed F9 stats panel, all seven hero configured walk/run values, Orion's native acceleration config, independent configured/live/measured columns, Spectre registry-only selection and Marcus live60HP selection. Captured data is read-only. Full move timing remains Gate C. Measurements that have not been captured are visibly N/A.

Corrections made during development: jump command starts before the tick snapshot, so onset is now captured at the native command boundary; normal landing duration includes the last tick. Selected comparison summaries now retain different heroes' measurements while old actor references are pruned. Active leg injuries are recognized and expired poison is excluded. No game balance or art was modified.

Browser native keyboard + fixed stepping verified Nightshade neutral jump103.950675 world units (configured104), duration41/60 seconds and zero horizontal displacement. Locator-only key delivery did not reproduce the physical key event in this browser; the documented native keyboard path did. The final rendered table screenshot is browser-stats.jpg. Browser completion-summary-only submission failed tool schema validation after the verified capture.

Additional regression fixes: Stats command-boundary synchronization retains first-jump data immediately after a reset. Playback265 now preserves queued actions owned by the new scene/player while discarding stale prior-player/zone commands. Its original leading header was restored and excluded from storage-only evidence because this file has an intentional executable fix.

Final certified-input release profile:82 executed,82 passed,zero failed,five manual gates not executed. Source fingerprint unchanged throughout the run and verified again before packaging. Acceptance remains needs-review/stable=false. Prior passes are preserved separately; they do not substitute for this final frozen-input run. No art or screenshot baseline was approved or overwritten.
