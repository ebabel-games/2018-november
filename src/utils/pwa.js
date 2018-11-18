// Progressive Web App (PWA) setup.
// Note: also see file /service-worker.js, which should be a separate single file at the root of the website.
const pwa = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => { // Argument is registration.
        console.info('Game service worker is registered.');  /* eslint no-console: 0 */
      })
      .catch((error) => {
        console.error(`Game service worker failed to register. ${error.message}`);  /* eslint no-console: 0 */
      });
  }
};

export default pwa;
