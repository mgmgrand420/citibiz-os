export const core={
  get(sel){return document.querySelector(sel)||null;},
  set(sel,value){const n=this.get(sel); if(n) n.textContent=String(value); return !!n;},
  html(sel,value){const n=this.get(sel); if(n) n.innerHTML=String(value); return !!n;},
  value(sel,value){const n=this.get(sel); if(!n) return null; if(value!==undefined){n.value=value; return true;} return n.value;},
  attr(sel,name,val){const n=this.get(sel); if(!n) return false; if(val===undefined) return n.getAttribute(name); n.setAttribute(name,String(val)); return true;},
  addClass(sel,c){const n=this.get(sel); if(!n) return false; n.classList.add(c); return true;},
  removeClass(sel,c){const n=this.get(sel); if(!n) return false; n.classList.remove(c); return true;},
  exists(sel){return !!this.get(sel);},
  focus(sel){const n=this.get(sel); if(n && n.focus) n.focus(); return !!n;}
};