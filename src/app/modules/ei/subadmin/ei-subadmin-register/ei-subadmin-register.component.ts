import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
declare var $: any;

@Component({
  selector: 'app-ei-subadmin-register',
  templateUrl: './ei-subadmin-register.component.html',
  styleUrls: ['./ei-subadmin-register.component.css']
})
export class EiSubadminRegisterComponent implements OnInit {
  model: any = {};
  modelForOtpModal: any = {};
  showHidePassword: string = 'password';
  showHidecPassword: string = 'password';
  /**********Variable declare for OTP Verification Model************/
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  /*****************************************************************/
  modelForConfirm: any = {};
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any;
  maxlength: any;
  type: string;
  constructor(
    private base: BaseService,
    private genericFormValidationService: GenericFormValidationService,
    private router: Router,
    private loader: NgxSpinnerService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.model.profile = {};
    this.model.profile.pronoun = '';
    this.model.profile.custom_gender = '';
  }
  submitSubAdminRegister() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
     // this.model.username = this.model.email?this.model.email:this.model.phone;
      // this.model.profile.dob = this.base.getDateFormat(this.model.profile.dob);
     this.model.profile.dob = this.model.profile.dob;
      localStorage.setItem("dob",this.model.profile.dob );
      localStorage.setItem("name",this.model.first_name+' '+this.model.last_name );
      
      this.base.action('subadmin/register/', this.model).subscribe(
        (res: any) => {
          if (res.status === true)// Condition True Success 
          {
            this.loader.hide();
            $("#OTPModel").modal({
              backdrop: 'static',
              keyboard: false
            });
          } else { // Condition False Validation failure
            this.loader.hide();
            var errorCollection = '';
            for (var key in res.error) {
              if (res.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + res.error[key][0] + '\n'

              }
            }
            this.alert.error(errorCollection, "Error")
          }
          /*End else*/
        }, (error) => {
          this.loader.hide();
          this.alert.error(error, "Error")
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, "Error")
    }
  }
  isCheckEmailOrPhone(event){
    
    this.maxlength = ''
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(event.target.value)){
      
      this.type='email';
      this.maxlength = 50;
      this.model.username =event.target.value;
     
      
    }else{
     const numbers = /^[0-9]+$/;
     if(numbers.test(event.target.value))
     {
      this.type='tel'
      this.maxlength = 10;
      this.model.username = event.target.value;
     }
     
    }
   }
  goToEiContactUsPage() {
    this.router.navigate(['ei/contact-us']);
  }
  goToEiSubadminAdditionalPage() {
    this.router.navigate(['ei/subadmin-additional']);
  }
  redirectToSubadminLogin() {
    this.router.navigate(['ei/login-subadmin']);
  }
  redirectToSignUpEi() {
    this.router.navigate(['ei/school-registration']);
  }
  goToDashboard() {
    var flagRequired = true;
    this.errorOtpModelDisplay = '';
    this.error = [];
    if (!this.otp1) {
      flagRequired = false;
    } else if (!this.otp2) {
      flagRequired = false;
    } else if (!this.otp3) {
      flagRequired = false;
    }
    else if (!this.otp4) {
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
      this.modelForOtpModal.username = this.model.username ? this.model.username : this.model.phone;
      this.modelForOtpModal.verify_otp_no = this.otp1 + this.otp2 + this.otp3 + this.otp4;
      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      this.loader.show();
      this.base.action('subadmin/mobile-verify/', this.modelForOtpModal).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            localStorage.setItem("token", res.token);
            $("#OTPModel").modal('hide');
            this.router.navigate(['ei/kyc-verification']);
          } else {
            // this.errorOtpModelDisplay = res.error;
            this.alert.error(res.error, "Error")
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error, "Error")
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, "Error")
    }
  }
  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
  changeInput($ev) {
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }
  }

  resendOtp() {
    try {
      this.modelForOtpModal.username = this.model.username ? this.model.username : this.model.phone;
      this.loader.show();
      this.base.action('user/resend-otp/', this.modelForOtpModal).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.alert.success(res.message, 'Success')
          } else {
            this.alert.error(res.error, 'Error')
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error, 'Error')
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  goToSubadminTermsAndConditions(type: any, action: any, pageName:any){

    const url = this.router.serializeUrl(
     this.router.createUrlTree(['ei/terms-conditions', type, action], {queryParams:{pageName:pageName}})
   );
   window.open('#'+url, '_blank');
  }

  showHidePasswordFunction(type) {
    if (type == 'p') {
      if (this.showHidePassword == 'password') {
        this.showHidePassword = 'text';
      } else {
        this.showHidePassword = 'password';
      }
    } else {
      if (this.showHidecPassword == 'password') {
        this.showHidecPassword = 'text';
      } else {
        this.showHidecPassword = 'password';
      }
    }

  }
}
