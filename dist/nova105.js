
(function(root){'use strict';const {Brawler,clamp}=root.NeonCombat,P=Brawler.prototype,old={};for(const k of ['start','advanceHeroActor','advanceHeroAction','finishHeroAction','hitPlayerAttack'])old[k]=P[k];const throws=new Set(['novaFranken','novaDDT','novaFace','novaBelly','novaTrampoline']),smooth=u=>{u=clamp(u,0,1);return u*u*(3-2*u);};
P.start=function(p,name,...args){old.start.call(this,p,name,...args);if(p===this.player&&p.type==='nova'&&throws.has(p.act?.name)){const a=p.act;p.grappleZ=0;a.throw105=true;a.ground105=p.y;a.dir105=p.dir;a.victimX105=a.victim?.x;if(a.name==='novaFranken'){a.hitAt=1.12;a.total=1.50;}}};
P.advanceHeroActor=function(p,dt){old.advanceHeroActor?.call(this,p,dt);if(p===this.player&&p.type==='nova'&&p.act?.throw105)p.act.t+=dt*.12;};
P.advanceHeroAction=function(p,a,dt){old.advanceHeroAction?.call(this,p,a,dt);if(p!==this.player||!a.throw105)return;const v=a.victim,t=a.t,d=a.dir105,x=a.fromX,y=a.ground105,place=u=>clamp(u,this.bounds.min,this.bounds.max);p.y=y;
 if(a.name==='novaFranken'){
 const launch=smooth((t-.14)/.28),hook=smooth((t-.42)/.18),flip=smooth((t-.60)/.52),recover=smooth((t-1.12)/.30);
 p.x=place(x+d*(t<.60?22*launch:22-164*flip-12*recover));p.grappleZ=t<.42?96*launch:t<.60?96-8*hook:t<1.12?88*(1-flip)+58*Math.sin(Math.PI*flip):0;
 a.backflip105=t>=.60&&t<1.12?flip:0;
 if(v&&p.hold?.victim===v){v.y=y;v.dir=d;v.x=place(x+d*(32-100*flip));v.grapplePivot=120;v.grappleZ=t<.60?-8*hook:(150*(1-flip)+18*flip)-120*1.46515635*(v.type==='enforcer'?1.15:v.type==='boss'?1.20:v.type==='thug'||v.type==='knifeThug'?.92:1);v.grappleAngle=-Math.PI*1.5*flip;}
 }else if(a.name==='novaDDT'&&v&&p.hold?.victim===v){
 const bend=smooth((t-.12)/.28),spin=smooth((t-.40)/.72);p.x=place(x+d*30*spin);p.grappleZ=46*Math.sin(Math.PI*spin);v.x=place(x+d*(35+30*spin-16*Math.sin(Math.PI*spin)));v.y=y;v.grapplePivot=100;v.grappleZ=-24*bend+28*Math.sin(Math.PI*spin);v.grappleAngle=-(bend*.75+spin*2.2);
 }else if(a.name==='novaFace'&&v&&p.hold?.victim===v){
 const step=smooth(t/.35),leap=smooth((t-.55)/.55);p.x=place(x+d*(18*step+110*leap));p.grappleZ=42*Math.sin(Math.PI*leap);v.x=place(x+d*(32+65*leap));v.y=y;v.grappleZ=0;v.grapplePivot=75;v.grappleAngle=smooth((t-.30)/.25)*.95;
 }else if(a.name==='novaBelly'&&v){
 if(!a.released&&p.hold?.victim===v){const q=smooth(t/.45);v.x=place(x+d*(32-45*q));v.y=y;v.grappleZ=70*Math.sin(q*Math.PI/2);v.grappleAngle=-q*1.1;}
 else if(a.released){const q=smooth((t-.55)/.65);p.x=place(x+(a.landingX-x)*q);p.grappleZ=t<1.20?95*Math.sin(q*Math.PI):15;if(t>=1.42){p.x=place(a.landingX+d*90*smooth((t-1.42)/.49));p.grappleZ=0;}}
 }else if(a.name==='novaTrampoline'&&v&&p.hold?.victim===v){v.x=a.victimX105;v.y=y;v.grappleZ=0;v.grappleAngle=0;p.x=place(x+d*24*smooth(t/a.hitAt));}
};
P.hitPlayerAttack=function(a){const p=this.player,v=a?.victim,locked=a?.throw105&&['novaFranken','novaDDT','novaFace'].includes(a.name)&&p.hold?.victim===v,x=v?.x;const result=old.hitPlayerAttack.call(this,a);if(locked&&v.down){v.x=v.prevX=v.fallFrom=v.fallTo=x;}return result;};
P.finishHeroAction=function(p,a){old.finishHeroAction?.call(this,p,a);if(a.throw105&&a.victim){a.victim.grappleZ=0;a.victim.grappleAngle=0;a.victim.grapplePivot=0;}};
})(typeof window!=='undefined'?window:globalThis);
