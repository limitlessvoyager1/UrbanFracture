
(function(root){'use strict';const N=root.NeonCombat,{Brawler,clamp}=N,P=Brawler.prototype,lerp=(a,b,u)=>a+(b-a)*u;
const names=new Set(['counterTakedown','throw','backThrow','suplex','rearTakedown','reap','shove','broxSpinThrow','broxClothesline','broxGerman','broxNelson','broxPowerSlam','broxCounterSlam','broxCounterTackle','broxCounterBackSlam','broxCounterClothesline','broxCounterToss','broxCounterKnife','powerBomb','powerSlam','slam']);
const old={};for(const key of ['start','advanceHeroAction','advanceHeroActor','tick','launch','broxtonLaunch','release','knockDown','land','reset','hitPlayerAttack','enemyHit','settledDefeats'])old[key]=P[key];
function sample(q,t){const custom=root.NeonPairMotion?.definitions?.get(q.definition);if(custom)return custom(q,t);const u=clamp(t/q.releaseAt,0,1),s=Math.sin(u*Math.PI),d=q.dir,x=q.baseX,y=q.groundY,from=q.startOffset,cy=lerp(-q.pivot,-12,u);let vx=lerp(from,42,u),vy=cy-34*s,angle=d*Math.PI*.5*u,hx=x,hz=0,turn=0;
 switch(q.name){
 case 'throw':vx=lerp(from,54,u);vy=cy-13*s;break;
 case 'backThrow':vx=lerp(from,-24,u);vy=cy-66*s;angle=-d*Math.PI*.5*u;break;
 case 'suplex':vx=lerp(from,-20,u);vy=lerp(-q.pivot,-83,u)-48*s;angle=-d*Math.PI*.5*u;break;
 case 'rearTakedown':vx=lerp(from,46,u);vy=lerp(-q.pivot,-12,u);hx=x+d*16*u;break;
 case 'counterTakedown':vx=lerp(from,q.counterStyle==='knife'?-42:44,u);vy=cy-12*s;angle=(q.counterStyle==='knife'?-d:d)*Math.PI*.5*u;break;case 'reap':case 'shove':vx=lerp(from,44,u);vy=cy-12*s;break;
 case 'broxSpinThrow':{turn=clamp((t-.02)/.68,0,1)*Math.PI*2;const a=turn;vx=Math.cos(a)*from;vy=-q.pivot-Math.sin(clamp(t/q.releaseAt,0,1)*Math.PI)*14;angle=d*Math.sin(a)*.24;break;}
 case 'broxClothesline':{const step=clamp((t-.10)/(q.releaseAt-.10),0,1);hx=x+d*58*step;vx=from+58*step;const fall=clamp((u-.70)/.30,0,1);vy=lerp(-q.pivot,-12,fall);angle=d*Math.PI*.5*fall;break;}
 case 'broxGerman':vx=lerp(from,-88,u);vy=cy-89*s;angle=-d*Math.PI*.5*u;break;
 case 'broxNelson':vx=lerp(from,44,u)-16*s;vy=cy-92*s;break;
 case 'broxPowerSlam':vx=lerp(from,42,u)-68*s;vy=cy-148*s;hz=55*s;break;
 case 'broxCounterSlam':vx=lerp(from,42,u);vy=cy-44*s;break;
 case 'broxCounterTackle':{const ease=u*u*(3-2*u);hx=x+d*100*ease;vx=lerp(from,145,ease);vy=lerp(-q.pivot,-12,ease);angle=d*Math.PI*.5*ease;break;}
 case 'broxCounterBackSlam':{const ease=u*u*(3-2*u);vx=lerp(from,-65,ease);vy=lerp(-q.pivot,-12,ease)-94*s;angle=-d*Math.PI*.5*ease;break;}
 case 'broxCounterClothesline':{const ease=u*u*(3-2*u),fall=clamp((u-.72)/.28,0,1);hx=x+d*50*ease;vx=lerp(from,104,ease);vy=lerp(-q.pivot,-12,fall);angle=d*Math.PI*.5*fall;break;}
 case 'broxCounterToss':{const ease=u*u*(3-2*u);vx=lerp(from,-112,ease);vy=lerp(-q.pivot,-12,ease)-65*s;angle=-d*Math.PI*.5*ease;break;}
 case 'broxCounterKnife':{const fall=clamp((u-.82)/.18,0,1);vx=lerp(from,48,u);vy=lerp(-q.pivot,-12,fall);angle=d*Math.PI*.5*fall;break;}
 case 'powerBomb':{const lift=clamp(u/.28,0,1),drop=clamp((u-.60)/.40,0,1),ease=drop*drop*(3-2*drop);vx=lerp(lerp(from,12,lift),64,ease);vy=lerp(lerp(-q.pivot,-176,lift),-42,ease);angle=d*Math.PI*.5*ease;break;}case 'powerSlam':case 'slam':vx=lerp(from,44,u);vy=cy-122*s;break;
 }
 return{cx:x+d*vx,cy:y+vy,angle,hx,hz,turn,u};}
P.start=function(a,name,total,hitAt,opts={}){old.start.call(this,a,name,total,hitAt,opts);const act=a.act,v=act?.victim||a.hold?.victim;if(!act||!v||!names.has(act.name))return;
 if(act.name==='suplex'){act.total=Math.max(act.total,.78);a.inv=Math.max(a.inv,.8);}
 if(act.name==='backThrow'){act.total=Math.max(act.total,.78);a.inv=Math.max(a.inv,.8);}
 if(act.name==='throw'){act.total=Math.max(act.total,.66);a.inv=Math.max(a.inv,.7);}
 const drop=['counterTakedown','rearTakedown','broxClothesline','broxGerman','broxNelson','broxPowerSlam','broxCounterSlam','broxCounterTackle','broxCounterBackSlam','broxCounterClothesline','broxCounterToss','broxCounterKnife','powerBomb','powerSlam','slam'].includes(act.name),pivot=['reina','broxton'].includes(v.type)?70:62;
 act.pair={name:act.name,actor:a,victim:v,dir:a.dir,baseX:a.x,groundY:a.y,releaseAt:act.hitAt,startOffset:(v.x-a.x)*a.dir,pivot,drop,landDir:act.throwDir||a.dir,rear:!!a.hold?.rear,counterStyle:act.counterStyle,min:this.uptown?this.combatBounds.min:0,max:this.uptown?this.combatBounds.max:N.WORLD_END};
 v.pairVisual={owner:a,action:act,pivot,rear:!!a.hold?.rear,cx:v.x,cy:v.y-pivot,angle:0,groundY:a.y,phase:0,landMix:0};
};
P.advanceHeroAction=function(a,act,dt){old.advanceHeroAction?.call(this,a,act,dt);const q=act.pair;if(!q)return;const v=q.victim,s=sample(q,act.t);act.pairTurn=s.turn;
 if(a.hold?.victim===v&&act.t<=q.releaseAt+.04){a.x=clamp(s.hx,this.bounds.min,this.bounds.max);a.grappleZ=s.hz;v.x=clamp(s.cx,this.bounds.min,this.bounds.max);v.y=q.groundY;v.grappleZ=0;v.grappleAngle=0;v.grapplePivot=0;Object.assign(v.pairVisual||={},s,{owner:a,action:act,pivot:q.pivot,rear:q.rear,groundY:q.groundY,phase:s.u,sourceDir:q.name==='broxSpinThrow'?(Math.cos(s.turn)>=0?-q.dir:q.dir):v.dir,landMix:0});}
 else if(q.name==='broxGerman'&&act.released){const u=clamp((act.t-.66)/.35,0,1),to=(v.flight?.to??v.fallTo??v.x)+a.dir*24;a.x=clamp(lerp(q.baseX,to,u),this.bounds.min,this.bounds.max);a.grappleZ=act.t>.66&&act.t<1.02?Math.sin(u*Math.PI)*20:0;}
 else a.grappleZ=0;
};
P.launch=function(e,dir,damage,collateral=8,style='throw'){const pv=e.pairVisual,q=pv?.action?.pair,release=pv?{cx:pv.cx,cy:pv.cy,angle:pv.angle}:null;this.pairLaunching=true;let okay;try{okay=old.launch.call(this,e,dir,damage,collateral,style);}finally{this.pairLaunching=false;}if(!okay||!e.flight||!q||!release)return okay;
 const f=e.flight,distance=Math.abs(f.to-f.from);e.x=clamp(release.cx,this.bounds.min,this.bounds.max);e.prevX=e.x;e.dir=pv.sourceDir||e.dir;f.from=e.x;f.to=clamp(e.x+dir*distance,this.bounds.min,this.bounds.max);f.pairVisual=pv;f.pairRelease=release;f.startAngle=0;f.startZ=Math.max(0,q.groundY-release.cy-q.pivot);f.descending=true;
 pv.released=true;pv.throwDir=dir;e.pairVisual=pv;
 return okay;};
P.broxtonLaunch=function(e,dir,damage,style,z=0,distance=150){const pv=e.pairVisual,okay=old.broxtonLaunch.call(this,e,dir,damage,style,z,distance);if(okay&&e.flight&&pv){e.pairVisual=pv;e.flight.pairVisual=pv;if(style==='broxGerman'){e.flight.from=e.x;e.flight.to=e.x;e.flight.total=.001;e.flight.startZ=0;e.flight.startAngle=0;e.flight.pairRelease={cx:e.x,cy:e.y-12,angle:-this.player.dir*Math.PI/2};this.broxtonArea(e.x,e.y,10,88,e);}}return okay;};
P.release=function(a){const v=a.hold?.victim,pv=v?.pairVisual,q=pv?.action?.pair,planned=!!q&&pv.action.t>=q.releaseAt-.025;old.release.call(this,a);if(v&&pv){if(planned)v.pairVisual=pv;else v.pairVisual=null;}a.grappleZ=0;};
function settle(q,goal){const e=q?.victim,pv=e?.pairVisual;if(!q?.drop||!pv||!e.down)return;e.x=clamp(goal?.cx??pv.cx,q.min??0,q.max??N.WORLD_END);e.y=q.groundY;e.fallFrom=e.x;e.fallTo=e.x;e.downAge=Math.max(.32,e.downAge);e.noBounce=true;}
P.hitPlayerAttack=function(a){const q=a.pair,goal=q?.drop?sample(q,q.releaseAt):null;const r=old.hitPlayerAttack.call(this,a);settle(q,goal);return r;};
P.enemyHit=function(e,a){const q=a.pair,goal=q?.drop?sample(q,q.releaseAt):null;const r=old.enemyHit.call(this,e,a);settle(q,goal);return r;};
P.knockDown=function(a,dir,duration=1.45,landed=false){const pv=a.pairVisual,q=pv?.action?.pair;const direct=q?.drop&&pv.phase>=.98&&!this.pairLaunching;if(direct){a.x=clamp(pv.cx,this.bounds.min,this.bounds.max);a.y=pv.groundY;landed=true;}old.knockDown.call(this,a,dir,duration,landed);};
P.land=function(a){const wasLanded=a.landed;old.land.call(this,a);if(a.pairVisual?.action?.name==='broxSpinThrow'){a.y=a.pairVisual.groundY;a.pairVisual=null;a.grappleZ=0;a.grappleAngle=0;a.grapplePivot=0;a.noBounce=true;a.downAge=Math.max(.32,a.downAge||0);a.fallFrom=a.x;a.fallTo=a.x;}if(a.pairVisual&&!wasLanded){const pv=a.pairVisual;pv.landTime??=this.time;pv.cx=a.x;pv.cy=a.y-(pv.action?.pair?.name==='powerBomb'?42:12);pv.angle=(pv.throwDir||pv.action?.pair?.landDir||1)*Math.PI/2;pv.landed=true;}};
P.tick=function(dt,input={}){old.tick.call(this,dt,input);for(const a of [this.player,...this.enemies]){const pv=a.pairVisual;if(!pv)continue;if(pv.action?.grab258&&pv.action.move258==='roll'&&pv.owner?.act===pv.action)continue;
 if(N.Niko283?.ownsVisual(a))continue;
 if(a.flight){const f=a.flight,r=f.pairRelease||{cx:pv.cx,cy:pv.cy,angle:pv.angle},u=clamp(f.t/f.total,0,1);pv.cx=a.x;pv.cy=lerp(r.cy,pv.groundY-12,u);pv.angle=lerp(r.angle,(pv.throwDir||1)*Math.PI/2,u);pv.landMix=0;}
 else if(a.down||a.hp<=0){pv.landTime??=this.time;pv.cx=a.x;pv.cy=a.y-(pv.action?.pair?.name==='powerBomb'?42:12);pv.angle=(pv.throwDir||pv.action?.pair?.landDir||1)*Math.PI/2;pv.landMix=clamp((this.time-pv.landTime)/.12,0,1);if(pv.landMix>=1)a.pairVisual=null;}
 else if(!a.heldBy)a.pairVisual=null;
 }};
P.settledDefeats=function(){return !this.player.act?.pair&&old.settledDefeats.call(this);};
P.reset=function(checkpoint=0){old.reset.call(this,checkpoint);this.player.pairVisual=null;};
root.NeonPairMotion={sample,names};if(typeof module!=='undefined')module.exports=root.NeonPairMotion;
})(typeof window!=='undefined'?window:globalThis);
