# Build 210 — Carmen, Frankie and Bruno

Built on published Build 209 (`de26786a290696f008d4f70d1064ea14c619776c`). Reversible baseline: `checkpoint-before-enemies210`. The three uploaded design files are implemented through their supplied complete sections; each file ends mid-list. No missing continuation was invented.

## Integration

`dist/enemies210.js` holds character definitions, selection, geometry, per-contact timelines, cooldowns and diagnostics. AI dispatch stays inside existing status/Director wrappers in Audit135 and Quality167. Native actions, player damage, grabs,119 synchronized recovery,206 taser muzzle,198 grab rules,200 hit-pressure history and209 street enemies remain authoritative. The old101/102/147 timing overrides explicitly defer to210 definitions. The3-point /2-commitment Director reads the same `times210` used by collision and counters.

No HP or base-damage increases: Carmen65, Frankie73, standard Bruno115. Security192 and truck197 enforcers retain their own controllers. Native difficulty damage scaling remains in place.

## Carmen

Primary baton string: contacts at12/30/48 frames,4 active frames per strike,22 final recovery. Final hit staggers standing. A missed opener suppresses later hits and completes its recovery. Alternate baton strike, grounded accelerating dash,5sec sidestep, low-probability directional guard with vulnerable raise, finite feints and delayed aim, observable avoidance memory and temporary pressure-priority bursts.

Contact taser22/5/34 (startup/active/miss recovery),9sec cooldown; ranged28-frame preparation plus32-frame recovery,7sec cooldown. Delays add8–14frames to preparation without cutting recovery. Both share4sec exclusion and a single immediate taser threat. Native shock lasts .8sec contact/.6sec projectile; electrical retrigger protection lasts3sec after stun ends. Physical attacks remain valid. New baton pressure waits for a defensive action opportunity after electrical stun.

Two actual avoided shots at comparable spacing inside12sec change selection toward approaches. No input reading. Real projectile ownership, lane and trajectory persist; measured206 hand muzzle and solid obstruction remain correct. Feints do not create probes or shock.

Wake sweep: separate10-frame decision beat,19 startup/5 active/30 recovery,22.5% eligible roll.119 keeps the victim grounded until owner completion, retaining longer existing durations. Minimum grounded values: ordinary .55sec, standard throw .85sec, heavy1.10sec. `wakeAllowed` is reusable and requires .3sec of owner defensive actionability before this enemy's sweep can connect. It adds no hero invulnerability and does not suppress unrelated enemies.

## Frankie

Lash24/7/32;16 base damage; standing16-frame recoil. Sweep29/8/38;18 base damage; clean knockdown;12-frame block reaction; guard drain125% of Lash. The low chain physically misses a correctly timed jump. Distance and depth matter. Both have fixed-facing actual chain-segment contacts, one damage event,2/3sec cooldowns. Occasional6–12frame delays preserve recovery.

Close Chain Punch14/4/22 remains standing; Front Kick21/6/30 creates space and clean knockdown, with brief damage-taking light armor only around contact. Rising Chain17/6/31 is unarmored and Director-admitted after observable airborne approach. No unconditional anti-air immunity. Preferred range weighting varies around55/45 by observed stationary/blocking/moving/airborne/engaged behavior. Finite step/feint decisions never increase locomotion speed. Engaged opponents increase positioning priority at .5–.8sec evaluations. Feints have8–12sec cooldowns, no hitbox and no instantaneous follow-up.

## Bruno

Three-hit string20/35/50-frame contacts,6 active frames each,32 recovery;11/11/13 base damage. Missed opener does not continue.3.5sec cooldown after completion. Weighted close choices50 combo/20 kick/20 eligible punish powerbomb/10 reposition, after eligibility filtering. Powerbomb is a genuine punish choice,26 startup/6 active/37 miss recovery,8sec cooldown, vulnerable initial reach. The successful capture retains native119 protection, one31-base slam, continuous victim anchors and native-scale illustrated arm segments. No whole-sprite scaling.

First punch has no armor; second contact has light armor; third has late heavy armor. Brief contact armor on kick/uppercut/retaliation, never recovery. Wake armor lasts1sec and takes damage. Valid armor hits produce a restrained metallic spark/sound. Existing armor-breaking and counter rules are preserved. Anti-mash response uses200's3 confirmed hits/4sec memory, acts only from an actionable observed new string, raises guard for8 vulnerable frames, then guards .5sec;5sec cooldown. It never clears an in-progress confirmed combo's stun. Repeated guarded pressure can request a20-frame heavy hook with6sec retaliation cooldown.

## Diagnostics and review

`Audit135.report(game).enemies210` includes actions, frames, contacts, geometry, cooldowns, armor tiers/windows/absorbed HP damage, anti-mash history, retaliation timer, wake fairness time, avoided shots and admission denials. `video207.html` exposes staged attack, capture, chain, taser and mixed-group scenes with frame stepping/playback.

The old rooftop201 inspection page now loads shared current game markup instead of shipping a stale40KB copy. Its controls/lab remain present. This frees deploy capacity without recompressing any active art.

## Validation

- `tests/enemies210.cjs`: explicit frame/damage/plane contracts, missed strings, standing vs knockdown reactions, jump/sweep avoidance, actual shock immunity, one taser threat, finite feints/avoidance memory,12 mirrored six-hero successful powerbombs, one slam per capture, guard startup/rear bypass, retained Forest/Niko/Reina counter eligibility, variant exclusions.
- `tests/enemies210-groups.cjs`:60 seeded mixed/solo encounters,6heroes,20sec each. At most3 pressure points and2 commitments; finite movement; real attacks occur. Static-target selections yield roughly equal Lash/Sweep and primary combo/kick prevalence. These are controlled checks, not a substitute for long-form balance playtesting.
- `tests/current150.cjs`:26 established suites pass.
-209 mixed-group,208 Flint,206 taser and181 shield regressions pass separately.
- Browser visual review covers native actor proportions, powerbomb attachment, chain height and standing baton finishes, with current production modules.

Normal balance remains tunable in the explicit definitions and cooldown configuration. Long-term encounter difficulty still merits playtesting with players.

Final integration checks also cover actual Human Shield interception with210 melee timelines: the captive consumes exactly one contact, without leaking duplicate damage to Broxton. Native reinforcement/door/lift entry controllers run before the new combat dispatch. Manual keyboard play verified the current main game, including Carmen approach, damage, grab and pause. Controller mapping/regression checks passed. A saved visual review is in `reports210/visual-review.jpg`.
