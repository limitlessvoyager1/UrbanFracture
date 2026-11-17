'use strict';
// The older render factories capture runtime.load when imported. Supply their
// Canvas DOM boundary without changing native bootstrap, assertions or fallback.
function fixtureFrom(modulePath){
 const runtime=require('./runtime.cjs'),nativeLoad=runtime.load;
 runtime.load=function(...args){
  const state=nativeLoad(...args);
  state.sb.document={createElement(kind){
   if(kind!=='canvas')throw Error('Unsupported render-fixture element: '+kind);
   return require('../fighter-render/prerequisites.cjs').requireCanvas().createCanvas(300,150);
  }};
  return state;
 };
 try{return require(modulePath);}finally{runtime.load=nativeLoad;}
}
module.exports={fixtureFrom};
