# Production ownership and initial character/move coverage

This QA-only pass maps the main entrypoint's directly loaded script modules and starts a seven-playable-hero move matrix. It changes no game source. The semantic registry remains `pilot`; every feature remains `partial`. Owner assignment is a responsibility/impact mapping, not approval of artistic quality, balance, hardware behavior or complete test coverage.

## Ownership scope and dependency policy

The baseline main entrypoint loads 487 unique scripts. `production-ownership.json` assigns the 266 previously unmapped scripts to explicit domains and pins every assignment to its Git blob in the unchanged runtime tree. There is no wildcard fallback for unknown/new modules. Mixed gameplay/UI/data modules are assigned a primary responsibility, with conservative shared combat/render regression propagation. Eleven new domains cover the seven heroes, NPC combat, campaign/world interactions, weapons/resources and runtime UI/diagnostics; shared combat receives the remaining explicit helper paths. The source paths are individual files, not a blanket `dist/**` coverage claim.

Hero changes select that hero's suites and shared rendering dependents. Weapon/resource and NPC changes also propagate through shared combat to the heroes. Changes to QA infrastructure conservatively affect all domains after this registry becomes the approved comparison base. The existing impact planner continues to use the exact PR base registry, preventing a PR from silently replacing its own required regression selection.

This closes direct-entrypoint ownership gaps only. Alternate HTML entrypoints, dynamic imports, unused/historical runtime modules, complete dependency semantics and enemy/NPC move enumeration remain incomplete. The inventory includes developer/practice/diagnostic scripts because the shipping entrypoint loads them; that does not mean every such path executes during normal play. The four original feature boundaries are retained, and overlapping render/character ownership remains conservative.

## Character/move matrix

`character-moves.json` is the reviewable extraction/binding specification. It names explicit runtime selectors and source literals, and pins each reviewed test assertion to its exact test blob and excerpt. The generator obtains registered hero data through the existing isolated current-production simulation adapter. The current adapter loads 219 modules, compared with the 487 scripts inventoried in the browser entrypoint. It does not execute the full browser, renderer, hardware input or all UI/scene controllers. A selector or literal proves only that the definition exists in that bounded context; raw fields are retained without claiming they equal every effective final action clock.

The initial matrix contains 93 definition/ability rows across Reina, Broxton, Skylar Nova, Forest, Niko, Orion and Nightshade. It is not an exhaustive move list. Gunner is treated as Forest's companion in the ownership domain; enemy/NPC moves and the complete companion-state matrix remain future work. Registered coordinated moves, combo stages, directional actions, selected specials and charge labels are indexed. Per-hero `openFamilies` lists the known missing families; especially Orion's combat definitions are not given passing assertion coverage by unrelated asset/security tests.

Each row has separate dimensions for startup, active contact, recovery, damage, facing, interruption, simulated input, rendered evidence and physical controller. Definitions never mark these dimensions passed. Exact assertion excerpts are `assertion-located`; a direction loop alone is `scenario-located`. These statuses are source inspection facts, not execution outcomes. Scenario descriptions preserve target classes, facings, frame rates and fixture restrictions. Passing tests do not fill uncited dimensions or other moves in the same family.

## Commands and evidence

Run `node tools/qa242/production-coverage.cjs` for an inventory with no execution claim. Add `--require-current` to require the complete pinned runtime Git tree. Add `--run-evidence` to execute the eight explicitly selected catalog suites and verify their immutable receipts:

- Reina sword-stance actions and Dragon Tail special counter: `reina381-current`, `reina382-current`.
- Forest's six coordinated grapples and cancellation cleanup: `forest-grapples177`, `forest-protection177`.
- Niko's armbar scenarios only: `niko283-runtime`.
- Nightshade's four directional grabs: `nightshade-directional258`.
- Broxton's Blitz/lariat scenarios only: `broxton244`.
- Nova's three cited throws and late dropkick contact: newly cataloged `nova333-current` (the existing test file is unchanged). Its QA wrapper creates the required reports333 directory through the report containment guard, then runs the original test and preserves its generated JSON artifact.

The script uses the existing authoritative suite executor, retaining exact commands, raw exit codes, log hashes and generated artifacts under a new immutable `reports242/production-coverage/<runId>/` directory. It rejects dirty/changed/stale source, missing/duplicate results, command substitutions, skipped nested tests, altered logs and unexpected suite selection. A running/incomplete receipt never counts as a pass. It creates no manual evidence approval.

CI runs the fixtures, the selected move assertions, and the normal impact/shared suite job. Full reports are preserved in the artifact under `production-coverage/`: `ownership.json`, `character-moves.json`, `COVERAGE.md` and immutable execution logs/receipts. The source fingerprint covers the generator, extraction specification, domain registry and game/test inputs. The receipt hash and source identity allow the matrix claims to be independently checked.

Matrix rows can become `partial-assertions-passed` only for the specific verified bindings. All uncited dimensions remain `needs-review`, every row remains `certified: false`, and the game-release gate remains separate. The normal full release catalog grows from 341 to 342 suites because Nova's previously uncataloged current test is now retained in both profiles. This bounded pass does not execute or certify all 342 suites.

## Next coverage work

Prioritize Orion's missing current per-move assertion bindings, Broxton's throws/shield/Iron Will, remaining Niko coordinated moves, Nova DDT/trampoline/standard attacks, and all seven heroes' weapon/airborne/counter variants. Then enumerate enemy/NPC moves and campaign route interactions, attach deterministic rendered scenarios, test physical controller modes, and obtain separate category-specific owner evidence. Do not promote registry coverage or feature certifications merely because every directly loaded file has an owner.
