# Build 22 — circular axe blitz and encounter tuning

Rebuilt blitz with three kick contacts at .18/.34/.52 seconds, damage8/8/16 to all standing enemies in a125-unit front arc/lane; third hit knocks down. Forward travel98units, .82-second action, 2-second post-action recovery. New anatomical sprite set at a constant .356 scale, normalized against standing Reina, replaces oversized straight-kick sheet. Light-blue circular slash and heavy impacts. Strong enemies independently choose guard35%, dodge25%, anti-air25%, or ordinary response15% when free and close to a newly started blitz. Anti-air still obeys readiness/cooldown/lane rules; grounded interruption retained.

All anti-air cooldowns2seconds after completion; standingLock1second after getting up, separate from immunity. One-second wake immunity only Reina/Bruno/Brick/Jackal. Carmen retains .2/.4 short existing protection; no one-second immunity. Brick dash cooldown1.5seconds after finish, also reserved on startup to protect interrupted startups.

Marcus/Kevin dimensions now match: Kevin's atlas scale increased from .3973 to .4558 (standing local height137), both rendered .92. Kevin/Brick use new kneel and halfway-rise poses over final .6 seconds of recovery, followed by standing pose. Shocked Reina uses dedicated rigid/jolting pose with electrical arcs for taser stun.

Exactly three Carmen encounters: hotel district, Velvet Room, alley support. Earlier restaurant/retail and other extra Carmen slots replaced with ordinary enemies.

Brick's original Marcus/Kevin escorts remain dormant with him until nearby and every other district enemy/pending wave is cleared. No replacement escort pair. Brick/Bruno ordinary grab threshold now <=40% HP (60% depleted). Consecutive guards count; three blocked strikes trigger Brick hook/Bruno front-kick retaliation, with reset and punishable recovery. Non-forced attacks and launches respect guard.

Guaranteed full-health item at Brick activation and at Jackal encounter start. Furniture can reveal hidden food/valuables once when tipped by contact or attacks,22% roll, shares existing five-random-drop stage cap. Visible full-health medkit renders separately.

Velvet Room patrons: seated woman/table, seated bar customer, seated couple/table, bartender behind counter. Nearby combat after4seconds makes some patrons leave using walking variants and fade near exit. They are scenery, not targets or collision actors. Bartender clipped at bar top to appear behind counter.

## Assets
Built-in imagegen, preserved alpha: `axe-shock-getup-v1.png` (9frames) and `velvet-patrons-v1.png` (6frames), metadata `build22-data.js`. First prompt: production16-bit transparent3x3 sprite atlas, Reina navy Japanese dress/sash/scabbard/long black hair; three circular axe kick poses, rigid shock, Kevin green-tank kneeling/half-rise, Brick suited kneeling/half-rise, Reina standing landing. Second prompt: transparent3x2 nightclub patrons atlas, seated red-dress woman/table, dark-jacket man/barstool, waistcoat bartender/towel/glass, matching walking woman/man and seated couple/champagne. No text/floor, consistent body scale, rich pixel clusters. Existing player/controller sprites retained.

## Checks
All24 regression suites, including simulated PS5/controller mapping/recovery, exact three Carmen spawns, gated two-escort Brick encounter, full heals,40% grabs, three-block counters, standing lock/2second anti-air, dash cooldown, three-hit blitz/recovery, varied reactions and hidden pickups. Full ordinary-input route passes with checkpoint retries; no playerHP/damage overrides. Browser QA: axe sprite/slash vs Marcus/Kevin scale, shock pose, kneeling get-up, seated patrons/bar customer/bartender. Temporary QA page removed. Physical DualSense unavailable for hardware verification.
