'use strict';
// Read-only adapter for proving the regression on the approved pre-repair observer.
const fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path'),read=fs.readFileSync,git=process.env.UF_GIT||'git',file=path.resolve('dist/ai-observer288.js'),before=cp.execFileSync(git,['show','dd07a7a819eca2c3b8753ba80c76fc3b3ac2554d:dist/ai-observer288.js']);
fs.readFileSync=function(p,options){if(typeof p==='string'&&path.resolve(p)===file){const encoding=typeof options==='string'?options:options?.encoding;return encoding?before.toString(encoding):Buffer.from(before);}return read.apply(this,arguments);};
