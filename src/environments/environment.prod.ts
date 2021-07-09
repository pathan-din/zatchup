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