import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  model: any = {};
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay = '';
  modelForOtpModal:any={};
  constructor(
    private genericFormValidationService: GenericFormValidationService, 
    private router: Router, 
    private SpinnerService: NgxSpinnerService, 
    public userService: UsersServiceService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService
    ) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }
  isValid(event) {
    console.log(this.errorDisplay);
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
  goToSignUpPage() {

    this.router.navigate(['user/signup']);
  }
  doLogin() {
    let data: any = {};
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);

    if (this.errorDisplay.valid) {
      return false;
    }
    data.username = this.model.username;
    data.password = this.model.password;
    try {
      this.SpinnerService.show();
      this.userService.login(data).subscribe(res => {
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status == "True") {
          $("#OTPModel").modal({
            backdrop: 'static',
            keyboard: false
          });
        } else {
          this.SpinnerService.hide();
          this.alert.error(response.error, 'Error')
          // alert(response.error);
          // this.errorDisplay = response.error;
        }

        //this.router.navigate(['user/signup']);
      }, (error) => {
        this.SpinnerService.hide();
        // 
        this.alert.error(error, 'Error')
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      alert("Something went wrong please contact administrator!");
      console.log("exception", err)
    }


  }

  resendOtp() {
    try {
      let data: any = {};
      this.modelForOtpModal.username = this.model.email ? this.model.email : this.model.phone;

      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      this.SpinnerService.show();
      this.userService.resendOtpViaRegister(this.modelForOtpModal).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          alert("OTP Resend On Your Register Mobile Number Or Email-Id.")
        } else {
          this.errorOtpModelDisplay = response.error;
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

  changeInput($ev) {
    console.log($ev);
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
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
      data.username = this.model.username;
      data.phone_otp = this.model.otp1 + this.model.otp2 + this.model.otp3 + this.model.otp4;

      this.userService.verifyOtp(data).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == "True") {
          localStorage.setItem("token", response.token);
          $("#OTPModel").modal('hide');
          if(response.steps>=3 && response.approved==1)
          {
            this.router.navigate(['user/my-profile']);
          }else if(response.steps>=3 && response.approved==0)
          {
            this.router.navigate(['user/congratulation']);
          }else{
            this.router.navigate(['user/kyc-verification']);
          }
          
          //
          
        } else {
          this.errorOtpModelDisplay = response.error;
        }
      }, (error) => {
        console.log(error);

      });
    } catch (err) {
      console.log("vaeryfy Otp Exception", err);
    }

  }


  goTouserForgotPasswordPage() {
    this.router.navigate(['user/forgot-password']);
  }
}

