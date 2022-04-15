const cacheName = 'v2';

// SW installation
// Cache the fetched files
self.addEventListener('install', (event) => {
  console.log('Service Worker: installed');
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
// When fetching assets, before connecting to the backend, look into the cache
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: fetching');
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Make a copy of the response
        const responseClone = response.clone();
        // Open cache
        caches.open(cacheName).then((cache) => {
          // Add the response to the cache
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch((error) =>
        caches.match(event.request).then((response) => response)
      )
  );
});
