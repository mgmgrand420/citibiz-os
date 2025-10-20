export const Desktop=(function(){
  const state={z:1, windows:[]};
  function mkWin(id,title,content){
    const w=document.createElement('div'); w.className='win'; w.style.left=Math.random()*200+60+'px'; w.style.top=Math.random()*80+60+'px'; w.style.zIndex=++state.z; w.dataset.id=id;
    const t=document.createElement('div'); t.className='title';
    const tt=document.createElement('div'); tt.textContent=title;
    const btns=document.createElement('div');
    const x=document.createElement('button'); x.textContent='×'; x.className='dockbtn'; x.onclick=()=>w.remove();
    t.appendChild(tt); t.appendChild(btns); btns.appendChild(x);
    const b=document.createElement('div'); b.className='body'; b.innerHTML=content||'<em>Empty</em>';
    w.appendChild(t); w.appendChild(b);
    drag(w,t);
    document.querySelector('#desktop').appendChild(w);
    w.addEventListener('mousedown',()=>w.style.zIndex=++state.z);
    return w;
  }
  function drag(box, handle){
    let sx=0, sy=0, ox=0, oy=0, down=false;
    handle.addEventListener('mousedown',e=>{down=true; sx=e.clientX; sy=e.clientY; const r=box.getBoundingClientRect(); ox=r.left; oy=r.top; e.preventDefault();});
    document.addEventListener('mousemove',e=>{if(!down) return; const dx=e.clientX-sx, dy=e.clientY-sy; box.style.left=(ox+dx)+'px'; box.style.top=(oy+dy)+'px';});
    document.addEventListener('mouseup',()=>down=false);
  }
  function openApp(id){
    if(id==='wallet'){ return mkWin('wallet','Wallet', '<div>Wallet panel<br/><button class="dockbtn" onclick="alert(\'Connect Wallet\')">Connect</button></div>'); }
    if(id==='vault'){ return mkWin('vault','Vault', '<div>Vault tools<br/><button class="dockbtn" onclick="alert(\'Backup Vault\')">Backup</button></div>'); }
    if(id==='payments'){ return mkWin('payments','Payments', '<div>Checkout / P2P hub</div>'); }
    return mkWin('app:'+id, id, '<div>App '+id+'</div>');
  }
  return { openApp };
})();