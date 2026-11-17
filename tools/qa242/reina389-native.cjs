'use strict';
const fs=require('node:fs'),path=require('node:path'),{createRequire}=require('node:module');
// Same production adapter and native controller, with only retained source substituted.
function load(seed=389,flags={}){if(!flags.baseline389)return require('./runtime.cjs').load(seed,flags);const filename=path.join(__dirname,'runtime.cjs'),source=fs.readFileSync(filename,'utf8'),m={exports:{}},req=createRequire(filename),references={'dist/reina383.js':'reina383-before389.js.txt','dist/grab223.js':'grab223-before389.js.txt'},shim={...fs,readFileSync(file,...args){const normalized=String(file).replaceAll('\\','/'),name=references[normalized];return fs.readFileSync(name?path.join(__dirname,'../../qa/system242/repair-references/reina389',name):file,...args);}};new Function('require','module','exports','__dirname',source)(id=>id==='node:fs'?shim:req(id),m,m.exports,__dirname);return m.exports.load(seed,flags);}
module.exports={load};
