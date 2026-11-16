
(function(root){'use strict';const N=root.NeonCombat,{Brawler,clamp}=N,P=Brawler.prototype,old={};for(const k of ['reset','start','advanceHeroAction','hitPlayerAttack','advanceDown','ai','finishHeroAction','tick'])old[k]=P[k];
const ease=u=>{u=clamp(u,0,1);return u*u*(3-2*u);},mix=(a,b,u)=>a+(b-a)*u,R=1.46515635*.912;
const weights={thug:.92,knifeThug:.92,enforcer:1.15,bouncer:1.10,boss:1.20,cop:.94,security:1.08*1.08};
const waists={thug:[0,-58],knifeThug:[0,-65],enforcer:[0,-60],bouncer:[0,-65],boss:[0,-65],cop:[0,-60],biker:[0,-65],gangster:[0,-70],security:[0,-75],sato:[0,-60],akari:[0,-60],flint:[0,-60]};
const hipPoints=[[8,-64],[-6,-56],[2,-65],[-3,-56],[-16,-64],[0,-60]];
const phaseNames=['GRIP','BALANCE BREAK','PIVOT / HIP ENTRY','LOAD THE HIP','EXPLOSIVE ROTATION','COMPLETE THROW','IMPACT','RELEASE','RECOVERY'];
function sample(q,t){const f=clamp(t*60,0,54),d=q.dir,y=q.groundY,pull=ease((f-5)/5),entry=ease((f-10)/7),load=ease((f-17)/6),spin=ease((f-23)/15),recover=ease((f-48)/6);let phase=f<5?0:f<10?1:f<17?2:f<23?3:f<31?4:f<38?5:f<43?6:f<48?7:8;
 const index=f<5?0:f<10?1:f<17?2:f<23?3:f<48?4:f<51?1:5,mirror=index>=2&&index<=4?-1:1;
 const hx=clamp(q.baseX+d*10*entry,q.min,q.max),hp=hipPoints[index];

 const hip={x:hx+d*mirror*hp[0]*R,y:y+hp[1]*R},theta=.04+.32*pull+.18*entry+(Math.PI-.54)*spin;
 let cx,cy,attachment,control=null;
 if(f<17){const u=ease(f/17);cx=mix(q.initialWaist.x,hip.x,u);cy=mix(q.initialWaist.y,y-q.feetLength*Math.cos(theta)-28*Math.abs(Math.sin(theta)),u);attachment=f<10?'upper-body grip':'waist / hip entry';}
 else if(f<23){cx=hip.x;cy=mix(y-q.feetLength*Math.cos(theta)-28*Math.abs(Math.sin(theta)),hip.y-5,load);attachment='hip support';}
 else{const attach=ease((f-23)/5),hand={x:hx-d*60*R,y:y-50*R},wx=-d*(14*Math.cos(theta)+16*Math.sin(theta))*q.scale,wy=(14*Math.sin(theta)-16*Math.cos(theta))*q.scale;


 control=hand;cx=mix(hip.x,hand.x-wx,attach);cy=mix(hip.y-5,hand.y-wy,attach);attachment=f<39?'sleeve control / hip arc':'ground';}

 const angle=-d*theta;
 return{cx:clamp(cx,q.min,q.max),cy,angle,hx,hz:0,turn:Math.PI*entry,u:clamp(f/39,0,1),frame:f,phase,index,mirror,attachment,hip,control,theta,recover};}
root.NeonPairMotion.definitions??=new Map();root.NeonPairMotion.definitions.set('reinaHip118',sample);
function apply(g,p,a){const q=a.pair,v=a.victim,s=root.NeonPairMotion.sample(q,a.t);p.x=s.hx;p.y=q.groundY;p.grappleZ=0;p.jump=0;p.walk=0;p.hipPose118={index:s.index,mirror:s.mirror,phase:s.phase,frame:s.frame};a.debug118={...s,phaseName:phaseNames[s.phase],groundY:q.groundY};
 if(!a.impacted118){v.x=s.cx;v.y=q.groundY;v.act=null;v.walk=0;v.flight=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;v.pairVisual={cx:s.cx,cy:s.cy,angle:s.angle,pivot:0,sourceDir:-q.dir,groundY:q.groundY,phase:s.u,owner:p,action:a,contact118:true,waist118:q.waist};}
 else{v.act=null;v.x=v.prevX=v.fallFrom=v.fallTo=q.landX;v.y=q.groundY;v.pairVisual=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;v.flight=null;v.walk=0;v.downAge=.4;v.downTotal=1.45;v.down=1.05;v.fade=1;}

 if(s.frame>=24&&s.frame<39)for(const e of g.enemies){if(e===v||e.hp<=0||e.down||e.heldBy||a.collateral118.has(e.id)||Math.abs(e.x-v.x)>42||Math.abs(e.y-v.y)>24)continue;a.collateral118.add(e.id);g.damage(e,8,-q.dir,true,{attacker:p});}
}
function clear(g,a,interrupted=false){const v=a?.victim,p=g.player;if(!v)return;if(p.hold?.victim===v)g.release(p);v.hipLock118=null;v.pairVisual=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;p.hipPose118=null;p.grappleZ=0;
 if(interrupted&&!a.impacted118&&a.t>17/60&&v.hp>0){v.y=a.pair.groundY;g.knockDown(v,-a.pair.dir,1.45,true);v.noBounce=true;v.downAge=.4;v.fallFrom=v.fallTo=v.x;}
}
P.start=function(p,name,...args){const eligible=p===this.player&&p.type==='reina'&&name==='backThrow'&&p.hold&&!p.hold.rear&&!p.hold.counter;old.start.call(this,p,name,...args);const a=p.act;if(!eligible||!a?.victim)return;const v=a.victim,waist=waists[v.type]||[20,-55],scale=1.46515635*(weights[v.type]||1),d=p.dir;
 a.hip118=true;a.total=54/60;a.hitAt=39/60;a.damage118=a.damage;a.collateral118=new Set();a.pair={name:'backThrow',definition:'reinaHip118',actor:p,victim:v,dir:d,baseX:p.x,groundY:p.y,min:this.bounds.min,max:this.bounds.max,landX:clamp(p.x-d*100,this.bounds.min+12,this.bounds.max-12),waist,scale,feetLength:-waist[1]*scale,headLength:58*scale,initialWaist:{x:v.x-d*waist[0]*scale,y:p.y+waist[1]*scale},drop:false};v.hipLock118=a;apply(this,p,a);};
P.advanceHeroAction=function(p,a,dt){if(p===this.player&&a.hip118){apply(this,p,a);return;}return old.advanceHeroAction?.call(this,p,a,dt);};
P.hitPlayerAttack=function(a){if(!a?.hip118)return old.hitPlayerAttack.call(this,a);if(a.impacted118)return;const p=this.player,v=a.victim,q=a.pair;if(p.hold?.victim!==v)return;apply(this,p,a);v.pairVisual=null;this.release(p);v.inv=v.wakeInv=v.guarding=0;v.x=v.prevX=q.landX;v.y=q.groundY;this.damage(v,a.damage118,-q.dir,true,{force:true,attacker:p,grab:true});a.impacted118=true;v.hipGround118=true;v.flight=null;v.noBounce=true;v.fallFrom=v.fallTo=q.landX;v.downAge=.4;v.downTotal=1.45;v.down=1.05;v.landed=false;this.land(v);this.shake=Math.max(this.shake,4);this.effects.push({x:q.landX,y:q.groundY,kind:'dust',life:.32});this.event('powerSlam');apply(this,p,a);};
P.advanceDown=function(v,dt){if(v.hipLock118&&this.player.act===v.hipLock118){v.downAge=.4;v.downTotal=1.45;v.down=1.05;v.fade=1;return;}return old.advanceDown.call(this,v,dt);};
P.ai=function(v,dt){if(v.hipLock118&&this.player.act===v.hipLock118){v.walk=0;return;}return old.ai.call(this,v,dt);};
P.finishHeroAction=function(p,a){old.finishHeroAction?.call(this,p,a);if(a.hip118)clear(this,a);};
P.reset=function(...args){const a=this.player?.act;if(a?.hip118)clear(this,a,true);return old.reset.apply(this,args);};
P.tick=function(dt,input={}){const r=old.tick.call(this,dt,input);let a=this.player.act;if(a?.hip118&&(this.player.hp<=0||!this.enemies.includes(a.victim))){clear(this,a,true);this.player.act=null;a=null;}if(a?.hip118)apply(this,this.player,a);for(const v of this.enemies){if(v.hipLock118&&v.hipLock118!==a)clear(this,v.hipLock118,true);if(v.hipGround118&&!v.down&&!v.flight)v.hipGround118=false;}return r;};
N.ReinaHip118={sample,phases:phaseNames,frames:54};
})(typeof window!=='undefined'?window:globalThis);
