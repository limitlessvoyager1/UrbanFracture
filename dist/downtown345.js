/* Declared Downtown-only review build. Original campaign remains available separately. */
(function(r){'use strict';const N=r.NeonCombat,P=N.Brawler.prototype;
const windows=[{id:'restaurant-window',zone:0,x:1120,kind:'healthPack'},{id:'retail-window',zone:1,x:2050,kind:'energyBattery'},{id:'condo-window',zone:3,x:6050,kind:'money',main:true},{id:'nightlife-window',zone:4,x:8990,kind:'energyBattery',hotel:true}];
function ledger(g){return g.downtownWindows345??={placed:{},claimed:{}};}
function active(g){return !!g.downtown345&&!g.uptown&&g.zone<=6&&!N.DowntownRooms345.active(g)&&!N.CacheRooms336.active(g);}
function update(g){if(!active(g))return;const s=ledger(g);for(const q of windows){if(q.zone!==g.zone||q.hotel&&!g.hotelRoute||q.main&&g.hotelRoute)continue;const existing=g.items.find(i=>i.window345===q.id);if(existing&&!existing.gone&&q.displayY362!=null){existing.x=q.x;existing.windowElevation345=existing.y+7-q.displayY362;}if(existing?.gone)s.claimed[q.id]=true;if(s.claimed[q.id]||existing||q.x<g.bounds.min+24||q.x>g.bounds.max-24)continue;const it=N.MasterItems319.create(g,q.kind,q.x,444,'downtown345-window:'+q.id);if(it){it.window345=q.id;it.windowElevation345=q.displayY362!=null?it.y+7-q.displayY362:87;s.placed[q.id]=true;}}}
function routes(g){if(!active(g)||g.transition)return[];const rows=[],hotel=g.hotelRoute,zone=g.zone;
if(g.hotelRoutePromptVisible&&zone===2)rows.push({x:3665,arrow:'↑',name:'HOTEL LOBBY',door:true});
if(g.zoneClear&&(g.awaiting||g.brickDefeated||g.enemiesRemaining===0)&&!g.pending.length){if(zone<=3){if(hotel&&zone===3)rows.push({x:6750,arrow:'↑',name:g.hotelKitchen?'REAR ALLEY':'HOTEL KITCHEN',door:true});else rows.push({x:g.camera+904,arrow:'→',name:['RETAIL DISTRICT','HOTEL DISTRICT','CONDO DISTRICT','VELVET ROOM APPROACH'][zone]});}else if(zone===4&&g.brickDefeated)rows.push({x:hotel?9800:8000,arrow:'↑',name:hotel?'MIDNIGHT CLUB':'VELVET ROOM',door:true});else if(zone===5)rows.push({x:9985,arrow:'↑',name:hotel?'MIDNIGHT VIP':'SERVICE ALLEY',door:true});}
return rows;}
const tick=P.tick;P.tick=function(dt,i={}){const out=tick.call(this,dt,i);if(this.downtown345)update(this);return out;};
const reset=P.reset;P.reset=function(...a){const out=reset.apply(this,a);if(this.downtown345){this.downtownWindows345={placed:{},claimed:{}};this.downtownFinished345=false;}return out;};
const financial=P.startFinancialTransition;P.startFinancialTransition=function(...a){if(this.downtown345&&!this.uptown){this.downtownFinished345=true;this.won=true;this.playing=false;this.event('downtown345Complete');this.event('victory');return;}return financial?.apply(this,a);};
N.Downtown345={windows,ledger,active,update,routes};
})(globalThis);
// Standalone test entry points cannot load levels omitted from this distribution.
(function(r){const N=r.NeonCombat,P=N.Brawler.prototype,reset=P.reset,start=r.NeonScenes71.start;
function permitted(s){return s&&s.zone<=6&&!/^(uptown|government|casino|yacht|estates|route74|slums|prison|docks|highway|chinatown|mall|stadium|subway|hydro|airport|hospital|feds|industrial|hq)/.test(s.id);}
P.reset=function(zone,...args){if(this.downtown345&&zone>6)zone=0;return reset.call(this,zone,...args);};
r.NeonScenes71.start=function(g,id,...args){if(g.downtown345&&!permitted(this.scenes.find(s=>s.id===id))){g.event('notice',{text:'Downtown playtest: choose a Downtown scene.'});return false;}return start.call(this,g,id,...args);};
N.Downtown345.permitted=permitted;
})(globalThis);
(function(r){const N=r.NeonCombat,prior=N.Practice278.options,types=new Set(['thug','knifeThug','enforcer','biker','cop','flint','sato','akari','bouncer','boss']);N.Practice278.options=function(g,...args){const rows=prior.call(this,g,...args);return g.downtown345?rows.filter(q=>types.has(q.id)):rows;};})(globalThis);
