/* Gate 4: actual contact outcomes, native-duration stun locks and invalidated melee ownership. */
(function(N){'use strict';const P=N.Brawler.prototype,EPS=1e-7;
const paired=f=>N.Continuity296.paired(f),supported=f=>!!f&&!N.HEROES[f.type]&&!paired(f);
function state(g){return g.reactions298??={cancelled:new WeakSet(),events:[],serial:0};}
function append(g,e,q){const s=state(g);q.id=++s.serial;q.enemy=e.id;s.events.push(q);if(s.events.length>256)s.events.shift();N.Audit135.record(g,'reaction298',{...q});}
function armor(g,e,source){const prior=e.armorSource274;e.armorSource274=source;try{return N.DragonTail121.armor(e,g.time);}finally{if(prior)e.armorSource274=prior;else delete e.armorSource274;}}
function remaining(f){return Math.max(0,f.stun||0,f.shock||0);}
// Mandatory state owns eligibility; reaction receipts and action names do not.
function locked(f){return remaining(f)>EPS&&!paired(f);}
const damage=P.damage;P.damage=function(e,n,dir=1,kd=false,o={}){const a=e.act,hp=e.hp,block=e.blockFlash||0,source=o.attacker||this.damageSource135,mode=supported(e)?armor(this,e,source):'none';
// Combat134 derived hypeArmor before the source-aware rear-vulnerability check.
if(e.type==='enforcer'&&N.Enemies210.is(e)&&source&&(source.x-e.x)*e.dir<0&&!e.wakeArmor&&!paired(e)&&['oneTwo','hook','frontKick','uppercut'].includes(a?.name)&&mode==='none'&&o.hypeArmor)o={...o,hypeArmor:false};
const result=damage.call(this,e,n,dir,kd,o);if(e===this.player||!supported(e)||o.statusTick257||o.grab||o.force||o.flight)return result;
const lost=hp-e.hp,blocked=(e.blockFlash||0)>block+EPS;if(lost<=0&&!blocked)return result;const interrupted=!!a&&e.act!==a;if(interrupted)state(this).cancelled.add(a);
const outcome=blocked?'block':e.hp<=0?'defeated':e.down||e.flight?'knockdown':mode!=='none'&&a&&e.act===a?'armor':remaining(e)>EPS?'clean':'clean-no-stagger';
const q=e.hitReaction298={at:this.time,outcome,kind:e.reaction274?.kind||N.Combat274.category(source?.act,o),dir,damage:lost,armor:outcome==='armor'?mode:'none',interrupted,sourceAction:a?.name||null,durationAtHit:remaining(e),visualDelay:(e.attackEntry297||e.continuityEntry296)?.at===this.time?(e.attackEntry297||e.continuityEntry296).duration:0,releasedAt:null};
if(e.reaction274&&lost>0){const r=e.reaction274;r.result=outcome;r.resisted=outcome==='armor';r.interrupted=interrupted;r.armor298=q.armor;}
append(this,e,q);if(interrupted){delete a.hitbox209;delete a.hitbox210;delete a.hitbox212;N.Director148.prune(this);}return result;};
function reject(g,e,a,path){if(!a||!state(g).cancelled.has(a))return false;N.Audit135.record(g,'cancelledMelee298',{enemy:N.Audit135.info(e),attack:a.name,path});return true;}
const enemyHit=P.enemyHit;P.enemyHit=function(e,a,...rest){if(reject(this,e,a,'enemyHit'))return false;return enemyHit.call(this,e,a,...rest);};
const advance=P.advanceHeroAction;P.advanceHeroAction=function(e,a,...rest){if(e!==this.player&&reject(this,e,a,'advanceHeroAction'))return false;return advance.call(this,e,a,...rest);};
const act=P.enemyAct;P.enemyAct=function(e,...args){if(e!==this.player&&locked(e)){N.Audit135.record(this,'stunDenied298',{enemy:N.Audit135.info(e),attack:args[0],remaining:remaining(e)});return false;}return act.call(this,e,...args);};
const start=P.start;P.start=function(e,name,total,hitAt,o={}){if(e!==this.player&&locked(e)){N.Audit135.record(this,'stunDenied298',{enemy:N.Audit135.info(e),attack:name,path:'start',remaining:remaining(e)});return false;}return start.call(this,e,name,total,hitAt,o);};
const tick=P.tick;P.tick=function(dt,i){const out=tick.call(this,dt,i);for(const e of this.enemies){const q=e.hitReaction298;if(q?.outcome==='clean'&&q.releasedAt===null&&remaining(e)<=EPS){q.releasedAt=this.time;q.actualSeconds=this.time-q.at;}}return out;};
function visual(f,time,a=f.reaction274){if(!a)return null;const entry=f.attackEntry297||f.continuityEntry296,delay=f.hitReaction298&&Math.abs(f.hitReaction298.at-a.at)<EPS?f.hitReaction298.visualDelay||0:entry&&Math.abs(entry.at-a.at)<EPS?Math.min(entry.duration||0,(a.duration||0)*.5):0,duration=Math.max(a.duration||0,remaining(f)+Math.max(0,time-a.at)),u=N.clamp((time-a.at-delay)/Math.max(1/60,duration-delay),0,1);return{u,delay,duration,remaining:remaining(f),dir:a.dir||f.dir};}
// Contact history and observed stun clearance are distinct from current physical recovery.
// Legacy releasedAt/actualSeconds remain untouched; launch can clear stun in the contact tick.
function diagnostics(f,time=0,live=N.Continuity296?.resolve(f,time)){const q=f.hitReaction298;return{contactOutcome:q?.outcome??null,contactAt:q?.at??null,currentPhysicalState:live?.state??null,commonOffensiveReady:live?.offensiveReady??null,stunLockActive:locked(f),stunClearObservedAt:q?.releasedAt??null,stunClearElapsedSeconds:q?.actualSeconds??null};}
const report=N.Audit135.report;N.Audit135.report=function(g){return{...report(g),hitReactions298:{events:state(g).events.map(q=>({...q})),actors:g.enemies.map(e=>({id:e.id,type:e.type,outcome:e.hitReaction298?.outcome||null,stunFrames:remaining(e)*60,locked:locked(e),actualSeconds:e.hitReaction298?.actualSeconds??null,diagnostics:diagnostics(e,g.time)}))}};};
N.HitReactions298={state,remaining,locked,visual,armor,diagnostics};})(globalThis.NeonCombat);
