# Orion walking orientation and locomotion transitions

ORION-001 follow-up to the motion/get-up repair. The old dedicated right-facing walk used a camera-facing torso. The replacement binds16 retained whole-body side-facing poses from the original approved motion source: right0–7, independently authored left24–31. The original PNG, costume, anatomy, hood, half-coat, mechanical right side, colors and red optic are unchanged. No mirrored anatomy or new artwork is used. An attempted generated alternative was rejected by the image service and is not part of this repair.

The fixed walk-family import scale is calibrated once to the existing128-unit standing-height reference; individual poses are never stretched or height-normalized. Source rectangles come from the reviewed motion layout. Visible hand sockets are explicitly calibrated for all16 poses and validated against source alpha, including carried-weapon walking.

`visualMotion385` and `visualGait384` are presentation-only fields. Starts, travel-mode changes and turns reset to the first complete gait pose. Loops still advance from actual displacement with the existing92/165 distance strides. Blocked motion and teleports do not animate a false stride. Native braking remains authoritative; below the existing90 speed threshold the recovered rising poses provide intermediate steps back to standing, selected by actual deceleration rather than an added gameplay clock. Existing idle, booster, action, weapon, jump, hold and recoil ownership is retained. No alpha crossfade, torso/leg compositing, collision change or new movement controller is added.

Damage, energy, action timing, walk135/run285 speeds, acceleration570/braking760 and all other combat configuration remain unchanged. The regression compares the complete native player state (excluding presentation receipt fields only) against the retained pre-repair presentation over9 seconds each at30/60/120Hz. Both facing cycles, turn entry, blockers, teleports, boost launch/loop/brake and action priority have separate checks.

Reproduce with the existing QA242 dependencies:

```
python tools/orion384/pack_walk.py
python tests/orion385-walk.py
node --test tests/orion385-locomotion.cjs
```

The full384 importer invokes the same retained-art walk binding after other families. Its motion-only mode preserves the selected walk binding. The original get-up source/crops/scales/order are unchanged and the previous regression remains required.

The published Site already consumes Build384; its current renderer receives the update. The older GitHub production entry still uses205/271. The GitHub draft preserves the recovered current-presentation changes and tests without activating unrelated later hero work. The source archive is the pre-repair384 presentation/metadata, not a newly approved gameplay baseline.

Native phase/contact sheets are review evidence, not artistic approval. Remaining Orion combat, effects, counter, R2, neck-hold and weapon-impact findings remain separate. No full-game/hardware/performance certification, merge, branch-protection change or owner signoff is included.
