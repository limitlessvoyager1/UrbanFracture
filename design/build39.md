# Build 39 — damage rebalance and aerial drops

Reina standing combo 4+5+6+10=25; blitz8+8+14=30; charged palm29; clear-out28 (12HP).
Front hipthrow21, outerreap22, releaseGerman28, rear takedown16+18=34.
Front neutral grab6+6+11=23: two knees followed by a downward open-hand chop and knockdown. Rear knees and existing boss two-hit grab escape remain unchanged.
Broxton standing combo6+7+9+13=35, following the latest explicit35 request rather than the earlier38 value. Chargeduppercut39; clearout23 (12HP).
Forward specialslam47 (21HP): dashspeed270 for.26s and44px acquisition, versus390/.38/62 before. Approximately114px stationarytarget reach. One landed non-grab hit during approach deals damage but consumes armor and preserves action; second hit can interrupt. Existing committed paired-slam protection retained.
Down+Attack while airborne now carries both heroes diagonally in their horizontal jump direction (facing fallback for neutral jumps), keeping the existing descent clock/landing and near-side target stop. Reina knee-to-grab preserved.
Updated move help and cache versions39.

Validation:45 Node test files passed including both full stage routes and native standard/rawDualSense/DSX simulations, damage totals, exactthrows, grabchop, charge/specials, slam reach/miss, onehitarmor and both directions of diagonal drops. Physicalcontroller hardware unavailable. Historical damage assertions updated to newbasevalues; close-slam tests moved into reducedrange. Route bot now approaches dormant doorkeeper when noactiveenemy remains, rather than walking past him. Reinforcement removed from isolated corecombat arena to avoid randomspawn contamination.
Browserpreview checked currentloaded assets and Reina knee-drop/chop rendering; temporaryQA removed before packaging.
