const CACHE_NAME = 'app-financeiro-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/add_despesas.html',
    '/add_receita.html',
    '/cadastro.html',
    '/relatorio.html',
    '/visaogeral.html',
    '/css/add_despesas.css',
    '/css/add_receita.css',
    '/css/cadastro.css',
    '/css/login.css',
    '/css/relatorio.css',
    '/css/visaogeral.css',
    '/js/add_despesas.js',
    '/js/add_receita.js',
    '/js/cadastro.js',
    '/js/login.js',
    '/js/relatorio.js',
    '/js/visaogeral.js',
    '/icons/256x256.png',
    '/icons/512x512.png'
];

// Instalando o Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptando requisições para uso offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});
