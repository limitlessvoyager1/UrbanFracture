# Art provenance and prompts

Built-in image generation was used for the two selected new art masters. Runtime sheets are deterministic crops/packing/encoding; they do not author new gameplay or poses.

## Royal Uniform

Reused all725 approved pose selections from Site source `56d63e74cc45f9c9cb6c2e1c0ba5f69da55437fa`, directory `source-art/reina-royal-uniform/` (29 original lossless plates, correction plates and selection map). Re-imported at220 pixels maximum versus86. Those upstream masters remain in the Site repository; the GitHub source points to that exact upstream provenance instead of pretending the old compressed86-pixel sheets are masters. Native source rectangles/pose clocks remain the owners. New selected AVIF sheets use 4:4:4 chroma, quality52 and encoder speed2. Superseded WebP and tight-packing trials are not deployed. No other active character art is reduced in quality or resolution.

## Portrait master — selected

Edit target: upstream `dist/assets/reina-royal-portrait.webp`. Output `source-art/reina399/royal-portrait-master.png`; packed to512×512 WebP at quality94 for HUD/preview delivery.

> Precise edit: remove the thin white outline/white halo contour around this woman and her hair, shoulders and jacket. Keep the exact same headshot crop, face, blue eyes, cheek scar, long loose black hair (not ponytail), blue jacket, white garment trim, gold fittings, and plain dark navy background. Preserve white fabric trim on her collar: only the artificial external sticker outline around silhouette is removed. Clean crisp hand-painted game portrait art, natural dark hair edges. No outer white stroke, no border, no glow, no new text, no pose/identity/costume change.

## Marcus master — selected

Reference: current Downtown Marcus poses8–10. Output `source-art/reina399/marcus-held-master.png`; four poses uniformly registered to148 local units, a512×512 runtime WebP. Native maxHp60 identity selection is required.

> Create an exact identity-preserving game sprite sheet of Marcus from reference: brown short curly hair, stubble, muscular tattooed arms, off-white tanktop, olive brown cargo trousers and dark boots. Same crisp hand-painted illustrated game art. 2 columns x2 rows, four equal cells, transparent background, whole body in every cell, identical character size and fixed ground baseline. All face to the RIGHT. This sheet specifically replaces wrong raised-fist guarding poses while he is held by Reina. No other character or hands visible. Top left: FRONT restrained, knees slightly bent, shoulders pulled forward, elbows kept down and hands open low near belt, chin tucked and anxious grimace. Top right: FRONT held after knee hit, doubled slightly forward, teeth gritted, eyes clenched, hands open low, not guarding. Bottom left: REAR restrained, arms gently pinned close to his sides at waist, palms slack, knees bent, head level facing right. Bottom right: REAR restrained pain from knee to back, shoulders tightening but chest not turned away, face gritting and eyes squinting, arms remain pinned low. Never fists raised, fighting guard, dramatic backward lean, falling, running, duplicated limbs or opponent. No outlines/glow, no red/gray matte pixels. Preserve tattoos clothing face identity proportions. Generous clear margins. 1024x1024.

## Rejected gait generation

An experimental16-pose default-Reina gait generation retained matte artifacts and did not convincingly establish a new eight-phase gait. It was not integrated. The retained original gait artwork is used with corrected opaque pose selection and measured sockets. This rejection must not be described as a successful new walk/run-art implementation.

All artistic/feel decisions remain owner-review gates; no generated output is a certificate.
