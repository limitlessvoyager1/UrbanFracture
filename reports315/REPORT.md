# Build315 — Hospital witness mission

Recoverable approved checkpoint: `5eb794622299c4c135b89e7dbb1d8c3e075a2b4b` (Build314).

## Mission rules

The bank helicopter and Play Hospital start the mandatory rooftop patrol, then the witness search. Basement B1 and numbered floors1–5 are the six search floors. Clearing every clinical/service wing on a floor secures it once; the roof, walkway and optional garage do not inflate that count. Elevator/stair departure GO signals unlock after the floor's main wings are cleared. Players choose the search order. Architecture remains visible while access is locked.

After four distinct floors are secured, a safe action boundary starts one phone conversation. A different implemented hero reports a random location among all six floors, declines to join because they are pursuing another Syndicate enemy (identity TBD), urges haste and abruptly hangs up. Simulation freezes while reading; keyboard, click and native controller command paths advance one line per press. Holding a button does not skip lines. The witness floor can be one already searched. The directory marks it explicitly.

After the call, one different non-witness floor may be visited. A second distinct non-witness-floor choice causes death before that trip starts. Within-floor wing changes and repeats of the same detour do not count again; the roof is not a search floor. The floor where the call happens is not counted just by returning from a wing. The call and directory state the consequence before a detour.

The target floor's lobby becomes the rescue route, with two native approach opponents. Reaching its middle after defeating them introduces a frightened witness and captor. **The final boss is still TBD. An explicitly labelled temporary Bruno/enforcer using unchanged native115HP, moves, damage, recovery and Director rules makes the mission testable. It is not an approved final boss design.** Defeat and settle the captor, read the testimony exchange, and the hospital ends automatically. The witness exposes falsified patient transfers used to move captives, plus shared aliases in Syndicate bank transactions. The saved outcome records witness intelligence; optional key item and next destination remain TBD. No invented final reward or next-level route is granted.

On failure the game stays playable. The witness floor is empty of enemies, with a persistent non-graphic deceased witness in its middle. Safe retreat is allowed without requiring new patrol clears, but cannot escape an unresolved attack/grapple. The first-floor main entrance and basement loading dock show exit GO markers. Either ends the hospital with lost-information outcome and next destination TBD. Visiting the corpse cannot grant rescue rewards. After clearing the rescue approach patrol, the player may still use the permitted detour before committing to the boss. Failed missions suspend only hospital arena locks and explicitly abandon any active arena, preserving living enemies, kills, completion counters and the independent Director budget. Restart/replay begins a fresh rooftop search and clears the previous run outcome. Direct individual-floor starts and developer practice remain architecture/combat tests without story triggers.

## Files and implementation boundaries

- `dist/hospital-mission315.js`: serializable mission state, distinct-floor accounting, runtime events/audit, dialogue/input locks, native staged rescue, failure and exit outcomes.
- `dist/hospital314.js`: exact narrow mission lifecycle, navigation and status hooks, recorded in `tools/hospital315/hospital-patches.json`.
- `dist/hospital-mission-view315.js`: runtime objective, phone/testimony/failure dialogue, native grounded witness rendering and accessible modal UI.
- `dist/hospital-view314.js`: exports its existing authored doorway renderer; mission owns GO markers and exit-door presentation.
- `dist/game.js`: exact scoped pause/end/retry/replay patches. `tools/hospital315/game-patches.json` and `approved.cjs` reverse them against the Build314 source. Historical314/313/308 proofs compose that exact adapter, without excluding unrelated source.
- `dist/hospital315-witness-data.js` and `assets/hospital315-witness.webp`: original consistent three-pose witness,11770bytesRGBA, common sole anchor and fixed family scale. Built-in generation prompt, original and repeatable packing retained in `source-art/hospital315/`. No proprietary assets copied.
- `tests/hospital315.cjs`, `tools/hospital315/render.cjs`: mission and native rendering checks, registered with the release framework.

No existing hero damage, frame data, enemy AI weights, weather, weapon or grapple choreography was changed. Narrative actors are visual-only and do not receive combat hitboxes. The existing temporary captor retains actual normal heavy combat behavior.

## Verification evidence

Mission runtime:731 assertions, all seven heroes,30/60/120Hz transitions, all six randomly selected floors, one-time safe call, press-versus-held input, detour failure, empty witness floor, both exits, no false reward, practice isolation and a continuous native rooftop/four-floor patrol search. Original hospital architecture suite:1323 assertions. Eleven native rendered captures retained, including phone, captor, frightened/free/deceased witness, both outcome screens and directory.

A preliminary CPU batch was stopped by its frozen-source assertion when the discovered double-dialogue-advance defect was corrected. Its evidence is retained under `preliminary/`; it is not counted as final verification. Full checks are rerun from the corrected source. No failed test is waived.

The managed preview daemon started, but cloud-browser navigation to its exact URL timed out. No live browser or physical-controller result is claimed. Native render/simulated controller results are distinct from manual artistic, balance and hardware approval.

The test workspace connection interrupted two queues. Saved suite results were resumed only after verifying the same frozen source fingerprint. The remaining native queue ran serially with a768MB Node heap ceiling to encourage collection; assertions were unchanged. Interruptions are not counted as completed tests or waived failures.

Final verification:207unique automated suites passed,0failed. Six targeted suites rechecked the exact five-file hospital-only final corrections after the frozen full run. Reversing the recorded deltas reproduces each prior file hash; every other source byte and all artwork remain unchanged. Final runtime/test fingerprint: b3826052cd6aed19ec0b096886df99d54fcb816a8610ade8e7f8b3656a6402ab. Decision is needs-review because five manual approval categories are unexecuted, not because of a failed or missing automated check. See FINAL_VERIFICATION.json, final-patches.json and individual suite logs. No browser, physical-controller, artistic or stable certification is claimed.

Supplemental native-finish.cjs evidence uses actual accepted captor damage, settled defeat, witnessed testimony and automatic completion rather than only posed visual states. Eleven final captures include the authored patient-transfer intelligence. The supplemental fixture explicitly resets its forced witness route after the random phone selection; production source is unchanged from final verification. Exact prompt: source-art/hospital315/WITNESS-PROMPT.md; built-in image generation, compact asset at dist/assets/hospital315-witness.webp.
