const cacheName = 'nov2018-cache';
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
  '/assets/kenney-sounds/coin1.mp3',
  '/assets/kenney-sounds/coin1.ogg',
  '/assets/kenney-sounds/explosion1.mp3',
  '/assets/kenney-sounds/explosion1.ogg',
  '/assets/kenney-sounds/gameover3.mp3',
  '/assets/kenney-sounds/gameover3.ogg',
  '/assets/kenney-sounds/jingles_NES03.mp3',
  '/assets/kenney-sounds/jingles_NES03.ogg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheUrls);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request, { ignoreSearch: true })
        .then((response) => {
          if (response) {
            return response;
          }

          if (e.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index-offline.html');
          }
        });
    })
  );
});
