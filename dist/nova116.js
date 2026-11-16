
(function(root){'use strict';const {Brawler,clamp}=root.NeonCombat,P=Brawler.prototype,old={};for(const k of ['ai','start','advanceHeroAction','hitPlayerAttack','advanceDown','tick','finishHeroAction'])old[k]=P[k];const S=1.46515635,smooth=u=>{u=clamp(u,0,1);return u*u*(3-2*u);},mix=(a,b,u)=>a+(b-a)*u;
const grip=[[23.65,-96.32],[16.125,-68.8],[11.825,-74.175],[-21.5,-38.05]];
function sample(g,p,a){const v=a.victim;if(!v)return;const t=clamp(a.t,0,1.2),d=a.dir105,y=a.ground105;
 const turn=smooth((t-.20)/.50)*Math.PI*2,fall=smooth((t-.70)/.15),recover=smooth((t-62/60)/(10/60));a.rotation116=turn;

 p.x=clamp(a.fromX+d*(22*smooth(t/.20)+20*smooth((t-.20)/.50)),g.bounds.min+50,g.bounds.max-50);p.y=y;p.walk=0;p.jump=0;
 p.grappleZ=t<.20?0:t<.70?72*Math.sin(Math.PI/2*smooth((t-.20)/.18))*(1-.12*smooth((t-.48)/.22)):t<.85?63*(1-fall):0;
 let index=t<.20?0:t<.70?(turn>Math.PI*.5&&turn<Math.PI*1.5?2:1):3,sheet='ddt90';if(t>=62/60){sheet='recovery83';index=1;if(t>=69/60){sheet='motion';index=0;}}
 const turnScale=1; // Front/back drawings provide the turn; never squash Nova's body.
 let point=grip[index]||grip[3],offset=[0,0];

 if(a.lastIndex116!==index){a.previousGrip116=a.currentGrip116||grip[0];a.poseChange116=t;a.lastIndex116=index;}
 const blend=smooth((t-(a.poseChange116||0))/.06),previous=a.previousGrip116||point;const raw=point;point=[mix(previous[0],raw[0],blend),mix(previous[1],raw[1],blend)];offset=[point[0]-raw[0],point[1]-raw[1]];a.currentGrip116=point;
 const crouch=t<.20?8*Math.sin(Math.PI*smooth((t-.10)/.10)):0;

 const seatDrop=0;
 a.pose108={sheet,index,angle:0,turn:turnScale,offset:[offset[0],offset[1]+crouch+seatDrop]};
 if(t>=.85){a.pose108.turn=1;a.pose108.offset[1]=t<62/60?0:0;}
 if(!a.impacted116){const angle=.48+.12*smooth(t/.20)+(Math.PI-.60)*fall;
 const head={x:p.x+d*(point[0]*turnScale+offset[0]*(1-turnScale))*S,y:y-p.grappleZ+(point[1]+crouch+seatDrop)*S};
 a.contact108={cx:head.x,cy:head.y,pivot:0,angle,sourceDir:-d,rear:false,groundY:y,action:a,contact108:true,turn116:turnScale};v.pairVisual=a.contact108;v.x=head.x;v.y=y;v.grappleZ=v.grappleAngle=v.grapplePivot=0;v.act=null;v.walk=0;v.flight=null;v.stun=0;v.dir=-d;
 }else{v.pairVisual=null;v.x=v.prevX=v.fallFrom=v.fallTo=a.landX116;v.y=y;v.walk=0;v.flight=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;v.downAge=.40;v.downTotal=Math.max(1.45,v.downTotal);v.down=v.downTotal-.40;v.fade=1;}
}
function clear(g,a){const v=a?.victim;if(!v)return;v.ddtLock116=null;v.pairVisual=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;g.player.grappleZ=0;if(a.impacted116&&v.hp>0){v.downAge=.4;v.downTotal=1.7;v.down=1.3;v.ddtRecoverAfter117=g.time+.65;}if(v.deferredDamage97>0)g.damage(v,0,a.dir105,true,{force:true,attacker:g.player,releaseDefeat97:true});}
P.start=function(p,name,...args){old.start.call(this,p,name,...args);const a=p.act;if(p!==this.player||p.type!=='nova'||a?.name!=='novaDDT')return;a.ddt116=true;a.ddt107=a.headRig108=a.throw105=false;a.total=72/60;a.hitAt=51/60;a.damage116=a.originalDamage107??a.damage;a.dir105=p.dir;a.ground105=p.y;a.fromX=p.x;a.victim.ddtLock116=a;p.inv=Math.max(p.inv,1.25);sample(this,p,a);};
P.advanceHeroAction=function(p,a,dt){if(p===this.player&&a.ddt116){sample(this,p,a);return;}return old.advanceHeroAction?.call(this,p,a,dt);};
P.hitPlayerAttack=function(a){if(!a?.ddt116)return old.hitPlayerAttack.call(this,a);if(a.impacted116)return;const p=this.player,v=a.victim;if(p.hold?.victim!==v)return;sample(this,p,a);a.landX116=clamp(a.contact108.cx,this.bounds.min+65,this.bounds.max-65);this.release(p);v.inv=v.wakeInv=v.guarding=0;this.damage(v,a.damage116,a.dir105,true,{force:true,attacker:p,grab:true});a.impacted116=true;v.flight=null;v.noBounce=true;v.x=v.prevX=v.fallFrom=v.fallTo=a.landX116;v.y=a.ground105;v.pairVisual=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;v.downAge=.4;v.downTotal=1.45;v.down=1.05;this.land(v);this.shake=Math.max(this.shake,5);this.event('powerSlam');sample(this,p,a);};
P.ai=function(v,dt){if(v.ddtLock116&&this.player.act===v.ddtLock116||this.time<(v.ddtRecoverAfter117||0)){v.walk=0;return;}return old.ai.call(this,v,dt);};
P.advanceDown=function(v,dt){if(v.ddtLock116&&this.player.act===v.ddtLock116){v.downAge=.40;v.downTotal=Math.max(2,v.downTotal);v.down=v.downTotal-.40;v.fade=1;v.act=null;v.walk=0;return;}return old.advanceDown.call(this,v,dt);};
P.finishHeroAction=function(p,a){old.finishHeroAction?.call(this,p,a);if(a.ddt116)clear(this,a);};
P.tick=function(dt,input={}){const r=old.tick.call(this,dt,input),a=this.player.act;if(a?.ddt116)sample(this,this.player,a);for(const v of this.enemies)if(v.ddtLock116&&v.ddtLock116!==a)clear(this,v.ddtLock116);return r;};
root.NeonCombat.NovaDDT116={sample,frames:72};
})(typeof window!=='undefined'?window:globalThis);
