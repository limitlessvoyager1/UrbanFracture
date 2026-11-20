(function(r){'use strict';const S=r.PolishedSprites,N=r.NeonCombat,previous=S.draw;
function cue(c,f,time){const q=N.ShowstopperProvocation438.cue(f,time);if(!q)return false;c.save();c.globalAlpha*=q.opacity;c.strokeStyle='#ff8b43';c.lineWidth=1.6;c.lineCap='round';c.shadowBlur=0;
 for(const[x,y,dx,dy]of[[-5,-176,1,1],[5,-176,-1,1],[-5,-166,1,-1],[5,-166,-1,-1]]){c.beginPath();c.moveTo(x,y+dy*3);c.lineTo(x,y);c.lineTo(x+dx*3,y);c.stroke();}c.restore();return true;}
S.draw=function(c,f,time,...args){const out=previous.call(this,c,f,time,...args);cue(c,f,time);return out;};
r.ShowstopperProvocationView438={cue};
})(globalThis);
