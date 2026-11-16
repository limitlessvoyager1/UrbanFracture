'use strict';
// Read-only source adapter for reproducing existing-suite behavior against the approved pre-repair baseline.
const fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path'),original=fs.readFileSync,root=path.resolve('dist'),git=process.env.UF_GIT||'git',sources=new Map(['audit135.js','grab223.js'].map(name=>[path.join(root,name),cp.execFileSync(git,['show','a73c51ac83f30d8b4bb2d3d553ea4a7eea5ee6b0:dist/'+name])]));
fs.readFileSync=function(file,options){const source=typeof file==='string'?sources.get(path.resolve(file)):null;if(source){const encoding=typeof options==='string'?options:options?.encoding;return encoding?source.toString(encoding):Buffer.from(source);}return original.apply(this,arguments);};
