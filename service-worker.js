// Update the cache name version to promote a new set of files to all clients.
// When a client is closed, next time it opens, the new files will activate
// if they got installed the previous time the game was installed.
const cacheName = 'nov2018-cache-1.7.0';
const mutableRequests = [
  'index.html',
  '/',
  'build/game.min.js',
  'manifest.json',
];

// Long term cache for immutableRequests isn't going to be updated,
// so to save resources and bandwidth, it is kept separate.
const immutableRequests = [
  'index-offline.html',
  'favicon.ico',
  'robots.txt',
  'https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser.min.js',
  'assets/logo.svg',
  'assets/sky.svg',
  'assets/platform.svg',
  'assets/star.svg',
  'assets/bomb.svg',
  'assets/hero.png',
  'assets/icons-192.png',
  'assets/icons-512.png',
  'assets/kenney-sounds/coin1.ogg',
  'assets/kenney-sounds/explosion1.ogg',
  'assets/kenney-sounds/gameover3.ogg',
  'assets/kenney-sounds/jingles_NES03.ogg',
  'assets/kenney-sounds/coin1.mp3',
  'assets/kenney-sounds/explosion1.mp3',
  'assets/kenney-sounds/gameover3.mp3',
  'assets/kenney-sounds/jingles_NES03.mp3',
];

// Once a service worker has successfully installed, it enters the "installed" state.
// It will then immediately move on to the "activating" state, unless another active
// service worker is currently controlling this game, in which case it will remain "waiting".
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      const newImmutableRequests = [];
      return Promise.all(
        immutableRequests.map((url) => {
          return caches.match(url).then((response) => {
            if (response) {
              return cache.put(url, response);
            } else {
              newImmutableRequests.push(url);
              return Promise.resolve();
            }
          });
        })
      ).then(() => {
        return cache.addAll(newImmutableRequests.concat(mutableRequests))
      });
    })
  );
});

// Before a service worker becomes active and takes control of the game,
// the "activate" event is triggered. Similar to the installing state, the
// "activating" state can also be extended by calling "event.waitUntil()" and
// passing it a promise.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    // caches.keys() returns a Promise that resolves to an array contraining
    // the names of all the caches we created in our game.
    caches.keys().then((cacheNames) => {
      // Promise.all() takes an array of promises and returns a single promise that only
      // resolves once all the promises in that array have been resolved.
      // If any of these Promises are rejected, the whole Promise.all is also rejected.
      return Promise.all(
        cacheNames.map((_cacheName) => {
          // Delete old caches that are no longer needed, if they are not the
          // one cache currently needed by the game.
          if (_cacheName !== cacheName && cacheName.startsWith('nov2018-cache')) {
            return caches.delete(_cacheName);
          } 
        })
      );
    })
  );
});

// Once a service worker is activated, it is ready to take control of the page
// and listen to functional events such as "fetch".
// This intercepts HTTP requests and handle them with a response from the cache, if any.
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request, { ignoreSearch: true })
        .then((response) => {
          if (response) {
            return response;
          }

          // Fallback to the offline page if cache fails.
          if (e.request.headers.get('accept').includes('text/html')) {
            return caches.match('index-offline.html');
          }
        });
    })
  );
});
