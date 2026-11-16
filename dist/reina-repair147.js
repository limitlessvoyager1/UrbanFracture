
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype,old={};for(const k of ['enemyAct','advanceHeroAction','finishHeroAction','ai','tick'])old[k]=P[k];
const C={bruno:{punchStartup:20/60,punchRecovery:27/60,grabStartup:24/60,grabMissRecovery:36/60,antiAirCooldown:3,resetAfter:2,resetSeconds:.8},flint:{minRecovery:36/60,heavyMissExtra:8/60}};
const normal=g=>String(g.difficulty||'normal').toLowerCase()==='normal';
function live(e){return e.hp>0&&!e.down&&!e.flight&&!e.stun&&!e.heldBy&&!e.hold&&!e.entry&&!e.entering&&!e.liftEntry&&!e.dormant&&!e.fleeing;}
P.enemyAct=function(e,name,total,hitAt,o={}){if(normal(this)&&e.type==='enforcer'){
 if(!e.hold&&this.time<(e.resetUntil147||0)&&N.Audit135.offensive?.(name,o)!==false)return false;
 if(o.antiAir&&(e.down||e.recovering>0||e.standingLock>0||e.wakeInv>0||this.time<(e.antiAirReady147||0)))return false;
 if(!o.enemies210&&['clinch','bombGrab'].includes(name)){hitAt=C.bruno.grabStartup;total=hitAt+.1+C.bruno.grabMissRecovery;}
 else if(!o.enemies210&&name==='hook'&&o.counter){hitAt=C.bruno.punchStartup;total=hitAt+.14+C.bruno.punchRecovery;}
 }
 const before=e.act,result=old.enemyAct.call(this,e,name,total,hitAt,o),a=e.act;
 if(a&&a!==before&&normal(this)){
 if(e.type==='enforcer'&&!e.hold&&a.hitAt<a.total){e.commitments147=(e.commitments147||0)+1;a.commitment147=true;if(a.antiAir)e.antiAirReady147=this.time+a.total+C.bruno.antiAirCooldown;}
 if(e.type==='flint'&&a.flint101){a.recoveryStart147=Math.max(...a.times101)+.17;a.total=Math.max(a.total,a.recoveryStart147+C.flint.minRecovery);a.facing147=e.dir;}
 }
 return result;};
P.advanceHeroAction=function(e,a,dt){if(normal(this)&&e.type==='flint'&&a.flint101){e.dir=a.facing147??e.dir;
 if(a.name==='flintHeavy'&&!a.missExtended147&&a.t>=a.recoveryStart147){a.missExtended147=true;if(!a.contacts101.size){a.total+=C.flint.heavyMissExtra;a.missedHeavy147=true;}}
 }return old.advanceHeroAction?.call(this,e,a,dt);};
P.finishHeroAction=function(e,a){const r=old.finishHeroAction?.call(this,e,a);if(normal(this)&&e.type==='enforcer'&&a.commitment147){e.recovering=Math.max(e.recovering||0,.2);if(e.commitments147>=C.bruno.resetAfter){e.commitments147=0;e.resetUntil147=this.time+C.bruno.resetSeconds;N.Audit135.record(this,'brunoTacticalReset147',{enemy:N.Audit135.info(e),until:e.resetUntil147});}if(a.antiAir)e.antiAirReady147=Math.max(e.antiAirReady147||0,this.time+C.bruno.antiAirCooldown);}return r;};
P.ai=function(e,dt){if(normal(this)&&e.type==='enforcer'&&live(e)&&!e.act&&this.time<(e.resetUntil147||0)){
 const p=this.player,side=Math.sign(e.x-p.x)||-p.dir,dx=p.x+side*130-e.x,dy=N.clamp(p.y+(e.id%2?18:-18),this.groundBounds.min,this.groundBounds.max)-e.y,l=Math.hypot(dx,dy),step=Math.min(l,48*dt);e.dir=Math.sign(p.x-e.x)||e.dir;e.walk=l>4?1:0;if(e.walk){e.x=N.clamp(e.x+dx/l*step,this.bounds.min,this.bounds.max);e.y=N.clamp(e.y+dy/l*step,this.groundBounds.min,this.groundBounds.max);e.walkPhase=((e.walkPhase||0)+step/144)%1;}return;
 }return old.ai.call(this,e,dt);};
function debug(g){const p=g.player,S=N.Forest125.scale(p)*(g.zone===11?1.12:1),meta=root.NeonTornado130Data,pose=meta?.frames[p.tornadoPose130?.index??1],k=meta?.scale||138.3/302,charging=p.act?.name==='chargeHold130';return{world:{x:p.x,y:p.y},combatPlane:p.y,renderOffset:{x:0,y:charging?-(pose.rect[1]-pose.anchor[1]+pose.rect[3])*k*S:-(p.grappleZ||0)},worldSpriteScale:S,atlasImportScale:k,groundAnchor:charging?'measured opaque sole':'existing move anchor',visualHeight:p.grappleZ||0,charge:N.Charge130.debug(g),actionable:!N.Audit135.blocked(p),simultaneous:N.Audit135.attacking(g).length,enemies:g.enemies.map(e=>({id:e.id,type:e.type,attack:e.act?.name||null,phase:N.Audit135.phase(e.act),frame:(e.act?.t||0)*60,startup:(e.act?.hitAt||0)*60,total:(e.act?.total||0)*60,armor:N.DragonTail121.armor(e,g.time),cooldown:e.cd,antiAirReady:e.antiAirReady147||0,resetUntil:e.resetUntil147||0}))};}
const report=N.Audit135.report;N.Audit135.report=function(g){return{...report(g),reinaRepair147:debug(g)};};
N.ReinaRepair147={config:C,debug};
})(typeof window!=='undefined'?window:globalThis);
