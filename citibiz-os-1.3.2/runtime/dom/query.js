import { core } from './core.js';
export const query={
  text(sel){const n=core.get(sel); return n? (n.textContent||''):'';},
  value(sel){const n=core.get(sel); return n? (n.value??''):'';},
  exists(sel){return core.exists(sel);},
  html(sel){const n=core.get(sel); return n? (n.innerHTML||''):'';}
};