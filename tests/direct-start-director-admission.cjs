'use strict';
const A=require('node:assert/strict'),{load}=require('../tools/qa242/runtime.cjs');let checks=0;
const ok=(v,m)=>{checks++;A.ok(v,m)},eq=(x,y,m)=>{checks++;A.deepEqual(x,y,m)};
function setup(types=['thug','thug','thug'],hero='reina'){
 const rt=load(338),{N}=rt,g=new N.Brawler();g.selectHero(hero);g.playing=true;g.ai=g.reinforce=g.reinforceFinancial=()=>{};g.encounters222Enabled=false;g.encounter222=null;g.pending=[];g.props=[];g.items=[];g.camera=300;
 Object.assign(g.player,{x:600,y:475,dir:1,inv:0,cd:0});g.enemies=types.map((t,i)=>{const e=N.actor(t,650+i*95,475);Object.assign(e,{activeAt:0,cd:0,inv:0,wakeInv:0,standingLock:0,recovering:0,dir:-1});return e;});
 const requests=[],request=N.Director148.request;N.Director148.request=function(...args){requests.push({enemy:args[1],name:args[2]});return request.apply(this,args)};return{...rt,g,p:g.player,e:g.enemies[0],D:N.Director148,requests};
}
function light(g,e,i=0,path='start',opts={}){return g[path](e,'kick',1.8,.3+i*.5,{damage:5,reach:110,...opts});}
for(const path of ['start','enemyAct'])for(const type of ['thug','knifeThug','enforcer','biker','cop','flint','sato','akari'])for(const hz of [30,60,120]){
 const{g,D,requests}=setup([type,type,type]);for(let i=0;i<2;i++){light(g,g.enemies[i],i,path);ok(!!g.enemies[i].act,'eligible light admitted');}
 const e=g.enemies[2],before={dir:e.dir,cd:e.cd,hp:e.hp},r=light(g,e,2,path);eq(r,false,'third light rejected '+type+path);ok(!e.act,'rejected action absent');eq({dir:e.dir,cd:e.cd,hp:e.hp},before,'no rejected actor mutation');eq(D.pressure(g).rows.length,2,'two commitment cap');eq(requests.length,3,'one request per attempted light');const hp=g.player.hp;
 for(let i=0;i<hz/4;i++)g.tick(1/hz,{});eq(g.player.hp,hp,'no early ghost damage');ok(!e.act,'no delayed rejected action');
}
for(const path of ['start','enemyAct']){
 const{g,D}=setup(['enforcer','enforcer']);g[path](g.enemies[0],'oneTwo',1.5,.3,{enemies210:true,damage:10,reach:130});const e=g.enemies[1];eq(g[path](e,'oneTwo',1.5,.9,{enemies210:true,damage:10,reach:130}),false,'four-point pair refused');eq(D.pressure(g).reserved,2,'three point ceiling');
}
// A successful direct request preserves the caller's action data and creates one reservation.
{const{g,e,D,requests}=setup(['thug']);light(g,e);eq([e.act.name,e.act.total,e.act.hitAt,e.act.damage,e.act.reach],['kick',1.8,.3,5,110],'approved data untouched');eq(D.pressure(g).rows.length,1,'one reservation');eq(requests.length,1,'one direct request');}
// Other Director policies are shared rather than reimplemented.
for(const scenario of ['cooldown','player-lock','response','projectile','relief','overlap','rear']){
 const{g,e,p,N,D}=setup(['thug','thug']);let target=e;
 if(scenario==='cooldown')e.cd=.2;if(scenario==='player-lock')p.stun=.2;if(scenario==='response')N.Audit135.init(g).responseAt=1;
 if(scenario==='projectile'){light(g,e);e.act=null;g.projectiles=[{owner:e,life:1}];}
 if(['relief','overlap','rear'].includes(scenario)){light(g,e);target=g.enemies[1];if(scenario==='relief')D.init(g).reliefUntil=2;if(scenario==='rear')target.x=550;}
 eq(light(g,target,scenario==='overlap'?0:1),false,'Director policy retained '+scenario);ok(!target.act||target===e,'no action for rejected fresh target '+scenario);
}
{const{g,e}=setup(['robber','thug']);g.enemies[1].x=625;g.enemies[1].y=e.y;eq(g.start(e,'gunFire',1.5,.7,{aimY:e.y,maxShots:1}),false,'ally firing lane applies to direct start');ok(!e.act,'no blocked shot');}
// Utilities, hero actions and Director-disabled mode retain their existing policy.
for(const name of ['idle','reload','martialBlock']){const{g,e,requests}=setup(['thug']);g.start(e,name,1,999);ok(e.act?.name===name,'utility retained');eq(requests.length,0,'no utility policy request');}
{const{g,p,requests}=setup();g.start(p,'heroProbe',1,.3);ok(p.act?.name==='heroProbe','hero unchanged');eq(requests.length,0,'no enemy request for hero');}
{const{g,D}=setup();g.director135=false;g.enemies.forEach((e,i)=>light(g,e,i));ok(g.enemies.every(e=>e.act),'disabled Director leaves starts available');eq(D.pressure(g).rows.length,0,'disabled Director no reservations');}
// A counter flag alone is not an exception for a new unpaired enemy commitment.
{const{g}=setup();light(g,g.enemies[0]);light(g,g.enemies[1],1);eq(light(g,g.enemies[2],2,'start',{counter:true}),false,'unpaired counter flag cannot bypass budget');}
// Genuine captured continuations preserve their preexisting admission exemption and reservation transfer.
for(const name of ['powerBomb','taser','martialPunchCounter212','workerThrow233','securitySlam216','gusThrowSlam219','throwReversal198']){
 const{g,e,p,D,requests}=setup(['enforcer']);g.enemyAct(e,'clinch',1,.3);const weight=D.pressure(g).reserved;p.heldBy=e;e.hold={victim:p,age:0,strikes:0,instant:true};e.act=null;const n=requests.length;
 g.start(e,name,1,.5,{damage:20,victim:p});ok(e.act?.name===name,'captured continuation '+name);eq(requests.length,n,'no new paired admission '+name);eq(D.pressure(g).reserved,weight,'paired reservation transfer '+name);
}
// Wake paths already request admission in Grab223. A scoped receipt prevents a duplicate evaluation.
for(const path of ['start','enemyAct'])for(const[type,name]of [['sato','saitoKipUp'],['akari','akariWakeSweep'],['cop','wakeSweep']]){
 const{g,e,N,requests}=setup([type]);e.x=660;const w=require('../tools/direct-admission/wake-fixture.cjs').wake(N,e,name);g[path](e,name,w.total,w.at,w.options);ok(e.act?.name===name,'legal wake action retained '+path+name);eq(requests.length,1,'wake policy evaluated once '+path+name);ok(!Object.hasOwn(g,'directorAdmission148'),'wake context removed');
}
// Context restoration must survive rejection and exceptions, and cannot authorize a different actor.
{const{g,e,N}=setup(['cop']);const previous={sentinel:true};g.directorAdmission148=previous;g.start(e,'wakeSweep',1,.3);eq(g.directorAdmission148,previous,'previous admission context restored');}
{const{g,e}=setup(['cop']);Object.defineProperty(e,'act',{configurable:true,get:()=>null,set(){ok(g.directorAdmission148?.enemy===e,'exception occurs inside scoped wake admission');throw Error('forced action setter');}});A.throws(()=>g.start(e,'wakeSweep',1,.3),/forced action setter/);checks++;ok(!Object.hasOwn(g,'directorAdmission148'),'context cleared after inner exception');}
for(const mismatch of ['actor','options']){
 const{g,requests}=setup();light(g,g.enemies[0]);light(g,g.enemies[1],1);const e=g.enemies[2],o={damage:5,reach:110};g.directorAdmission148={enemy:mismatch==='actor'?g.enemies[0]:e,name:'kick',total:1.8,at:1.3,options:mismatch==='options'?{...o}:o};const n=requests.length;
 eq(g.start(e,'kick',1.8,1.3,o),false,'different '+mismatch+' cannot reuse scoped admission');eq(requests.length,n+1,'different context still requests');ok(!e.act,'no action under unrelated context');
}
for(const path of ['start','enemyAct']){const{g,e,p,requests}=setup(['enforcer']);p.jump=.2;g[path](e,'uppercut',1,.35,{antiAir:true,reach:145});eq(requests.length,1,'anti-air decision only requested once '+path);}
console.log('PASS direct-start Director admission '+checks+' checks; both paths, eight families, 3 rates, caps/policies, single requests, utilities and paired/wake exceptions');
