/* Orion's reference-art presentation clock. Combat228 retains damage, costs and recovery. */
(function(r){'use strict';const N=r.NeonCombat,O=N.Orion205,P=N.Brawler.prototype,unit=v=>((v||0)%1+1)%1;
function pose(p,t=0){const a=p.act,f=(a?.t||0)*60,side=p.dir<0?'L':'R',motion=side==='L'?24:0;
 if(p.down||p.hp<=0){const left=(p.downTotal||1.45)-(p.downAge||0);return p.hp>0&&left<.64?{family:'motion',index:motion+16+Math.min(7,Math.floor((.64-Math.max(0,left))/.64*8)),state:'get-up'}:{family:'core-'+side,index:14,state:'down'};}
 if(p.stun||p.shock||p.flight||p.heldBy||p.pairVisual)return{family:'core-'+side,index:2,state:'recoil'};
 if(a?.weapon248||p.heldWeapon248){const w=a?.weaponInfo248||p.heldWeapon248;if(a?.weapon248==='pickup')return{family:'grapple-'+side,index:f<22?5:8,state:'weapon-pickup',weapon:a.t>=.26?w:null};if(a?.weapon248==='throw')return{family:'grapple-'+side,index:f<13?1:3,state:'weapon-throw',weapon:a.t<.22?w:null};if(a?.weapon248==='attack'){const d=a.profile249||N.Weapons248.profile('orion',w.category),n=f<d.startup?1:f<d.startup+d.active?3:15;return{family:'grapple-'+side,index:n,state:'weapon-attack',weapon:w};}if(!a)return p.walk&&p.visualMotion385?.moving!==false?{family:'walk',index:(side==='L'?8:0)+Math.floor(unit(p.visualGait384)*8),state:'weapon-walk',weapon:w}:{family:'grapple-'+side,index:8,state:'weapon-hold',weapon:w};}
 if(a?.orion228){if(a.kind205==='laser')return{family:'extra',index:side==='L'?7:3,state:'crimson-optic'};
  if(a.kind205==='current')return f<26?{family:'core-'+side,index:26,state:'current-charge'}:f<60?{family:'core-'+side,index:28,state:'current-cast'}:{family:'grapple-'+side,index:15,state:'current-recovery'};
  if(a.kind205==='repair')return{family:'extra',index:side==='L'?6:2,state:'system-repair'};
  if(a.kind205==='combo'){const n=a.stage205||1,at=O.config.combo.hit[n-1],active=O.config.combo.active[n-1],phase=f<at-4?0:f<at?1:f<at+active?2:f<at+active+6?3:0;return{family:'grapple-'+side,index:16+(n-1)*4+phase,state:'combo-'+n,phase};}
  const q=p.orionPose205||['locomotion',0];if(q[0]==='grapple'&&q[1]===2)return{family:'extra',index:side==='L'?4:0,state:a.kind205};return{family:(q[0]==='grapple'?'grapple-':'core-')+side,index:q[0]==='combat'?16+q[1]:q[1],state:a.kind205};}
 if(a?.name==='chargeHold130')return{family:'extra',index:side==='L'?6:2,state:'repair-charge'};
 // Native Counter248 owns capture, confirmation, victim motion, hits and recovery.
 if(a?.counter248){const k=a.kind248,d=a.definition248,events=d?.events||[],last=events.at(-1)?.[0]??24;let index=1,phase='capture';
  if(a.name==='counterMove248'){
   phase=f<12?'startup':f<=last+4?'active':'recovery';
   if(k==='punch')index=f<12?1:f<last-10?2:f<last+6?3:15;
   else if(k==='kick'){const hit=events.findIndex(h=>Math.abs(f-h[0])<=3);index=f<13?0:f>last+5?15:hit>=0?(hit%2?7:5):2;}
   else if(k==='short')index=f<12?15:f<29?28:f<35?30:31;
   else if(k==='long')index=f<12?1:f<19?3:8;
  }else if(k==='short')index=15;
  return{family:'grapple-'+side,index,state:'counter-'+k,phase,weapon:k==='long'&&a.disarmed248?p.heldWeapon248:null};
 }
 if(p.landing228>0&&!p.jump)return{family:'grapple-'+side,index:13,state:'landing'};
 if(p.hold)return{family:'grapple-'+side,index:0,state:'hold'};
 if(p.blocking||p.catchUntil>t)return{family:'grapple-'+side,index:15,state:'guard'};
 if(p.jump)return{family:'core-'+side,index:1,state:'jump'};
 const moving=p.visualMotion385?.moving!==false;
 if(moving&&p.boost205==='brake')return Math.abs(p.boostV205||0)<90?{family:'motion',index:motion+20+Math.min(3,Math.floor((1-Math.abs(p.boostV205||0)/90)*4)),state:'boost-stop'}:{family:'core-'+side,index:11,state:'brake'};
 if(moving&&p.boost205&&Math.abs(p.boostV205||0)<90)return{family:'core-'+side,index:8,state:'boost-start'};
 if(moving&&p.walk&&!p.boost205)return{family:'walk',index:(side==='L'?8:0)+Math.floor(unit(p.visualGait384)*8),state:'walk'};
 if(moving&&(p.walk||p.boost205)){const boost=!!p.boost205;return{family:'motion',index:motion+(boost?8:0)+Math.floor(unit(p.visualGait384)*8),state:boost?'booster':'walk'};}
 if((p.idle205||0)%7>4.5)return{family:'core-'+side,index:31,state:'fist-check'};
 return{family:'core-'+side,index:0,state:'idle'};
}
// Presentation state only. Native movement, acceleration, action clocks and input stay authoritative.
const tick=P.tick;P.tick=function(dt,i={}){const p=this.player,x=p.x,y=p.y,time=this.time,out=tick.call(this,dt,i);if(p!==this.player||p.type!=='orion'||this.time===time)return out;
 const distance=Math.hypot(p.x-x,(p.y-y)/.65),free=!p.act&&!p.down&&!p.flight&&!p.hold&&!p.heldBy&&!p.jump&&!p.stun&&!p.shock&&!p.blocking;
 const moving=free&&!!(p.walk||p.boost205)&&distance>1e-6&&distance<=32,mode=!moving?'idle':p.boost205==='brake'?'brake':p.boost205?Math.abs(p.boostV205||0)<90?'boost-start':'booster':'walk',previous=p.visualMotion385;
 if(!moving||previous?.mode!==mode||previous?.dir!==p.dir)p.visualGait384=0;else if(mode==='walk'||mode==='booster')p.visualGait384=unit((p.visualGait384||0)+distance/(mode==='booster'?165:92));
 p.visualMotion385={mode,dir:p.dir,moving};return out;};
// Same eye socket drives the beam collider, charge cue and rendered effect.
O.artOptic384=function(g,a){const p=g.player,s=N.Forest125.scale(p),D=r.Orion384Data,fr=D?.families.extra.frames[a.dir205<0?7:3],eye=fr?.eye||(a.dir205<0?[-8,-116]:[8,-116]);return{x:p.x+eye[0]*s,y:a.groundY+eye[1]*s,z:-eye[1]*s};};
N.Orion384={version:384,logicalHeight:128,pose};
})(globalThis);
