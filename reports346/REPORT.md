# Nightshade346 — paired choreography review build

Checkpoint: `checkpoint-before-nightshade346`, source `58ccf82d715cebd4ecb24309e250a761135eb2bd` (saved Site version330). New work is opt-in through `downtown346.html`. The original campaign entry and345 checkpoint remain intact. This is a review build, not stable release certification.

## Incorporated

| Input | Implemented sequence | Contact frames at60Hz | Total approved damage |
|---|---|---|---|
| Front grab + forward Attack | Baton ankle sweep, fall to supine, step alongside, four steady baton blows, stand |32 /68 /104 /140 /176;246f total |26 redistributed as8+5+5+4+4 |
| Rear grab + forward Attack | Shoulder plant, complete overhead vault, momentum pull, independent forward launch and ground impact, recovery |44 release; native ballistic landing;86f hero action |27 primary; existing collateral policy retained |
| Rear grab + away Attack | Backward paired roll, turnover onto stomach, straddle, elbow to back of head, rise |37 takedown /75 elbow;115f total |8+24 |
| Neutral grab Attack | Two knees, hand taser, baton backhand knockaway |16 /32 /57 /78;116f total |4+4+5+10 |
| Standing Attack ×4 | Baton, baton, wrist laser with three small pulses, advancing flying kick and landing |13 /16 /21+28+35 /25 within respective stages |6+7+6+11 |
| Drone burst/charge/missile/heal/flame | Raise wrist as checking time, press device, command hold, lower wrist through native recovery |Existing startup/active/recovery and costs retained |Existing mode/cost/damage rules retained |

Front-away rolling upward kick + drone missile and drone-assisted dodge retain their existing choreography and are excluded from the watch-command gesture. All moves remain original Urban Fracture implementations.

The four baton blows are0.6s apart. Each uses a24-pose authored arc, including distinct downswing angles, contact and follow-through, rather than three repeated endpoint poses. Other hero timelines have24 authored poses each. Five paired reaction atlases supply120 enemy poses; five victim motion atlases supply240 poses. Total new imported whole figures:528. They are selected on the existing60Hz action clock; this does not mean528 distinct drawings per second.

The existing40 Nightshade base/run/hit/air/throw/dodge poses were visually audited for an attached cyan wrist device. All contained one. Some poses show accents on both cuffs, so anatomical-left-only placement remains an artistic review point.

## Confirmed causes and corrections

- Prototype344 replaced the third combo stage with generic melee processing.346 restores the three wrist-laser pulses and pushback through native damage, with its beam origin calibrated to the authored wrist socket. A smoking cue lasts0.8s after laser contact.
-345's illustrated renderer mapped held enemies to one generic recoil pose.346 selects enemy-specific held, swept, falling, supine-clenched, prone, elbow-flinch and rising poses, plus authored victim vault and roll phases.
- Legacy paired-action protection could make the hero invulnerable while beating down a target.346 uses no protected grapple session for these actions. Ordinary unforced incoming damage interrupts the sweep and stops unexecuted blows. Cleanup removes only the owned hold/motion locks.
- Clean combo contacts now enforce a hitstun window covering the remaining active/recovery plus the next startup and a short sequential-input allowance. Hit reactions cancel vulnerable attacks; block and actual armor outcomes retain their native rules. No global AI/damage changes.
- Both participants use one action time, latched facing/plane and synchronized root samples. Complex rotations use complete authored figures, not distorted limb composites or rotation of a standing sprite. Independent released flight stays with the victim after hero interruption.
- Interrupted airborne vaults fall safely from their current elevation without awarding unearned throw damage. Released vaults retain their actual landing damage. Lethal deferred damage resolves without stranded victims.
- Grounded aftermath distinguishes supine from prone. A supine-looking candidate at the elbow contact was rejected; the ten enemy-specific prone head-flinch poses are used there. The baton backhand and flying-kick finishers retain falling poses before impact and native recovery.
- Each paired contact emits an impact and a short synthesized pain cue. Taser lines end before the final backhand. Ordinary damage uses brightness feedback, not armor effects.

## Shared owners preserved

Native Brawler clock/input, Energy316 costs/generation, Grab223 eligibility and heavy/boss resistance policy, Reactions298 interruption locks, Director148 three-point/two-commitment budget, and329 ballistic collision/landing remain authoritative. Armor is not removed from legitimate heavy/boss abilities. Whole atlases retain constant draw scale per character; the dedicated crouched baton sheet uses the sweep sheet's source density so crouching does not enlarge her.

## Files and reproducibility

- `dist/nightshade-combat346.js`: opt-in action timelines, contact latches, hitstun, interrupt/drop cleanup.
- `dist/nightshade-view346.js`, `nightshade-art346.js`, `assets/nightshade346/`: whole authored figure selection, anchors, wrist laser, smoke and taser visuals.
- `dist/nightshade-audio346.js`: short original synthesized groans; `game346.js` connects actual contact events.
- `dist/downtown346.html`, `game346.js`: isolated review entry, existing controller/UI retained, runtime choreography diagnostics.
- `source-art/nightshade346/`: immutable masters, rejected/raw candidates, pose maps and prompt/provenance notes.
- `tools/nightshade346/import.py`, `import-motion.py`: full connected-figure extraction; no nominal-cell clipping or per-pose body resizing. Companions have uniform source-density calibration.
- `tests/nightshade346.cjs`, `nightshade346-art.cjs`: registered critical native-runtime suites.
- `tools/nightshade346/render.cjs`, `video.py`, `build.py`: fixed-seed native-frame inspection and reproducible Downtown-only review packaging.

Rebuild: run both importers in order, the two346 suites, renderer, video generator, then build.py. The archive output only omits unsupported non-Downtown presentation assets; full editable campaign source remains in Git. Publication remains held by the project's existing release requirements.

## Tests and evidence

Final targeted checks:39,935 runtime assertions and90,377 art-selection assertions over11,260 paired simulation frames passed. Standard/raw Sony/DSX Reader tests dispatch the new combo and generate melee energy.

See `runtime.json`, `art-tests.json`, `render.json`, `video-method.json`, `regressions.json`, `package.json`, `asset-import.json` and `motion-import.json` for exact receipts. Runtime coverage includes all ten enemy families at30/60/120Hz, both directions, damage-once, lethal debt, attack lockout, native manual-grab input, interruptions and recovery. Art selection checks11,260 paired simulation frames, source bounds/anchors and fixed draw scale. Synthetic controller tests cover standard/raw Sony/DSX; no physical DualSense was available.

`rendered/*-contact-sheet.png` and `*-closeup.webp` show current native simulation poses. `video/Nightshade346-Native-Frames-{1x,0.5x,0.25x}.mp4` are silent enlarged frame captures, not claims of measured live-browser60FPS performance. Every source simulation frame was rendered. Groan playback requires the game with sound enabled.

Browser check: updated entry loaded, Marcus practice started, keyboard movement and a connected first baton strike reduced Marcus60→54. Actual browser diagnostics showed approximately115–120ms mean frame work and ~145–151ms p95, with severe RAF delays. Existing rendering/performance holds therefore remain unresolved; this browser cannot certify normal-speed feel. No gameplay script exception was observed in the inspected error log; unrelated extension metadata errors were present. The final asset/frame checks are separate from that browser observation.

## Remaining limits / untested

- Full canonical campaign QA and stable publication are not certified here. Existing UF-RENDER-025/027 and manual art/controller/balance holds remain.
- Physical DualSense USB/Bluetooth/DSX hardware and real speaker playback were not available.
- Art is authored whole-figure interpolation through24-pose timelines, not a 3D skeletal rig. Some cyan cuff accents are ambiguous; subtle source proportion/density variation remains (approximately5–8% in a few Marcus/Kevin victim poses). No per-frame resizing hides this variation.
- Grunts are synthesized original cues. Their event routing is implemented; subjective audio mixing needs playtest review.
- Paired frame selections, dimensions, anchors, complete figures and representative rendered output were inspected, including80 paired contact scenarios across the ten enemies in both directions. This does not certify every pixel of every pose or claim every legacy campaign move has been redrawn.
- Experimental foreign-weapon pickup remains disabled as in344/345; this task does not reopen that separate moveset.

Next: review the supplied move captures and local playtest, then address any specific pose/contact adjustment and the outstanding renderer performance gate before stable rollout.
