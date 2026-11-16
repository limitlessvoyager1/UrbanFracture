# Build 235 — Chinatown

Recoverable checkpoint: `checkpoint-before-chinatown235`, source `30fa032ee9240d9838374954cf2b053aa9554658`.

Campaign: Government office → Casino → Chinatown gateway → lantern market → dojo approach → dojo. The current Governor boss remains pending; the existing clear office now has a Casino exit. Casino retains its real Ophelia/Jameson defeat gates and victory bonus before carrying the same hero and environment into Chinatown.

Four new detailed pixel-art backgrounds include a reference-inspired red-column, blue-beam paifang, shopfronts, lanterns, and a timber training hall. Sky cutouts and indoor window metadata reuse the global environment. `tools/import-chinatown235.py` documents atlas preparation.

The dojo uses four opening thugs and the same native Saito (90 HP) and Akari (72 HP) instances throughout. They wait visibly at the far right, protected only during staging. After the thugs and mandatory recovery settle, both activate together with their existing Martial212 AI, REGULAR grab classification, and shared Director148 pressure limits. Both must be defeated for completion. Shared Adaptive/Locked222 provides at most two locks per section; no duplicate AI or arena controller.

Validation: all six heroes complete the streets and staged dojo; 30/60/120 Hz staging, recovery and shared admission checks; all six heroes at all three rates traverse the Government/Casino handoffs; four-scene render/picker/retry tests; Highway, Docks, worker integration and full Prison224 regression suite passed. Browser review confirmed gateway and waiting-pair dojo composition. The existing random Flint kick sample initially flaked, then passed on rerun along with the full suite. Physical DualSense and human balance playthrough remain unverified.

Two existing sprite WebPs were repacked to fit the hosting archive budget. Alpha and every visible RGBA pixel are identical; only invisible RGB under zero alpha was normalized. See qa/chinatown235-lossless.json. No sprite dimensions, anchors or combat changes.
