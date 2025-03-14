self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("app-cache").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/app.js",
                "/styles.css",
                "/manifest.json",
                "/404.html"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(() => caches.match("/404.html"))
    );
});

self.addEventListener("push", event => {
    const options = {
        body: event.data ? event.data.text() : "Notifikasi Baru!",
        icon: "/icons/icon-192.png"
    };
    event.waitUntil(
        self.registration.showNotification("My PWA App", options)
    );
});
