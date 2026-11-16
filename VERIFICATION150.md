# Continued verification — current gameplay contract

Source under test: b9622dab214e2b8633d609d12e9b2a33729d0bf1 (Build149).
Run `node tests/current150.cjs` from the repository root.

The runner executes22 current compatible suites in isolated Node processes. It loads the complete combat chain through Lab149 for focused combat and the72 standard/raw Sony/DSX charge controller cases. It substitutes current-contract coverage for archived charge130/combat-controller134 expectations (three-second hold and Nova release activation) and uses reina-repair147/director148 coverage for later Bruno timing and coordination rules. It does not alter production values to satisfy historical expectations.

Passes: current counters and weapon disarms; hit-confirm gating for all heroes; grip/throw synchronization;104 suplex variants;24 Tornado DDTs;308 grapples;72 current charge mapping cases; all-hero charge locomotion; seven camera-locked scene layers; log-only traversal and upward cabin entry; four-hero lab spill/fire/90-second wave/exit/timeout; powerbomb and mounted-tackle controller cases;240 seeded director encounters (budget<=3, concurrent commitments<=2, finite positions and integer scores).

No production file changed in this verification pass. No new runtime defect was confirmed. Existing Build149 browser observations remain the visual evidence for Reina's planted supporting foot and lab fire/countdown. This pass is automated regression verification, not a human Normal-difficulty balancing session or a physical DualSense hardware test. The90-second reinforcement timer remains initial tuning pending user playtesting.
