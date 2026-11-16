'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),W=require('../tools/qa242/run-subway238.cjs'),C=require('../tools/qa242/coverage.cjs');
test('Subway correction changes only the pinned obsolete timer call',()=>{
 const source=fs.readFileSync('tests/subway238.cjs','utf8'),index=require('../qa/system242/coverage-source-index.json');
 assert.equal(W.prepare(source,index),source.replace(W.anchor,W.replacement));
 assert.throws(()=>W.prepare(source+'\n',index),/pinned/);
 const altered=source.replace(W.anchor,'/* missing direct timer */');
 assert.throws(()=>W.prepare(altered,{entries:[{path:'tests/subway238.cjs',sha:C.blob(Buffer.from(altered))}]}),/anchor/);
 assert.deepEqual(require('../qa/system242/suites.json').suites.find(q=>q.id==='subway238').command,['node','tools/qa242/run-subway238.cjs']);
});
test('missing completion offer, unpaused clock and stalled native arrival fail closed',()=>{
 const make=()=>({time:0,levelClear:{slums204:true,t:0},homeOffer327:{},player:{},environment156:{},tick(){}});
 const H={active:g=>!!g.arrived},N={Home327:{blocked:g=>!!g.homeOffer327,resume(g){g.homeOffer327=null;g.levelClear.homeContinue327=true;}}};
 const absent=make();absent.homeOffer327=null;assert.throws(()=>W.continueRoute(N,H,absent),/offered/);
 const moving=make();moving.tick=function(){this.time++;};assert.throws(()=>W.continueRoute(N,H,moving),/pauses/);
 assert.throws(()=>W.continueRoute(N,H,make()),/reach Subway/);
});
for(const hz of [30,60,120])for(const hero of ['reina','nova','broxton','forest','niko','orion'])test('native completion choice and finished Subway transition: '+hero+' '+hz+'Hz',()=>{
 const {N}=require('../tools/qa242/runtime.cjs').load(294),H=N.Subway238,g=new N.Brawler();g.selectHero(hero);H.start(g);N.Slums202.start(g,22);g.player.hp=g.player.maxHp=10000;
 for(let i=0;i<hz*300&&!g.levelClear;i++){for(const e of g.enemies)if(e.hp>0&&!e.dormant){e.inv=e.wakeInv=0;g.damage(e,999999,1,true,{attacker:g.player,force:true,ground:true,stageHazard:true});}g.tick(1/hz,{});}
 assert.equal(g.slumsFinal204.destination,'Subway Station');const receipt=W.continueRoute(N,H,g,hz);
 for(let i=0;i<Math.ceil(1.3*hz);i++)g.tick(1/hz,{});
 assert(!g.transition);assert(!g.homeOffer327);assert.equal(g.player,receipt.player);assert.equal(g.environment156,receipt.world);assert.equal(g.player.type,hero);assert(g.time>receipt.arrivalTime);
});
