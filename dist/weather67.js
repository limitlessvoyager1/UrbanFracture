
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype,reset=P.reset,tick=P.tick;
function raining(g){if(g.environment156)return root.UrbanEnvironment156.scene(g).outdoor&&g.environment156.effective().rain>.03;return !g.uptown&&g.zone<7&&g.zone!==5&&!(g.hotelRoute&&(g.zone===3||g.zone===6));}
function indoors(g){if(g.environment156)return !root.UrbanEnvironment156.scene(g).outdoor;return g.zone===5||(g.hotelRoute&&(g.zone===3||g.zone===6))||(g.zone>=10&&g.zone<=13);}
P.reset=function(checkpoint=0){reset.call(this,checkpoint);this.wetPuddle=null;this.wetWeatherWasRain=raining(this);this.player.wetness=this.wetWeatherWasRain?1:0;for(const e of this.enemies)e.wetness=this.wetWeatherWasRain?1:0;};
P.tick=function(dt,input={}){if(!this.playing)return tick.call(this,dt,input);const beforeRain=raining(this),result=tick.call(this,dt,input),rain=raining(this),p=this.player,step=Math.min(.04,Math.max(0,dt));if(beforeRain&&!rain&&indoors(this)&&(p.wetness||0)>.05){this.wetPuddle={x:p.x,y:p.y,life:12,total:12};}if(this.wetPuddle){this.wetPuddle.life=Math.max(0,this.wetPuddle.life-step);if(!this.wetPuddle.life||!indoors(this))this.wetPuddle=null;}for(const a of [p,...this.enemies]){if(a.wetness===undefined)a.wetness=rain?1:0;a.wetness=Math.max(0,Math.min(1,a.wetness+(rain?step/4:-step/20)));}this.wetWeatherWasRain=rain;return result;};
root.NeonWetWeather={raining,indoors};if(typeof module!=='undefined')module.exports=root.NeonWetWeather;
})(typeof window!=='undefined'?window:globalThis);
