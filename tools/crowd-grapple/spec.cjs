'use strict';
module.exports={
 crowd:{entry:'tests/crowd303.cjs',commit:'027ed578b782d4fc437e84c637d9ab37de7172d6',files:['core.js','director148.js','combat274.js','street209.js','enemies210.js','martial212.js','workers233.js','counters248.js','reactions298.js','grapples301.js','contact302.js'],report:'reports303/runtime-validation.json',flag:'approvedSourceUnchanged',normalize:(file,s)=>require('../plane304/approved.cjs').approved(file,s)},
 grapple:{entry:'tests/grapples301.cjs',commit:'9f9584f044807d7be6f062c19263eeec221afcca',files:['core.js','combat134.js','enemies210.js','grapple-recovery119.js','paired-motion.js','reactions298.js','knockdowns299.js'],report:'reports301/runtime-validation.json',flag:'approvedTimingAndDamagePreserved',normalize:(file,s)=>require('../../tests/recording306-approved.cjs').approved(file,require('../recording313/approved.cjs').approved(file,s)).replace('nativeArmor302:!!$46,','')}
};
