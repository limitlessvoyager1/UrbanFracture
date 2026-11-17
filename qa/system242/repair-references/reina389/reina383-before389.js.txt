(function(r){'use strict';const N=r.NeonCombat,unit=v=>((v||0)%1+1)%1;
// One distance-driven visual phase survives walk/run transitions; blocked movement never advances it.
const P=N.Brawler.prototype,tick=P.tick;P.tick=function(dt,i={}){const p=this.player,x=p.x,y=p.y,time=this.time,result=tick.call(this,dt,i);if(p===this.player&&p.type==='reina'&&this.time!==time&&p.walk&&!p.act&&!p.down&&!p.flight&&!p.hold&&!p.heldBy){const distance=Math.hypot(p.x-x,(p.y-y)/.65);p.visualGait383=unit((p.visualGait383||0)+distance/(p.running?160:90));}return result;};
})(globalThis);
