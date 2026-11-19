'use strict';
// Execute the unchanged character assertions with the exact versioned source bridge.
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),A=require('node:assert/strict');
function run(name){A.ok(['tests/reina396-native.cjs','tests/reina399-native-preservation.cjs'].includes(name),'Unregistered native preservation fixture');const file=path.resolve(__dirname,'../..',name),m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));const req=m.require.bind(m);m.require=id=>id==='../tools/qa242/preservation401.cjs'?require('./preservation435.cjs'):req(id);m._compile(fs.readFileSync(file,'utf8'),file);}
module.exports={run};if(require.main===module)run(process.argv[2]);
