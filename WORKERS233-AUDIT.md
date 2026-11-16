# Enemy audit / Build233 work in progress

Checkpoint: checkpoint-before-workers233, source01359186aa203d034a372b983a52d45ba642ed34.

None of the requested four enemy definitions existed in Build232. Existing native enemyAct/start/update/hit/damage, Director148, Adaptive222/LockedBattles222, weapon122, Grab198/223,119 sync, Niko185 debuffs and electrical205 remain authoritative. New content can extend these without a second combat director or knockdown machine.

Latest addendum controls HP/classification/names: regular worker80/REGULAR, heavy105/HEAVY_BOSS, Spectre100/REGULAR, Torrance450/HEAVY_BOSS. Latest steering explicitly removes Frank from the approved pool (29 remaining names). Name and appearance seeds are independent deterministic hashes of the stable actor identity and run seed; no per-frame randomization or combat-stat variation. Living-name deduplication never blocks spawning on exhaustion.

The visible full specification AND both saved text copies end at Phase19, Disengagement Throw, animation step2. They do not supply the remainder of Spectre or any Torrance moves/individual grab overrides. No prior implementation exists to preserve for those missing sections. Their requested metadata is recorded, but those entries must remain unspawnable until the missing specification is provided. Do not claim their full combat systems are implemented.

Implementation gates: regular worker first, then heavy worker, each separately verified before enrollment. Only dock uniforms/equipment. Existing heroes, enemies, levels, forklift232, weather and global attack budgets must remain unchanged.
