# Build259 — loading, Kevin throw, Nightshade recovery and arena repair

Recovery tag: `checkpoint-before-loading-kevin259` at `c1195106c3ff7344550b12906e121c8a9bf095a4` (Build258). Scope is a repair pass; Nightshade remains Gate5.

## Confirmed causes and changes

- `game.js` drew the world while illustrated assets were still loading. The pre-ready draw now paints only the loading background; startup remains unavailable until the existing shared readiness promise resolves.
- Kevin's Street209 throw used a clipped torso plus a rotated arm cropped from the same full-body pose. The throw now uses the existing complete ready/release bodies, at their unchanged atlas scale, with the knife attached only until frame17 release. Projectile timing, velocity, damage, plane and AI remain unchanged. Other non-throw cropped-rig paths were not redesigned.
- Nightshade's airborne attack recovery selected the broad `main-9` crouch rather than the approved foundation landing. The renderer now selects the existing foundation landing for grounded airborne recovery and the fourth-combo landing. The144logical presentation factor, source artwork, damage and recovery timings remain unchanged.
- Retail's camera could lag in the previous Downtown section when a lock opened. Arena222 now constrains its lock camera to the current section before deriving edge walls. The existing sole max2 ledger already admits at most two total scripted/adaptive locks; regression tests demonstrate a third scripted lock is refused. No duplicate encounter counter was added.
- Neutral Nightshade grab257 had no persistent cleanup reference. If a hit cleared `player.act` between ticks, the next update could lose the only reference needed to release `forestLock125`, hold and session. It now retains the reference until normal finish, interruption or reset cleanup. Directional258 retains its existing separate reference/cleanup and shared119/223 sessions.
- The gun unnecessarily rejected a positive Blitz cooldown even when the hero was otherwise actionable. Removed that cooldown-only restriction; native active-action/recovery admission remains mandatory.
- R2 presses during the final.24seconds of a finite Nightshade melee/gun recovery now occupy one bounded input slot. Recovery is never cancelled. The slot expires, cancels on damage/down/transition/reset/action replacement, fires only when native Unique251 admission permits, and uses one existing255 handgun action. Held R2 remains edge-only. Earlier inputs are rejected normally.
- Unique251 reports the handler's actual acceptance instead of declaring dispatch success before calling it, and preserves the handgun's own draw/empty feedback. Ammo HUD shows numeric rounds and persistent EMPTY information; six-round limit and native256 pickup rules are unchanged.
- Removed obsolete Gate3/COMBAT PENDING gameplay messages where Gate5 is already active.

## Retained systems

Native Brawler clock, movement, hit detection, recovery, controller pump, Unique251, Gun255 projectile ownership, Melee257, Grab258,119 synchronization,223 grab classification/contest/protection,222 arena ledger, environmental simulation and other heroes are retained. No new combat controller, knockdown state machine or art asset was introduced.

## Verification

Targeted repair259:235 assertions across section-edge camera/max2 including scripted, all four throw→gun→attack cycles at30/60/120Hz, approved landing selection, whole-body Kevin throw.

Targeted Nightshade259:48 assertions covering late R2 buffer, no recovery cancellation, exactly one round, held-edge suppression through actual game.js/pad pump, cancellation on interrupt/reset/transition, cooldown admission, empty finite action, external neutral-grab cleanup and pre-ready draw suppression. This includes a reproducible between-tick neutral-grab interruption. It does not establish that every detail of the user's original freeze was identical.

Browser preview: native front sweep and rear roll start, release, finish and subsequent Unique input observed; rear roll consumed one round6→5, action/hold/held/stun/cd all cleared. Retail camera1680, bounds1704..2616 give logical24/936 visible walls. Kevin frame15 reviewed with complete authored body. Aerial recovery observed selecting foundation-10 at the approved fixed scale. These are developer-controlled scenarios, not complete manual combat or physical-controller certification.

First initial profile found two compatibility defects introduced in this repair: the early view fixture lacked a gun module, and Unique feedback overwrote the handler's DRAW/AIM/FIRE feedback. Both were corrected in production code, without weakening the existing tests. Frozen rerun and release totals are recorded in RESULTS.md.

## Limits

Physical DualSense hardware, owner-approved screenshot baselines, complete every-move artistic review and human balance remain open. No stable certification is claimed. Kevin's existing artwork is retained rather than replaced; this pass does not certify every unarmed-rig pose. No screenshot baseline has been overwritten or promoted. The full campaign was not manually played end to end.

## Rollback

Build258 saved version: `appgprj_6adb9b94a3788191809a764c3e7bbb37~appgver_60d62a1b4834819181ddb4fdbd701b3c`. Redeploy that saved version preserving the existing private audience, or create a recovery worktree from the checkpoint tag. Do not destructively reset ongoing work.
