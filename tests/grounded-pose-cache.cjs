'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{root,sourceFingerprint}=require('../tools/fighter-render/prerequisites.cjs'),{load}=require('../tools/grounded-cache/load.cjs');
const out=path.join(root,'reports-grounded-cache');fs.mkdirSync(out,{recursive:true});
(async()=>{const r=await load(process.env.UF_CACHE_MUTATION),{N,sb,createCanvas}=r,{cache,drawGrounded114,frameIndex}=sb.__groundedTest114,S=sb.PolishedSprites,rows=[];let checks=0;
 const equal=(a,b,label)=>{checks++;if(Buffer.isBuffer(a)&&Buffer.isBuffer(b))A.ok(a.equals(b),label);else A.deepEqual(a,b,label);},ok=(x,label)=>{checks++;A.ok(x,label);};
 const actor=(type,dir)=>Object.assign(N.actor(type,0,475),{dir,hp:120,maxHp:120,act:null,walk:0,down:0,flight:null,stun:0,shock:0,inv:0,wakeInv:0,weapon:null,tactic:'rush',hitFlash:0,grounded114:true});
 const state=f=>JSON.stringify(f,(k,v)=>typeof v==='function'?undefined:v);
 const cv=createCanvas(640,420),ctx=cv.getContext('2d');
 function paint(f,time,direct=false){const before=state(f);ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,640,420);ctx.translate(320,380);ctx.scale(f.dir,1);ctx.imageSmoothingEnabled=false;(direct?drawGrounded114:S.draw)(ctx,{...f},time,1);equal(state(f),before,'render must preserve all actor fields');return Buffer.from(ctx.getImageData(0,0,640,420).data);}
 function compare(f,warm,query,label,warmFlash=0,queryFlash=0){cache.clear();f.hitFlash=queryFlash;const expected=paint(f,query),index=frameIndex(f,query);cache.clear();f.hitFlash=warmFlash;paint(f,warm);f.hitFlash=queryFlash;const actual=paint(f,query);equal(actual,expected,label);equal(frameIndex(f,query),index,'native pose selector retained');rows.push({type:f.type,dir:f.dir,warm,query,warmFlash,queryFlash,label});}
 for(const type of ['thug','knifeThug','enforcer','biker','sato','akari','flint','bouncer','broxton','forest','reina'])for(const dir of [-1,1]){
  const f=actor(type,dir);for(const [warm,query,label] of [[.8,2.8166666666666615,'same-index squash'],[.9,2.8166666666666615,'different native pose'],[2.8,2.9,'within coarse bucket'],[4.999999999999988,2.8166666666666615,'exact original floating clock rewind'],[5,4.999999999999988,'boundary rewind'],[.9,5,'boundary forward']])compare(f,warm,query,label);
  compare(f,.9,.9,'flashed to clean',.2,0);compare(f,.9,.9,'clean to flashed',0,.2);
  compare(f,.9,.9,'positive flashes share same native filter',.2,.1);
  f.hitFlash=0;f.walk=1;f.walkPhase=.37;compare(f,.9,2.8166666666666615,'moving control');
 }
 // Same-time peers retain sharing; flash identity separates both kinds regardless of order.
 for(const dir of [-1,1]){const f=actor('thug',dir),peer=actor('thug',dir);cache.clear();const image=paint(f,.9),entries=[...cache];ok(entries.length>0,'grounded raster cached');equal(paint(peer,.9),image,'same-time peer pixels');equal([...cache],entries,'same-time identical peers reuse existing raster');peer.hitFlash=.2;paint(peer,.9);equal(cache.size,entries.length+1,'flash creates a distinct same-time entry');equal(paint(f,.9),image,'flashed peer must not contaminate clean peer');}
 // Exact time ownership, including repeated invalid/nonfinite values, is exercised
 // through the native private entry; no alternate clock or production API is added.
 for(const time of [Infinity,-Infinity,NaN,undefined,'0.9']){const f=actor('thug',1);cache.clear();paint(f,time,true);cache.set('__sentinel__',{});paint(f,time,true);ok(!cache.has('__sentinel__'),'unsupported time must never reuse cached raster');}
 const f=actor('thug',1);cache.clear();paint(f,.9);cache.set('__sentinel__',{});paint(f,.9);ok(cache.has('__sentinel__'),'same finite time preserves batch');paint(f,.9000000000000001);ok(!cache.has('__sentinel__'),'even sub-frame time change invalidates');
 // Recreating actual fixtures/hero objects at the same or rewound time does not
 // require a fixture-side cache clear to render a current pose.
 const g=new N.Brawler();for(const hero of ['forest','niko','broxton','nightshade']){g.selectHero(hero);const target=actor('thug',1);compare(target,4.999999999999988,2.8166666666666615,'hero/reset '+hero);}
 const report={status:'passed',sourceFingerprint:sourceFingerprint(),checks,cases:rows.length,rows,gitRequired:false,diagnostics:'Private source-buffer export only; actual original draw functions execute',mutation:process.env.UF_CACHE_MUTATION||null};
 fs.writeFileSync(path.join(out,process.env.UF_CACHE_MUTATION?'mutation-'+process.env.UF_CACHE_MUTATION+'.json':'runtime.json'),JSON.stringify(report,null,2)+'\n');console.log('PASS grounded pose cache: '+checks+' checks / '+rows.length+' comparisons');
})().catch(e=>{console.error(e);process.exitCode=e.exitCode||1;});
