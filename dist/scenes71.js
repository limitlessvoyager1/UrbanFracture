
(function(root){'use strict';const {ZONES,clamp}=root.NeonCombat;
const scenes=[
{id:'restaurant',name:'Downtown · Restaurant district',zone:0},
{id:'retail',name:'Downtown · Retail district',zone:1},
{id:'hotel-street',name:'Downtown · Grand Hotel exterior',zone:2},
{id:'hotel-lobby',name:'Hotel route · Lobby',zone:3,hotel:true},
{id:'hotel-kitchen',name:'Hotel route · Kitchen',zone:3,hotel:true,kitchen:true},
{id:'hotel-alley',name:'Hotel route · Rear alley / nightlife',zone:4,hotel:true},
{id:'hotel-brick',name:'Hotel route · Brick at nightclub',zone:4,hotel:true,brick:true},
{id:'hotel-club',name:'Hotel route · Midnight Club',zone:5,hotel:true},
{id:'hotel-vip',name:'Hotel route · VIP / Jackal',zone:6,hotel:true},
{id:'hotel-financial',name:'Hotel route · Financial crash',zone:7,hotel:true},
{id:'condos',name:'Downtown · Condo district',zone:3},
{id:'nightlife',name:'Downtown · Velvet Room exterior',zone:4},
{id:'brick',name:'Downtown · Brick mini-boss',zone:4,brick:true},
{id:'velvet',name:'Downtown · Velvet Room',zone:5},
{id:'jackal-alley',name:'Downtown · Jackal alley',zone:6},
{id:'financial',name:'Financial District · Armored car',zone:7},
{id:'investment',name:'Financial District · Investment row',zone:8},
{id:'bank-front',name:'Financial District · Bank exterior',zone:9},
{id:'bank',name:'Bank · Lobby and offices',zone:10},
{id:'otis',name:'Bank · Otis mini-boss',zone:10,otis:true},
{id:'elevator',name:'Bank · Elevator',zone:11},
{id:'vault-corridor',name:'Bank · Vault corridor',zone:12},
{id:'leroy',name:'Bank · Leroy’s vault',zone:13}
];
function start(g,id){const scene=scenes.find(x=>x.id===id);if(!scene)return false;g.reset(scene.zone);if(scene.hotel){g.hotelRoute=true;g.hotelKitchen=!!scene.kitchen;g.enemies=[];g.items=[];g.props=[];g.effects=[];g.pending=[];g.player.x=ZONES[scene.zone].start+(scene.zone===4?210:140);g.player.y=454;g.player.prevX=g.player.x;g.player.prevY=g.player.y;g.camera=g.cameraBounds.min;g.spawnZone();const rain=scene.zone===4;g.player.wetness=rain?1:0;for(const e of g.enemies)e.wetness=rain?1:0;g.wetWeatherWasRain=rain;g.wetPuddle=null;}
if(scene.brick){const brick=g.enemies.find(e=>e.type==='bouncer');if(brick){g.enemies=g.enemies.filter(e=>e===brick||e.doorSupport);g.pending=[];g.player.x=brick.x-240;g.player.y=454;g.player.prevX=g.player.x;g.player.prevY=g.player.y;g.camera=clamp(g.player.x-350,g.cameraBounds.min,g.cameraBounds.max);g.progressX=g.player.x;}}
if(scene.otis){g.enemies=[];g.pending=[];g.player.x=ZONES[10].end-420;g.player.y=468;g.player.prevX=g.player.x;g.player.prevY=g.player.y;g.player.dir=1;g.camera=clamp(g.player.x-350,g.cameraBounds.min,g.cameraBounds.max);g.finProgress=0;g.spawnFinancialEnemy('security',468,ZONES[10].end-180);g.items.push({x:g.player.x-50,y:505,kind:'fullHeal',value:110});}
g.sceneSelection=id;return true;}
root.NeonScenes71={scenes,start};if(typeof module!=='undefined')module.exports=root.NeonScenes71;
})(typeof window!=='undefined'?window:globalThis);
