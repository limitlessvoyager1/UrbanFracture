
(function(N){'use strict';const P=N.Brawler.prototype,command=P.command;
P.command=function(key,input={}){const p=this.player;
 if(p.type==='broxton'&&['attack','special'].includes(key)&&!p.down&&!p.heldBy&&!p.stun&&!p.shock&&p.hp>0&&this.playing&&!this.transition&&p.wakeSafeUntil189>this.time&&p.wakeSafeUntil189-this.time<=.24){this.buffer={key,input:{...input,attack:false},until:p.wakeSafeUntil189+.24,earliest:p.wakeSafeUntil189,wake189:true};return;}
 const combo=p.act?.name==='broxCombo179'||p.act?.name==='combo'||p.act?.forest125&&p.act.kind125==='combo'||p.act?.niko185&&p.act.kind185==='combo'||p.act?.orion205&&p.act.kind205==='combo';
 if(key==='attack'&&!combo&&!p.hold&&!p.heldBy&&!p.jump&&!p.down&&!p.flight&&!p.stun&&!p.shock&&!p.standingLock&&p.hp>0&&this.playing&&!this.transition&&!this.uptownFade&&!this.finScene&&!this.alleyIntro&&!this.bossEnding&&!this.levelClear&&(p.act||p.cd>0||p.type==='forest'&&p.forestComboReady125>this.time&&this.time>p.blitzUntil)){this.buffer={key,input:{...input,attack:false},until:this.time+.24,earliest:p.type==='forest'&&this.time>p.blitzUntil?p.forestComboReady125||0:0,blitz:this.time<=p.blitzUntil,blitzDir:p.blitzDir};return;}
 if(key==='special'&&!p.hold&&!p.heldBy&&!p.jump&&!p.down&&!p.flight&&!p.stun&&!p.shock&&!p.standingLock&&p.hp>0&&this.playing&&!this.transition&&!this.uptownFade&&!this.finScene&&!this.alleyIntro&&!this.bossEnding&&!this.levelClear){
  if(['Charging','FullyCharged','Releasing'].includes(p.charge130?.state))N.Charge130.cancel(this,'special input');
  if(p.act||p.cd>0||p.specialCd>0){this.buffer={key,input:{...input},until:this.time+.24};return;}
 }
 return command.call(this,key,input);
};N.Input226={bufferSeconds:.24};})(NeonCombat);
