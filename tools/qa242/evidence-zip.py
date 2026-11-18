"""Bounded, data-only QA ZIP transport. Never extract into production paths."""
import sys,zipfile,pathlib,stat,re,json,hashlib
MAX_ZIP=25_000_000;MAX_TOTAL=128*1024*1024;MAX_FILE=25_000_000
def safe(name):
 if not re.fullmatch(r'[A-Za-z0-9._/-]+',name) or name.startswith('/') or any(p in ('','.','..') for p in name.rstrip('/').split('/')):raise ValueError('Unsafe ZIP path: '+name)
 return name
def unpack(src,dest):
 src=pathlib.Path(src);dest=pathlib.Path(dest)
 if src.stat().st_size>MAX_ZIP:raise ValueError('ZIP exceeds GitHub attachment limit')
 with zipfile.ZipFile(src) as z:
  entries=z.infolist();seen=set();total=0
  if len(entries)>4096:raise ValueError('Too many ZIP entries')
  for e in entries:
   safe(e.filename);key=e.filename.rstrip('/').casefold()
   if key in seen:raise ValueError('Duplicate/case-colliding ZIP path')
   seen.add(key);mode=stat.S_IFMT(e.external_attr>>16)
   if mode not in (0,stat.S_IFREG,stat.S_IFDIR) or (e.flag_bits&1):raise ValueError('Links/special/encrypted ZIP entries forbidden')
   if e.file_size>MAX_FILE:raise ValueError('Oversized evidence file')
   total+=e.file_size
  if total>MAX_TOTAL:raise ValueError('Expanded evidence exceeds limit')
  if 'evidence-manifest.json' not in z.namelist():raise ValueError('Missing manifest')
  m=json.loads(z.read('evidence-manifest.json'));prefix=m.get('evidenceDirectory','')
  if not re.fullmatch(r'reports242/external/[a-z0-9][a-z0-9-]{0,79}',prefix):raise ValueError('Invalid evidence directory')
  allowed={'.json','.png','.webp','.jpg','.jpeg','.mp4','.webm','.txt','.md','.csv','.log'}
  for e in entries:
   if e.is_dir():
    if not (prefix.startswith(e.filename.rstrip('/')+'/') or e.filename.rstrip('/')==prefix or e.filename.startswith(prefix+'/')):raise ValueError('Unrelated directory')
    continue
   if e.filename!='evidence-manifest.json' and (not e.filename.startswith(prefix+'/') or pathlib.PurePosixPath(e.filename).suffix.lower() not in allowed):raise ValueError('Only scoped data files may be imported')
  dest.mkdir(parents=True,exist_ok=True)
  for e in entries:
   if e.is_dir():continue
   target=dest/pathlib.PurePosixPath(e.filename);target.parent.mkdir(parents=True,exist_ok=True)
   with z.open(e) as inp,target.open('xb') as out:
    count=0
    while True:
     b=inp.read(65536)
     if not b:break
     count+=len(b)
     if count>e.file_size:raise ValueError('ZIP size mismatch')
     out.write(b)
   if count!=e.file_size:raise ValueError('Incomplete ZIP entry')
 print(json.dumps({'files':len([e for e in entries if not e.is_dir()]),'expandedBytes':total}))
def pack(src,dest):
 src=pathlib.Path(src);dest=pathlib.Path(dest)
 with zipfile.ZipFile(dest,'x',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for p in sorted(src.rglob('*')):
   if p.is_symlink():raise ValueError('Symlink in staging input')
   if p.is_file():z.write(p,safe(p.relative_to(src).as_posix()))
 if dest.stat().st_size>MAX_ZIP:raise ValueError('ZIP exceeds 25MB; required evidence must not be silently omitted')
 print(json.dumps({'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}))
if __name__=='__main__':
 if len(sys.argv)!=4 or sys.argv[1] not in ('unpack','pack'):raise SystemExit('Use evidence-zip.py unpack|pack INPUT OUTPUT')
 (unpack if sys.argv[1]=='unpack' else pack)(sys.argv[2],sys.argv[3])
