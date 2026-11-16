# Niko aerial and submission repair191

Checkpoint: checkpoint-before-niko-air191 at564c8c410f9e88a57a13331bf6c29bf0c2aea0fa.

Jump alone now renders a tucked, guarded jump, without damage. A separate Attack input in air selects the neutral downward knife-hand chop (6 damage) or the original forward kick (7 damage). Both stay on the committed combat lane. Landing ends the airborne pose immediately and allows a six-frame planted recovery; late attacks cannot hold the hero above the floor. The final simulation frame also preserves the attack's plane.

Down+Attack retains the existing airborne target scan and Niko185/Recovery119 interaction ownership. Niko descends into the pin over18frames, then holds the victim on the same floor. Hold forward for an armbar or away for a leg lock. The joint impact occurs27frames after selection, once:4 takedown +4 submission damage, with the established capped25% success bonus and70% injury chance subject to class resistance. No new resource or damage multiplier. Mandatory submission protection ends before14frames of vulnerable recovery.

Pin setup/wait is vulnerable. Eligibility preserves ordinary strong-enemy health gates, wake/regrab protection, owned target exclusions and boss-protected phases. Waiting uses existing ordinary hold deadlines:2.2s standard,1.5s cop/biker,1.1s enforcer,.9s bouncer,.75s boss. Enforcers retain the30% early break rule. Escape releases both participants, applies ordinary player recovery, and restores wake/repeat-grab immunity. Pins count toward the existing repeat-grab history. No indefinite pin or resource-free joint-hit loop.

Concussion's overall8-second status is unchanged. Episodes now last2seconds against standard enemies (existing class duration resistance scales strong/boss episodes). A concussed downed enemy queues an episode for standing up, rather than lying stunned. Stars remain visible through the standing stagger. Episodes have a1.8–2.6second actionable gap and cannot interrupt protected scripted actions.

Eight new transparent cutouts use one fixed import scale across jump/chop/pin/armbar/leg-lock. Source: built-in ImageGen; prompt persisted at design/niko-air191-prompt.txt. Existing forward kick, portraits, counters, ordinary damage budgets, other heroes, controls and weather remain. Developer inspector: niko-air191.html.

Validation: tests/niko-air191.cjs covers30/60/120Hz and late landing, manual attack, both mounted directions/facings, one joint hit, escape/eligibility and two-second wake stagger. Existing185/186/189/190, gamepad and current15026-suite regressions pass. Browser inspected neutral jump, chop and mounted armbar. Physical controller and human balance testing remain unperformed.
