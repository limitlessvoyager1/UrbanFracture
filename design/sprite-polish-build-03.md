# Illustrated sprite update — build 03

The playable renderer now uses 56 generated illustrated pixel poses: Reina 16, Street Thug 12, Enforcer 12, Thug Leader 16. Original character references guided the built-in image-generation tool. New files: dist/assets/sprites/reina-v1.png, thug-v1.png, enforcer-v1.png, boss-v1.png. Existing concepts remain intact.

Art briefs: preserve each reference character's face, hair, costume, proportions and equipment; create separated transparent right-facing full-body pixel animation poses with detailed arcade shading. Reina includes idle/walk, palm, kicks, knee, grab, lift, sword draw/extension and reactions. Thug includes guard/walk, jab, hook, knife and reactions. Enforcer includes guard/walk, punches, hook, reach, knee, overhead lift and reaction. Leader includes guard/bat walk, bat wind-up/extension, knife, pipe, equipment change, punches and reactions. Boss atlas received a transparency-only image-generation edit.

Frame metadata was derived by analyzing connected alpha components of the generated PNGs; source PNGs remain unmodified. At load time, the renderer isolates each component, discards background haze, aligns support-foot baselines and torso anchors, and maps game states to poses. Subtle breathing, recoil, lean, and attack movement supplement the selected art. Characters remain 2D sprites, not 3D models. Some actions share poses; long polished animation cycles would require further frames. Existing code-drawn figures remain an asset-load fallback.

The Sprite Room at characters.html displays the actual in-game artwork and selectable pose previews for all four characters. The game links it from the Cast section. Combat rules and collision shapes have not changed.

Validation: JavaScript syntax checks, sprite asset bounds/anchor/state mapping checks, existing 18 combat regressions, and the full simulated level route. Browser checks verified loading, transparent edges, in-game scale, sword/knife preview selection, Enforcer and leader rendering.
