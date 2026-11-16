# Build 127 — Forest counters, locomotion and companion presentation

Reversible checkpoint: `checkpoint-before-forest-counters-127`, source `43191764cb05616aeb0dfa27ba07b5cf9db5c4fa` (published Build 126).

## Counter controls and tuning

`forest-counters127.js` loads after companion126. Neutral R1 selects punch uppercut/shot, kick sweep/shot, or melee weapon disarm. Forward R1 selects punch arm-trap/knife/front-kick or kick leg-catch/Gunner takedown. Choice and facing latch at activation. L1 blocking prevents activation. Backward horizontal input does not silently select a neutral counter.

| Sequence | Frames | Base damage | Defense |
| --- | ---: | ---: | ---: |
| Arm trap, two slashes, front kick | 62 | 46.8 | 30% |
| Crossbow uppercut, non-piercing shot | 70 | 52.2 | 35% |
| Leg catch, Gunner tackle, ground impact | 75, up to 8 additional sync frames | 45 | 35% |
| Knife sweep, crossbow shot | 68 | 50.4 | 40% |
| Disarm, boot, Gunner interception | 80, up to 8 additional sync frames | 41.4 | 50% |
| Solo disarm and boot | 58 | 30.6 | 50% |

All totals derive from the configurable 36-damage six-hit combo. Explicit per-hit budgets preserve fractional totals without hidden rounding inflation. Boss multiplier defaults to 65%, clamped to 60–75%; eligible bosses consume full defense. The engine's existing boss/strong classifications remain in use. Strong/boss health gate is 60%. Boss attacks require an explicit designation and cannot bypass committed boss armor, invulnerability or phase changes. Safe ordinary Jackal knife/rushing weapon attacks are explicitly designated; heavy/phase/AOE/anti-air/firearms/projectiles are excluded. Ordinary strong-enemy counters retain their capture exception to ordinary damage-taking armor, not boss protections.

Counter timing uses visible impact times, including multi-hit timing arrays: Easy10/Normal7/Hard5 frames. Failure costs 15% once with the existing 0.65s failed-attempt recovery. Success charges once, awards one 250 counter bonus, uses blue confirmation and major-impact hitstop, and delays regeneration until 1.5s after recovery. There is no extra successful-counter cooldown.

## Synchronization and disarm

All counters use Forest125's shared victim locks, deferred defeat and cleanup, with grounded wrist/forearm or captured-leg contacts. Enemy logical lanes stay fixed; no source-frame body resizing. Detailed limb rigs join the existing enemy artwork to Forest's contact anchors while keeping the supporting foot/body on the ground. Released opponents move independently through existing knockback/collision behavior. Normal Gunner leg counters add 0.5s knockdown; bosses retain native knockdown recovery.

Counter bolts use the existing Forest projectile path and prop collision, are non-piercing, have a 200-unit range and can hit only their selected victim once. They apply no release-time damage. Targets recoil clear of the muzzle before the shot. Failed shots cause no substitute automatic damage and release all locks.

Disarms reuse Reina's established weapon state, visible falling weapon effect, temporary boss rearm and weapon attack exclusion. Carmen retains taser behavior; Kevin and Frankie use their established unarmed rules. The original heroes' counter logic is unchanged.

Gunner must be active, uncommitted and physically reachable for the leg counter. Unavailable attempts spend only failed-attempt meter. Weapon counters choose their solo disarm variation if needed. Retrieval is canceled or the original carried item safely dropped; automatic cooldown timestamps stay unchanged. Committed protection/stun is not reset. A brief sync adjustment is bounded at eight frames, never a teleport or indefinite hold. Removed/dead/phase-changing targets, scene changes, interruptions and missed projectiles cleanly release locks and pending events.

## User-requested movement corrections

Forest/Gunner claim their render paths while artwork loads, suppressing the generic small placeholder actors. Gunner is consistently 32% larger in all states, including counters and locomotion, and spawns on the visible side when the trailing position would clip offscreen. This supersedes the attachment's original Gunner scale only because the user explicitly requested the increase while implementation was in progress.

Forest and Gunner have new four-frame walks and separate four-frame runs. Forest's phase comes from actual distance (140-unit walk /185-unit run cycle). Gunner's paws use actual traveled distance, including obstacle detours (105-unit walk /165-unit run). No alpha blending/ghosting. A loose horizontal leash, 42-unit deadband, short reaction delay and 55-unit lane tolerance prevent Gunner from mirroring every owner step or lane change; precise attack/protection/retrieval navigation remains separate.

Forest's first standing slash must contact an eligible enemy (including a physical guard contact) before stages 2–6 can chain. Whiffs discard the buffered follow-up and reset the next press to stage1. Other attacks and charge behavior remain intact.

## Artwork

Built-in ImageGen, referenced to the existing Forest/Gunner designs, produced `forest-counter127.png` (16 grounded counter poses), `forest-gait127.png` (4 walk +4 run poses), and `gunner-gait127.png` (4 walk +4 run poses). Crossbow handling art has an empty back harness while the weapon is held. Metadata uses one constant scale per source atlas and explicit foot, wrist and muzzle anchors. No generation image editing was done through Python; Python only measured alpha components and recorded import metadata.

## Verification

New suites: forest-counters127 (mirrored six variations, exact meter/damage, boss/strong gates, four disarms, real projectile contact/miss, bounded synchronization, stun/retrieval/phase/scene cleanup); forest-movement127 (startup render claim, larger Dog, independent leash, distinct distance-based gait frames, whiff reset); forest-counter-controller127 (live game input simulation, USB/rawSony/DSX R1 in both facings for all five counters).

Existing Forest/Gunner AI, original-three-hero A/B parity, gamepad recovery, scene controller, Nova DDT, Broxton/Flint combat, Uptown, grip transitions, Reina German/reap recovery, Reina weapon counters, Dragon Tail and sprite suites pass. Physical controller hardware was not available; controller checks are simulated.

Browser inspector: `forest-counters127.html`, frame-by-frame or 100%/50%/25% playback, both facings, seven enemy types, four weapons, walk and run. Browser QA checked gait footfalls, larger Dog, paired contact lanes and mirrored disarm completion with exactly 41.4 damage and two confirmed impacts.

Final lethal-hit verification adds twelve low-HP, mirrored cases across all six variations. It caught and fixed deferred defeat being rejected while a released target still had a native flight object. Counter cleanup now settles that debt through the engine's flight-enabled damage path, exactly once, without leaving a 1-HP enemy or stale locks. All twelve cases and the counter/controller/movement/companion/parity suites pass after the correction.
