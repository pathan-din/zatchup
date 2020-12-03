import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";

import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {
  model: any = {};
  modelForOtpModal: any = {};
  showHidePassword: string = 'password';
  showHidecPassword: string = 'password';
  globalYear: any = 1970
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
  /**************************Date of birth variable**********************/
  date: any = [];
  month: any = [{ monInNumber: '01', monInWord: 'Jan' },
  { monInNumber: '02', monInWord: 'Feb' },
  { monInNumber: '03', monInWord: 'Mar' },
  { monInNumber: '04', monInWord: 'Apr' },
  { monInNumber: '05', monInWord: 'May' },
  { monInNumber: '06', monInWord: 'Jun' },
  { monInNumber: '07', monInWord: 'Jul' },
  { monInNumber: '08', monInWord: 'Aug' },
  { monInNumber: '09', monInWord: 'Sep' },
  { monInNumber: '10', monInWord: 'Oct' },
  { monInNumber: '11', monInWord: 'Nov' },
  { monInNumber: '12', monInWord: 'Dec' }]
  year: any = [];
  /***********************************************************************/
  /**Use thease varible for the date of birth bind in html**/
  dateModel: any;
  monthModel: any;
  yearModel: any;
  /*********************************************************/
  constructor(
    private genericFormValidationService: GenericFormValidationService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public userService: UsersServiceService,
    public formBuilder: FormBuilder,
    private baseService: BaseService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {

    this.dateModel = '';
    this.monthModel = '';
    this.yearModel = '';
    var dt = new Date();
    /**Get Current year for date of birth year dropdown**/
    var year = dt.getFullYear();
    for (var i = year; i >= this.globalYear; i--) {
      this.year.push(i);
    }
    /**init day for day Dropdown **/
    for (var d = 1; d <= 31; d++) {
      this.date.push(d);
    }
    localStorage.removeItem('token');
    this.model.profile = {};
    this.model.profile.pronoun = "";
    this.model.is_term_cond = true;
  }
  /*function for show hide password using inputbox*/
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
  /************************************************/
  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
  goForRegister() {

    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();
      /***************Merge dob after all selected dropdown *****************/
      this.model.profile.dob = this.yearModel + '-' + this.monthModel + '-' + this.dateModel;
      /**********************************************************************/
      if (this.model.phone == null) {
        this.model.phone = '';
      }
      this.baseService.action('user/register/', this.model).subscribe(
        (res: any) => {
          console.log(res);
          // let response: any = {};
          // response = res;
          this.SpinnerService.hide();
          if (res.status === true)// Condition True Success 
          {

            $("#OTPModel").modal({
              backdrop: 'static',
              keyboard: false
            });
          } else { // Condition False Validation failure
            this.SpinnerService.hide();
            // var errorCollection = '';
            // for (var key in response.error) {
            //   if (response.error.hasOwnProperty(key)) {
            //     errorCollection = errorCollection + response.error[key][0] + '\n'

            //   }
            // }
            // alert(errorCollection);
            if (res.error.email && res.error.phone)
              this.alert.error('Email and Phone already exists.', 'Error');
            else if (res.error.email)
              this.alert.error(res.error.email[0], 'Error');
            else if (res.error.phone)
              this.alert.error(res.error.phone[0], 'Error');
            else
              this.alert.error(res.error.message[0], 'Error');
          }
        }, (error) => {
          this.SpinnerService.hide();
        });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }



  }
  /*Change Go To Redirect*/
  goToKycPage() {
    $("#OTPModel").modal("hide");
    this.router.navigate(['user/kyc-verification']);
  }

  goToUserQualificationPage() {
    $("#currentStatusModel").modal("hide");
    this.router.navigate(['user/qualification']);
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
      let data: any = {};
      this.modelForOtpModal.username = this.model.email ? this.model.email : this.model.phone;
      this.modelForOtpModal.verify_otp_no = this.otp1 + this.otp2 + this.otp3 + this.otp4;
      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      this.SpinnerService.show();
      this.userService.verifyOtpViaRegister(this.modelForOtpModal).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          //localStorage.setItem("user_id",response.user_id);
          localStorage.setItem("token", response.token);
          $("#OTPModel").modal('hide');
          this.router.navigate(['user/kyc-verification']);
        } else {
          this.errorOtpModelDisplay = response.error;
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

    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }

  }
}
