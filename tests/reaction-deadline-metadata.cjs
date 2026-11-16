'use strict';
const A=require('node:assert/strict'),{load}=require('../tools/qa242/runtime.cjs');const{N}=load(338);let checks=0;
function ok(v,m){checks++;A.ok(v,m);}
function setup(type='thug',hero='reina'){const g=new N.Brawler();g.selectHero(hero);g.playing=true;g.ai=g.reinforce=()=>{};g.pending=[];g.props=[];g.items=[];g.enemies=[];g.encounters222Enabled=false;g.encounter222=null;Object.assign(g.player,{x:400,y:480,dir:1,inv:0,cd:0});const e=N.actor(type,460,480);Object.assign(e,{dir:-1,inv:0,wakeInv:0,wakeArmor:0,activeAt:0,cd:0});g.enemies=[e];return{g,e,p:g.player};}
for(const hero of Object.keys(N.HEROES))for(const type of ['thug','knifeThug'])for(const kind of ['light','medium','heavy'])for(const hz of [30,60,120])for(const previous of [0,3.25]){
 const{g,e,p}=setup(type,hero);ok(N.Street209.is(e),'native identity');g.time=2;e.reassessUntil274=previous;const hp=e.hp;
 g.damage(e,4,1,false,{attacker:p,reaction274:kind});const expected=Math.max(previous,2+Math.max(.28,kind==='heavy'?.4:0)+({light:6,medium:8,heavy:10}[kind]/60),2.5);
 ok(e.reaction274.reassessUntil===e.reassessUntil274,'ordinary metadata mirrors effective enforced deadline');
 ok(e.reassessUntil274===expected,'actual deadline formula unchanged; no added post-floor frames');
 ok(e.stun===.5&&e.reaction274.duration===.5&&e.reaction274.until===2.5,'approved half-second stun and metadata unchanged');ok(hp-e.hp===4&&e.reaction274.damage===4,'damage unchanged');
 const q=e.reaction274;let released=false;
 for(let f=0;f<hz*2;f++){
  ok(q.reassessUntil===expected&&e.reassessUntil274===expected,'no metadata/clock drift during expiry');
  if(e.stun>1e-7||g.time<expected){for(const path of ['start','enemyAct'])ok(g[path](e,'deadlineProbe',1,.3,{damage:7})===false&&!e.act,'actual existing offensive guards retained');}
  else{g.start(e,'deadlineProbe',1,.3,{damage:7});ok(e.act?.name==='deadlineProbe','native admission restores at existing expiry');released=true;break;}
  g.tick(1/hz,{});
 }
 ok(released,'finite native expiry');
}
// Later hits preserve the longer actual actor deadline rather than a shorter per-hit value.
for(const type of ['thug','knifeThug']){const{g,e,p}=setup(type);e.reassessUntil274=1.5;g.damage(e,4,1,false,{attacker:p,reaction274:'heavy'});g.time=.2;e.inv=0;const hp=e.hp;g.damage(e,4,1,false,{attacker:p,reaction274:'light'});ok(e.hp===hp-4&&e.reassessUntil274===1.5&&e.reaction274.reassessUntil===1.5,'repeated light hit retains earlier longer deadline');}
// Existing exclusions must leave old receipts alone, including force/grab/status damage and failed hits.
for(const type of ['thug','knifeThug'])for(const mode of ['force','grab','status','invulnerable']){const{g,e,p}=setup(type),receipt=e.reaction274={kind:'medium',result:'clean',duration:.77,until:123,reassessUntil:456},before=JSON.stringify(receipt);e.reassessUntil274=2;const o={attacker:p,...(mode==='force'?{force:true}:mode==='grab'?{grab:true}:mode==='status'?{statusTick257:true}:{})};if(mode==='invulnerable')e.inv=1;g.damage(e,4,1,false,o);ok(e.reaction274===receipt&&JSON.stringify(receipt)===before,'excluded receipt untouched '+mode);}
// No ordinary-floor metadata rule is introduced for other enemy families or knockdowns.
for(const type of ['enforcer','biker','cop','flint','sato','akari']){const{g,e,p}=setup(type);e.reassessUntil274=2;g.damage(e,4,1,false,{attacker:p,reaction274:'light'});ok(e.reaction274.reassessUntil===.38&&e.reassessUntil274===2,'nonordinary per-hit receipt policy unchanged '+type);}
for(const type of ['thug','knifeThug']){const{g,e,p}=setup(type);g.damage(e,4,1,true,{attacker:p});ok(e.down>0&&e.reaction274.result==='knockdown'&&!('reassessUntil'in e.reaction274),'knockdown receipt policy unchanged');}
console.log('PASS reaction deadline metadata',checks,'checks; 7 heroes, 2 native ordinary families, 3 categories, 3 rates, prior deadlines, repeat hits and exclusions');
