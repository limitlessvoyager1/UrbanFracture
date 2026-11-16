# Marcus289 limited prototype

Authorized by the user's Streets of Rage4 quality-reference request; this supersedes Build288's stop-before-implementation gate for Marcus reaction presentation only.

Checkpoint: checkpoint-before-marcus289 at3b1bf5da662badab5265bfadc6c1620dbd8a01a5. Existing gameplay, damage, timing, hitstun, AI and assets remain unchanged. Production additions: reaction-templates289.js, marcus289-data.js, marcus289-view.js, original Marcus atlas; index loads them. tools/qa242/render287.cjs enrolls the new renderer in real-asset QA.

Original24-pose atlas generated using only the existing Urban Fracture Marcus source as appearance reference. Transparent source retained under art-source289, shipping WebP94. No reference-game sprites/audio/code are reused. Fixed import scale137.2/215; pixel-preserving render and per-pose sole/packing anchors. Only ordinary unarmed Marcus enrolled; non-palm flight, armed variants, worker variants, synchronized/injury-floor poses delegate.

Before/after: three300-frame native runs, Niko vs Marcus/Bruno/Saito, fixedseed289 Normal. All recorded mechanical fields match; sampled control-enemy actor pixels identical. Eight-page report,300-frame ledger, six calibration recordings and combined1x/0.5x/0.25x comparison retained. These are native-engine calibration captures, not full-level browser recordings. Live browser verified quarter-speed hit60to57 and exact+1/+5/+10; physical pad remains untested.

Tests: marcus289248 assertions passed; marcus289-render1011 passed; focused mapping/playback/input/Niko/recording287/devmenu passed. Frozen release142 passed,0 failed,5 manual not executed, needs-review. Additional old controller-recovery.test.cjs failed setup.done and reproduced from exact checkpoint gamepad/test files; source unchanged. Not a new regression; not silently fixed. No stable-build claim.

Read REFERENCE_AND_SPEC.md and ARCHITECTURE.md. All reference observations use clip offsets, not YouTube time. Exact reference frames/input latency/AI rules and isolated armor/block/get-up examples are not invented. Niko sparse strike poses and Developer Panel adapter defects remain outside this prototype. Review Marcus first before enrolling any other enemy.

Final atlas was reduced from470022 to452772bytes at identical1536x1024 dimensions and identical alpha, pose metadata and anchors. After optimization,248 runtime and1011 pixel checks passed again, native captures were refreshed, and the full142-suite release profile passed again. Five manual gates remain open. A300-frame group probe is retained; one observed reserved slot is not interpreted as a global AI rule.
