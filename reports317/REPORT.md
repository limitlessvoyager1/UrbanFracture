# Industrial District — Build317

Approved recoverable source checkpoint:54ba54f2568a2e39662e7d56902746bd4a06b031 (published Build316). Existing art and combat balance are retained.

Sixteen native sections form a reversible district graph. Hydroelectric dam crest gets a cleared-area UP exit and the subway's actual destination menu adds Industrial District. Both fade into the outskirts, preserve the same hero, HP, carried equipment and environment controller, and apply only the shared major-mission energy minimum. Rust Lane offers the optional electrical substation and storage room before the Almeida intersection. North leads through freight road, active railyard, operations building, abandoned tracks, searchable old cars and factory approach. South leads beside the polluted river, through abandoned water treatment and woodland to the chemical plant. Straight ahead follows Rust Lane past the smelting guard shack and barrier.

The three major plant interiors remain explicitly marked as planned. Their exterior entrance sections allow returning to the district; there is no invented boss, forced victory or unfinished interior presented as complete.

Rooms retain cleared state, consumed supplies and weapon drops. Train-car searches resolve once to an item or an ambush; revisiting cannot reroll or farm them. All encounters use native fighters, the shared Director,3-point threat budget and maximum2 offensive commitments. Existing attack damage and attack timing were not altered.

Sludge uses world-space elliptical ground footprints, shared native damage and an0.8second per-actor cooldown. Grounded heroes and enemies take4 nominal damage; jumping, flight, synchronized grabs and protected states remain respected. Hazard damage cannot generate combat energy. The checkpoint's short barrier occupies the upper strip; the lower path remains open. Enemy navigation corrects toward that path gradually, without teleporting through the arm.

Twelve original backgrounds, three original floor strips and a transparent two-car goods train share one world-camera transform. Dynamic weather/lighting remain native, indoor facilities are registered indoors, and smoke haze remains behind fighters. The train's explicit wheel baseline rests on the background rails. Street signs mount on a pole; access labels mount above actual doors. No existing artwork was recompressed or replaced for317. Full prompts, untouched generated images and reproducible packing are in source-art/industrial317.

## Verification

Native runtime tests cover every link and return, sixteen sections, consumed-item persistence, all three search cars, hazard recipients/cooldown/airborne exclusions, barrier bypass, real hydro UP entry at30/60/120Hz, actual subway-menu choice, practice isolation and native encounter completion/Director limits. A stall found in the water-treatment wave was caused by an unregistered enemy ID; the final plan uses the existing registered industrial worker.

Historical subway/hydro tests now expect the authorized district destination instead of the old unassigned route; the explicit return-to-platform action remains tested. Exact source receipts reverse only317 edits before316's prior proofs. No broad source exclusion is used.

Twenty-one native captures cover all sections, intersection routes, abandoned cars, checkpoint and moving freight at two times. Native captures are not a full live-browser or physical-controller certification. Managed preview navigation timed out at its returned local URL; no alternate browser route was used. Final automated results are recorded separately after execution.

## Final verified state

The frozen full run executed216 suites:212 passed and4 failed; source remained unchanged. All failed suites passed final targeted reruns. Eighteen final rechecks cover the exact eight-file final source/test delta. The subway return test now selects the explicit Return option; the cache test expects game317/core316/audio302. The heavyweight powerbomb raster suite repeatedly received SIGKILL with both facings in one process. Its final test isolates each facing in a separate process, retains every frame/assertion, and combines both results. No failed test was waived.

Final polish mirrors adjacent floor tiles to remove joins, keeps score digits clear, separates mounted signs and UP markers from the hero, shows opposite-end access doors, updates the dam exit label, and prevents barrier navigation from altering an active enemy attack's combat plane. Endpoint notices remain finite for replay snapshots, and practice cannot take the hydro campaign exit. Car searches have one owner; Gunner can retrieve revealed native items without a parallel invisible car cache.

23 refreshed native captures include all sixteen sections, moving freight at20/22seconds, a populated fight and the hydro connection. Existing artwork is byte-identical to the full-run checkpoint. The full/report fingerprints and exact final delta are in FINAL_VERIFICATION.json. Five manual review categories remain unexecuted.
