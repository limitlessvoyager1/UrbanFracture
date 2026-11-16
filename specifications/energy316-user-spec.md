> User override: “Also incorporate these energy meter rules except maintain current blocking rules.” Existing block eligibility, costs, chip and guard-break behavior take precedence over the document’s proposed blocking changes.

# URBAN FRACTURE — AGGRESSION-BASED ENERGY METER SYSTEM
## Complete ChatGPT Work Implementation Specification
### Energy Generation, Defensive Costs, Specials, HP Overflow, Pickups, and Balance Testing

---

# PRIMARY OBJECTIVE

Replace the previous Defense Meter resource behavior with a unified, aggression-based Energy Meter system.

The Energy Meter has already been renamed in the game. Preserve that change.

The new system must reward active combat rather than passive waiting.

Players generate energy through successful attacks, throws, and other qualifying combat actions.

Energy is spent on defensive abilities and special attacks.

If a player activates an eligible special without enough energy, the remaining energy cost is converted into an HP cost at a 50% conversion rate.

Implement this as a shared system inherited by all current and future playable heroes.

Do not individually duplicate energy-management logic for each character.

Preserve the existing combat engine, character movesets, AI Director, animation system, and approved damage values.

Create a recoverable checkpoint before implementation.

---

# PHASE 1 — AUDIT THE EXISTING RESOURCE SYSTEM

Inspect:

- Existing Energy Meter implementation.
- Previous Defense Meter references.
- Energy capacity.
- Regeneration logic.
- Blocking costs.
- Dodge costs.
- Counter costs.
- Special costs.
- Health-consuming special logic.
- Character-specific resource modifiers.
- HUD rendering.
- Save/load handling.
- Developer Panel controls.
- Item pickup architecture.

Identify every system that reads or modifies the meter.

### Requirements

Do not create a second competing energy meter.

Do not leave old passive regeneration active.

Do not break existing character abilities.

Preserve approved combat values until the new configuration has been tested.

### Deliverable

Provide an audit identifying the relevant files, resource functions, and any compatibility risks.

---

# PHASE 2 — CENTRALIZED ENERGY CONTROLLER

Implement or extend one shared Energy Controller.

### Responsibilities

- Track current energy.
- Track maximum energy.
- Validate resource costs.
- Spend energy.
- Generate energy.
- Apply special HP overflow.
- Process energy pickups.
- Notify the HUD.
- Support temporary developer overrides.
- Preserve resource state through scene transitions.
- Support save/load.
- Prevent duplicate resource events.

### Default capacity

Use a normalized maximum of 100 energy points for initial testing.

Do not overwrite established character-specific maximums without approval.

### Critical requirement

All energy changes must pass through the shared controller.

Individual moves must not directly manipulate the HUD or bypass resource validation.

---

# PHASE 3 — REMOVE PASSIVE REGENERATION

Disable automatic time-based energy regeneration during ordinary gameplay.

Energy must not increase merely because the player:

- Waits.
- Walks.
- Runs.
- Jumps.
- Blocks without receiving an attack.
- Stands idle.
- Retreats from enemies.
- Pauses the game.

### Important

Energy can still increase through:

- Qualifying successful attacks.
- Successful throws.
- Successful counters.
- Energy pickups.
- Explicit scripted mission rewards.
- Developer testing overrides.

Remove or disable obsolete regeneration timers without breaking other cooldown systems.

---

# PHASE 4 — ENERGY GENERATION FROM COMBAT

Award energy for successful, qualifying combat actions.

### Initial proposed values

| Action | Energy gained |
|---|---:|
| Light attack hit | +3 |
| Medium attack hit | +5 |
| Heavy attack hit | +7 |
| Combo finisher | +10 |
| Successful throw | +12 |
| Successful counter | +8 |
| Normal attack blocked by enemy | +1 |
| Special attack hit | +0 |

These are initial balancing values, not permanent mandatory values.

Expose them in the Developer Panel.

### Important

Combo-finisher rewards replace the ordinary hit reward for that finishing strike.

Do not stack both rewards automatically.

### Successful hit definition

A qualifying hit must:

1. Connect with a valid target.
2. Pass collision validation.
3. Resolve as a legitimate damaging or otherwise qualifying combat event.
4. Be registered only once for the same hit event.
5. Occur while the target is in a valid state.

### Requirements

- Missed attacks generate no energy.
- Invulnerable targets generate no energy.
- Defeated enemies generate no energy.
- Ordinary hits against completely protected targets generate no energy.
- Special attacks do not normally replenish their own cost.
- Repeated collision checks must not award duplicate energy.

---

# PHASE 5 — ENERGY GENERATION CLASSIFICATION

Add an explicit energy-generation classification to registered moves.

Suggested categories:

- LIGHT
- MEDIUM
- HEAVY
- COMBO_FINISHER
- THROW
- COUNTER
- SPECIAL
- NONE

Do not infer rewards solely from visual effects or animation names.

### Multi-hit attacks

Each legitimate hit may qualify according to the move's configuration.

However, prevent unusually long combos from generating excessive energy.

### Multi-target attacks

Avoid awarding full energy for every target struck by large area attacks.

Use configurable caps where appropriate.

### Continuous hitboxes

A sustained hitbox must not generate energy every simulation frame.

Use unique hit-event identifiers or equivalent safeguards.

---

# PHASE 6 — ENERGY COSTS

Use the following initial values for testing.

| Action | Energy cost |
|---|---:|
| Normal attacks | 0 |
| Walking/running | 0 |
| Jumping | 0 |
| Successful block | 3–6 |
| Dodge | 10 |
| Standard counter | 15 |
| Weapon counter | 20 |
| Standard special | 20 |
| Powerful special | 30 |
| Grab special | 25 |
| Blitz | 0 initially |

### Important

These are provisional balance values.

Preserve character-specific costs where already approved unless explicitly changed.

The Developer Panel must allow temporary adjustment.

---

# PHASE 7 — BLOCKING BEHAVIOR

Blocking consumes energy when an incoming attack is successfully blocked.

Do not continuously drain energy merely because the player holds Block.

### Normal blocking

- Validate the incoming attack.
- Apply the appropriate block reaction.
- Spend the configured energy.
- Apply existing chip damage rules.
- Apply appropriate pushback.
- Display block feedback.

### Low-energy blocking

At insufficient energy, basic blocking must remain available.

Use a weakened guard state.

Suggested behavior:

- Reduced damage mitigation.
- Increased vulnerability to guard break.
- No advanced counter availability without required energy.

### Important

Do not allow a depleted meter to make the player completely defenseless.

Preserve unblockable attacks and existing block restrictions.

---

# PHASE 8 — DODGES AND COUNTERS

Advanced dodges and counters require sufficient energy.

### Dodges

- Validate the energy cost.
- Validate cooldown.
- Validate action eligibility.
- Spend energy on successful activation.
- Execute the dodge.
- Preserve existing invulnerability and recovery rules.

### Counters

- Validate energy.
- Validate counter timing.
- Validate the incoming attack.
- Spend energy only when the counter enters its defined committed state.
- Execute the counter.
- Award the configured successful-counter energy reward after successful resolution.

### Important

Prevent resource deductions for rejected inputs.

Do not allow counter rewards to generate an unintended infinite loop.

---

# PHASE 9 — SPECIAL ATTACK ENERGY COSTS

Standard specials consume energy.

When sufficient energy is available:

- Deduct the full energy cost.
- Deduct no HP for resource overflow.
- Execute the special normally.

When insufficient energy is available:

- Spend the available energy.
- Convert the shortfall into HP cost.
- Execute the special if valid.

### Formula

Energy shortfall = Maximum of zero and:

Special Energy Cost − Current Energy

HP Overflow Cost = Ceiling(Energy Shortfall × 0.5)

### Example

Special cost: 25 energy.

Available energy: 15.

Energy spent: 15.

Shortfall: 10.

HP spent: 5.

### Critical requirement

The conversion rate is **50%**.

Do not use a 1:1 conversion.

---

# PHASE 10 — HP OVERFLOW SAFEGUARDS

HP overflow applies only to eligible special attacks.

It does not apply to:

- Ordinary blocking.
- Standard dodges.
- Standard counters.
- Running.
- Jumping.
- Ordinary attacks.

### Minimum HP

By default, HP overflow cannot reduce the hero below 1 HP.

If the calculated HP cost would reduce HP below 1, reject the special.

Do not silently discount its cost to permit execution.

### Requirements

- Validate energy and HP before activating.
- Deduct costs atomically.
- Prevent double deductions.
- Do not charge rejected moves.
- Do not deduct resources again on individual special hit events.
- Do not retroactively refund costs unless the move explicitly permits it.
- Preserve existing special cooldowns.

### Important

Special attacks should remain available at low energy when sufficient HP exists.

---

# PHASE 11 — RESOURCE SPENDING TIMING

Define the exact resource commitment point for each action.

Examples:

- Special: On valid activation.
- Dodge: On successful dodge-state entry.
- Counter: On valid counter commitment.
- Block: When a block successfully resolves.

### Interrupted actions

Do not automatically refund committed resources when an attack is interrupted.

Preserve any existing move-specific refund rules.

### Critical requirement

Never charge energy for an input that the game rejects before activation.

---

# PHASE 12 — HERO-SPECIFIC ENERGY BEHAVIOR

Apply the shared Energy Controller to all implemented heroes.

## Reina

- Standard combos generate energy.
- Kicks generate energy according to hit classification.
- Throws generate energy.
- Sword specials consume energy.
- Eligible sword specials use HP overflow.
- Counters require energy.

## Broxton

- Heavy strikes generate energy.
- Successful throws generate energy.
- Grab specials consume energy.
- Iron Will retains its established cooldown and armor behavior.
- Do not accidentally shorten Iron Will's cooldown through energy mechanics.

## Skylar Nova

- Standard attacks generate energy.
- Successful aerial attacks generate energy.
- Throws generate energy.
- Exploding Nova consumes energy.
- Prevent multi-target energy farming.

## Forest & Gunner

- Forest's knife and crossbow attacks generate energy.
- Forest's specials consume energy.
- Gunner's autonomous attacks initially generate no energy.
- Gunner's behavior modes remain functional.
- Manual coordinated attacks may generate energy only when explicitly configured.

## Niko

- Standard attacks generate energy.
- Successful counters generate energy.
- Counter energy costs remain configurable.
- Injury and concussion debuffs remain functional.
- Prevent counter reward loops.

## Orion

- Melee attacks generate energy.
- Electrical specials consume energy.
- Eligible specials use HP overflow.
- System Repair remains once per life.
- System Repair must not use HP overflow.
- Prevent resource loops involving healing.

## Special Agent Nightshade

- Melee attacks generate energy.
- Gadget specials consume energy.
- Ordinary firearm ammunition remains separate.
- Gunfire energy rewards should initially be reduced or disabled.
- Preserve firearm reload and ammunition rules when implemented.

### Important

Do not invent unimplemented moves.

Apply the system to actual registered abilities.

---

# PHASE 13 — ENERGY PICKUPS

Create three energy-restoring pickup categories.

### Small Energy Cell

Restores 15 energy.

### Energy Battery

Restores 35 energy.

### Energy Canister

Restores 60 energy.

### Requirements

- Consistent Urban Fracture art style.
- Appropriate world scale.
- Clear pickup identity.
- Correct ground anchoring.
- No transparency defects.
- No floating.
- No collision problems.
- No duplicate collection.

### HUD feedback

Display a brief energy-restoration effect when collected.

Do not obscure gameplay.

---

# PHASE 14 — ENEMY ENERGY DROPS

Allow eligible enemies to occasionally drop energy-restoring items.

### Requirements

- Use the existing item-drop system.
- Do not create a competing drop controller.
- Preserve existing health and weapon drops.
- Respect enemy-specific drop tables.
- Prevent duplicate drops.
- Prevent excessive farming.
- Support deterministic testing with random seeds.

### Suggested approach

Start with low drop probabilities.

Adjust based on gameplay testing rather than immediately making energy pickups common.

### Important

Boss encounters must remain winnable without relying on random energy drops.

---

# PHASE 15 — LEVEL ENERGY PICKUPS

Allow energy pickups to appear in:

- Appropriate destructible objects.
- Hidden areas.
- Optional routes.
- Selected difficult encounters.
- Scripted mission rewards.

### Requirements

- Integrate with existing level item placement.
- Do not overwrite existing health pickups.
- Do not place items inside solid geometry.
- Do not place pickups outside reachable combat areas.
- Do not block level progression.

### Branching paths

Optional routes may reward exploration with energy pickups.

However, the main route must remain playable without requiring those rewards.

---

# PHASE 16 — ANTI-EXPLOIT PROTECTION

Prevent energy farming through:

- Repeated hitbox overlap.
- Defeated enemies.
- Invulnerable enemies.
- Non-damaging armor contacts.
- Infinite light-hit loops.
- Continuous projectiles.
- Multi-target special attacks.
- Repeated blocked attacks.
- Summoned or respawning enemies.
- Gunner autonomous attacks.

### Requirements

- Award energy once per valid hit event.
- Track repeated-hit eligibility.
- Apply reasonable per-move caps.
- Apply per-target caps where necessary.
- Preserve legitimate combo rewards.
- Do not penalize normal skilled play.

### Important

Anti-exploit protections must not silently remove energy from ordinary successful attacks.

Expose energy-award reasons in developer diagnostics.

---

# PHASE 17 — ENERGY HUD

Preserve the existing Energy Meter's placement and appearance unless changes are required for readability.

### Required feedback

Display:

- Current energy.
- Maximum energy.
- Energy gain.
- Energy spending.
- Insufficient energy.
- HP overflow activation.
- Energy pickup restoration.

### HP overflow cue

When a special consumes HP:

- Briefly pulse the HP bar.
- Display the HP cost.
- Show a distinct resource-spend effect.
- Preserve normal combat visibility.

### Important

Do not display an armor flash when HP overflow occurs.

---

# PHASE 18 — ENERGY BETWEEN ENCOUNTERS

Preserve remaining energy during ordinary level progression.

Do not automatically refill energy after every enemy wave.

### New level or major mission

Initially test a minimum starting energy value of 40 points.

If the hero has more than 40 energy, preserve the higher amount.

If the hero has less than 40, raise it to 40.

### Important

This is a proposed starting policy.

Expose it as a configurable campaign rule.

Do not permanently implement it without testing.

---

# PHASE 19 — BOSS ENCOUNTER FAIRNESS

Test the system against heavy enemies and bosses.

### Requirements

- Bosses retain legitimate punish windows.
- Ordinary attacks can generate energy.
- Players are not forced to rely on random pickups.
- Basic blocking remains possible at zero energy.
- Specials can use HP overflow when eligible.
- Boss armor does not create unlimited energy opportunities.
- No special-spam loops.

### Important

Do not reduce boss HP or damage merely to compensate for the new energy economy.

---

# PHASE 20 — DEVELOPER PANEL INTEGRATION

Add an Energy System tab to the Developer Panel.

### Display

- Current energy.
- Maximum energy.
- Energy gained per action.
- Energy spent per action.
- HP overflow cost.
- Energy source.
- Energy event history.
- Pickup collection history.
- Resource validation failures.

### Editable settings

- Maximum energy.
- Light-hit gain.
- Medium-hit gain.
- Heavy-hit gain.
- Combo-finisher gain.
- Throw gain.
- Counter gain.
- Block gain.
- Dodge cost.
- Counter cost.
- Special cost.
- Grab-special cost.
- HP overflow conversion rate.
- Pickup restoration amounts.
- Enemy drop probabilities.
- Starting energy policy.

### Required restoration controls

- Reset Individual Value.
- Reset Selected Move.
- Reset Selected Character.
- Reset Energy Subsystem.
- Reset All Experimental Changes.
- Undo.
- Redo.

### Important

Temporary developer overrides must remain separate from approved game data.

---

# PHASE 21 — ENERGY EVENT DIAGNOSTICS

Create a live Energy Event Log.

For every energy change, record:

- Simulation frame.
- Character.
- Action.
- Move ID.
- Target ID.
- Energy before.
- Energy change.
- Energy after.
- HP overflow cost.
- Event result.
- Rejection reason.

### Example

Frame 1200:

Reina lands a medium kick.

Energy: 35 → 40.

Reason: Valid medium attack hit.

Frame 1260:

Reina activates a 25-energy sword special.

Energy: 10 → 0.

HP: 100 → 92.

Reason: 15-energy shortfall converted to 8 HP.

### Important

All logged events must reflect actual runtime values.

---

# PHASE 22 — AUTOMATED TESTS

Create repeatable tests for:

1. No passive regeneration.
2. Light-hit energy gain.
3. Medium-hit energy gain.
4. Heavy-hit energy gain.
5. Combo-finisher reward.
6. Throw reward.
7. Counter reward.
8. Block reward.
9. Special energy spending.
10. HP overflow conversion.
11. HP minimum protection.
12. Rejected-action cost protection.
13. Duplicate-hit prevention.
14. Multi-target energy caps.
15. Enemy pickup drops.
16. Level pickup collection.
17. Maximum-energy clamping.
18. Save/load persistence.
19. Scene-transition persistence.
20. Developer override restoration.
21. Hero-specific special rules.
22. Boss encounter fairness.
23. Forest and Gunner interaction.
24. Orion System Repair interaction.
25. Normal difficulty combat balance.

---

# PHASE 23 — BALANCE TESTING

Test the following heroes:

- Reina.
- Niko.
- Orion.

Test against:

- Marcus.
- Bruno.
- One implemented boss.

### Record

- Energy generated per minute.
- Energy spent per minute.
- Number of specials used.
- Number of counters used.
- Number of dodges used.
- Number of blocks.
- Time spent at zero energy.
- HP spent through overflow.
- Energy pickup frequency.
- Average encounter duration.
- Damage taken.
- Combat completion rate.

### Important

Compare against the previous energy/health system using equivalent encounter conditions.

Do not claim the new system is balanced solely because it functions.

---

# PHASE 24 — IMPLEMENTATION GATES

Do not implement the entire specification in one unverified task.

## Gate 1 — Audit and Architecture

Inspect the existing resource system.

Create checkpoint.

Confirm compatibility.

## Gate 2 — Energy Generation

Disable passive regeneration.

Implement attack-based energy rewards.

Verify event deduplication.

## Gate 3 — Energy Spending

Implement blocking, dodge, counter, and special costs.

Preserve existing combat timing.

## Gate 4 — HP Overflow

Implement 50% conversion.

Add HP safeguards.

Test resource validation.

## Gate 5 — Hero Integration

Apply to all implemented heroes.

Preserve unique abilities.

## Gate 6 — Pickups

Implement energy-restoring items.

Integrate enemy drops and level placement.

## Gate 7 — HUD and Developer Panel

Add resource feedback.

Add diagnostics.

Add reversible tuning.

## Gate 8 — Regression and Balance

Run automated tests.

Run playable encounters.

Compare against baseline.

Produce QA report.

### Critical requirement

Complete and verify each gate before beginning the next.

Do not silently skip requirements.

---

# FINAL ACCEPTANCE CRITERIA

The system is complete when:

1. Energy does not regenerate passively.
2. Qualifying attacks generate energy.
3. Energy gain matches registered move classifications.
4. Duplicate hits do not generate duplicate energy.
5. Normal attacks remain free.
6. Basic movement remains free.
7. Blocking consumes energy appropriately.
8. Basic blocking remains available at zero energy.
9. Advanced dodges require energy.
10. Counters require energy.
11. Specials consume energy first.
12. Insufficient energy converts to HP at 50%.
13. HP overflow cannot reduce HP below 1.
14. Rejected actions do not consume resources.
15. Existing hero abilities remain functional.
16. Gunner cannot passively farm energy.
17. Orion cannot exploit System Repair.
18. Energy pickups restore the correct amounts.
19. Enemy drops use valid drop tables.
20. Level pickups are reachable.
21. Energy persists correctly across encounters.
22. The HUD displays accurate resource changes.
23. Developer diagnostics show actual energy events.
24. Temporary changes can be restored to defaults.
25. Boss encounters remain fair.
26. No major special-spam exploit exists.
27. All relevant automated tests pass.
28. The previous build remains recoverable.

---

# FINAL DESIGN GOAL

Create an energy economy that rewards aggression, skillful combat, and tactical resource management.

Players should earn energy by engaging enemies and spend it on advanced defensive actions and powerful specials.

When energy is insufficient, eligible specials can still be performed by sacrificing HP at a 50% conversion rate.

Energy pickups provide additional strategic rewards for combat and exploration.

**The system should encourage players to fight actively without allowing unlimited special attacks, passive energy farming, or unavoidable defensive helplessness.**
