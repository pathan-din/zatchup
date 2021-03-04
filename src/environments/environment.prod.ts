const baseUrl='https://apis.zatchup.com:3000/api/';
export const environment = {
  production: true,
  baseUrl:baseUrl,
  apiUrl:baseUrl+"user/",
  apiEiUrl:baseUrl+"ei/",
  apiEiSubadminUrl:baseUrl+"subadmin/",
  apiadminUrl:baseUrl+"admin/",
  serverImagePath:"https://apis.zatchup.com/media/temp/",
  serverVideoPath:"https://apis.zatchup.com/media/temp/",
  razorPaymentApiKey:'rzp_live_nBvAkcHP18CnUT',
  debugMode:true,
  appVersion: require('../../package.json').version,
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