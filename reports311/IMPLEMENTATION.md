# Build311 — Unique Action and shared energy

Reina has R2 / F Dragon Tail through the existing UniqueAction251 dispatcher. R2 is reserved for Unique Action on all heroes and no longer also activates Run. Double-tap running and independent L1 block / R1 counter / L2 grab remain. Nightshade retains her existing handgun; other heroes' new unique moves have not been invented without specifications.

The golden-yellow Energy HUD replaces Defense beneath life for every hero. This is the same authoritative resource internally (`defense`/`maxDefense`), so all block, counter and dodge spending and native recharge continue unchanged: 9 units/s after the existing 1.5-second spend delay. No second meter or recharge clock exists. The accessible health summary also calls it Energy.

Dragon Tail: 50% of dynamic maximum energy,24 damage (less than the existing28 neutral sword special), short92-world-unit forward reach,14-frame startup, active14–30, descent31–42, landing43, recovery through65, actionable66. Native pose/simulation clocks; no granted invulnerability, HP cost or armor. It can be interrupted in startup, air and recovery. Successful unblocked contacts knock down with100-unit bounded knockback, including aerial targets. Native invulnerability, boss protection and blocking admission are retained. Facing and logical combat plane remain latched; the authored full-body spin returns to original facing. Hits do not cancel mandatory recovery. Two casts can consume a full meter.

Reina's counter+special now draws, thrusts into the midsection, quickly chambers and slashes diagonally down. Hits18/27 deal24+32, preserving the previous56 total,64-frame total and native counter confirmation/resource/HP rules. Draw creates room without teleporting the victim; slash releases into knockdown and subsequent recovery. New drawing overrides only this counter special, not her other counters.

Aerial special: a full vertically rotating sword wheel through authored inverted poses. Retains the existing16-HP aerial-special price and30 damage.54 frames,36-frame descent followed by landing recovery. Uses the native permitted jump-attack cancel paths as well as a neutral jump. Tracks the nearest valid enemy within500units and26depth at bounded290units/s; logical lane stays fixed, target can be replaced if unavailable, no teleport or off-plane hit. Jump apex increases8% (119.6→129.168).

## Original artwork and tests

24 generated original hand-drawn poses, packed with fixed family scale and separate anchors. First matte-background attempt rejected; final cutout has true alpha. Exact source PNG and packing metadata retained in source-art/unique311. A blade crossing the authoring grid uses an expanded source crop and offset anchor; its neighboring pose is cropped to exclude the fragment. No per-pose anatomical resizing.

Targeted tests:90 runtime assertions,32 actual input-pump assertions over standard/rawSony/DSX plus keyboard,318 rendered native-frame checks; original counter248 and playback265-input suites also pass. Actual HUD source was rendered and the golden pixel verified. Native videos/contact sheets cover Dragon Tail, aerial wheel and counter thrust/slash. Physical hardware is not tested. Browser preview navigation timed out; native renders are the visual evidence.

Source preservation: five exact game.js edits (HUD bar, HUD label, accessibility word, R2/Run separation, Reina help text); every other original game.js byte is asserted unchanged. Other approved legacy JS remains byte-identical. A narrowly scoped quality308 canonicalization reverses only these five authorized fragments for historical preservation checks. Native simulation additions are in unique311.js, presentation in unique-view311.js.

Recovery baseline: published300 / source8275c854f8528a382f3220c460e323578a37abe8. Full fresh QA result is recorded separately after running; the prior build's190 passes are not claimed for this build.

## Final verification

The complete193-suite run is preserved in release-first-run.json (188 passes, five obsolete expectation/source-proof/cache failures). All five were updated narrowly and rerun successfully; release-verified.json preserves both failures and reruns, with193 passing results and five manual review gates pending.

Final visual review then found the new counter slash release still owned an active shared grapple session, which forced the victim directly into a floor pose. The one-fragment correction ends that session before native knockdown. No shared source or other production file changed. Native frame27 now shows the start of recoil/fall, followed by full fall/ground poses. Final-proof.cjs verifies the exact production delta and records90 runtime checks,32 input checks,318 native-frame/render checks, original counter248 regressions, and shared grapple301 (22,798 checks), grab223 recovery, knockdown299 (2,195) and plane304 (4,580) checks. See FINAL_VERIFICATION.json and final-shared-regressions.log. This is a full run plus documented targeted corrections, not a claim that one unmodified full run had no failures. Native render/automated evidence does not certify physical hardware or owner artistic approval.
