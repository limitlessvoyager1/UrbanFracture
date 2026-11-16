# Riverfront dock encounter and Blitz finish

Checkpoint: `checkpoint-before-dock176`, source15acdc14cb81bfb818fc4ddac4b6ae71102bb6b1.

Gunner's existing Blitz tackle keeps its damage, timing, collision checks and rebound. Ordinary target finish travel increases80→120 units; heavy targets28→48, bounded by the combat arena.

The final Riverfront guards are Dorian135HP and one Kevin60HP. All preceding Riverfront enemies and progression remain. The order still waits for preceding encounters and landing; dormant guards do not consume reinforcement slots. The order and fight reserve the final dock viewport (end−1060), with combat X bounds end−1038..end−122 and the established438..510 depth. The camera cannot scroll away during combat. Existing physics use the arena bounds, with final actor containment for carried/flight roots. Gunner walks into the visible frame during the order. The lock releases when both guards have landed defeated and Arthur has escaped; the yellow upward yacht-dock GO then appears. Upward approach/boarding remains gated and retry resets the encounter.

Arthur retains his original slender costume and silhouette, uniformly scaled.365→.46 (26% taller/larger). Original frames are cached as actor sprites with opaque body pixels and transparent cutouts. Like opaque ambient citizens, he is deferred until background illumination is complete, then shares the foreground character lighting pass; scenery reflections and heavy background tint cannot show through or wash him out. No art regeneration or replacement.

His escape uses distance-driven side/rear running frames along the painted pier: end−630/399, end−735/345, then end−540/345. His ground anchor follows the walkway instead of ascending vertically over the river. Turning uses the proper facing. On the final segment he moves behind the yacht boarding edge, with geometric occlusion rather than fading into transparency. The dock interaction aligns with the entrance at end−630.

Validation: dock176 all4 heroes at60/120Hz for combat/camera containment, both guard gates, three path segments and opaque escape; sterling-view176 for alpha/cached fixed-scale sprites/deferred layer order; current15026-suite regression including Sterling/Dorian/controller; maul175; environment162/environment-integration156; gamepad.test/controller157; riverfront16072 render cases. Browser order, dock run, night appearance and cleared GO fixtures are in animation169.html. Physical controller hardware was not available.
