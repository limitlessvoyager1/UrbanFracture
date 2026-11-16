const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const s=fs.readFileSync('dist/sprites.js','utf8'),start=s.indexOf('function keyNovaBackground('),end=s.indexOf('\nfunction loadNova(',start);assert(start>=0&&end>start);const key=vm.runInNewContext('('+s.slice(start,end)+')');
const w=9,h=9,data=new Uint8ClampedArray(w*h*4);for(let i=0;i<w*h;i++)data.set([100,100,100,255],i*4);
for(let y=2;y<7;y++)for(let x=2;x<7;x++)data.set([40,25,45,255],(y*w+x)*4);
data.set([100,100,100,255],(4*w+4)*4);data.set([72,72,72,255],(2*w+4)*4);
key({data},w,h);assert.equal(data[3],0,'connected background removed');assert.equal(data[(4*w+4)*4+3],255,'gray detail enclosed in costume preserved');assert(data[(2*w+4)*4+3]>0&&data[(2*w+4)*4+3]<255,'outer fringe is partially transparent');
assert(s.includes("c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high'"));console.log('PASS Nova background cleanup preserves enclosed detail and softens edge fringe');
