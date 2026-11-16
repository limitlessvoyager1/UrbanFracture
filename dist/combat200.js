/* Existing actor controllers and Director remain authoritative. Between-string heavy defense. */

(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype;
const config={brunoHits:3,brunoWindow:4,brunoCooldown:5,guard:.48};
const bruno=e=>e.type==='enforcer'&&!e.routeTruck197&&!e.casinoSecurity192;
function ordinary(g,e,o){return bruno(e)&&o.attacker===g.player&&!o.force&&!o.grab&&!o.ground&&!o.flight&&e.hp>0&&!e.down&&!e.flight&&!e.heldBy&&!e.hold&&!e.grappleSession119?.active&&!e.wakeInv;}
const damage=P.damage;P.damage=function(e,amount,dir,knock,o={}){const p=this.player,a=p.act,q=e.pressure200;

const opener=['combo','broxCombo179'].includes(a?.name)&&(a.combo??1)===1||a?.kind185==='combo'&&a.combo185===1||a?.forest125&&a.kind125==='combo'&&a.stage125===1;
if(ordinary(this,e,o)&&opener&&q?.hits>=config.brunoHits&&this.time-q.at<=config.brunoWindow&&this.time>=(e.guardReady200||0)&&!e.act&&e.recovering<=0&&!e.shock&&e.standingLock<=0&&e.stagger<=0.58&&e.guardBreak<=0&&(p.x-e.x)*e.dir>=0){e.stun=0;e.guarding=config.guard;e.guardReady200=this.time+config.brunoCooldown;e.pressure200=null;e.counterAfterGuard200=true;N.Audit135.record(this,'brunoDefense200',{enemy:N.Audit135.info(e),reason:'repeated confirmed offense; new string',guard:config.guard});}
const before=e.hp,r=damage.call(this,e,amount,dir,knock,o);if(ordinary(this,e,o)&&e.hp<before){const row=e.pressure200;if(!row||this.time-row.at>config.brunoWindow)e.pressure200={hits:1,at:this.time};else{row.hits++;row.at=this.time;}}return r;};
const ai=P.ai;P.ai=function(e,dt){if(bruno(e)&&!N.Enemies210&&e.counterAfterGuard200){if(e.hp<=0||e.down||e.flight||e.heldBy||e.guardBreak>0)e.counterAfterGuard200=false;else if(!e.act&&!e.stun&&!e.shock&&e.guarding<=0&&e.recovering<=0&&e.cd<=0){const p=this.player,dx=(p.x-e.x)*e.dir;if(dx>0&&dx<112&&Math.abs(p.y-e.y)<26){const before=e.act;this.enemyAct(e,'hook',.93,1/3,{counter:true,armor:true,damage:18,reach:112,knock:true});if(e.act!==before){e.counterAfterGuard200=false;return;}}else e.counterAfterGuard200=false;}}return ai.call(this,e,dt);};

function specialists(g){const id=g.zoneDefinition?.id,table={'fairways-spa':[['thug',370,'akari']],'fairways-club':[['thug',1590,'sato']],'casino-floor':[['thug',1695,'akari']],'casino-penthouse':[['thug',2080,'sato']],'route74-stop':[['thug',2710,'sato']]};for(const[from,at,to]of table[id]||[]){const q=g.pending?.find(q=>q.type===from&&q.at===at);if(q){q.type=to;q.specialist200=true;}}}
const spawn=P.spawnZone;P.spawnZone=function(...args){const r=spawn.apply(this,args);specialists(this);return r;};
N.Combat200={config,bruno,specialists};
})(typeof window!=='undefined'?window:globalThis);
