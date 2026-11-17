(function(r){'use strict';const N=r.NeonCombat,unit=v=>((v||0)%1+1)%1;
// One distance-driven visual phase survives walk/run transitions; blocked movement never advances it.
const P=N.Brawler.prototype,pending=new WeakMap(),tryGrab=P.tryGrab;
// A held manual request may survive the existing miss cooldown, once. The
// automatic walk-up lane stays narrower; all admission remains in Grab223.
P.tryGrab=function(auto=false,...args){const p=this.player,held=!!p.hold,result=tryGrab.call(this,auto,...args);if(p.type==='reina'&&!auto&&!held){if(result||p.hold)pending.delete(p);else pending.set(p,{until:this.time+.24});}return result;};
function retry(g,p,i){const q=pending.get(p);if(!q)return;if(!i.grab||g.time>q.until+1e-9||p.hold||p.down||p.stun||p.shock||p.flight||p.heldBy||N.SwordStance378?.active(p)){pending.delete(p);return;}if(p.act||p.jump||p.cd>0||!g.isFree(p)||N.Grab198.locked(g))return;
 const target=N.Grab223.candidate(g,false);if(target){tryGrab.call(g,false);pending.delete(p);}}
N.ReinaGrab389={window:.24,pending:p=>pending.has(p)};
const tick=P.tick;P.tick=function(dt,i={}){const p=this.player,x=p.x,y=p.y,time=this.time,result=tick.call(this,dt,i);if(p===this.player&&p.type==='reina'&&this.time!==time)retry(this,p,i);if(p===this.player&&p.type==='reina'&&this.time!==time&&p.walk&&!p.act&&!p.down&&!p.flight&&!p.hold&&!p.heldBy){const distance=Math.hypot(p.x-x,(p.y-y)/.65);p.visualGait383=unit((p.visualGait383||0)+distance/(p.running?160:90));}return result;};
})(globalThis);
