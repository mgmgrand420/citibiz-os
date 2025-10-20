import { core } from './core.js';
export const html={
  update(sel,text){return core.set(sel,text);},
  focus(sel){return core.focus(sel);},
  toast(msg){alert(String(msg||'OK'));},
  show(sel){const n=core.get(sel); if(n) n.style.display=''; return !!n;},
  hide(sel){const n=core.get(sel); if(n) n.style.display='none'; return !!n;},
  validate(sel, rules={}){
    const n=core.get(sel); if(!n) return {ok:false, reason:'not-found'};
    const v=('value' in n)? String(n.value||''): (n.textContent||'');
    if(rules.required && !v.trim()) return {ok:false, reason:'required'};
    if(rules.type==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return {ok:false, reason:'email'};
    return {ok:true};
  }
};