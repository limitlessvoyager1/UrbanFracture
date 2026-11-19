/* Assignment 2 only. No damage, grapple, knockback, wake-up or AI modifiers. */
(function(r){'use strict';const N=r.NeonCombat,P=N.Brawler.prototype;
const config=Object.freeze({energy:50,duration:10,cooldown:40,taunt:.9,fade:.35});
const taunts=Object.freeze(["You're looking at the main event, losers!","Who's ready to get embarrassed?","Come on! Make me famous!","Somebody ring the bell!","I've beaten tougher people in training!","Get in line!"]);
const states=new WeakMap();
function state(g){let s=states.get(g);if(!s||s.owner!==g.player||g.time<s.lastTime){s={owner:g.player,activeUntil:0,readyAt:0,startedAt:-100,fadeAt:-100,serial:0,streak:0,lastTaunt:-1,subtitle:null,lastTime:g.time};states.set(g,s);}return s;}
function active(g){const s=state(g);return s.owner.type==='nova'&&s.owner.hp>0&&g.time<s.activeUntil;}
function free(g){return N.UniqueAction251.free(g)&&!g.levelClear&&!g.uptownEnd&&!N.Lab149?.cinematic(g)&&!N.Sterling152?.locked(g)&&!g.destination183&&!g.player.sticky166&&!g.player.reversalVictim198&&!['Charging','FullyCharged','Releasing'].includes(g.player.charge130?.state);}
function begin(g){const p=g.player,s=state(g);if(p.type!=='nova'||!free(g)||active(g)||g.time<s.readyAt||p.defense<config.energy)return false;
 // Start first: rejected action admission cannot spend the meter or start timers.
 const previous=p.act;g.start(p,'novaShowstopper435',config.taunt,Infinity,{showstopper435:true,done:true,dir435:p.dir,plane435:p.y});
 if(!p.act?.showstopper435||p.act===previous)return false;
 N.Energy316.change(g,-config.energy,'Showstopper intrinsic activation',{move:'novaShowstopper435',hpOverflow:0});
 s.activeUntil=g.time+config.duration;s.readyAt=g.time+config.cooldown;s.startedAt=g.time;s.fadeAt=-100;s.streak=0;s.serial++;
 const choices=taunts.map((_,i)=>i).filter(i=>i!==s.lastTaunt),index=choices[Math.floor(Math.random()*choices.length)];s.lastTaunt=index;s.subtitle={text:taunts[index],until:g.time+2.8,id:s.serial};
 p.walk=0;p.running=false;p.runDir=0;g.event('showstopper435',{serial:s.serial,text:s.subtitle.text});return true;}
N.UniqueAction251.register('nova',begin);
const command=P.command;P.command=function(k,i={}){if(this.player.act?.showstopper435&&['attack','jump','dodge','grab','special','counter','block','pickup','unique'].includes(k))return false;return command.call(this,k,i);};
const advance=P.advanceHeroAction;P.advanceHeroAction=function(p,a,dt){if(p===this.player&&a.showstopper435){p.dir=a.dir435;p.y=a.plane435;p.walk=0;p.running=false;return;}return advance.call(this,p,a,dt);};
const finish=P.finishHeroAction;P.finishHeroAction=function(p,a){if(p===this.player&&a.showstopper435){p.walk=0;p.running=false;p.cd=Math.max(p.cd,.08);return;}return finish.call(this,p,a);};
const tick=P.tick;P.tick=function(dt,i={}){const s=state(this),p=this.player,a=p.act;if(p.hp<=0){s.activeUntil=0;s.fadeAt=-100;s.subtitle=null;s.streak=0;}const out=tick.call(this,dt,a?.showstopper435?{...i,left:false,right:false,up:false,down:false,run:false,attack:false,block:false}:i);const now=state(this);if(now!==s)return out;
 if(p.hp<=0||p.type!=='nova'){s.activeUntil=0;s.fadeAt=-100;s.subtitle=null;s.streak=0;}else if(s.activeUntil>0&&this.time>=s.activeUntil){s.fadeAt=s.activeUntil;s.activeUntil=0;s.streak=0;this.event('showstopperExpired435');}
 if(s.subtitle&&this.time>=s.subtitle.until)s.subtitle=null;s.lastTime=this.time;return out;};
const reset=P.reset;P.reset=function(...args){states.delete(this);return reset.apply(this,args);};
function debug(g){const s=state(g);return{assignment:2,active:active(g),remaining:Math.max(0,s.activeUntil-g.time),cooldown:Math.max(0,s.readyAt-g.time),streak:s.streak,throwBonus:null,grappleEnhancementsImplemented:false,taunt:g.player.act?.showstopper435?g.player.act.t:null,energy:g.player.defense,serial:s.serial};}
N.Showstopper435=Object.freeze({config,taunts,state,active,begin,free,debug});
})(globalThis);
