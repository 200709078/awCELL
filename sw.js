// awCELL service worker: önce ağ, ağ yoksa önbellek. Böylece yayınlanan yeni sürüm hemen gelir,
// internet kesikken de son açılan sürüm çalışır.
const CACHE = "awcell-v1";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.addAll(["./", "index.html", "style.css", "app.js", "formula.js", "fileio.js", "vendor/chart.js"]))
            .catch(() => {})
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                if (response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
                }
                return response;
            })
            .catch(() => caches.match(request, { ignoreSearch: true })
                .then((cached) => cached ?? (request.mode === "navigate" ? caches.match("index.html") : undefined))
                .then((response) => response ?? Response.error()))
    );
});
