const CACHE_NAME = "appclimatizacao-v1";
const APP_BASE = "/APPclimatizacao";

const ASSETS = [
  `${APP_BASE}/`,
  `${APP_BASE}/menu/index.html`,
  `${APP_BASE}/android/index.html`,
  `${APP_BASE}/ios/index.html`,
  `${APP_BASE}/erros/index.html`,
  `${APP_BASE}/erros/dados-erros-final-split-pisoteto.json`,
  `${APP_BASE}/carga/index.html`,
  `${APP_BASE}/pwa-register.js`,
  `${APP_BASE}/icons/icon-192.png`,
  `${APP_BASE}/icons/icon-512.png`,
  `${APP_BASE}/icons/icon-192-maskable.png`,
  `${APP_BASE}/icons/icon-512-maskable.png`
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then(cached => {
      return cached || fetch(req).then(networkResp => {
        const copy = networkResp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
        return networkResp;
      }).catch(() => cached);
    })
  );
});
