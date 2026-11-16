# Urban Fracture — Build381 / Reina recording corrections

Reviewed the supplied41.57second recording, focusing on the18–29second grip/hip/suplex section and the sword-stance sequence afterward. This replaces the mixed neutral/locomotion presentation and completes the three requested stance attacks.

Checkpoint: `checkpoint-before-reina381`, published Build380 source `c7d7bed13bb3e04b282d64a6b46eda53fe211ab4`.

## Corrections

- One full-body Reina model now owns normal idle, walk, run, stance idle, stance walking, turn, draw and sheath. Native idle no longer alternates between older source families. A single148unit anatomical scale preserves normal/stance proportions, while crouching naturally lowers her head. Existing primary-blue material mapping, white blossom, long blue hair, sandals, armguards and scabbard identity are reused.
- Sword-stance head orientation stays aligned with the body and current movement. Horizontal movement initiates a dedicated turn before facing changes. The previous threat-facing retreat policy is superseded by the user's requested movement-facing rule. Stance movement remains70% speed and cannot run.
- A held enemy struck by Reina now enters its own native hurt presentation with a short waist-anchored recoil, rather than remaining in the restrained neutral pose. This preserves the actual grab owner and hit clock.
- Hip-throw presentation uses the same canonical body-size policy. Its source-family measurement includes the source-image-to-runtime frame ratio so cropped/resized artwork cannot accidentally enlarge the thrower.
- Reina's German suplex now uses the older `ReinaGerman123` full-body rig and existing `NeonGerman130Data` choreography, retaining the current Reina identity artwork. The later Grapples301 joint-pose override is removed only for her German suplex. Startup/lift/arch, release at43frames, impact at61frames, original90frame action,28damage and native recovery remain.
- Throw victim presentation now explicitly honors the native `waist123` / `waist118` attachment offsets. Some later enemy draw owners otherwise selected their own body pose before honoring those offsets. This placed the enemy's feet at a point meant for its waist. The new path draws the actual enemy identity relative to the correct waist while retaining native paired rotation, release and landing.

## Sword Stance attacks

| Input | Attack | Energy | Damage | Timing at60FPS |
|---|---|---:|---:|---|
| Square | Rising Diagonal Slash |10|14|11startup,5active;15hit /19block /23miss recovery|
| Away + Square | Spinning Retreat Sweep |20|12|16startup,7active;15frame spin/backstep overlaps recovery;18hit /22block /27miss recovery|
| Forward + Square | Crescent Cleaver |30|28|25startup,7active,12follow-through,18recovery,24sheath;86total|

Directions resolve relative to facing when the attack is accepted, and facing stays locked through committed attacks. Sweep backsteps70world units along a clear bounded route and ends facing its original direction. Cleaver steps40units forward, knocks down eligible ordinary enemies through native damage, and finishes its physical sheathing before returning to normal. Blade contact uses native hurtboxes, combat-plane checks, clear paths, armor, invulnerability and per-target hit sets. Enemy guarding retains protection and changes recovery. Hits cannot occur outside the active window.

Only the authoritative Energy316 resource is spent, once per accepted attack; insufficient energy does not borrow HP. Stance attacks generate no energy. R2 buffers one exit request during a committed attack; it cannot skip mandatory recovery. Below10energy, the next legal neutral boundary uses physical sheathing. All stance states and attacks remain cancellable by an actual hit, with native hurt/knockdown taking ownership. Normal Taekwondo, existing Triangle specials, counters, grabs and other heroes remain outside this alternate-state owner.

## Artwork and integration

Two new original48pose whole-body sheets were generated with the built-in image tool from Reina's approved identity reference. Source PNGs and exact prompts are retained in `source-art/reina381`. `tools/reina381/pack.py` registers them into padded384×256 runtime cells, with common anatomical sizing rather than scaling crouches to standing height. Assets: `dist/assets/reina381/loc.webp` and `att.webp`; runtime/data/draw owners: `dist/reina381.js`, `reina381-data.js`, `reina-view381.js`.

The existing stance controller delegates attack admission to the new shared native action owner. Both production entry points, fighter-render manifest and HUD text include the new modules. Superseded foundation art remains editable in source; its renderer is no longer loaded. The bounded deployment omits unused earlier stance and Ty Sly atlases while preserving their source originals.

## Verification and limits

`tests/reina381.cjs` passed204 assertions across30/60/120Hz and both facings: attack selection, energy/HP, active timing, exact damage, recovery, facing, whiffs, raw Square hold edges, buffered R2, hit cancellation, low-energy exit, movement-facing and restored native suplex ownership/clock/cleanup. The updated378 foundation suite passed2,249 assertions. Existing grip/throw, Reina269/270/279, grip input, Energy316, ally combat, transition/departure, gamepad and controller-recovery suites passed. Legacy378 input tests verify keyboard and simulated DualSense/raw Sony/DSX R2 edges; physical controller hardware remains untested.

Native render evidence uses current production controllers and the full current draw stack: `native-review.png`, `throw-review.png`, `native-corrections.mp4` and half/quarter-speed derivatives, plus `render.json`. It includes same-model idle/walk/run, held hit recoil, hip throw, restored suplex, all three sword attacks and stance movement. These are controlled native simulation captures, not browser capture or end-device performance certification. Artistic review and final stance-aware enemy AI tuning remain open; enemy behavior still obeys the existing native director and attack budgets.

The378 foundation regression was updated for the new movement-facing, stance-attack and low-energy-exit rules; the381 suite covers the new combat behavior. No claim of final full-game animation certification is made. Package verification checks exact source strings, required scripts, retained asset hashes and deployment size.
