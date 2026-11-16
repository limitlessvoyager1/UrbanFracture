
(function(root){'use strict';const {Brawler,clamp}=root.NeonCombat,P=Brawler.prototype,old={};for(const k of ['ai','enemyAct','enemyHit','advanceHeroAction','finishHeroAction','tick'])old[k]=P[k];
P.enemyAct=function(e,name,total,hitAt,o={}){if(e.type==='cop'&&!o.enemies210){if(name==='taserShot'){total=1.18;hitAt=.43;o={...o,damage:23};}if(name==='taserGrab'){total=.60;hitAt=.20;}if(name==='taser'){total=.64;hitAt=.19;o={...o,damage:27};}}
 if(e.type==='flint'&&!o.flint211&&['flintWild','flintHeavy'].includes(name)){const heavy=name==='flintHeavy';total=heavy?1.65:1.50;hitAt=heavy?.48:.25;o={...o,flint101:true,baseDamage101:heavy?27:11,reach:e.weapon==='knife'?104:e.weapon==='plank'?160:e.weapon==='pipe'?150:142,times101:heavy?[.48]:[.25,.49,.73],contacts101:new Set()};}
 return old.enemyAct.call(this,e,name,total,hitAt,o);};
P.ai=function(e,dt){if(e.type==='flint'&&this.time<(e.retaliateAt115||0)&&!e.act){e.walk=0;return;}const ready=e.hp>0&&!e.act&&!e.down&&!e.flight&&!e.stun&&!e.heldBy&&!e.entry&&!e.entering&&!e.dormant&&!e.fleeing&&e.activeAt<=this.time;
 if(e.type==='flint'&&ready&&!e.weapon){e.weaponRecoverAt101??=this.time+2.5;e.walk=0;if(this.time>=e.weaponRecoverAt101){e.weapon=e.lastWeapon101||'pipe';e.disarmed=false;e.weaponRecoverAt101=null;e.cd=.5;}return;}
 const x=e.x,y=e.y;if(e.type==='cop'&&ready)e.cd=Math.max(0,e.cd-dt*.15);old.ai.call(this,e,dt);
 if(ready&&!e.act&&e.walk&&['cop','flint'].includes(e.type)){const speed=e.type==='cop'?1.35:1.20;e.x=clamp(x+(e.x-x)*speed,this.bounds.min,this.bounds.max);e.y=clamp(y+(e.y-y)*speed,this.groundBounds.min,this.groundBounds.max);}
 if(ready&&e.type==='cop'&&!e.act&&!e.walk&&e.cd>0&&!this.player.down){const dx=this.player.x-e.x,dy=this.player.y-e.y;if(Math.abs(dx)>64){e.x=clamp(e.x+Math.sign(dx)*95*dt,this.bounds.min,this.bounds.max);e.y=clamp(e.y+Math.sign(dy)*Math.min(Math.abs(dy),65*dt),this.groundBounds.min,this.groundBounds.max);e.walk=1;e.walkPhase=((e.walkPhase||0)+dt*1.3)%1;}}};
P.enemyHit=function(e,a){if(e.type==='flint'&&a.flint101)return;return old.enemyHit.call(this,e,a);};
P.advanceHeroAction=function(e,a,dt){old.advanceHeroAction?.call(this,e,a,dt);if(e.type!=='flint'||!a.flint101||e.act!==a)return;for(let stage=0;stage<a.times101.length;stage++){const hit=a.times101[stage];if(a.t>=hit-.12)a.strike=stage;if(a.t<hit||a.t>hit+.17||a.contacts101.has(stage))continue;const p=this.player,dx=(p.x-e.x)*e.dir;if(p.hp<=0||p.jump>0||p.down||p.heldBy||dx< -22||dx>a.reach||Math.abs(p.y-e.y)>32)continue;
 const heavy=a.name==='flintHeavy',alias=e.weapon==='knife'?(heavy?'knife':'knifeSlash'):e.weapon;
 if(this.catchPunch(e,{...a,name:alias})){a.contacts101.add(stage);return;}
 if(stage>0&&a.linked101&&p.stun>0&&!p.blocking&&!p.act&&!p.wakeInv)if(!root.NeonCombat.Audit135||root.NeonCombat.Audit135.canLink(this,e,a))p.inv=0;const hp=p.hp;
 if(this.damage(p,heavy?27:stage===2?15:11,e.dir,heavy||stage===2,{attacker:e})){a.contacts101.add(stage);a.linked101=p.hp<hp&&!p.blocking&&!p.down;this.event('swing');}}
};
P.finishHeroAction=function(e,a){old.finishHeroAction?.call(this,e,a);if(e.type==='flint'&&a.flint101){e.recovering=1.15;e.retaliateAt115=this.time+1.15;e.recoveryDone101=true;}};
P.tick=function(dt,input={}){const result=old.tick.call(this,dt,input);for(const e of this.enemies){if(e.type==='flint'){if(e.weapon)e.lastWeapon101=e.weapon;if(e.recoveryDone101){e.cd=1.15;e.recoveryDone101=false;}}}const p=this.player;if(p.type==='nova'&&p.shock>0&&this.time<(p.hypeUntil||0))p.stun=0;return result;};
})(typeof window!=='undefined'?window:globalThis);
