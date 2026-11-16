
(function(root){'use strict';const {Brawler,clamp}=root.NeonCombat,P=Brawler.prototype;
const old={};for(const k of ['ai','enemyHit','advanceHeroAction','finishHeroAction','damage','tick'])old[k]=P[k];
const moves={
 jackalWhistle:{total:.95,hit:.50,active:0,damage:0,reach:0,recovery:.4},
 knife:{total:.64,hit:.22,active:.18,damage:10,reach:94,recovery:.18},
 jackalRushSlash:{total:1.30,hit:.48,active:.22,damage:15,reach:112,recovery:.60,rush:true},
 jackalHyper:{total:1.48,hit:.32,active:.14,damage:5,reach:108,recovery:.75,times:[.32,.55,.78]},
 jackalBatRush:{total:1.48,hit:.55,active:.22,damage:17,reach:146,recovery:.75,rush:true},
 jackalBatPower:{total:1.36,hit:.48,active:.22,damage:20,reach:150,recovery:.65},
 jackalOverhead:{total:2.03,hit:.50,active:.18,damage:12,reach:94,recovery:.85},
 jackalShove:{total:.62,hit:.24,active:.16,damage:4,reach:88,recovery:.20}
};
P.jackalAttack100=function(e,name){const s=moves[name];this.enemyAct(e,name,s.total,s.hit,{...s,jackal100:true,iFrames:false,contacts100:new Set(),fromX:e.x});e.guarding=0;if(name==='jackalOverhead'){e.overheadReady100=this.time+7;this.fx(e.x,e.y-145,'OVERHEAD','#ffce8e');}if(s.rush){e.rushReady100=this.time+(e.weapon==='knife'?3:4);this.event('swing');}if(name==='jackalHyper')e.hyperReady100=this.time+4.5;};
P.ai=function(e,dt){if(e.type!=='boss'||e.dormant||e.alleyWaiting||e.fleeing||e.hp<=0||e.down||e.stun||e.flight||e.heldBy||e.entry||e.activeAt>this.time)return old.ai.call(this,e,dt);if(e.act)return;
 if(e.recovering>0){e.walk=0;return;}const p=this.player;if(p.hp<=0||p.heldBy||p.down){e.walk=0;return;}if(e.hp<=e.maxHp*.5&&e.phase<1){this.enemyAct(e,'switch',.85,.4,{phase:1,weapon:'bat',iFrames:false});return;}
 const dx=p.x-e.x,gap=Math.abs(dx),dy=p.y-e.y;e.dir=Math.sign(dx)||e.dir;
 const crowded=this.enemies.filter(o=>o!==e&&o.hp>0&&!o.dormant&&o.act&&!['switch','draw','vulnerabilityCue'].includes(o.act.name)).length>=2;
 if(!e.whistleUsed100&&e.noAlliesSince100!==undefined&&this.time-e.noAlliesSince100>15){e.whistleUsed100=true;this.jackalAttack100(e,'jackalWhistle');this.fx(e.x,e.y-145,'WHISTLE!','#e7d6ff');this.event('jackalWhistle');return;}
 if(e.counterPending100&&e.cd<=0){e.counterPending100=false;if(gap<170&&Math.abs(dy)<32){this.jackalAttack100(e,'jackalBatPower');return;}}
 if(!crowded&&e.cd<=0&&p.jump>.10&&gap<115&&Math.abs(dy)<28&&this.time>=(e.antiReady100||0)&&e.recovering<=0){e.antiReady100=this.time+4.5;this.enemyAct(e,'weaponRise',1.15,.32,{antiAir:true,damage:e.weapon==='knife'?12:16,knock:true,reach:126,weapon:e.weapon,iFrames:false});return;}
 if(!crowded&&e.cd<=0&&Math.abs(dy)<32){
 if(e.weapon==='knife'){if(gap>170&&gap<620&&this.time>=(e.rushReady100||0)){this.jackalAttack100(e,'jackalRushSlash');return;}
 if(gap<96){e.knifeCycle100=(e.knifeCycle100||0)+1;const hyper=e.knifeCycle100%4===0&&this.time>=(e.hyperReady100||0);this.jackalAttack100(e,hyper?'jackalHyper':'knife');return;}}
 else if(e.weapon==='bat'){if(gap<64&&this.time>=(e.overheadReady100||0)){this.jackalAttack100(e,'jackalOverhead');return;}
 if(gap>210&&gap<620&&this.time>=(e.rushReady100||0)){this.jackalAttack100(e,'jackalBatRush');return;}
 if(gap>=78&&gap<150){this.jackalAttack100(e,'jackalBatPower');return;}}
 }
 if(this.time<(e.punishUntil100||0)){e.walk=0;e.guarding=0;return;}
 const target=e.weapon==='knife'?58:112,mx=gap>target+12?e.dir:gap<target-24&&e.weapon==='bat'?-e.dir:0,my=Math.abs(dy)>5?Math.sign(dy):0,speed=e.weapon==='knife'?120:88;
 e.x=clamp(e.x+mx*speed*dt,this.bounds.min,this.bounds.max);e.y=clamp(e.y+my*70*dt,this.groundBounds.min,this.groundBounds.max);e.walk=mx||my?1:0;if(e.walk)e.walkPhase=((e.walkPhase||0)+speed*dt/105)%1;
};
P.advanceHeroAction=function(e,a,dt){old.advanceHeroAction?.call(this,e,a,dt);if(e.type!=='boss'||!a.jackal100||e.act!==a)return;
 if(a.name==='jackalWhistle'){if(a.t>=a.hit&&!a.called100){a.called100=true;this.jackalReinforcements100(e);}return;}
 if(a.rush&&a.t>.18&&a.t<a.hit+.10){const stop=a.aimX-e.dir*(e.weapon==='knife'?60:108),next=e.x+e.dir*(e.weapon==='knife'?350:310)*dt;e.x=clamp(e.dir>0?Math.max(e.x,Math.min(next,stop)):Math.min(e.x,Math.max(next,stop)),this.bounds.min,this.bounds.max);e.walk=1;e.walkPhase=((e.walkPhase||0)+dt*3)%1;}
 const times=a.times||[a.hit];for(let i=0;i<times.length;i++)if(a.t>=times[i]&&a.t<times[i]+a.active)this.jackalContact100(e,a,i);
 if(a.name==='jackalOverhead'&&a.opener100){for(let i=0;i<3;i++)if(a.t>=.90+i*.28&&a.t<1.04+i*.28)this.jackalGround100(e,a,i);}
};
P.enemyHit=function(e,a){if(e.type==='boss'&&a.jackal100)return;return old.enemyHit.call(this,e,a);};
P.jackalContact100=function(e,a,stage){if(a.contacts100.has(stage)||e.act!==a)return;const p=this.player,dx=(p.x-e.x)*e.dir;if(p.hp<=0||p.down||p.heldBy||p.jump>0||dx< -22||dx>a.reach||Math.abs(p.y-e.y)>32)return;
 if(this.catchPunch(e,a)){a.contacts100.add(stage);return;}
 if(a.name==='jackalHyper'&&stage>0&&a.linked100&&!p.blocking&&p.stun>0&&!p.act&&!p.wakeInv)p.inv=0;
 const before=p.hp,blocked=p.blocking&&(e.x-p.x)*p.dir>=0,knock=a.name==='jackalOverhead'||['jackalBatPower','jackalBatRush'].includes(a.name)||a.name==='jackalHyper'&&stage===2;
 if(this.damage(p,a.name==='jackalHyper'&&stage===2?8:a.damage,e.dir,knock,{attacker:e})){a.contacts100.add(stage);a.linked100=p.hp<before&&!blocked;this.event('swing');
 if(a.name==='jackalShove'){p.x=clamp(p.x+e.dir*(blocked?35:75),this.bounds.min,this.bounds.max);p.y=clamp(p.y,this.groundBounds.min,this.groundBounds.max);e.counterPending100=true;}
 if(a.name==='jackalOverhead'&&p.down&&!blocked){a.opener100=true;p.fallTo=clamp(p.fallFrom+e.dir*22,this.bounds.min,this.bounds.max);p.downTotal=Math.max(p.downTotal,1.45);this.fx(p.x,p.y-125,'ROLL TO ESCAPE','#b6eadf');}}
};
P.jackalGround100=function(e,a,stage){a.groundHits100??=new Set();if(a.groundHits100.has(stage))return;const p=this.player;if(p.hp<=0||!p.down||p.act?.name==='roll'||p.wakeInv>0||Math.abs(p.x-e.x)>145||Math.abs(p.y-e.y)>32)return;
 p.inv=0;if(this.damage(p,4,e.dir,false,{ground:true,attacker:e})){a.groundHits100.add(stage);this.event('powerSlam');if(stage===2){p.inv=1;p.downAge=Math.max(p.downAge,p.downTotal-.25);p.down=Math.max(0,p.downTotal-p.downAge);}}};
P.jackalReinforcements100=function(boss){for(let i=0;i<2;i++){const side=i===0?-1:1,y=clamp(boss.y+(i?18:-18),this.groundBounds.min,this.groundBounds.max),toX=clamp(this.camera+(i?840:120),this.bounds.min+15,this.bounds.max-15),fromX=this.camera+(i?1030:-70),e=this.deployEnemy({type:Math.random()<.5?'thug':'knifeThug',x:toX,y});e.whistleReinforcement100=true;e.entry={fromX,fromY:y,toX,toY:y,t:0};e.x=e.prevX=fromX;e.activeAt=this.time+.6;e.cd=.7;}this.event('jackalBackup');};
P.finishHeroAction=function(e,a){old.finishHeroAction?.call(this,e,a);if(e.type!=='boss'||!a.jackal100)return;e.finished100=a;e.punishUntil100=this.time+a.recovery;e.guarding=0;};
P.tick=function(dt,input={}){old.tick.call(this,dt,input);for(const e of this.enemies){if(e.type==='boss'&&e.hp>0&&!e.dormant&&!e.alleyWaiting&&!e.fleeing&&!this.transition&&!this.bossEnding&&!this.levelClear){const allies=this.enemies.some(o=>o!==e&&o.hp>0&&!o.dormant&&!o.fleeing&&o.x>=this.camera-40&&o.x<=this.camera+1000);if(allies)e.noAlliesSince100=undefined;else e.noAlliesSince100??=this.time;}else if(e.type==='boss')e.noAlliesSince100=undefined;if(e.finished100){const a=e.finished100;e.finished100=null;e.cd=a.recovery;if(a.name==='knife'){e.stabChain100=(e.stabChain100||0)+1;if(e.stabChain100>=2){e.cd=.65;e.stabChain100=0;}}else e.stabChain100=0;}if(e.type==='boss'&&this.time<(e.punishUntil100||0))e.guarding=0;}};
P.damage=function(e,amount,dir,knock,opts={}){const p=this.player,isBoss=e.type==='boss'&&!e.sterlingBoss195&&e.hp>0&&!e.dormant,front=isBoss&&opts.attacker===p&&(p.x-e.x)*e.dir>=0;
 if(isBoss&&!opts.force&&e.act?.jackal100&&['jackalBatPower','jackalOverhead'].includes(e.act.name)&&e.act.t>=.20&&e.act.t<e.act.hit+e.act.active){opts={...opts,hypeArmor:true};knock=false;}
 const before=e.hp,guard=front&&e.weapon==='bat'&&e.guarding>0&&!opts.force;const result=old.damage.call(this,e,amount,dir,knock,opts);
 if(!isBoss||!front||e.weapon!=='bat'||opts.force||e.down||e.flight||e.heldBy||e.hp<=0||this.time<(e.punishUntil100||0))return result;
 if(guard&&e.hp===before&&e.blockFlash>0){e.blocks100=(e.blocks100||0)+1;if(e.blocks100>=2&&this.time>=(e.shoveReady100||0)){e.blocks100=0;e.shoveReady100=this.time+8;e.stun=0;this.jackalAttack100(e,'jackalShove');this.fx(e.x,e.y-135,'SHOVE','#ffcf96');}}
 else if(e.hp<before&&!e.act){e.pressure100=this.time-(e.pressureAt100||-10)<1?(e.pressure100||0)+1:1;e.pressureAt100=this.time;if(e.pressure100>=3){e.pressure100=0;e.guarding=.7;e.stun=Math.min(e.stun,.12);e.blocks100=0;}}
 return result;};
root.NeonJackal100={moves};
})(typeof window!=='undefined'?window:globalThis);
