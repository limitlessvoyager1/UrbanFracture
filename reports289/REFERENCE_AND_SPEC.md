# Marcus reaction prototype: reference analysis and improvement specification

Reference clips: `Screen Recording 2026-11-08 090317.mp4` (44.57 s) and `Screen Recording 2026-11-08 090538.mp4` (33.50 s), supplied by the user. Times below are local recording offsets, not the YouTube playhead shown inside the recording. The captures are 30 FPS; repeated/paused source frames and overlays prevent claims about exact original game timing or input latency.

## Reference observations, before production-code modification

| Clip / offset | Visible evidence | Principle; limits |
|---|---|---|
| 090317, 0–6 s | Contact bursts coincide with extended striking limbs and opponents bending or being lifted. Multiple targets recoil in the same visible contact cluster. | Align the hit event with anatomical contact; preserve an identifiable silhouette. Exact active frames and hitboxes cannot be measured from this recording. |
| 090317, 6–12 s | Knocked opponents rotate from a raised/tilted body toward a horizontal floor pose. Others remain standing away from the immediate contact. | Give a fall an ordered loss-of-balance, descent and landing sequence; avoid treating background movement as proof of an AI commitment rule. |
| 090317, 15–19 s | The red-clothed opponent extends a long attack while Axel changes height, lands and approaches. A close hold follows. | Readable full-body poses distinguish reaching, airborne and grounded states. No claim about invulnerability or attack priority. |
| 090317, 18–20 s | Both participants move around a close contact point during a hold/throw, then the released body follows a separate trajectory. | One shared capture clock and anchor until release. Exact throw eligibility, damage and input are not observable. |
| 090538, 0–1.2 s | Close strikes visibly bend the green-clothed opponent, followed by a larger lifting/rotating displacement. | Light contact should produce a readable recoil; a launching hit should read differently. Cannot infer hidden stun duration. |
| 090538, 1.2–3.8 s | A second opponent is lifted, rotates through several distinct orientations, reaches the floor and settles. | Separate airborne fall from impact and ground rest, with intermediate silhouettes. |
| 090538, 12–24 s | Several opponents approach at different distances and depths while active hits interrupt nearby bodies. | Preserve lane readability and deliberate spacing; exact attack-slot budgets, probabilities and AI rules are unknown. |
| 090538, 24–30 s | A larger opponent is knocked to the floor; other bodies remain grounded or disappear after defeat. An isolated complete get-up is not clearly established. | Ground impact/settling can be studied here. The proposed support/kneel/rise standard is an Urban Fracture design requirement, not measured reference timing. |

Neither clip establishes a sufficiently isolated, unambiguous example of every block/armor category. Clean-hit contact bursts and recoil are visible; colors alone do not prove armor. Do not invent armor rules or change Urban Fracture protections based on these clips.

## Urban Fracture comparison and proposed original implementation

Deterministic engine recordings use Niko against Marcus, Bruno and Saito, Normal difficulty, fixed seed289, identical positions and queued physical attack edges. The calibration stage displays real native world positions, native sprite rendering and runtime HP/state. It is not a full-level browser recording or physical-controller latency certification. Keep the three control traces unchanged outside the Marcus renderer.

| Confirmed difference / review item | Current Urban Fracture | Why it matters / owner | Original correction / test |
|---|---|---|---|
| Marcus standing recoil lacks intermediate anatomy | Build288 holds `thug:10` through the first three successful Niko contacts; only lateral movement/brightness changes. | A hit can feel ineffective even when mechanically interrupting. `combat-view274.js` presentation. | Marcus-only original recoil keyposes: contact, compression, peak, settle and guard. Native stun controls the entire sequence. Pixel pose diversity and stable feet tests. |
| Marcus fall lacks intermediate anatomy | Native launch advances world position while drawing one recovery flight pose, then switches flat. | Translation without anatomical change reads as sliding/snapping. `sprites.js` recovery presentation. | Six authored loss-of-balance/fall poses followed by distinct impact/settle poses. Native flight and down clocks remain sole owners. Check every simulation frame and both facings. |
| Sparse get-up | Flat → one kneel → standing; standing appears before native down ends. | Visual and mechanical state differ. Existing recovery renderer. | Roll, palm support, kneel, crouch, rise, guard within existing recovery duration. No early attack or recovery cancellation. |
| Niko attack pose snapping | Standing attacks still have only idle plus a held strike pose. | Hero-side continuity remains deficient. `niko-view185.js`. | Document only; outside this prototype. Do not claim that improving Marcus fixes Niko's attack art or input behavior. |
| Timeline mislabeling | Niko sentinel hit time hides contact phases; Marcus can be labeled actionable while stunned/locked. | Bad telemetry obscures real behavior. Playback actor adapter. | Document only. Compare measured native events rather than trusting the phase label. |
| Hitstun / interruption | Build288 Niko–Marcus contacts interrupt eligible attacks and preserve 0.5 s standing stun. | Existing mechanics must survive presentation work. Shared damage/AI. | No timing change. Compare complete before/after mechanical traces, force attacks during each non-actionable phase, verify first actionable tick. |
| Armor and blocks | Ordinary Marcus has no armor/block in the measured scenario. Bruno and Saito retain native specialist rules. | A bright ordinary hit must not be misdiagnosed as armor. Shared feedback/eligibility. | No armor removal or specialist changes. Log clean hits, armor effects, guarding and actual damage separately; record unavailable block evidence honestly. |
| Plane, hitbox, group pressure | The supplied reference alone cannot establish equivalent hidden geometry or AI rules. | Avoid changing combat balance based on impressions. Collision/Director. | Record native distances/planes and admission events. Mark unconfirmed causes as suspected; no broad AI or hitbox rewrite. |

## Prototype boundaries

Only ordinary Marcus reaction rendering changes. Exclude worker disguises, special bosses, synchronized captures, injury/grapple floor presentations and non-back falls. Keep native damage, stun, launch arc/travel, collision plane, AI, invulnerability, cooldowns and action completion intact. No copying reference pixels, poses, audio or code. Original Marcus atlas uses only the game's own existing character as appearance reference.

Use reusable clock-normalized reaction templates, but register only Marcus after validation. Future characters require their own art, anchors, scope exclusions, continuity evidence and native-mechanics equivalence before enrollment. Automated passes do not certify artistic approval or physical-controller responsiveness.

## Group probe evidence

A300-frame native Niko/Marcus/Bruno/Saito calibration recorded a maximum of one reserved attack slot, threat cost2, two granted requests and zero denials. Niko ended at92HP. This does not prove the global attack limit is one or certify balance; it is one short observed sequence. No excess-pressure defect is confirmed by this probe. See group/summary.json and group/thug-1x.mp4 for exact observations.
