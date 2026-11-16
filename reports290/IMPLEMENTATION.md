# Enemy reaction rollout — Build 290

## Scope
The owner authorized extending the reviewed Marcus reaction prototype to every implemented enemy. Thirty identity scenarios are covered: 23 available practice entries and seven additional scripted identities (Dorian, Ethan, Nora, Dirk, Ophelia, Jameson and Arthur Sterling). Spectre remains unimplemented and is not certified.

The new renderer adds distinct light, medium and heavy recoil, articulated falling, ground impact, grounded rest, and a crouched recovery into standing. These are source-textured articulated poses, not a claim that new hand-drawn sprite atlases were created for every enemy. Each enemy retains its own source artwork, palette, dimensions and identity. Marcus keeps the previous approved prototype atlas. Prison Guard is explicitly separated from the ordinary Marcus eligibility check.

## Shared architecture
`dist/enemy-reactions290.js` loads after existing character-specific views and the Marcus prototype. It reads native clean-hit and knockdown clocks. It never changes HP, stun, damage, recovery, actor position, collision, AI, armor eligibility or attack commitment. Specialized synchronized throws, held poses, electrical shocks, aerial states and authored wake-up attacks delegate to their existing renderers.

Source art is captured from a cleared copy of the actor, never by resetting a live actor. Articulation uses a connected source-textured mesh, rigid limb transforms and existing scale. The sole is registered to the native ground anchor. The weapon pass is separate from the body mesh to avoid weapon smearing. Worker crowbars use the existing native bar renderer and grip geometry. Caches have a 32 MiB pose budget and 48 source-variant limit.

## Verification
- `node tools/reactions290/trace.cjs before` and `after`: deterministic Niko matchups, 360 ticks per identity. Compare entire recorded HP, action, position, stun, flight, recovery, protection, cooldown and Director snapshots. Ten thousand eight hundred ticks compare identically, including after packaging compaction.
- `node tools/reactions290/all-tests.cjs`: isolated process per identity to bound native canvas memory. Monolithic and parallel native-canvas stress runs exceeded the executor memory limit. The accepted runner validates one enemy process at a time. Samples seven reaction phases at six times, both facings; checks source presence, distinct poses, finite transforms, nonempty rendering, floor registration, live-actor immutability and protected-state delegation.
- `node tools/reactions290/contact.cjs`: candidate five-pose direct-rig contact strips for all identities. The Marcus strip is a rig sample; production Marcus continues to use his retained289 atlas, not this candidate rig. These are review evidence, not automatically approved screenshot baselines.
- `node tools/reactions290/capture.cjs knifeThug`: baseline/current views of the same live native-engine ticks. The calibration stage is an engine capture, not a browser recording.
- `node tools/qa242/run.cjs --profile release`: existing project-wide regression profile. Final counts are recorded in `release-report.json`.
- Browser: quarter-speed Kevin practice loaded; after closing the developer panel, +1 frame advanced 94 to95 (1.567s to1.583s). Stepping while the developer panel pauses the game does not advance gameplay; close the panel first. This pre-existing behavior is recorded rather than counted as an unrestricted panel-step pass.

## Packaging preservation
The hosted artifact was already within a few KiB of its 256 MiB expanded-archive limit. Existing images were not resized, recompressed or removed. A small set of existing JavaScript files was compacted by removing comments/whitespace and shortening private identifiers, preserving public property keys and function names. Canonical parsed ASTs are compared under the inverse binding map. Readable originals are preserved in `source-archive/build290/dist/`. `game.js` is byte-identical to Build289: a trial compaction exposed controller tests' dependence on its local binding names, so that trial was reverted. The final regression run uses the restored game file. Cache versions are updated for packaged scripts.

## Recovery
Recoverable starting commit: `20662bacb7724368c1507d788b7a95f48bb90836`, tag `checkpoint-before-enemy-reactions290`. Restore that saved Site version for a build rollback, preserving the current private audience. Do not confuse build rollback with resetting temporary practice settings.

## Limits
This rollout is ready for focused playtesting, not a stable-build or artistic certification. Owner-approved screenshot baselines, every move against every enemy, every costume/weapon permutation, physical DualSense operation and broad human balance testing remain unexecuted. Existing specialized throw/reversal art has not been redesigned. Authored automatic wake-up attacks retain their existing rules and may supersede generic get-up poses. The older standalone controller-recovery test had a documented baseline failure in Build289 and is not represented as fixed here.

Final broad profile:142 passed,0 failed,5 manual gates unexecuted; sourceChangedDuringTests=false. Decision: needs-review, stable=false.
