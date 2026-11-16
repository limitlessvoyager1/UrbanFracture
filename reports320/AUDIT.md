# Gate 2 reserve inventory audit

Approved checkpoint: eafe74eed0529fd2c0b78bf7315c8268b3b7b0ec (Build 319).

The native world overlap loop already routes registry items through MasterItems319. Gate 2 will intercept only its five recovery kinds: store an eligible pickup into an empty owner slot, leaving resources unchanged until explicit use. Full slots leave world items intact. Exchanges return the old item to the world with a new transfer identity while retaining the old claimed receipt; no silent deletion or new loot roll.

Energy remains owned by Energy316 and actual recovery by MasterItems319.collect. New inventory calls that existing effect only after validating a reserved item's owner, unconsumed receipt, and native safe state. Money, ammunition, lives and weapon pickup are not reserve items.

All seven heroes have native registry keys, but selectHero currently resets the scene. Preserve economy and reserve ownership around that existing selection operation; do not introduce campaign switching (Gate 7). Normal room/level progression retains game state. Explicit fresh resets clear inventory. Versioned validated economy exports include reserve ownership; this does not add durable full-campaign save/load.

Keyboard I and raw L3 + R3 open the panel. L3 + Options remains developer tools; R3 alone remains weapon pickup; Touchpad is not bound (later smartphone gate). Menu uses existing pause, navigation/confirm/back and release gating. Do not open while unsafe, in route/story/ride menus, settings or developer tools. State checks precede pause because pause cancels held charge input. A safe opening never changes combat timers. No recovery is applied while an unresolved action is active.

Reserve icon will occupy its own right-side HUD card below the existing top bar (x748–944, y80–114; Forest uses y144–178 below Gunner and held-weapon information); it must not cover HP/energy/lives/weather/wallet/score or the enemy target card. Original Gate 1 atlas will be reused; no art generation or art-style conversion.

Scope stops before Gate 3 smartphone. Proposed geography must still be reviewed before Gate 11 final map artwork.
