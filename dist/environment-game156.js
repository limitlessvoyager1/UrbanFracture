
(function(root){'use strict';const E=root.UrbanEnvironment156,N=root.NeonCombat,P=N.Brawler.prototype,reset=P.reset,tick=P.tick;
P.reset=function(...args){const env=this.environment156,paused=this.environmentPaused156,wet=this.player?.wetness156||0;const r=reset.apply(this,args);this.environment156=env||new E.Environment();this.environmentPaused156=paused||false;this.player.wetness=this.player.wetness156=wet;for(const e of this.enemies)e.wetness=e.wetness156=0;return r;};
P.newEnvironment156=function(seed,config){this.environmentOriginal156=null;this.environment156=new E.Environment(seed??E.randomSeed(),config);this.environmentPaused156=false;this.environmentThunder156=null;return this.environment156;};
P.saveEnvironment156=function(){return (this.environmentOriginal156||this.environment156).save();};
P.loadEnvironment156=function(data,replay=false){this.environmentOriginal156=null;this.environment156=E.Environment.load(data,{replay});this.environmentThunder156=null;return this.environment156;};
P.tick=function(dt,input={}){this.environment156??=new E.Environment();if(this.playing&&!this.environmentPaused156){this.environment156.advance(Math.max(0,dt));this.environmentOriginal156?.advance(Math.max(0,dt));}const r=tick.call(this,dt,input),s=this.environment156.effective(),outside=E.scene(this).outdoor;for(const f of [this.player,...this.enemies,...(this.gunner125?[this.gunner125]:[])])f.wetness=Math.max(0,Math.min(1,(f.wetness156||0)+(outside?s.rain*dt/5:-dt/30)));for(const f of [this.player,...this.enemies,...(this.gunner125?[this.gunner125]:[])])f.wetness156=f.wetness;
 this.wetWeatherWasRain=outside&&s.rain>.03;if(!outside)this.wetPuddle=null;const l=s.lightning;const thunderKey=l.id+':'+l.thunderAt;if(l.strength>0&&s.elapsed>=l.thunderAt&&s.elapsed-l.thunderAt<Math.max(2,dt+.1)&&this.environmentThunder156!==thunderKey){this.environmentThunder156=thunderKey;this.event('environmentThunder156',{strength:l.strength*(outside?1:.28),variation:E.hash(l.id)%3});}return r;};

if(root.NeonWetWeather){root.NeonWetWeather.raining=g=>E.scene(g).outdoor&&(g.environment156?.effective().rain||0)>.03;root.NeonWetWeather.indoors=g=>!E.scene(g).outdoor;}
const event=P.event;P.event=function(type,data={}){if(type==='bossIntro'&&this.environment156&&E.scene(this).outdoor)this.environment156.script({id:'boss-intro-'+this.environment156.elapsed,weather:'thunderstorm',intensity:.9,duration:2,fadeIn:.8,fadeOut:4,lightning:true});return event.call(this,type,data);};
N.Environment156=E;
})(typeof window!=='undefined'?window:globalThis);
