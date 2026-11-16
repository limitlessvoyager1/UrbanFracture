# Universal grab audit — confirmed before modification

Baseline Build222: b819091a40ef2709f7f12c051e6e465f19277da6. Recoverable tag: checkpoint-before-grab223. Restore separately with `git worktree add ../urban-fracture-before223 b819091a40ef2709f7f12c051e6e465f19277da6`.

- core.js owns range/front-rear acquisition, ordinary holds, release, knockdown and get-up. Grab198 intercepts strong-target contact and retains existing synchronized119 reversal sequences. Hero-specific holdAction/animation modules remain authoritative.
- Grab198 currently derives grab strength from Niko185's debuff/counter category, incorrectly applying heavy grab resistance to standard Flint. Dedicated counter/debuff categories must remain separate.
- restricted198 includes active actions and Gus's old stagger condition in addition to HP. This can apply a resistance roll even at/below40% HP, contrary to the new universal default.
- The accepted/roll fields reset after each grab action. A single hold can therefore generate multiple resistance decisions. Grip transitions also have an independent random break.
- Grab198 timeout can randomly trigger damaging retaliation. The new timeout must always be nondamaging.
- Martial212 acquireGrab can randomly reject a first regular front grab (Saito12.5%, Akari10%). Their ordinary attack counter behavior can remain; hidden grab rejection must be removed under the new rules.
- CombatQuality169 adds .75s post-standing protection to every knockdown plus repeated-grab extra protection, using a6s memory. Native grabImmune, grabReady169 and Nova's legacy gate add overlapping timers. The new thrown-target policy must own one deadline, begin after get-up, and avoid tagging ordinary knockdowns as throws.
- Carmen210 and Martial212 have local post-throw response checks. Dorian and other wake attacks do not share one universal0.3s defensive-actionability rule.
- Reversal198 already provides contact events, release, cleanup, command lockout and shared119 ownership. Its random generic move selection needs deterministic enemy-appropriate selection, not another grapple state machine.
- Broxton's paid dash commits directly after acquireGrab, so it must participate in the same contested decision without bypassing the visible contact beat. Iron Will remains a specific bypass.
- LockedBattles222 preserves actor identity, states, offscreen admission and physical return. Grab memory/protection should remain on those actor objects and use that controller unchanged.

Implementation will retain full existing throw damage, hero move definitions, directional inputs, shared119 synchronization and individual special/counter exceptions. No repeated-throw damage scaling.
