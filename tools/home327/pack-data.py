from pathlib import Path
import json,re,base64
fn="function(s){const a='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',d=Array.from({length:256},(_,i)=>String.fromCharCode(i));let v=0,b=0,c=[],w='',out='',n=256;for(const x of s){v=(v<<6)|a.indexOf(x);b+=6;if(b>=12){b-=12;c.push((v>>b)&4095);}}for(const k of c){if(k===4095){d.length=256;n=256;w='';continue;}const e=k<n?d[k]:w+w[0];if(e===undefined)throw Error('Invalid data327');out+=e;if(w&&n<4095)d[n++]=w+e[0];w=e;}return JSON.parse(out)}"
def pack(s):
 d={chr(i):i for i in range(256)};n=256;w='';out=[]
 for c in s:
  q=w+c
  if q in d:w=q;continue
  out.append(d[w]);w=c
  if n<4095:d[q]=n;n+=1
  else:out.append(4095);d={chr(i):i for i in range(256)};n=256
 if w:out.append(d[w])
 bits=''.join(f'{k:012b}' for k in out);bits+='0'*((-len(bits))%8)
 return base64.b64encode(int(bits,2).to_bytes(len(bits)//8,'big')).decode().rstrip('=')
rows=[]
for p in Path('dist').glob('*.js'):
 if p.name.startswith('home'):continue
 s=p.read_text();changes=[]
 for m in re.finditer(r'(?:window|globalThis|root|r)\.[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)?\s*=\s*(?=[\[{])',s):
  try:o,n=json.JSONDecoder().raw_decode(s[m.end():])
  except:continue
  raw=s[m.end():m.end()+n]
  if len(raw)<1000:continue
  new='(globalThis.DecodeData327??=(%s))(%s)'%(fn,json.dumps(pack(json.dumps(o,separators=(',',':'),ensure_ascii=True))))
  if len(raw)-len(new)>250:changes.append((m.end(),m.end()+n,new))
 if not changes:continue
 new=s
 for a,b,t in reversed(changes):new=new[:a]+t+new[b:]
 Path('source-archive/build327',p.name).write_text(s);p.write_text(new);rows.append({'file':p.name,'before':len(s),'after':len(new)})
Path('reports327/data-pack.json').write_text(json.dumps(rows,indent=2));print('Lossless data-only encoding',len(rows),'files,',sum(q['before']-q['after'] for q in rows),'bytes saved')
