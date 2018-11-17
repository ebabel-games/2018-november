const offline = new Response(
  `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Nov 2018</title>
      <meta name="description" content="Game fully developed in just one month, from beginning to end.">
      <meta name="theme-color" content="#168db5">

      <style>
        body {
          background-color: #58BBDC;
          font-family: 'Times New Roman', Times, serif;
          text-align: center;
          font-size: 16px;
        }

        h1 {
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          font-size: 2em;
          margin: 0 0 .5em;
        }

        p {
          font-size: 1.4em;
        }

        .online {
          position: absolute;
          background-color: white;
          color: #168db5;
          padding: 1em 1.5em .5em;
          border-radius: 1em;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      </style>
    </head>
    <body>
      <div class='online'>
        <h1>Game is offline</h1>
        <p>Where is your Internet?</p>
      </div>
    </body>
  </html>
  `,
  {
    headers: {
      'Content-Type': 'text/html',
    },
  },
);

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => offline));
});
