# Build 40 — Reina front-grab special and charge timeout

Front grab + Special (keyboard L / PS5 Triangle) now performs Twin Fang for Reina:17HP once, shared1.2s special cooldown, push victim from clinch to78px over.24s, sword hits19 at.34s and19 at.64s; second hit knocks down. Neighboring enemies in146px forward/34px lane take8each slash (16total), knockdown on second hit, with their normal defenses. Primary uses guaranteed held-finisher damage. Rear-grab special and Broxton specials retain prior behavior. LowHP (<=17) and cooldown leave the hold intact without payment. Uses existing proportion-preserving push/sword poses plus two alternating slash arcs and sword sounds.

Reina traveling forward sword special32damage,18HP. Other special costs unchanged.

Both charge attacks cancel if continuous hold exceeds4seconds, clear charging pose/energy, and latch until release. No automatic normal attacks, recharge, cooldown or HP payment after expiry. Release does nothing; fresh press can charge again. This uses the shared Attack input path for keyboard/touch/controllers; input bindings unchanged.

Validation:46 test files passed, including46/46 suite result; new tests verify both facing directions, push before hits,19+19/8+8, final knockdowns, out-of-range/off-lane immunity, single17HP payment, insufficientHP/cooldown behavior,32damage slash, both heroes before/after4s and continued hold/release/newattempt. Existing campaign and simulated DualSense/DSX tests pass. Physical controller hardware unavailable. Browser preview inspected live sword pose and slash effect after assets loaded. Temporary QA page removed before packaging.
