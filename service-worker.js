'use strict';

const cacheName = 'nov2018-cache-v1';
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

// Installation step is first. May or may not succeed.
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheUrls);
    })
  );
});

// Activation step of code that has been installed.
self.addEventListener('activate', (e) => {
  const current = e;
});

// Intercept HTTP requests and handle them with a response from the cache, if any.
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
