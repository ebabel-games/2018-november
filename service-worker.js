// Update the cache name version to promote a new set of files to all clients.
// When a client is closed, next time it opens, the new files will activate
// if they got installed the previous time the game was installed.
const cacheName = 'nov2018-cache-v1.4.0';
const cacheUrls = [
  '/index-offline.html',
  '/index.html',
  '/',
  '/favicon.ico',
  '/robots.txt',
  '/assets/logo.svg',
  'https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser.min.js',
  '/build/game.min.js',
  '/assets/sky.svg',
  '/assets/platform.svg',
  '/assets/star.svg',
  '/assets/bomb.svg',
  '/assets/hero.png',
  '/assets/kenney-sounds/coin1.ogg',
  '/assets/kenney-sounds/explosion1.ogg',
  '/assets/kenney-sounds/gameover3.ogg',
  '/assets/kenney-sounds/jingles_NES03.ogg',
  '/assets/kenney-sounds/coin1.mp3',
  '/assets/kenney-sounds/explosion1.mp3',
  '/assets/kenney-sounds/gameover3.mp3',
  '/assets/kenney-sounds/jingles_NES03.mp3',
];

// Once a service worker has successfully installed, it enters the "installed" state.
// It will then immediately move on to the "activating" state, unless another active
// service worker is currently controlling this game, in which case it will remain "waiting".
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheUrls);
    })
  );
});

// Before a service worker becomes active and takes control of the game,
// the "activate" event is triggered. Similar to the installing state, the
// "activating" state can also be extended by calling "event.waitUntil()" and
// passing it a promise.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((_cacheName) => {
          // Delete old caches that are no longer needed.
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
            return caches.match('/index-offline.html');
          }
        });
    })
  );
});
