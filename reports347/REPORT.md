# Nightshade347 — animation, drone and presentation corrections

Checkpoint: `checkpoint-before-nightshade347`, source6c2ec0111a73b2c900a67341722b6a261ba9bbb6, saved Site version331 / Build346. New opt-in entry: `downtown347.html`. Original campaign and346 remain recoverable. This is a Downtown review build, not stable campaign certification.

## Corrected items

| Reported issue | Confirmed cause | Correction / evidence |
|---|---|---|
| Baton sweep did not read as a sweep |346 selected only four early sweep poses before contact; its selected contact was a lowered starting posture |New24-pose low ankle-level arc, progressive extension, contact at nativeframe32, swept/falling/supine victim phases |
| Slide into beatdown |Root moved while the hero held crouched poses |New24-pose two-step walking sequence, heel/swing/plant phases tied to two short root advances during46–70f; then shallow squat |
| Deep/different beatdown posture and pauses |Old atlas kneeling stance; source poses18–23 were held settling poses |New standing shallow-squat stroke with planted boots; continuous0–17 arc/reset loop; no long settling hold between blows |
| Beatdown too slow |36f intervals between blows |26f intervals,83/109/135/161 contacts; full move214f instead246f. Four blows remain; totaldamage26 unchanged. Other enemies can still interrupt it |
| Sprite identity changed |Idle/run/get-up fell back to older, independently authored hero masters |New identity-aligned base16 and extra24 from the same melee reference; new sweep, steps, beatdown, vault and eight-pose rise use that identity. Uniform scale per sheet, no per-pose stretching or crouch-to-standing normalization |
| Vault victim out of sync |346 advanced the victim into airborne/horizontal/falling images during the hero's initial vault |Victim stays planted/upright while hero vaults, hero lands beyond target around28f, lever begins34f, victim lift then release44f. Hero stays low after release before rising. Narrow hand-support pose repairs replace only6–9 |
| Throw should collide with other enemies |Required explicit path validation, not inferred from reference |Native329 substep flight retained. At30/60/120Hz in both directions: three on-path normal enemies each take15 once, fourth takes0 due nativecap; off-plane bystander takes0; primary landing27 once |
| Rear-away prone facing wrong |Victim retained its initial facing after turnover |Victim facing reverses at37f and persists through prone aftermath; hero faces the matching elbow direction |
| No visible drone or attack in capture |The346 evidence renderer omitted the entire drone/effect world pass |One shared live/capture347 world pass draws the actual persistent drone, real projectile state, flame, healing field, muzzle cue and rotor motion. Gun/missile/flame drone aiming aligns with their existing80-unit projectile plane. Native costs, modes, cooldowns and damage remain authoritative |
| Skinny stores |346 capture squeezed an entire1536-wide strip into960×540 rather than using the live scene's proportional source window |Capture now calls the same scene renderer as the game.347 scene cropping explicitly preserves source/destination aspect ratio and bottom/world anchoring; no separate ground/background scroll |

The faster beatdown is specifically authorized by this correction request. No damage values, AI aggression, threat budget, armor rules or unrelated move timing were changed. Original frame/recovery rules remain for the vault, rear-away throw, grab combo, standard combo and six drone abilities.

## Reference analysis

See `reference-analysis.md`. The external6.533s clip is30fps and contains repeated poses, so it cannot establish the original game's internal frame data.

Observable order: capture2.100s; overhead actor vault2.167–2.467s while victim remains standing; far-side landing/lever2.567–2.633s; target lift2.667–2.733s; release approximately2.767–2.800s; independent flight while actor stays low; actor rises3.367–3.533s. Original Urban Fracture art implements those principles. No proprietary sprite/audio/code is imported.

## Drone implementation status

All six existing abilities are implemented: burst, charge, rear missile, Healing Ray, Flamethrower, assisted dodge. The front-away throw missile remains on its established timeline. Rendering tests draw the actual drone image every action frame and verify projectiles, damage/healing, energy debits and readiness. The earlier346 capture's omission was a capture defect; it was not evidence that the mechanics were absent. New captures include the actual world pass.

## Files / reproducibility

- `dist/nightshade-combat347.js`: revised sweep/walk/continuous-beat timing, vault shared timeline, reversed prone facing; retained native damage, interruption, flight and recovery owners.
- `dist/nightshade-view347.js`, `nightshade-art347.js`, `assets/nightshade347/`: current whole-figure poses, persistent identity in normal/action states, upright vault victim phases and prone flinch.
- `dist/nightshade-world347.js`: shared actual-drone/effects pass and production fighter-scale function, used by live game and captures.
- `dist/downtown-view347.js`, `game347.js`, `downtown347.html`, `nightshade-audio347.js`: isolated review presentation, aspect-safe scene draw and retained controller/audio routing.
- `source-art/nightshade347/`:144 new whole hero figures, original/rejected candidates, identity references, alpha/body-count checks and pose provenance. Grip repair overrides only four poses; other20 remain original.
- `tools/nightshade347/{import.py,render.cjs,roster.cjs,video.py,build.py}`: repeatable import, actual presentation/frame captures,80 paired contact scenarios and review packaging.
- `tests/nightshade347.cjs`, `nightshade347-art.cjs`: registered critical targeted native suites; see runtime/art/collateral JSON receipts.

Run importer, the two347 suites, renderer, roster renderer, video generator and build.py. Captures use native fixed-step simulation, current scene renderer, shared production actor scale and actual drone/effect rendering. They remain silent inspection captures, not proof of live-browser frame rate or audio mixing.

## Validation

- Native runtime: all ten Downtown enemy types,30/60/120Hz, both-facing cases, damage-once, interruptions, lethal cleanup, manual grab/controller dispatch, hitstun, revised vault stance/release and native secondary collisions.
- Art selection:10,620 paired simulation frames with whole-figure bounds, anchors and invariant per-sheet scale; shared-scene aspect checks; actual drone drawing/projectile/damage/healing/energy assertions for all six abilities.
- Rendered evidence: sweep/steps/shallow-squat strokes/rise, vault, collateral path, reversed prone throw, grab/melee combos and all drone actions;80 representative paired contact scenarios across ten enemies and both directions.
- Source/body assets and representative current rendered output were inspected. Pixel-exact anatomy/art approval is not claimed; generated poses can retain small artistic variations and cuff-side ambiguity.
- Synthetic standard/raw Sony/DSX mappings remain tested. Physical PS5 hardware was not available.
- The new managed-browser check was interrupted before live input validation completed. It is not counted as a pass. Existing live-performance/physical-controller/art approval holds remain; no stable main-game rollout is performed.

## Evidence and limitations

See `rendered/*-closeup.webp`, `rendered/roster-*.webp` and `video/Nightshade347-Native-Frames-{1x,0.5x,0.25x}.mp4`. Native video includes the collateral scenario and drone/effects; old346 background/omission errors are not repeated. Current capture intentionally focuses on the scene/fighters/combat effects rather than every HUD/weather/UI layer.

Full canonical campaign QA, real controller hardware, live performance certification, subjective audio mixing and final artist approval remain outside this completed targeted correction pass. Existing UF-RENDER-025/027 holds are not waived. Original main game and older review entries remain untouched.
