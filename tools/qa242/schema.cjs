'use strict';
// Small, explicit JSON Schema subset used by QA242 records. Unsupported keywords fail.
const supported=new Set(['$schema','$id','title','description','type','properties','required','additionalProperties','items','minItems','uniqueItems','enum','const','pattern','minLength','minimum']);
function validate(value,schema,at='$',errors=[]){
 for(const key of Object.keys(schema))if(!supported.has(key))throw Error('Unsupported schema keyword '+key);
 const type=Array.isArray(value)?'array':value===null?'null':typeof value;
 if(schema.type&&type!==schema.type){errors.push(at+': expected '+schema.type);return errors;}
 if(schema.enum&&!schema.enum.includes(value))errors.push(at+': invalid enum value');
 if('const'in schema&&value!==schema.const)errors.push(at+': invalid constant');
 if(type==='string'){
  if(schema.minLength!==undefined&&value.length<schema.minLength)errors.push(at+': empty/short value');
  if(schema.pattern&&!new RegExp(schema.pattern).test(value))errors.push(at+': invalid format');
 }
 if(type==='number'&&(!Number.isFinite(value)||schema.minimum!==undefined&&value<schema.minimum))errors.push(at+': invalid number');
 if(type==='array'){
  if(value.length<(schema.minItems||0))errors.push(at+': missing items');
  if(schema.uniqueItems&&new Set(value.map(q=>JSON.stringify(q))).size!==value.length)errors.push(at+': duplicate items');
  if(schema.items)value.forEach((q,i)=>validate(q,schema.items,at+'['+i+']',errors));
 }
 if(type==='object'){
  for(const key of schema.required||[])if(!Object.hasOwn(value,key))errors.push(at+'.'+key+': required');
  for(const [key,q]of Object.entries(value)){
   if(schema.properties?.[key])validate(q,schema.properties[key],at+'.'+key,errors);
   else if(schema.additionalProperties===false)errors.push(at+'.'+key+': undeclared field');
  }
 }
 return errors;
}
module.exports={validate};
