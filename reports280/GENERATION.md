# Build280 art provenance

Built-in image generation was used for six source assets, preserved in art-source280: gallery.png, department.png, appliance.png, reina-walk.png, door.png and chair.png. Runtime assets are imported by tools/import-280.py. No unrelated artwork was recompressed.

Prompts requested: (1)a continuous detailed16-bit outlet/jewelry/coffee-and-pastry gallery with attached signs and clear floor; (2)preserve the department-store architecture while changing the mall tile to warm wood with retail runners; (3)a detailed freestanding front-load washer; (4)Reina's same identity/costume in8whole-body low-step walk phases; (5)a detailed cream/brass glazed double-door portal with blank fascia; (6)a detailed black-leather coin-operated massage chair. The department source was edited from the existing approved department image; walk used the existing Reina reference. Sources remain available for artistic review.

Importer extracts source assets, preserves uniform proportions, creates compact WebPs, and normalizes cutout alpha. All eight walk poses use138/409source scale and138pixel standing height; no independent pose sizing. Pelvis roots use a constant cell-relative210source-x rather than changing foot-span midpoints. Glove anchors are authored per pose and move at most a few pixels to nearby opaque hand pixels after sampling. This keeps the held knife attached while walking. Existing idle/attack/run sprites are retained.

Live browser review covered the curbside wrecks, jewelry GO, the wood store floor/washer, detailed doorway/chair, larger kiosks and native armed blitz. Screenshot candidates in reports280 are evidence, not owner-approved regression baselines. Runtime and metadata checks do not constitute automatic artistic approval.
