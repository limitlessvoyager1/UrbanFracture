
(function(root){'use strict';const N=root.NeonCombat,U=root.NeonUptown,P=N.Brawler.prototype,spawn=P.spawnZone;const C={zone:7,panoramaWidth:4200,waterTop:270,waterBottom:356};
P.spawnZone=function(...args){const r=spawn.apply(this,args);if(this.uptown&&this.zone===C.zone){this.riverStarted151=this.time;this.finScene=null;this.citizens=[];this.labWorkers139=[];}return r;};
function traffic(g){const z=U.zones[C.zone],t=Math.max(0,g.time-(g.riverStarted151||0)),length=z.end-z.start+1600;return[{kind:'speed',x:z.start-420+(t*185)%length,y:325,width:113,dir:1},{kind:'speed',x:z.end+750-((t*165+length*.43)%length),y:306,width:91,dir:-1},{kind:'barge',x:z.start-350+(t*33+1300)%length,y:326,width:222,dir:1}];}
N.Riverfront151={config:C,traffic};
})(typeof window!=='undefined'?window:globalThis);
