# Nightshade Gate6 — Playtest263

Checkpoint `checkpoint-before-nightshade263` at `37268c8dacfd7baca088fc8a23f5490151ceb510` (Playtest262). User authorized the next gate. Scope follows master Phase42; stop before Gate7 counters. Approved144logical presentation,110HP, foundation gait, normal gun, finite ammo ledger, melee/poison, all five grabs and shared systems retained.

## Existing systems retained

Native core action clock and completion, Charge130 input edges, Gun255 sole bullet simulation,119 synchronization/recovery,223 contested grabs/anti-regrab,222 camera/arena bounds, Orion205 resistance/diminishing electrical immunity, damage169 hooks and existing controller mappings. No new AI, physics, input, projectile or weather controller. `nightshade-special263.js` adds character move selection/choreography and finite ground devices. Barrage bullets extend Gun255 ordered swept collision with per-bullet target sets.

| Input | Move | Startup / active / recovery at60FPS | Effect |
|---|---|---|---|
| Forward, forward + Attack | Running Arc Kick |22 /25travel including final7contact /36|180unit advance,22damage once per contacted enemy; point-blank targets can be missed; vulnerable startup/recovery and eligible airborne frames |
| Neutral Special | Dual Ground Tasers |24 /8throw /36recovery|Two side devices visibly arc for18frames, arm30frames after landing, expire180frames after arming; maximum two active devices; each discharges once for2damage plus native resisted electric stun |
| Forward + Special | Piercing Power Barrage |28 /3–6shots at8frame intervals /46|Requires3rounds; reserves/consumes all loaded ammunition on commitment;16first/12subsequent per bullet, no duplicate contact, valid lane and tall solid cover |
| Grab + Special | Attached Explosive |20attach /16kick /20delay /6explosion /38recovery|6kick+58primaryblast;18nearby damage within115horizontal/32lane radius; native valid hold/Heavy contest; synchronized release and deferred lethal damage |
| Dodge | Ground Roll |4 /14 /12|112unit retreat,25defense,2s cooldown; evasion only in travel; no damage/firing/attack during commitment |

The master gives qualitative damage and no new special HP costs. Initial tuning uses existing class conventions:12HPtasers,18HPbarrage,20HPexplosive; cannot activate at or below cost. Specials remain interruptible except the confirmed synchronized explosive portion through detonation; mandatory recovery remains vulnerable. Arc and roll obey active arena bounds. Devices and pending effects clear on transitions/reset. No global immunity is added.

## Art

One new12pose transparent source atlas in art-source263/specials.png. Standing calibration sets one import scale for all poses; original approved144/123 presentation multiplier retained. Whole bodies, original costumes, no detached-limb rigs or per-pose resizing. Original source and importer retained. New art is review-required, never an approved screenshot baseline. Reports include exact prompt and import metadata. Runtime procedural device/impact effects follow existing canvas FX style and do not flash the whole screen.

## Verification and limits

Targeted runtime suite covers30/60/120Hz, both facings, actual double-tap, finite cleanup, exact ammo, contact/radius/lane/cover, startup/recovery vulnerability, dodge cost/cooldown, shared electrical expiry, native119/223 heavy success/failure and interrupted/lethal grabs. Native game.js keyboard and simulated standard/rawSony/DSX input exercise selection. View suite traverses all poses, fixed source scale and aspect. Existing257–262 regressions and frozenQA242 profiles remain required.

Browser checks are controlled native-action scenarios with AI disabled, not human balance or a complete level playthrough. Physical DualSense hardware, broad all-enemy specialist visuals, artistic approval, approved screenshot comparisons and exhaustive move coverage remain separate. No stable label or Gate7 completion.

Rollback: restore the checkpoint commit or redeploy saved262version `appgprj_6adb9b94a3788191809a764c3e7bbb37~appgver_9bd11a06e13481918a3109e0303c4ec7`, preserving owner-private audience.
