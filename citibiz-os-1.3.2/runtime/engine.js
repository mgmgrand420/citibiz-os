import { UI } from './render.js';
async function loadJSON(p){const r=await fetch(p);if(!r.ok) throw new Error('load '+p);return await r.json();}
export default async function boot(){
  const routes=await loadJSON('/router/routes.json');
  const pages={'boot':await loadJSON('/xjson/boot.json'),'login':await loadJSON('/xjson/login.json'),'dashboard':await loadJSON('/xjson/dashboard.json')};
  const app=document.getElementById('app');
  const render=()=>{const h=location.hash||'#/' ;let page=routes.defaultPage;for(const r of routes.routes){if(h.startsWith(r.path)){page=r.page;break;}} UI.mount(app,pages[page]);};
  window.addEventListener('hashchange',render); render();
}