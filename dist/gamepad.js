
(function(root){'use strict';
const bindings={jump:0,dodge:1,attack:2,special:3,block:4,counter:5,grab:6,run:7,pickup:11,unique:7,pause:9},sonyBindings={jump:1,dodge:2,attack:0,special:3,block:4,counter:5,grab:6,run:7,pickup:11,unique:7,pause:9};
const sony=p=>!/xbox|xinput|microsoft/i.test(p?.id||'')&&/dualsense|dualshock|054c|playstation|wireless controller/i.test(p?.id||'');
const down=(p,i)=>Number.isInteger(i)&&i>=0&&(!!p.buttons?.[i]?.pressed||(p.buttons?.[i]?.value||0)>.5);
class Reader{
 constructor(){this.index=null;this.id='';this.previous={};this.wasConnected=false;this.mode='auto';this.lastLayout='';this.preferredIndex=null;this.profiles={};this.engaged=false;}
 sample(pads=[]){const all=Array.from(pads||[]).filter(p=>p&&p.connected!==false),available=all;const active=p=>p.buttons?.some(b=>b?.pressed||b?.value>.5)||Math.abs(p.axes?.[0]||0)>.25||Math.abs(p.axes?.[1]||0)>.25;
 let pad=this.preferredIndex!==null?available.find(p=>p.index===this.preferredIndex):available.find(p=>p.index===this.index&&p.id===this.id);
 if(this.preferredIndex===null&&(!pad||!this.engaged&&!active(pad)))pad=available.find(p=>active(p)&&p.mapping==='standard')||available.find(active)||pad||available.find(p=>p.mapping==='standard')||available[0];
 // DSX may expose both physical Sony and virtual XInput/DS4 devices. In auto
 // mode choose the mapped virtual stream even if the physical stream engaged
 // first. Explicit device/raw choices remain authoritative; never merge pads.
 if(this.preferredIndex===null&&this.mode==='auto'){
  const mapped=available.find(p=>p.mapping==='standard'&&/dsx|xinput|xbox 360 controller/i.test(p.id))||available.find(p=>p.mapping==='standard'&&sony(p)&&available.some(q=>q!==p&&sony(q)&&q.mapping!=='standard'));
  if(mapped&&available.some(p=>p!==mapped&&sony(p)))pad=mapped;
 }
 let profile=pad&&this.mode==='auto'&&this.profiles[pad.id];if(profile&&(!profile.buttons||!['attack','jump','pause'].every(k=>Number.isInteger(profile.buttons[k])&&profile.buttons[k]>=0)))profile=null;if(profile?.buttons&&(profile.buttons.run===5||profile.buttons.run===profile.buttons.counter)){profile={...profile,buttons:{...profile.buttons,block:4,counter:5,grab:6,run:7}};this.profiles[pad.id]=profile;}if(profile?.buttons&&profile.buttons.counter===undefined&&profile.buttons.grab!==undefined){profile={...profile,buttons:{...profile.buttons,counter:profile.buttons.grab,grab:profile.buttons.secondaryGrab??(Object.values(profile.buttons).includes(6)?-1:6)}};this.profiles[pad.id]=profile;}if(profile?.buttons&&profile.buttons.pickup===undefined&&!Object.values(profile.buttons).includes(11))profile={...profile,buttons:{...profile.buttons,pickup:11}};if(profile?.buttons&&profile.buttons.unique===undefined){const taken=Object.entries(profile.buttons).some(([k,v])=>k!=='run'&&v===7);if(!taken)profile={...profile,buttons:{...profile.buttons,unique:7}};}const connected=!!pad,layout=profile?'custom':this.mode==='sony'||this.mode==='auto'&&pad?.mapping!=='standard'&&sony(pad)?'sony':'standard',changed=connected!==this.wasConnected||connected&&(pad.index!==this.index||pad.id!==this.id||layout!==this.lastLayout);
 if(changed){this.previous={};this.engaged=false;}if(pad&&active(pad))this.engaged=true;this.wasConnected=connected;this.index=pad?.index??null;this.id=pad?.id||'';this.lastLayout=layout;
 if(!pad)return{connected:false,changed,held:{},pressed:[],released:[],neutral:true,buttonsNeutral:true,count:all.length,devices:all.map(p=>({index:p.index,id:p.id}))};
 const axis=(key,fallback)=>{const def=profile?.axes?.[key];return def?Math.max(-1,Math.min(1,((pad.axes?.[def.index]||0)-def.center)*def.sign)):(pad.axes?.[fallback]||0);};
 const held={},x=axis('x',0),y=axis('y',1);held.left=x<-.25;held.right=x>.25;held.up=y<-.25;held.down=y>.25;
 if(layout==='standard'){held.left||=down(pad,14);held.right||=down(pad,15);held.up||=down(pad,12);held.down||=down(pad,13);}else if(layout==='sony'){
 if(pad.buttons.length>=18){held.up||=down(pad,14);held.right||=down(pad,15);held.down||=down(pad,16);held.left||=down(pad,17);}


 const hat=pad.axes?.[9],n=(hat+1)*3.5;if(Number.isFinite(hat)&&hat>=-1.01&&hat<=1.01&&Math.abs(n-Math.round(n))<.08){const d=Math.round(n)%8;held.up||=[0,1,7].includes(d);held.right||=[1,2,3].includes(d);held.down||=[3,4,5].includes(d);held.left||=[5,6,7].includes(d);}}
 for(const [name,index]of Object.entries(profile?.buttons||(layout==='sony'?sonyBindings:bindings)))held[name]=!!held[name]||down(pad,index);
 if(held.left&&held.right)held.left=held.right=false;if(held.up&&held.down)held.up=held.down=false;
 const pressed=Object.keys(bindings).filter(k=>held[k]&&!this.previous[k]),released=Object.keys(bindings).filter(k=>!held[k]&&this.previous[k]);this.previous={...held};
 return{connected:true,changed,id:pad.id,index:pad.index,count:all.length,layout,rawButtons:pad.buttons.map((b,i)=>down(pad,i)?i:null).filter(i=>i!==null),axes:[x,y],held,pressed,released,neutral:!Object.values(held).some(Boolean),buttonsNeutral:!Object.keys(bindings).some(k=>held[k]),devices:all.map(p=>({index:p.index,id:p.id})),playstation:sony(pad)};
 }
}
const setupSteps=[['attack','Press Square / Attack'],['jump','Press Cross / Jump'],['dodge','Press Circle / Dodge'],['special','Press Triangle / Sword'],['block','Press L1 / Block'],['counter','Press R1 / Counter'],['grab','Press L2 / Grab (or skip)'],['unique','Press R2 / Unique Action'],['run','Optional run shortcut: another button (or skip)'],['pickup','Press R3 / Pick Up or Throw (or skip)'],['pause','Press Options / Pause'],['up','Press D-pad Up (or skip)'],['right','Press D-pad Right (or skip)'],['down','Press D-pad Down (or skip)'],['left','Press D-pad Left (or skip)'],['x','Move the left stick RIGHT'],['y','Move the left stick DOWN']];
class Setup{
 constructor(pad){this.id=pad.id;this.index=pad.index;this.step=0;this.waitRelease=true;this.profile={buttons:{},axes:{}};this.centers=Array.from(pad.axes||[]);this.candidate=null;this.frames=0;}
 get done(){return this.step>=setupSteps.length;}
 get prompt(){return this.done?'Setup saved. Controller ready.':(this.waitRelease?'Release buttons and center the left stick. Then: ':'')+setupSteps[this.step][1]+' ('+(this.step+1)+'/'+setupSteps.length+')';}
 skip(){if(this.done)return;this.step++;this.waitRelease=true;this.candidate=null;this.frames=0;}
 sample(pad){if(!pad||pad.id!==this.id||this.done)return;const pressed=pad.buttons.map((b,i)=>down(pad,i)?i:-1).filter(i=>i>=0);if(this.waitRelease){if(!pressed.length&&[...new Set([0,1,...Object.values(this.profile.axes).map(a=>a.index)])].every(i=>Math.abs((pad.axes[i]||0)-(this.centers[i]||0))<.25)){this.waitRelease=false;this.centers=Array.from(pad.axes||[]);}return;}
 const key=setupSteps[this.step][0],isAxis=key==='x'||key==='y';let candidate;if(isAxis){const deltas=Array.from(pad.axes||[]).map((v,i)=>({index:i,delta:v-(this.centers[i]||0)})).filter(v=>v.index!==9&&!(key==='y'&&v.index===this.profile.axes.x?.index)&&Math.abs(v.delta)>.6).sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta));candidate=deltas[0];if(candidate&&key==='y'&&candidate.index===this.profile.axes.x?.index)candidate=null;}else if(pressed.length===1)candidate={index:pressed[0]};
 if(!candidate){this.candidate=null;this.frames=0;return;}if(this.candidate?.index!==candidate.index){this.candidate=candidate;this.frames=0;}if(++this.frames<4)return;
 if(isAxis)this.profile.axes[key]={index:candidate.index,center:this.centers[candidate.index]||0,sign:Math.sign(candidate.delta)};else this.profile.buttons[key]=candidate.index;this.skip();
 }
}
root.NeonGamepad={Reader,Setup,bindings,sonyBindings};if(typeof module!=='undefined')module.exports=root.NeonGamepad;
})(typeof window!=='undefined'?window:globalThis);
