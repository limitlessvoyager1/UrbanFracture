'use strict';
// Direct-call fixture arguments from existing native definitions; no production balance data is invented.
function wake(N,e,name){const F=1/60,base={dir:e.dir,plane:e.y,fromX:e.x,fromY:e.y};
 if(name==='wakeSweep'){const d=N.Enemies210.definitions.cop.wakeSweep,times=d.frames.map(t=>t*F),active=d.active*F;return{total:times.at(-1)+active+d.recovery*F,at:times[0],options:{enemies210:true,times210:times,times,damage:d.damage[0],reach:d.reach,active,knock:!!d.knock,antiAir:!!d.antiAir,definition210:d,dir210:base.dir,plane210:base.plane,fromX210:base.fromX,fromY210:base.fromY,contacts210:new Set(),attempted210:new Set(),recoveryStart210:times.at(-1)+active,delay210:0}};}
 const kind=name==='saitoKipUp'?'wakeKick':'sweep',d=N.Martial212.definition(e,kind);return{total:d.total,at:d.times[0],options:{martial212:true,kind212:kind,def212:d,dir212:base.dir,plane212:base.plane,fromX212:base.fromX,fromY212:base.fromY,times212:d.times,times:d.times,active:d.stages?d.stages[0].end*F-d.times[0]:0,damage:d.damage[0],reach:d.reach,contacts212:new Set(),attempted212:new Set(),sampled212:0,recoveryStart212:d.recovery,counterable:true,antiAir:false,knock:true}};
}
module.exports={wake};
