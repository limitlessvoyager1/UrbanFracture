'use strict';
const A=require('node:assert/strict'),{load}=require('../tools/qa242/runtime.cjs');
const{N}=load(338),types=['thug','knifeThug','enforcer','biker','cop','flint','sato','akari'];let checks=0;
function ok(v,m){checks++;A.ok(v,m);}
function setup(type='thug',hero='reina'){
 const g=new N.Brawler();g.selectHero(hero);g.playing=true;g.ai=g.reinforce=()=>{};g.pending=[];g.props=[];g.items=[];g.enemies=[];g.encounters222Enabled=false;g.encounter222=null;
 Object.assign(g.player,{x:400,y:480,dir:1,inv:0,cd:0});const e=N.actor(type,460,480);Object.assign(e,{dir:-1,inv:0,wakeInv:0,wakeArmor:0,activeAt:0,cd:0});g.enemies=[e];
 if(['thug','knifeThug'].includes(type))ok(N.Street209.is(e),'fixture preserves native ordinary identity');
 return{g,e,p:g.player};
}
function timers(e){return JSON.stringify([e.hp,e.maxHp,e.stun,e.shock,e.cd,e.inv,e.recovering,e.standingLock,e.reassessUntil274,e.x,e.y]);}
function denied(g,e,path,name,hitAt){
 const before=timers(e),a=e.act,hp=g.player.hp,pressure=N.Director148.pressure(g).reserved,events=N.Audit135.init(g).events.filter(q=>q.type==='stunDenied298').length;
 const result=g[path](e,name,1,hitAt,{damage:7});
 ok(result===false&&e.act===a,path+'/'+name+' rejects without replacing the action');
 ok(timers(e)===before&&g.player.hp===hp,'denial preserves HP, clocks and positions');
 ok(N.Director148.pressure(g).reserved===pressure,'denial consumes no pressure reservation');
 ok(N.Audit135.init(g).events.filter(q=>q.type==='stunDenied298').length===events+1,'one native denial diagnostic');
}
for(const hero of ['reina','broxton','nova','forest','niko','orion','nightshade'])for(const type of types)for(const hz of [30,60,120])for(const force of [false,true]){
 const{g,e,p}=setup(type,hero),hp=e.hp;g.damage(e,4,1,false,{attacker:p,...(force?{force:true}:{})});
 ok(hp-e.hp===4,'native damage preserved');ok(e.stun>0&&N.HitReactions298.locked(e),'mandatory state locks with or without a clean-hit receipt');
 if(force)ok(!e.hitReaction298,'forced-damage fixture genuinely has no reaction receipt');
 const duration=e.stun;let ticks=0,mid=false;
 while(N.HitReactions298.remaining(e)>1e-7&&ticks<hz*2){
  if(ticks===0||!mid&&e.stun<=duration/2){if(ticks)mid=true;for(const path of ['enemyAct','start'])for(const[name,at]of [['hook',.3],['idle',999],['guardRaise210',999]])denied(g,e,path,name,at);}
  g.tick(1/hz,{});ticks++;
 }
 ok(ticks<hz*2,'native timers expire without a repair-imposed extension');
 if(e.stun>0||e.shock>0)g.tick(1/hz,{}); // Native controllers also require exact zero, not just EPS.
 ok(!e.stun&&!e.shock&&!N.HitReactions298.locked(e),'lock releases with native state');
 g.start(e,'idle',1,999);ok(e.act?.name==='idle','nonoffensive start remains available after hitstun');e.act=null;
 while(g.time<(e.reassessUntil274||0)+1e-7)g.tick(1/hz,{});
 g.start(e,'eligibilityProbe',1,.3,{damage:7});ok(e.act?.name==='eligibilityProbe','offense remains available after the existing reassessment deadline');
 ok(e.act.total===1&&e.act.hitAt===.3&&e.act.damage===7,'accepted action data is not retuned');
}
// Shock-only state and stale/absent telemetry must not reopen either transition path.
for(const type of types)for(const marker of [null,'armor','clean-no-stagger']){const{g,e}=setup(type);N.Enemies210.shock(g,e,.3);e.stun=0;e.hitReaction298=marker?{outcome:marker}:null;for(const path of ['enemyAct','start'])for(const[name,at]of [['hook',.3],['idle',999]])denied(g,e,path,name,at);}
// Boundary semantics retain the existing EPS tolerance; no timer/frame values change.
for(const remaining of [0,1e-8,1e-7,1.00001e-7]){const{g,e}=setup();e.stun=remaining;ok(N.HitReactions298.locked(e)===(remaining>1e-7),'native EPS boundary retained');}
// Preserve the exact synchronized-state exception set, including non-hold choreography.
const fields=['heldBy','hold','pairVisual','grappleSession119','forestLock125','leg286','reverse285','niko283','legGround286','reverseGround285','nikoGround283','grounded114','ddtLock116','hipLock118','spearGround137','faceSmash91','hookVictim272','grappleZ','grappleAngle'];
for(const field of fields)for(const path of ['enemyAct','start']){
 const{g,e,p}=setup('enforcer');e.stun=.3;e.hitReaction298={outcome:'clean'};
 e[field]=field==='heldBy'?p:field==='hold'?{victim:p,age:0,strikes:0}:field==='grappleSession119'?{active:true,attacker:p,victim:e,action:p.act={name:'pairedProbe',t:0,total:1,hitAt:999}}:field==='grappleZ'||field==='grappleAngle'?1:{};
 ok(!N.HitReactions298.locked(e),'preserved synchronized exception '+field);
 const before=N.Audit135.init(g).events.filter(q=>q.type==='stunDenied298').length;g[path](e,'eligibilityProbe',1,.3,{damage:7});
 ok(N.Audit135.init(g).events.filter(q=>q.type==='stunDenied298').length===before,path+' does not add a hitstun denial to '+field+' continuation');
}
// Enemy-only eligibility must not change player action creation.
{const{g,p}=setup();p.stun=.3;g.start(p,'idle',1,999);ok(p.act?.name==='idle','player starts retain existing behavior');}
console.log('PASS hitstun eligibility',checks,'checks; 7 heroes, 8 native enemy families, ordinary/forced hits, 30/60/120Hz, offensive/nonoffensive starts, shock, EPS and synchronized exceptions');
