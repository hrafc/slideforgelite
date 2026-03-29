const CACHE_NAME = "slideforge-lite-v12.9.9";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192-tight.png",
  "./icon-512-tight.png",
  "./logo-star.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of ASSETS) {
        try {
          const response = await fetch(asset, { cache: "no-cache" });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          await cache.put(asset, response.clone());
          console.log("Cached:", asset);
        } catch (err) {
          console.error("Failed to cache:", asset, err);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
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
