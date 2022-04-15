# Page caching with Service Workers

## About

A simple web page with Service Workers that saves the assets in the browser's cache.

## Features

There are two SW. They differ on how the perform the caching:

- `sw-cache-pages.js`: caches the assets that are hardcoded in a list.
- `sw-cache-site.js`: caches every response the browser receives from the server.

Despite this difference, both of them return the cached assets when offline. To select one of them, register the one you want inside `main.js`.

## Running

Serve the files through some application like Live Server. Then look for the messages related to Servie Worker in the developer's console (select "Preserve log" option). Also, look for the "Application" tab in the devtools and, inside it, the "Service Worker" and "Cache Storage" sections.

Test the service workers by selecting the "Offline" option in the "Service Worker" section inside the "Application" tab of the devtools.

## Acknowledgment

Thanks to [Brad Traversy](https://github.com/bradtraversy) for his [tutorial](https://www.youtube.com/watch?v=ksXwaWHCW6k).
