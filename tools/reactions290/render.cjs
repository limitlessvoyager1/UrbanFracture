'use strict';
// Compatibility entry point for existing reaction/grapple view suites.
module.exports=require('../fighter-render/load.cjs');
if(require.main===module)module.exports.renderLoad().then(r=>console.log('loaded current fighter renderer',r.renderMetadata.files.length)).catch(e=>{console.error(e);process.exitCode=e.exitCode||1;});
