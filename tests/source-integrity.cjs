'use strict';
const {test}=require('node:test'),A=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../dist');
function missingReferences(css,exists){return [...css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)].map(m=>m[1]).filter(p=>! /^(?:data:|https?:|#|\/\/)/.test(p)).map(p=>p.split(/[?#]/)[0]).filter(p=>!exists(p));}
test('shared stylesheet requests existing portraits and assets',()=>A.deepEqual(missingReferences(fs.readFileSync(path.join(root,'style.css'),'utf8'),p=>fs.existsSync(path.join(root,p))),[]));
test('asset reference detector rejects a missing portrait and handles versioned URLs',()=>{
 A.deepEqual(missingReferences("a{background:url('assets/missing.png')}b{background:url(assets/good.webp?v=1)}",p=>p==='assets/good.webp'),['assets/missing.png']);
});
test('every production script exists and is loaded once',()=>{
 const scripts=[...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)].map(m=>m[1].split('?')[0]);
 A.ok(scripts.length>400);A.equal(new Set(scripts).size,scripts.length);for(const f of scripts)A.ok(fs.existsSync(path.join(root,f)),f);
});
