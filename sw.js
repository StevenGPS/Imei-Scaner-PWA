const C = 'escaner-imei-v3';
const ASSETS = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png',
  'https://cdn.jsdelivr.net/npm/barcode-detector@3.2.2/dist/iife/ponyfill.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'];
const put = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(C).then(c => c.put(req, cp)).catch(()=>{}); } return res; };
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => Promise.all(ASSETS.map(a => c.add(a).catch(()=>{}))))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const local = new URL(e.request.url).origin === location.origin;
  // Archivos propios: red primero (para recibir actualizaciones de Netlify), caché si no hay internet.
  // Librerías CDN (versión fija): caché primero.
  e.respondWith(local
    ? fetch(e.request).then(res => put(e.request, res)).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
    : caches.match(e.request).then(r => r || fetch(e.request).then(res => put(e.request, res))));
});
