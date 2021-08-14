import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-subadmin-setting',
  templateUrl: './subadmin-setting.component.html',
  styleUrls: ['./subadmin-setting.component.css']
})
export class SubadminSettingComponent implements OnInit {

  @ViewChild('closebutton') closeModal: ElementRef;
  @ViewChild('closeAddLocationModel') closeAddLocationModel: ElementRef;
  @ViewChild('otp1') otp1: ElementRef;
  @ViewChild('otp2') otp2: ElementRef;
  @ViewChild('otp3') otp3: ElementRef;
  @ViewChild('otp4') otp4: ElementRef;
  epData: any = {};
  editModel: any = {};
  model: any = {};
  error: any = [];
  errorDisplay: any = {};
  personalInfo: any = {};
  privacySettings: any = [];
  userId: any;
  dobStatus: boolean = true;
  genderStatus: boolean = true;
  mobStatus: boolean = true;
  emailStatus: boolean = true;
  errorOtpModelDisplay: any = [];
  maxlength: any;
  type: any;
  disable : boolean = false;
  constructor(
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private router: Router,
    private location: Location,
    private baseService: BaseService,
    private validationService: GenericFormValidationService,
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userprofile')).user_id;
    this.model = {};
    $("#OTPModel").modal("hide");
    this.getEducationalProfile()
    this.getPersonalInfo();
    this.getSettings()

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

  getEducationalProfile() {
    try {
      this.loader.show()
      let url = 'ei/get-subadmin-profile/'
      this.baseService.getData(url).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide()
            this.epData = res.data
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

  submitPersonalDetails() {
     this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[1].elements, true, []);
    if (this.errorDisplay.valid) {
      return false;
    } else {
      try {
        this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[1].elements, true, []);
    if (this.errorDisplay.valid) {
      return false;
    }
   
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
        if(this.editModel.old_value == this.editModel.value){
          return this.alert.error('Your Employee Number Is Already Approved', 'Error')
        }
        this.loader.show();
        this.disable = true
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
    this.router.navigate(['ei/kyc-verification'], { queryParams: { "action": "sendrequest", "text": text, "returnUrl": "ei/subadmin-setting" } });
  }

  enableDiablePermission(event: any, type: any) {
    this.loader.show();
    let data = {
      "user": this.userId,
      "status_type": type,
      "is_disabled": event.checked
    }
    this.baseService.action('user/setting_status/', data).subscribe(
      (res: any) => {
        if (res.status)
          this.alert.success(res.message[0], 'Success')
        this.loader.hide()
      },
      err => {
        this.loader.hide()
      }
    )
  }

  getSettings() {
    this.loader.show();
    this.baseService.getData('user/setting_status/' + this.userId).subscribe(
      (res: any) => {
        if (res.status) {
          this.privacySettings = res.data;
          if (this.privacySettings.length > 0) {
            this.privacySettings.forEach(elem => {
              if (elem.status_type == 'MOB_NUM') {
                this.mobStatus = elem.is_disabled
              }
              else if (elem.status_type == 'EMAIL_ID') {
                this.emailStatus = elem.is_disabled
              }
              else if (elem.status_type == 'DOB') {
                this.dobStatus = elem.is_disabled
              }
              else if (elem.status_type == 'GENDER') {
                this.genderStatus = elem.is_disabled
              }
              else {

              }
            })
          }
        }
        this.loader.hide()
      },
      err => {
        this.loader.hide()
      }
    )
  }
  openModel(label, key, value, classId: any = '') {
    this.disable = false
    this.editModel = {};
    this.editModel.class_id = '';
    this.model.dob = label.dob;//this.baseService.getDateReverseFormat()
    this.model.email = label.email;
    this.model.first_name = label.first_name;
    this.model.last_name = label.last_name;
    this.model.phone = label.phone;
    this.model.employee_num = label.employee_num;
    // this.model.admission_number = label.admission_number;
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
          // this.alert.success('Request has been sent for approved', 'Success');
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

  resendOtp() {
    try {
      this.loader.show()
      this.baseService.action("user/resend-otp-ei-request-for-detail-change/", this.editModel).subscribe((res: any) => {
        if (res.status) {
          this.loader.hide()
          this.alert.success(res.message, 'Success')
        } else {
          this.loader.hide()
        }
      }, (error) => {
        this.loader.hide()
      })
    } catch (e) {

    }
  }

  changeInput($ev) {
    
    if ($ev.target.value.length == $ev.target.maxLength && $ev.keyCode!=8 && $ev.target.name!='otp4') {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }else{
      
      if($ev.keyCode==8){
        if($ev.target.name=='otp4'){
          this.otp3.nativeElement.focus()
        }else if($ev.target.name=='otp3'){
          this.otp2.nativeElement.focus()
        }else if($ev.target.name=='otp2'){
          this.otp1.nativeElement.focus()
        }
      }
       
    }
  }
  goBack(): void{
    this.router.navigate(['ei/my-profile'])
  }
}
