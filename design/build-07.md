# Build 07

Added a dedicated three-pose fall, ground, and rise atlas for Reina, Marcus, Bruno and Jackal. Knockdowns slide into a pavement impact and dust puff. Defeat waits for Reina's fall. Recovery protects Reina while rising and for one full second after standing; recovery rolls retain the same post-roll protection.

Opening Marcus enemies are spaced and activate in stages (1, 8 and 15 seconds, with positional triggers). Removed floating damage numbers. Enemy portraits sit beside red target bars below Reina's blue bar.

Eight-frame walks blend between adjacent poses; attack preparation, extension and recovery blend with eased body motion. Movement interpolates between simulation ticks.

Front grab: forward+J shoulder throw (24), back+J back throw (26). Rear grab: forward+J rear throw (28), back+J suplex (32). Heavy enemy weight restrictions remain. Forward+L Silent Horizon travels through enemies once each for 36 damage, costing 18 HP; neutral L remains 26 damage/12 HP. Props cannot take repeated hits from a single dash.

Validation: all combat, contact/poise, full-level, actual renderer, sprite metadata and HUD regressions pass. Added dedicated fall timing, landing dust, forced-hit recovery immunity, directional throws, traveling dash and opening spacing checks. Browser inspection confirmed grounded sprites; playable level loaded and sword command reduced health correctly.
