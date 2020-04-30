const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'site-dynamic-v2';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/materialize.min.js',
  '/js/ui.js',
  '/css/materialize.min.css',
  '/css/styles.css',
  '/favicon.ico',
  '/img/dish.jpg ',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/pages/fallback.html',
];

//  cache size limitation
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener('install', (evt) => {
  console.log('SW has been installed!', evt);
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('cashing shell assets');
      cache.addAll(assets);
    }),
  );
});

self.addEventListener('activate', (evt) => {
  console.log('SW has been activated!', evt);
  evt.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);
      return Promise.all(
        keys
          .filter(
            (key) =>
              key !== staticCacheName && key !== dynamicCacheName,
          )
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

self.addEventListener('fetch', (evt) => {
  console.log('fetch event', evt);
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheResult) => {
          return (
            cacheResult ||
            fetch(evt.request).then((fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(evt.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (evt.request.url.indexOf('.html') > -1) {
            return caches.match('/pages/fallback.html');
          }
        }),
    );
  }
});
