const CACHE_NAME = 'my-pwa-cache-v1';
var assets = [
    "https://harshebiz.github.io/my-pwa/",
    "https://harshebiz.github.io/my-pwa/index.html",
    "https://harshebiz.github.io/my-pwa/js/app.js",
    'https://harshebiz.github.io/my-pwa/icons/icon_32x32.png',
    'https://harshebiz.github.io/my-pwa/icons/icon_128x128.png',
    'https://harshebiz.github.io/my-pwa/icons/icon_256x256.png',
    'https://harshebiz.github.io/my-pwa/icons/icon_512x512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(assets);
      })
  );
});

// Activate event - delete old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - intercept requests to serve cached content
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});