/* Full-body locomotion: actual displacement owns cadence, never elapsed idle time.
   Combat/controller code is unchanged. See reports360 for the 12-frame cycles. */
(function(r){'use strict';const S=r.PolishedSprites,previous=S.draw,D=r.Nightshade360Data,images={},states=new WeakMap();
const config={walk:{stride:103,frames:12},run:{stride:148,frames:12}};
function eligible(f){return f.type==='nightshade'&&f.hp>0&&!f.act&&!f.hold&&!f.heldBy&&!f.pairVisual&&!f.down&&!f.flight&&!f.jump&&!f.stun&&!f.shock&&!f.blocking&&!f.guarding&&!f.controlVictim181;}
function observe(f,t,k=1){let q=states.get(f);if(!q){q={x:f.x,y:f.y,t,phase:0,frame:0,moving:false,mode:'walk',distance:0};states.set(f,q);}
 const mode=f.running?'run':'walk',dx=f.x-q.x,dy=(f.y-q.y)/.65,d=Math.hypot(dx,dy),dt=t-q.t,valid=eligible(f)&&!!f.walk;
 // Exclude teleports, action displacement and repeated render calls at one clock value.
 if(valid&&dt>0&&dt<.25&&d>.001&&d<Math.max(25,dt*650)){q.phase=(q.phase+d/(config[mode].stride*Math.max(.1,k)))%1;q.distance+=d;q.moving=true;}else if(dt>0)q.moving=false;
 q.x=f.x;q.y=f.y;q.t=t;q.mode=mode;q.frame=Math.min(11,Math.floor(q.phase*12));f.gait360={mode,frame:q.frame,phase:q.phase,distance:q.distance,moving:q.moving};return q;}
const ready=Promise.all(Object.entries(D.gaits).map(([mode,data])=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{images[mode]=im;resolve(true);};im.onerror=()=>reject(Error('Missing Nightshade360 '+mode+' cycle'));im.src=data.src;})));S.ready=Promise.all([S.ready,ready]);
function body(c,f,q,t){const d=D.gaits[q.mode],z=134/416,frame=d.frames[q.frame],rect=frame.rect,hand=[(frame.hand[0]-320)*z,(frame.hand[1]-460)*z];
 c.save();if(f.ironWillVisual179>0){c.shadowColor='#ffd72e';c.shadowBlur=8*Math.min(1,f.ironWillVisual179/2);}c.drawImage(images[q.mode],...rect,-320*z,-460*z,640*z,512*z);c.restore();
 if(f.heldWeapon248){const [x,y]=hand;c.save();c.translate(x,y);r.CombatView248.weapon(c,f.heldWeapon248.kind,.35,f.heldWeapon248.charged,t);c.restore();
 // Put the original gripping hand back over the weapon; no separate body resampling.
 const radius=13,hx=frame.hand[0],hy=frame.hand[1];c.drawImage(images[q.mode],rect[0]+hx-radius,rect[1]+hy-radius,radius*2,radius*2,(hx-radius-320)*z,(hy-radius-460)*z,radius*2*z,radius*2*z);f.weaponHand269=hand;}
 f.look360={build:363,reference:'Nightshade magenta-white tactical profile',motion:'agent363',poses:D.count,gait:q.mode,frame:q.frame};return true;}
S.draw=function(c,f,t,k){const g=r.DowntownRuntime345;t=Number.isFinite(t)?t:(g?.time||0);k=Number.isFinite(k)?k:(g&&r.NightshadeWorld348?r.NightshadeWorld348.fighterScale(f,g):r.NeonCombat.Forest125.scale(f));if(f.type!=='nightshade')return previous(c,f,t,k);const q=observe(f,t,k);if(!eligible(f)||!f.walk||!images[q.mode])return previous(c,f,t,k);if(!q.moving){const walk=f.walk,running=f.running;try{f.walk=0;f.running=false;return previous(c,f,t,k);}finally{f.walk=walk;f.running=running;}}return body(c,f,q,t);};
r.NightshadeGait360={ready,images,config,eligible,observe,state:f=>states.get(f),body};
})(globalThis);
