import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

declare var $: any;

@Component({
  selector: 'app-user-my-educational-profile',
  templateUrl: './user-my-educational-profile.component.html',
  styleUrls: ['./user-my-educational-profile.component.css']
})
export class UserMyEducationalProfileComponent implements OnInit {
  @ViewChild('closebutton') closeModal: ElementRef;
  @ViewChild('closeAddLocationModel') closeAddLocationModel: ElementRef
  epData: any;
  model: any = {};
  editModel: any = {};
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any = [];
  requestChangeDetails: any;
  params: any;
  courseList: any;
  filename: string;
  uploadedContent: File;
  postOption: string = "matrix";
  postOptionActiveImage: string = 'dead';
  postOptionActiveMatrix: string = 'active';
  profile_pic: any = '';
  uploadInfo: any = {
    "image_type": "file_name",
    "url": "ei/uploaddocsfile/",
    "icon": "fa fa-camera",
    "class": "btn_position-absolute btn_upload border-0 bg-light-black text-white p-2"
  }

  currentCitySearchConfig: any = {
    "api_endpoint": "user/city-list/",
    "displayImage": false,
    "placeholder": "Search City",
    "seeMoreResults": false
  }
  imageUrl: any;
  imagePath: any;
  personalInfo: any = {};
  allStates: any;
  allCities: any;
  stateId: any = '';
  cityId: any = '';
  getReject: any;

  constructor(
    private alert: NotificationService,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private validationService: GenericFormValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    private confirmDialogService: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.model = {};
    $("#OTPModel").modal("hide");
    this.getEducationalProfile()

    if (localStorage.getItem("addcourse")) {
      localStorage.removeItem("addcourse")
    }
    if (localStorage.getItem("editcourse")) {
      localStorage.removeItem("editcourse")
    }
    this.getPersonalInfo();
    this.getAllState();
    this.getReject = JSON.parse(localStorage.getItem('getreject'))
  }
  getPersonalInfo() {
    try {
      this.loader.show();
      this.baseService.getData("user/get-update-personal-info/").subscribe((res: any) => {
        if (res.status) {
          this.loader.hide();
          this.personalInfo = res.data;
        } else {
          this.loader.hide();
        }
      }, (error) => {
        this.loader.hide();
      })
    } catch (e) {
      this.loader.hide();
    }
  }
  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
    if (this.personalInfo.gender == 'C') {

    } else {
      this.personalInfo.custom_gender = '';
      this.personalInfo.pronoun = '';
    }
  }
  goToUpdatePersonalnfo() {
    try {
      this.loader.show();
      this.baseService.action("user/get-update-personal-info/", this.personalInfo).subscribe((res: any) => {
        if (res.status) {
          this.loader.hide();
          this.personalInfo = res.data;
          this.closeModal.nativeElement.click();
          this.getEducationalProfile()
        } else {
          this.loader.hide();
        }
      }, (error) => {
        this.loader.hide();
      })
    } catch (e) {
      this.loader.hide();
    }
  }
  getDocumentsChat(uuid) {
    localStorage.setItem('uuid', uuid);
    this.router.navigate(["user/chat"]);
  }

  redirectWorkDetailesPage(id) {
    this.router.navigate(["user/work-detail"], { queryParams: { "id": id } });
  }
  resendOtp() {
    try {
      this.loader.show()
      this.baseService.action("user/resend-otp-ei-request-for-detail-change/", this.editModel).subscribe((res: any) => {
        if (res.status) {
          this.loader.hide()
        } else {
          this.loader.hide()
        }
      }, (error) => {
        this.loader.hide()
      })
    } catch (e) {

    }
  }
  addPastEi() {
    $("#OTPModel").modal('hide');
    this.router.navigate(['user/add-ei'], { queryParams: { "title": "past" } });
  }
  addAnotherCourse() {
    $("#OTPModel").modal("hide");
    this.router.navigate(['user/add-ei'], { queryParams: { "title": "current" } });
  }
  openModel(label, key, value, classId: any = '') {
    this.editModel = {};
    this.editModel.class_id = '';
    this.model.dob = label.dob;//this.baseService.getDateReverseFormat()
    this.model.email = label.email;
    this.model.first_name = label.first_name;
    this.model.last_name = label.last_name;
    this.model.phone = label.phone;
    this.model.roll_no = label.roll_no;
    this.model.admission_number = label.admission_number;
    this.editModel.key = key;
    this.editModel.old_value = value ? value : 0;
    this.editModel.value = value ? value : 0;
    if (key == 'roll_no') {
      this.editModel.course_id = label.course_id
      this.editModel.class_id = classId;
      this.model.roll_no = value;
    }
    if (key == 'admission_number') {
      this.editModel.school_id = label.school_id
    }

  }
  setModelValue(key) {
    this.editModel.value = key;

  }
  goToDashboard() {
    var flagRequired = true;
    this.errorOtpModelDisplay = '';
    this.error = [];
    if (!this.model.otp1) {
      flagRequired = false;
    } else if (!this.model.otp2) {
      flagRequired = false;
    } else if (!this.model.otp3) {
      flagRequired = false;
    }
    else if (!this.model.otp4) {
      flagRequired = false;
    }
    if (flagRequired == false) {
      this.error.push("Please enter OTP!");
    }
    if (this.error.length > 0) {
      this.errorOtpModelDisplay = this.error.join('\n');
      return;
    }
    try {
      let data: any = {};
      data.key = this.editModel.key;
      data.value = this.editModel.value;
      data.verify_otp_no = this.model.otp1 + this.model.otp2 + this.model.otp3 + this.model.otp4;

      this.baseService.action('user/user-request-verify-otp-detail-change/', data).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {

          $("#OTPModel").modal('hide');
          this.alert.success('Request has been sent for approved', 'Success');
          location.reload();
          //

        } else {
          this.errorOtpModelDisplay = response.error.message;
          this.alert.error(this.errorOtpModelDisplay, 'Error');
        }
      }, (error) => {
        console.log(error);

      });
    } catch (err) {
      console.log("vaeryfy Otp Exception", err);
    }

  }
  storePendingCourseDataAfterApprove(data, school_id,dataEi?:any) {

    try {
      console.log(dataEi);
      
      let coursedata: any = {};
      coursedata.course_id = data.course_id;
      this.loader.show();
      this.baseService.action("user/change-course-standard-detail-by-student-by-id/", coursedata).subscribe((res: any) => {
        if (res.status == true) {
          this.loader.hide();
          this.editCourse(data, school_id,dataEi);
        } else {
          this.loader.hide();
        }
      }, (error) => {
        this.loader.hide();
      })
    } catch (e) {
      this.loader.hide();
    }
  }
  changeInput($ev) {
    console.log($ev);
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }

  }
  /**Edit Personal Details */
  submitPersonalDetails() {


    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    if (this.errorDisplay.valid) {
      return false;
    } else {

      try {
        var url = 'user/request-change-user-detail-by-ei/';
        if (this.editModel.key == 'dob') {
          this.editModel.value = this.baseService.getDateFormat(this.model[this.editModel.key]);
        } else if (this.editModel.key == 'admission_number') {
          url = 'user/edit-admission-roll-no/';
          this.editModel.value = this.model[this.editModel.key];
        } else if (this.editModel.key == 'roll_no') {
          url = 'user/edit-admission-roll-no/';
          this.editModel.value = this.model[this.editModel.key];
        } else if (this.editModel.key == 'name') {

          this.editModel.value = this.model.first_name + '&' + this.model.last_name
        }

        else {
          this.editModel.value = this.model[this.editModel.key];
        }
        this.loader.show();
        this.baseService.action(url, this.editModel).subscribe(res => {
          let response: any = {};
          response = res;
          if (response.status == true) {
            this.loader.hide();
            $("#personalInfoModel").modal('hide');
            if (this.editModel.key == 'email' || this.editModel.key == 'phone') {
              $("#OTPpModel").modal({
                backdrop: 'static',
                keyboard: false
              });
            } else {
              this.loader.hide();
              this.alert.success(response.message, 'success');
              this.closeModal.nativeElement.click()
            }

            //location.reload();
          } else {
            this.loader.hide();
            var error = this.baseService.getErrorResponse(this.loader, response.error)
            this.alert.error(error, 'Error');
          }
        }, (error => {
          this.loader.hide();
        }))
      } catch (e) {

      }
    }
  }
  redirectKYCPage(text, value) {
    if (text == 'name') {
      localStorage.setItem("kyc_name", value);
    } else if (text == 'dob') {
      var data = value.split('-');
      localStorage.setItem("year", data[0]);
      localStorage.setItem("month", data[1]);
      localStorage.setItem("day", data[2]);
    }
    this.router.navigate(['user/kyc-verification'], { queryParams: { "action": "sendrequest", "text": text, "returnUrl": "user/my-educational-profile" } });
  }
  getEducationalProfile() {
    try {
      this.loader.show()
      let url = 'user/student-education-profile/'
      this.baseService.getData(url).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide()
            this.epData = res.data
            this.firebase.updatePhotoOnChatUser(res.data[0]);
          }

          else {
            this.alert.error(res.error.message[0], 'Error')
            this.loader.hide()
          }

        }
      ), err => {
        this.loader.hide();
        this.alert.error(err, 'Error')
      }
    } catch (e) {
      this.loader.hide()
    }

  }
  /**Add MOre COurse Function */
  addMoreCourse(data: any, school_id: any) {
    localStorage.setItem("addcourse", "yes");
    if (data.is_current_course == true) {
      this.router.navigate(['user/ei-profile'], { queryParams: { "school_id": school_id, "add_course": "true" } });
    } else {
      this.router.navigate(['user/ei-profile'], { queryParams: { "school_id": school_id, "add_course": "true" } });
    }
  }

 
  editCourse(data: any, school_id: any,dataEi?:any) {
    localStorage.setItem("editcourse", "yes");
    if(dataEi.is_onboard==0){
      this.router.navigate(['user/ei-confirmation'], { queryParams: {"check_school_info_on_zatchup":2, "school_id": school_id, "course_id": data.course_id, "edit_course": "true", "returnUrl": "user/my-educational-profile" } });

    }else{
      if (data.is_current_course == true) {
        this.router.navigate(['user/ei-confirmation'], { queryParams: { "school_id": school_id, "course_id": data.course_id, "edit_course": "true", "returnUrl": "user/my-educational-profile" } });
      } else {
        this.router.navigate(['user/ei-confirmation'], { queryParams: { "school_id": school_id, "course_id": data.course_id, "edit_course": "true", "returnUrl": "user/my-educational-profile" } });
      }
    }
    
    // this.router.navigate(['user/ei-profile'], { queryParams: { "school_id": school_id, "course_id": courseid, "edit_course":"true", "returnUrl": "user/my-educational-profile" } });
  }
  redirectEiConfirmationPagePage(school_id: any) {
    this.router.navigate(['user/add-ei'], { queryParams: { "school_id": school_id, "returnUrl": "user/my-educational-profile" } });
  }
  getRequestChangeDetails() {
    this.router.navigate(["user/pending-request/"]);
  }

  getRequestCourseDetails() {
    this.router.navigate(["user/pending-course-details/"]);
  }
  getPendingCourseList() {
    try {
      this.baseService.getData("user/pending-course-list-of-user/").subscribe((res: any) => {
        if (res.status == true) {
          this.courseList = res.result;
          //console.log(this.courseList);

        }
      }, (error) => {
        console.log(error);

      })
    } catch (e) {

    }
  }
  getProfilePicUrl(data: any, object) {
    this.model.profile_pic = data.filename;
    this.imageUrl = this.imagePath + data.filename
    this.handleFileInputForBackPhoto(object);
  }

  handleFileInputForBackPhoto(object) {


    try {
      this.loader.show();

      this.baseService.action("user/add-profile-pic-info/", this.model).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          this.loader.hide();
          this.getEducationalProfile()
          //object.profile_pic = response.data.profile_pic;
        } else {
          this.loader.hide();
          console.log("Error:Data not update");
        }

      }, (error) => {
        this.loader.hide();
        console.log(error);

      });
    } catch (err) {
      this.loader.hide();
      console.log("vaeryfy Otp Exception", err);
    }
  }

  deleteEi(school_id: any): any {
    this.confirmDialogService.confirmThis('Are you sure, You want to delete ?', () => {
      this.loader.show()
      let model: any = {};
      this.model.school_id = school_id;

      this.baseService.action('user/delete-school-course-detail-by-student/', this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.getEducationalProfile();
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }

  getAllState() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.allStates = res.results
      }
    )
  }

  getCities() {
    this.baseService.getData('user/getcitybystateid/' + this.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.allCities = res.results
      }
    )
  }

  addLocation() {
    // this.errorDisplay = {}
    // this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[1].elements, true, []);
    // if (this.errorDisplay.valid) {
    //   return false;
    // }
    this.loader.show()
    let data = {
      "state_id": this.stateId,
      "city_id": this.cityId
    }

    this.baseService.action('user/add-city-state-of-user/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.closeAddLocationModel.nativeElement.click()
          this.alert.success(res.message, 'Success')
          this.getEducationalProfile()
        }
        else {
          this.alert.error(res.error.message[0], 'Error');
          this.loader.hide()
        }
      }
    )
  }

  isValidAddLocationForm() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[1].elements, true, []);
    }
  }

  citySearchResult(data: any) {
    this.cityId = data.id
    this.stateId = data.state_id
  }

  sendUserToReVerify(school_id,is_rejected? : any){
    
    this.confirmDialogService.confirmThis('Your School Details Will Be Send For Verification', () => {
      if(is_rejected){
        this.router.navigate(["user/ei-profile"],{queryParams:{"school_id":school_id,'is_rejected':1}})
      }
      else{
        this.router.navigate(["user/ei-profile"],{queryParams:{"school_id":school_id,'is_verify':1}})
      }
      
     
    }, () => {
    });
    
  }

  getVerifiedChat(obj){
    var text = 'was Student'
    if(obj.course_detail[0].is_current_course == true){
      text = 'is Student'
    }
    var message = obj.get_verified_message
    localStorage.setItem('message', message)
    localStorage.setItem('uuid', obj.firebase_id);
    this.router.navigate(["user/chat"]);
  }
}
