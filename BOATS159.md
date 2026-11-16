# Riverfront boat occlusion — Build 159

Checkpoint: checkpoint-before-boats159.

Confirmed defect: after drawing boats and the shaped alpha scenery mask, the renderer repainted a rectangular stage crop covering 25.5% of the panorama. Open river beside the actual stage was inside this rectangle, hiding an approaching left-moving boat before physical scenery covered it.

Removed only that redundant rectangular stage repaint. Existing alpha scenery occlusion still places boats behind stage structures, trees, poles and nearby objects; near-bank repaint is preserved. Traffic speeds, travel loops, boat sizes, enemies, world geometry, weather and controller paths unchanged. Park158 repair preserved.

Passed boats159 (nine stage-approach/offscreen positions at four camera positions, boat drawn before shaped mask, no rectangular repaint), park158 rendering fixtures and riverfront151 all-four-hero routing/traffic tests. No claim of physical-controller or updated live browser visual certification.
