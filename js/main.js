// Test if service workers are supported
if ('serviceWorker' in navigator) {
  console.log('Service Worker: supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw-cache-site.js')
      .then(() => console.log('Service Worker: registered'))
      .catch((error) => console.error(`Service Worker Error: ${error}`));
  });
}
