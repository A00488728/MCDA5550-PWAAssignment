const CACHE_NAME = "todo-app-cache-v6";  // Updated cache version
const urlsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json",
];

// Install event - force the service worker to take control immediately
self.addEventListener("install", (event) => {
    self.skipWaiting();  // Force waiting service worker to become active immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching files during install");
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event - serve resources from the cache first, and fall back to the network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;  // Return cached response if found
            }
            return fetch(event.request);  // Else fetch from network
        })
    );
});

// Activate event - delete old caches and claim control immediately
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];  // Only keep the current version's cache
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        // Delete old caches
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();  // Take control of all clients immediately
});
