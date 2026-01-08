
const CACHE_NAME = 'mosque-board-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Nova+Mono&family=Orbitron:wght@400..900&display=swap',
  'https://fonts.cdnfonts.com/css/digital-7-mono'
];

// Install: Simpan aset utama
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate: Hapus cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch: Strategi Cache First, then Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request).then((networkResponse) => {
        // Jangan simpan response yang gagal
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Cache aset eksternal penting (CDN)
        if (event.request.url.includes('esm.sh') || event.request.url.includes('fonts.')) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // Fallback offline jika gagal total
      if (event.request.destination === 'image') {
        return caches.match('https://picsum.photos/seed/masjid-logo/200');
      }
    })
  );
});
