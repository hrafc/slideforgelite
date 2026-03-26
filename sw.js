const CACHE_NAME = "slideforge-lite-v9.2";
const ASSETS = [
  "/slideforgelite/",
  "/slideforgelite/index.html",
  "/slideforgelite/manifest.json",
  "/slideforgelite/logo-star.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
