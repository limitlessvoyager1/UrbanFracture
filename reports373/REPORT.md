# Build373

Renamed Hammer from Jamarr to K'marr in the canonical runtime name registry and retained specification. Phone dialogue and responder labels consume that registry. Verified exact spelling and dialogue speaker rendering.

## Arrival correction
The previous normal call selected from all five role IDs even when some role providers were unfinished; any missing provider aborted the entire pair after payment. Live connection now selects only registered fighter providers. Byron and Michelle therefore both arrive in the current build without a developer override. The full-roster selector remains available for reproducible balancing tests; Colton's configured10% rarity takes effect in live play once his provider is implemented. If fewer than two ordinary fighters are registered, calling is denied before animation, payment or cooldown. No silent post-payment arrival failure is used for normal calls.

Verified30 ordinary phone calls with no developer pair override: two real actors arrived each time, exactly30 energy spent and no pending-role aborts. Verified unavailable-roster denial preserves energy/cooldown. Existing145 role checks,3541 phone checks and full-roster selection tests pass; updated the legacy phone test which had expected the incorrect deferred-arrival behavior. No new browser or physical-controller claim is made for this correction.
