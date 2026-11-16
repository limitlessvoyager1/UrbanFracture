# Park lighting, casual visitors and night crowds — Build161

Checkpoint: checkpoint-before-lake161.

Confirmed defects: hue-based sky extraction flooded into blue lake reflections and buildings, leaving rectangular mixed-light patches. Warm soil/flowers were classified as night emissions, replayed above visitors (making bodies appear transparent) and brightening only part of the ground. Dirt also used a pavement reflection.

The park composite now uses uniform ambient day/night tint, keeps its skyline intact, and limits emission to its lamp heads. Soil/flowers never emit. The park uses the soft-ground wetness profile. No clock/weather schedule, geometry, enemy or attack changes.

Park-only opaque casual visitors use teal T-shirt/tan shorts and coral T-shirt/jeans, sneakers, standing and four run frames. Alternating visitors stay versus flee; all feet use the established path anchor. Other civilian art is preserved. Ambient crowd slots reduce to approximately one-third at night, with dusk/dawn density changes; Downtown/nightclub zones4/5 retain full crowds. Counts are visual-only, deterministic and do not consume simulation RNG. People baked into the original background illustration remain part of that artwork.

Tests: lake161 excludes all park water from sky segmentation, excludes soil/flowers from emission, retains lamp emission, verifies day/night count12/12 versus4/12 and nightlife exemptions. civilians155 passes grounding/layer/gait assertions (mock gradient support updated for park158). current150's26 suites and environment156/integration156 pass. Browser midnight park checked: opaque teal-shirt visitor, no projected flowers through body, consistent lake and ground, preserved skyline and readable hero.

New artwork: dist/assets/park-visitors161.webp, built-in ImageGen, lossless WebP conversion. Prompt: exact5-column2-row transparent16-bit arcade civilian sheet; male teal T-shirt/tan shorts/sneakers and female coral T-shirt/jeans/sneakers; first column relaxed standing, next four sequential right-facing run poses; consistent proportions/scale, opaque bodies, transparent outside, no suits/ties/scenery/text. Runtime reads the regular cells, retains row scale and foot anchors. Original generated file was1774×887.
