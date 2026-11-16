# Orion motion import and get-up repair

Scope: ORION-003, the first Orion repair. The original transparent source sheet and character design are unchanged. Explicit48-frame rectangles replace the erroneous uniform12-row/4-column crop. Source hashes, complete-body checks, native frame order and fixed per-sequence scales are retained in `source-art/orion384/motion-layout.json`.

The old grid cuts through get-up bodies and imports pieces of the neighboring row. The new importer rejects opaque boundary cuts, missing/multiple body components, changed source hashes and per-pose scaling. Each eight-frame get-up sequence uses one fixed scale calibrated from its final standing pose to190 import pixels /128 logical units. The existing motion scale is retained for the other32 poses. No anatomy is stretched and the independently authored facings are preserved.

Reproduce with Python3, Pillow13.0.0 and NumPy2.2.6:

```
python tools/orion384/pack.py --family motion
python tests/orion384-import.py
```

The focused mode preserves all other atlas files and data. The full pack command remains for complete Build384 source checkouts. The narrower GitHub recovery increment contains the motion source/repair and retained metadata; it does not contain every other Build384 source-art family. Do not run its full-family packing mode until those inputs are synchronized.

GitHub PR14's production entry uses the older Orion205/271 presentation. The published Site uses Build384. This repair does not activate Build384 in the older GitHub entry, copy unrelated later hero work or alter production script order. Its recovered motion pipeline/assets are retained in GitHub for review and subsequent source reconciliation. Only the existing published Build384 instance consumes the corrected atlas immediately.

Validation: five Python regression groups pass, including the original cut as a negative fixture and48 reviewed source rectangles. Existing QA242 native render audit passes64 scenarios /5,308 frames /142 dispatched poses, both facings and202 optic socket frames. Existing gamepad and controller157 regressions pass. Native damage, startup/active/recovery clocks, input mappings, status, collision, AI, balance and all runtime JavaScript are unchanged. The old blocked Python-path attempt is retained separately; the corrected QA242 run passed4/4 selected suites.

This is a scoped repair, not full character/game/artistic/hardware certification. Other Orion audit findings, approved neck-hold/electrified-weapon work and unresolved QA gates remain open. New screenshots are review evidence, not approved baselines. No merge or branch-protection change is included.
