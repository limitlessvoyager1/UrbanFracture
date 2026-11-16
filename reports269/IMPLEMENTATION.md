# Build269 — recording review
Recovery: checkpoint-before-reina269, Build268 f9eadc7f9f7adaccecc683cfb4080418fc67c7ea. Existing combat/render/Director/encounter controllers retained.

| Recording issue | Repair and evidence |
|---|---|
| Reina gait blur, floating knife | Discrete authored walk/run frames; frame-specific hand metadata; steel blade/grip/guard silhouette. Browser inspected. |
| Weapon breaks | Existing durability event emits eight pooled-lifetime fragments, drawn after fighters. Knife/pipe/plank/crowbar final-use tests; foreground browser inspection. |
| 7s lock entry | Existing controller pans .45s and walks hero into arena before simulation resumes. Final walls remain at viewport edges; maximum two locks per section. |
| Single knife stab | One step-forward, three-contact sequence at10/18/26frames; 50frames total; existing26 total damage divided across slices; one durability use. |
| Bruno anti-air/mashing | Preserve reaction delay/Director permission, defer ground choice during eligible jump reaction; denied commitment may retry. Existing earned pressure guard restored for next opener after three hits, never during mandatory recovery. Native20seed close-jump test admitted8 uppercuts; no guaranteed success. |
| Saito double rise ~45s | Floor/pending pose remains down until single native kip owns rise. |
| Missed punches ~48s | Correct shoulder-to-hand segment origin so nearby hurtboxes are not behind segment start; unchanged far reach. |
| Counter clasp/facing ~58s | Separate upper/lower hands around leg; preserve victim facing through native rear-grab acquisition. Mirrored tests. Procedural clasp art awaits human approval. |
| Touch grab ~23s | Auto range48 matching manual; shared protections/recovery preserved. Recording also includes eventual successful grab; valid protection is not bypassed. |
| Kevin wake blur ~25s | Discrete existing rise frames instead of blended costumes. |
| Marcus/Kevin armor | Ordinary armor exclusion applies even while held; stale wake armor/invulnerability hints cleared. Ordinary blocking retained. |

Validation: initial81/81; final frozen release86/86, zero failures, five manual suites not executed. sourceChangedDuringTests=false. New runtime70 assertions and render18 assertions plus floor/kip sequence; existing weapon466 and render98 checks. Release report is authoritative. Physical DualSense, exhaustive human balance/art review, all-move certification and approved screenshot baseline comparison remain open; status needs-review, not stable.

Corrections during development: caught/fixed counter-render variable error, foreground shards initially hidden by bodies, rear native acquire reversing facing after clear, and Bruno ground-choice suppression during reaction. First initial run failed an old immediate-camera assertion; it now waits for the intentional pan while retaining edge/max-two checks. A neutral jump90units away is outside existing non-approaching anti-air eligibility; corrected controlled fixture to70, no range buff. Original failed log/report retained.

Storage: no raster assets changed. Attempted lossless background repacks saved zero bytes and were not used. Archived12801bytes of internal full-line comments across69files, preserving line breaks/executable bytes/licenses. reports269/comment-storage.json retains exact reversible text/hashes; reconstruction verified. Updated older header proof to exclude intentionally edited files. This is storage-only, not art approval.

Reproduce: node tools/qa242/run.cjs --profile release; node tests/reina269.cjs; node tests/reina269-view.cjs. Developer pose controls in ?qa259=1 inspect walk/run/slices/counter/fragments using native actions. They are controlled inspection fixtures, not ordinary gameplay changes. Rollback by restoring verified Build268 source/version, with confirmation before discarding later work.
