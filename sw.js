const CACHE_NAME = "slideforge-lite-v12.6.5";
const ASSETS = [
  "/slideforgelite/",
  "/slideforgelite/index.html",
  "/slideforgelite/manifest.json",
  "/slideforgelite/icon-192-tight.png",
  "/slideforgelite/icon-512-tight.png",
  "/slideforgelite/logo-star.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
