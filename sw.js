// RAUS Service Worker: App-Shell offline, Wetter immer frisch (Cache macht die App selbst).
const VERSION = "raus-v14";
const SHELL = ["/", "/raus-index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Wetter- und Ortsdaten: nie aus dem SW-Cache.
  if (u.hostname.endsWith("open-meteo.com")) return;
  // Schriften: einmal holen, dann aus dem Cache.
  if (u.hostname.includes("fonts.googleapis.com") || u.hostname.includes("fonts.gstatic.com")) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      const res = await fetch(e.request);
      if (res.ok || res.type === "opaque") c.put(e.request, res.clone());
      return res;
    }));
    return;
  }
  // App-Shell: Netz zuerst, offline aus dem Cache.
  if (u.origin === location.origin) {
    e.respondWith(fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("/raus-index.html"))));
  }
});
