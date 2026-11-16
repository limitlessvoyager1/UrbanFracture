
(function(root){'use strict';const A=root.NeonCombat.NightshadeAmmo256;
const loc=(sections,at=.55)=>sections.split('|').map(section=>({section,at}));
function add(id,minutes,encounters,enemies,highThreat,bosses,melee,random,shots,locations){A.register(id,{minutes,mandatoryEncounters:encounters,enemies,highThreat,bosses,locks:encounters,meleeOpportunities:melee,randomOpportunities:random,expectedShots:shots,estimated:true,locations});}
add('downtown',28,12,40,3,2,8,14,22,[loc('downtown-1'),loc('downtown-3|hotel-4'),loc('downtown-6|hotel-6',.28)]);
add('financial',29,13,38,4,2,7,10,24,[loc('financial-8'),loc('financial-10',.62),loc('financial-12',.70)]);
add('uptown',30,12,42,3,1,7,12,22,[loc('uptown-1'),[{section:'uptown-3',at:.55},{section:'uptown-riverfront',at:.24}],[{section:'uptown-5',at:.60},{section:'uptown-riverfront',at:.76}]]);
add('government',28,12,38,3,1,8,10,20,[loc('government-front|government-cells'),loc('government-tunnels|government-approach'),loc('government-building',.68)]);
add('casino',17,6,22,3,2,5,18,18,[loc('casino-floor'),loc('casino-penthouse',.68)]);
add('yacht',12,4,15,2,1,4,4,14,[loc('sterling-yacht-deck',.55),loc('sterling-yacht-lounge',.30)]);
add('fairways',25,9,31,1,1,15,18,12,[loc('fairways-avenue',.65),loc('fairways-golf|fairways-tennis',.60),loc('fairways-court',.25)]);
add('route74',16,6,22,2,0,7,12,14,[loc('route74-stop'),loc('route74-homes',.70)]);
add('slums',43,22,72,4,2,14,24,40,[loc('slums-floor2|slums-store'),loc('slums-floor4|slums-store-departments'),loc('slums-marian-street|slums-tavern',.35),loc('slums-arnell-street',.65),loc('slums-colt',.30)]);
add('prison',33,20,62,4,0,12,20,26,[loc('prison-mess'),loc('prison-security',.40),loc('prison-block-b',.65)]);
add('docks',25,12,38,1,0,12,22,16,[loc('docks-waterfront'),loc('docks-shepard|docks-yard',.65),loc('docks-district|docks-ship-interior',.65)]);
add('highway',16,5,18,0,0,10,18,10,[loc('highway-roadworks',.48),loc('highway-approach',.70)]);
add('chinatown',18,7,25,3,2,6,6,18,[loc('chinatown-market',.45),loc('chinatown-approach',.68)]);
add('mall',26,12,38,1,0,12,24,16,[loc('mall-lower|mall-upper'),loc('mall-maintenance|mall-arcade',.60),loc('mall-lot|mall-roof',.35)]);
add('stadium',30,15,49,4,1,9,14,28,[loc('stadium-concourse'),loc('stadium-vip|stadium-facilities'),loc('stadium-field',.76)]);
add('subway',28,14,36,2,0,8,10,20,[loc('subway-maintenance'),loc('subway-tunnel',.62),loc('subway-car',.60)]);
add('hydro',24,8,26,1,0,10,12,14,[loc('hydro-control-room',.45),loc('hydro-pressure-gallery',.68),loc('hydro-dam-crest',.35)]);
})(typeof window!=='undefined'?window:globalThis);
