importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');

/**
 * @description - Handle Firebase push notifications and offline experience.
 * @see https://firebase.google.com/docs/cloud-messaging/js/receive
 */

// Default Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true
};

// Initialize Firebase app
firebase.initializeApp(self.firebaseConfig || defaultConfig);
const messaging = firebase.messaging();

// Configure message handler
messaging.onBackgroundMessage((payload) => {
  const { icon, body, title } = payload.data;
  self.registration.showNotification(title, { body, icon });
});

self.addEventListener('fetch', (event) => {

  // Set Firebase configuration, once available
  self.urlParams = new URLSearchParams(location.search);
  self.firebaseConfig = Object.fromEntries(urlParams);

  // Offline experience
  if (!navigator.onLine) {
    event.respondWith(
      new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 846.66 1058.325" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd" fill="#252525"><g><path class="fil0" d="M395.83 122.98c150.05,0 271.7,121.66 271.7,271.71 0,18.44 -1.85,36.47 -5.36,53.88 36.69,27.99 60.36,72.17 60.36,121.87 0,84.62 -68.61,153.23 -153.22,153.23 -50.42,0 -95.15,-24.38 -123.08,-61.97 -16.33,3.07 -33.18,4.68 -50.4,4.68 -150.05,0 -271.7,-121.65 -271.7,-271.69 0,-150.05 121.65,-271.71 271.7,-271.71zm98.56 487.92l40.46 -40.45 -40.46 -40.46 34.47 -34.47 40.45 40.46 40.45 -40.46 34.46 34.47 -40.44 40.45 40.46 40.46 -34.48 34.47 -40.45 -40.46 -40.45 40.46 -34.47 -34.47zm122.39 -186.17c1.32,-9.82 2,-19.86 2,-30.04 0,-24.07 -3.82,-47.22 -10.85,-68.93l-76.62 0c2.85,22.01 4.38,45.12 4.38,68.93 0,8.89 -0.22,17.69 -0.63,26.37 11.01,-2.51 22.48,-3.84 34.25,-3.84 16.57,0 32.52,2.64 47.47,7.51zm-189.29 87.64l-108.15 0c9.17,33.87 36.23,105.27 76.49,105.27 8.99,0 17.32,-3.56 24.94,-9.47 -3.06,-12.07 -4.69,-24.71 -4.69,-37.73 0,-20.55 4.06,-40.16 11.41,-58.07zm32 -48.75c7.62,-7.83 16.06,-14.84 25.19,-20.9 1.48,-15.47 2.25,-31.54 2.25,-48.03 0,-24.07 -1.65,-47.21 -4.73,-68.93l-172.75 0c-3.07,21.72 -4.74,44.85 -4.74,68.93 0,24.06 1.67,47.2 4.74,68.93l150.04 0zm109.82 2.34c-57.7,0 -104.48,46.77 -104.48,104.48 0,57.71 46.78,104.47 104.48,104.47 57.71,0 104.47,-46.75 104.47,-104.47 0,-57.71 -46.76,-104.48 -104.47,-104.48zm-385.57 -2.34l76.6 0c-2.85,-22.02 -4.37,-45.13 -4.37,-68.93 0,-23.81 1.52,-46.92 4.37,-68.93l-76.6 0c-7.05,21.71 -10.87,44.86 -10.87,68.93 0,24.05 3.82,47.22 10.87,68.93zm85.48 48.75l-62.8 0c22.66,36.38 55.41,65.63 94.18,83.96 -14.53,-25.99 -24.49,-55.1 -31.38,-83.96zm-62.8 -235.35l62.8 0c6.88,-28.85 16.85,-58.03 31.38,-83.98 -38.76,18.32 -71.52,47.59 -94.18,83.98zm112.92 0l152.98 0c-9.16,-33.89 -36.25,-105.3 -76.49,-105.3 -40.26,0 -67.32,71.41 -76.49,105.3zm203.09 0l62.8 0c-22.66,-36.4 -55.4,-65.64 -94.17,-83.98 14.52,25.98 24.48,55.11 31.37,83.98z"/></g><text x="250" y="900" fill="#252525" font-size="50px" font-weight="bold" font-family="\'Helvetica Neue\', Helvetica, Arial-Unicode, Arial, Sans-serif">You are offline</text></svg>', {
          headers: {
            'Content-type': 'image/svg+xml'
          }
        }
      )
    );
  }

  else event.respondWith(fetch(event.request));
});
