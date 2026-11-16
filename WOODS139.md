# Uptown woods branch — Build139

Checkpoint: checkpoint-before-woods139 (Build138).

From the cleared park's up-arrow fork: Lakeside Woods (3200 units), Deep Woods (3400 units), Woodland Lab Storage (1700), Woodland Lab Workroom (1700). Right-arrow park exit is retained. Every transition is gated by all enemies defeated. Existing staggered three-enemy maximum and Normal director remain; no HP or damage changes. Scene Select and retry/restart support every new area.

The walking trail leaves a visible lake for layered trees, flowers, shrubs and cool canopy shade. Deep Woods has a flowing stream, a traversable flat wooden bridge and a secluded small wood lab. Combat ground remains438–510 with constant character scales. Backgrounds translate without wave distortion; floor tracks world movement1:1. Two lab rooms contain storage crates and rear workbenches with fictional laboratory scenery. Covered masked workers stay or flee separately from enemy combat. Clearing the second room starts a scripted fire; after a short escape beat, reach the right exit to end outside. No next combat area is invented.

Artwork: built-in image generation, `dist/assets/woods139.webp`, four stacked side-view environment panels. Prompt brief: detailed pixel-art lakeside trail transitioning to dense woodland; shaded stream/wooden footbridge and remote shed; small wooden storage interior; second workroom with rear burners/glassware/hood, flat unobstructed lower combat floors. No fighters, UI, formulas or manufacturing instructions. Worker sprite prompt: four adult full-body masked/hooded white protective lab coat workers, idle/two running strides/frightened, consistent adult proportions, transparent sheet.

Tests: four heroes across four scenes; encounter spawns, all-clear gates, room fades, fire/exit and park up branch; scene registration/direct start. Full15-suite combat/controller regression passes. Browser checks of the opening trail and workroom, fixed floor/character scale and scene entry. No physical controller or completed human balance playtest claimed.

Worker atlas saved as `dist/assets/lab-workers139.webp` using built-in image generation; transparent, fixed import scale, separate standing/frightened and two fleeing stride poses. Background and worker prompts above are the final generation briefs.

Build140: dedicated lakeside140.webp panorama replaces the atlas's1088×362 source for zone3. Generated via built-in imagegen using the top atlas panel as reference: one crisp sunlit lake-to-dense-woods panorama, detailed trees/rocks/water/flowers, flat lower trail, no characters/HUD/blur. Native result2048×683; stored WebP quality94 without downsampling. Zone3 canvas backing is1920×1080 with logical960×540 coordinates; all gameplay and sprite world scales remain unchanged. Other scenes restore normal backing. Browser verification and route tests pass. Checkpoint checkpoint-before-woods-quality140.
