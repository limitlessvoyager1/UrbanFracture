# Build41 — automatic directional Reina counters

New counters.js is loaded after heroes/paired-motion and before the UI. Input choice and facing are latched at R1/C press, including simultaneous controller away input; Reina holds her stance during the existing0.55s intercept window. L1 remains block. Attempt costs10;0.95s between accepted Reina attempts. Further presses during lockout cost10 without renewing the window. Held button edge behavior remains. Successful total cost includes initial10:40 for unarmed normal enemies;80 for knives, other weapon evasions and heavy/boss enemies. Heavies (Bruno/Brick/Otis/Jackal/Leroy) require <=34%HP, shared with Broxton. Broxton retains manual follow-ups.

Automatic Reina branches (relative direction at counter press):
- Punch forward:existing7+7+14 combo, launch and8 collateral.
- Punch neutral:24 close takedown.
- Punch away:21 hip toss behind,8 thrownbody collateral.
- Kick forward:step-in34damage forearm knockdown.
- Kick neutral:shove aside and grip-switch into normal rear grab,0damage; player chooses rear moves.
- Kick away:20 close sweep knockdown.
- Knife stab/slash:anydirection32 close arm takedown;knife drops,attacker cannot replace it. DisarmedKevin switches to unarmedAI without changing permanenttype/identity;Jesse/Leroy retainguns but knifeactions becomehookpunches. Existing nonknifeweapon evade behind opponent retained.
Successful branch shows gold diamond,COUNTER and branch label;automaticmode HUD prompt. Shared grapple sampler now carries countertakedowns continuously to floor. Actual kick attacks by weaponcarriers remain kickcounters,not batonevasion.

Validation:48 Node test files passed. New liveincoming simulations exercise all7branches,bothfacings,nearbylandings,rearhold,disarm/rearm prevention,exact40/80costs and34%gate,insufficientmeter,blockexclusion,latehitandmashgap,hipcollateral. Fullshipped-runtime VM tests cover standardDualSenseUSB/Bluetooth,rawSony,andDSXdirectionalR1,awayfacing,heldedge,anddamage. Both100HPReina/125HPBroxton financialroutes now explicitly load the counter module. Earlier coreprimitive tests retain their isolated fallbackcorebehavior. Existing controllerregressions pass;physicalhardware unavailable.
Browserpreview visually inspected forearmcontact/cue,automaticreargrab and disarmingfloorcontact;temporaryQAremoved beforepackage.
