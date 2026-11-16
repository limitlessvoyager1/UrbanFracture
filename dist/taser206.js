
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype;

const C={barrel:[352,823],anchor:[176,1053],scale:.39};
function muzzle(g,e,dir=e.dir){const d=root.NeonSpriteData?.cop,k=d?.scale||C.scale,a=d?.frames?.[6]?.anchor||C.anchor,S=N.Forest125.scale(e)*(g.zone===11?1.12:1);return{x:e.x+dir*(C.barrel[0]-a[0])*k*S,y:e.y+(C.barrel[1]-a[1])*k*S,z:(a[1]-C.barrel[1])*k*S};}
const hit=P.enemyHit;P.enemyHit=function(e,a){const existing=new Set(this.projectiles),r=hit.call(this,e,a);if(e.type==='cop'&&a.name==='taserShot')for(const k of this.projectiles)if(k.kind==='taserProbe'&&k.owner===e&&!existing.has(k)){const m=muzzle(this,e,k.dir);k.z206=m.z;k.shot206=a;k.launch206={x:m.x,y:m.y,plane:k.y};}return r;};
function geometry(g,k){if(k.kind!=='taserProbe'||k.life<=0||!Number.isFinite(k.x)||!Number.isFinite(k.y))return null;const e=k.owner,z=k.z206??(e?muzzle(g,e,k.dir).z:107.4),tip={x:k.x,y:k.y-z};const attached=!!e&&g.enemies.includes(e)&&e.hp>0&&!e.down&&!e.flight&&!e.heldBy&&!e.pairVisual&&!e.stun&&!e.shock&&e.act?.name==='taserShot'&&(!k.shot206||e.act===k.shot206)&&e.dir===k.dir;const origin=attached?muzzle(g,e,k.dir):null;if(origin&&(tip.x-origin.x)*k.dir<0)tip.x=origin.x;const length=origin?Math.abs(tip.x-origin.x):0,sag=Math.min(12,length*.025);return{origin,tip,attached,sag,plane:k.y,z};}
function draw(c,g,k){const q=geometry(g,k);if(!q)return false;c.save();c.strokeStyle='#bddce1';c.lineWidth=1;for(const off of[-2.5,2.5]){if(q.origin){c.beginPath();c.moveTo(q.origin.x-g.camera,q.origin.y+off);c.quadraticCurveTo((q.origin.x+q.tip.x)/2-g.camera,(q.origin.y+q.tip.y)/2+q.sag+off,q.tip.x-g.camera,q.tip.y+off);c.stroke();}c.save();c.translate(q.tip.x-g.camera,q.tip.y+off);c.scale(k.dir,1);c.fillStyle='#eefaff';c.fillRect(-3,-1,6,2);c.restore();}c.restore();return true;}
N.Taser206=root.Taser206={config:C,muzzle,geometry,draw};
})(typeof window!=='undefined'?window:globalThis);
