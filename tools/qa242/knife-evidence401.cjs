'use strict';
const A=require('node:assert/strict');
function sample(image,args,order,matrix){const source=image.renderSource||image.src||'';if(!/assets\/repair262\/kevin-0\.webp(?:\?|$)/.test(source)||args.length!==8||args.slice(0,4).some((v,i)=>v!==[57,164,68,28][i]))return null;return{source,order,matrix:[matrix.a,matrix.b,matrix.c,matrix.d,matrix.e,matrix.f]};}
function verify(draws,socket){A.ok(draws.some(q=>q.order>0&&q.matrix.length===6&&q.matrix.every(Number.isFinite)),'Current retained Kevin knife must be painted after body at finite socket');A.ok(socket?.hand?.length===2&&socket.hand.every(Number.isFinite),'Knife hand socket present');return true;}
module.exports={sample,verify};
