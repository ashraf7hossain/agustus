// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  baseUrl: 'http://23.119.176.135:2288',
  ngRok: 'https://1502-103-95-98-139.ap.ngrok.io',
  stripe: {
    publish_key: 'pk_test_1PJtEwBsRBjQ5bBIIXmmdtin00skdwLHgs'
  },
  pusher: {
    key: 'f91f7c41b4f9712bcfd8',
    cluster: 'us2'
  },
  firebase: {
    projectId: 'augustus-7c51b',
    appId: '1:226368987451:web:cb250989f483d70ee1d71e',
    storageBucket: 'augustus-7c51b.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAv-yQXQdseng07K-BN2ZgRypF_Zdo8BhU',
    authDomain: 'augustus-7c51b.firebaseapp.com',
    messagingSenderId: '226368987451',
    measurementId: 'G-BGX19CZRT2',
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
