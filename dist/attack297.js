/* Gate3 presentation plans read native clocks; they never alter combat definitions. */
(function(r){'use strict';const N=r.NeonCombat,P=N.Brawler.prototype,C=N.Continuity296,clamp=x=>Math.max(0,Math.min(1,x));
function frame(a){if(a.openerMiss210&&a.t>=a.recoveryStart210){const u=clamp((a.t-a.recoveryStart210)/Math.max(1/60,a.total-a.recoveryStart210));return u<.3?5:u<.72?6:7;}return C.attackFrame(a);}
function single(t,h,active,total){if(t<h){const u=clamp(t/Math.max(1/60,h));return u<.2?0:u<.5?1:u<.8?2:3;}if(t<h+active)return 4;const u=clamp((t-h-active)/Math.max(1/60,total-h-active));return u<.3?5:u<.72?6:7;}
function plan(f){const a=f.act;if(!a||f.hp<=0||f.down||f.flight||f.stun||f.shock||f.heldBy||f.heldWeapon248||a.weapon248)return null;
if(f.type==='reina'){
 if(a.reinaGrab279&&(f.hold===a.hold279||a.stage279===4&&a.released279)){const n=single(a.t,a.hitAt,7/60,a.total),stage=a.stage279,index=stage<3?16+n:stage===3?[24,24,25,26,27,26,25,24][n]:[28,28,28,29,30,31,31,24][n];return{family:'reinaExtra',index,phase:n,move:'held-'+stage,contact:n===4,pairedStrike:true};}
 if(C.paired(f)||f.jump&&a.name!=='blitzKick')return null;
 if(a.reina134){const n=a.combo-1,live=N.Audit135.reinaLive[n],i=single(a.t,live[0]/60,(live[1]-live[0])/60,a.total);return{family:'reina',index:n*8+i,phase:i,move:'combo-'+a.combo,contact:i===4};}
 if(a.name==='sword'){const i=single(a.t,a.hitAt,5/60,a.total);return{family:'reinaExtra',index:8+i,phase:i,move:a.name,contact:i===4};}
 if(a.name==='dashSword'){const i=single(a.t,a.hitAt,5/60,a.total);return{family:'reinaDash',index:i,phase:i,move:a.name,contact:i===4};}
 if(a.name==='blitzKick'){const t=a.t*60,i=t<3?0:t<7?1:t<11?2:t<19?3:t<29?4:t<37?5:t<44?6:7;return{family:'reinaExtra',index:i,phase:i,move:a.name,contact:[3,4,5].includes(i)};}
 return null;
}
if(C.paired(f)||f.jump||f.casinoSecurity192||f.routeTruck197)return null;
if(f.type==='thug'&&N.Street209.is(f)){if(!f.weapon&&['marcusCombo','oneTwo','hook'].includes(a.name)){const i=frame(a),offset=a.name==='hook'?8:0;return{family:'marcus',index:offset+i,phase:i,move:a.name,contact:i===4};}if(f.weapon==='knife'&&a.name==='knifeSlash'&&a.street209){const i=frame(a);return{family:'marcusSlash',index:i,phase:i,move:a.name,contact:i===4};}if(f.weapon==='knife'&&a.name==='knife'&&a.street209){const i=frame(a);return{family:'marcus',index:16+i,phase:i,move:a.name,contact:i===4};}}
if(f.type==='enforcer'&&N.Enemies210.is(f)&&!f.weapon&&a.enemies210){const offset=['oneTwo','hook','uppercut','bombGrab'].indexOf(a.name);if(offset<0)return null;const i=frame(a);return{family:'bruno',index:offset*8+i,phase:i,move:a.name,contact:i===4};}return null;}
const damage=P.damage;P.damage=function(f,...args){const q=plan(f),hp=f.hp,a=f.act,clock=a?{t:a.t,total:a.total}:null,weapon=f.weapon,out=damage.call(this,f,...args);if(q&&!q.pairedStrike&&f.hp<hp&&f.hp>0&&a!==f.act&&!f.act&&f.stun>0&&!f.down&&!f.flight&&!f.jump&&!C.paired(f))f.attackEntry297={...q,at:this.time,duration:Math.min(.1,f.stun),weapon,sourceClock297:clock,sourceAction:a.name};return out;};
N.Attack297={plan,frame,single};
})(globalThis);
