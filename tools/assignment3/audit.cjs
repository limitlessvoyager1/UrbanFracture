'use strict';
const fs=require('node:fs'),A=require('node:assert/strict'),{load}=require('../qa242/runtime.cjs'),G=require('../grapples301/fixture.cjs');
let checks=0;const ok=(v,m)=>{checks++;A.ok(v,m);},rows=[],natural=[],grapples=[];
function setup(N,types,hero='reina'){const g=new N.Brawler();g.selectHero(hero);g.encounters222Enabled=false;g.pending=[];g.props=[];g.items=[];g.reinforce=g.reinforceFinancial=()=>{};g.player.x=600;g.player.y=475;g.player.inv=0;g.camera=300;g.enemies=types.map((type,i)=>{const e=N.actor(type,660+i*95,475+i*4);Object.assign(e,{activeAt:0,dir:-1,cd:0,inv:0,wakeInv:0,standingLock:0,recovering:0});return e;});return g;}
// Controlled admission probes: identical clean native actors, no injected recovery/damage/timelines.
for(const path of ['enemyAct','start'])for(const type of ['thug','knifeThug','enforcer','biker','cop','flint','sato','akari']){
 const {N}=load(303),g=setup(N,[type,type,type]);g.ai=()=>{};const D=N.Director148;
 // Generic shared light action deliberately isolates shared API admission from specialized move adapters.
 for(const [i,e] of g.enemies.entries()){const before=e.act;g[path](e,'kick',1.8,.3+i*.5,{damage:5,reach:110});const q=D.pressure(g);rows.push({path,type,index:i,started:e.act!==before,points:q.reserved,commitments:q.rows.length,reason:e.denied135?.reason||null});}
 const q=D.pressure(g);ok(path==='start'?q.rows.length===3:q.rows.length<=2,'observed admission split '+path+type);
}
// Real native AI selection, unmodified action times and native HP. Snapshot every actual registration.
for(const hero of ['reina','niko'])for(const hz of [30,60,120])for(const types of [['thug','knifeThug','enforcer'],['biker','cop','flint'],['sato','akari','enforcer'],['flint','robber','sato'],['talon','jaguar','biker']]){
 const {N}=load(303+hz),g=setup(N,types,hero);ok(g.enemies.map(e=>e.type).join(',')===types.join(','),'native group initialized');Object.assign(g.player,{x:600,y:475,inv:0});const D=N.Director148,register=D.register,violations=[],starts=[];let maxPoints=0,maxCommit=0,ticks=0;
 D.register=function(world,e,a){const held=world.player.heldBy===e||e.hold?.victim===world.player;const out=register(world,e,a),q=D.pressure(world);maxPoints=Math.max(maxPoints,q.reserved);maxCommit=Math.max(maxCommit,q.rows.length);starts.push({at:g.time,type:e.type,attack:a.name,held,points:q.reserved,commitments:q.rows.length});if(q.reserved>3+1e-7||q.rows.length>2)violations.push(starts.at(-1));return out;};
 for(let f=0;f<hz*12&&g.player.hp>0;f++){g.tick(1/hz,{});ticks++;for(const e of [g.player,...g.enemies])ok(Number.isFinite(e.x)&&Number.isFinite(e.y),'finite native AI');}
 natural.push({hero,hz,types,ticks,elapsed:g.time,playerHp:g.player.hp,maxPoints,maxCommit,violations,starts});
}
// Retained shared authored pair fixtures. No historical-proof claims; audit behavior independently.
for(const move of ['german','reap','powerbomb'])for(const type of move==='powerbomb'?['enforcer']:['thug','enforcer'])for(const dir of [-1,1])for(const hz of [30,60,120]){
 const {N}=G.runtime(301),{g,p,e,owner,v,a}=G.fixture(N,move,type,dir,470,hz);ok(!!a?.grapple301,'native paired action exists');let last=v.hp,hits=0,ticks=0,maxGap=0;
 while(owner.act===a&&ticks++<hz*4){g.tick(1/hz,{});if(v.hp<last){hits++;last=v.hp;}if(owner.act===a){const s=owner.grapplePose301;ok(!!s&&s===v.grapplePose301,'same paired descriptor');ok(Math.abs(s.frame-a.t*60)<1e-6,'native shared clock');}ok(p.y===470&&e.y===470,'pair logical lane');maxGap=Math.max(maxGap,Math.abs(p.y-e.y));}
 ok(ticks<hz*4,'pair completes');ok(!p.hold&&!e.hold&&!v.heldBy,'pair ownership clears');ok(hits===(move==='reap'?2:1),'native contact count');
 grapples.push({move,type,dir,hz,hits,damage:v.maxHp-v.hp,maxGap,total:a.total,release:!v.heldBy});
}
const result={baseline:'a73c51ac83f30d8b4bb2d3d553ea4a7eea5ee6b0',checks,admission:rows,natural,grapples,limitations:['Shared API probes are deliberate calls, not natural-selection frequency.','Natural traces are bounded passive-player samples with native HP; no exhaustive encounter certification.','Grapple fixtures retain authored setup; no rendered synchronization claim.']};fs.mkdirSync('reports-assignment3',{recursive:true});fs.writeFileSync('reports-assignment3/audit.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({checks,admissionRows:rows.length,naturalCases:natural.length,naturalViolations:natural.reduce((s,r)=>s+r.violations.length,0),grappleCases:grapples.length}));
