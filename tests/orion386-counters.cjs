'use strict';
const {test}=require('node:test'),A=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('dist/orion384.js','utf8'),before=fs.readFileSync('source-archive/orion384-before386.js','utf8');
function setup(code){const r=require('../tools/qa242/runtime.cjs').load(386);vm.runInContext(fs.readFileSync('dist/orion384-data.js','utf8'),r.sb);vm.runInContext(code,r.sb);return r;}
function fixture(r,dir,kind){const {N}=r,g=new N.Brawler();g.selectHero('orion');N.Practice282.setup(g,{id:'thug',scene284:'restaurant'});g.ai=g.reinforce=g.reinforceFinancial=()=>{};g.enemies=[];g.pending=[];g.props=[];g.items=[];g.encounters222Enabled=false;const p=g.player;Object.assign(p,{x:450,y:475,dir,cd:0,inv:0,wakeInv:0,defense:100});const e=N.actor('thug',450+dir*40,475);Object.assign(e,{hp:1000,maxHp:1000,dir:-dir,inv:0,wakeInv:0,activeAt:0,weapon:kind==='short'?'knife':kind==='long'?'pipe':null});g.enemies.push(e);A.ok(N.Counter248.arm(g));const incoming={name:kind==='kick'?'kick':kind==='short'?'knifeSlash':kind==='long'?'weaponSwing':'punch',reach:110};e.act=incoming;A.ok(N.Counter248.capture(g,e,incoming));return {g,p,e};}
const snapshot=({g,p,e})=>JSON.parse(JSON.stringify({time:g.time,p:[p.x,p.y,p.hp,p.defense,p.cd,p.inv,p.down,p.jump,p.landing228,p.grappleZ,p.act?.name,p.act?.t,p.act?.phase248,p.act?.landed248,p.act?.disarmed248,p.heldWeapon248],e:[e.x,e.y,e.hp,e.down,e.inv,e.stun,e.shock,e.weapon,!!e.heldBy,e.groundedCounter248,e.pairVisual?.cx,e.pairVisual?.cy,e.pairVisual?.angle],events:[...(p.act?.events248||[])]}));
test('current four-family counter presentation preserves native outcomes and clocks in both facings',()=>{
 const old=setup(before),now=setup(source),results=[];
 for(const dir of[-1,1])for(const kind of['punch','kick','short','long']){
  const a=fixture(old,dir,kind),b=fixture(now,dir,kind),seen=new Set();
  A.equal(now.N.Orion384.pose(b.p,b.g.time).phase,'capture');
  for(let f=0;f<170;f++){
   if(f===12){old.N.Counter248.confirm(a.g,'attack');now.N.Counter248.confirm(b.g,'attack');}
   a.g.tick(1/60,{});b.g.tick(1/60,{});A.deepEqual(snapshot(a),snapshot(b),kind+' native frame '+f);
   const q=now.N.Orion384.pose(b.p,b.g.time);A.ok(now.sb.Orion384Data.families[q.family]?.frames[q.index]);if(b.p.act?.name==='counterMove248'){seen.add(q.index);A.equal(q.state,'counter-'+kind);A.equal(q.family,'grapple-'+(dir<0?'L':'R'));}
  }
  A.ok(seen.size>=3,kind+' has distinct action phases');A.equal(1000-b.e.hp,{punch:48,kick:48,short:38,long:0}[kind]);A.equal(b.p.act,null);A.equal(b.e.pairVisual,null);A.equal(b.e.heldBy,null);results.push({dir,kind,damage:1000-b.e.hp,poses:[...seen]});
 }
 fs.mkdirSync('reports386',{recursive:true});fs.writeFileSync('reports386/counters.json',JSON.stringify({nativeFrames:1360,results},null,2));
});
test('negative legacy dispatcher fails distinct-counter and landing requirements',()=>{const r=setup(before),p={type:'orion',hp:130,dir:1,act:{counter248:true,name:'counterMove248',kind248:'short',t:29/60}};A.notEqual(r.N.Orion384.pose(p).state,'counter-short');p.act=null;p.landing228=8/60;A.notEqual(r.N.Orion384.pose(p).state,'landing');});
test('landing uses the native eight-frame timer and yields to injury, jump and attacks',()=>{const r=setup(source),p={type:'orion',hp:130,dir:-1,landing228:8/60};A.equal(r.N.Orion384.pose(p).state,'landing');p.landing228=0;A.equal(r.N.Orion384.pose(p).state,'idle');p.landing228=8/60;p.jump=.4;A.equal(r.N.Orion384.pose(p).state,'jump');p.down=1;A.equal(r.N.Orion384.pose(p).state,'down');});
test('live electrical cues are read-only, use native grip/height, clean up and reduce motion',()=>{
 const r=setup(source),sb=r.sb;sb.PolishedSprites={draw:()=>true,ready:Promise.resolve()};sb.Image=class{set src(v){this.onload?.();}};sb.NeonChargeView130={hud:()=>''};sb.OrionView205={};vm.runInContext(fs.readFileSync('dist/orion-view384.js','utf8'),sb);
 const calls=[],c=new Proxy({},{get:(_,k)=>typeof k==='string'?((...args)=>calls.push([k,...args])):undefined,set:()=>true});
 const p={type:'orion',hp:130,dir:1,x:450,y:475,act:{orion228:true,kind205:'blast',t:.1,grip228:{x:510,y:355}}},g={player:p,camera:200,time:10,orionElectric205:[]};
 const saved=JSON.stringify(g);sb.OrionView384.effects(c,g);A.equal(JSON.stringify(g),saved);A.ok(calls.some(q=>q[0]==='moveTo'&&q[1]===310&&q[2]===355));
 calls.length=0;sb.OrionView384.effects(c,g,true);A.ok(calls.filter(q=>q[0]==='lineTo').length===1,'steady reduced-motion grip');
 p.act.released205=true;calls.length=0;sb.OrionView384.effects(c,g);A.equal(calls.length,2,'save/restore only after release');
 p.act=null;g.orionElectric205=[{kind:'arc',at:0,life:1,x:0,y:0,to:10}];calls.length=0;sb.OrionView384.effects(c,g);A.equal(calls.length,2,'expired effects not rendered');
 p.landing228=8/60;calls.length=0;sb.OrionView384.effects(c,g);A.ok(calls.some(q=>q[0]==='ellipse'&&q[1]===250&&q[2]===475));
});
