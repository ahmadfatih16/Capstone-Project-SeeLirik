const CACHE_NAME = 'seelirik-cache-v1';
const urlsToCache = [
  './index.html',
  './public/manifest.json',
  './styles/style.css',
  './scripts/index.js',
  './public/images/logo-seelirik.png',
  './public/images/logo-seelirik-box.png',
  './public/images/screenshot-desktop-1.png',
  './public/images/screenshot-mobile-1.png',
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
