// as the service worker is installing, an array of files is added to the cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-reviews-v1')
    .then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'restaurant.html',
        'css/styles.css',
        'data/restaurants.json',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
        'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png'
      ]);
    })
  );
});

/*
  when any network request is made, the service worker intercepts it, and checks
  to see if that file exists in the cache. If it does, the service worker serves
  that file from the cache. If it does NOT, then the url is fetched and added
  to the cache.
*/
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      if (resp) {
        return resp;
      } else {
        console.log('not cached:', event.request.url);
        caches.open('restaurant-reviews-v1').then(function(cache) {
          cache.add(event.request.url)
        })
        return fetch(event.request);
      }
    })
  );
});
