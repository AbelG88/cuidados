const CACHE_NAME = 'gurises-v12';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png?v=5',
  './icons/icon-512.png?v=5'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia: red primero; si hay red se guarda copia (solo del sitio y de las librerías por CDN),
// y si no hay red se responde con la copia guardada. Firestore no se cachea: sus datos siempre van a la red.
const CACHEABLE_HOSTS = ['www.gstatic.com', 'cdnjs.cloudflare.com'];
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const cacheable = url.origin === self.location.origin || CACHEABLE_HOSTS.includes(url.hostname);
  if (!cacheable) return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
