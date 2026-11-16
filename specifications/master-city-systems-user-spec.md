# URBAN FRACTURE — MASTER ITEMS, PROMPTDROP SMARTPHONE, PRIME CITY MAP & LIVING CITY SYSTEMS
## Complete Revised Implementation Instructions for ChatGPT Work

### PRIMARY OBJECTIVE

Create a unified system connecting:

1. Master item registry and loot.
2. Wallet and combat score.
3. One-item reserve inventory.
4. Prime City smartphone.
5. PromptDrop delivery service.
6. Astro-Call hero replacement.
7. Reina's home headquarters.
8. Living City Director.
9. Hero messages and item-cache discoveries.
10. Discreet new-message notifications.
11. Prime City Pulse social newsfeed.
12. Illustrated, interactive Prime City Map.

These features must integrate with the existing Urban Fracture game rather than operate as disconnected menus.

**Do not implement the character relationship system yet.** Relationships, loyalty missions, relationship-based stat modifiers, and relationship penalties are reserved for a future update.

Preserve existing combat, animation, weather, encounter, mission, progression, and save systems.

Create a recoverable checkpoint before implementation.

Work through the gates in order. Do not implement the entire specification in one unverified task.

---

# GATE 1 — PROJECT AUDIT AND MASTER ITEM REGISTRY

## 1.1 Audit

Inspect the existing:

- Loot Director.
- Item registry.
- Destructible-object drops.
- Enemy drop tables.
- Health and energy controllers.
- Lives system.
- Score system.
- Wallet or currency system.
- Inventory system.
- Pause menu.
- Controller mappings.
- Scene/level registry.
- Level-transition graph.
- Save/load system.
- Developer Panel.

Identify reusable systems before creating new controllers.

## 1.2 Approved items

### Recovery and lives

| Item | Effect |
|---|---|
| 1-Up | Grants one additional life |
| First Aid Kit | Restores maximum HP and maximum energy |
| Small Health Pack | Restores 50% of maximum HP |
| Pizza Slice | Restores 30% of maximum HP |
| Energy Battery | Restores 50 energy |
| Energy Canister | Restores energy to maximum |

### Item appearance

**1-Up**
- Distinct extra-life collectible.
- Immediately recognizable.
- Appropriate arcade-style visual feedback.

**First Aid Kit**
- Larger than the Small Health Pack.
- Red cross on the front.
- Distinct medical-case silhouette.
- Restores both resources fully.

**Small Health Pack**
- Smaller than the First Aid Kit.
- Green cross on the front.
- Distinct silhouette and coloring.

**Pizza Slice**
- Recognizable pizza-slice artwork.
- Appropriate food-pickup animation.

**Energy Battery**
- Clearly identifiable battery.
- Restores 50 energy points.

**Energy Canister**
- Larger, more substantial energy container.
- Restores the entire Energy Meter.

All pickup artwork must match Urban Fracture's approved visual style.

Preserve correct perspective, world scale, shadows, collision, and ground anchoring.

## 1.3 Cash and valuables

| Item | Wallet value |
|---|---:|
| Cash | $500 |
| Cell Phone | $1,000 |
| Jewelry | $2,000 |
| Diamonds | $5,000 |

The collectible Cell Phone is a valuable object worth money. It is separate from the player's permanent smartphone.

Valuables immediately increase the wallet when collected.

They do not occupy reserve inventory.

## 1.4 Combat score

Maintain separate systems for:

- Wallet money.
- Combat score.

Defeating enemies increases combat score.

Award more points for more dangerous enemy classifications.

Use the actual enemy registry and approved difficulty classifications.

Do not award wallet money automatically for defeating enemies unless a cash item is actually collected or an explicit mission reward is granted.

## 1.5 Nightshade ammunition

Nightshade-exclusive pickups:

- 3-Bullet Clip.
- 6-Bullet Clip.

These appear only when Nightshade is an active playable character, including eligible multi-hero mission situations.

Preserve her established ammunition capacity, pickup budget, and drop rules.

Do not create a separate ammunition system.

## 1.6 Loot integration

Use the existing Loot Director.

Items may appear through:

- Enemy drops.
- Eligible destructible objects.
- Scripted level placement.
- Hidden caches.
- Optional routes.
- Mission rewards.

Preserve approved drop probabilities unless explicitly changed.

Prevent duplicate drops and item farming.

---

# GATE 2 — ONE-ITEM RESERVE INVENTORY

Each playable hero may carry one additional consumable in reserve.

## Eligible reserve items

- First Aid Kit.
- Small Health Pack.
- Pizza Slice.
- Energy Battery.
- Energy Canister.

## Rules

- One reserve slot per hero.
- Reserve items persist through levels.
- Reserve items remain associated with their owner when heroes are switched.
- Money and valuables are collected automatically.
- Ammunition is applied directly.
- 1-Ups are applied immediately.

When the reserve slot is occupied, allow the player to:

1. Use the current reserved item.
2. Exchange it for the newly discovered item.
3. Leave the new item behind.

Do not silently discard an existing reserved item.

## Resource behavior

Health recovery is based on maximum HP.

Energy recovery uses the existing Energy Controller.

Clamp restored values to their maximums.

Prevent duplicate consumption.

Do not allow item use during prohibited combat states.

## UI

Display a small reserve-item icon in the existing HUD.

Show its item identity and availability.

Do not overlap HP, energy, lives, score, weather, or other HUD elements.

Support keyboard and DualSense controls.

---

# GATE 3 — PRIME CITY SMARTPHONE INTERFACE

Create a modern smartphone interface accessible from the pause menu.

The smartphone must be a functional part of the game.

## 3.1 Home-screen appearance

Create an original illustrated Prime City skyline wallpaper.

The wallpaper should include:

- Downtown skyscrapers.
- Recognizable city architecture.
- Distant buildings.
- Atmospheric lighting.
- A visually appealing city composition.

Use the game's approved illustrated art style.

The background should look polished and colorful without reducing readability.

## 3.2 App icons

Use prominent, colorful rounded-square icons.

Each app requires:

- Unique icon.
- Distinct color.
- Consistent dimensions.
- Clear label.
- Strong contrast against the wallpaper.
- Subtle shadow or outline.
- Selection highlight.
- Optional unread notification badge.

Apply a subtle dark gradient behind labels if necessary.

Do not let detailed buildings obscure icon labels.

## 3.3 Smartphone controls

Support:

- Keyboard.
- PS5 DualSense.
- D-pad navigation.
- Analog-stick navigation where appropriate.
- Confirm.
- Back.
- Close.
- Scrolling.
- Selection highlighting.

Use existing controller bindings where possible.

Do not override combat controls without checking for conflicts.

## 3.4 Required apps

1. Messages.
2. PromptDrop.
3. Astro-Call.
4. Prime City Pulse.
5. City Map.
6. Missions.

## 3.5 Pause behavior

Opening the smartphone through the pause menu must not advance combat simulation.

Do not allow enemies to continue attacking while the player reads messages or uses the phone.

The phone must not be used to bypass active combat restrictions.

---

# GATE 4 — PROMPTDROP DELIVERY SERVICE

The delivery app is officially named **PromptDrop**.

Remove the previous Nile name from relevant UI and new documentation.

PromptDrop allows the player to order supplies using collected wallet money.

## 4.1 Initial catalog

| Item | Provisional price |
|---|---:|
| Pizza Slice | $1,500 |
| Energy Battery | $2,500 |
| Small Health Pack | $3,500 |
| Energy Canister | $5,000 |
| First Aid Kit | $9,000 |
| 1-Up | $15,000 |

These prices are initial balancing values, not permanent approved prices.

Expose them in the Developer Panel.

First Aid Kits and 1-Ups may have limited stock.

## 4.2 Ordering

The player selects an item and confirms the purchase.

The system must:

1. Verify wallet balance.
2. Verify stock.
3. Deduct the correct amount.
4. Create a unique order record.
5. Add the order to the delivery queue.
6. Display order confirmation.
7. Persist the transaction.

Prevent duplicate charges or duplicated deliveries.

## 4.3 Delivery destination

All purchases are delivered to Reina's home base.

Items must not materialize directly in combat.

Provide delivery status and order history.

Deliveries remain available until collected, subject to approved storage limits.

## 4.4 Future expansion

Use a configurable catalog so additional items can be added later.

Do not automatically make every future item purchasable.

Mission-critical objects, secret evidence, and other restricted items must not become ordinary store merchandise.

---

# GATE 5 — ASTRO-CALL HERO REPLACEMENT

Astro-Call allows the player to request another available hero to replace the currently controlled hero.

## 5.1 Standard rule

Allow one successful replacement per ordinary level.

A failed or canceled request must not consume the replacement allowance.

## 5.2 Switching restrictions

Do not allow replacement when:

- Enemies are onscreen and actively present in the gameplay area.
- A locked encounter is active.
- A boss encounter is active.
- The player is grabbed.
- The player is in hitstun.
- The player is airborne or committed to an attack.
- A scripted sequence prohibits switching.
- The requested hero is unavailable.

## 5.3 Hero persistence

Preserve each hero's:

- HP.
- Energy.
- Reserve item.
- Status effects.
- Character-specific resources.
- Relevant personal progression.

The incoming hero must use their actual saved state.

Do not provide free healing or energy refills through switching.

## 5.4 Arrival

Use an appropriate arrival animation or nearby level entrance.

Do not teleport heroes into dangerous or visually inappropriate locations.

## 5.5 Special missions

Multi-hero missions, including the proposed hospital search, may use separate mission-specific switching rules.

Do not allow Astro-Call to bypass required dual-hero objectives.

---

# GATE 6 — REINA'S HOME HEADQUARTERS

Create or extend Reina's home as a persistent headquarters.

## Required functions

### PromptDrop delivery collection

Receive and collect purchased supplies.

### Item storage

Store eligible items not currently carried by heroes.

Define reasonable storage capacity.

### Team meeting area

Allow available heroes to appear for appropriate conversations.

Do not implement relationship scores or relationship perks yet.

### Investigation board

Display discovered evidence, leads, and Syndicate connections.

### Mission intelligence

Review available and completed missions.

### Training area

Allow combat practice without consuming campaign resources.

### Rest area

Provide optional recovery using a balanced, explicitly defined recovery policy.

Do not create unlimited free healing exploits.

### Story events

Allow authored story conversations and mission briefings.

## Home-base persistence

Preserve:

- Stored items.
- Deliveries.
- Discovered intelligence.
- Mission progress.
- Hero availability.
- Relevant story events.

Home visits should generally remain optional.

---

# GATE 7 — LIVING CITY DIRECTOR

Implement a centralized, persistent Living City Director.

The Director coordinates world events without replacing the existing Combat AI Director or Encounter Director.

## 7.1 City-state data

Track:

- Syndicate control by district.
- Civilian confidence.
- District safety.
- Active threats.
- Transportation disruptions.
- Available side missions.
- Hero availability.
- Offscreen hero assignments.
- Item-cache discoveries.
- Story flags.
- Mission consequences.
- Prime City Pulse events.

Do not implement character relationship scores yet.

## 7.2 Event scheduling

Evaluate city events at meaningful moments:

- Mission completion.
- Level transition.
- District travel.
- Home-base visit.
- Major story milestone.
- Scripted event trigger.

Avoid unnecessary constant simulation.

## 7.3 Offscreen hero activity

Heroes not controlled by the player may:

- Investigate Syndicate activity.
- Track suspects.
- Contact informants.
- Discover item caches.
- Identify side missions.
- Report transportation problems.
- Provide intelligence.

Do not automatically complete major story missions offscreen without explicitly approved mission rules.

## 7.4 Persistence

City events must persist across relevant level transitions and save/load operations.

Use stable event IDs and reproducible random seeds.

Prevent contradictory or duplicate events.

---

# GATE 8 — MESSAGES AND ITEM-CACHE DISCOVERY

The Messages app is the private communication channel between the player and other heroes.

## 8.1 Message categories

- Hero updates.
- Syndicate intelligence.
- Side mission offers.
- Item-cache discoveries.
- District emergencies.
- Transportation alerts.
- Story developments.
- Personal conversations.

Each message must have:

- Unique ID.
- Sender.
- Timestamp or campaign-event time.
- Message body.
- Read/unread status.
- Associated event or mission ID, when applicable.

## 8.2 Item-cache discovery

When a hero reports a cache:

1. Register the discovery event.
2. Send the message.
3. Reveal the location on the City Map.
4. Activate the actual cache in the appropriate level.
5. Preserve collected/uncollected status.
6. Prevent duplicate collection.

Do not show undiscovered caches on the map.

Do not create messages referring to nonexistent locations.

---

# GATE 9 — NEW-MESSAGE HUD NOTIFICATIONS

Create a discreet global notification system for new Messages inbox content.

## 9.1 Envelope indicator

Display a small envelope/mail icon in the bottom-left corner of the gameplay screen when at least one unread message exists.

### Visual requirements

- Small, recognizable envelope silhouette.
- Appropriate contrast against light and dark environments.
- Consistent with Urban Fracture's HUD.
- Safe distance from screen edges.
- No overlap with HP, energy, score, lives, reserve items, weather, or other HUD elements.

### Behavior

- Hidden when no unread messages exist.
- Appears when a new message arrives.
- Remains visible while unread messages exist.
- Disappears after all messages are marked read.
- Optional small unread-count badge.
- Brief fade-in and one subtle pulse on arrival.
- No continuous flashing.

## 9.2 No direct opening during combat

**The envelope is a notification indicator, not an interactive combat HUD button.**

Pressing the envelope or a combat input must not directly open Messages during active gameplay.

To read a message:

1. Finish or safely pause gameplay.
2. Open the pause menu.
3. Open the smartphone.
4. Select Messages.
5. Read the message.

Do not interrupt combat with forced message windows.

Do not pause the game automatically when a message arrives.

Do not create new combat input conflicts.

## 9.3 Optional notification sound

Add a Player Settings option:

**Message Notification Sound: ON / OFF**

Default: ON.

When enabled, play a short, recognizable notification tone once when a new message arrives.

When disabled, the envelope still appears, but no notification tone plays.

### Audio requirements

- Short and unobtrusive.
- Distinct from combat sounds.
- Respect master and UI volume.
- No overlapping tones.
- No repeated tone for an already unread message.
- No tone replay when loading a save.
- Persist setting between sessions.

## 9.4 Reduced-distraction accessibility

Add the notification sound setting to any existing accessibility or reduced-distraction preferences.

When a reduced-distraction preset is enabled, default Message Notification Sound to OFF unless the player has explicitly overridden that preference.

Do not remove the visual envelope notification.

Do not continuously flash the icon.

## 9.5 Read state

Opening the inbox must not automatically mark every message as read.

Mark individual messages read when opened, or support an explicit Mark All Read command.

Unread counts and envelope visibility must update correctly.

## 9.6 Notification scope

Routine Prime City Pulse posts must not trigger the Messages envelope or tone.

Only actual Messages inbox events trigger this notification system.

---

# GATE 10 — PRIME CITY PULSE SOCIAL FEED

Create a scrolling fictional citywide social-media feed.

## 10.1 Content categories

- Breaking news.
- Civilian reports.
- Hero sightings.
- Syndicate rumors.
- Public reactions.
- Humor.
- Troll posts.
- Spam.
- Transit reports.
- Weather observations.
- Neighborhood updates.
- Mission consequences.

## 10.2 Content variety

Use a large authored content library with controlled procedural variation.

Support:

- Usernames.
- District names.
- Landmarks.
- Hero names.
- Event types.
- Time references.
- Different wording variations.

Target a scalable system capable of producing thousands of plausible post variations.

Do not create thousands of repetitive near-identical posts.

## 10.3 Repetition prevention

Track post IDs and recently displayed variants.

Avoid repeating the same exact post during an ordinary campaign.

Do not regenerate the entire feed every time the player opens the app.

Preserve post history.

## 10.4 Story consistency

Posts must reflect actual campaign state.

Do not mention:

- Bosses defeated before their encounters.
- Locations not yet discovered.
- Events that never happened.
- Weather inconsistent with the current event.
- Heroes appearing in contradictory locations.

Use authored posts for major story developments.

## 10.5 Recurring citizens

Create recurring fictional usernames with consistent personalities.

Include:

- Serious local observers.
- Transit commuters.
- Neighborhood residents.
- Hero fans.
- Skeptics.
- Conspiracy theorists.
- Comedians.
- Occasional spammers.

Not every post needs to provide useful intelligence.

The feed should feel like a genuine citywide conversation.

---

# GATE 11 — PRIME CITY MAP SYSTEM

## 11.1 Primary objective

Create a colorful, illustrated, interactive map of Prime City based on the **actual levels and connections already implemented in Urban Fracture**.

The map must look like a professionally designed video-game world map, not a generic list of levels or a plain flowchart.

It should communicate:

- City geography.
- Major districts.
- Distinctive landmarks.
- Transportation connections.
- Current player location.
- Discovered destinations.
- Available routes.
- Mission locations.
- Revealed item caches.
- Relevant city conditions.

## 11.2 Audit the existing world

Before creating the map, inspect:

- Level registry.
- Scene registry.
- Level-transition graph.
- Branching paths.
- District definitions.
- Subway connections.
- Road connections.
- Airport connections.
- Industrial District connections.
- Existing world-navigation systems.
- Previously approved city geography.

Identify all implemented locations and their actual transitions.

Do not invent connections merely to make the map look complete.

If a location exists but its geographic relationship is undefined, flag it for design review.

## 11.3 Illustrated map art direction

Create a colorful, original Prime City map in Urban Fracture's established visual style.

Use a stylized, slightly elevated city-map perspective.

The map should feature:

- Roads.
- Major intersections.
- Buildings.
- Parks.
- Rail lines.
- Waterways where established.
- Industrial infrastructure.
- Distinct neighborhoods.
- Major landmarks.
- Transportation hubs.

Use visually distinct district colors while preserving a cohesive city appearance.

Maintain legible labels and clear routes.

Do not make the map excessively cluttered.

## 11.4 Landmark illustrations

Each major district or destination must have small, recognizable illustrated objects surrounding its name.

Examples:

### Downtown
- Skyscrapers.
- Office buildings.
- Hotels.
- Busy roads.

### Financial District
- Tall commercial towers.
- Bank building.
- Financial-center architecture.

### Industrial District
- Factories.
- Refineries.
- Smokestacks.
- Power lines.
- Rail yard.
- Industrial warehouses.

### Park / Woodland Areas
- Trees.
- Trails.
- Green spaces.
- Appropriate natural landmarks.

### Airport
- Airplane icon.
- Runway.
- Terminal buildings.

### Fairways Estates
- Large luxury house.
- Landscaped grounds.
- Elegant residential architecture.

### Football Stadium
- Stadium structure.
- Field or goalpost symbol.

### Casino
- Casino building.
- Recognizable entertainment signage.

### Hospital
- Hospital building.
- Medical symbol.

### Docks / Waterfront
- Cargo cranes.
- Shipping containers.
- Docked ships where appropriate.

### Subway
- Station entrances.
- Rail-line symbols.
- Transit connections.

### Hydroelectric Station
- Dam or hydroelectric infrastructure where geographically appropriate.

### Other implemented locations
Create distinctive illustrations based on their actual content.

### Important

These are visual landmark guidelines.

Only show a location as implemented or accessible when the actual game registry supports it.

Do not invent playable locations merely to populate the map.

## 11.5 Map labels

Display major district names clearly.

Use:

- Legible typography.
- Appropriate contrast.
- Consistent label hierarchy.
- Avoidance of overlapping text.
- Scalable labels when zooming.

Landmark illustrations must complement names rather than obscure them.

## 11.6 Current player location

Display a recognizable player-position marker.

When the player changes districts, update the marker.

For interior levels, show the corresponding building or district location.

Do not imply exact street-level positioning if the current level data does not support it.

## 11.7 Connections

Show actual established connections between locations.

Support:

- Roads.
- Walkable routes.
- Subway connections.
- Bus routes when implemented.
- Airport connections when implemented.
- Special mission transitions.

Different transportation types should have distinguishable map symbols or line styles.

Do not treat every route as freely accessible.

Respect story locks, route closures, and mission restrictions.

## 11.8 Branching paths

Where existing levels have branching routes, the map should reflect meaningful connections.

Use:

- Route indicators.
- Branch markers.
- Destination labels.
- Appropriate zoom or detail views.

Do not expose undiscovered secret routes.

## 11.9 Dynamic map updates

The City Map must update as new levels and connections are implemented.

### Architecture

Use the existing level registry and transition graph as the authoritative source.

Create a reusable map-data adapter containing:

- Location ID.
- Display name.
- District.
- Map coordinates.
- Landmark artwork reference.
- Discovery status.
- Unlock conditions.
- Connection IDs.
- Transportation type.
- Relevant mission markers.

When Work adds a new level, require a corresponding map entry or an explicit parent-location association.

When Work adds a new connection, update the map's route data.

Do not manually redraw the entire map every time a level is added.

### Important

Map placement must be deliberate.

Do not automatically scatter new locations at random coordinates.

Use validated coordinates and preserve established geography.

## 11.10 Map discovery states

Support:

- Discovered.
- Undiscovered.
- Available.
- Locked.
- Temporarily inaccessible.
- Current location.

Do not reveal hidden destinations prematurely.

## 11.11 Mission and cache markers

Show markers for:

- Active main missions.
- Available side missions.
- Discovered item caches.
- Relevant story destinations.
- Optional points of interest.

Only display markers when their discovery or availability conditions are satisfied.

## 11.12 Living City integration

The map must reflect meaningful city-state changes.

Examples:

- Subway station closure.
- Roadblock.
- District under Syndicate pressure.
- Newly opened route.
- Newly discovered cache.
- Available mission.

Use restrained icons or overlays.

Do not cover the map with excessive alerts.

## 11.13 Map interaction

Allow the player to:

- Open the map.
- Pan.
- Zoom.
- Highlight destinations.
- Inspect district details.
- View established connections.
- View discovered mission markers.
- Return to the previous screen.

Do not automatically teleport the player by selecting a location.

Travel must use the approved world-navigation and transportation systems.

## 11.14 PS5 DualSense touchpad

Assign quick access to the City Map using the PS5 DualSense touchpad press.

### Required behavior

During normal gameplay:

- Press Touchpad → Open City Map.
- Press Touchpad again or use Back → Close City Map.

Opening the map pauses gameplay.

### Input compatibility

Audit existing DualSense mappings before assigning Touchpad.

If Touchpad is already used for another approved action, report the conflict and implement a nonconflicting mapping only after resolving it.

Do not silently remove an existing control.

### While smartphone is open

The City Map app must open the same map system.

Do not create two separate map implementations.

### While in combat

Opening the map should not consume energy, alter combat states, or advance enemy AI.

The map must not permit inventory use, hero replacement, or other restricted gameplay actions merely because the game is paused.

## 11.15 Map presentation and performance

Use appropriate zoom levels and efficient rendering.

Avoid unnecessary high-resolution redraws every frame.

Support the game's intended display resolutions.

Maintain readable labels and recognizable landmarks.

Provide appropriate loading behavior if map assets require additional resources.

## 11.16 Map certification

Every implemented level must pass:

- Correct map association.
- Correct location name.
- Correct landmark illustration.
- Correct connection data.
- Correct discovery state.
- Correct unlock conditions.
- Correct player-position marker.
- Correct mission markers.
- Correct route visibility.
- Correct input behavior.
- Correct save/load persistence.

New levels must not be marked fully certified until their map integration passes.

---

# GATE 12 — DEVELOPER PANEL INTEGRATION

Add diagnostic tools for:

## Items and economy
- Item registry.
- Loot tables.
- Wallet.
- Combat score.
- Reserve inventory.
- PromptDrop prices.
- Purchases.
- Delivery queue.

## Smartphone
- App navigation.
- Messages.
- Unread count.
- Notification sound setting.
- HUD envelope state.
- Astro-Call eligibility.

## Living City
- City-state variables.
- Event scheduler.
- Hero assignments.
- Message triggers.
- Cache discovery.
- Prime City Pulse content selection.

## City Map
- Registered locations.
- Map coordinates.
- Landmark assets.
- Level-to-map associations.
- Connections.
- Transportation types.
- Discovery flags.
- Route locks.
- Mission markers.
- Cache markers.
- Current player location.
- Touchpad input diagnostics.

Provide deterministic test seeds, temporary overrides, and Restore Defaults.

Do not fabricate runtime values.

---

# GATE 13 — AUTOMATED AND VISUAL QA

## Item tests

Verify:

1. Every item can be collected.
2. Recovery amounts are correct.
3. Energy is correctly clamped.
4. Extra lives are awarded correctly.
5. Cash values are correct.
6. Combat score remains separate.
7. Nightshade-exclusive ammunition rules work.
8. Destructible and enemy drops remain functional.

## Inventory tests

Verify:

1. One reserve item per hero.
2. Item exchange.
3. Item use.
4. Item persistence.
5. No duplication exploits.

## PromptDrop tests

Verify:

1. Correct prices.
2. Correct wallet deductions.
3. Valid stock handling.
4. Delivery creation.
5. Home-base collection.
6. No duplicate deliveries.
7. Save/load persistence.

## Astro-Call tests

Verify:

1. One successful replacement per level.
2. Invalid swaps are rejected.
3. Hero states persist.
4. No free healing.
5. No enemy-wave reset.
6. No control conflicts.

## Notification tests

Verify:

1. Envelope appears with unread messages.
2. Envelope disappears when all are read.
3. Unread count is accurate.
4. Tone plays only when enabled.
5. Tone setting persists.
6. Reduced-distraction behavior works.
7. Messages open only through the pause-menu smartphone.
8. No combat interruption.
9. No HUD overlap.
10. No duplicate notification sounds.

## Prime City Pulse tests

Verify:

1. Relevant posts appear.
2. Unrelated posts do not contradict the story.
3. Feed history persists.
4. Repetition controls work.
5. No premature spoilers.
6. Routine posts do not trigger Messages alerts.

## City Map tests

Verify:

1. Every implemented major level has a correct map association.
2. Actual connections are represented.
3. Landmark illustrations match locations.
4. Labels are readable.
5. The player marker updates correctly.
6. Undiscovered routes remain hidden.
7. Locked routes are represented correctly.
8. Mission markers update.
9. Cache markers appear only after discovery.
10. Transportation routes reflect implemented systems.
11. Touchpad opens and closes the map.
12. Smartphone City Map opens the same map.
13. Map interaction pauses gameplay.
14. Map state survives save/load.
15. New levels trigger map integration requirements.
16. No performance regressions occur.

---

# IMPLEMENTATION ORDER

Do not implement all thirteen gates simultaneously.

### Assignment 1
Gate 1 — Audit and Master Items.

Gate 2 — Reserve Inventory.

Stop and verify.

### Assignment 2
Gate 3 — Smartphone Interface.

Gate 4 — PromptDrop.

Stop and verify.

### Assignment 3
Gate 5 — Astro-Call.

Gate 6 — Reina's Home Base.

Stop and verify.

### Assignment 4
Gate 7 — Living City Director.

Gate 8 — Messages and Caches.

Gate 9 — Notifications.

Stop and verify.

### Assignment 5
Gate 10 — Prime City Pulse.

Stop and verify.

### Assignment 6
Gate 11 — Prime City Map.

Stop and verify the illustrated map, actual connections, and touchpad controls.

### Assignment 7
Gate 12 — Developer Panel.

Gate 13 — Automated and Visual QA.

Stop and verify.

---

# REQUIRED WORK REPORTING

After every gate, provide:

1. Build/checkpoint identifier.
2. Features implemented.
3. Files changed.
4. Tests executed.
5. Tests passed.
6. Tests failed.
7. Untested requirements.
8. Visual verification evidence.
9. Known limitations.
10. Next recommended gate.

Do not claim a feature is complete based solely on code existing.

Verify actual gameplay and rendered UI.

---

# FINAL ACCEPTANCE CRITERIA

The project is complete when:

- Approved items work correctly.
- Wallet and combat score remain separate.
- Reserve inventory works.
- PromptDrop purchases and deliveries function.
- Reina's home supports deliveries and other headquarters functions.
- Astro-Call follows its switching restrictions.
- Other heroes can send contextual messages.
- Hidden caches are revealed through valid discoveries.
- A discreet envelope appears for unread messages.
- Message sounds can be enabled or disabled.
- Messages are opened through the paused smartphone interface.
- Prime City Pulse reflects the changing city.
- The City Map visually represents actual implemented locations.
- Every major district has distinctive illustrated landmarks.
- Actual connections and branching routes are represented.
- The map updates when new levels are added.
- The DualSense touchpad provides quick map access without conflicts.
- The smartphone City Map app opens the same map.
- City state and map state persist correctly.
- No major combat, input, or progression regressions are introduced.

**Do not implement the relationship system during this project.**

## FINAL DESIGN GOAL

Urban Fracture should feel like a connected, living city rather than a series of isolated combat stages.

The smartphone provides communication and services.

PromptDrop provides expensive but useful supplies.

Astro-Call provides limited character replacement.

Reina's home provides a meaningful headquarters.

Prime City Pulse provides the city's public voice.

The Living City Director makes events and discoveries persistent.

The illustrated Prime City Map makes the world understandable, navigable, and visually memorable.

All systems must integrate with the existing game and remain expandable as Urban Fracture grows.


# User-required Gate 11 geography review checkpoint

Before finalizing City Map artwork, present the proposed Prime City geography to the user for review. Show district and landmark placements, established waterways, road/transit connections and major branching routes. Distinguish confirmed implemented connections from proposed geographic placement; flag undefined relationships rather than inventing routes. Stop at this design checkpoint and obtain the user’s approval before producing or finalizing the illustrated map artwork. This is a Gate 11 review requirement, not authorization to skip Gates 1–10 or implement all gates simultaneously.

## User update — Build321 recovery pickup priority
Health pickups are consumed immediately when HP is below maximum; energy pickups when energy is below maximum. The combined First Aid Kit is consumed if either resource is below maximum. Only when the resource(s) that an item restores are full does it go into reserve. Existing occupied reserve is preserved; unneeded pickups stay on the ground if it is full. Stored items remain manually usable. Existing safe-state and duplicate-consumption rules still apply.
