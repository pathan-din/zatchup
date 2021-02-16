// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseUrl='http://172.105.61.231:3000/api/';

export const environment = {
  production: false,
  baseUrl:baseUrl,
  apiUrl:baseUrl+"user/",
  apiEiUrl:baseUrl+"ei/",
  apiEiSubadminUrl:baseUrl+"subadmin/",
  apiadminUrl:baseUrl+"admin/",
  serverImagePath:"http://staging.zatchup.com/zatchupapi/zatchup/media/temp/",
  serverVideoPath:"http://staging.zatchup.com/zatchupapi/zatchup/media/videos/about_us",
  // apiCommonUrl:baseUrl,
  razorPaymentApiKey:'rzp_test_i0NymYFNWzBGPK',
  debugMode:true,
  appVersion: require('../../package.json').version + '-dev',
  firebase: {
    apiKey: "AIzaSyDJsZUk0pW_PR_KalCuzZciu3GeC0aVRks",
    authDomain: "angularchatmaheshtriazine.firebaseapp.com",
    databaseURL: "https://angularchatmaheshtriazine-default-rtdb.firebaseio.com",
    projectId: "angularchatmaheshtriazine",
    storageBucket: "angularchatmaheshtriazine.appspot.com",
    messagingSenderId: "575727521539",
    appId: "1:575727521539:web:b13bcda820943cc4b02336"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
