const baseUrl = 'https://apis.zatchup.com:3000/api/';
export const environment = {
  production: true,
  baseUrl: baseUrl,
  apiUrl: baseUrl + "user/",
  apiEiUrl: baseUrl + "ei/",
  apiEiSubadminUrl: baseUrl + "subadmin/",
  apiadminUrl: baseUrl + "admin/",
  serverImagePath: "https://apis.zatchup.com/media/temp/",
  serverVideoPath: "https://apis.zatchup.com/media/temp/",
  //razorPaymentApiKey:'rzp_live_nBvAkcHP18CnUT',
  razorPaymentApiKey: 'rzp_test_i0NymYFNWzBGPK',
  debugMode: true,
  appVersion: require('../../package.json').version,
  // firebase: {
  //   apiKey: "AIzaSyDJsZUk0pW_PR_KalCuzZciu3GeC0aVRks",
  //   authDomain: "angularchatmaheshtriazine.firebaseapp.com",
  //   databaseURL: "https://angularchatmaheshtriazine-default-rtdb.firebaseio.com",
  //   projectId: "angularchatmaheshtriazine",
  //   storageBucket: "angularchatmaheshtriazine.appspot.com",
  //   messagingSenderId: "575727521539",
  //   appId: "1:575727521539:web:b13bcda820943cc4b02336"
  // }
  // firebase: {
  //   apiKey: "AIzaSyDe40LKqSMK0jNz6zlUztAhkg3ld9wB8-g",
  //   authDomain: "zatchup-bf69e.firebaseapp.com",
  //   databaseURL: "https://zatchup-bf69e-default-rtdb.firebaseio.com",
  //   projectId: "zatchup-bf69e",
  //   storageBucket: "zatchup-bf69e.appspot.com",
  //   messagingSenderId: "227089326047",
  //   appId: "1:227089326047:web:de5d85c6d70c478fb12e6a",
  //   measurementId: "G-5P2LJ0F8Z5"
  // },
  firebase: {
    apiKey: "AIzaSyAlMZWSNAlwGL_eurTplr21Pf7yh6_WRCo",
    authDomain: "zatchup-prod.firebaseapp.com",
    databaseURL: "https://zatchup-prod-default-rtdb.firebaseio.com",
    projectId: "zatchup-prod",
    storageBucket: "zatchup-prod.appspot.com",
    messagingSenderId: "31214994209",
    appId: "1:31214994209:web:ed8cb2c7a3da60fe1f3460",
    measurementId: "G-7WX01GN50N"
  }
};