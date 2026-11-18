/* Assignment 5: Colton Sharpe uses the existing FriendlySupport370 controller. */
(function(r){'use strict';
const N=r.NeonCombat,F=N.FriendlySupport370,B=N.SyndicateBackup365,R=N.Backup371,W=N.Backup377;
const config=Object.freeze({hp:60,chop:19,slash:[12,13],reach:84,bleedTicks:4,heavyBleedTicks:2,bleedInterval:1});
function log(g,type,data={}){const events=F.state(g).events;events.push({type,at:g.time,...data});if(events.length>120)events.shift();}
function immune(e){return N.Niko185.category(e)==='boss'||!!(e.poolBoss193||e.sterlingBoss195||e.colt204||e.baylor237);}
function applyBleed(g,a,e){
 if(e.hp<=0||e.cutterBleedApplied||immune(e))return false;
 const ticks=N.Grab223.classify(e)==='HEAVY_BOSS'?config.heavyBleedTicks:config.bleedTicks;
 e.cutterBleedApplied=true;e.bleedCutter={source:{id:a.id,type:a.type,team370:'friendly',dir:a.dir,x:a.x,y:a.y},nextTick:g.time+1,until:g.time+ticks,remaining:ticks};
 log(g,'cutter-bleed-applied',{target:e.id,ticks});return true;
}
function contact(g,a,ac,strike,amount){
 const e=ac.target370;ac.hitsCutter??=new Set();
 if(!e||ac.hitsCutter.has(strike)||!W.range(g,a,e,config.reach))return false;
 if((e.blocking||e.guarding)&&(a.x-e.x)*e.dir>=0){e.blockFlash=.16;ac.hitsCutter.add(strike);ac.blockedCutter=true;log(g,'cutter-block',{target:e.id,strike});return false;}
 const hp=e.hp;g.damage(e,amount,a.dir,false,{attacker:a});
 // A rejected overlap does not consume later eligible native active frames.
 if(e.hp>=hp)return false;
 ac.hitsCutter.add(strike);ac.connectedCutter=true;F.state(g).targetUntil.set(e.id,g.time+F.config.targetGap);
 g.effects.push({kind:'spark',x:e.x,y:e.y-80,life:.12});applyBleed(g,a,e);
 log(g,'cutter-hit',{target:e.id,strike,damage:hp-e.hp,move:ac.move370.id});return true;
}
function timing(ac,end,hit,miss){ac.activeEnd371=end;ac.total=(end+(ac.connectedCutter||ac.blockedCutter?hit:miss))/60;}
const chop={id:'cutterChop',nativeName:'supportCutterChop',startup:18,active:5,recovery:32,impact(){},canStart:(g,a,e)=>Math.abs(e.x-a.x)<=74,
 advance(g,a,ac,previous,f){if(f+1e-7>=18&&previous<23)contact(g,a,ac,0,config.chop);if(f+1e-7>=23)timing(ac,23,22,32);}};
const doubleSlash={id:'cutterDoubleSlash',nativeName:'supportCutterDoubleSlash',startup:12,active:23,recovery:38,impact(){},canStart:(g,a,e)=>Math.abs(e.x-a.x)<=74,
 advance(g,a,ac,previous,f){if(f+1e-7>=12&&previous<16)contact(g,a,ac,0,config.slash[0]);if(f+1e-7>=30&&previous<35)contact(g,a,ac,1,config.slash[1]);if(f+1e-7>=35)timing(ac,35,30,38);}};
function create(g,{index}){const plan=R.entryPlan(g,index);if(!plan)return null;const a=N.actor('supportCutter',plan.fromX,plan.fromY);Object.assign(a,{name:B.names.cutter,hp:config.hp,maxHp:config.hp,team370:'friendly',role371:'cutter',roleCutter:true,weapon:null,entry:{...plan,t:0,speed239:F.profiles.cutter.speed},entrance374:{...plan},dir:plan.side<0?1:-1,exit371:plan.side});return a;}
function choose(g,a,e,moves){return moves.find(m=>m===(e.recovering||e.cd>.2||e.act?.done?chop:doubleSlash))||moves[0];}
function exit(g,a,dt){a.dir=a.exit371||-1;a.walk=1;a.running=true;a.walkPhase=((a.walkPhase||0)+dt*1.8)%1;a.x+=a.dir*F.profiles.cutter.speed*1.3*dt;if(a.dir<0?a.x<g.camera-180:a.x>g.camera+1140)a.exited371=true;}
if(!r.backupProviderTests371)F.register('cutter',{create,canArrive:(g,i)=>!!R.entryPlan(g,i),moves:[chop,doubleSlash],choose,engageRange:74,exit,departed:(g,a)=>!!a.exited371});
function tickBleed(g){
 for(const e of g.enemies){const s=e.bleedCutter;if(!s)continue;
  while(s.remaining>0&&s.nextTick<=Math.min(g.time,s.until)+1e-8){s.nextTick+=config.bleedInterval;s.remaining--;
   if(e.hp<=0||e.dormant||e.entry||e.entering||e.fleeing||e.heldBy||e.flight||e.down||e.wakeInv||e.inv||N.GrappleRecovery119.active(e)||g.bossProtected(e)||immune(e))continue;
   const inv=e.inv,flash=e.hitFlash,hp=e.hp;
   // Reuse the native non-staggering status-damage route; never bypass protection.
   g.damage(e,1,s.source.dir,false,{attacker:s.source,statusTick257:true});e.inv=inv;e.hitFlash=flash;
   if(e.hp<hp)log(g,'cutter-bleed-tick',{target:e.id,damage:hp-e.hp});
  }
  if(s.remaining<=0||e.hp<=0||g.time>s.until+1e-8)delete e.bleedCutter;
 }
}
const tick=N.Brawler.prototype.tick;N.Brawler.prototype.tick=function(dt,input={}){const time=this.time,result=tick.call(this,dt,input);if(this.time>time&&this.playing&&this.player.hp>0&&!this.transition)tickBleed(this);return result;};
N.CutterSupport={config,moves:{chop,doubleSlash},create,choose,contact,applyBleed,tickBleed,immune};
})(globalThis);
