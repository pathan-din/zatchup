const baseUrl = 'http://172.105.61.231:8080/api/';
 
export const environment = {
  production: false,
  baseUrl: baseUrl,
  apiUrl: baseUrl + "user/",
  apiEiUrl: baseUrl + "ei/",
  apiEiSubadminUrl: baseUrl + "subadmin/",
  apiadminUrl: baseUrl + "admin/",
  serverImagePath: "http://staging.zatchup.com/zatchup_api_dev_virtualenv/zatchupapi_dev/media/temp/",
  serverVideoPath: "http://staging.zatchup.com/zatchup_api_dev_virtualenv/zatchupapi_dev/media/videos/about_us",
  razorPaymentApiKey: 'rzp_test_i0NymYFNWzBGPK',
  debugMode: true,
  appVersion: require('../../package.json').version + '-dev',

  firebase: {
    apiKey: "AIzaSyDe40LKqSMK0jNz6zlUztAhkg3ld9wB8-g",
    authDomain: "zatchup-bf69e.firebaseapp.com",
    databaseURL: "https://zatchup-bf69e-default-rtdb.firebaseio.com",
    projectId: "zatchup-bf69e",
    storageBucket: "zatchup-bf69e.appspot.com",
    messagingSenderId: "227089326047",
    appId: "1:227089326047:web:de5d85c6d70c478fb12e6a",
    measurementId: "G-5P2LJ0F8Z5"
  }
};