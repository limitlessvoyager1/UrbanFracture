# Published Downtown rendering host ownership

QA-only prerequisite for the Reina repair, based on PR #20 at ad8c31389abba99da1dd96918b40098cd9bdbf76. Add the exact existing path dist/game360.js (base blob b1ccedf7cbb923b24b1fc3ed91208577e0647ba1) to shared-fighter-rendering, owned by limitlessvoyager1. This host contains drawActor, the painter order for settled drops, HUD portrait dispatch and grab cues. It has the same semantic responsibility as the already mapped dist/game.js.

The published source and GitHub host have different default-hero/startup details; the repair must apply its two relevant rendering/cue changes to each host's own base rather than replacing GitHub's host with the published copy. No host code changes are included in this prerequisite.

No wildcard, planner exception, test reduction, source-pin refresh or certification-status change. The planner still reads comparison-base ownership. The main-entry production inventory remains scoped to dist/index.html; this single explicit responsibility mapping does not certify every published entry, dynamic import or move. Required shared rendering regressions and all manual/performance/hardware holds remain. QA pilot acceptance and its authenticated owner comment are separate from game certification. No PR merge, main update, branch-protection change or publication.
