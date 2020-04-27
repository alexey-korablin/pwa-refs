self.addEventListener('install', (evt) => {
  console.log('SW has been installed!', evt);
});

self.addEventListener('activate', (evt) => {
  console.log('SW has been activated!', evt);
});
