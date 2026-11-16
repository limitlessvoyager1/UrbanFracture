# Gate 7 — contact feedback

Scope: distinguish confirmed clean hits, blocks, armored impacts and successful counter captures/parries. Preserve approved damage, hitstun, knockback, defense costs, attack/recovery clocks, armor windows, grapple ownership and AI weights. Gate 8 has not begun.

Baseline: Gate 6 source `0312b0352e5b3d983075ab9ffea675ba42e51790`. Recovery checkpoint: `checkpoint-before-contact302`.

## Confirmed problems

The previous presentation often relied on a similar bright hit flash, while ordinary hits, chip blocks and armored contacts could all reach the legacy impact-audio path. Some armored actors had an extra neutral spark; other armor families did not. The native damage system already knew whether its no-interruption armor branch was applied, but did not expose that specific decision to presentation. Inferring armor from an unchanged action could mislabel deliberate no-stagger attacks.

## Corrections

| Actual outcome | Visual cue | Sound route | Mechanical behavior |
|---|---|---|---|
| Clean hit | Small warm six-ray burst; existing native hit flash/recoil | Existing punch/kick/knee/landing impact and applicable hero hurt voice | Native damage, hitstun and knockback |
| Block | Blue shield with crossed contact marks; existing native block/bracing pose | Short low clack, distinct from a clean impact | Native chip, defense cost, guard break and pushback |
| Armor | Amber hexagon, bars and metallic fragments; clean-hit body flash suppressed | Low body tone plus metallic high tone | Native armor resistance/reduction and action continuation |
| Successful counter capture/parry | Violet double diamond and confirmation mark | Two-tone counter cue | Native timing, meter, capture and follow-up |
| Miss or protected target | No new contact cue | No new impact sound; existing whiff/swing behavior remains | Native whiff recovery or rejection |

`dist/contact302.js` observes completed native damage calls and successful counter capture/parry events. Native `hit` events now include the value of the already-computed armor branch as `nativeArmor302`; this is diagnostic metadata only. The existing core damage logic is otherwise byte-identical after stripping that one field. The Gate 3–6 source invariant tests explicitly check this equivalence by stripping only that exact diagnostic field before comparing every remaining byte to their pinned approved sources. The historical Gate 266 header-storage proof also remains intact: its test reverses only the exact authorized private-audio-RNG substitution before checking the original checksum, allowing no other synth-body changes. Blocks take priority over armor so chip damage cannot masquerade as armor absorption. Explicit no-stagger bullets and armor-bypassing weapons remain clean hits.

The observer uses native contact events rather than HP loss alone, so successful practice hits still register when unlimited-health practice refills a bar. Periodic poison/status ticks do not manufacture melee contact effects. Synchronized/held, grab-damage and flight contacts delegate to their established move-specific impact/sound owners; a generic standing-torso spark is not placed above a grounded or rotated throw victim. Successful counter capture/parry cues are still observed separately. Rejected invulnerable hits and out-of-range attacks create no contact events. History is capped at 256 records and active cues at 64; reset clears them. Lifetimes use simulation time, so paused frames are repeatable and frame stepping advances them with the rest of combat.

`dist/contact-view302.js` renders code-native original geometric cues above the fighters. They do not replace bodies, modify roots, stretch sprites, crossfade poses or extend hitboxes. For blocks/armor, cosmetic copies suppress the clean-hit brightness fields while leaving native defense poses and all gameplay values intact. Specialized paired animation owners remain unchanged.

`dist/game.js` wires world cues and audio to the actual game loop. Legacy generic hit/block/armor/parry sounds are skipped only when a resolved contact has supplied its replacement sound, avoiding duplicate impact playback. Unobserved specialized events retain their existing sound handlers.

The shared impact/voice/gunshot synthesizer in `dist/combat-audio.js` now uses its own cosmetic pseudorandom stream. It no longer consumes simulation `Math.random` calls when generating noise or choosing audio offsets. The synth structure and available impact types are retained. Other specialist ambience/audio modules are outside this isolation claim.

## Hitstop and balance

Existing native hit-pause owners are retained, including move-specific pauses already implemented. No new global hitstop was introduced and no animation clock was independently slowed. Existing recoil, bracing, damage reduction, chip, knockback, defensive costs and counter eligibility remain native. No provisional frame-data or AI-aggression tuning was applied.

## Verification

- `tests/contact302.cjs`: clean/knife hits, enemy/hero blocks, Bruno active armor, successful capture, miss, invulnerability, Saito counter, weapon bypass, deliberate no-stagger bullets, bounded history, reset and simulation-time expiry. Fourteen mirrored scenarios compare native actor values, actions, effects, event payloads (excluding cosmetic additions), and random state for every tick over 150 ticks against the observer-disabled build.
- `tests/contact302-view.cjs`: production renderer, distinct bounded geometry/pixel signatures, body-state immutability, defensive flash suppression, sound routing, silent misses/protection, paused-frame repeatability, private combat-audio RNG and live game wiring.
- Both suites are registered in the frozen QA242 release profile. The runtime loader's optional flag is a test-only baseline selector; normal production defaults are unchanged.
- `before/` and `after/` contain matching native renderer captures and state traces. The before pass delegates to the exact prior sprite renderer and legacy armor spark; the after pass uses the new contact renderer. No new illustration stands in for gameplay.

The final full-release count and source fingerprint are recorded in `RESULTS.md` and `release-validation.json` after the run completes.

## Verification limits

The browser connection timed out despite a bounded client request; the browser UI session was unavailable. Visual verification uses actual production-renderer captures. Audio routing and synth execution are tested programmatically, not certified by a human listening session. Physical DualSense, owner artistic approval, human balance and whole-game all-move coverage remain separate manual gates. This gate does not claim new animation assets for all defensive poses; it retains the native bracing/recoil owners repaired in previous gates.
