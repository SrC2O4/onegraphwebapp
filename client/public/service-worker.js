/**
 * @description Ark One Graph server worker
 * @version 0.0.1
 */

importScripts("https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js");

/**
 * Configure
 */

// Set workbox config
workbox.setConfig({
  modulePathPrefix: '"https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/',
  debug: true
})

// Set workbox cache names
workbox.core.setCacheNameDetails({
  prefix: 'aog:',
  suffix: 'v1'
})

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting()

// Remove unused
workbox.precaching.cleanupOutdatedCaches()

/**
 * Precaches
 */

const hostList=['aog.wiki','en.aog.wiki','arkonegraph.herokuapp.com'/* ,'localhost','localhost:3000' */]

// Cache html
woekbox.routing.registerRoute(
  function (event) {
    if (hostList.indexOf(event.url.host)) {
      return /\/$/.test(event.url.pathname)
    }
    else {
      return false
    }
  }, new workbox.strategies.NetworkFirst({
    cacheName: 'aog:html', plugins: [new workbox.cacheableResponse.Plugin({
      statuses: [0, 200]
    })]
  })
)

// Cache assets
woekbox.routing.registerRoute(
  new RegExp('/static'),
  new woekbox.strategies.CacheFirst({
    cacheName: 'aog:static', plugins: [new workbox.cacheableResponse.Plugin({
      statuses: [0, 200]
    })]
  })
)

// Cache data (BETA)