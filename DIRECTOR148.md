# Smart Combat Director - Build148

Reversible checkpoint: `checkpoint-before-smart-director148` at Build147 /545ac827d1a3756e5a746bb9a03bdc44fd05d557.

## Integration
The existing Audit135 admission path remains the only encounter gate. `director148.js` supplies threat classification, requests, reservations, roles, observation and diagnostics through that path. Individual enemy controllers retain move selection, local movement, animation, damage, armor, defense, weapon/disarm states, recovery and phase scripts. No enemy HP, damage, resource costs or controller maps changed.

Normal baseline3 points, max2 simultaneous commitments. Costs: light1, grab1.5, heavy2, extended weapon string2, firearm/taser burst2, boss special3. Config is `NeonCombat.Director148.config`. Heavy/boss overlapping commitments cannot exceed the budget. Light supporting threats use.18s impact spacing; high threats retain.34s. No opposite-side pincer admission. An existing committed attack is never canceled because a cap changes.

Reservations follow the actual normalized attack clock, not just the requested timer. Multi-hit strings retain pressure through their final active window. Held continuations transfer the original reservation. Detached knives/taser probes and grenades retain it until their threat ends even if the owner dies. Stage/reset cleanup and12s fail-safe prevent leaked references. Recovery does not reserve attack pressure, but the same enemy still cannot restart during its action/recovery/cooldown. Deferral restores attack-cycle and special cooldown/selection flags so rejected attempts do not spend boss/unique abilities.

Existing firearm/financial enemy controllers now dispatch by enemy type on either route, allowing real Jesse/Leroy/Otis combinations in reusable fixtures without cloning their AI. No such enemies are added to existing level encounter plans. Shots keep their fixed aim line, ammo, audio/recoil and damage; ally-obstructed shots still fire/spend ammo but cannot pass through that ally to the hero. Requests also defer obstructed firing lanes.

## Roles and observations
Primary/Secondary attacker, Flanker, RangedSupport, Guarding, Repositioning and Recovering are assigned from actual commitments and encounter state. Waiting actors use bounded movement through the existing deferral path, keeping enemy-specific range preferences. The log route supplies a crossing waypoint. Committed actors, scripted Gunner ownership and Nova suppression are not reassigned or translated.

Six-second rolling observations mature after.45s. Actual visible combo openers, charge releases, jumps, aerial attacks, blitzes, connected grabs, counter attempts, blocked hits and missed heavy attacks feed probabilistic(.28 initial) preferences. No raw controller/keyboard input is read. Offscreen actors do not adapt. Existing eligible guards/grabs/flank tactics are preferred; no new enemy moves or armor are granted. Broxton grapple history and Nova aerial history modestly influence spacing. Forest companion targeting remains with Companion126's single-attacker/cooldown rules.

Anti-air has one shared episode claim, readable startup, state/range/lane checks and individual cooldowns. Bruno's3s rule remains. A shared probabilistic opportunity permits some jumps to pass without a new anti-air; observed repeated jumps increase that probability without guaranteeing it.

Three/five-second damage windows log total and locked-state damage. Low HP alone has no effect. Below30% HP plus a configured25%/35% spike dominated by locked-state damage can reduce NEW commitments for1.1s (8s retrigger cooldown). Existing attacks continue; no healing or invulnerability is added. This is a transparent heuristic for pressure, not proof that every logged hit was unavoidable.

## Special protection
Existing grapple ownership, attacker-first recovery, Exploding Nova's zero-damage suppression, Broxton powerbomb1.8/.65/.30 damage priority and mount interruption/cancel rules remain. The cancelable mount may receive its one readable melee threat. Existing downed-target body-splash/ground followups retain dedicated telegraphed eligibility and require an exclusive slot. Reloads, recovery rolls, phase switches and whistles remain utility behavior rather than attack costs.

## Developer tools
F8 adds current pressure/primary/secondary to the existing geometry overlay. F9 includes `director148` in its hidden dashboard and JSON export: budget/costs, reservations, actual threat times, role assignments, matured observations, damage windows, temporary relief, latest grant/defer reasons, target and Gunner ownership. CSV includes cost/category/reservation/budget/priority/distance/depth/granted columns. Reports remain local. `director148.html` uses the production simulation/art for selectable heroes, enemy groups, slow motion/frame stepping, scene previews, route QA and dashboard/export. It does not alter production controller bindings.

## Included scene repairs
- Removed the foreground stream's full-width white lines. Stream texture layers now use the same downward flow phase as the background stream; shoreline/foliage remain static; reduced motion disables displacement.
- Only the fallen log is traversable across the foreground water gap. Grounded movement cannot enter from an off-log lane; vertical movement is constrained on the log. Airborne/linked choreography is preserved. Enemy footwork and items use the crossing lane.
- After Deep Woods clears, the right-edge automatic transition is disabled. `GO ↑ WOODLAND LAB` points at the cabin entrance. The player must approach and press/move up; a short upward door walk precedes the existing fade into Storage. Other transitions remain.
- Masked workers now stand at447–455 on the actual lab floor, with measured pose soles and contact shadows. Fleeing has staggered starts, a displacement-based pose cycle and90-unit walking speed. Workers leave through the room edges before being marked exited; no mid-screen fade/pop.

## Validation
-`tests/director148.cjs`: category costs, conditional support, heavy exclusion, unchanged committed actions, recovery, detached/dead-owner projectiles, timeout, double grabs, ally obstruction/ammo, Gunner limit, held continuation, delayed/expired history, conditional relief, anti-air cooldowns, utility scripts and bounded reposition.
-`tests/director148-stress.cjs`:240 seeded12s fixtures, four heroes, both routes,10 solo/mixed compositions and passive/block/mixed responses. Actual reused ranged controllers included. All remained<=3 points and<=2 reservations, finite coordinates and integer scores. `DIRECTOR148-results.json` retains raw summaries.
-`tests/woods148.cjs`: all heroes, off-log water rejection, valid crossing/vertical bounds, jumps, upward-only entrance and visible approach, worker floor/speed.
-13 compatible legacy full-chain suites;72 simulated standard/raw/DSX hold fixtures;308 grapples;104 powerbomb and104 tackle cases. Reina counter fixture now starts its forced test strike with cooldown0 (AI already stubbed), rather than99, because recovery admission is now enforced.
-Browser reviewed actual Bruno/Flint requests/roles, clear log-only view without bars, upward cabin marker and workers on the floor.

No human difficulty certification, physical DualSense test or matched human before/after recording is claimed. Damage/health tuning remains unchanged; use exported multi-run evidence before further balance adjustments.
