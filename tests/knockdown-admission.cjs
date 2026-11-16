'use strict';
const A=require('node:assert/strict'),{load}=require('../tools/qa242/runtime.cjs');const{N}=load(338);
const types=['thug','knifeThug','enforcer','biker','cop','flint','sato','akari'];let checks=0;
function ok(v,m){checks++;A.ok(v,m);}
function setup(type='knifeThug',hero='reina'){
 const g=new N.Brawler();g.selectHero(hero);g.playing=true;g.ai=g.reinforce=()=>{};g.pending=[];g.props=[];g.items=[];g.enemies=[];g.encounters222Enabled=false;g.encounter222=null;
 Object.assign(g.player,{x:400,y:480,dir:1,inv:0,cd:0});const e=N.actor(type,460,480);Object.assign(e,{dir:-1,inv:0,wakeInv:0,wakeArmor:0,activeAt:0,cd:0});g.enemies=[e];if(['thug','knifeThug'].includes(type))ok(N.Street209.is(e),'native ordinary identity retained');return{g,e,p:g.player};
}
function physical(e){return JSON.stringify([e.hp,e.maxHp,e.down,e.downAge,e.downTotal,e.landed,e.stun,e.shock,e.recovering,e.standingLock,e.cd,e.inv,e.wakeInv,e.wakeArmor,e.x,e.y]);}
function deny(g,e,method,name='hook',options={}){const a=e.act,state=physical(e),hp=g.player.hp,pressure=N.Director148.pressure(g).reserved;const result=g[method](e,name,1,.3,{damage:7,reach:180,...options});ok(result===false&&e.act===a,method+'/'+name+' rejects without replacing action');ok(physical(e)===state&&g.player.hp===hp,'denial preserves HP, physics and timing');ok(N.Director148.pressure(g).reserved===pressure,'no pressure reservation consumed');}
for(const hero of ['reina','broxton','nova','forest','niko','orion','nightshade'])for(const type of types)for(const hz of[30,60,120]){
 const{g,e,p}=setup(type,hero),hp=e.hp;g.damage(e,10,1,true,{attacker:p});ok(hp-e.hp===10,'native knockdown damage unchanged');ok(e.down>0&&!e.act,'fall begins');let ticks=0,landings=0,stands=0;const phases=new Set();
 while(e.down>0||e.recovering>0||e.standingLock>0){
  phases.add(e.down>0?e.downAge<.32?'fall':e.downAge>=e.downTotal-.35?'rise':'ground':'standing-recovery');
  if(ticks%Math.max(1,Math.floor(hz/15))===0){for(const method of['start','enemyAct']){deny(g,e,method);deny(g,e,method,'hook',{counter:true});}}
  const landed=e.landed,down=e.down;g.tick(1/hz,{});if(!landed&&e.landed)landings++;if(down>0&&!e.down)stands++;ticks++;ok(!e.act,'no pending offense throughout native recovery');if(ticks>hz*5)throw Error('nonfinite recovery '+type);
 }
 ok(landings===1&&stands===1,'one landing and one stand');ok(phases.has('fall')&&phases.has('rise')&&phases.has('standing-recovery'),'native fall/rise/recovery observed');ok(!N.Knockdowns299.locked(e),'physical lock releases');
 g.start(e,'admissionProbe',1,.3,{damage:7});ok(e.act?.name==='admissionProbe','direct offense available after native locks');ok(e.act.total===1&&e.act.hitAt===.3&&e.act.damage===7,'accepted action data retained');
}
// Eligibility is physical state, independent of telemetry enrollment or a serial match.
for(const type of types)for(const receipt of['absent','stale'])for(const field of['down','recovering','standingLock']){
 const{g,e}=setup(type);e[field]=.3;e.knockdown299=receipt==='absent'?null:{serial:-1};for(const method of['start','enemyAct'])deny(g,e,method);
}
// Authored wake actions are rejected before recovery and accepted through their native controllers afterward.
for(const[type,name]of[['sato','saitoKipUp'],['akari','akariWakeSweep'],['cop','wakeSweep']]){
 const{g,e,p}=setup(type);g.knockDown(e,1,1.45);deny(g,e,'start',name);deny(g,e,'enemyAct',name);while(e.down||e.recovering>0||e.standingLock>0)g.tick(1/60,{});
 e.x=p.x+60;e.y=p.y;e.dir=-1;while(g.time<(e.wakeSweepReadyAt||0))g.tick(1/60,{});g.enemyAct(e,name,1,.3);ok(e.act?.name===name,'native legal wake action '+name);
}
// A queued action during falling must never produce later damage in the punish window.
for(const type of['knifeThug','biker','cop','flint','sato','akari']){const{g,e,p}=setup(type);g.damage(e,10,1,true,{attacker:p});const hp=p.hp;deny(g,e,'start');for(let i=0;i<240;i++)g.tick(1/60,{});ok(p.hp===hp&&!e.act,'no pending-action recovery damage '+type);}
// Keep the prior nonoffensive utility and hero policies; this is an offensive admission repair.
{const{g,e}=setup();g.knockDown(e,1,1.45);g.start(e,'idle',1,999);ok(e.act?.name==='idle','existing utility policy retained');}
{const{g,p}=setup();p.down=1;p.recovering=.4;p.standingLock=1;g.start(p,'admissionProbe',1,.3);ok(p.act?.name==='admissionProbe','player starts retain existing exemption');}
// Preserve captured/counter continuations, rather than bypassing locks via counter:true alone.
for(const field of['hold','heldBy','pairVisual','grappleSession119','forestLock125','leg286','reverse285','niko283','legGround286','reverseGround285','nikoGround283','grounded114','ddtLock116','hipLock118','spearGround137','faceSmash91','hookVictim272','grappleZ','grappleAngle']){
 const{g,e,p}=setup('enforcer');e.recovering=.3;e.standingLock=.4;e[field]=field==='heldBy'?p:field==='hold'?{victim:p,age:0,strikes:0}:field==='grappleSession119'?{active:true,attacker:p,victim:e,action:p.act={name:'pairedProbe',t:0,total:1,hitAt:999}}:field==='grappleZ'||field==='grappleAngle'?1:{};
 ok(!N.Knockdowns299.locked(e),'synchronized exception preserved '+field);
}
console.log('PASS knockdown/recovery admission',checks,'checks: 7 heroes, 8 native families, 30/60/120Hz, both paths, receipt independence, wake actions, pending hits and paired exceptions');
