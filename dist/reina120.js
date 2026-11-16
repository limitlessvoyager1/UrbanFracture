
(function(root){'use strict';const N=root.NeonCombat,{Brawler,clamp}=N,P=Brawler.prototype,old={};for(const k of ['start','advanceHeroAction','hitPlayerAttack','finishHeroAction','tick','reset'])old[k]=P[k];
const E=u=>{u=clamp(u,0,1);return u*u*(3-2*u)},M=(a,b,u)=>a+(b-a)*u;
const phases=['WAISTLOCK','LOWER HIPS','EXPLOSIVE LIFT','BACKWARD ARCH','MAXIMUM LIFT','RELEASE','AIRBORNE FLIGHT','IMPACT','RECOVERY ROLL','STAND','GUARD'];
const weights={thug:.92,knifeThug:.92,enforcer:1.15,bouncer:1.1,boss:1.2,cop:.94,security:1.08*1.08};
function held(q,f){const d=q.dir,load=E((f-6)/7),lift=E((f-13)/8),arch=E((f-21)/22);return{cx:q.fromX+d*(32-130*arch*(q.xfactor??1)),cy:q.groundY-90+22*load-83*lift-25*E((f-29)/9),angle:-d*(.10*load+.40*lift+2.35*arch)};}
function sample(q,t){const f=clamp(t*60,0,78),d=q.dir,y=q.groundY,phase=f<6?0:f<13?1:f<21?2:f<29?3:f<37?4:f<43?5:f<50?6:f<56?7:f<64?8:f<73?9:10;
 let v=held(q,Math.min(f,38)),released=f>=38;
 if(released){const r=held(q,38),b=held(q,37.99),seconds=(Math.min(f,51)-38)/60,T=13/60,vx=(r.cx-b.cx)*6000,vy=(r.cy-b.cy)*6000,omega=(r.angle-b.angle)*6000;

 const ay=2*(y-34*q.scale-r.cy-vy*T)/(T*T),angularA=2*(-d*Math.PI*1.5-r.angle-omega*T)/(T*T);
 v={cx:r.cx+vx*seconds,cy:r.cy+vy*seconds+.5*ay*seconds*seconds,angle:r.angle+omega*seconds+.5*angularA*seconds*seconds,vx,vy:vy+ay*seconds,omega:omega+angularA*seconds};}
 const motionFrame=f>=51&&f<54?51:f,px=q.fromX-d*58*E((motionFrame-21)/30),hz=0,index=f<6?0:f<19?1:f<29?2:f<38?3:f<57?4:f<65?5:f<74?6:7;
 return{...v,px,hx:px,hz,frame:f,phase,phaseName:phases[phase],index,released,attachment:released?'released / independent arc':'rear waistlock',u:clamp(f/51,0,1)};}
root.NeonPairMotion.definitions.set('reinaGerman120',sample);
function apply(g,p,a){const q=a.pair,v=a.victim,s=sample(q,a.t);p.x=clamp(s.px,q.min,q.max);p.y=q.groundY;p.dir=q.dir;p.jump=0;p.grappleZ=0;p.walk=0;p.germanPose120=s;a.debug120={...s,groundY:q.groundY,releaseFrame:38,impactFrame:51};
 if(s.frame>=38&&s.frame<51)for(const e of g.enemies){if(e===v||e.hp<=0||e.down||e.heldBy||a.collateral120.has(e.id)||Math.abs(e.x-s.cx)>42||Math.abs(e.y-q.groundY)>24)continue;a.collateral120.add(e.id);g.damage(e,8,-q.dir,true,{attacker:p});}
 if(s.released&&!a.released120){a.released120=true;a.release120=sample(q,38/60);if(p.hold?.victim===v)g.release(p);g.event('suplexRelease120');}
 if(!a.impacted120){v.x=s.cx;v.y=q.groundY;v.act=null;v.walk=0;v.flight=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;v.pairVisual={cx:s.cx,cy:s.cy,pivot:0,angle:s.angle,sourceDir:q.dir,owner:p,action:a,phase:s.u,groundY:q.groundY,contact120:true,waist120:q.waist};}
 else{v.x=v.prevX=v.fallFrom=v.fallTo=q.landX;v.y=q.groundY;v.dir=q.dir;v.act=null;v.pairVisual=null;v.flight=null;v.walk=0;v.grappleZ=v.grappleAngle=v.grapplePivot=0;v.downAge=.4;v.downTotal=1.6;v.down=1.2;v.fade=1;v.reapGround119=true;}
}
function clear(g,a,interrupted=false){const p=g.player,v=a?.victim;if(!v)return;if(p.hold?.victim===v)g.release(p);p.germanPose120=null;p.grappleZ=0;v.germanAction120=null;v.pairVisual=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;if(interrupted&&!a.impacted120&&a.t>=13/60&&v.hp>0){v.y=a.pair.groundY;g.knockDown(v,-a.pair.dir,1.6,true);v.noBounce=true;v.fallFrom=v.fallTo=v.x;}}
P.start=function(p,name,...args){const eligible=p===this.player&&p.type==='reina'&&name==='suplex'&&p.hold?.rear&&!p.hold.counter;old.start.call(this,p,name,...args);const a=p.act;if(!eligible||!a?.victim)return;const v=a.victim,d=p.dir,scale=1.46515635*(weights[v.type]||1),waist=[0,-60];a.german120=true;a.total=78/60;a.hitAt=51/60;a.damage120=a.damage;a.collateral120=new Set();a.pair={name,definition:'reinaGerman120',actor:p,victim:v,dir:d,fromX:p.x,groundY:p.y,min:this.bounds.min,max:this.bounds.max,scale,waist,drop:false};const predicted=sample(a.pair,51/60).cx,limited=clamp(predicted,this.bounds.min+20,this.bounds.max-20);a.pair.xfactor=(limited-(p.x+d*32))/(predicted-(p.x+d*32));a.pair.landX=limited;v.germanAction120=a;p.inv=Math.max(p.inv,1.32);apply(this,p,a);};
P.advanceHeroAction=function(p,a,dt){if(a.german120){if(a.t+1e-8>=a.total)a.t=a.total;apply(this,p,a);return;}return old.advanceHeroAction?.call(this,p,a,dt);};
P.hitPlayerAttack=function(a){if(!a?.german120)return old.hitPlayerAttack.call(this,a);if(a.impacted120)return;const p=this.player,v=a.victim,q=a.pair;apply(this,p,a);if(p.hold?.victim===v)this.release(p);v.pairVisual=null;v.inv=v.wakeInv=v.guarding=0;v.x=v.prevX=q.landX;v.y=q.groundY;this.damage(v,a.damage120,-q.dir,true,{force:true,attacker:p,grab:true});a.impacted120=true;v.flight=null;v.noBounce=true;v.fallFrom=v.fallTo=q.landX;v.downAge=.4;v.downTotal=1.6;v.down=1.2;v.landed=false;this.land(v);this.shake=Math.max(this.shake,4);this.effects.push({x:q.landX,y:q.groundY,kind:'dust',life:.32});this.event('powerSlam');apply(this,p,a);};
P.finishHeroAction=function(p,a){old.finishHeroAction?.call(this,p,a);if(a.german120)clear(this,a);};
P.reset=function(...args){if(this.player?.act?.german120)clear(this,this.player.act,true);return old.reset.apply(this,args);};
P.tick=function(dt,input={}){const r=old.tick.call(this,dt,input);let a=this.player.act;if(a?.german120&&(this.player.hp<=0||!this.enemies.includes(a.victim))){clear(this,a,true);this.player.act=null;a=null;}if(a?.german120)apply(this,this.player,a);for(const v of this.enemies)if(v.germanAction120&&v.germanAction120!==a)clear(this,v.germanAction120,true);return r;};
N.ReinaGerman120={sample,held,phases,frames:78};
})(typeof window!=='undefined'?window:globalThis);
