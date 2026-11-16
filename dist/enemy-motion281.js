/* Presentation clocks use resolved displacement, never attempted movement. Combat timing is unchanged. */
(function(N){'use strict';const P=N.Brawler.prototype;
const ordinary=e=>!!e&&(N.Street209.is(e)||N.Enemies210.is(e));
function eligible(e){return ordinary(e)&&e.hp>0&&!e.down&&!e.flight&&!e.jump&&!e.hold&&!e.heldBy&&!e.pairVisual&&!e.stun&&!e.shock&&!e.dormant&&!e.guarding;}
const stride=e=>e.type==='enforcer'?144:102;
function track(e,before){if(!eligible(e))return;const a=e.act,step=a&&(a.step209||a.name==='enemyStep210'||a.name==='copDash');if(a&&!step)return;const distance=Math.hypot(e.x-before.x,(e.y-before.y)/.65);if(distance>40)return;const phase=before.phase+distance/stride(e);e.gait281={distance,phase:((phase%1)+1)%1,stride:stride(e),source:'resolved world displacement'};e.walkPhase=e.gait281.phase;e.gaitPhase130=e.walkPhase;e.gaitFrame130=Math.floor(e.walkPhase*8)%8;e.walk=distance>1e-5?1:0;}
const act=P.enemyAct;P.enemyAct=function(e,name,total,hit,o={}){const before=e.act,r=act.call(this,e,name,total,hit,o);if(ordinary(e)&&e.act&&e.act!==before)e.act.motionHits281=[...(e.act.times210||e.act.times209||(e.act.name==='marcusCombo'?[e.act.hitAt,.50,.74]:[e.act.hitAt]))];return r;};
const tick=P.tick;P.tick=function(dt,i={}){const t=this.time,positions=new Map(this.enemies.filter(ordinary).map(e=>[e,{x:e.x,y:e.y,phase:e.walkPhase||0}])),r=tick.call(this,dt,i);if(this.time>t)for(const[e,p]of positions)track(e,p);return r;};
N.EnemyMotion281={ordinary,eligible,stride,track};})(globalThis.NeonCombat);
