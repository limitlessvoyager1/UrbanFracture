
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype,old={damage:P.damage,tick:P.tick,ai:P.ai,enemyHit:P.enemyHit};
const heroes=new Set(['reina','broxton','nova','forest']);
function death(g){const p=g.player;if(p.hp>0){p.deathFall167=false;return;}p.shock=0;p.stun=0;p.sticky166=null;p.forestPose125=null;p.attackGesture=null;p.blocking=false;p.walk=0;p.running=false;if(!p.deathFall167){p.deathFall167=true;if(p.act?.forest125)N.Forest125?.cleanup(g,p.act,true);g.unlink(p);p.act=null;if(!p.down&&!p.flight)g.knockDown(p,p.dir,2);g.event('deathFall167');}p.act=null;}
P.damage=function(...args){const r=old.damage.apply(this,args);if(this.player.hp<=0)death(this);return r;};
P.enemyHit=function(...args){const r=old.enemyHit.apply(this,args);if(this.player.hp<=0)death(this);return r;};
P.tick=function(dt,input={}){if(this.player.hp<=0)death(this);const r=old.tick.call(this,dt,input);death(this);return r;};
P.ai=function(e,dt){if(e.type==='biker'&&N.Enemies210?.controls(e))return N.Enemies210.ai(this,e,dt);if(e.type!=='biker'||e.hp<=0||e.down||e.stun||e.shock||e.flight||e.heldBy||e.hold||e.act||e.entry||e.dormant||e.activeAt>this.time||e.recovering>0)return old.ai.call(this,e,dt);const p=this.player,d=Math.abs(p.x-e.x);if(this.time>=(e.closeDecision167||0)&&e.cd<=0&&d>=100&&d<=300&&!p.down&&!p.heldBy){e.closeDecision167=this.time+3.8;if(Math.random()<.25)e.closeUntil167=this.time+2.1;}
 if(this.time<(e.closeUntil167||0)&&!p.down&&!p.heldBy){const dx=p.x-e.x,dy=p.y-e.y;e.dir=Math.sign(dx)||e.dir;if(d<77&&Math.abs(dy)<24){if(e.cd<=0){const kick=e.attackCycle++%2===1;this.enemyAct(e,kick?'chainKick':'chainFist',kick?1.15:1.05,kick?.43:.4,{damage:kick?18:20,knock:true,reach:kick?92:78});if(e.act)e.closeUntil167=0;}return;}
 const bx=e.x,by=e.y;e.x=N.clamp(e.x+Math.sign(dx)*115*dt,this.bounds.min,this.bounds.max);e.y=N.clamp(e.y+Math.sign(dy)*Math.min(Math.abs(dy),75*dt),this.groundBounds.min,this.groundBounds.max);e.walk=1;e.walkPhase=((e.walkPhase||0)+Math.hypot(e.x-bx,(e.y-by)/.65)/92)%1;return;}
 return old.ai.call(this,e,dt);};
N.Quality167={death,heroes};
})(typeof window!=='undefined'?window:globalThis);
