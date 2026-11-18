# External evidence input — prepared, not accepted

The data-only ZIP input is a QA transport. It never grants owner approval, game certification, or performance approval. Current empty records leave all five manual gates blocked. Physical controller evidence remains separate.

1. Freeze the candidate head and base before reviewing. Generate the local review pack from that checkout. Any source or QA-input change invalidates its fingerprint. The review manifest identifies uncommitted QA preparation explicitly.
2. Inspect the captures and play the local game. Record actual failures and omissions. Controlled native renders are not physical-controller or complete all-moves evidence.
3. Populate staging certifications only with real, source-bound artifacts and schema-valid records. Use the existing game-evidence tool to generate exact owner wording AFTER records are complete; the repository owner posts the comments personally. Never replace missing evidence with an acceptance assertion.
4. Performance requires a named hardware/environment target, six actual metric fields, sample count, a real separately approved baseline, and target/benchmark artifacts. Do not use the candidate as its own historical baseline. A baseline's owner comment must bind its own tested commit/PR.
5. Seal the staging directory with tools/qa242/evidence-pack.cjs seal --root CHECKOUT --stage STAGE --output NEW.zip --repository limitlessvoyager1/UrbanFracture --pr 35 --base EXACT_BASE. The ZIP is immutable and limited to 25 MB; retain every required artifact. Do not upload the launcher/review HTML ZIP as certification input.
6. Attach the data ZIP to a PR comment. Retain its SHA-256 and GitHub attachment URL. No owner acceptance is implied by upload.
7. Once these QA-only changes are published, dispatch QA242 on the candidate branch with base_commit, candidate_commit, pull_request_number=35, change_file=qa/system242/changes/colton-sharpe.json, evidence_bundle_url and evidence_bundle_sha256. The authenticated current PR must match the exact checkout, base and head. Full release selection still runs. Keep every failed/blocked result visible.

Only HTTPS GitHub ZIP attachments are accepted; redirects are restricted. Downloading attachments does not forward the GitHub token. Archives reject traversal, links, executable input, case collisions, unlisted files and excessive sizes. Imported data stays under reports242/external/ and is archived with the QA run. Actual artifact digests, source identity, scope, scenarios and owner comments are revalidated by existing category checks.

The workflow input must be pushed and verified on GitHub before dispatch. No merge or deployment is required to prepare or review this pack. These instructions do not authorize either action.
