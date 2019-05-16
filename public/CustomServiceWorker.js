console.log("Custom Service Worker");

self.addEventListener('install', event => {
    console.log('The service worker is being installed.');
});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
    /\.(?:js|css|html)$/,
    workbox.strategies.networkFirst(),
  )

workbox.routing.registerRoute(
    'https://express-push.herokuapp.com',
    workbox.strategies.networkFirst()
  )
  workbox.routing.registerRoute(
    'https://express-push.herokuapp.com/',
    workbox.strategies.networkFirst()
  )
  workbox.routing.registerRoute(
    'https://express-push.herokuapp.com/news',
    workbox.strategies.networkFirst()
  )

  workbox.routing.registerRoute(
    'https://express-push.herokuapp.com/calendar',
    workbox.strategies.networkFirst()
  )
  workbox.routing.registerRoute(
    'https://express-push.herokuapp.com/getNews',
    workbox.strategies.networkFirst()
  )

  workbox.routing.registerRoute(
    'https://express-push.herokuapp.com/getDays',
    workbox.strategies.networkFirst()
  )

  

self.addEventListener('push', function (event) {
    const data = event.data.json();
    console.log("Getting push data", data);
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.msg,
            vibrate: [500, 100, 500]
        })
    );
});