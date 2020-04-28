const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
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
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheResult) => {
        return (
          cacheResult ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
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
});
