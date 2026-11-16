# Certification-readiness procedure

This is QA infrastructure, not game certification. The feature registry remains `pilot`; its four features remain `partial`. No evidence record or human approval is manufactured by these tools. Gameplay, branch protection and merge decisions are outside this change.

## Coverage inventory

Run `node tools/qa242/coverage.cjs` to write `reports242/readiness/coverage-inventory.json` and `COVERAGE.md`. CI uses `--require-current`, which fails if the runtime Git tree differs from the pinned snapshot or source text is unavailable/modified. A partial local checkout may still generate a report, explicitly listing those limitations; it cannot pass the CI completeness check.

`coverage-source-index.json` records GitHub Git-tree metadata at accepted PR #10 source `83c1c9311a835ec41867d41654d788eea6200002`. It inventories top-level runtime modules, recursive runtime assets, top-level tests, recursive design documents and specifications. Test fixtures, source-art and historical archives are excluded. New readiness QA files are outside that baseline snapshot. Refresh the index from a verified, non-truncated Git tree when runtime source changes; never label a stale inventory current.

The matrix lists runtime file ownership, verified literal test references and direct catalog links. A reference is a discovery aid, not an assertion or execution receipt. Missing references can reflect helper-based coverage; test names and text mentions do not establish coverage. Assets are counted by metadata, not visually approved. UI hero selectors are not a complete enemy/NPC roster. Move-source and level-source filenames are inspection candidates, not a complete move list or campaign certificate.

Next inventory work is to enumerate each hero/enemy/NPC and move; map startup/active/recovery, facing and interaction scenarios; enumerate campaign routes/objectives/transitions; then link each requirement to actual assertions, rendered scenarios and current-commit execution receipts. Resolve ownership/dependency gaps explicitly instead of adding a blanket owner pattern and calling coverage complete.

## Separate game-evidence approval

Every evidence category keeps its own record: `visual`, `art-style`, `all-moves`, `physical-controller`, `human-balance`, `performance`, `performance-baseline` or `baseline-report`. Approval of one record does not approve another category or the whole game. Existing authenticated `APPROVED` GitHub reviews remain valid via the legacy path, subject to their existing checks.

For owner-comment approval, use an external certification bundle under `reports242/` with the existing record fields plus:

```json
{
  "baseCommit": "<exact PR base SHA>",
  "approval": {"method": "owner-comment", "pullRequest": 11}
}
```

This fragment is illustrative, not a usable certificate. The complete record still needs its ID, category, exact tested commit/source fingerprint, authorized owner, scopes, scenarios, actual artifact paths/hashes and any benchmark fields. Set a provisional valid ISO `approvedAt` while preparing the template; replace it with the authenticated comment's exact `updated_at` after posting. Approval metadata and `approvedAt` are excluded from the evidence digest to avoid a circular signature; the final verifier nevertheless requires the comment timestamp to match.

1. Freeze the candidate PR head and base. Produce immutable rendered/manual/benchmark artifacts and a complete evidence record. Keep the bundle and evidence outside fingerprinted source paths. Committing evidence metadata into `qa/` after signing would change the candidate source and invalidate approval.
2. Generate the exact comment with `node tools/qa242/game-evidence.cjs template --record reports242/RECORD.json --repository limitlessvoyager1/UrbanFracture`. This only formats a template; it does not validate artistic quality, execute tests, verify artifacts or grant approval.
3. The repository owner personally reviews the category evidence and posts that exact template on the record's PR. The template uses `QA242-GAME-EVIDENCE: ACCEPT` and binds the repository, PR, record ID, kind, base/head, source fingerprint, evidence digest, feature scope and scenarios. A pilot acceptance comment cannot substitute for it.
4. Copy the comment's authenticated API `updated_at` into the external record's `approvedAt`. Verify with `node tools/qa242/game-evidence.cjs verify --record reports242/RECORD.json --repository limitlessvoyager1/UrbanFracture --commit FULL_SHA --source SHA256 --scope feature1,feature2`, using read-only `GITHUB_TOKEN` access. The verifier checks actual artifacts and the explicit expected source/scope in addition to the comment. No token or unavailable API means Blocked.
5. Assemble verified records into an external bundle and supply `--certifications reports242/BUNDLE.json` to the normal runner. Baseline performance records still go through the separate approved-baseline and measured-comparison checks. Only the normal full release checker can evaluate overall game certification.

The latest repository-owner marker comment for the same `Record:` ID controls approval, including edits to older comments. Post a newly generated template with `ACCEPT` replaced by `REVOKE` to revoke it. A newer malformed, stale or mismatched comment blocks that record; the verifier never falls back to an earlier acceptance. A different record ID cannot override it. Owner identity is authenticated against repository metadata using both numeric ID and login; PR repository, current base/head, comment origin and timestamp must match. This path supports a user-owned repository; organization-owned repositories fail closed until an explicit approver policy is implemented.

Source, category, artifacts, scope, scenarios or base changes require fresh evidence signoff. After a comment edit, update the external timestamp and reverify. A signed record cannot waive failed tests, incomplete semantic coverage, absent physical hardware testing, missing visual captures or invalid benchmark measurements. This change supplies the signoff mechanism; actual certification records remain empty until real evidence is produced and approved.
