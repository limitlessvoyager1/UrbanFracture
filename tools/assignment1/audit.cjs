'use strict';
// Read-only runtime probes. No production prototype is replaced by this audit.
const fs=require('node:fs'),A=require('node:assert/strict'),{load}=require('../qa242/runtime.cjs');
const rt=load(338),{N}=rt,types=['thug','knifeThug','enforcer','biker','cop','flint','sato','akari'];
let checks=0;const ok=(v,m)=>{checks++;A.ok(v,m);};
function setup(type,hero){const g=new N.Brawler();g.selectHero(hero);g.playing=true;g.ai=g.reinforce=()=>{};g.pending=[];g.props=[];g.items=[];g.enemies=[];g.encounters222Enabled=false;g.encounter222=null;Object.assign(g.player,{x:400,y:480,dir:1,inv:0,cd:0});const e=N.actor(type,460,480);Object.assign(e,{dir:-1,inv:0,wakeInv:0,wakeArmor:0,activeAt:0,cd:0});g.enemies=[e];if(['thug','knifeThug'].includes(type))ok(N.Street209.is(e),'native identity');return{g,e,p:g.player};}
function snap(g,e){return{time:g.time,hp:e.hp,maxHp:e.maxHp,stun:e.stun,shock:e.shock,down:e.down,flight:!!e.flight,recovering:e.recovering,standingLock:e.standingLock,action:e.act?.name||null,deadline:e.reassessUntil274,reaction:e.reaction274?{...e.reaction274}:null,outcome:e.hitReaction298?.outcome,projection:N.Continuity296.resolve(e,g.time)};}
const matrix=[],projection=[];
for(const hero of ['reina','niko'])for(const type of types)for(const kind of ['light','medium','heavy']){
 const{g,e,p}=setup(type,hero),hp=e.hp;const old=e.act={name:'auditVulnerable',t:.01,total:1,hitAt:.35,damage:7,reach:180};
 g.damage(e,4,1,false,{attacker:p,reaction274:kind});const hit=snap(g,e);
 ok(hp-e.hp===4,'one damage application');ok(!e.act&&e.stun>0&&e.hitReaction298.outcome==='clean','vulnerable interrupt');ok(e.reaction274.kind===kind,'category');
 const php=p.hp;g.enemyHit(e,old);g.advanceHeroAction(e,old,1/60);ok(p.hp===php,'stale callbacks invalidated');
 let released=null,ready=null,firstProjection=null;
 for(let f=0;f<150;f++){
  const physical=Math.max(e.stun||0,e.shock||0)>1e-7,post=g.time<(e.reassessUntil274||0);
  if(!physical&&released===null)released=g.time;
  if(!physical&&post&&N.Continuity296.resolve(e,g.time).actionable&&!firstProjection)firstProjection=snap(g,e);
  if(physical||post)for(const path of ['start','enemyAct'])ok(g[path](e,'auditOffense',1,.3,{damage:7})===false&&!e.act,'both entry paths locked');
  else{g.start(e,'auditOffense',1,.3,{damage:7});ok(e.act?.name==='auditOffense','admission restored');ready=g.time;break;}
  g.tick(1/60,{});
 }
 ok(ready!==null,'finite release');if(firstProjection)projection.push({hero,type,kind,...firstProjection});
 matrix.push({hero,type,kind,hit,released,ready,descriptorBehindStun:hit.reaction.reassessUntil<hit.reaction.until-1e-7,descriptorDiffersFromEnforced:Math.abs(hit.reaction.reassessUntil-hit.deadline)>1e-7});
}
// Real native action generators and contact/geometry, distinct from category injection above.
const native=[];
for(const hero of ['reina','niko'])for(const type of types)for(const move of ['opener','charged']){
 const{g,e,p}=setup(type,hero),hp=e.hp;if(hero==='reina'&&move==='charged')e.x=540;
 if(move==='opener')g.command('attack',{});else if(hero==='reina')N.Tornado130.begin(g);else N.Niko185.beginPalms(g);
 ok(!!p.act,'native action begins');const action={name:p.act.name,total:p.act.total,hitAt:p.act.hitAt,kind185:p.act.kind185};let first=null;
 for(let f=0;f<180;f++){g.tick(1/60,{});if(e.hp<hp&&!first)first=snap(g,e);}
 ok(!!first,'real contact occurs '+hero+'/'+type+'/'+move);native.push({hero,type,move,action,damage:hp-e.hp,first,final:snap(g,e)});
}
// Native controller sampling: full AI restored, ordinary hit then observe first commitment.
const ai=[];
for(const hero of ['reina','niko'])for(const type of types){const{g,e,p}=setup(type,hero);delete g.ai;g.damage(e,4,1,false,{attacker:p});const deadline=e.reassessUntil274;let first=null;for(let f=0;f<600;f++){g.tick(1/60,{});if(e.act&&N.Director148.isThreat(e.act.name,e.act)){first={time:g.time,name:e.act.name,stun:e.stun,down:e.down,recovering:e.recovering,standingLock:e.standingLock};ok(g.time>=deadline-1e-7&&!e.stun&&!e.down&&!e.recovering&&!e.standingLock,'AI respects mandatory states');break;}}ai.push({hero,type,deadline,first,observed:!!first});}
const result={scope:'Assignment1 read-only audit. 48 category-controlled damage-entry cases, 32 real native opener/charged-action cases,16 seeded native AI observations. Category fixtures are not a complete physical move catalog.',checks,simulationFiles:rt.files.length,loadHash:rt.loadHash,owners:rt.owners,matrix,native,ai,projection,summary:{categoryCases:matrix.length,nativeCases:native.length,aiObserved:ai.filter(x=>x.observed).length,descriptorMismatchCases:matrix.filter(x=>x.descriptorDiffersFromEnforced).length,descriptorBehindStunCases:matrix.filter(x=>x.descriptorBehindStun).length,actionabilityMismatchCases:projection.length}};
fs.mkdirSync('reports-assignment1',{recursive:true});fs.writeFileSync('reports-assignment1/audit.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({checks,files:rt.files.length,owners:Object.fromEntries(['damage','start','enemyAct','ai','tick','knockDown','advanceDown'].map(k=>[k,rt.owners[k]?.length])),...result.summary}));
