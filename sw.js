var CACHE='digest-v-20261007-0812';
var CORE=['./','./index.html','./style.css','./theme.js','./search.js',
  './sw-register.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(CORE);})
    .then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE;})
      .map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch', function(e){
  if(e.request.method!=='GET')return;
  if(new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(function(hit){
    if(hit)return hit;
    return fetch(e.request).then(function(rep){
      if(rep.ok){
        var cl=rep.clone();
        caches.open(CACHE).then(function(c){c.put(e.request,cl);});
      }
      return rep;
    });
  }));
});
