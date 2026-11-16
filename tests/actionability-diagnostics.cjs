'use strict';
const A=require('node:assert/strict'),{load}=require('../tools/qa242/runtime.cjs');
const{N}=load(338),C=N.Continuity296,types=['thug','knifeThug','enforcer','biker','cop','flint','sato','akari'];let checks=0;
function ok(v,m){checks++;A.ok(v,m);}
function setup(type,hero='reina'){const g=new N.Brawler();g.selectHero(hero);g.playing=true;g.ai=g.reinforce=()=>{};g.pending=[];g.props=[];g.items=[];g.enemies=[];g.encounters222Enabled=false;g.encounter222=null;Object.assign(g.player,{x:400,y:480,dir:1,inv:0,cd:0});const e=N.actor(type,460,480);Object.assign(e,{dir:-1,inv:0,wakeInv:0,wakeArmor:0,activeAt:0,cd:0});g.enemies=[e];if(['thug','knifeThug'].includes(type))ok(N.Street209.is(e),'native identity retained');return{g,e,p:g.player};}
// Regression: a real clean heavy reaction leaves an enforced post-stun interval for every family.
for(const hero of ['reina','niko'])for(const type of types)for(const hz of [30,60,120]){
 const{g,e,p}=setup(type,hero);g.damage(e,4,1,false,{attacker:p,reaction274:'heavy'});let samples=0;
 for(let frame=0;frame<hz*2;frame++){
  const before=JSON.stringify(e),q=C.resolve(e,g.time);ok(JSON.stringify(e)===before,'resolver never mutates actor');
  if(e.stun>1e-7)ok(!q.actionable&&q.state==='hitstun','physical hitstun still projected');
  if(!e.stun&&g.time<(e.reassessUntil274||0)){
   samples++;ok(!q.actionable,'post-stun reassessment is not reported actionable');ok(q.actionable===q.offensiveReady,'legacy actionable alias is explicit offensive readiness');ok(q.nativeStateActionable&&!q.offensiveReady,'native-state freedom is separate from offensive readiness');
   ok(q.state==='idle'||q.state==='walk'||q.state==='run','reassessment does not replace locomotion presentation');
   const lock=q.offensiveLocks.find(x=>x.field==='reassessUntil274');ok(lock&&lock.seconds===e.reassessUntil274-g.time,'effective actor deadline, not stale descriptor');
   for(const path of ['start','enemyAct'])ok(g[path](e,'diagnosticProbe',1,.3,{damage:7})===false&&!e.act,'reported deadline agrees with both offensive entry paths');
  }
  if(!e.stun&&!e.shock&&g.time>=(e.reassessUntil274||0)&&e.cd<=0){ok(q.offensiveReady,'ready after actual common locks expire');g.start(e,'diagnosticProbe',1,.3,{damage:7});ok(e.act?.name==='diagnosticProbe','offense resumes without retiming');break;}
  g.tick(1/hz,{});
 }
 ok(samples>0,'tested actual post-stun interval');
}
// Exact deadlines use the guard's time comparison, not the physical-lock EPS tolerance.
for(const type of types){const{g,e}=setup(type);Object.assign(e,{stun:0,shock:0,cd:0,act:null,down:0,recovering:0,standingLock:0,reassessUntil274:2,walk:1});
 for(const t of [2-1e-8,2,2+1e-8]){const q=C.resolve(e,t);ok(q.offensiveReady===(t>=2),'exact reassessment boundary');ok(q.state==='walk'&&q.owner==='native locomotion'&&!q.locks.length,'offensive restriction never changes presentation locks');}
 for(const cd of [0,1e-8,.5]){e.cd=cd;const q=C.resolve(e,3);ok(q.nativeStateActionable&&q.offensiveReady===(cd<=0),'native cooldown readiness, including tiny positive values');ok(q.offensiveLocks.some(x=>x.field==='cd')===(cd>0),'cooldown diagnosed separately');}
 e.cd=.2;const before=JSON.stringify(e);for(let i=0;i<5;i++)C.resolve(e,1);ok(JSON.stringify(e)===before,'repeated diagnostics preserve all actor data');
 // Shared Director admission now enforces its existing cooldown policy at direct starts; diagnostics stay read-only.
 g.time=3;ok(g.start(e,'diagnosticProbe',1,.3,{damage:7})===false&&!e.act,'shared Director rejects direct start during cooldown');ok(e.cd===.2&&e.denied135?.reason==='individual state / recovery','rejection preserves cooldown and exposes actual policy');
}
// Preserve physical projections, player reassessment exemption and synchronized continuation policy.
for(const field of ['stun','shock','down','recovering','standingLock','wakeInv','guardBreak']){const{e}=setup('enforcer');e[field]=.2;const q=C.resolve(e,0);ok(!q.nativeStateActionable&&!q.offensiveReady,'native physical assessment retained '+field);ok(q.locks.some(x=>x.field===field),'physical lock list retained '+field);}
for(const hero of Object.keys(N.HEROES)){const{p}=setup('thug',hero);p.reassessUntil274=100;const q=C.resolve(p,0);ok(q.offensiveReady&&!q.offensiveLocks.some(x=>x.field==='reassessUntil274'),'player has no enemy reassessment lock');}
const pairedFields=['heldBy','hold','pairVisual','grappleSession119','forestLock125','leg286','reverse285','niko283','legGround286','reverseGround285','nikoGround283','grounded114','ddtLock116','hipLock118','spearGround137','faceSmash91','hookVictim272','grappleZ','grappleAngle'];
for(const field of pairedFields){const{g,e,p}=setup('enforcer');e[field]=field==='heldBy'?p:field==='hold'?{victim:p}:field==='grappleSession119'?{active:true,attacker:p,victim:e}:field==='grappleZ'||field==='grappleAngle'?1:{};const q=C.resolve(e,g.time);ok(q.state==='synchronized'&&!q.nativeStateActionable&&!q.offensiveReady,'neutral readiness never claims synchronized continuation '+field);}
console.log('PASS actionability diagnostics',checks,'checks; 2 heroes x8 native families x3 rates; actual deadlines, cooldown boundaries, read-only state, presentation, players and paired states');
