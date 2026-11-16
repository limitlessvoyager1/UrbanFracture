
(function(root){'use strict';const N=root.NeonCombat,{Brawler,clamp}=N,P=Brawler.prototype;
const old={};for(const k of ['command','counterCost','catchPunch','advanceHeroAction','finishHeroAction','hitPlayerAttack','ai','enemyAct'])old[k]=P[k];
const heavy=e=>['enforcer','bouncer','boss','security','gangster'].includes(e.type);
const kick=a=>['kick','frontKick','roundhouse','chainKick','leroyKick','copLeap'].includes(a?.name);
const knife=(e,a)=>!kick(a)&&!['hook','oneTwo','marcusCombo','dashPunch','leroyPunch','combo','chainFist'].includes(a?.name)&&(e.weapon==='knife'||['knife','knifeSlash','robberStab','knifeClinch'].includes(a?.name));
P.counterCost=function(e,a=e.act){return heavy(e)||knife(e,a)||!!e.weapon&&!kick(a)?80:40;};
P.command=function(key,input={}){const p=this.player;if(key==='counter'&&p.type==='reina'){
 const can=this.playing&&p.hp>0&&!this.transition&&!this.alleyIntro&&!this.bossEnding&&!this.finScene&&!p.blocking&&!input.block&&!this.input.block&&!p.guardBreak&&!p.jump&&this.isFree(p)&&!p.hold&&p.defense>=10&&p.counterCd<=0&&p.parryCd<=0;
 const facing=p.dir;old.command.call(this,key,input);if(can&&p.catchUntil>this.time){p.counterChoice=((input.right?1:0)-(input.left?1:0))*facing;p.counterFacing=facing;p.counterCd=.95;p.blitzUntil=-1;p.lastTapAt=-10;p.runDir=0;}return;
 }return old.command.call(this,key,input);};
P.catchPunch=function(e,a=e.act){if(['leroyKnuckles102','leroyPunch','uppercut'].includes(a?.name))a={...a,name:'hook'};const p=this.player,active=this.time<=p.catchUntil;
 if(heavy(e)&&e.hp>e.maxHp*.50){if(active&&this.time>(p.counterGateHintUntil||0)){p.counterGateHintUntil=this.time+1;this.fx(p.x,p.y-130,'WEAKEN TO 50% HP','#ffcf83');}return false;}
 if(p.type==='reina'&&active)p.dir=p.counterFacing||p.dir;
 const isKnife=knife(e,a),isKick=kick(a),choice=p.counterChoice||0;if(isKnife&&!['knife','robberStab'].includes(a?.name))return false;
 const heldWeapon=e.weapon,unarmed=isKick||['hook','oneTwo','marcusCombo','dashPunch','leroyPunch','combo'].includes(a?.name);let caught;if(unarmed)e.weapon=null;try{caught=old.catchPunch.call(this,e,a);}finally{if(unarmed)e.weapon=heldWeapon;}if(!caught)return false;
 if(p.type!=='reina'||!p.hold?.counter)return true; // Non-knife weapons retain their automatic behind-the-attacker evade.
 const label=isKnife?'KNIFE DISARM':isKick?(choice>0?'FOREARM COUNTER':'REAR GRAB COUNTER'):(choice>0?'COMBO COUNTER':'HIP TOSS COUNTER');
 this.fx(p.x,p.y-150,label,'#fff0a0');p.counterCue=.85;p.holdBuffer=null;p.attackGesture=null;p.attackCanceled=true;this.buffer=null;
 if(isKnife){e.weapon=null;e.disarmed=true;e.knifeRollDone=true;this.effects.push({kind:'droppedWeapon',weapon:'knife',x:e.x,y:e.y,life:6});this.start(p,'counterTakedown',.9,.55,{victim:e,damage:32,counterStyle:'knife'});}
 else if(isKick&&choice<=0){const to=clamp(e.x+p.dir*32,this.bounds.min,this.bounds.max);this.start(p,'gripSwitch',.58,99,{from:p.x,to,fromY:p.y,victim:e,switchRear:false,switchDir:p.dir,automaticRear:true});}
 else if(isKick&&choice>0){this.start(p,'counterForearm',.72,.25,{victim:e,from:p.x,to:clamp(e.x-p.dir*18,this.bounds.min,this.bounds.max),damage:34});}
 else if(isKick){this.start(p,'counterTakedown',.68,.30,{victim:e,damage:20,counterStyle:'sweep'});}
 else if(choice>0){this.start(p,'counterCombo',.86,.14,{victim:e,strike:0});}
 else if(choice<=0){this.start(p,'backThrow',.78,.30,{victim:e,damage:21,throwDir:-p.dir});}
 else{this.start(p,'counterTakedown',.70,.32,{victim:e,damage:24,counterStyle:'punch'});}
 p.inv=Math.max(p.inv,p.act.total+.08);return true;
};
P.advanceHeroAction=function(p,a,dt){old.advanceHeroAction?.call(this,p,a,dt);if(p!==this.player)return;if(a.name==='counterForearm'&&p.hold?.victim===a.victim&&a.t<=a.hitAt){const u=clamp(a.t/a.hitAt,0,1);p.x=a.from+(a.to-a.from)*u*u;}};
P.finishHeroAction=function(p,a){old.finishHeroAction?.call(this,p,a);if(p===this.player&&a.automaticRear&&p.hold){p.hold.counter=false;p.hold.idle=0;p.hold.age=0;p.holdBuffer=null;p.attackCanceled=true;}};
P.hitPlayerAttack=function(a){const p=this.player;if(a.name==='counterForearm'){const e=a.victim;if(p.hold?.victim!==e)return;e.inv=0;e.guarding=0;this.launch(e,p.dir,34,8,'counterForearm');this.event('powerHit');return;}return old.hitPlayerAttack.call(this,a);};
P.ai=function(e,dt){if(e.disarmed&&e.type==='knifeThug'&&!N.Street209?.is(e)){const type=e.type;e.type='thug';e.weapon=null;e.knifeRollDone=true;try{return old.ai.call(this,e,dt);}finally{e.type=type;}}return old.ai.call(this,e,dt);};
P.enemyAct=function(e,name,total,hitAt,opts={}){if(e.disarmed&&['knife','knifeSlash','knifeThrow','rearm','draw','robberStab','knifeClinch','stabHold','leroyGround'].includes(name)){name='hook';total=.9;hitAt=.32;opts={damage:12,reach:75,knock:true};}return old.enemyAct.call(this,e,name,total,hitAt,opts);};
root.NeonCounters={heavy,kick,knife};if(typeof module!=='undefined')module.exports=root.NeonCounters;
})(typeof window!=='undefined'?window:globalThis);
