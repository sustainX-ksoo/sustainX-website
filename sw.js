const CACHE_NAME = 'sustainx-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/admin.html',
    '/manifest.json',
    '/images/section/hero/hero-bg.jpg',
    '/images/section/process/AdobeStock_584885060.jpg',
    '/images/section/services/AdobeStock_1235752382.jpg',
    '/images/section/cta/cta-bg.jpg',
    '/images/section/diff/AdobeStock_1186836910.jpg',
    '/images/admin/admin-bg.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
}); 