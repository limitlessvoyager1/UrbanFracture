# Build 221 — Aidan and route separation

Checkpoint: checkpoint-before-aidan221 at 29a045b9790bc1de35503e535aabb8b2d892ab7c.

The Tavern retains two 110-HP Aidans and its finite supporting waves. The Community Center/Arnell route has Colt as its only boss; no Aidan pair is added there. Colt's original introduction, Carmen support, defeat/outro and destination remain intact. This supersedes the earlier request to match Community Center Aidans to the Tavern pair.

Regular Aidan is 75 HP with 10% block and 15% evasion attempts; scripted Tavern Aidan is 110 HP with 20% and 25%. Both remain standard enemies with ordinary grab/counter/knockdown rules. Encounter presentation does not activate boss or heavy protections.

The existing Slums204 actor and ordnance lifecycle remains authoritative. Molotov startup/release is 35 frames, recovery 41; knife is 16/4/27. Target position locks at hand release, with 30% bounded observed-movement lead. Bottle flight has a 0.55-second minimum. Cooldown is 7–9 seconds. Shared two-slot accounting includes startup reservations, airborne bottles and 5.5-second patches. Interrupted windups release reservations; released hazards survive owner defeat. Fire ticks share actor cooldowns, damage allies, preserve synchronized protections and do not repeatedly stagger. Ground ellipses and escape-path checks bound placement.

Aidan has FIRE CONTROL, RETREAT and DESPERATION behavior, observable defensive commitments, permanent knife disarm, no anti-air or attack armor, and enforced recovery. The native Director retains its three-point/two-commitment limits. Regular-spawn eligibility requires story introduction and explicit section enrollment; no separate global adaptive controller or unrelated encounters were invented.

Validation: tests/aidan221.cjs covers both profiles, Tavern/Colt separation, 30/60/120-Hz hand release, fixed target, fire-slot transfer and expiry, all six heroes' knife contacts, recovery, disarm, interrupted slot cleanup and offscreen/progression gates. Slums204/203/202, Gus219, Truck220 and controller suites pass. Full human Normal balance testing and physical controllers remain unverified.
