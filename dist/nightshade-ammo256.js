
(function(root){'use strict';const N=root.NeonCombat,P=N.Brawler.prototype,profiles=new Map(),C={capacity:6,small:3,large:6,enabled:false,rates:{regular:[0,0],heavy:[0,0],prop:[0,0]}};
const isAmmo=i=>i?.ammo256===true||['ammoSmall256','ammoLarge256','clip3','clip6'].includes(i?.kind);
function state(g){return g.ammo256??={claimed:{},floor:{},rolls:0,serial:0,collected:0,discarded:0};}
function budget(){return{small:0,large:0,rounds:0,pressure:0,band:[0,0]};}
function register(id,q){if(!id||!q.locations?.length)throw Error('Ammo profile needs a level ID and progression locations');const value={...q,id,minutes:q.minutes??q.expectedMinutes??12};if(q.locations.length<budget(value,'easy').small+budget(value,'easy').large)throw Error('Ammo locations must cover the whole-level maximum budget');profiles.set(id,value);return value;}
function section(g){const z=g.zoneDefinition;return z.id||N.Adaptive222.config(g)?.id||(g.uptown?'uptown-':g.hotelRoute&&g.zone>=3&&g.zone<=6?'hotel-':g.zone<7?'downtown-':'financial-')+(g.uptown&&g.zone===7?'riverfront':g.zone);}
function profile(g){const id=section(g),z=g.zoneDefinition,custom=z.ammunition256;if(custom?.levelId&&custom.locations){if(!profiles.has(custom.levelId))register(custom.levelId,custom);return profiles.get(custom.levelId);}for(const q of profiles.values())if(q.locations.some(a=>a.some(p=>p.section===id)))return q;const prefix=custom?.levelId||z.campaignId||({hotel:'downtown',sterling:'yacht'}[id.split('-')[0]]||id.split('-')[0]),known=profiles.get(prefix);if(known)return known;const sections=N.ZONES.map(v=>v.id).filter(v=>v&&v.startsWith(prefix+'-'));if(!sections.includes(id))sections.push(id);const count=sections.length;return register(prefix,{minutes:custom?.expectedMinutes||Math.max(8,count*4),mandatoryEncounters:custom?.mandatoryEncounters||count*2,enemies:custom?.enemies||count*6,highThreat:custom?.highThreat||0,locks:count*2,bosses:custom?.bosses||0,meleeOpportunities:count,randomOpportunities:count*3,expectedShots:count*5,estimated:true,locations:Array.from({length:5},(_,n)=>[{section:sections[Math.min(count-1,Math.floor(count*(n+1)/6))],at:(n+1)/6}])});}
function roomKey(g){return section(g)+'|'+(g.hotelKitchen?'kitchen':'main');}
function plan(g){return{profile:profile(g),budget:budget(),slots:[]};}
function safe(g,x,y){const bounds=g.combatBounds,ground=g.groundBounds;if(x<bounds.min+20||x>bounds.max-20||y<ground.min+4||y>ground.max-4)return false;for(const p of g.props||[]){if(!p.solid||p.hp<=0&&!p.routeCar197)continue;const box=N.NightshadeGun255.coverBox(p);if(Math.abs(x-p.x)<Math.max(box.half,(p.width||p.w||0)/2,p.highwayVehicle234||p.stadiumVehicle237?200:0,p.mallProp236?50:0)+22&&Math.abs(y-p.y)<30)return false;}for(const h of g.highway234?.collapses||[])if(Math.abs(x-h.x)<h.w/2+28&&Math.abs(y-h.y)<h.h/2+10)return false;for(const e of g.enemies||[])if(e.hp>0&&e.entry&&Math.abs(x-e.x)<48&&Math.abs(y-e.y)<35)return false;const a=N.LockedBattles222.active(g);return !a||x>=a.bounds.min+20&&x<=a.bounds.max-20;}
function point(g,x,y){for(const dx of [0,-38,38,-76,76,-114,114])for(const yy of [y,(g.groundBounds.min+g.groundBounds.max)/2,g.groundBounds.min+12])if(safe(g,x+dx,yy))return{x:x+dx,y:yy};return null;}
function create(){return null;}
function accessible(g,it){const a=N.LockedBattles222.active(g);return !a||it.x>=a.bounds.min+20&&it.x<=a.bounds.max-20;}
function update(g){g.items=(g.items||[]).filter(i=>!isAmmo(i));if(g.ammo256)g.ammo256.floor={};}
function collect(g,it){if(!isAmmo(it))return false;it.gone=true;update(g);return true;}
function recordDamage(g,e,amount,o){if(g.player.type!=='nightshade'||e===g.player||amount<=0)return;const d=e.ammoDamage256??={total:0,gun:0};d.total+=amount;if(o.bullet255)d.gun+=amount;}
function primaryGun(e){const d=e.ammoDamage256;return !!d&&d.gun>Math.max(d.total,e.maxHp-e.hp)/2;}
function dropKind(){return null;}
function drop(){return null;}
const reset=P.reset;P.reset=function(k=0,...args){const saved=k?this.ammo256:null,r=reset.call(this,k,...args);this.ammo256=saved||{claimed:{},floor:{},rolls:0,serial:0,collected:0,discarded:0};if(saved)saved.floor={};return r;};
const tick=P.tick;P.tick=function(dt,input={}){update(this);const r=tick.call(this,dt,input);update(this);return r;};
function debug(g){if(g.player.type!=='nightshade')return null;const p=plan(g),s=state(g);return{ammo:N.NightshadeGun255.ammo(g.player),capacity:6,level:p.profile.id,section:section(g),budget:p.budget,estimatedProfile:!!p.profile.estimated,scriptedSlots:p.slots.map(q=>({id:q.id,kind:q.kind,collected:!!s.claimed[q.id],spawned:!!s.floor[q.id]})),lootRolls:s.rolls,collectedRounds:s.collected,discardedRounds:s.discarded};}
const report=N.Audit135.report;N.Audit135.report=function(g){return{...report(g),nightshadeAmmo256:debug(g)};};
N.NightshadeAmmo256={config:C,isAmmo,profiles,register,budget,section,profile,plan,state,safe,point,update,create,collect,recordDamage,primaryGun,dropKind,drop,debug};N.Nightshade251.config.gate=3;
})(typeof window!=='undefined'?window:globalThis);
