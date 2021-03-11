const baseUrl='http://172.105.61.231:3000/api/';
// const baseUrl='https://apis.zatchup.com:3000/api/';
export const environment = {
  production: false,
  baseUrl:baseUrl,
  apiUrl:baseUrl+"user/",
  apiEiUrl:baseUrl+"ei/",
  apiEiSubadminUrl:baseUrl+"subadmin/",
  apiadminUrl:baseUrl+"admin/",
  serverImagePath:"http://staging.zatchup.com/zatchupapi/zatchup/media/temp/",
  serverVideoPath:"http://staging.zatchup.com/zatchupapi/zatchup/media/videos/about_us",
  razorPaymentApiKey:'rzp_test_i0NymYFNWzBGPK',
  debugMode:true,
  appVersion: require('../../package.json').version + '-dev',
  firebase: {
    apiKey: "AIzaSyC9JseOBJAtlhsZs0Aqvd1esPrUZlxZzh0",
    authDomain: "localhost",
    databaseURL: "https://zatchup-37a1b-default-rtdb.firebaseio.com/",
    projectId: "zatchup-37a1b",
    storageBucket: "gs://zatchup-37a1b.appspot.com",
    messagingSenderId: "932623041112"
    },

};