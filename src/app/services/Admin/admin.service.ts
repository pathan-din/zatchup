import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public env: any = environment;
  public globalYear: any = 1970;
  public globalCurrentYear: any = 2020;
  public checkErrorFlagForAllConsole: boolean = this.env.debugMode;
  public razorApiKey: any = this.env.razorPaymentApiKey;
  constructor(private http: HttpClient) {
    var date = new Date();

    this.globalCurrentYear = date.getFullYear();
  }

  /*
  For Admin Login APi Api 
  API Name :admin/Login
  request : object
  response : object
  */

  adminlogin(data) { return this.http.post(this.env.apiadminUrl + 'login/', data); }


  /*
    For Admin Dashboard count Api 
    API Name :admin/get_dashboard_summary
    request : object
    response : object
  */

  displayCourseList() { return this.http.get(this.env.apiadminUrl + 'get_dashboard_summary/'); }


  /*
      For Admin forgot password Api 
      API Name :admin/forgot-password
      request : object
      response : object
  */

  sendForgotLink(data) { return this.http.post(this.env.apiadminUrl + 'forgot-password/', data); }


  /*
         For Admin set new password Api 
         API Name :admin/verify_reset_password
         request : object
         response : object
   */
  verifyResetCode(data) { return this.http.post(this.env.apiadminUrl + 'verify_reset_password/', data); }

  /*
        For Admin set new password Api 
        API Name :admin/set_new_password
        request : object
        response : object
  */


  setAdminPassword(data) { return this.http.post(this.env.apiadminUrl + 'set_new_password/', data); }

  /*
        For Admin set new password Api 
        API Name :admin/filter_dashboard_records
        request : object
        response : object
  */


  getFilterdRecords(data) { return this.http.post(this.env.apiadminUrl + 'filter_dashboard_records/', data); }

  /*
          For Admin get school data Api 
          API Name :admin/ei/get_school_ei_dashboard_summary
          request : object
          response : object
    */

  displaySchoolData() { return this.http.get(this.env.apiadminUrl + 'ei/get_school_ei_dashboard_summary/'); }

  // getKycApprovalData(){
  //   return this.http.get(this.env.apiadminUrl+ 'kyc/get_kyc_dashboard_summary/');
  // }

  //server Side Validation function
  getErrorResponse(SpinnerService, errors) {
    console.log(errors);

    SpinnerService.hide();
    var errorCollection = '';
    let displayError = {};
    for (var key in errors) {
      // if (errors.hasOwnProperty(key)) {
      // console.log(typeof errors[key])
      // if(typeof errors[key]=='object')
      // {
      // errorCollection = errorCollection+this.getNestedErrorResponse(errorCollection,errors[key])
      // }else{
      displayError[key] = errors[key][0];
      console.log(displayError);
      if (errors[key][0]) {
        errorCollection = errorCollection + errors[key][0] + '\n'
      } else {
        errorCollection = errorCollection + JSON.stringify(errors[key]) + '\n'
      }
      //errorCollection = errorCollection+errors[key][0]+'\n'
      // }


      // }
    }
    return errorCollection;
  }

}
