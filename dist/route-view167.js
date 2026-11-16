
(function(root){'use strict';const color='#ffe85b',outline='#101720',queue=[];let active=false,blocked=false;
const isRoute=t=>/(^GO(?:\s|[↑→←])|^[←→↑]\s*GO)/.test(t);
function paint(c,t,x,y,size=18,align='center'){if(blocked&&isRoute(t))return;c.save();c.font='bold '+size+'px monospace';c.textAlign=align;c.textBaseline='alphabetic';const w=c.measureText(t).width,left=align==='center'?x-w/2:align==='right'?x-w:x;c.fillStyle='#071019ee';c.fillRect(left-9,y-size-5,w+18,size+13);c.strokeStyle=outline;c.lineWidth=4;c.strokeText(t,x,y);c.fillStyle=color;c.fillText(t,x,y);c.restore();}
function defer(c,t,x,y,size=18,align='center'){if(!isRoute(t))return false;if(active)queue.push({t,x,y,size,align});else paint(c,t,x,y,size,align);return true;}
function begin(g){queue.length=0;active=true;blocked=!!root.NeonCombat?.LockedBattles222?.active(g);}
function end(c){active=false;const seen=new Set();for(const q of queue){const key=[q.t,q.x,q.y].join('|');if(!seen.has(key)){paint(c,q.t,q.x,q.y,q.size,q.align);seen.add(key);}}queue.length=0;}
root.NeonRoute167={color,outline,isRoute,paint,defer,begin,end};
})(window);
