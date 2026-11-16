'use strict';
// HP deltas over the observed window, not nominal move damage or contact receipts.
function hpReceipt(spec,initial,final){
 const primaryVictim=spec.group==='shared'&&spec.move==='powerbomb'?'hero':'opponent';
 const observedHPLoss={hero:initial.heroHP-final.heroHP,opponent:initial.opponentHP-final.opponentHP};
 return{actorRoles:{hero:'player',opponent:'fixture enemy (q.e)',primaryVictim,sampledVictimAlias:'frames.state.victim/victimHP refer to opponent, including enemy-owned powerbomb'},hpWindow:{start:'after native action admission',initial,final},observedHPLoss,primaryVictimHPLoss:observedHPLoss[primaryVictim]};
}
module.exports={hpReceipt};
