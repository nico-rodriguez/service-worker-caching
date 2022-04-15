const cacheName = 'v1';

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js',
];

// SW installation
// Cache the fetched files
self.addEventListener('install', (event) => {
  console.log('Service Worker: installed');

  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// SW activation
// Clear previous cached assets
self.addEventListener('activate', (event) => {
  console.log('Service Worker: activated');
  // Remove previously cached assets
  event.waitUntil(
    caches.keys().then((cacheNamesInBrowser) => {
      return Promise.all(
        cacheNamesInBrowser.map((cacheNameInBrowser) => {
          if (cacheName !== cacheNameInBrowser) {
            console.log('Service Worker: clearing previous cache');
            return caches.delete(cacheNameInBrowser);
          }
        })
      );
    })
  );
});

// SW fetching
// When fetching assets, if the fetch failed (maybe offline), look into the cache
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: fetching');
  event.respondWith(
    fetch(event.request).catch(() => {
      caches.match(event.request);
    })
  );
});
