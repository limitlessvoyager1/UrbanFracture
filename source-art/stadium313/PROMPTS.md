# Original artwork prompt set

Built-in image generation, three separate assets; project references were the existing original Rhinos stadium backgrounds and blue/gray jersey fan sprites.

1. Four-row1536×1024 stadium background atlas: original crisp painted/ink Rhinos art; strict perpendicular fronts without vanishing-point convergence. Row1concourse stores/information/corridors with matching gray edge columns; row2straight flat lockerfronts and a real open players tunnel in the rightquarter; row3sideline stands/rails/Rhinos wall/equipment, bottom50pixels plain grass #244b31 and no yardline marks; row4same wall/turf with players tunnel at leftquarter. No foreground characters, no fixed weather/sun, no real logos, no prepainted field numbers.
2. Transparent4×4sixteen-pose atlas: first8chronological female running poses, last8male running poses, allleftfacing; matching blue54jersey/denimshorts/ponytail woman and gray54jersey/cap/beard/cargoshorts man. Exact anatomicalscale and identity, contact/compression/passing/flight forbothlegs, oppositearm/leg swing, full body/head/feet with padding, no speedlines/trails/shadows/legobjects or detachedpixels.
3. Transparent2×2four-pose idleatlas: two planted stationary poses per same fan identity, neutral waiting and alarmed. Bothfeet onground side-by-side, not a stride or running pose, same clothes/faces, full bodies, no motionlines/shadows/straypixels.

Full generated PNGs are preserved as background-original.png,run-original.png,idle-original.png. Shipping imports preserve the original authored bodies and fixed family scale; lowalpha matte is clipped and shipping sizes are recorded by pack.py/data metadata.
