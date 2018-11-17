// Progressive Web App (PWA) setup.
// Note: also see file /service-worker.js, which should be a separate single file at the root of the website.
const pwa = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
  }
};

export default pwa;
