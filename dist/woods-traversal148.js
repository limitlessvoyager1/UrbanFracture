
(function(root){const N=root.NeonCombat,P=N.Brawler.prototype,old=P.tick;const C={zone:4,start:1480,width:390,leftMargin:38,rightMargin:54,laneMin:463,laneMax:480,workerSpeed:90};
function log(g){return null;} // Retired crossing: complete trail now uses native ground bounds.
function inside(q,x){return x>q.left&&x<q.right;}
function constrain(g,a,b,dt){const q=log(g);if(!q||!a||a.fade===0||a.pairVisual||a.heldBy||a.hold||a.grappleSession119?.active||(a.act?.forest125&&a.act.victim))return;const inNow=inside(q,a.x),was=inside(q,b.x),off=a.y<q.minY||a.y>q.maxY;if(inNow&&off){if(!was){a.x=b.x<=q.left?Math.min(b.x,q.left):Math.max(b.x,q.right);if(a.fallTo!==undefined&&a.down)a.fallTo=a.x;}else{a.y=N.clamp(a.y,q.minY,q.maxY);if(a.prevY!==undefined)a.prevY=a.y;}}

 if(a!==g.player&&!a.act&&!a.down&&!a.stun&&!a.heldBy&&!a.hold){const p=g.player,opposite=a.x<=q.left&&p.x>q.left||a.x>=q.right&&p.x<q.right;if(opposite&&(a.y<q.minY||a.y>q.maxY)&&Math.min(Math.abs(a.x-q.left),Math.abs(a.x-q.right))<170){const to=(q.minY+q.maxY)/2;a.y+=Math.sign(to-a.y)*Math.min(Math.abs(to-a.y),75*dt);a.walk=1;}}
}
P.tick=function(dt,input={}){const actors=[this.player,...this.enemies,...(this.gunner125?[this.gunner125]:[])],before=new Map(actors.map(a=>[a,{x:a.x,y:a.y}])),r=old.call(this,dt,input);if(this.uptown&&!this.uptownFade&&!this.transition){for(const a of [this.player,...this.enemies,...(this.gunner125?[this.gunner125]:[])])constrain(this,a,before.get(a)||{x:a.x,y:a.y},dt);const q=log(this);if(q)for(const it of this.items)if(inside(q,it.x))it.y=N.clamp(it.y,q.minY,q.maxY);}return r;};
N.WoodsTraversal148={config:C,log,inside,constrain,labDoor:g=>({x:g.zoneDefinition.start+(g.zoneDefinition.end-g.zoneDefinition.start)*.73,y:438,radius:105,midX:g.zoneDefinition.start+(g.zoneDefinition.end-g.zoneDefinition.start)*.81,targetX:g.zoneDefinition.start+(g.zoneDefinition.end-g.zoneDefinition.start)*.88})};
})(typeof window!=='undefined'?window:globalThis);
