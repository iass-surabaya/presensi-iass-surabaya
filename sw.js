const CACHE_NAME = 'kiosk-iass-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://i.imgur.com/0rgogYv.png',
  'https://i.imgur.com/5CKy22W.png'
];

// Saat aplikasi pertama kali dibuka, simpan semua aset ke memori HP
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Saat aplikasi memanggil data, cek apakah ada di memori. Jika ada, gunakan memori (bisa offline)
self.addEventListener('fetch', event => {
  // Biarkan perintah POST (pengiriman data absen ke server) tetap jalan pakai internet
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Tampilkan dari Cache (Offline)
        }
        return fetch(event.request); // Ambil dari Internet (Online)
      })
  );
});
