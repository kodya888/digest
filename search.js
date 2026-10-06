(function(){
  var idx=window.__index||[];
  var q=document.getElementById('q'), out=document.getElementById('results');
  if(!q||!out||!idx.length)return;
  q.focus();
  var t;
  q.addEventListener('input',function(){
    clearTimeout(t);
    t=setTimeout(function(){run(q.value);},120);
  });
  function run(raw){
    out.innerHTML='';
    qv=raw.trim().toLowerCase();
    if(qv.length<2){out.style.display='none';return;}
    var words=qv.split(/\s+/).filter(Boolean);
    var hits=[];
    for(var i=0;i<idx.length&&hits.length<8;i++){
      var e=idx[i],t=e.text.toLowerCase(),ok=true;
      for(var w=0;w<words.length;w++){if(t.indexOf(words[w])<0){ok=false;break;}}
      if(ok)hits.push(e);
    }
    var html='';
    for(var h=0;h<hits.length;h++){
      var e=hits[h],pos=e.text.toLowerCase().indexOf(words[0]);
      var snippet=pos>=0?e.text.slice(Math.max(0,pos-70),pos+140):e.text.slice(0,180);
      snippet=snippet.replace(/[<>&"]/g,'').trim();
      for(var w=0;w<words.length;w++){
        var re=new RegExp(words[w].replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
        snippet=snippet.replace(re,'<b>$&</b>');
      }
      html+='<a href="'+e.url+'"><span class="d">'+e.date+'</span> — '+snippet+'…</a>';
    }
    out.innerHTML=html||'<div class="none">Ничего не найдено</div>';
    out.style.display='block';
  }
})();
