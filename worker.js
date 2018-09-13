// Flag for enabling cache in production
var doCache = true;

var CACHE_NAME = 'bankeeper-cache';

// Delete old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// This triggers when user starts the app
self.addEventListener('install', function (event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {
          cache.addAll([
            '/css/*.css',
            '/js/*.js',
            '/*.html',
            '/images/categories/*.png',
          ]);
        })
    );
  }
});

// Here we intercept request and serve up the matching files
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});