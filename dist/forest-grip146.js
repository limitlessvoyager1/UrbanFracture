
(function(root){'use strict';const N=root.NeonCombat;
function active(p){return p?.type==='forest'&&p.shoulder134&&p.hold&&!p.hold.rear&&!p.hold.counter&&!p.act&&p.hold.victim?.pairVisual?.contactShoulder134;}
function near(c,g){const p=g.player;if(!active(p))return;const D=root.NeonRepair134Data.forest,index=p.shoulder134.index,fr=D.frames[index],k=D.scale,S=N.Forest125.scale(p)*(g.zone===11?1.12:1),h=fr.hands[0],x=(h[0]-fr.anchor[0])*k,y=(h[1]-fr.anchor[1])*k;c.save();c.translate(p.x-g.camera,p.y);c.scale(p.dir*S,S);c.beginPath();c.ellipse(x-9,y+1,24,16,0,0,Math.PI*2);c.clip();root.NeonRepairView134.draw(c,'forest',index);c.restore();}
N.ForestGrip146={active,near};
})(typeof window!=='undefined'?window:globalThis);
