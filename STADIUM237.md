# Rhinos Stadium — Build 237

Checkpoint: `checkpoint-before-stadium237` at f56110a66ec907771ed0e84f9bf1c40dd10641c5.

Highway Exit 18B enters tailgate parking, ticket gates and the westbound concourse. The elevator offers UP to the shorter, heavy-enemy VIP route, or DOWN to team facilities and locker rooms. Both reach the west field and then the east end zone. Nine native scene-select entries permit direct testing. Airport and Power Station exits remain intact.

Eight original detailed stadium panoramas, sixteen transparent Baylor poses and eight fan poses use grey/electric-blue Rhinos branding. Tailgates include grills, coolers, food trays, tents and pickups. Native destructible cars yield one reward. Fans have fixed appearances and measured foot anchors. VIP glazing exposes the field; press/catering doors support visible entries. Artwork is imported into assets/stadium; tools/import-stadium-sprites237.py records sprite extraction. Existing transparent sprite repacks preserve alpha and every visible RGBA pixel; qa/stadium237-lossless.json contains verification.

## Architecture audit and reuse

Existing core movement/collision, six hero implementations, 119/198/223 synchronized grabs, Director148, Adaptive/Locked222 and environment156/162/217/218 remain authoritative. Stadium237 is route/section configuration and finite content; Baylor237 is one scoped enemy AI extension. No duplicate global encounter, weather, input or grapple controller was added. Script loading follows Mall236 and precedes Input226. Rendering and portrait hooks use the existing sprite pipeline.

Baylor's previously supplied design was recovered before implementation: 450 HP, 25% ordinary damage reduction with grab/special exceptions, 50% ordinary grab breaks at any HP without retaliation, Personal Foul, Bone-crushing Hit, Hard Tackle, Piling On, Interception and low-health Adrenaline Rush with exhaustion. His official display spelling follows the latest request: Torrence Baylor. The existing internal torranceBaylor identifier is preserved. He is scripted-only and excluded from adaptive selection. Spectre's unfinished implementation remains unchanged.

Initial Normal tuning at 60 FPS (startup/active/recovery): helmet foul 26/6/34; charge 30/30/48; tackle 20/16/42; grounded piling 34/8/48; interception 20/6/44 on miss. These are new tuning values, not recovered original specifications. Interception reuses the protected synchronized slam framework. One accepted ordinary grab roll bypasses the default high-HP second roll; counters and explicit Iron Will exceptions retain their rules. Native hero throws and specials keep full established damage. Charges lock direction/lane and miss into mandatory recovery. Rush begins at 150 HP, then periodically yields 2.2 seconds of exhaustion. Boss activation waits for the finite warm-up, an actionable player and arena admission; completion waits for landed defeat. Maximum two locks per section includes the scripted finale.

Scoped repairs: Director148 classifies Baylor's heavy attack cost; legacy Bruno outgoing multiplier/armor are excluded for Baylor; all six native timed body-charge counter paths recognize his tackle/charge; native Route197 car contact clocks support Stadium for Forest/Niko. Ordinary enemies and other routes retain their prior branches.

## Validation

PASS tests/stadium237.cjs: all six heroes, both full routes, highway handoff/old exits, preserved player/world, waiting boss, solo activation, two-lock limit and final completion once.
PASS tests/baylor237.cjs: five moves at 30/60/120 Hz, damage, full recovery, grabs, immunity/special exceptions, rush/exhaustion.
PASS tests/stadium237-contracts.cjs: six real directional throws/grab specials, one roll/full damage, six car contacts, charge lane evasion, protected synchronized player, adaptive exclusion and six timed counters.
PASS tests/stadium237-view.cjs: assets, foot roots, scene/camera finite coordinates and scene registration.
PASS existing prison224-all, highway234, mall236, Chinatown235 campaign, Forest counters127, Niko counters186 and Nova128/regression suites.

Visual browser review: detailed parking/fan foot placement, VIP suite and goal-line hero/Baylor staging. The older forest-counter-controller127 harness fails at started/paused setup identically against the previous Build236 game.js; this is not introduced by the stadium change. Current controller157/playtest226 results are recorded separately. Physical DualSense operation, human Normal-difficulty balance and every synchronized pose alignment are not certified by automated tests.
