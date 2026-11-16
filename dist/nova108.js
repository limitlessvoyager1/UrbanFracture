
(function(root){'use strict';const N=root.NeonCombat,{Brawler,clamp}=N,P=Brawler.prototype,old={};for(const k of ['start','advanceHeroActor','advanceHeroAction','hitPlayerAttack','advanceDown','tick','finishHeroAction'])old[k]=P[k];const names=new Set(['novaBelly','novaTrampoline','novaFace']),S=1.46515635,ease=u=>{u=clamp(u,0,1);return u*u*(3-2*u);},mix=(a,b,u)=>a+(b-a)*u;
function pose(a,sheet,index,angle=0,turn=1){a.pose108={sheet,index,angle,turn};}
function landmark(a,points,i,t,starts){const current=points[i],previous=points[Math.max(0,i-1)],u=i?ease((t-starts[i])/.10):1,target=[mix(previous[0],current[0],u),mix(previous[1],current[1],u)];a.pose108.offset=[target[0]-current[0],target[1]-current[1]];return target;}
function contact(g,p,a,point,angle,front=false){const v=a.victim;if(!v)return;const d=a.dir105||p.dir,head={x:p.x+d*point[0]*S,y:p.y-(p.grappleZ||0)+point[1]*S};a.contact108={cx:head.x,cy:head.y,pivot:0,angle,sourceDir:front?-d:d,rear:!front,groundY:a.ground105,action:a,contact108:true,backHead108:!front};v.pairVisual=a.contact108;v.x=clamp(head.x,g.bounds.min,g.bounds.max);v.y=a.ground105;v.grappleZ=v.grappleAngle=0;}
function ground(g,a){const v=a.victim;if(!v)return;v.flight=null;v.grappleZ=v.grappleAngle=0;v.novaLock108=a;v.downTotal=Math.max(v.downTotal||0,1.45);v.downAge=.40;v.down=v.downTotal-v.downAge;v.noBounce=true;v.fallFrom=v.fallTo=v.x;v.walk=0;v.stun=0;v.fade=1;}
function hurt(g,a,amount,knock){const v=a.victim,x=v.x;v.inv=v.wakeInv=v.guarding=0;g.damage(v,amount,a.dir105,knock,{attacker:g.player,force:true,grab:true,ground:!knock,deferDefeat97:true});v.x=v.prevX=v.fallFrom=v.fallTo=x;ground(g,a);}
function finish(g,a){const v=a?.victim;if(!v)return;v.pairVisual=null;v.novaLock108=null;if(v.rigAir108&&!a.grounded108)g.knockDown(v,a.dir105,1.2,true);v.rigAir108=false;v.grappleZ=v.grappleAngle=v.grapplePivot=0;if(v.deferredDamage97>0)g.damage(v,0,a.dir105,true,{force:true,attacker:g.player,releaseDefeat97:true});if(v.hp>0&&a.grounded108){v.downAge=.4;v.downTotal=1.10;v.down=.70;v.fallFrom=v.fallTo=v.x;}g.player.grappleZ=0;}
P.start=function(p,name,...args){old.start.call(this,p,name,...args);const a=p.act;if(p!==this.player||p.type!=='nova')return;if(a?.ddt107)a.headRig108=true;if(!names.has(a?.name))return;a.rig108=true;a.total=a.name==='novaBelly'?2.0:a.name==='novaTrampoline'?1.42:1.35;a.hitAt=a.name==='novaBelly'?.48:a.name==='novaTrampoline'?1.0:.96;a.damage108=a.damage;a.dir105=p.dir;a.ground105=p.y;a.fromX=p.x;a.victimX105=a.victim.x;a.victim.novaLock108=a;};
P.advanceHeroActor=function(p,dt){old.advanceHeroActor?.call(this,p,dt);if(p===this.player&&p.act?.rig108&&p.act.name!=='novaBelly')p.act.t+=dt*.16;};
function sample(g,p,a){const v=a.victim,t=a.t,d=a.dir105,x=a.fromX,y=a.ground105,place=x=>clamp(x,g.bounds.min,g.bounds.max);if(!v)return;p.y=y;
 if(a.ddt107){if(a.planted107){a.pose108=null;return;}let i=t<.40?0:t<.72?1:2;pose(a,'ddt90',i);const points=[[23.65,-96.32],[16.125,-68.8],[11.825,-74.175]];contact(g,p,a,landmark(a,points,i,t,[0,.40,.72]),-.25-2.4*ease((t-.40)/.72),true);return;}
 if(a.name==='novaBelly'){
 const lift=ease(t/.48),fly=ease((t-.48)/.32),flip=ease((t-.94)/.50),roll=ease((t-1.56)/.28);a.landing108??=place(x-d*112);
 if(t<.48){pose(a,'belly92',0,-.36*lift);p.x=x;p.grappleZ=0;if(p.hold?.victim===v){v.x=place(x+d*(32-45*lift));v.y=y;v.grapplePivot=60;v.grappleZ=85*Math.sin(lift*Math.PI/2);v.grappleAngle=-lift*1.2;}}
 else if(t<.80){pose(a,'belly92',0,-.36*(1-fly));p.x=x;p.grappleZ=0;v.x=place(mix(a.releaseX108??v.x,a.landing108,fly));v.y=y;v.stun=1;v.rigAir108=true;v.grappleZ=85*(1-fly)+70*Math.sin(Math.PI*fly);v.grapplePivot=65;v.grappleAngle=-Math.PI*.5*fly;}
 else if(t<.94){pose(a,'motion',0);p.x=x;p.grappleZ=0;}
 else if(t<1.30){pose(a,'belly92',1,-2*Math.PI*flip);p.x=place(mix(x,a.landing108,flip));p.grappleZ=100*Math.sin(Math.PI*flip);}
 else if(t<1.56){pose(a,'belly92',2);p.x=t<1.44?place(mix(x,a.landing108,flip)):a.landing108;p.grappleZ=t<1.44?Math.max(0,56*(1-ease((t-1.30)/.14))):0;}
 else if(t<1.84){pose(a,'belly92',3,Math.PI*2*roll);p.x=place(a.landing108+d*90*roll);p.grappleZ=0;}
 else{pose(a,'motion',0);p.x=place(a.landing108+d*90);p.grappleZ=0;}
 }else if(a.name==='novaTrampoline'){
 const climb=ease(t/.25),jump=ease((t-.25)/.40),drop=ease((t-.65)/.35),away=ease((t-1.08)/.26);p.x=place(mix(x,a.victimX105,climb));
 if(t<.25){pose(a,'hurricanrana85',1);p.grappleZ=88*climb;}
 else if(t<.65){pose(a,'backthrow105',2,-Math.PI*2*jump,.72+.28*Math.cos(Math.PI*4*jump));p.grappleZ=88+85*Math.sin(jump*Math.PI/2);}
 else if(t<1.0){pose(a,'belly92',2);p.grappleZ=173*(1-drop);}
 else if(t<1.08){pose(a,'belly92',2);p.grappleZ=0;}
 else if(t<1.34){pose(a,'recovery83',1);p.x=place(a.victimX105-d*65*away);p.grappleZ=32*Math.sin(Math.PI*away);}
 else{pose(a,'motion',0);p.x=place(a.victimX105-d*65);p.grappleZ=0;}
 if(!a.grounded108&&p.hold?.victim===v){v.x=a.victimX105;v.y=y;v.grappleZ=v.grappleAngle=0;}
 }else if(a.name==='novaFace'){
 const leap=ease((t-.40)/.56);p.x=place(x+d*(18*ease(t/.18)+105*leap));p.grappleZ=t<.40?0:t<.96?42*Math.sin(Math.PI*leap):0;const i=t<.18?0:t<.40?1:t<.96?2:3;pose(a,'face91',i);const palm=[[50,-121],[54,-96],[59,-40],[32,-7]];const hand=landmark(a,palm,i,t,[0,.18,.40,.96]);p.x=place(p.x+d*(50-hand[0])*S);if(t<1.18){contact(g,p,a,hand,.35+(Math.PI*.5-.35)*ease(t/.56));const foot={thug:[25.67,-106.66],knifeThug:[8.2,-131],enforcer:[16.2,-116.92],boss:[-17.86,-135.85],bouncer:[26.84,-119.68],cop:[16.76,-105],gangster:[1.16,-139.09],security:[-2.4,-142.24]}[v.type]||[13,-127],k=v.type==='enforcer'?1.15:v.type==='boss'?1.20:v.type==='bouncer'?1.10:v.type==='thug'||v.type==='knifeThug'?.92:v.type==='cop'?.94:v.type==='security'?1.08*1.08:1,H=-foot[1],R=Math.hypot(foot[0],H),height=(y-a.contact108.cy)/(S*k),minimum=Math.acos(clamp(height/R,-1,1))-Math.atan2(foot[0],H);a.contact108.angle=Math.max(a.contact108.angle,minimum);v.pairVisual=a.contact108;}else{a.contact108=null;v.pairVisual=null;pose(a,'motion',0);}
 }
}
P.advanceHeroAction=function(p,a,dt){if(p===this.player&&a.rig108){const name=a.name;a.name='novaRig108';old.advanceHeroAction?.call(this,p,a,dt);a.name=name;sample(this,p,a);return;}old.advanceHeroAction?.call(this,p,a,dt);if(p===this.player&&a.headRig108)sample(this,p,a);};
P.hitPlayerAttack=function(a){if(!a?.rig108)return old.hitPlayerAttack.call(this,a);const p=this.player,v=a.victim;if(!v)return;
 if(a.name==='novaBelly'){if(!a.released108){if(p.hold?.victim!==v)return;a.releaseX108=v.x;this.release(p);v.stun=1;v.rigAir108=true;a.released108=true;a.hitAt=.80;a.done=false;}else if(!a.grounded108){v.rigAir108=false;v.x=a.landing108;v.pairVisual=null;hurt(this,a,a.damage108,true);a.grounded108=true;a.hitAt=1.44;a.done=false;this.land(v);this.event('powerSlam');this.shake=Math.max(this.shake,8);}else if(!a.splashed108){a.splashed108=true;hurt(this,a,8,false);this.event('powerSlam');this.shake=Math.max(this.shake,10);}}
 else if(a.name==='novaTrampoline'){if(p.hold?.victim!==v)return;this.release(p);v.x=a.victimX105;hurt(this,a,a.damage108,true);a.grounded108=true;this.land(v);this.event('powerSlam');this.shake=Math.max(this.shake,10);}
 else if(a.name==='novaFace'){if(p.hold?.victim!==v)return;const pv=a.contact108;this.release(p);v.pairVisual=null;hurt(this,a,a.damage108,true);v.faceSmash91=false;a.grounded108=true;a.contact108=pv;v.pairVisual=pv;this.land(v);this.event('powerSlam');this.shake=Math.max(this.shake,10);}
};
P.advanceDown=function(v,dt){const a=v.novaLock108;if(a&&this.player.act===a){v.downAge=.4;v.downTotal=Math.max(1.45,v.downTotal);v.down=v.downTotal-.4;v.fade=1;return;}return old.advanceDown.call(this,v,dt);};
P.finishHeroAction=function(p,a){old.finishHeroAction?.call(this,p,a);if(a.rig108)finish(this,a);};
P.tick=function(dt,input={}){const r=old.tick.call(this,dt,input),a=this.player.act;if(a?.rig108||a?.headRig108)sample(this,this.player,a);for(const v of this.enemies)if(v.novaLock108&&this.player.act!==v.novaLock108)finish(this,v.novaLock108);return r;};
N.NovaRig108={sample,scale:S};
})(typeof window!=='undefined'?window:globalThis);
