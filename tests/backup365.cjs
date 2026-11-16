'use strict';
const A=require('node:assert/strict'),{load}=require('../tools/qa242/runtime.cjs');
const {N}=load(383),B=N.SyndicateBackup365;let checks=0;
const ok=(v,m)=>{A.ok(v,m);checks++;};
function fixture(){const g=new N.Brawler();g.selectHero('broxton');N.Practice282.setup(g,{id:'thug',scene284:'restaurant'});g.ai=g.reinforce=g.reinforceFinancial=()=>{};g.enemies=[];g.pending=[];g.props=[];g.items=[];g.encounters222Enabled=false;Object.assign(g.player,{x:400,prevX:400,y:475,prevY:475,cd:0,inv:0,wakeInv:0,defense:100});return g;}
for(const hz of [30,60,120])for(const dir of [-1,1]){
 const g=fixture(),p=g.player;p.dir=dir;const begin=g.time,hp=p.hp;ok(g.command('unique',{unique:true}),'call accepted');
 for(let frame=1;frame<=Math.ceil(141*hz/60);frame++){
  const before=(frame-1)*60/hz;
  if(before<141-1e-6)for(const k of ['attack','special','jump','dodge','block','counter','grab','pickup'])ok(!g.command(k,{}),'mandatory phone lifecycle rejects '+k);
  g.tick(1/hz,{unique:true,right:true,run:true,block:true});
  ok(p.x===400&&p.y===475&&!p.blocking,'root remains planted');
  if(frame*60/hz<114-1e-6)ok(p.defense===100&&!B.state(g).request,'no preconnection payment');
  else ok(p.defense===70&&!!B.state(g).request,'one 30-energy payment');
 }
 if(p.act?.backup365){ok(Math.abs(p.act.t-141/60)<1/hz+1e-5,'completion is within one sampled tick');g.tick(1/hz,{});}ok(!p.act?.backup365,'141-frame call completes within one sampled tick');ok(p.hp===hp,'no HP fallback');
 const s=B.state(g),q=s.request;ok(Math.abs(q.connected-begin-114/60)<1/hz+1e-5,'114-frame connection');
 ok(q.arriveAt-q.connected>=3&&q.arriveAt-q.connected<=4,'approved 3–4 second dispatch');
 ok(s.events.filter(e=>e.type==='connected').length===1,'single connection');
}
for(const frame of [1,54,113,114,126,140])for(const iron of [false,true]){
 const g=fixture(),p=g.player;g.command('unique',{unique:true});for(let n=0;n<frame;n++)g.tick(1/60,{unique:true});if(iron)N.Broxton179.state(g).active=10;
 const hp=p.hp;g.damage(p,10,-1,false,{attacker:{type:'thug',x:p.x+20,y:p.y},force:true});
 ok(p.hp<hp&&!p.act?.backup365&&!p.phone365,'interruptible, including during Iron Will');
 if(frame<114)ok(p.defense===100&&B.state(g).retry===5&&!B.state(g).request,'preconnection retry retains energy');
 else ok(p.defense===70&&!!B.state(g).request,'connected support is retained');
}
for(const reason of ['energy','cooldown','retry','active','restricted']){
 const g=fixture(),s=B.state(g);if(reason==='energy')g.player.defense=29;if(reason==='cooldown')s.cooldown=50;if(reason==='retry')s.retry=4;if(reason==='active')s.request={id:1};if(reason==='restricted')g.transition={to:2};
 const hp=g.player.hp,en=g.player.defense;ok(!g.command('unique',{unique:true}),reason+' denies call');ok(g.player.hp===hp&&g.player.defense===en,'denial does not debit resources');
}
console.log('PASS current phone contract',checks,'141/114 timing, cost, interruption, dispatch, admission at 30/60/120Hz');
