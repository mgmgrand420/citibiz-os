import { Vault } from './vault.js';
import { core as domCore } from './dom/core.js';
import { query as domQuery } from './dom/query.js';
import { html as domHtml } from './dom/html.js';

const registry = new Map([
  ['Math.sum', (...args)=> args.flat().reduce((a,b)=> a + Number(b||0), 0) ],
  ['dom.query.value', (sel)=> domQuery.value(sel) ],
  ['dom.html.update', (sel, text)=> domHtml.update(sel, text) ]
]);
export const asx = { dom: { core: domCore, query: domQuery, html: domHtml }, registry };

async function readText(file){return await new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(String(fr.result));fr.onerror=rej;fr.readAsText(file);});}

export async function runActions(spec, ctx={}){
  const seq=spec.do||[];
  for(const step of seq){
    const key = Object.keys(step)[0];
    if(key && key.startsWith('dom.')){ await runDomCall(step); continue; }
    const n=step.action; if(!n) continue;
    if(n==='ui.navigate'){ location.hash = '#/'+(step.to||'login'); }
    else if(n==='ui.toast'){ domHtml.toast(step.value||'OK'); }
    else if(n==='vault.create'){ const pwd=val(step.password,ctx); await Vault.create(pwd); }
    else if(n==='vault.import'){ const f=val(step.file,ctx); const pwd=val(step.password,ctx); const txt=typeof f==='string'? f: await readText(f); await Vault.import(txt,pwd); }
    else if(n==='vault.write'){ await Vault.write(step.path, val(step.value,ctx)); }
    else if(n==='wallet.login'){ if(!window.ethereum){ domHtml.toast('No wallet'); continue; } await window.ethereum.request({method:'eth_requestAccounts'}); document.cookie='session=wallet_ok; Path=/; SameSite=Lax'; }
    else if(n==='asx.flow'){ await runNamedFlow(step.name||''); }
  }
}

export async function runFlow(flow){
  const steps = Array.isArray(flow)? flow : [flow];
  for(const step of steps){
    if(step && Object.prototype.hasOwnProperty.call(step,'if')){
      const cond = !!(typeof step['if']==='boolean' ? step['if'] : false);
      if(cond){ if(step.then) await runFlow(step.then); }
      else { if(step.else) await runFlow(step.else); }
      continue;
    }
    const key = Object.keys(step||{})[0];
    if(key && key.startsWith('dom.')){ await runDomCall(step); continue; }
    if(step && step.action){ await runActions({do:[step]}); }
  }
}

async function runNamedFlow(name){
  try{
    const resp = await fetch('/asx/actions.json'); const map = await resp.json();
    const flow = map.flows?.[name]; if(flow) await runFlow(flow);
  }catch(e){ console.error(e); }
}

export function callFunc(name, args=[]){
  const fn = registry.get(name);
  if(!fn) throw new Error('Unknown func '+name);
  return fn(...args);
}

function val(v,ctx){ if(typeof v==='string' && /^\{\{#.+\}\}$/.test(v)) return ctx[v.slice(3,-2)]; return v; }

async function runDomCall(node){
  const name = Object.keys(node)[0]; const args = node[name];
  const [ns, group, method] = name.split('.');
  if(ns!=='dom') return;
  const mod = group==='core'? domCore : group==='query'? domQuery : domHtml;
  const fn = mod?.[method];
  const arr = Array.isArray(args)? args : [args];
  if(typeof fn==='function') return fn(...arr);
}
