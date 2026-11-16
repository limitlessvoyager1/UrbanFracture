
(function(root){'use strict';const N=root.NeonCombat;
function pose(f){const a=f.act;if(!f.weapon||f.hp<=0||f.down||f.flight||f.heldBy||f.stun)return null;if(!a)return f.recovering>0?{index:7,phase:'recovery'}:null;if(!a.flint101)return null;const hits=a.times101||[a.hitAt],end=a.recoveryStart147??Math.max(...hits)+.17;if(a.t>=end)return{index:7,phase:'recovery'};let stage=hits.findIndex(t=>a.t<=t+.17);if(stage<0)stage=hits.length-1;const dt=a.t-hits[stage];return{index:dt<-.045?(a.name==='flintHeavy'?6:3):dt<=.09?4:5,phase:dt<0?'startup':dt<=.17?'active':'follow-through',stage};}
N.Flint208={pose};
})(typeof window!=='undefined'?window:globalThis);
