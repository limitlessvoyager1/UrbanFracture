# Downtown facade renderer ownership

QA-only prerequisite on PR #27 head 9a5aa5faccf42dbf5e243a84366a824377c83fac. Map the existing exact path dist/downtown-view351.js (blob fac2a7d1d949a993d396496209acfeaa584bed89) to campaign-world and shared-fighter-rendering, owner limitlessvoyager1. It composes facade panels and owns Downtown enemy rendering. This is outside the main-index directly loaded module inventory; no claim of full alternate-entry coverage.

No production code, wildcard, planner bypass, test reduction, source pin refresh, acceptance or certification changes. Required shared rendering and campaign regressions remain. Owner pilot evidence stays separate from game certification. No merge or protection change.

Also map exact existing dist/flint351.js to shared-fighter-rendering and npc-combat: it renders the native carried pipe, including the local prop function also used by visual362. This prevents repairing only the lower-priority generic atlas path while the active native pipe remains unchanged. No production code changes.
