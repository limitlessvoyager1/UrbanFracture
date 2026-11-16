/* Native Niko pair owner: fixed-plane wrist control, staged falls and impact-only damage. */
(function(r){'use strict';const N=r.NeonCombat,P=N.Brawler.prototype,K=N.Niko185,F=N.Forest125,E=u=>{u=N.clamp(u,0,1);return u*u*(3-2*u)},M=(a,b,u)=>a+(b-a)*u;
const cfg={throat:{frames:88,impact:48,recover:72,stages:[0,8,16,24,34,48,62,72],names:['Shoulder control','Wrist capture','Raise arm','Pivot under wrist','Rotational descent','Ground contact','Release','Recovery']},armbar:{frames:108,impact:44,recover:86,stages:[0,10,20,30,44,57,70,86],names:['Arm capture','Backward step','Turn and pull','Knee descent','Prone control','Load stomp','Arm twist + head stomp','Release / recovery']}};
for(const[k,q]of Object.entries(cfg))Object.assign(K.config.moves[k],{frames:q.frames,impact:q.impact,recover:q.recover});
const handles=a=>!!a?.niko185&&a.pair185&&!!cfg[a.kind185];
function sample(a){const q=cfg[a.kind185],f=a.t*60,away=a.kind185==='armbar';let stage=0;for(let i=1;i<q.stages.length;i++)if(f+1e-7>=q.stages[i])stage=i;const t=q.stages[stage],end=q.stages[stage+1]??q.frames,u=E((f-t)/(end-t));return{frame:f,stage,phase:q.names[stage],u,hero:(away?8:0)+stage,victim:away?[0,8,9,10,11,11,12,11][stage]:[0,0,2,3,4,6,7,7][stage],away,grounded:f+1e-7>=q.impact,recover:f+1e-7>=q.recover};}
function valid(g,a){return handles(a)&&g.player.act===a&&g.enemies.includes(a.victim)&&g.player.hp>0&&!g.transition&&!g.finScene&&!g.alleyIntro&&!g.bossEnding;}
function ownsVisual(e){const a=e.pairVisual?.action;return !!e.pairVisual?.niko283&&handles(a)&&e.pairVisual.owner?.act===a;}
function visual(g,a){if(!valid(g,a))return;a.zone283=g.zone;const p=g.player,v=a.victim,s=sample(a),d=a.dir185,dir=s.away?-d:d,S=F.scale(v),PS=F.scale(p)*(g.zone===11?1.12:1),VS=S*(g.zone===11?1.12:1);p.dir=d;p.y=a.groundY;p.jump=p.jumpVx=p.jumpVy=p.grappleZ=0;p.walk=0;p.running=false;p.niko283={...s,action:a};v.y=a.groundY;v.dir=s.stage<2?-d:dir;v.act=null;v.walk=0;v.running=false;v.flight=null;v.grappleZ=v.grappleAngle=v.grapplePivot=0;
 const travel=s.away?-36*E(s.frame/44):90*E(s.frame/48);p.x=N.clamp(a.fromX+d*travel,g.bounds.min+12,g.bounds.max-12);
 const baseReach=s.away?M(a.vx-a.fromX,-30*d,E((s.frame-10)/34)):M(a.vx-a.fromX,75*d,E((s.frame-16)/32));let x=a.fromX+baseReach,cy=a.groundY,angle=0;
 const data=r.Niko283Data,h=data?.niko[s.hero],body=data?.marcus[s.victim];
 // In-flight wrists share an exact world contact. Grounded bodies use their opaque source sole.
 if(h&&body&&s.stage<6&&!s.grounded&&N.Street209.armorless(v)){
  const hd=s.hero===12?-d:d,vd=s.stage<2?-d:dir,face=body.facing;
  const hx=p.x+hd*(h.grip||h.hand)[0]*PS,hy=a.groundY+(h.grip||h.hand)[1]*PS;
  const localX=body.hand[0]*face,localY=body.hand[1];x=hx-vd*localX*VS;cy=hy-localY*VS;
  cy=Math.min(a.groundY,cy);if(s.stage<2)cy=a.groundY; // grounded shoulder capture, no vertical shift of the floor
 }
 if(s.grounded){x=a.landX283??x;cy=a.groundY;}
 v.x=N.clamp(x,g.bounds.min+12,g.bounds.max-12);v.niko283={...s,action:a,dir};if(h&&body&&!s.recover){const hd=s.hero===12?-d:d;v.niko283.contactWorld={x:p.x+hd*(h.grip||h.hand)[0]*PS,y:a.groundY+(h.grip||h.hand)[1]*PS};}
 if(s.away&&s.stage===6&&body?.head){p.niko283.stompTarget=[(v.x+dir*body.head[0]*VS-p.x)/(d*PS),body.head[1]*VS/PS];}
 if(!s.recover){v.pairVisual={niko283:true,owner:p,action:a,cx:v.x,cy,pivot:0,angle:0,sourceDir:s.stage<2?-d:dir,groundY:a.groundY,stage:s.stage,sourceFrame:s.victim};}
 else{v.pairVisual=null;}
 a.diagnostic283={...s,heroX:p.x,victimX:v.x,plane:a.groundY,contact:!s.recover,synchronized:true};
}
function impact(g,a){const v=a.victim,s=sample(a);a.landX283=N.clamp(a.fromX+a.dir185*(s.away?-30:75),g.bounds.min+12,g.bounds.max-12);v.x=a.landX283;F.floor(g,a,a.landX283);v.dir=s.away?-a.dir185:a.dir185;v.nikoGround283={dir:v.dir,away:s.away,pose:s.away?11:7,at:g.time};v.nikoFloor185=a;v.forestLock125=a;if(g.player.hold?.victim===v)g.release(g.player);g.event('nikoGround283',{kind:a.kind185,enemy:v.id});}
function once(a,key,at,fn){if(a.t*60+1e-7<at||a.events185.has(key))return;a.events185.add(key);fn();}
function advance(g,p,a,dt){const v=a.victim,s=sample(a);if(!valid(g,a))return;visual(g,a);once(a,'fall283',cfg[a.kind185].impact,()=>{if(a.kind185==='throat')K.hit(g,a,v,14,'throat',{paired:true,statuses:K.config.moves.throat.status});impact(g,a);});
 if(a.kind185==='armbar')once(a,'finish283',70,()=>{K.hit(g,a,v,8,'armbar',{paired:true,ground:true,statuses:K.config.moves.armbar.status});K.hit(g,a,v,4,'armbar-stomp',{paired:true,ground:true});g.event('nikoArmStomp283',{enemy:v.id,frame:70});});
 if(s.grounded){v.x=v.prevX=v.fallFrom=v.fallTo=a.landX283;v.y=a.groundY;v.noBounce=true;v.reapGround119=true;v.landed=true;v.downTotal=Math.max(1.8,v.downTotal||0);v.downAge=.4;v.down=v.downTotal-.4;v.recoveryNotBefore119=Math.max(v.recoveryNotBefore119||0,g.time+.2);}
 visual(g,a);
}
// Idle grips are sized from visible shoulders, not the old generic 32-unit root offset.
function hold(g){const p=g.player,h=p.hold,v=h?.victim;if(p.type!=='niko'||!h||h.counter||h.rear||p.act||!v||v.hp<=0)return;const target=74*F.scale(p)/1.46515635;v.x=N.clamp(p.x+p.dir*target,g.bounds.min+12,g.bounds.max-12);v.y=p.y;v.dir=-p.dir;v.prevX=v.x;v.prevY=v.y;p.grip283={reach:target,plane:p.y};}
const tick=P.tick;P.tick=function(dt,i={}){const before=this.player.act,r=tick.call(this,dt,i),p=this.player,a=p.act;if(handles(a)){if(valid(this,a))visual(this,a);}else{p.niko283=null;hold(this);}for(const e of this.enemies){if(e.niko283&&!ownsVisual(e))e.niko283=null;if(e.nikoGround283&&!e.down&&e.hp>0)e.nikoGround283=null;}if(before&&handles(before)&&before!==a){p.niko283=null;if(before.victim){before.victim.niko283=null;if(before.victim.pairVisual?.niko283)before.victim.pairVisual=null;}}return r;};
const finish=P.finishHeroAction;P.finishHeroAction=function(p,a){const r=finish.call(this,p,a);if(handles(a)){p.niko283=null;const v=a.victim;v.niko283=null;if(v.pairVisual?.niko283)v.pairVisual=null;if(v.nikoGround283)v.dir=v.nikoGround283.dir;}return r;};
const enemyHit=P.enemyHit;P.enemyHit=function(e,a){if(N.Street209.is(e)&&(e.act!==a||e.hp<=0||e.heldBy||e.down||e.stun>0||e.forestLock125)){e.contactRejected283={reason:'stale or incapacitated attack',at:this.time,move:a?.name};return;}return enemyHit.call(this,e,a);};
const report=N.Audit135.report;N.Audit135.report=function(g){return{...report(g),niko283:g.player.act?.diagnostic283||g.player.grip283||null};};
N.Niko283={config:cfg,handles,sample,advance,visual,valid,ownsVisual,hold};
})(globalThis);
