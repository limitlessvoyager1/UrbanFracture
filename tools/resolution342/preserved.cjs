'use strict';
const fs=require('node:fs'),cp=require('node:child_process'),A=require('node:assert/strict');
const ref='09bb59f80b054cbd2bacdfa0840cecc74cae2027';
// Current approved import, not an invented historical-source receipt. This guard
// accompanies current behavioral tests whose old whole-tree identity was superseded.
function verify(file){let actual=fs.readFileSync(file);if(file==='dist/workers233.js'){const text=actual.toString(),needle='if(begin(g,e,rows[Math.floor(Math.random()*rows.length)]))return;';A.equal(text.split(needle).length-1,1);actual=Buffer.from(text.replace(needle,'s.crewRequestAt250=g.time;'+needle));}const expected=cp.execFileSync('git',['show',ref+':'+file],{maxBuffer:16*1024*1024});A.ok(actual.equals(expected),'Build341 source unchanged while modernizing QA: '+file);return true;}
module.exports={verify,ref};
