// Execute the complete Flint211 regression with Martial212 installed before its assertions.
const fs=require('fs'),Module=require('module'),path=require('path');const file=path.resolve('tests/flint211.cjs');const code=fs.readFileSync(file,'utf8').replace('const T=N.Flint211;',"vm.runInContext(fs.readFileSync('dist/martial212.js','utf8'),sb);const T=N.Flint211;");const m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));m._compile(code,file);
console.log('PASS212 previous Flint weapon contracts with current martial module active');
