(function(r){'use strict';const N=r.NeonCombat,P=N.Brawler.prototype;
// Review adapter: do not borrow Bruno's three-hit clock for a disarmed Flint.
const defs={hook:{hits:[12],active:4,recovery:22,damage:[22],reach:144},oneTwo:{hits:[12,25],active:4,recovery:24,damage:[14,8],reach:144},frontKick:{hits:[18],active:5,recovery:28,damage:[20],reach:144},uppercut:{hits:[16],active:4,recovery:25,damage:[22],reach:144}};
const enabled=g=>!!g.downtown345&&!!g.nightshade348,is=e=>e?.type==='flint';
function valid(g,e){return e.hp>0&&!e.down&&!e.flight&&!e.stun&&!e.shock&&!e.heldBy&&!e.hold&&!e.entry&&!e.entering&&!e.dormant&&!e.fleeing&&!e.grappleSession119?.active&&!e.forestLock125&&e.activeAt<=g.time;}
function contact(g,e,a){const p=g.player,d=a.def350,dx=(p.x-e.x)*a.dir350;
 if(e.act!==a||!valid(g,e)||p.hp<=0||p.down||p.flight||p.jump||p.heldBy||Math.abs(p.y-e.y)>20||dx<0||dx>d.reach+18)return false;
 const box=N.Combat134.box(p,g),height=a.name==='frontKick'?135:175;
 return N.DragonTail121.contact({x:e.x+a.dir350*12,y:e.y-height},{x:e.x+a.dir350*d.reach,y:e.y-height},box);
}
const act=P.enemyAct;P.enemyAct=function(e,name,total,at,o={}){
 if(enabled(this)&&is(e)&&e.weapon){const out=act.call(this,e,name,total,at,o);if(e.act?.flint211)e.act.flint351=true;return out;}
 if(!enabled(this)||!is(e)||e.weapon||!defs[name])return act.call(this,e,name,total,at,o);
 const d=defs[name],dukes=e.flintDukes186;e.flintDukes186=false;
 try{act.call(this,e,name,(d.hits.at(-1)+d.active+d.recovery)/60,d.hits[0]/60,{...o,enemies210:false,bruno102:false,flintUnarmed186:true,flint350:true,def350:d,damage:d.damage[0],reach:d.reach,dir350:Math.sign(this.player.x-e.x)||e.dir,contacts350:new Set(),armor:false,knock:name!=='oneTwo'});}finally{e.flintDukes186=dukes;}
};
const ai=P.ai;P.ai=function(e,dt){if(!enabled(this)||!is(e)||e.weapon)return ai.call(this,e,dt);if(!valid(this,e)||e.act)return ai.call(this,e,dt);
 e.flintDukes186=true;e.disarmed=true;e.knifeRollDone=true;const p=this.player;
 if(p.hp<=0||p.down||p.heldBy||p.grappleSession119?.active){e.walk=0;return;}
 const dx=p.x-e.x,dy=p.y-e.y;e.dir=Math.sign(dx)||e.dir;
 if(Math.abs(dx)<=78&&Math.abs(dy)<=16){e.walk=0;if(e.cd<=0&&e.recovering<=0&&e.standingLock<=0){const name=['hook','oneTwo','frontKick'][e.attackCycle++%3];this.enemyAct(e,name,1,.2);}return;}
 N.Street209.move(this,e,p.x-e.dir*67,p.y,98*(e.cd>0?.7:1),dt);
};
const hit=P.enemyHit;P.enemyHit=function(e,a){if(a.flint350)return;return hit.call(this,e,a);};
const advance=P.advanceHeroAction;P.advanceHeroAction=function(e,a,dt){if(!a.flint350)return advance.call(this,e,a,dt);e.dir=a.dir350;e.walk=0;const f=a.t*60,d=a.def350;
 for(let i=0;i<d.hits.length;i++){if(f<d.hits[i]||f>=d.hits[i]+d.active||a.contacts350.has(i)||!contact(this,e,a))continue;
 if(this.catchPunch(e,a)){a.contacts350.add(i);return;}
 if(this.damage(this.player,d.damage[i],a.dir350,a.knock&&i===d.hits.length-1,{attacker:e,action169:a,flintMelee350:true})){a.contacts350.add(i);this.event(a.name==='frontKick'?'kickHit':'swing');}}
};
// Last-line range check also covers legacy/direct invocations and armed weapons.
const damage=P.damage;P.damage=function(v,n,dir,k,o={}){const e=o.attacker,a=e?.act;
 if(enabled(this)&&v===this.player&&is(e)&&!o.grab&&!o.flight&&!o.projectile102&&!o.hazard){
  if(a?.flint350){if(!contact(this,e,a))return false;}
  else if(a?.flint211){const q=N.Flint211.world(e,a),dx=Math.abs(v.x-e.x);if(e.act!==a||(!q.front&&!q.rear)||Math.abs(v.y-e.y)>24||dx>a.def211.range+32||!N.DragonTail121.contact(q.A,q.B,N.Combat134.box(v,this)))return false;}
  else if(!a||Math.abs(v.x-e.x)>112||Math.abs(v.y-e.y)>24)return false;
 }
 return damage.call(this,v,n,dir,k,o);
};
function pose(e){const a=e.act;if(!a?.flint350)return null;const d=a.def350,f=a.t*60,i=d.hits.findIndex(t=>f<t+d.active+8),t=d.hits[i<0?d.hits.length-1:i],u=f-t;
 return (a.name==='frontKick'?8:0)+(u< -9?0:u< -6?1:u< -3?2:u<0?3:u<d.active?4:u<d.active+4?5:u<d.active+8?6:7);
}
// Original350 connected, complete figure frames; no torso/leg compositing or time stretch.
const S=r.PolishedSprites,draw=S.draw,im=new Image(),art=r.FlintArt350;const ready=new Promise((yes,no)=>{im.onload=yes;im.onerror=no;im.src=art.image;});S.ready=Promise.all([S.ready,ready]);
S.draw=function(c,e,...args){const g=r.DowntownRuntime345;if(enabled(g||{})&&is(e)&&e.act?.flint350&&!e.down&&!e.stun&&!e.heldBy){const index=pose(e),q=art.frames[index];c.save();c.imageSmoothingEnabled=true;c.drawImage(im,...q.rect,-q.ax*q.scale,-q.ay*q.scale,q.rect[2]*q.scale,q.rect[3]*q.scale);c.restore();e.flintPose350={index,frame:e.act.t*60};return true;}return draw.call(this,c,e,...args);};
N.Flint351={defs,contact,pose,enabled,armSample};

function armSample(e,a,t,q){const d=a.def211,f=t*60,stage=d.stages[q.stage],age=f-stage.from;let i;
 if(q.phase==='recovery')i=f-d.recoveryStart*60<8?6:7;
 else if(q.phase==='rear swing')i=3;
 else if(q.phase==='forward swing')i=a.weapon211==='knife'?4:f-stage.at<d.active/2?4:5;
 else if(q.phase==='follow-through')i=6;
 else if(q.phase==='transition')i=7;
 else i=age<d.startup*.28?0:age<d.startup*.60?1:2;
 const h=r.FlintArmed351.frames[i].hand,length=d.weapon==='plank'?62:Math.max(12,d.range/(N.Forest125.scale(e)*(e.zone211===11?1.12:1))-Math.abs(h[0]));
 return{...q,armIndex351:i,hand:{x:h[0],y:h[1]},length,tip:{x:h[0]+Math.cos(q.theta)*length,y:h[1]+Math.sin(q.theta)*length}};
}
const armedImage=new Image(),armedArt=r.FlintArmed351,armedReady=new Promise((yes,no)=>{armedImage.onload=yes;armedImage.onerror=no;armedImage.src=armedArt.image;});S.ready=Promise.all([S.ready,armedReady]);
function prop(c,weapon,h,theta,length){if(weapon==='pipe'&&r.CombatView248){c.save();c.translate(h.x,h.y);r.CombatView248.weapon(c,'pipe',theta);c.restore();return;}if(weapon==='knife'&&r.StandardKnife363?.draw(c,h.x,h.y,theta,Math.max(0,length-4)))return;if(weapon==='plank'&&r.FlintVisual362)return r.FlintVisual362.plank(c,h,theta,62);c.save();c.translate(h.x,h.y);c.rotate(theta);c.lineCap='round';c.strokeStyle='#151b24';c.lineWidth=weapon==='plank'?10:7;c.beginPath();c.moveTo(-5,0);c.lineTo(length,0);c.stroke();if(weapon==='knife'){c.fillStyle='#dfe7ec';c.beginPath();c.moveTo(2,-4);c.lineTo(length-5,-3);c.lineTo(length+1,0);c.lineTo(length-5,4);c.lineTo(2,3);c.closePath();c.fill();c.fillStyle='#6f7c86';c.fillRect(-1,-7,3,14);}else{c.strokeStyle=weapon==='pipe'?'#a9b8c3':weapon==='plank'?'#b98a54':'#b47e4c';c.lineWidth=weapon==='plank'?7:4;c.stroke();if(weapon==='bat'){c.lineWidth=8;c.beginPath();c.moveTo(length*.55,0);c.lineTo(length-3,0);c.stroke();}}c.fillStyle='#3c2c28';c.fillRect(-5,-3,12,6);c.strokeStyle='#c68b64';c.lineWidth=1.7;for(let i=0;i<3;i++){c.beginPath();c.moveTo(-3+i*3,-3);c.lineTo(-3+i*3,3);c.stroke();}c.restore();}
N.Flint351.prop=prop;const beforeArmed=S.draw;S.draw=function(c,e,...args){const g=r.DowntownRuntime345;if(!enabled(g||{})||!is(e)||!e.weapon||e.hp<=0||e.down||e.flight||e.stun||e.shock||e.heldBy||e.pairVisual)return beforeArmed.call(this,c,e,...args);
 if(e.walk&&!e.act){const out=beforeArmed.call(this,c,e,...args),hand=S.hand269?.(e)||[25,-85],d=N.Flint211.definition(e),h={x:hand[0],y:hand[1]};prop(c,d.weapon,h,d.weapon==='knife'?-.2:-1.1,Math.max(12,d.range/N.Forest125.scale(e)-Math.abs(h.x)));e.weaponVisual351={hand:h,walking:true,weapon:d.weapon};return out;}
 if(e.act&&!e.act.flint211)return beforeArmed.call(this,c,e,...args);
 const d=e.act?.def211||N.Flint211.definition(e),q=e.act?N.Flint211.sample(e,e.act):{armIndex351:0,hand:{x:armedArt.frames[0].hand[0],y:armedArt.frames[0].hand[1]},theta:d.weapon==='knife'?-.2:-1.1,length:Math.max(12,d.range/N.Forest125.scale(e)-Math.abs(armedArt.frames[0].hand[0]))},fr=armedArt.frames[q.armIndex351];
 c.save();c.imageSmoothingEnabled=true;c.drawImage(armedImage,...fr.rect,-fr.ax*fr.scale,-fr.ay*fr.scale,fr.rect[2]*fr.scale,fr.rect[3]*fr.scale);prop(c,d.weapon,q.hand,q.theta,q.length);if(d.weapon==='plank')r.FlintVisual362?.grip(c,armedImage,fr,q.hand);c.restore();e.weaponVisual351={weapon:d.weapon,hand:q.hand,tip:q.tip,length:q.length,phase:q.phase,index:q.armIndex351,frame:e.act?.t*60};return true;
};
// A jump remains on its takeoff lane; depth input cannot shift the air attack.
const jumpCommand=P.command;P.command=function(k,i={}){const p=this.player,y=p.y,was=p.jump,out=jumpCommand.call(this,k,i);if(enabled(this)&&k==='jump'&&!was&&p.jump)p.airPlane351=y;if(enabled(this)&&p.act?.move344==='air')p.act.plane257=p.airPlane351??p.nightshadeJumpPlane262??p.y;throwProtection(this);return out;};
const laneTick=P.tick;P.tick=function(dt,i={}){const p=this.player,locked=enabled(this)&&(p.jump>0||p.act?.move344==='air'),plane=locked?(p.airPlane351??p.nightshadeJumpPlane262??p.y):null;throwProtection(this);const out=laneTick.call(this,dt,i);if(locked){p.y=plane;p.jumpVy=0;if(p.act?.move344==='air')p.act.plane257=plane;}if(!p.jump&&p.act?.move344!=='air')delete p.airPlane351;throwProtection(this);if(enabled(this))for(const item of this.items||[])if(item.window345&&item.window345!=='retail-window'){item.windowElevation345=0;item.y=480;item.storefrontGround351=true;}return out;};
// Full throw action protection; the legacy sweep/beatdown remains interruptible.
function protectedThrow(g){const a=g.player.act;return enabled(g)&&!!a&&(a.rolling345||a.action348&&['vault','roll'].includes(a.move348)||a.grab258&&['ura','leap','roll'].includes(a.move258));}
function throwProtection(g){if(!enabled(g))return;const p=g.player;if(protectedThrow(g)){p.throwInv351??={previous:p.inv||0,at:g.time};p.inv=Math.max(p.inv,.06);}else if(p.throwInv351){p.inv=Math.max(0,p.throwInv351.previous-(g.time-p.throwInv351.at));delete p.throwInv351;}}
const protectedDamage=P.damage;P.damage=function(e,n,d,k,o={}){if(e===this.player&&protectedThrow(this)&&!o.stageHazard&&!o.hazard&&!o.labHazard166&&!o.labFire168&&o.attacker!==this.player)return false;return protectedDamage.call(this,e,n,d,k,o);};
N.Flint351.protectedThrow=protectedThrow;
N.NightshadeGrabs258.defs.sweep.damage=[8,7,7,7];
})(globalThis);
