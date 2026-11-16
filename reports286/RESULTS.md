# Build286 results

137 automated suites passed; zero failed. Five manual gates were not executed. The tested source remained unchanged during the full release run. This is a playtest build, not stable certification.

Checkpoint:checkpoint-before-legthrow286 at63113537621677e92ccfad79b853d6b798db858f.
Source fingerprint:fab010cae08319413e64205c46e2bb354fe970389d80f241f56ea6931d1d5207.

Niko front grab + forward + Attack now performs the referenced leg catch, pivot and rolling takedown, a short raised-leg hold, swift snap, pain recoil, release and hands/kneeling/standing get-up. Configured timeline132frames,14stages. Twelve authored wholebody hero keyposes plus source-textured inbetweens; enemies use their own lifetime body/prone sources and one shared native pair clock. These are not132 individually painted pictures per enemy.

New runtime suite163934assertions:23native practice factories, both directions,30/60/120Hz, all stages, shared lane/ankle, two correct damage contacts, native leg injury at snap, no premature injury, safe interruption, deferred lethal/refill cleanup and recovery. Renderer suite1961280assertions:all132frames ×23native identity fixtures, finite floor-constrained mesh vertices and exact held ankle mapping. Asset suite:12fixed-anatomical-scale wholebody cutouts, authored sockets and binaryalpha. Roster/frame boundary records:3059samples in frame-traces.json, initial state plus132configured simulation boundaries per enemy.

Base damage14 remains (8floor+6snap), with existing injury/retaliation bonus. Snap has65%regular leg injury chance; stronger targets retain native chance/duration resistance. Native grab eligibility, specialist rules, recovery and anti-farming protection remain. No pin, no prolonged submission and no neck chop.

Browser review:actual native front-forward input through capture, rolling pose atframe30, snapping pose at80, kneeling get-up at110 and return to native idle after completion. Screenshots:snap.jpg and getup.jpg. Rehearse leg takedown is available in Niko single-opponent practice; same Playback265 frame controls and actual phase readout. No second simulation controller.

No automatic artistic corrections beyond deterministic atlas alpha extraction/packing. Superseded13throat-only283cutouts are retained byte-identically outside deployed assets, verified against the checkpoint. No unrelated artwork recompressed. Other grabs, movement and controller systems remain covered by existing regression suites. Legacy283assertions were migrated only for the intentionally replaced throat move; armbar behavior and historical art checks remain.

Manual review still required:owner-approved screenshot baselines, artistic review across every costume, exhaustive other-move coverage, physical DualSense and human balance. Automated fixture geometry is not full artistic certification. Reports242contains the complete suite list, modified-file inventory and existing unresolved QA findings.

Execution:node tools/qa242/run.cjs --profile release (exit2 means manual review remains; no failed suites). Individual commands:node tests/legthrow286.cjs;node tests/legthrow286-view.cjs;python tests/legthrow286-assets.py.

Implementation, rollback and source-art provenance:IMPLEMENTATION.md and GENERATION.md. Current build rollback and temporary balance-default restoration remain separate operations.
