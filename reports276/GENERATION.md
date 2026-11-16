# Build276 generated art provenance

Generated with the built-in image tool using the approved Nightshade foundation appearance as reference and the supplied jumping spin-hook-kick clip for choreography. Sources: art-source276/blitz.png (12 turning/chamber/heel-sweep/retract/landing poses), art-source276/weapons.png (8 pickup/guard/knife/long-weapon/release poses).

The fixed-scale importer `tools/import-nightshade276.py` segments opaque connected bodies, preserves aspect, downsamples with nearest sampling and binary alpha, annotates pelvis/sole/hand and heel contacts, and writes only13 unique new transparent WebP sprites (7 airborne spin,6 weapon handling). Appropriate established run/landing/guard poses are referenced rather than duplicated. Weapon contact/guard metadata aliases appropriate shared bodies; motion angles differ by weapon family. Re-run the importer to reproduce the data files and sprites. Source sheets retain unused generated poses for review.

The live rendered spin, weapon contact and grounded baton hit were visually inspected.13 new assets verified nonempty, binary alpha and unchanged source aspect. No automatic approval of art or screenshot baselines. Human animation approval remains a separate gate.
