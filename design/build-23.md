# Build 23 — protected formation, aerial control and rear finishers

Brick and original two escorts now wait side-by-side at x7880/8000/8120, y400, in the doorway background. Dormant actors reject all damage (including force/collateral), launches and grabs. Remain dormant until existing district waves and enemies cleared and Reina approaches; activate together at playable depth444. No additional guards introduced.

Brick defense loop: startup of dash/hook/clinch resists interruption and takes35% damage from ordinary player attacks. Recovery is interruptible and has1.05second cooldown. Dash movement stops34units short of its aimed player position, so misses can be dodged/punished instead of crossing through player; timed catches accept dashPunch, bypassing ordinary heavy grab threshold as other successful counters do. Existing block-three retaliation, wake protection, cooldowns and variety retained.

Neutral jump+Attack uses distinct stationary aerial kick20damage. Jump+Down+Attack uses knee drop18damage without knockdown, descends to ground at.22seconds and finishes at.42. Press Grab during the knee to buffer acquisition, or within.45seconds after landing. Follow-up requires connected living grounded opponent with no committed action, valid lane/distance and ordinary grab eligibility (heavies retain40% HP threshold/wake protection). No automatic forced grab; anti-air can interrupt.

Moving jump attack locks depth for duration and stops on near side of its targeted enemy, preventing passage behind them. Neutral kick has no horizontal velocity. Normal jump movement and aerial sword targeting retained.

Rear grab Away+Attack: release German suplex30damage instead of34, .52 instead of.68second action, .28release,140unit backward flight; existing8damage collateral hits enemies behind Reina. Rear grab Forward+Attack:1.04second continuous takedown and punch,18damage at.32 and22ground damage at.7 (40total), keeps victim grounded and moves Reina into punch position. Front throws unchanged.

Kevin: long-range decision frequency still30%; knife throw startup.25 instead of.45seconds, action.8 instead of1; projectile600 instead of420units/sec and22 instead of17damage. Rearm/cooldown retained.

## Art
Built-in imagegen transparent atlas `assets/sprites/grab-air-v1.png`, metadata `grab-air-data.js`. Seven held poses: Marcus/Kevin/Bruno/Frankie/Carmen/Brick/Jackal bent torso, knees flexed, arms inward struggling. Five Reina poses: neutral aerial kick, diving knee, forward rear-grab takedown, kneeling ground punch, release suplex. Actual atlas layout4top/3middle/5bottom; component metadata follows generated layout. Held poses also feed paired throw/flight interpolation instead of abruptly returning upright. Existing attacks may share key poses.

Prompt: polished16-bit transparent12-sprite atlas; all facingright isolatedfullbodies. First7 held victims with no captor, maintaining cast costumes (white/green/gray tanks, bikerchains, dirtycopuniform, suitedBrick, burgundyJackal). Last5 Reina Asian/longblackhair/navy Japanese dress/palesash/gloves/armguards/sandals/scabbard performing stationary airbornekick, divingknee, forwardtrip, groundpunch and releasesuplex, no opponent drawn. Consistent anatomical proportions and generous gutters, no floor/text/energy.

## Validation
All25 regression suites pass. New coverage: complete dormant immunity/formation, stationary neutral kick, forward depth/target stop, buffered knee grab and heavy resistance, rear damage/timing/collateral, Brick startup mitigation/recovery/timed dash catch, faster22damage projectile. Existing simulated PS5/DSX/raw/custom mapping and controller recovery tests retained. Full ordinary-input route44enemies,463.0seconds,60HP, zero checkpoint retries (noHP/damage overrides). Browser QA: background doorway lineup, natural held Marcus, kneeling rear punch and stationary aerial kick. Temporary QA page removed before packaging. Physical DualSense hardware unavailable.
