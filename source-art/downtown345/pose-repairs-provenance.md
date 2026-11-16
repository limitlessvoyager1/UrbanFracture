# Pose repair source provenance

Created with built-in imagegen, one generation, 2026-11-13. References inspected: `marcus-kevin.png`, `brick-jackal.png`, `enemy-reference-board.png`. Output: `pose-repairs.png` (2172 × 724 RGBA), three equal 724px columns: Marcus backward fall, Kevin backward fall, Jackal recovery. No renderer/importer changes.

Prompt specified original comic style, exact outfits/identities, right-facing full bodies, generous transparent margins, no labels, floor/shadow, distortion or cutoffs; Marcus/ Kevin backward falling phase and Jackal late standing get-up recovery.

Visual inspection: all three figures, boots, hands and knives complete; no cutoff or ground shadow. Genuine transparency: alpha extrema 0–255; 1,186,998 fully transparent pixels. At alpha >=8, local column bounds are Marcus (106,167)–(644,623), Kevin (106,166)–(644,628), Jackal (159,193)–(596,624). Very faint alpha 1–7 noise exists outside those bounds, so raw nonzero-alpha bounding boxes touch image edges; importer must use its established threshold rather than raw nonzero-alpha bounds.

Limitations: Jackal generated a one-knee, hand-braced intermediate recovery rather than the requested nearly upright late get-up. It is useful as an additional rising intermediate, but should not silently replace the final standing recovery pose if that would reverse the timeline. Exact pixel identity/style matching and in-engine temporal continuity remain for importer and rendered QA. No second generation attempted; parent should decide whether to accept this intermediate or request targeted correction.
