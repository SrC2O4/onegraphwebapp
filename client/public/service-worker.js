/**
 * @description Ark One Graph server worker
 * @version 0.1.3
 */

importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js');

/**
 * Configure
 */

// Set workbox config
workbox.setConfig({
  modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/',
  debug: false
});

// Set workbox cache names
workbox.core.setCacheNameDetails({
  prefix: 'aog:',
  suffix: 'v1'
});

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim();

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting();

// Remove unused
workbox.precaching.cleanupOutdatedCaches();

/**
 * Precaches
 */

const hostList = ['en.aog.wiki', 'aog.wiki', 'arkonegraph.herokuapp.com'];

// Cache html
workbox.routing.registerRoute(
  function(event) {
    if (~hostList.indexOf(event.url.host)) {
      return /(\/|.html)$/.test(event.url.pathname);
    } else {
      return false;
    }
  },
  new workbox.strategies.NetworkFirst({
    cacheName: 'aog:html',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

// Cache assets
workbox.routing.registerRoute(
  new RegExp('/static'),
  new workbox.strategies.CacheFirst({
    cacheName: 'aog:static',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  function(event) {
    if (~hostList.indexOf(event.url.host)) {      
      return RegExp('^/[^/]+\\.(?:png|ico)', 'i').test(event.url.pathname);
    } else {
      return false;
    }
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'aog:static',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 24 * 60 * 60
      })
    ]
  })
);

// Cache fonts
workbox.routing.registerRoute(
  new RegExp('.*\\.(?:woff2|woff|ttf)$', 'i'),
  new workbox.strategies.CacheFirst({
    cacheName: 'aog:font',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
);

// Cache data (BETA)
workbox.routing.registerRoute(
  new RegExp('^https://api.aog.wiki/\\.*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName:'aog:data',
    plugins:[
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 24 * 60 * 60
      }),
      new workbox.broadcastUpdate.Plugin({ channelName: 'data-update' })
    ]
  })
)