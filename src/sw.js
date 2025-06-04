// src/sw.js
const CACHE_NAME = 'seelirik-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/style.css',
  '/styles/auth-style.css',
  '/styles/input.css',
  '/styles/output.css',
  '/scripts/index.js',
  '/scripts/app.js',
  '/public/images/logo-seelirik.png',
  '/public/images/screenshot-desktop-1.png',
  '/public/images/screenshot-mobile-1.png',
  '/public/images/screenshot-desktop-2.png',
  '/public/images/screenshot-mobile-2.png',
  '/public/images/auth/background.png',
  '/public/images/auth/logo.png',
  '/public/menu.svg',
  '/public/video/contoh.mp4',
  '/scripts/pages/akun/akun-page.html',
  '/scripts/pages/auth/loginpage.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});