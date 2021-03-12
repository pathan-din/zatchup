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
    apiKey: "AIzaSyDJsZUk0pW_PR_KalCuzZciu3GeC0aVRks",
    authDomain: "angularchatmaheshtriazine.firebaseapp.com",
    databaseURL: "https://angularchatmaheshtriazine-default-rtdb.firebaseio.com/",
    projectId: "angularchatmaheshtriazine",
    storageBucket: "angularchatmaheshtriazine.appspot.com",
    messagingSenderId: "932623041112",
    appId: "1:932623041112:web:5e3881a4023c62adffc02d"

    

  }
};