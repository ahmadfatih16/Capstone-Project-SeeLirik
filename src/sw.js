const CACHE_NAME = 'seelirik-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/styles/style.css',
  '/src/styles/auth-style.css',
  '/src/styles/input.css',
  '/src/styles/output.css',
  '/src/scripts/index.js',
  '/src/scripts/app.js',
  // Tambahkan semua aset statis penting yang ingin Anda cache
  // seperti gambar, font, HTML template, CSS, JS, dll.
  '/src/public/images/auth/background.png',
  '/src/public/images/auth/logo.png',
  // ... dan semua gambar lainnya di src/public/images/
  '/src/public/menu.svg',
  '/src/public/video/contoh.mp4', // Jika Anda ingin video ini offline juga
  // Anda mungkin perlu menambahkan semua halaman HTML Anda juga
  '/src/scripts/pages/akun/akun-page.html',
  '/src/scripts/pages/auth/loginpage.html',
  // ... dll
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
        // Cache hit - return response
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