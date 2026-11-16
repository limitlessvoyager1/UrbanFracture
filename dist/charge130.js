
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype,old={};for(const k of ['reset','attackInput','cancelCharge','command','tick','advanceHeroAction','finishHeroAction','damage','acquireGrab'])old[k]=P[k];
const C={seconds:2,anticipation:.28,colors:{reina:'#65c8ff',nova:'#c48aff',broxton:'#ffe16b',forest:'#a4e184'},names:{reina:'TORNADO KICK',nova:'HYPE MODE',broxton:'RISING BREAKER',forest:'GUNNER MAUL'},walk:{reina:.6,nova:0,broxton:1,forest:.6}};
const adapters=new Map();
const ordinary=a=>!!adapters.get(a?.hero257)?.ordinary?.(a)||a?.orion205&&a.kind205==='combo'||a?.niko185&&a.kind185==='combo'||a?.name==='combo'||a?.forest125&&a.kind125==='combo',live=q=>q&&['Charging','FullyCharged','Releasing'].includes(q.state),scene=g=>g.transition||g.uptownFade||g.uptownEnd||g.finScene||g.alleyIntro||g.bossEnding||g.levelClear;
function seconds(p){if(['reina','forest','niko'].includes(p.type))return 1;if(adapters.has(p.type))return adapters.get(p.type).seconds;return p.type==='orion'||p.type==='niko'||p.type==='forest'||p.type==='broxton'&&N.Broxton179?3:C.seconds;}
function state(p){return p.charge130??={state:'Idle',held:false,age:0,ready:false,releaseReceived:false,cue:false,stored:false};}
function clearOld(p){p.attackGesture=null;p.dragonCharge121=null;p.forestCharge125=null;p.dragonLatch121=false;p.forestChargeLatch125=false;}
function clearPose(g){const p=g.player;if(p.act?.name==='chargeHold130')p.act=null;if(p.forestPose125?.charge130)p.forestPose125=null;}
function cancel(g,reason='canceled'){const p=g.player,q=state(p);if(live(q)){q.state='Canceled';q.reason=reason;q.changedAt=g.chargeClock130||0;q.ready=false;q.stored=false;q.age=0;q.action=null;q.held=false;g.event('chargeCanceled130',{hero:p.type,reason});}clearPose(g);clearOld(p);p.blitzUntil=-1;p.lastTapAt=-10;p.prevMoveX=0;p.chargeLatch130=!!p.physicalAttack;p.novaQueued=false;g.buffer=null;}
function press(g,input){const p=g.player;g.chargeDispatch130=true;p.forestPress125=true;try{if(p.type==='nova'&&p.act?.name==='combo'){if(p.act.combo<5)p.novaQueued=true;}else g.command('attack',input);}finally{g.chargeDispatch130=false;p.forestPress125=false;}}
function available(g){return !N.Companion126||N.Companion126.available(g);}
function store(g,q,reason){clearPose(g);q.state='FullyCharged';q.ready=true;q.stored=true;q.held=false;q.reason=reason;g.fx(g.player.x,g.player.y-150,reason+' · CHARGE STORED',C.colors[g.player.type]);g.event('chargeUnavailable130',{hero:g.player.type,reason});}
function execute(g,q){const p=g.player;if(p.act&&p.act.name!=='chargeHold130'||p.cd>0)return false;clearPose(g);clearOld(p);p.blocking=false;p.catchUntil=-1;p.novaQueued=false;g.buffer=null;
 if(adapters.has(p.type)){if(!adapters.get(p.type).execute(g))return false;}
 else if(p.type==='forest'){if(!available(g)){store(g,q,'GUNNER UNAVAILABLE');return false;}const v=N.Combat134?N.Combat134.target(g):N.Forest125.target(g,true);if(!v||Math.abs(v.x-p.x)>=340){store(g,q,'NO TARGET AHEAD');return false;}if(N.Maul175){const reason=N.Maul175.issue(g,v);if(reason){store(g,q,reason);return false;}}else{N.Forest125.begin(g,'maul',90,{victim:v});g.event('gunnerCommand125');}}
 else if(p.type==='orion'){if(!N.Orion205?.repair(g)){cancel(g,'SYSTEM REPAIR USED THIS LIFE');return false;}}
 else if(p.type==='niko'){if(!N.Niko185?.beginPalms(g))return false;}
 else if(p.type==='reina')N.Tornado130.begin(g);
 else if(p.type==='broxton'){if(!N.Broxton179){if(p.palmCd>0){store(g,q,'UPPERCUT COOLDOWN');return false;}p.palmCd=5;g.start(p,'palmStrike',.72,.18,{damage:29,reach:108,knock:true});}else if(!N.Broxton179.beginArmor(g)){store(g,q,N.Broxton179?.armor(g)?'IRON WILL ACTIVE':'IRON WILL COOLDOWN');return false;}}
 else if(p.type==='nova'){if(g.time<(p.hypeUntil||0)){store(g,q,'HYPE ALREADY ACTIVE');return false;}if(!N.HYPE_TEST_UNLIMITED&&p.hypeUsed){cancel(g,'HYPE USED THIS LIFE');return false;}p.hypeUsed=true;p.hypeUntil=g.time+10;p.hp=Math.min(p.maxHp,p.hp+p.maxHp*.20);p.walkSpeed=256;p.runSpeed=363;p.airSpeed=350;g.start(p,'hypeFlex',.85,99,{});g.fx(p.x,p.y-140,'HYPE MODE!','#ffe278');}
 else return false;
 q.state='Executing';q.action=p.act;q.lastDuration=q.age;q.age=0;q.ready=false;q.stored=false;q.reason=null;q.held=false;p.act.charged130=true;g.event('chargeRelease130',{hero:p.type,move:C.names[p.type]});return true;}
P.reset=function(...args){const r=old.reset.apply(this,args);this.chargeClock130=0;state(this.player);return r;};
P.attackInput=function(down,input={}){const p=this.player;if(!!down===!!p.physicalAttack)return;if(down&&p.type==='broxton'&&this.time>p.blitzUntil)this.directionInput((input.right?1:0)-(input.left?1:0));p.physicalAttack=!!down;const q=state(p);q.held=!!down;
 if(!down){p.chargeLatch130=false;clearOld(p);if(q.state==='Canceled'){q.held=false;return;}if(!live(q))return;q.releaseReceived=true;q.releaseAt=this.chargeClock130||0;if(q.age+1e-7>=seconds(p)&&q.ready){q.state='Releasing';execute(this,q);}else{clearPose(this);q.state='Idle';q.age=0;q.ready=false;q.stored=false;}return;}
 if(p.chargeLatch130)return;if(!this.playing||p.hp<=0||scene(this))return;
 if(q.stored){q.held=true;q.reason=null;return;}
 const eligible=!p.stun&&!p.down&&!p.jump&&!p.hold&&!p.heldBy&&(!p.blocking||p.type==='reina'&&!input.block)&&!input.block&&this.time>p.blitzUntil&&(!p.act||ordinary(p.act)||p.type==='reina'&&!p.act.charged130)&&!(p.type==='nova'&&(this.time<(p.hypeUntil||0)||!N.HYPE_TEST_UNLIMITED&&p.hypeUsed));
 p.attackCanceled=false;press(this,{...input,attack:true});clearOld(p);
 if(!eligible)return;Object.assign(q,{state:'Charging',held:true,pressedAt:this.chargeClock130||0,age:0,ready:false,cue:false,releaseReceived:false,stored:false,action:null,reason:null,zone:this.zone,route:[this.uptown,this.hotelRoute,this.hotelKitchen].join('|')});};
P.cancelCharge=function(){cancel(this,'input canceled');};
P.command=function(key,input={}){const p=this.player,q=state(p);if(live(q)){
 if(['jump','dodge','grab','special'].includes(key)){cancel(this,key);return old.command.call(this,key,input);}
 if(q.stored&&!q.held&&['block','counter','special'].includes(key))cancel(this,key);
 else if(['block','counter','special'].includes(key))return;
 if(key==='attack'&&!this.chargeDispatch130)return;
 }if(key==='attack'&&p.chargeLatch130&&p.physicalAttack&&!this.chargeDispatch130)return;return old.command.call(this,key,input);};
P.acquireGrab=function(...args){if(live(state(this.player)))cancel(this,'grab');return old.acquireGrab.apply(this,args);};
P.damage=function(p,...args){const r=old.damage.call(this,p,...args);if(p===this.player&&r&&live(state(p))&&(p.hp<=0||p.stun||p.down||p.heldBy))cancel(this,'interrupted');return r;};
P.advanceHeroAction=function(p,a,dt){if(p===this.player&&a.name==='chargeHold130'){const i=this.input||{},dx=(i.right?1:0)-(i.left?1:0),dy=(i.down?1:0)-(i.up?1:0),len=Math.hypot(dx,dy)||1,s=(p.walkSpeed||185)*C.walk[p.type];p.blocking=false;p.catchUntil=-1;p.runDir=0;p.running=false;const bx=p.x,by=p.y;if(dx)p.dir=Math.sign(dx);p.x=N.clamp(p.x+dx/len*s*dt,this.bounds.min,this.bounds.max);p.y=N.clamp(p.y+dy/len*s*.65*dt,this.groundBounds.min,this.groundBounds.max);p.walk=s&&(dx||dy)?1:0;const travel=Math.hypot(p.x-bx,(p.y-by)/.65);p.walk=travel>1e-7?1:0;if(p.walk)p.walkPhase=(p.walkPhase+travel/90)%1;return;}return old.advanceHeroAction?.call(this,p,a,dt);};
P.finishHeroAction=function(p,a){const r=old.finishHeroAction?.call(this,p,a);if(p===this.player&&a.charged130){const q=state(p);q.state='Idle';q.action=null;q.age=0;q.ready=false;}return r;};
P.tick=function(dt,input={}){const p=this.player,q=state(p);if(!!input.attack!==!!p.physicalAttack)this.attackInput(!!input.attack,input);
 if(!this.playing)return old.tick.call(this,dt,input);
 if(this.chargeHitstop130>0){this.chargeHitstop130=Math.max(0,this.chargeHitstop130-dt);return;}
 const step=Math.min(.04,dt);this.chargeClock130=(this.chargeClock130||0)+step;
 if(live(q)){
 if(p.hp<=0||p.stun||p.down||p.jump||p.heldBy||p.hold||scene(this)||q.zone!==this.zone||q.route!==[this.uptown,this.hotelRoute,this.hotelKitchen].join('|'))cancel(this,'state changed');
 else{
 if(q.held&&!q.stored)q.age=Math.max(0,this.chargeClock130-q.pressedAt);
 if(q.age+1e-7>=seconds(p)&&!q.cue){q.ready=q.cue=true;q.state=q.releaseReceived?'Releasing':'FullyCharged';q.pulseAt=this.chargeClock130;q.alertUntil=this.time+.45;this.event('chargeReady130',{hero:p.type});this.effects.push({kind:'chargeReady130',x:p.x,y:p.y-75,life:.32,total:.32,color:C.colors[p.type]});}
 if(q.held&&!q.stored&&q.age>=C.anticipation&&!p.act&&p.cd<=0){this.start(p,'chargeHold130',999,999);p.blocking=false;p.catchUntil=-1;this.buffer=null;}
 if(p.type==='nova'&&q.ready&&q.held&&!q.stored){q.state='Releasing';execute(this,q);}else if(q.state==='Releasing')execute(this,q);
 if(p.type==='nova'&&q.held){for(const e of this.enemies)if(e.hp>0&&!e.dormant&&!e.down&&!e.flight&&!e.heldBy&&Math.abs(e.x-p.x)<420){e.think=0;e.cd=Math.min(e.cd,.12);e.guarding=0;e.aggroX=p.x;e.flanking=false;}}
 }}
 if(live(q)){input={...input,run:false};p.running=false;p.runDir=0;p.blitzUntil=-1;p.lastTapAt=-10;}const planted226=p.type==='nova'&&live(q),px226=p.x,py226=p.y;if(planted226){input={...input,left:false,right:false,up:false,down:false,run:false};p.walk=0;}clearOld(p);const r=old.tick.call(this,dt,input);if(planted226&&live(q)&&!p.stun&&!p.down&&!p.heldBy){p.x=px226;p.y=py226;p.walk=0;p.running=false;}
 if(p.act?.name==='chargeHold130'&&!live(q))clearPose(this);
 if(live(q)&&(p.stun||p.down||p.heldBy||p.hp<=0||scene(this)))cancel(this,'interrupted');
 if(q.action){if(p.act!==q.action){N.Tornado130?.clear(this,q.action);q.state='Idle';q.action=null;}else if(q.action.t>=(p.type==='reina'?38/60:p.type==='forest'?66/60:p.type==='nova'?.6:.4))q.state='Recovering';}
 if(p.type==='forest'&&q.ready&&q.held&&this.time<q.alertUntil&&available(this)&&!this.gunner125?.ai126?.task)this.gunner125.state='alert';
 if(q.state==='Canceled'&&!p.physicalAttack&&this.chargeClock130-q.changedAt>.2)q.state='Idle';return r;};
function debug(g){const p=g.player,q=state(p);return{character:p.name,attackHeld:!!p.physicalAttack,holdDuration:q.age,percent:Math.min(100,q.age/seconds(p)*100),state:q.state,fullCharge:q.ready,releaseReceived:q.releaseReceived,animation:p.act?.name||'idle',recovery:q.state==='Recovering',stored:q.stored,reason:q.reason||null,lastDuration:q.lastDuration||0};}
N.Charge130={config:C,adapters,register(id,a){adapters.set(id,a);C.colors[id]=a.color;C.names[id]=a.name;C.walk[id]=a.walk??0;},attackInput:P.attackInput,seconds,state,cancel,execute,debug};
})(typeof window!=='undefined'?window:globalThis);
