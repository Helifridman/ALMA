/* EnglishQuest Israel service worker: app-shell caching for offline use.
   Registered only in production builds (see AppShell). */
const CACHE = "englishquest-v1";
const PRECACHE = ["/", "/learn", "/review", "/achievements", "/parents", "/manifest.webmanifest", "/icons/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE).catch(() => undefined)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;
  const isNav = req.mode === "navigate";
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && (isNav || /\/_next\/static\/|\/icons\//.test(req.url))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => undefined);
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || (isNav ? caches.match("/") : undefined)))
  );
});
