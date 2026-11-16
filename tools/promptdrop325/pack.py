from pathlib import Path
import re,subprocess
# Rename only private lexical bindings; keep strings, comments and public keys unchanged.
pat=re.compile(r"('(?:\\.|[^'\\])*'|\"(?:\\.|[^\"\\])*\"|`(?:\\.|[^`\\])*`|/\*.*?\*/|//[^\n]*|\b[A-Za-z_$][\w$]*\b)",re.S)
def compact(src,names):
 mp=dict(zip(names,['z'+str(i) for i in range(len(names))]))
 def sub(m):
  word=m[0]
  if word not in mp:return word
  before=src[:m.start()].rstrip();after=src[m.end():].lstrip()
  if (before.endswith('.') and not before.endswith('...')) or after.startswith(':') or before.endswith('get'):return word
  return mp[word]
 return pat.sub(sub,src)
base='9676a3ad95b7a000d326fd8d54a5bf91a38f87b1'
for target,source,names in [('items319.js','promptdrop325.js',['oldSave','oldRestore','stores','probe','existing','next','order','data','prices','stock','value','serial','allowed','fresh','clone']),('phone323.js','promptdrop-ui325.js',['panel','message','quote','busy','saved','label','input','status','parent','text','button','cash'])]:
 raw=Path('source-archive/build325/'+source).read_text()
 # Public exported API functions are not private bindings.
 if target=='items319.js':names=[n for n in names if n not in ['allowed','serial']]
 if target=='items319.js':
  api=['state','catalog','allowed','validate','snapshot','checked','bind','persist','saved','restoreSaved','quote','purchase','advance','checkpoint','setPrice','resetPrices','setStock']
  for name in api: raw=raw.replace(name+',',name+':'+name+',') if False else raw
  # Expand only the final export shorthand; keep public field names stable.
  start=raw.index('r.PromptDrop325=N.PromptDrop325={')
  tail=raw[start:]
  for name in api:tail=re.sub(r'(?<=[{,])'+name+r'(?=[,}])',name+':'+name,tail)
  raw=raw[:start]+tail;names+=api
 raw=compact(raw,names)
 old=subprocess.check_output(['git','show',base+':dist/'+target],text=True)
 if target=='phone323.js':
  old=old.replace("promptdrop:['Delivery service not connected yet.','Purchases and home deliveries are not available. Your wallet has not been charged.'],",'')
  old=old.replace("else if(['arrowdown','arrowup','pagedown'", "else if(registry.has(screen)&&['arrowdown','arrowup','arrowleft','arrowright','w','a','s','d'].includes(k)){const bs=all(),i=bs.indexOf(document.activeElement),step=['arrowup','arrowleft','w','a'].includes(k)?-1:1;focus(bs[(Math.max(0,i)+step+bs.length)%bs.length]);}else if(['arrowdown','arrowup','pagedown'")
 if target=='phone323.js':
  api=['mount','open','close','back','home','key','pad','render','facts']
  start=old.index('r.PhoneUI323={');tail=old[start:]
  for name in api:tail=re.sub(r'(?<=[{,])'+name+r'(?=[,}])',name+':'+name,tail)
  old=old[:start]+tail
  old=compact(old,['locationName','pauseButtons','selected','priorFocus','direction','opened','registry','handler','panel','notes','STYLE']+api)
 Path('dist/'+target).write_text(re.sub(r'^/\*[^\n]*\*/\n','',old+raw,flags=re.M))
