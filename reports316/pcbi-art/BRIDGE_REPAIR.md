# Single-identity bridge repair

One bounded repair attempt was generated separately per identity against only its approved original sheet. Original source/prompts remain in source-art/pcbi316.

Talon was rejected: gray coverage, spikier hair silhouette and facial shape visibly drifted from the approved mature gray-temple identity. No Talon frames/mappings were changed.

Jaguar was accepted after actual-size side-by-side inspection: straight dark hair, youthful clean-shaven face and clothing remain consistent at the170-world-unit anatomical reference. Six genuinely articulated poses were imported:48 backward half-fall,49 pre-impact fall,50 side-braced rise,51 half-standing rise,52 secured-grip contact-taser draw,53 punch anticipation. New frame.src selects assets/pcbi316/jaguar-bridge.webp; the new assetField is continuityBridge316. Complete source bounds/rects/sockets are in metadata.json and shipping data.

Exact rects use224×224cells in3columns×2rows. Anchors remain112,220. One constant import factor165.5/421 applies to all six poses, calibrated against the full-body anticipation silhouette; no pose was independently resized or rotated. Existing per-identity world conversion170/165.5 remains unchanged. New WebP39442bytes; total approved shipping art571188bytes. All original96 frame records and baseatlas SHA256 hashes remain identical.

Jaguar mappings: fall[43,48,44,49], getup[50,46,51,47], grab[33,34,52], taserContact[52,35,36], punchCombo[53,25,26,27,28,29,30]. Runtime must still synchronize captured bodies and contact through shared action clocks; these assets alone do not certify gameplay choreography.

Transparency correction: initial raw-image inspection showed smoky colors stored in fully transparent RGB pixels. Compositing and numeric alpha inspection confirmed those empty regions are actually alpha0. Earlier rejection notes incorrectly described that as an opaque background; identity drift, rather than alpha, is the valid rejection reason. All accepted bridge figures were composited on a neutral background and inspected after alpha-preserving compilation.

`node tools/pcbi316/check.cjs` passes102frames, original96immutability, per-frame asset routing, mappings/sockets and byte budget. `pack-jaguar-bridge.py` additionally verifies the original shipping atlas hashes. Talon continuity expansion remains an explicit limitation.
