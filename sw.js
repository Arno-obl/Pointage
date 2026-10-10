// Pointage chantier — fonctionnement hors ligne.
// Change VERSION à chaque mise à jour de l'appli.
const VERSION = "pointage-v12";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  // cache: "reload" = on ignore le cache du navigateur pour prendre les fichiers tout juste publiés
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(FILES.map(f => fetch(f, { cache: "reload" }).then(r => { if (r.ok) return c.put(f, r); })))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === "navigate" || req.destination === "document";
  e.respondWith(caches.open(VERSION).then(async cache => {
    if (isPage) {
      // Page de l'appli : réseau d'abord (pour avoir la dernière version), cache si pas de réseau
      try {
        const res = await Promise.race([fetch(req, { cache: "no-cache" }), new Promise((_, rej) => setTimeout(() => rej(new Error("lent")), 4000))]);
        if (res.ok) { cache.put("./index.html", res.clone()); return res; }
      } catch {}
      return (await cache.match("./index.html")) || (await cache.match("./")) || fetch(req);
    }
    const hit = await cache.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
    return hit || (await net) || new Response("", { status: 504 });
  }));
});
