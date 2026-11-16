
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype,clamp=N.clamp;
const C={fade:.8,approach:2.2,surprise:.45,rush:.55,knockout:1,board:1.4,startup:1.6,lift:2,depart:2.4},phases=['roofIn','approach','surprise','rush','knockout','board','startup','lift','depart'];
const choices=Object.freeze([{id:'hospital',name:'HOSPITAL',detail:'Follow the hospital lead.'},{id:'fbi-office',name:'LOCAL FBI OFFICE',detail:'Take the investigation to the local FBI office.'}]);
const level={id:'bank-rooftop',name:'UNION NATIONAL BANK / ROOFTOP',outdoor:true,start:0,end:960,geometry:{start:0,floor:430},environment:{template:true,drawScenery:(c,g)=>root.RooftopView201?.background(c,g)}};
root.EnvironmentController162.defineOutdoor({...level,...level.environment,assets:[],skyHeight:290});
const menu=g=>['choice','complete'].includes(g.rooftop201?.phase);
function stop(g){const p=g.player;g.unlink(p);g.cancelCharge?.();Object.assign(p,{act:null,jump:0,grappleZ:0,grappleAngle:0,stun:0,shock:0,down:0,flight:null,walk:0,running:false,blocking:false,physicalAttack:false});g.buffer=null;g.input={};g.projectiles=[];g.forestBolts125=[];g.grenades102=[];}
function begin(g,{preview=false}={}){if(g.rooftop201)return false;if(!preview&&(g.zone!==13||g.uptown||g.yacht195||g.estates196||g.casino192||g.government182||g.route74197))return false;stop(g);g.levelClear=null;g.won=false;g.playing=true;g.environmentPaused156=false;g.stage2Victory=true;g.rooftop201={phase:'bankFade',t:0,total:0,selected:0,padArmed:false,padDirection:0,knocked:false,inside:false,awarded:false,environment:g.environment156,pilot:{x:558,y:475},heli:{x:685,y:475}};g.transitionAlpha=0;g.event('bankRoofFade201');return true;}
function roof(g){stop(g);const q=g.rooftop201;g.enterEnvironmentLevel162(level);Object.assign(g.player,{x:122,prevX:122,y:475,prevY:475,dir:1,walk:1,walkPhase:0,inv:0});g.camera=0;g.enemies=[];g.pending=[];g.props=[];g.effects=[];g.items=[];g.targetEnemy=null;g.finScene=g.transition=g.bossEnding=g.alleyIntro=null;g.sceneSelection=level.id;if(g.gunner125)Object.assign(g.gunner125,{x:95,y:487,z:0,state:'walk',dir:1});q.phase='roofIn';q.t=0;g.transitionAlpha=1;g.event('bankRoof201');}
function award(g,q){if(q.awarded)return;q.awarded=true;g.levelClearAwarded??=new Set();if(!g.levelClearAwarded.has(2)){g.levelClearAwarded.add(2);g.awardScore(10000);g.event('levelClear',{level:2,bonus:10000});}}
function advanceClock(g,dt){g.time+=dt;if(!g.environmentPaused156){g.environment156?.advance(dt);g.environmentOriginal156?.advance(dt);}const p=g.player,s=g.environment156.effective(),outside=g.environmentLevel162?.id===level.id;for(const f of[p,g.gunner125].filter(Boolean)){f.wetness=f.wetness156=clamp((f.wetness156||0)+(outside?s.rain*dt/5:-dt/30),0,1);}const l=s.lightning;if(outside&&l?.thunder&&g.environmentThunder156!==l.id){g.environmentThunder156=l.id;g.event('environmentThunder156',{strength:l.strength});}for(const key of['inv','wakeInv','dodgeCd','counterCd','parryCd','specialCd','grabImmune'])p[key]=Math.max(0,(p[key]||0)-dt);if(p.type==='broxton'){const q=N.Broxton179.state(g);if(q.active>0){const used=Math.min(dt,q.active);q.active-=used;if(q.active<=0)q.cooldown=Math.max(0,N.Broxton179.config.armorCooldown-(dt-used));}else q.cooldown=Math.max(0,q.cooldown-dt);p.ironWillVisual179=q.active;}}
function advance(g,dt){const q=g.rooftop201;if(!q||menu(g)||!g.playing||g.environmentPaused156)return;dt=Math.max(0,Math.min(.04,dt));advanceClock(g,dt);q.t+=dt;q.total+=dt;const p=g.player; p.prevX=p.x;p.prevY=p.y;p.dir=1;p.walk=0;p.running=false;
if(q.phase==='bankFade'){g.transitionAlpha=clamp(q.t/C.fade,0,1);if(q.t>=C.fade)roof(g);return;}
const u=clamp(q.t/({roofIn:C.fade}[q.phase]||C[q.phase]||1),0,1);g.transitionAlpha=q.phase==='roofIn'?1-u:q.phase==='depart'?clamp((u-.55)/.45,0,1):0;
if(['roofIn','approach'].includes(q.phase)){p.x=q.phase==='roofIn'?122:122+(355-122)*u;p.walk=q.phase==='approach'?1:0;}
if(q.phase==='surprise')p.x=355;
if(q.phase==='rush'){p.x=355+(502-355)*u;p.walk=1;p.running=true;if(u>.68&&!q.knocked){q.knocked=true;g.event('pilotKnockout201');}}
if(q.phase==='knockout'){p.x=502;p.act={name:p.type==='broxton'?'broxCombo179':'combo',combo:3,t:Math.min(q.t,.22),total:1,hitAt:.12};if(p.type==='broxton')p.broxPose179={pose:2};if(p.type==='niko')p.nikoPose185={sheet:0,index:6};if(p.type==='forest')p.forestPose125={sheet:'motion',index:10};}
else{p.act=null;p.broxPose179=p.nikoPose185=p.forestPose125=null;}
if(q.phase==='board'){p.x=502+(760-502)*u;p.y=475-28*clamp((u-.62)/.38,0,1);p.walk=1;q.inside=u>.94;}
if(['startup','lift','depart'].includes(q.phase))q.inside=true;
q.rotor=q.phase==='startup'?u:['lift','depart','choice','complete'].includes(q.phase)?1:0;
q.heli.x=q.phase==='depart'?765+493*u:q.phase==='lift'?685+80*u:685;q.heli.y=q.phase==='depart'?245-165*u:q.phase==='lift'?475-230*u:475;
if(p.walk){p.walkPhase=((p.walkPhase||0)+Math.abs(p.x-p.prevX)/110)%1;p.runPhase=p.walkPhase;}
if(g.gunner125){const d=g.gunner125,tx=p.x-66;d.x+=Math.sign(tx-d.x)*Math.min(Math.abs(tx-d.x),220*dt);d.y=487;d.dir=1;d.state=p.walk?'walk':'idle';d.phase=((d.phase||0)+dt*2)%1;}
if(u>=1){const index=phases.indexOf(q.phase),next=phases[index+1];if(next){q.phase=next;q.t=0;if(next==='startup')g.event('helicopterStart201');if(next==='lift')g.event('helicopterLift201');}else if(q.phase==='depart'){award(g,q);q.phase='choice';q.t=0;q.padArmed=false;g.transitionAlpha=1;g.won=true;g.event('bankChoice201');}}}
function move(g,d){const q=g.rooftop201;if(!menu(g)||q.phase==='complete')return false;q.selected=(q.selected+(d>0?1:-1)+2)%2;return true;}
function choose(g,id=choices[g.rooftop201?.selected]?.id){const q=g.rooftop201;if(!menu(g)||!choices.some(c=>c.id===id))return false;g.nextLead201=id;q.selected=choices.findIndex(c=>c.id===id);q.phase='complete';g.playing=false;g.won=true;g.event('bankDestination201',{destination:id});return true;}
function pad(g,s){if(!menu(g))return false;const q=g.rooftop201,h=s?.held||{},d=h.right||h.down?1:h.left||h.up?-1:0;if(!s?.connected){q.padArmed=false;return true;}if(!q.padArmed){if(s.buttonsNeutral&&!d)q.padArmed=true;return true;}if(d&&d!==q.padDirection)move(g,d);q.padDirection=d;if(s.pressed?.some(k=>['jump','pause'].includes(k)))choose(g);return true;}
const clear=P.startLevelClear;P.startLevelClear=function(n,next){if(n===2&&next?.finish&&this.zone===13&&!this.uptown&&!this.rooftop201)return begin(this);return clear.call(this,n,next);};
const tick=P.tick;P.tick=function(dt,input={}){if(this.rooftop201&&!this.practice278)return advance(this,dt);return tick.call(this,dt,input);};
for(const name of['command','attackInput','directionInput']){const pre=P[name];P[name]=function(...args){if(this.rooftop201)return false;return pre.apply(this,args);};}
const reset=P.reset;P.reset=function(...args){this.rooftop201=null;return reset.apply(this,args);};
const priorScene=root.NeonScenes71.start;root.NeonScenes71.scenes.push({id:level.id,name:'Bank rooftop · helicopter escape',zone:13});root.NeonScenes71.start=function(g,id){if(id!==level.id)return priorScene(g,id);g.reset(13);begin(g,{preview:true});return true;};
N.Rooftop201=root.Rooftop201={config:C,level,phases,choices,menu,begin,roof,advance,choose,move,pad};
})(typeof window!=='undefined'?window:globalThis);
