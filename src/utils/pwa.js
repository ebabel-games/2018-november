const pwa = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log(registration);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export default pwa;
