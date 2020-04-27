const staticCacheName = 'site-static';
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
});

self.addEventListener('fetch', (evt) => {
  console.log('fetch event', evt);
});
