const vm=require('node:vm'),fs=require('node:fs');
const s={};s.window=s;s.globalThis=s;
for(const f of ['reina354-data','katana355-data','reina381-data','reina382-data','reina383-data'])vm.runInNewContext(fs.readFileSync('dist/'+f+'.js','utf8'),s);
const rows=[];
function add(key,src,frames){frames.forEach(({rect},i)=>rows.push({key:key+'/'+i,src,rect}));}
add('motion',s.Reina383Data.src,s.Reina383Data.frames);
add('idle-and-combat',s.Reina382Data.src,s.Reina382Data.frames);
add('grabs-and-walk',s.Reina382Data.extra.src,s.Reina382Data.extra.frames);
for(const [key,d] of Object.entries(s.Reina381Data))add(key,d.src,d.frames);
for(const q of s.Katana355Data.poses)rows.push({key:'katana:'+q.id,src:s.Katana355Data.sheets[q.sheet],grid:q.cell});
for(const [id,q] of Object.entries(s.Reina354Data.frames))rows.push({key:id,src:s.Reina354Data.sheets[q.sheet],rect:q.rect});
for(const [i,q] of s.Reina354Data.dive.frames.entries())rows.push({key:'dive/'+i,src:s.Reina354Data.sheets[s.Reina354Data.dive.sheet],rect:q.rect});
const movement = fs.readFileSync('dist/reina-view381.js','utf8');
add('contact395','assets/reina395/contact.webp',JSON.parse(movement.match(/frames395=(\[.*?\]);/)[1]));
for (let i=0;i<16;i++) rows.push({key:'swing395/'+i,src:'assets/reina395/swing-throw.webp',grid:i});
console.log(JSON.stringify(rows));
