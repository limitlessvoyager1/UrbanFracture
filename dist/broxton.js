
(function(root){'use strict';const N=root.NeonCombat,{Brawler,clamp}=N,P=Brawler.prototype;
const COMBO_DAMAGE=[6,7,9,13];N.BroxtonComboDamage136=COMBO_DAMAGE;
const HEROES={reina:{name:'Reina',hp:105,walk:194.25,run:278.25,air:250,apex:119.6},broxton:{name:'Broxton',hp:125,walk:145,run:210,air:215,apex:94.3}};
const base={};for(const key of ['reset','start','holdAction','hitPlayerAttack','release','event','fx','settledDefeats','ai'])base[key]=P[key];
P.reset=function(checkpoint=0){base.reset.call(this,checkpoint);const key=HEROES[this.selectedHero]?this.selectedHero:'reina',s=HEROES[key],p=this.player;p.type=key;p.name=s.name;p.hp=p.maxHp=s.hp;p.walkSpeed=s.walk;p.runSpeed=s.run;p.airSpeed=s.air;p.jumpApex=s.apex;};
P.ai=function(e,dt){const pressure=this.player.type==='broxton'&&!e.dormant&&!e.fleeing&&!e.entry&&!e.liftEntry&&!e.entering&&e.hp>0&&!e.down&&!e.flight&&!e.heldBy&&!e.stun&&!e.act;const x=e.x,y=e.y;if(pressure){e.cd=Math.max(0,e.cd-dt*.10);e.think=Math.max(0,e.think-dt*.10);}base.ai.call(this,e,dt);if(pressure&&e.walk&&!e.act&&!e.dormant){e.x=clamp(x+(e.x-x)*1.08,this.bounds.min,this.bounds.max);e.y=clamp(y+(e.y-y)*1.08,this.groundBounds.min,this.groundBounds.max);}};
P.selectHero=function(key){if(!HEROES[key])return false;this.selectedHero=key;this.reset(this.zone||0);return true;};
P.start=function(a,name,total,hitAt,opts={}){if(a===this.player&&a.type==='broxton'){
 const n=opts.combo||1;
 if(name==='combo'){total=n===4?.64:.32+n*.025;hitAt=n===4?.30:.11+n*.022;opts={...opts,damage:COMBO_DAMAGE[n-1],reach:[102,108,116,124][n-1],knock:n===4};}
 if(name==='blitzKick'){name='broxDash';total=.76;hitAt=.12;a.jump=0;a.jumpVx=0;a.blitzRecovery=0;opts={damage:22,reach:94,knock:true};}
 if(name==='sword'){name='broxSpin';total=.76;hitAt=.20;opts={damage:23,reach:112,knock:true};}
 if(name==='dashSword'){name='broxGrabDash';total=.62;hitAt=.12;opts={damage:47,reach:56,armorHits:1};}
 if(name==='airSword'){name='broxAirPress';total=.62;hitAt=.36;opts={...opts,damage:32,reach:104,knock:true};}
 if(name==='airKick'){name='broxSuperman';total=Math.max(.32,a.jump);hitAt=.11;opts={...opts,damage:24,reach:104,knock:false};a.jumpVx=a.dir*215;}
 if(name==='neutralAirKick'){name='broxHeel';total=Math.max(.32,a.jump);hitAt=.12;opts={...opts,damage:25,reach:92,knock:true};a.jumpVx=0;}
 if(name==='airKnee'){name='broxElbow';total=.46;hitAt=.24;opts={...opts,damage:16,reach:80,knock:true};}
 if(name==='palmStrike'){name='broxUpper';total=.72;hitAt=.32;opts={damage:39,reach:110,knock:true};}
 if(name==='counterCombo'){name='broxCounter';total=.98;hitAt=.18;opts={...opts,strike:0};}
 if(name==='counterTakedown'){name='broxCounterSlam';total=.80;hitAt=.34;opts={...opts,damage:30};}
 if(name==='knee'){name='broxBody';total=.43;hitAt=.18;opts={...opts,damage:a.hold?.strikes>=2?20:10,bodyIndex:3,grabFinish115:(a.hold?.strikes||0)>=2};}
 if(name==='dodge'){total=.32;a.inv=.30;}
 if(name==='sweep'){total=.57;hitAt=.23;opts={...opts,damage:18,reach:82};}
 }
 if(a===this.player&&a.type==='reina'&&name==='palmStrike')opts={...opts,damage:29};
 return base.start.call(this,a,name,total,hitAt,opts);};
P.holdAction=function(key,input={}){const p=this.player,h=p.hold;if(p.type!=='broxton'||!h)return base.holdAction.call(this,key,input);
 if(p.act?.name==='broxBody'&&key==='attack')return true;
 if(key==='grab'&&h.counter&&!p.act)return this.holdAction('attack',input.left||input.right?input:{...input,left:p.dir<0,right:p.dir>0});
 if(key!=='attack'||p.act||p.cd>0)return base.holdAction.call(this,key,input);
 const e=h.victim;const relative=((input.right?1:0)-(input.left?1:0))*p.dir;h.idle=0;e.guarding=0;
 if(!relative){if(h.counter){this.start(p,h.counterKind==='leg'?'counterTakedown':'counterCombo',1,.2,{victim:e});p.inv=1;}else this.start(p,'knee',.43,.18,{victim:e});return true;}
 const name=h.rear?(relative<0?'broxGerman':'broxNelson'):(relative<0?'broxSpinThrow':'broxClothesline'),total=name==='broxGerman'?1.46:name==='broxNelson'?1.06:name==='broxSpinThrow'?.76:.76,hitAt=name==='broxGerman'?.60:name==='broxNelson'?.62:name==='broxSpinThrow'?.36:.37;
 this.start(p,name,total,hitAt,{victim:e,throwDir:relative<0?-p.dir:p.dir,fromX:p.x,fromY:p.y});p.inv=total+.06;return true;};
P.release=function(a){if(a.hold){a.hold.victim.grappleZ=0;a.hold.victim.grappleAngle=0;a.hold.victim.grapplePivot=0;}a.grappleZ=0;a.grappleAngle=0;a.grapplePivot=0;return base.release.call(this,a);};
P.event=function(type,data={}){if(this.player?.type==='broxton'){if(type==='sword')type='powerSpecial';if(type==='blitz')type='powerBlitz';if(type==='hit'&&data.move==='knee')data={...data,move:this.player.hold?.strikes>=2?'headbutt':'bodyPunch'};}return base.event.call(this,type,data);};
P.fx=function(x,y,label,color){if(this.player?.type==='broxton'){label=({'CRESCENT SPIN':'IRON CYCLONE','SILENT HORIZON':'SKYBREAKER','SKY DIVE':'BODY PRESS','THUNDER PALM':'RISING BREAKER'})[label]||label;}return base.fx.call(this,x,y,label,color);};
P.settledDefeats=function(){if(this.player?.type==='broxton'&&['broxGerman','broxPowerSlam','broxNelson'].includes(this.player.act?.name))return false;return base.settledDefeats.call(this);};
P.advanceHeroActor=function(a,dt){const p=this.player;if(p.type==='broxton'&&a.type==='enforcer'&&a.act&&['oneTwo','hook','frontKick'].includes(a.act.name)&&(p.blocking||this.time<=p.catchUntil)&&!p.hold&&!p.down&&!a.heldBy&&Math.abs(a.y-p.y)<28){const side=Math.sign(a.x-p.x)||p.dir;const spacing=a.act.name==='frontKick'?150:118;if(Math.abs(a.x-p.x)<spacing)a.x=clamp(p.x+side*spacing,this.bounds.min,this.bounds.max);a.dir=-side;a.act.reach=Math.max(a.act.reach||0,a.act.name==='frontKick'?170:140);}if(a===this.player&&a.type==='broxton')a.gaitRun=clamp((a.gaitRun||0)+(a.running?1:-1)*dt*5,0,1);if(a.recoil){const r=a.recoil;r.t+=dt;if(a.hp>0&&!a.down&&!a.flight&&!a.heldBy){a.x=clamp(r.from+(r.to-r.from)*Math.min(1,r.t/r.total),this.bounds.min,this.bounds.max);}if(r.t>=r.total||a.down||a.flight||a.heldBy)a.recoil=null;}};
P.advanceHeroAction=function(a,act,dt){const p=this.player;if(a!==p||p.type!=='broxton')return;const n=act.name,t=act.t;
 if(n==='broxDash'&&t>=.10&&t<.39){p.x=clamp(p.x+p.dir*540*dt,this.bounds.min,this.bounds.max);this.hitPlayerAttack(act);}
 if(n==='broxGrabDash'&&t>=.10&&t<.36){p.x=clamp(p.x+p.dir*285*dt,this.bounds.min,this.bounds.max);this.hitPlayerAttack(act);}
 if(n==='combo'&&t>=act.hitAt&&t<act.hitAt+.14)this.hitPlayerAttack(act);
 if(n==='broxSpin'&&t>=.20&&t<.58)this.hitPlayerAttack(act);
 if(n==='broxHeel'&&t>=.10&&t<.34)this.hitPlayerAttack(act);
 if(n==='broxClothesline'&&act.pair&&t>=act.hitAt)p.x=clamp(act.fromX+p.dir*(58+12*clamp((t-act.hitAt)/.18,0,1)),this.bounds.min,this.bounds.max);
 if(n==='broxUpper'&&t<.25)p.x=clamp(p.x+p.dir*180*dt,this.bounds.min,this.bounds.max);
 if(n==='broxAirPress'){const d=act.dive;if(d){const u=clamp(t/act.hitAt,0,1);p.x=clamp(d.fromX+(d.toX-d.fromX)*u,this.bounds.min,this.bounds.max);p.y=clamp(d.fromY+(d.toY-d.fromY)*u,this.groundBounds.min,this.groundBounds.max);}if(t>=act.hitAt)p.jump=0;}
 if(n==='broxElbow'&&t>=act.hitAt)p.jump=0;
 if(n==='broxGerman'&&act.released&&t>=.58){const v=act.victim,to=(v.flight?.to??v.fallTo??v.x)+p.dir*24;p.x=clamp(act.fromX+(to-act.fromX)*clamp((t-.58)/.36,0,1),this.bounds.min,this.bounds.max);}
 const v=p.hold?.victim;if(!v||act.victim!==v)return;const u=clamp(t/act.hitAt,0,1);
 if(n==='broxSpinThrow'){v.x=clamp(p.x+p.dir*68*Math.cos(u*Math.PI),this.bounds.min,this.bounds.max);v.y=p.y+Math.sin(u*Math.PI)*9;v.grappleZ=Math.sin(u*Math.PI)*25;v.grappleAngle=-u*Math.PI*.35;}
 if(n==='broxGerman'){v.x=clamp(p.x+p.dir*(68-u*114),this.bounds.min,this.bounds.max);v.y=p.y;v.grappleZ=Math.sin(u*Math.PI*.75)*75;v.grappleAngle=-u*Math.PI*.8;}
 if(n==='broxNelson'||n==='broxPowerSlam'){const jump=n==='broxPowerSlam';if(jump)p.grappleZ=Math.sin(u*Math.PI)*55;v.x=clamp(p.x+p.dir*(68*(1-u)+40*u-(jump?75:20)*Math.sin(u*Math.PI)),this.bounds.min,this.bounds.max);v.y=p.y;v.grapplePivot=60;v.grappleZ=(jump?p.grappleZ:0)+Math.sin(u*Math.PI)*(jump?90:65)-60*Math.pow(u,6);v.grappleAngle=Math.min(1,u*2)*Math.PI*.5;}
 if(n==='broxClothesline'&&!act.pair){p.x=clamp(act.fromX+p.dir*50*u,this.bounds.min,this.bounds.max);v.x=p.x+p.dir*68;v.y=p.y;}
};
P.finishHeroAction=function(a,act){if(a!==this.player||a.type!=='broxton')return;if(act.name==='broxDash')a.blitzRecovery=0;a.grappleZ=0;};
P.broxtonArea=function(x,y,damage,range=100,except=null){for(const e of this.enemies){if(e===except||e.hp<=0||e.down||e.flight||e.dormant||Math.hypot(e.x-x,(e.y-y)*1.7)>range)continue;this.damage(e,damage,Math.sign(e.x-x)||this.player.dir,true,{attacker:this.player});}for(const prop of this.props)if(prop.hp>0&&Math.abs(prop.x-x)<range&&Math.abs(prop.y-y)<40)this.toppleProp(prop,this.player.dir);};
P.broxtonLaunch=function(e,dir,damage,style,z=0,distance=150){const x=e.x,y=e.y,rotation=e.grappleAngle||0;if(!this.launch(e,dir,damage,10,style))return false;if(e.flight){e.flight.startZ=z;e.flight.total=.30;e.flight.to=clamp(x+dir*distance,this.bounds.min,this.bounds.max);e.flight.startAngle=rotation;e.flight.descending=true;}e.grappleZ=0;e.grappleAngle=0;return true;};
P.hitPlayerAttack=function(a){const p=this.player;if(p.type!=='broxton')return base.hitPlayerAttack.call(this,a);
 if(a.name==='broxBody'){const h=p.hold,e=h?.victim;if(!e||e!==a.victim)return;const final=!!a.grabFinish115;e.inv=0;if(final)this.release(p);this.damage(e,a.damage,p.dir,final,{force:true,grab:true,attacker:p});if(final){e.fallFrom=e.x;e.fallTo=clamp(e.x+p.dir*125,this.bounds.min,this.bounds.max);e.noBounce=true;this.shake=Math.max(this.shake,7);}else if(p.hold){p.hold.strikes++;p.hold.idle=0;}this.event('hit',{move:final?'uppercut':'headbutt'});return;}
 if(a.name==='groundKick'){const e=a.target;if(e&&e.down&&!e.groundHit&&Math.abs(e.x-p.x)<85){e.groundHit=true;e.inv=0;this.damage(e,16,p.dir,false,{ground:true,attacker:p});this.event('stomp');}return;}
 if(a.name==='broxGrabDash'){if(p.act!==a||p.hold)return;const e=this.enemies.filter(e=>e.hp>0&&!e.dormant&&!e.heldBy&&(e.x-p.x)*p.dir>-5&&(e.x-p.x)*p.dir<58&&Math.abs(e.y-p.y)<22).sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x))[0];if(e&&this.acquireGrab(e,false,false,true)){if(root.NeonCombat.Grab223?.deferDash(this,e))return;this.start(p,'broxPowerSlam',1.14,.70,{victim:e,damage:47});p.inv=1.2;this.event('powerGrab');}return;}
 if(['broxSpinThrow','broxClothesline','broxGerman','broxNelson','broxPowerSlam','broxCounterSlam'].includes(a.name)){
 const e=a.victim;if(!e)return;
 if(a.name==='broxGerman'&&a.released){if(e.hp>0&&e.down){e.inv=0;this.damage(e,12,p.dir,false,{force:true,ground:true,attacker:p});e.downAge=Math.max(.32,e.downAge);this.event('stomp');}return;}
 if(p.hold?.victim!==e)return;
 if(a.name==='broxSpinThrow'){this.broxtonLaunch(e,-p.dir,24,a.name,25,175);return;}
 if(a.name==='broxGerman'){this.broxtonLaunch(e,-p.dir,24,a.name,Math.max(30,e.grappleZ||0),80);a.released=true;a.done=false;a.hitAt=1.02;return;}
 const damage=a.name==='broxPowerSlam'?47:a.name==='broxNelson'?46:a.name==='broxCounterSlam'?30:26,ex=e.x,ey=e.y;this.release(p);e.inv=0;this.damage(e,damage,p.dir,true,{force:true,grab:true,attacker:p});e.grappleZ=0;e.grappleAngle=0;e.noBounce=true;e.downAge=.32;e.fallFrom=e.x;e.fallTo=e.x;this.land(e);this.broxtonArea(ex,ey,a.name==='broxClothesline'?22:14,a.name==='broxClothesline'?126:105,e);p.grappleZ=0;this.shake=Math.max(this.shake,8);this.event('powerSlam');return;
 }
 if(a.name==='broxCounter'){const e=a.victim;if(p.hold?.victim!==e||e.hp<=0)return;e.inv=0;const final=a.strike===2;if(final){this.release(p);this.damage(e,18,p.dir,true,{force:true,grab:true,attacker:p});}else this.damage(e,10,p.dir,false,{force:true,grab:true,attacker:p});a.strike++;if(!final&&e.hp>0){a.done=false;a.hitAt=a.strike===1?.40:.66;}return;}
 if(['broxDash','broxSpin','broxAirPress','broxUpper','broxHeel','broxSuperman','broxElbow'].includes(a.name)){
 const radial=['broxSpin','broxAirPress'].includes(a.name);for(const e of this.enemies){if(a.hits.has(e.id)||e.hp<=0||e.down||e.flight||e.entry)continue;const dx=(e.x-p.x)*p.dir,near=radial?Math.hypot(e.x-p.x,(e.y-p.y)*1.6)<112:dx>(a.name==='broxHeel'?-20:-12)&&dx<a.reach&&Math.abs(e.y-p.y)<(a.name==='broxHeel'?28:27);if(!near)continue;const guarded=e.guarding>0,connected=this.damage(e,a.damage,radial?(Math.sign(e.x-p.x)||p.dir):p.dir,a.knock,{attacker:p,airborne:p.jump>0});if(guarded)a.hits.add(e.id);if(connected){a.hits.add(e.id);if(a.name==='broxDash'&&!e.down&&e.hp>0){this.unlink(e);this.knockDown(e,p.dir,1.45);this.event('knockdown',{player:false});}if(a.name==='broxSuperman'&&!e.down&&!e.act)e.stun=Math.max(e.stun,.70);this.event('powerHit');}}
 for(const prop of this.props)if(prop.hp>0&&Math.abs(prop.x-p.x)<(radial?110:a.reach)&&Math.abs(prop.y-p.y)<40)this.toppleProp(prop,p.dir);
 return;}
 return base.hitPlayerAttack.call(this,a);};
N.HEROES=HEROES;root.NeonHeroes={HEROES};if(typeof module!=='undefined')module.exports=root.NeonHeroes;
})(typeof window!=='undefined'?window:globalThis);
