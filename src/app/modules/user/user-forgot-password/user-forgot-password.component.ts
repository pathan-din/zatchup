import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { AdminService } from '../../../services/Admin/admin.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
import { UsersServiceService } from 'src/app/services/user/users-service.service';
declare var $: any;

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  verificationMobileNo: any;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  modelForOtpModal: any={};
  errorOtpModelDisplay: any;

  constructor( private genericFormValidationService: GenericFormValidationService, 
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    private alert: NotificationService, 
    private baseService: BaseService,
    private userService: UsersServiceService
    ) { }

  ngOnInit() {
  }

  // goTouserResetPasswordPage(){
  //   $("#OTPModel").modal('hide');
  //   this.router.navigate(['user/reset-password']);
  // }

  changeInput($ev) {
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }

  }
  submit() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      /**Api For the Register School */

      this.SpinnerService.show();
      if(this.verificationMobileNo){
        this.mobileVerification();
      }
      else{
      this.adminService.sendForgotLink(this.model).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        
        this.SpinnerService.hide();

        if (response.status === true) {
          this.alert.success(response.message, 'Success');
          if(response.data.phone){
            this.verificationMobileNo = response.data.phone
          }
          else{
           
            this.router.navigate(['user/login']);
          }
         
        } else {
          this.SpinnerService.hide();
          this.alert.error(response.error.message[0], 'Error')
          // var errorCollection = '';
          // errorCollection = this.adminService.getErrorResponse(this.SpinnerService, response.error);
          // alert(errorCollection);
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    }
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  mobileVerification() {
    var flagRequired = true;
    if (!this.otp1 || !this.otp2 || !this.otp3 || !this.otp4) {
      flagRequired = false
    }
    if (flagRequired) {
      try {
        let data = {
          "email_or_phone": this.verificationMobileNo ? this.verificationMobileNo : '',
          "code": this.otp1 + this.otp2 + this.otp3 + this.otp4
        }
        console.log(data);
        
        this.SpinnerService.show();
        this.baseService.action('admin/verify_reset_password/', data).subscribe(
          (res: any) => {
            if (res.status == true) {
              localStorage.setItem('otpVerifyData', JSON.stringify(res.data))
              this.router.navigate(['user/create-new-password']);
            } else {
              this.alert.error(res.error.message[0], 'Error')
            }
            this.SpinnerService.hide();
          }, (error) => {
            this.SpinnerService.hide();
            console.log(error);
          });
      } catch (err) {
        this.SpinnerService.hide();
        this.alert.error(err, 'Verify otp exception')
      }
    }
    else {
      this.alert.error('Please enter OTP!', 'Error')
    }
  }

  resendOtp() {
    try { let data: any = {};
      this.modelForOtpModal.email_or_phone = this.verificationMobileNo ;

      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      this.SpinnerService.show();
      this.baseService.action('admin/forgot-password/',this.modelForOtpModal).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.alert.success("OTP Resend On Your Register Mobile Number Or Email-Id.","Success")
        } else {
          this.errorOtpModelDisplay = response.error;
          this.alert.success(this.errorOtpModelDisplay,"Error")
          //alert(response.error)
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      console.log("verify Otp Exception", err);
    }
  }
}
