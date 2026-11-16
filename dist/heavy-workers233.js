
(function(root){'use strict';const N=root.NeonCombat,W=N.Workers233,I=N.EnemyIdentity233;
Object.assign(W.definitions,{
heavySwing:{name:'workerHeavyCrowbar233',times:[23],active:[7],recovery:40,damage:[20],reach:153,weapon:true,knock:true,category:'heavy',heavyOnly:true},
overhead:{name:'workerOverheadCrowbar233',times:[33],active:[7],recovery:48,damage:[24],reach:135,weapon:true,knock:true,category:'heavy',heavyOnly:true},
shoulder:{name:'workerShoulder233',times:[24],active:[6],recovery:35,damage:[12],reach:92,push:20,category:'heavy',heavyOnly:true},
heavyGrab:{name:'workerHeavyClinch233',times:[28],active:[6],recovery:42,damage:[0],reach:68,capture:true,category:'grab',heavyOnly:true},
stomp:{name:'workerGroundStomp233',times:[27],active:[5],recovery:38,damage:[15],reach:80,ground:true,category:'heavy',heavyOnly:true},
antiAir:{name:'workerCrowbarAntiAir233',times:[21],active:[6],recovery:35,damage:[12],reach:112,weapon:true,air:true,knock:true,category:'heavy',heavyOnly:true},
unarmed:{name:'hook',times:[24],active:[5],recovery:36,damage:[14],reach:96,category:'heavy',heavyOnly:true}});
I.registry.heavyDockWorker.implemented=true;
W.armorWindow=function(e){if(!W.heavy(e)||e.weapon!=='crowbar'||!e.act?.worker233)return false;const a=e.act;if(!['heavySwing','overhead'].includes(a.kind233)||a.t>=a.recovery233)return false;return a.t>=a.times[0]-(a.kind233==='overhead'?8:3)/60&&a.t<a.recovery233;};
W.armor=function(e,o={}){const source=o.attacker;if(!W.armorWindow(e)||!source||o.weaponArmor249||o.force||o.grab||o.flight||o.armorBreak||o.armorBreaker||o.counter||/counter/i.test(source.act?.name||''))return false;const dx=(source.x-e.x)*(e.act.dir233||e.dir),dy=(source.y-e.y)*2;return dx>0&&dx/Math.max(.001,Math.hypot(dx,dy))>=.5;};
const armor=N.Audit135.strongArmor;N.Audit135.strongArmor=function(e){return W.is(e)?e.workerArmorContext233?W.armor(e,e.workerArmorContext233):W.armorWindow(e):armor(e);};
const recover=N.LockedBattles222.recover;N.LockedBattles222.recover=function(g,e){return W.is(e)?Math.max(recover(g,e),W.recovery(g,e)):recover(g,e);};
N.Adaptive222.registerEnemy('heavyDockWorker',{cost:3,strong:true,role:'melee'});
})(typeof window!=='undefined'?window:globalThis);
