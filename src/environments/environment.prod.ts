const baseUrl='http://172.105.61.231:3000/api/';
export const environment = {
  production: false,
  baseUrl:baseUrl,
  apiUrl:baseUrl+"user/",
  apiEiUrl:baseUrl+"ei/",
  apiEiSubadminUrl:baseUrl+"subadmin/",
  apiadminUrl:baseUrl+"admin/",
  serverImagePath:"http://staging.zatchup.com/zatchupapi/zatchup/media/temp/",
  // apiCommonUrl:baseUrl,
  razorPaymentApiKey:'rzp_test_i0NymYFNWzBGPK',
  debugMode:true,
  appVersion: require('../../package.json').version,
};