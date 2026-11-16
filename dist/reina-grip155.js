
(function(root){'use strict';const N=root.NeonCombat;
function active(p){return p?.type==='reina'&&p.hold&&!p.hold.counter&&!p.act&&!p.down&&!p.stun&&!p.jump&&p.hold.victim?.heldBy?.id===p.id;}
function arm(p){return p.hold.rear?[16,-103,32,13]:[25,-87,30,13];}
function transform(c,g){const p=g.player,S=1.46515635*.912*(g.zone===11?1.12:1);c.translate(p.x-g.camera,p.y);c.scale(p.dir*S,S);}
function behind(c,g){const p=g.player;if(!active(p))return;c.save();transform(c,g);c.beginPath();c.ellipse(...arm(p),0,0,Math.PI*2);c.clip();root.PolishedSprites.draw(c,p,g.time,1.46515635*.912);c.restore();}
function mask(c,g){if(!active(g.player))return;const p=g.player,S=1.46515635*.912*(g.zone===11?1.12:1),a=arm(p);c.beginPath();c.rect(-10000,-10000,20000,20000);c.ellipse(p.x-g.camera+p.dir*a[0]*S,p.y+a[1]*S,a[2]*S,a[3]*S,0,0,Math.PI*2);c.clip('evenodd');}
function near(){}
N.ReinaGrip155={active,behind,mask,near};
})(typeof window!=='undefined'?window:globalThis);
