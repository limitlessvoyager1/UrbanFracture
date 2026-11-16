'use strict';
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const file=path.resolve('tests/home338-ui.cjs');
const extra=`
run('started=false;sceneMenuOpen=false;');
sb.HomeUI327.mount(g,{canTest:()=>run('!started||sceneMenuOpen'),testReturnLabel:()=>run('sceneMenuOpen')?'Back to level select':'Return to title',clear:noop,release:noop});
const saved342=JSON.stringify({player:g.player,economy:M.save(g),time:g.time,zone:g.zone}),rng342=sb.Math.random;
function exit342(label){const b=doc.body.children.filter(q=>q.className==='hq338').at(-1).querySelectorAll('button').find(q=>q.textContent===label);ok(b,'physical home return '+label);b.click();ok(!sb.HomeUI327.openState,'physical home closed');eq(JSON.stringify({player:g.player,economy:M.save(g),time:g.time,zone:g.zone}),saved342,'campaign unchanged by test visit');eq(sb.Math.random,rng342,'campaign RNG retained');}
doc.getElementById('playHome331').click();ok(sb.HomeUI327.openState,'visible title button launches physical home');exit342('Return to title');
run("document.querySelector('#sceneSelect').value='hq-test328';beginSelectedScene();");ok(sb.HomeUI327.openState,'title scene dropdown launches physical home');exit342('Return to title');
run('started=true;sceneMenuOpen=false;');eq(sb.HomeUI327.test(),false,'mid-campaign testing rejected');
run('sceneMenuOpen=true;paused=true;');run("document.querySelector('#sceneSelect').value='hq-test328';beginSelectedScene();");ok(sb.HomeUI327.openState,'paused scene dropdown launches physical home');exit342('Back to level select');ok(run('sceneMenuOpen&&paused'),'returns to paused scene selection');
const html342=fs.readFileSync('dist/index.html','utf8');ok(html342.includes('VISIT REINA’S HQ — HOME'),'visible title label');ok(html342.indexOf('value="hq-test328"')<html342.indexOf('value="restaurant"'),'home is first dropdown group');console.log('PASS328/331 physical home title/dropdown routes, return, isolation and mid-campaign guard');
`;
const m=new Module(file,module);m.filename=file;m.paths=module.paths;m._compile(fs.readFileSync(file,'utf8')+extra,file);
