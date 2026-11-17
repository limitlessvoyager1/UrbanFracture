# Syndicate Backup phone feedback

An unavailable R2/F request now plays a short operator ring and queues a non-repeating sarcastic operator line after 0.25 seconds of simulation. It does not start the vulnerable call animation, spend energy, reset cooldown, or summon additional allies. Held input is still edge gated; repeated taps share a four-second operator feedback interval. Restricted scenes and stopped gameplay remain silent.

The HUD has exactly two miniature silhouettes below Broxton's life/energy meters. They light when backup can be called and dim during cooldown or other unavailable states. Dispatch, active support, departures, individual defeats, retry, energy shortage and injured-roster recovery have distinct feedback. The active duration bar reads the existing common 20-second deadline and decreases with simulation time. The reserve item and target panels move down only for Broxton, preserving readable spacing.

Existing backup subtitle events now use the existing optional system-speech route for call answers, Broxton's responses and operator feedback as well as departures. The Sound switch gates speech; pause/mute cancels queued speech. This remains placeholder system speech, not final voice acting. Subtitles work with Sound off.

The four completed responders, native ally AI, 30-energy cost, 90-second cooldown, five-second interrupted-call retry, 141-frame call, frame-114 connection and one-second ear wait are preserved. Iron Will and all controller mappings remain separate. No new character art is introduced; Colton Sharpe and later full-integration/certification assignments are still pending.

## Source and validation

- Local checkpoint: `checkpoint-before-phone-feedback`, published-source commit `063981f73a1dc1cea139fa9bd1e8f3bb6675e0bc` (Site version 374).
- GitHub changes are applied as focused patches on `51bd06be8f5378b1630b73da3cd2b54fdb6ddd6a`, preserving the existing Orion repair stack and the separate GitHub/hosted entry points.
- New regression: `node tests/phone-feedback.cjs`, 67 checks; passed on both the current hosted-source entry and the GitHub entry adapter.
- Retained current phone pacing test (`broxton366`): 3,541 checks passed. Shared selector/support, four-provider combat, entries, continuity/departure, injury, gamepad and controller157 regressions also passed. These are software simulations, not physical-controller certification.
- `tools/phone-feedback-render.cjs` renders six actual HUD states; see `reports/phone-feedback/hud-states.png`. This does not certify complete gameplay rendering or artistic acceptance.
- Local browser playtest showed dispatch, active shrinking timer, readable reserve placement, rejected-call operator text, no further energy spend, and existing ally combat/departure. Browser speech audio quality and physical DualSense were not verified. Browser-extension metadata errors were present; no game-origin exception was observed in this bounded smoke.
- Rebuilt using the current Orion384 package procedure: source/retained asset identity passed, 595 exact script strings, 483 retained scripts, 1,069 retained asset files, estimated expanded TAR 268,290,560 bytes under the 268,435,456-byte limit.

The broader initial QA242 diagnostic run was stopped after 100 Passed and 13 Failed suite receipts, with one in-flight suite Blocked and 141 suites Not Tested. Raw failure logs, the full observed process transcript and explicit omissions are retained in `reports/phone-feedback/qa-initial-partial.json` and adjacent files. Failure attribution is Unknown because no authenticated comparable baseline was supplied. It is not a completed initial profile and is not a release certificate. A passing targeted check does not waive failures, incomplete coverage, owner visual acceptance, performance or hardware gates. This change is a draft candidate. Do not merge the stack or promote this work as stable while required gates remain blocked. The live Site is unchanged.
