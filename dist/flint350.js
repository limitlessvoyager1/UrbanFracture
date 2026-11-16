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
N.Flint350={defs,contact,pose,enabled};
})(globalThis);
