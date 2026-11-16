'use strict';
// The retained test assumes its report directory already exists. Preserve all assertions.
const fs=require('node:fs'),path=require('node:path'),E=require('./evidence.cjs'),root=path.resolve(__dirname,'../..');
if(process.argv.length!==3||process.argv[2]!=='tests/nova333.cjs')throw Error('Use run-nova333.cjs tests/nova333.cjs');
process.chdir(root);
fs.mkdirSync(path.dirname(E.safeReportPath(root,'reports333/runtime-checks.json')),{recursive:true});
require('../../tests/nova333.cjs');
