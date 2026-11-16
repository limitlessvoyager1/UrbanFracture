'use strict';
const {renderLoad}=require('../reactions290/render.cjs');
async function load(seed=310){const r=await renderLoad(seed);r.beforePrototype=Object.getOwnPropertyDescriptors(r.N.Brawler.prototype);r.beforeDefinitions=JSON.stringify({heroes:r.N.HEROES,grapples:r.sb.Grapple301Data,charge:r.N.Charge130.config});await r.ensureRenderModules(['airport-view309.js','style310.js']);await r.sb.AirportView309.ready;await r.sb.Style310.ready;return r;}
module.exports={load};