
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype,old={};for(const k of ['start','damage','finishHeroAction','tick'])old[k]=P[k];
const standing=a=>a?.name==='combo',opening=a=>standing(a)&&a.combo===1;
function reset(g,p){p.combo=0;p.lastAttack=-10;p.comboConfirmed129=false;p.novaQueued=false;if(g.buffer?.key==='attack')g.buffer=null;}
P.start=function(p,name,total,hitAt,o={}){if(p===this.player&&name==='combo'){
 if((o.combo||1)>1&&!p.comboConfirmed129){o={...o,combo:1};p.combo=1;}
 if((o.combo||1)===1)p.comboConfirmed129=false;
 }const result=old.start.call(this,p,name,total,hitAt,o);if(p===this.player&&opening(p.act))p.act.confirmed129=false;return result;};
P.damage=function(e,amount,dir,knock,o={}){const p=this.player,a=p.act,track=opening(a)&&o.attacker===p&&e!==p&&this.enemies.includes(e),flash=e.blockFlash||0;const hit=old.damage.call(this,e,amount,dir,knock,o);if(track&&(hit||(e.blockFlash||0)>flash)){a.confirmed129=true;p.comboConfirmed129=true;}return hit;};
P.finishHeroAction=function(p,a){const result=old.finishHeroAction?.call(this,p,a);if(p===this.player&&opening(a)&&!a.confirmed129)reset(this,p);return result;};
P.tick=function(dt,input={}){const p=this.player,a=p.act,waiting=p.type==='nova'&&opening(a)&&!a.confirmed129,queued=waiting&&p.novaQueued;

 if(waiting)p.novaQueued=false;const result=old.tick.call(this,dt,input);if(waiting&&queued&&p.act===a)p.novaQueued=true;
 return result;};
N.ComboConfirm129={standing,opening};
})(typeof window!=='undefined'?window:globalThis);
