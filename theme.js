function applyThemeColor(){
  var m=document.querySelector('meta[name="theme-color"]');
  if(m)m.content=document.documentElement.classList.contains('dark')
    ? '#191817' : '#faf9f6';
}
function initTheme(){
  var saved = localStorage.getItem('theme');
  if(saved==='dark'||saved==='light'){
    document.documentElement.classList.toggle('dark', saved==='dark');
  } else if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    document.documentElement.classList.add('dark');
  }
  applyThemeColor();
  var b=document.querySelector('.theme');
  if(b) b.onclick=function(){
    var d=document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', d?'dark':'light');
    applyThemeColor();
  };
}
document.addEventListener('DOMContentLoaded', initTheme);
