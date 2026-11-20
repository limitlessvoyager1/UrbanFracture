/* Assignment4: only Nova's physical rise is shorter. Native locks remain authoritative. */
(function(r){'use strict';const N=r.NeonCombat,P=N.Brawler.prototype,X=N.Showstopper435;
const config=Object.freeze({normalRise:.40,ratio:.65,fastRise:.26,settle:.10});
const states=new WeakMap(),presentations=new WeakMap();
function locked(g,f){return !!(f.hp<=0||f.flight||f.jump||f.act||f.hold||f.heldBy||f.stun||f.shock||f.reversalVictim198||N.GrappleRecovery119.active(f)||g.time<(f.recoveryNotBefore119||0)||g.enemies.some(e=>e.hp>0&&e.act?.name==='bodySplash'&&e.act.lockedPlayer===f.id));}
function create(g,f){const meta={serial:f.knockSerial,dir:f.dir,progress:0,started:false,completed:false,completedAt:null};const q={g,actor:f,meta,startAge:null,endAge:null,ratio:null};states.set(f,q);presentations.set(meta,q);f.kip437=meta;return q;}
const knock=P.knockDown;P.knockDown=function(f,...args){const out=knock.call(this,f,...args);states.delete(f);delete f.kip437;if(f===this.player&&f.type==='nova'&&f.hp>0&&X.active(this))create(this,f);return out;};
const down=P.advanceDown;P.advanceDown=function(f,dt){if(f!==this.player||f.type!=='nova')return down.call(this,f,dt);let q=states.get(f);if(q&&q.meta.serial!==f.knockSerial){states.delete(f);delete f.kip437;q=null;}
 if(!q&&f.hp>0&&f.down>0&&X.active(this))q=create(this,f);
 let step=dt;const free=!locked(this,f),start=Math.max(.32,(f.downTotal||0)-config.normalRise);
 if(q&&f.down>0&&dt>0&&!q.meta.completed){
  if(!q.meta.started&&f.downAge+dt>=start&&f.downTotal>start){q.meta.started=true;q.startAge=start;q.endAge=f.downTotal;q.ratio=free&&X.active(this)?config.ratio:1;}
  if(q.meta.started){q.endAge=Math.max(q.endAge,f.downTotal);if(free){const pre=Math.min(dt,Math.max(0,q.startAge-f.downAge));step=pre+(dt-pre)/q.ratio;}}
 }
 const before=f.downAge,out=down.call(this,f,step);
 if(q&&q.meta.started&&f.downAge>before){q.meta.progress=Math.max(q.meta.progress,N.clamp((f.downAge-q.startAge)/(q.endAge-q.startAge),0,1));if(!f.down&&f.hp>0){q.meta.progress=1;q.meta.completed=true;q.meta.completedAt=this.time;}}
 return out;};
function state(f){const q=states.get(f)||presentations.get(f?.kip437);return q&&q.actor.id===f.id&&q.meta.serial===f.knockSerial?q:null;}
function plan(f,time){const q=state(f);if(!q||f.type!=='nova'||f.hp<=0||f.flight||f.jump||f.act||f.hold||f.heldBy||f.reversalVictim198||N.Continuity296?.paired(f)||!f.down&&!q.meta.completed)return null;
 if(f.down&&!f.landed&&f.downAge<.32)return null;if(!f.down&&time-q.meta.completedAt>config.settle)return null;
 const m=q.meta,u=m.progress,frame=m.started?Math.min(11,Math.floor(u*12)):0;return{frame,progress:u,dir:m.dir,phase:!m.started?'prone':m.completed?'settle':'kip-up',physicalRatio:q.ratio};}
function owner(f){const q=state(f);return q?{game:q.g,actor:q.actor}:null;}
function debug(g){const q=state(g.player);return{assignment:4,eligible:g.player.type==='nova'&&X.active(g),nativeDown:g.player.down,nativeAge:g.player.downAge,nativeTotal:g.player.downTotal,locked:locked(g,g.player),animation:plan(g.player,g.time),latched:!!q,physicalRatio:q?.ratio??null};}
N.ShowstopperKip437=Object.freeze({config,plan,owner,debug});
})(globalThis);
