
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype;
function session(g){const p=g.player,s=p.act?.grappleSession119;return s?.active&&s.attacker===p&&s.action===p.act&&p.hp>0?s:null;}
function spacingTarget(g,e){const s=session(g);if(!s||e===s.victim||e.hp<=0||e.dormant||e.entry||e.entering||e.flight||e.down||e.stun||e.shock||e.hold||e.heldBy||e.act||e.guarding)return null;const p=g.player,v=s.victim,left=Math.min(p.x,v.x)-92,right=Math.max(p.x,v.x)+92,y=(p.y+v.y)/2;if(e.x<left||e.x>right||Math.abs(e.y-y)>42)return null;s.spacing207??=new WeakMap();if(!s.spacing207.has(e))s.spacing207.set(e,e.x<(p.x+v.x)/2?-1:1);const side=s.spacing207.get(e);return{x:N.clamp(side<0?left-12:right+12,g.bounds.min+8,g.bounds.max-8),y:N.clamp(y+(e.id%2?32:-32),g.groundBounds.min+4,g.groundBounds.max-4)};}
const ai=P.ai;P.ai=function(e,dt){if(spacingTarget(this,e)&&N.Director148.reposition(this,e,dt))return;return ai.call(this,e,dt);};
function protectionCue(c,f,x,y,scale){if(f.hp<=0||f.inv<=0||f.act||f.hold||f.heldBy||f.ironWillVisual179)return;c.save();c.globalAlpha=.65;c.strokeStyle='#e5c785';c.lineWidth=1.5;c.beginPath();c.ellipse(x,y+2,26*scale,7,0,.12,Math.PI-.12);c.stroke();c.restore();}
N.Video207={session,spacingTarget,protectionCue};
})(typeof window!=='undefined'?window:globalThis);
