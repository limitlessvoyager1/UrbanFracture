# Build260 — Nightshade input/grab repair and Flint openings

Checkpoint `checkpoint-before-nightshade-controls260` at Build259 source `b1b4944e774b48021b56e97de325a9a6bff91803`. This is a Gate5 repair; it does not claim later moves exist.

## Audit and scope

Nightshade's255gun,256ammo,257combo/charge/aerial/neutral grab and258directional throws exist. Blitz, specials, ground-roll dodge and counters remain disabled later-gate work; foreign weapon pickup/use has no Nightshade profile or art. Those inactive controls are missing implementations, distinct from the confirmed buffering defects below. No borrowed hero moves or placeholder weapon animations have been enabled. Native block, movement, gun and existing attacks are retained.

Confirmed defects:

1. Core's legacy idle-hold timeout still released regular enemies after1.5–2.2s, independently of Grab223. Grip124 also retained its legacy timeout. Both now defer idle escape policy to223 when that module is active. Counter-origin timeout, death, external interruption, explicit release and223 highHP heavy timeout/roll remain. Regular enemies and heavy/boss targets at or below40% do not escape solely because a normal hold idles. No random regular resistance is added. Post-get-up grab-only protection and repetition positioning remain unchanged.
2. Early Attack during `grabStart` went into the ordinary movement buffer, which cannot execute while holding. It now uses native `holdBuffer`, preserving selected direction and waiting for confirmed contact. No early throw or recovery cancellation.
3. Nightshade's hold handler returned false for Jump, allowing core to start an ordinary jump while still holding. Jump now routes through the existing Grip124 floor pivot. The shared owner performs continuous position/depth movement, facing/orientation swap, finite completion, buffered follow-up and cleanup. Nightshade reuses approved eight-phase walking artwork for footwork; no new purpose-drawn hand-contact transition artwork is claimed. Directional258 delegates transition buffering rather than attempting a throw before the pivot completes. Pivot destination respects active222 bounds. Existing maximum3 position switches per hold is retained.
4. Poison Dart Pen charge adapter and feedback now use2seconds. Preparation/release/recovery, poison chances, ammunition and other heroes' charge times remain unchanged. Inspector and timing test updated for the user's superseding requirement.
5. Wrist laser's added pushback increases2→6world units per successful pulse (6→18total for three contacts). It is clamped to active arena bounds; failed/non-contact damage does not move the target. Damage remains three2HP pulses, and current full-combo regression still connects the following flying kick.
6. Flint's existing armed AI already had separate wild/power definitions but only probabilistically discouraged three repeated moves. After two admitted identical attacks it now selects the other, preserving each weapon's normal chance before the repetition cap and all Director admission. No third repeated wild or power choice; no extra damage/speed. Each armed move's existing recovery receives120additional frames (2seconds at60FPS), remaining unarmored, stationary and punishable with finite completion. No changes to unarmed fallback or startup/active hitboxes.
7. Hold HUD now names Nightshade's actual throws and position-switch input rather than showing Reina's legacy directions. Unimplemented-button feedback no longer incorrectly says Gate1.

## Architecture retained

No new grab, knockdown, input, AI or rendering controller. Core,223policy,119sync,124transition,130charge,148Director,255gun,257/258moves,222arenas and approved144presentation remain authoritative. Existing sprite assets are unchanged; no raster assets added.

## Tests

`controls260-negative.cjs` loads actual checkpoint source in isolated VMs to reproduce the old idle regular escape and ordinary jump while holding; it then distinguishes repaired behavior. Current `controls260.cjs` has459assertions across all seven heroes/six regular archetypes, six-second holds, exact40% threshold, both grip orientations at30/60/120Hz, early contact buffer, grounded transitions and follow-up,2s charge, laser damage/pushback, four Flint weapons/both moves, finite+2s recovery and forced mixed selection. `controls260-input.cjs` adds12actual game.js pad-pump checks (standard/raw Sony/DSX) for earlyL2→Attack and Jump-as-grip-switch. Physical hardware remains untested.

Also executed current grab223-all (including legacy/current combat/controller acceptance), grip124, Nightshade257/258/259, and Flint211 exact contacts/armor/recovery/Director suites. A mistaken invocation of nonexistent `tests/grab223.cjs` executed no tests; the real `tests/grab223-all.cjs` was subsequently run and passed. Frozen initial/release outcomes are in RESULTS.md.

## Limits and next gate

Gate6 remains Running Arc Kick, Dual Ground Tasers, Piercing Power Barrage, Attached Explosive and Ground Roll. Nightshade foreign-weapon pickup/use animations and profile are also pending. The current fixes do not certify these missing controls. Full bespoke grip hand-contact art is not supplied by the reused walk footwork. Owner-approved screenshots/art, exhaustive move coverage, physical DualSense and human balance remain separate open gates. Do not label stable.

## Recovery

Restore saved Build259 version `appgprj_6adb9b94a3788191809a764c3e7bbb37~appgver_b4b602d2c9e881918b166bca366833f4` preserving owner-private access, or use the checkpoint tag in a separate recovery worktree. Avoid destructive reset of ongoing work.

Browser main-renderer evidence: `gripTransition124` observed at.25/.5seconds selecting approved walking frame3; after completion and3.25seconds total, Marcus remained in the confirmed front hold with both actors grounded, no action/stun/cooldown lock, and the correct Nightshade hold HUD. Flint's pipe power action remained in vulnerable recovery at2.75seconds (about.767seconds remaining). No terminal.local-origin console errors were observed in the sampled logs. `browser-grip.jpg` is review evidence, not an approved baseline.

Additional current-production-stack AI probe: four seeded40second runs, one for each Flint weapon, all produced both flintWild and flintHeavy through ordinary `g.tick`/outermost `ai`. No direct enemy action selection was used in that probe.
