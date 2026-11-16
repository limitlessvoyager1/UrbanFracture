# URBAN FRACTURE — HD SEMI-REALISTIC COMIC-BOOK ART STYLE
## Complete Art Direction, Asset Treatment & Animation Pipeline
### Implementation Instructions for ChatGPT Work

---

# PRIMARY OBJECTIVE

Establish a new optional visual direction for Urban Fracture:

**HD Semi-Realistic Comic-Book Illustration**

The target style combines:

- Realistic human proportions.
- Expressive, recognizable faces.
- Bold comic-book outlines.
- Hybrid cel shading.
- Detailed clothing and materials.
- Vibrant accent colors.
- Cinematic lighting.
- High-definition 2D artwork.
- Smooth, physically believable animation.

Use the previously supplied updated Nightshade character card as the primary reference for this visual direction.

The artwork must remain original to Urban Fracture.

Do not copy existing commercial game assets or character designs.

## Critical implementation rule

**Do not immediately replace the artwork across the entire game.**

Create a separate experimental art-style branch and build a playable Nightshade prototype first.

Preserve the current approved art style and all original assets.

Do not alter approved combat mechanics, frame data, AI behavior, hitboxes, or character abilities merely to accommodate new artwork.

---

# GATE 1 — ART STYLE AUDIT

Inspect the existing Urban Fracture rendering and animation systems.

Identify:

1. Current sprite format.
2. Sprite-sheet structure.
3. Character animation controllers.
4. Rendering resolution.
5. Sprite scaling.
6. Character world dimensions.
7. Ground anchors.
8. Hitbox and hurtbox relationships.
9. Animation timing.
10. Existing asset-generation pipeline.
11. Rendering performance.
12. Sprite-cache behavior.
13. Current visual QA tools.

## Existing rendering concerns

Preserve all approved Codex combat repairs.

Review the UF-RENDER-025 and UF-RENDER-027 findings concerning sprite-cache correctness and performance.

Do not assume those review-branch changes have been approved for stable integration.

Do not introduce additional rendering costs without measurement.

## Deliverable

Produce a technical feasibility assessment covering:

- High-resolution 2D sprites.
- Rig-assisted animation.
- Hand-authored animation poses.
- Hybrid approaches.
- Expected memory requirements.
- Expected performance costs.
- Compatibility with existing gameplay systems.

Stop for review before implementing the prototype.

---

# GATE 2 — OFFICIAL VISUAL STYLE GUIDE

Create a reusable art-style guide for all future Urban Fracture assets.

## Character anatomy

Use:

- Believable human proportions.
- Consistent head-to-body ratios.
- Natural limb lengths.
- Correct joints.
- Anatomically plausible movement.
- Expressive body language.

Avoid exaggerated anatomical changes between poses unless explicitly required by a stylized animation.

## Facial identity

Preserve each character's:

- Facial structure.
- Eye shape.
- Nose.
- Mouth.
- Jawline.
- Hairstyle.
- Skin tone.
- Distinguishing features.

Characters must remain recognizable during:

- Idle.
- Walking.
- Running.
- Attacking.
- Jumping.
- Grabbing.
- Taking damage.
- Falling.
- Recovering.

## Comic-book linework

Use:

- Defined outer silhouettes.
- Controlled dark outlines.
- Selective interior linework.
- Consistent outline thickness relative to character scale.
- Strong pose readability.

Do not allow excessive detail to obscure movement.

## Hybrid cel shading

Combine:

- Clearly defined shadow regions.
- Smooth secondary gradients.
- Realistic material highlights.
- Selective reflected light.
- Cinematic rim lighting.

Avoid inconsistent shading between animation frames.

## Color treatment

Use:

- Rich but controlled colors.
- Strong character-specific accents.
- Consistent costume palettes.
- Appropriate environmental color grading.

Characters should remain readable against both bright and dark backgrounds.

## Material rendering

Distinguish:

- Fabric.
- Leather.
- Metal.
- Hair.
- Skin.
- Glass.
- Energy effects.

Use detailed materials without creating excessive visual noise.

---

# GATE 3 — ASSET TREATMENT STANDARDS

Different game assets require different levels of visual detail.

Do not use identical detail requirements for portraits, gameplay sprites, cutscenes, and environmental objects.

## 3.1 Character portraits and selection screens

### Recommended treatment

**Full semi-realistic detail.**

Use the highest-detail version of each character's approved design.

Include:

- Detailed facial features.
- Individual hair strands and groupings.
- Realistic fabric folds.
- Leather and metal textures.
- Detailed accessories.
- Cinematic lighting.
- Expressive poses.
- Rich shading.
- Polished presentation.

### Appropriate uses

- Character selection.
- Character biography.
- Moveset cards.
- Dialogue portraits.
- Mission briefings.
- Promotional artwork.
- Loading screens.

### Important

Portrait artwork must match the actual gameplay character's design.

Do not create a beautiful portrait that depicts different clothing, hair, proportions, or accessories from the playable version.

---

## 3.2 Actual gameplay sprites

### Recommended treatment

**Simplified but visually consistent HD comic-book illustration.**

Gameplay sprites should retain the same character identity as the portraits while reducing unnecessary microdetail.

Prioritize:

- Readable silhouettes.
- Clear arm and leg positions.
- Strong action poses.
- Consistent anatomy.
- Stable costume details.
- Controlled outlines.
- Consistent shading.
- Correct foot placement.
- Smooth transitions.

### Simplify

- Tiny fabric seams.
- Individual hair strands.
- Small jewelry details.
- Extremely subtle material textures.
- Excessive facial shading.

Preserve important identifying details.

### Critical rule

Do not independently generate every animation frame without a shared character reference.

All poses must derive from an approved character model and visual reference set.

The player should never appear to transform into a different illustration during an attack.

---

## 3.3 Boss introductions and cutscenes

### Recommended treatment

**Full cinematic detail.**

Use:

- High-resolution character illustrations.
- Expressive faces.
- Dramatic lighting.
- Carefully composed camera angles.
- Detailed environments.
- Controlled animation.
- Strong emotional presentation.

### Appropriate uses

- Boss introductions.
- Story revelations.
- Character confrontations.
- Important conversations.
- Major mission endings.

### Animation options

Use:

- Rig-assisted portrait animation.
- Layered 2D character motion.
- Authored facial expressions.
- Hand-animated key poses.
- Cinematic camera movement.

Do not require full gameplay-style frame-by-frame animation for every cinematic scene.

---

## 3.4 Environments

### Recommended treatment

**Illustrated backgrounds with matching lighting and perspective.**

Create detailed, cohesive urban environments.

Support:

- Distinct architecture.
- Recognizable neighborhoods.
- Foreground and background depth.
- Consistent perspective.
- Rich environmental textures.
- Appropriate atmospheric lighting.
- Weather integration.
- Day/night transitions.

### Environment consistency

Characters must appear naturally integrated into the world.

Match:

- Lighting direction.
- Shadow intensity.
- Perspective.
- Color temperature.
- World scale.
- Ground contact.

Avoid characters appearing pasted onto unrelated photographic backgrounds.

### Existing levels

Use the approved level layouts and architecture as the starting point.

Do not redesign routes or remove interactive objects merely to improve visual appearance.

---

## 3.5 Combat effects

### Recommended treatment

**Bold, readable effects that complement the characters.**

Create:

- Impact flashes.
- Hit sparks.
- Energy trails.
- Weapon effects.
- Fire.
- Electricity.
- Shockwaves.
- Dust.
- Debuff effects.

### Requirements

Effects must:

- Clearly communicate successful contact.
- Match the game's visual style.
- Respect attack timing.
- Avoid obscuring important poses.
- Remain readable during group encounters.
- Use consistent colors and intensity.

### Important

Do not replace physical hit reactions with oversized visual effects.

Enemies must still visibly recoil, stagger, or fall when appropriate.

---

# GATE 4 — CHARACTER MODEL SHEETS

Create an authoritative model sheet for every playable hero and enemy before converting their gameplay artwork.

## Required views

- Front.
- Rear.
- Left profile.
- Right profile.
- Three-quarter front.
- Three-quarter rear.

## Required reference poses

- Neutral standing.
- Fighting stance.
- Walking.
- Running.
- Crouching.
- Jumping.
- Basic attack.
- Hit reaction.
- Knockdown.
- Recovery.

## Required details

Document:

- Character proportions.
- Costume.
- Color palette.
- Hair.
- Face.
- Accessories.
- Footwear.
- Distinguishing marks.
- Outline style.
- Shading treatment.

## Consistency

Every animation asset must be traceable to the approved model sheet.

Do not silently change character designs between moves.

---

# GATE 5 — NIGHTSHADE PROTOTYPE

Use Nightshade as the initial character for the new art style.

## Approved appearance

Preserve her current approved character identity and costume.

Use her updated moveset-card illustration as the visual reference.

Include:

- Brunette hairstyle.
- Tactical outfit.
- Ivory and dark clothing elements.
- Gold accents.
- Spyglasses.
- Personal combat drone.
- Approved accessories.

## Prototype animations

Create:

1. Idle.
2. Walk.
3. Run.
4. Turn.
5. Standard melee combo.
6. Jump.
7. Landing.
8. Drone-assisted dodge.
9. Drone gun burst.
10. Flamethrower.
11. Healing Ray.
12. Hit reaction.
13. Knockdown.
14. Get-up.
15. Recovery.

## Animation quality

All poses must preserve:

- Face.
- Hair.
- Clothing.
- Body proportions.
- Character scale.
- Ground anchoring.
- Visual style.

Do not use unrelated pose artwork.

---

# GATE 6 — HYBRID ANIMATION PIPELINE

Use a combination of:

**2D skeletal animation + hand-authored key poses.**

## Rig-assisted animation

Use rigging where appropriate for:

- Idle breathing.
- Walking.
- Running.
- Basic turning.
- Simple arm movement.
- Subtle clothing motion.
- Drone following.
- Minor pose transitions.

## Hand-authored key poses

Use specially authored poses for:

- Powerful punches and kicks.
- Acrobatic attacks.
- Grapples.
- Throws.
- Complex Blitz attacks.
- Dramatic hit reactions.
- Falling.
- Get-up sequences.
- Unique specials.

## Why hybrid animation

Rigging helps maintain character proportions and consistency.

Hand-authored poses preserve expressive combat choreography.

Do not force complex acrobatic moves into rigid puppet animation if it produces unnatural movement.

---

# GATE 7 — UNIVERSAL ANIMATION QUALITY

Every move must follow the approved action lifecycle.

## Required phases

1. Preparation.
2. Startup.
3. Active.
4. Follow-through.
5. Recovery.
6. Ready.

## Recovery behavior

Recovery must be represented by physical movement.

Examples:

- Arm retraction.
- Balance correction.
- Foot repositioning.
- Landing.
- Rising.
- Return to fighting stance.

Do not create recovery by freezing the final pose.

## Outcome-dependent recovery

Support appropriate recovery for:

- Successful hit.
- Block.
- Miss.
- Interruption.

Preserve approved frame data unless separately authorized.

If new artwork requires timing changes, report the proposed adjustments before implementation.

---

# GATE 8 — SPRITE AND RENDERING INTEGRITY

Ensure:

- Correct animation asset selection.
- Correct frame indexing.
- Stable sprite scale.
- Stable body anchors.
- Correct transparency.
- Correct source rectangles.
- Correct sprite layering.
- No stray pixels.
- No texture bleeding.
- No unexpected pose replacement.

## Known issues

Include regression cases for:

- Reina's Blitz sprite.
- Reina's grab sprite.
- Reina's standing-combo pixel artifacts.
- Reina's neutral jump-kick sprite.
- Marcus's changing prone pose.

These issues must not be considered automatically fixed by changing the art style.

---

# GATE 9 — ENVIRONMENT STYLE CONVERSION

After the Nightshade prototype passes, create a representative environment prototype.

Recommended initial environment:

A small existing Downtown combat section.

## Preserve

- Existing layout.
- Door locations.
- Enemy spawn rules.
- Encounter boundaries.
- Combat-plane geometry.
- Camera.
- Weather.
- Day/night system.
- Interactive objects.

## Upgrade

- Building artwork.
- Ground textures.
- Background depth.
- Foreground scenery.
- Lighting.
- Environmental details.
- Atmospheric effects.

## Important

The environment must remain playable.

Do not create a beautiful static illustration that breaks navigation or combat.

---

# GATE 10 — PERFORMANCE BUDGET

High-definition artwork must not compromise gameplay responsiveness.

## Test scenarios

- Nightshade alone.
- Nightshade versus one enemy.
- Nightshade versus four enemies.
- Nightshade versus eight enemies where supported.
- Mixed enemy classes.
- Multiple combat effects.
- Dynamic weather.
- Nighttime lighting.

## Measure

- Average frame time.
- p95 frame time.
- Memory usage.
- Texture memory.
- Asset loading.
- Rendering costs.
- Animation update costs.

## Target

Maintain the game's intended 60 FPS gameplay baseline on its approved target hardware.

Distinguish actual full-game frame pacing from rendering-only benchmark results.

## Critical

Do not optimize by:

- Skipping important animation poses.
- Freezing characters.
- Reusing stale sprites.
- Reducing hit reactions.
- Changing combat timing.
- Removing approved visual effects without authorization.

---

# GATE 11 — VISUAL CERTIFICATION

Create a reusable visual QA process.

## Character certification

Verify:

- Consistent identity.
- Consistent proportions.
- Consistent costume.
- Correct scale.
- Correct anchors.
- Complete animation phases.
- Smooth transitions.
- Natural movement.

## Environment certification

Verify:

- Correct perspective.
- Correct lighting.
- Correct scale.
- Appropriate depth.
- Functional navigation.
- Weather consistency.

## Combat certification

Verify:

- Hitbox alignment.
- Hit reactions.
- Startup.
- Active frames.
- Recovery.
- Grapple synchronization.
- Effect timing.

## Certification statuses

- Passed.
- Failed.
- Not Tested.
- Requires Visual Review.

Do not certify artistic consistency solely through automated code tests.

---

# GATE 12 — DEVELOPER PANEL INTEGRATION

Add or extend an Art Style and Animation QA section.

## Controls

- Select character.
- Select animation.
- Select move.
- Pause.
- Frame advance.
- Slow motion.
- View sprite source.
- View animation frame.
- View character scale.
- View body anchors.
- View hitboxes.
- View ground contact.
- Compare original and experimental art.
- Capture screenshots.
- Generate contact sheets.

## Comparison

Allow side-by-side review of:

- Existing approved artwork.
- Experimental HD artwork.

Do not overwrite original assets during testing.

---

# GATE 13 — REGRESSION TESTING

Run:

- Combat-state tests.
- Hitstun tests.
- Knockdown tests.
- AI Director tests.
- Grapple tests.
- Collision tests.
- Controller tests.
- Rendering tests.
- Sprite-cache tests.
- Level progression tests.
- Save/load tests.
- Performance tests.

Preserve all previously approved Codex repairs.

Do not mark unperformed tests as passed.

---

# GATE 14 — FUTURE ASSET REQUIREMENTS

All future heroes, enemies, bosses, civilians, and major environment assets must follow the approved art-style guide once the style is formally adopted.

## New character checklist

Before a new character is considered complete:

1. Approved model sheet.
2. Approved portrait.
3. Approved gameplay sprite style.
4. Consistent animation poses.
5. Complete action lifecycle.
6. Correct world scale.
7. Correct hitboxes.
8. Correct collision.
9. Correct visual effects.
10. Visual certification.
11. Performance certification.

Do not allow newly created content to introduce a conflicting visual style.

---

# GATE 15 — APPROVAL AND ROLLOUT

Do not convert the entire game immediately.

## Assignment 1 — Feasibility and style guide

Gates 1–4.

Audit the current rendering system.

Create the style guide and Nightshade model sheet.

Stop for approval.

## Assignment 2 — Nightshade prototype

Gates 5–8.

Create the playable HD Nightshade prototype.

Test animations, visual identity, and rendering.

Stop for review.

## Assignment 3 — Environment prototype

Gates 9–10.

Convert one representative Downtown combat section.

Measure performance.

Stop for review.

## Assignment 4 — Certification

Gates 11–13.

Complete visual, combat, and performance testing.

Stop for approval.

## Assignment 5 — Future rollout

Gates 14–15.

After explicit approval, expand the new art style to other heroes, enemies, bosses, civilians, and levels.

Convert content in manageable batches.

Do not mix approved and experimental art without deliberate compatibility rules.

---

# REQUIRED REPORTING

After every gate, provide:

1. Build/checkpoint identifier.
2. Files changed.
3. Assets created.
4. Animations completed.
5. Tests executed.
6. Tests passed.
7. Tests failed.
8. Visual evidence.
9. Performance measurements.
10. Known limitations.
11. Next recommended action.

Do not claim completion based solely on asset files existing.

Verify the artwork in actual gameplay.

---

# FINAL ACCEPTANCE CRITERIA

The art-style prototype is successful only when:

- Nightshade visually matches her approved concept artwork.
- Her face and proportions remain consistent across poses.
- Her costume and accessories remain consistent.
- Her drone matches the new style.
- All required prototype animations work.
- Startup and recovery remain physically convincing.
- No sprite snapping or unintended scaling occurs.
- Hitboxes remain aligned.
- Combat mechanics remain unchanged.
- The Downtown prototype matches the character's visual treatment.
- Performance remains acceptable.
- Existing Codex combat repairs remain intact.
- The original art style remains recoverable.

---

# FINAL DESIGN GOAL

Urban Fracture should evolve toward a distinctive high-definition illustrated appearance while preserving the responsiveness and readability of a classic beat-'em-up.

Character portraits should be richly detailed and cinematic.

Gameplay sprites should be simplified but visually consistent.

Boss introductions and cutscenes should use full cinematic detail.

Environments should use illustrated backgrounds with matching perspective and lighting.

Combat effects should be bold, readable, and synchronized with gameplay.

The entire visual presentation must feel cohesive, polished, and unmistakably part of Urban Fracture.

**Prototype first. Verify animation and performance. Expand only after approval.**
