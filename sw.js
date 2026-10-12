/* Service worker do Treino da Bia: deixa o app funcionando sem internet.
   Ao mudar este arquivo, troque o número da versão abaixo pra forçar a atualização. */
const CACHE = 'treino-bia-v1';
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARQUIVOS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // A página: tenta a internet primeiro (pra pegar atualizações) e usa a cópia salva se estiver sem sinal.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put('./index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Fontes do Google: usa a cópia salva e atualiza por trás.
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE).then(async cache => {
        const saved = await cache.match(req);
        const fresh = fetch(req)
          .then(res => { cache.put(req, res.clone()); return res; })
          .catch(() => saved || Response.error());
        return saved || fresh;
      })
    );
    return;
  }

  // Arquivos do próprio site (ícones, manifest): cópia salva primeiro.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(saved => saved || fetch(req).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      }))
    );
  }
});
