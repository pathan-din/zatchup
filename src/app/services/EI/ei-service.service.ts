import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EiServiceService {
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
 For EI School Login APi Api 
 API Name : EI/Login
 request : object
 response : object
 */

  login(data) { return this.http.post(this.env.apiEiUrl + 'login/', data); }


  /*
  For Register Api 
  API Name : Register
  Parameter: all input controls value with model twoway binding
  (
    check email validation and check password valid format
    one capital latter & one special charactor && one number
    length eight charactor limit
  )

  request:object
  response :object
  */

  register(data) { return this.http.post(this.env.apiEiUrl + 'register/', data); }



  /*
   For getallstate Api 
   API Name : getallstate
   Parameter: No parameter
   Method:Get
   response:object   
   */


  getallstate(data) { return this.http.get(this.env.apiUrl + 'getallstate/', data); }


  /*
   For getCityByState Api 
   API Name : citywithstateid
   Parameter : state id,
   Method : get
   response : object type 
   */

  getCityByStateId(data) { return this.http.get(this.env.apiUrl + 'getcitybystateid/' + data + '/'); }

  /*
  Api Name : getschoollistwithcity
  Parameter : City Id
   Method : get
   response : object type 
 
  */


  getSchoolListByCity(data) { return this.http.get(this.env.apiEiUrl + 'getschoollistwithcity/' + data + '/'); }

  getSchoolsListByCity(data) { return this.http.get(this.env.apiEiUrl + 'get-notonboarded-ei-by-city/' + data + '/'); }
  /*
  Api Name : verify-mobile
  Parameter : mobile number and otp
  Method : Post
  request :  object type 
  response : object type 
  */

  verifyOtpWithMobile(data) { return this.http.post(this.env.apiEiUrl + 'verify-mobile/', data); }

  /*
   Api Name : verify-otp
   Parameter : verify and otp
   Method : Post
   request :  object type 
   response : object type 
   */

  verifyOtp(data) { return this.http.post(this.env.apiEiUrl + 'verify-otp/', data); }

  /*
   Api Name : getAllDesignationList
   Parameter :No parameter
   Method : Get
   request : Object Type
   Response : object type
   */

  getAllDesignationList() { return this.http.get(this.env.apiEiUrl + 'getalldesignations/'); }


  /*
   Api Name : requestForRazorPament
   Parameter :userId,couonCode(optional)
   Method : Post
   request : Object Type
   Response : object type
   */

  requestForRazorPament(data) { return this.http.post(this.env.apiEiUrl + 'payment-process/', data); }


  /*
   Api Name : addKyc
   Parameter :FormData
   Method : Post
   request : Object Type
   Response : object type
   */
  addKyc(data) { return this.http.post(this.env.apiEiSubadminUrl + 'kyc-upload/', data); }

  /*
   Api Name : payment-response
   Parameter :userId,order_id,Payment_id,Signature
   Method : Post
   request : Object Type
   Response : object type
   */

  requestForRazorPamentAfterAction(data) { return this.http.post(this.env.apiEiUrl + 'payment-response/', data); }

  /**
   * Api name : get-subscription-charge
   * Function Name : requestForSubscriptionCharges
   * Parameter : @user_id,@coupn_code(optional)
   * request : object
   * response : object
   */


  requestForSubscriptionCharges(data) { return this.http.post(this.env.apiEiUrl + 'get-subscription-charge/', data); }


  /**
   * Api name : onboard-step-first
   * Function Name : getOnboardStepFirstData
   * Parameter : @user_id
   * method : Get
   * request : QueryString
   * response : object
   */



  getOnboardStepFirstData(userID) { return this.http.get(this.env.apiEiUrl + 'onboard-step-first/'); }

  /**
  * Api name : cover-profile-update
  * Function Name : updateCoverPic
  * Parameter : formdata
  
  * response : object
  */


  updateCoverPic(data) { return this.http.post(this.env.apiEiUrl + 'cover-profile-update/', data); }


  /**
   * Api name : onboard-step-first
   * Function Name : updateOnboardStepFirstData
   * Parameter : @user_id
   * method : PUT
   * request : QueryString
   * response : object
   */


  updateOnboardStepFirstData(formData, userID) { return this.http.put(this.env.apiEiUrl + 'onboard-step-first/', formData); }

  /**
   * Api name : getstudentdataforupdate
   * Function Name : editStudent
   * Parameter : @user_id
   * method : PUT
   * request : QueryString
   * response : object
   */


  editStudent(formData, userID) { return this.http.put(this.env.apiEiUrl + 'getstudentdataforupdate/' + userID + '/', formData); }

  /**
   * Api name : getstudentdataforupdate
   * Function Name : getStudent
   * Parameter : @user_id
   * method : GET
   * request : QueryString
   * response : object
   */


  getStudent(userID) { return this.http.get(this.env.apiEiUrl + 'getstudentdataforupdate/' + userID + '/'); }

  /**
   * Function Name: getNumberOfStudentList
   * Api Name: getnumberofstudent
   */

  getNumberOfStudentList() { return this.http.get(this.env.apiEiUrl + 'getnumberofstudent/'); }

  /**
   * Function Name: updateOnboardStepSecondData
   * Parameter :  data(object type)
   * request : Object
   * responce : object
   */
  updateOnboardStepSecondData(data) { return this.http.post(this.env.apiEiUrl + 'course-add/', data); }
  /**
   * Function Name: updateOnboardStepThreeData
   * Parameter :  data(object type)
   * request : Object
   * responce : object
   */
  updateOnboardStepThreeData(data) { return this.http.post(this.env.apiEiUrl + 'bankdetail-add/', data); }

  /**
   * Function Name: updateOnboardStepFourData
   * Parameter :  data(object type)
   * request : Object
   * responce : object
   */
  updateOnboardStepFourData(data) { return this.http.post(this.env.apiEiUrl + 'document-add/', data); }


  /**
   * Function Name: uploadFile
   * Parameter :  data(Form Type)
   * request : Form Type
   * responce : object
   */
  uploadFile(data) { return this.http.post(this.env.apiEiUrl + 'uploaddocsfile/', data); }

  /**
   * Function Name: subAdminRegisteration
   * Parameter :  data(Form Type)
   * request : Form Type
   * responce : object
   */
  subAdminRegisteration(data) { return this.http.post(this.env.apiEiSubadminUrl + 'register/', data); }


  /**
   * Function Name: getEiDashboardDetails
   
   * request : Form Type
   * responce : object
   */
  getEiDashboardDetails() { return this.http.get(this.env.apiEiUrl + 'get-dashbord-report/'); }

  /**
   * Function Name: getEiProfileDetails
   
   * request : get
   * responce : object
   */
  getEiProfileDetails() { return this.http.get(this.env.apiEiUrl + 'get-eiprofile/'); }

  /**
   * Function Name: getEiProfileData
   
   * request : get
   * responce : object
   */
  getEiProfileData() { return this.http.get(this.env.apiEiUrl + 'auth-user-info/'); }

  /*
    For Verify Otp Register Api 
    API Name : user-verify
    Parameter : Username(email/mobile) and OTP goted by email OR mobile number
    */
  verifyOtpViaRegister(data) { return this.http.post(this.env.apiEiSubadminUrl + 'mobile-verify/', data); }

  /*
    For uploadBulkStudent Api 
    API Name : bulk-student-by-ei/
    
    */
  uploadBulkStudent(data) { return this.http.post(this.env.apiEiUrl + 'bulk-student-by-ei/', data); }

  /*
   For approveStudent Api 
   API Name : approve-student/
   
   */
  approveStudent(data) { return this.http.post(this.env.apiEiUrl + 'approve-student/', data); }



  /*
  Function Name : displayCourseList/
  api name: course-list/
  Method : get 
  request : Get 
  Response : object
  */

  displayCourseList() { return this.http.get(this.env.apiEiUrl + 'course-list/'); }


  /*
   Function Name : displayStandardList/
   api name: course-list/
   Method : get 
   request : Get 
   Response : object
   */

  displayStandardList(stID) { return this.http.get(this.env.apiEiUrl + 'standard-list/?course_id=' + stID); }


  /*
   Function Name : displayClassList/
   api name: course-list/
   Method : get 
   request : Get 
   Response : object
   */

  displayClassList(CID) { return this.http.get(this.env.apiEiUrl + 'class-list/?standard_id=' + CID); }


  /*
   Function Name : getPendingStudentList/
   api name: student-list/
   Method : get 
   request : Get 
   Response : object
   */

  getPendingStudentList(pageNumber, strFilter) {
    if (pageNumber) {
      return this.http.get(this.env.apiEiUrl + 'unverifiedstudents/?page=' + pageNumber);
    } else if (strFilter) {
      return this.http.get(this.env.apiEiUrl + 'unverifiedstudents/?' + strFilter);
    }

    return this.http.get(this.env.apiEiUrl + 'unverifiedstudents/');
  }


  /*
   Function Name : getCourseWiseStudentCount/
   api name: coursewisestudentcount/
   Method : Post 
   request : Post 
   Response : object
   */
  //get-dashbord-report
  getCourseWiseStudentCount() { return this.http.post(this.env.apiEiUrl + 'coursewisestudentcount/', {}); }

  //


  /*
   Function Name : getStandardCourseWiseStudentCount/
   api name: standard-list/
   Method : Get 
   request : Get 
   Response : object
   */
  //
  getStandardCourseWiseStudentCount(courseId) { return this.http.post(this.env.apiEiUrl + 'standardwisestudentcount/', { 'course_id': courseId }); }

  /*
   Function Name : getClassStandardWiseStudentCount/
   api name: coursewisestudentcount/
   Method : Post 
   request : Post 
   Response : object
   */
  //

  getClassStandardWiseStudentCount(standardId) { return this.http.post(this.env.apiEiUrl + 'classwisestudentcount/', { 'standard_id': standardId }); }


  /*
   Function Name : getClassStandardWiseStudentCount/
   api name: coursewisestudentcount/
   Method : Post 
   request : Post 
   Response : object
   */
  //

  postRejectReason(data) { return this.http.post(this.env.apiEiUrl + 'reject-student-by-ei/', data); }



  /*
   Function Name : getGetStudentDashboardReport/
   api name: student-dashboard/
   Method : Get 
   Response : object
   */
  //
  getGetStudentDashboardReport() { return this.http.get(this.env.apiEiUrl + 'student-dashboard/'); }



  /*
   Function Name : getGetVerifiedStudent/
   api name: verifiedstudents/
   Method : Get 
   Response : object
   */
  //

  getGetVerifiedStudent(pageNumber, strFilter) {
    if (pageNumber) {
      return this.http.get(this.env.apiEiUrl + 'verifiedstudents/?page=' + pageNumber);
    } else if (strFilter) {
      return this.http.get(this.env.apiEiUrl + 'verifiedstudents/?' + strFilter);
    }
    return this.http.get(this.env.apiEiUrl + 'verifiedstudents/');
  }

  /*
  Function Name : addStudent
  api name : /get-alumni-dashbord/
  request : get
  response : object
  */



  getuminiDashboard() { return this.http.get(this.env.apiEiUrl + 'get-alumni-dashbord/'); }


  /*
  Function Name : getAluminiList
  api name : /alumni-list/
  request : get
  response : object
  */





  getAluminiList(pageNumber, strFilter) {
    if (pageNumber) {
      return this.http.get(this.env.apiEiUrl + 'alumni-list/?page=' + pageNumber);
    } else if (strFilter) {
      return this.http.get(this.env.apiEiUrl + 'alumni-list/?' + strFilter);
    }

    return this.http.get(this.env.apiEiUrl + 'alumni-list/');
  }


  /*
  Function Name : addStudent
  api name : /add-student/
  request : object
  response : object
  */



  addStudent(data) { return this.http.post(this.env.apiEiUrl + 'add-student/', data); }



  //server Side Validation function
  getErrorResponse(SpinnerService, errors) {
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
     
      if (errors[key][0]) {
        errorCollection = errorCollection + errors[key][0] + '\n'
      } else {
        if(typeof errors[key]=='object')
        {
          console.log(errors[key]);
          for (var keys in errors[key]){
            errorCollection = errorCollection +'('+[keys]+')'+', '+ errors[key][keys] + '\n'
          }
        
        } 
       // errorCollection = errorCollection + JSON.stringify(errors[key]) + '\n'
      }
      //errorCollection = errorCollection+errors[key][0]+'\n'
      // }


      // }
    }
    return errorCollection;
  }

}