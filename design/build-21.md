# Build 21 — defense, pickups and animation

PS5 DualSense support is a standing project requirement in AGENTS.md. Existing standard USB/Bluetooth, raw Sony, DSX, custom setup, diagnostics and controller menus retained; simulated controller suites pass. Physical hardware unavailable for verification.

Rear Velvet Room exit: verified automatic walk to back exit, enter animation, full-black scene swap and fade-in to Jackal's alley after all interior reinforcements and enemies are defeated. Existing transition preserved and regression coverage added.

Defense costs: block ceil(damage*1.7), plus12 for knockdown and6 for weapons; catch36 instead of24. Recharge7/sec instead of12, after1.5 seconds instead of1. Guard must be released to recharge.

Enemy drops: single defeat roll, hard cap5 across whole stage. Probability Marcus3%, Kevin5%, Carmen12%, Frankie18%, Bruno24%, Brick55%, Jackal70%. Successful drops:5%1-Up,40%food,55%valuable. Valuables money1000, phone1500, jewelry2500 score. Placed food/prop contents remain separate. Score grants an extra life every10000 points; direct1-Up adds one. Three starting lives, death consumes one and revives at same location with2 seconds protection; last life ends run. Lives shown in HUD. All kill paths including hold strikes use shared scoring/drop logic.

Reina ranges: palm108 instead of76; combo70/81/90/98 instead of62/73/82/90; cartwheel132.6 instead of115.6 units. Recovery roll is a90-unit continuous horizontal ground movement over.38 seconds away from nearest enemy, not a position teleport/spinning upright body.

Wake invulnerability: Bruno, Brick, Carmen and Jackal1second. Marcus, Kevin and Frankie retain previous shorter protection. Carmen wake sweep also receives1second. Wake protection blocks launches and ordinary grab acquisition.

Throws: identical held/released pose with crossfade toward landing sprite, matched release rotation, no double advancement on creation tick; retain continuous descending flight and single grounded impact. Some actions still share poses.

Carmen: short-reaching grab startup, captures then shocks in same motion for24damage/.8second stun; missed grab never shocks. Capture is interruptible before connection. New reach/shock art.

Palm cue: blue additive body aura, ground ring, rising particles and hand energy. Brightens as hold approaches.9seconds; full-charge hand ring marks readiness. Exists only during active charge and disappears on release/interruption; reduced-motion setting reduces movement/pulsing.

## Art

Built-in imagegen, alpha preserved: assets/sprites/recovery-taser-v1.png and recovery-taser-data.js. Four grounded roll poses plus two Carmen reach/shock poses. Prompt: polished16-bit pixel art transparent6-frame atlas; Reina Asian, long black hair, navy knee-length Japanese dress, pale sash, gloves/arm guards/sandals, scabbard/no tattoos; low tuck, shoulder roll, curled back, crouching landing; Carmen brownish blonde ponytail/navy police uniform, reach to seize collar then hand taser at torso level, opponent not drawn. Generator arranged four roll frames above two cop frames; metadata follows actual components.

## Validation

All23 regression suites pass, including simulated controller profiles/recovery, new drop boundaries/cap/single roll, score thresholds/life respawn, wake immunity/exceptions, roll continuity/direction, paired taser/whiff, rear-exit fade, existing throws/anti-air/furniture/HUD. Full ordinary-input simulated route:45defeats,308.5seconds,100HP, zero checkpoint retries. Browser QA verified blue full-charge cue, grounded roll, Carmen paired reach, and back-exit arrival in alley. Temporary QA page removed before packaging.
