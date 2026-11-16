'use strict';
// Private test diagnostics only. Original native draw code executes; disk is untouched.
const fs=require('node:fs'),path=require('node:path'),{root}=require('../fighter-render/prerequisites.cjs');
async function load(mutation){
 const read=fs.readFileSync,file=path.join(root,'dist/sprites.js');let injected=0;
 fs.readFileSync=function(target,...args){const data=read.call(this,target,...args);if(typeof target!=='string'||path.resolve(target)!==file)return data;let source=data.toString();
  if(mutation==='no-time')source=source.replace('if(!Number.isFinite(time)||time!==groundedTime114){$13.clear();groundedTime114=time;}','').replace('if(!Number.isFinite(time)||time!==groundedTime114){retireGrounded114();groundedTime114=time;}','');
  if(mutation==='no-flash')source=source.replace('!!(f.hitFlash>0),f.act?.name', 'f.act?.name');
  if(mutation==='quantized-time')source=source.replace('time!==groundedTime114','Math.floor(time*4)!==groundedTime114').replace('groundedTime114=time;','groundedTime114=Math.floor(time*4);');
  const at=source.lastIndexOf('})(window);');if(at<0)throw Error('Native sprites export boundary unavailable');injected++;
  source=source.slice(0,at)+'root.__groundedTest114={cache:$13,drawGrounded114,frameIndex};\n'+source.slice(at);return typeof data==='string'?source:Buffer.from(source);
 };
 try{const r=await require('../fighter-render/load.cjs').renderLoad(923);if(!injected||!r.sb.__groundedTest114)throw Error('Native diagnostic export did not attach');return r;}finally{fs.readFileSync=read;}
}
module.exports={load};
