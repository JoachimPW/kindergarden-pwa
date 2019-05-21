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
    'https://localhost:3000',
    workbox.strategies.networkFirst()
  )

workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com',
    workbox.strategies.networkFirst()
  )
  workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com/',
    workbox.strategies.networkFirst()
  )
  workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com/news',
    workbox.strategies.networkFirst()
  )

  workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com/calendar',
    workbox.strategies.networkFirst()
  )
  
  workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com/getNews',
    workbox.strategies.networkFirst()
  )

  workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com/getDays',
    workbox.strategies.networkFirst()
  )

  const bgSyncPlugin = new workbox.backgroundSync.Plugin('todoQueue', {
    maxRetentionTime: 24 * 60
  });
  
  workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com/createNews',
    workbox.strategies.networkFirst({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  )

  workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com/api/push_message',
    workbox.strategies.networkFirst({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  )

  workbox.routing.registerRoute(
    'https://kindergarden-pwa.herokuapp.com/changeTime/5cdac5129e4bbdc614ec37bd',
    workbox.strategies.networkFirst({
      plugins: [bgSyncPlugin]
    }),
    'PUT'
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