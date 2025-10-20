const http=require('http'),fs=require('fs'),path=require('path'),url=require('url');
const PORT=parseInt(process.argv[2]||'4640',10); const ROOT=path.join(__dirname,'..');
const MIME={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
const STRICT_DIRS=['/runtime/','/xjson/','/asx/','/router/','/css/','/server/'];

function send(res,code,buf,type){res.writeHead(code,{'Content-Type':(type||'text/plain')+'; charset=utf-8','Cache-Control':'no-cache'});res.end(buf);}
function serveFile(res, absPath){
  fs.readFile(absPath,(e,b)=>{
    if(e){ send(res,404,'Not found'); return; }
    const ext=path.extname(absPath).toLowerCase(); const mt=MIME[ext]||'application/octet-stream';
    send(res,200,b,mt);
  });
}

http.createServer((req,res)=>{
  const parsed=url.parse(req.url); let pathname=decodeURIComponent(parsed.pathname || '/');
  if(pathname==='/') pathname='/index.html';

  const abs=path.join(ROOT, pathname.replace(/^\/+/, ''));
  // If request is under a STRICT_DIR, require exact file match or 404
  const strict = STRICT_DIRS.some(p => pathname.startsWith(p));
  fs.stat(abs,(err,stat)=>{
    if(!err && stat.isFile()){
      serveFile(res,abs);
    } else {
      if(strict){
        send(res,404,'Not found');
      } else {
        // SPA fallback
        serveFile(res, path.join(ROOT,'index.html'));
      }
    }
  });
}).listen(PORT,()=>console.log(`🛰 JSON-OS runtime http://localhost:${PORT}`));
