import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";

import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
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
  type:any;
  maxlength:any;
  /*********************************************************/
  constructor(
    private genericFormValidationService: GenericFormValidationService,
    private router: Router,
    private loader: NgxSpinnerService,
    public userService: UsersServiceService,
    public formBuilder: FormBuilder,
    private baseService: BaseService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {

    //this.dateModel = '';
    //this.monthModel = '';
   
     
    
    //this.yearModel = '';
    var dt = new Date();
    /**Get Current year for date of birth year dropdown**/
    var year = dt.getFullYear();
    for (var i = year; i >= this.globalYear; i--) {
      this.year.push(i);
    }
    /**init day for day Dropdown **/
    //daysInMonth
    
  
    for (var d = 1; d <= 31; d++) {
      this.date.push(d);
    }
    var now = new Date();
    //var month = now.getMonth()+1;
    this.yearModel = now.getFullYear()
    
    this.monthModel =  (now.getMonth()+1).toString();
    this.dateModel = this.baseService.daysInMonth(this.monthModel, this.yearModel).toString();
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.model.profile = {};
    this.model.profile.pronoun = "";
    this.model.is_term_cond = false;
  }
  isCheckEmailOrPhone(event){
    this.maxlength = ''
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(event.target.value)){
      
      this.type='email';
      this.maxlength = 50;
      this.model.email =event.target.value;
      this.model.phone = '';
      
    }else{
     const numbers = /^[0-9]+$/;
     if(numbers.test(event.target.value))
     {
       console.log(numbers.test(event.target.value));
       
      this.type='tel'
      this.maxlength = 10;
      this.model.phone = event.target.value;
      this.model.email = '';
     }
     
    }
   }
   changeMOnth(month,year){
    console.log(month,year);
    this.date=[];
    var now = new Date();
    //var month = now.getMonth()+1;
    //var year = now.getFullYear()
    for (var d = 1; d <= this.baseService.daysInMonth(month,year); d++) {
      this.date.push(d);
    }
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
      this.loader.show();
      localStorage.setItem("year",this.yearModel);
      localStorage.setItem("month",this.monthModel);
      localStorage.setItem("day",this.dateModel);
      localStorage.setItem("kyc_name",this.model.first_name+' '+this.model.last_name);
      if(this.model.email){
        this.model.email = this.model.username;
      }
      /***************Merge dob after all selected dropdown *****************/
      this.model.profile.dob = this.yearModel + '-' + this.monthModel + '-' + this.dateModel;
      /**********************************************************************/
      // if (this.model.phone == null) {
      //   this.model.phone = '';
      // }
       
      this.baseService.action('user/register/', this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status === true) {

            $("#OTPModel").modal({
              backdrop: 'static',
              keyboard: false
            });
          } else {
            var errorCollection = '';
            for (var key in res.error) {
              if (res.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + res.error[key][0] + '\n'

              }
            }
            this.alert.error(errorCollection, 'Error');
            this.loader.hide();
          }
        }, (error) => {
          this.loader.hide();
        });
    } catch (err) {
      this.loader.hide();
    }



  }
 
  /***********************Mobile Number OR Email Verification Via OTP**********************************/

  verifyOtp() {
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
      this.loader.show();
      this.baseService.action('user/user-verify/', this.modelForOtpModal).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            localStorage.setItem("token", res.token);
            $("#OTPModel").modal('hide');
            this.router.navigate(['user/kyc-verification']);
          } else {
            this.alert.error(res.error, "Error")
          }
        }, (error) => {
          this.loader.hide();
          console.log(error);

        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, "Error")
    }
  }

  /***********************Resend OTP**********************************/

  resendOtp() {
    try {
      this.modelForOtpModal.username = this.model.email ? this.model.email : this.model.phone;
      this.loader.show();
      this.baseService.action('user/resend-otp/',this.modelForOtpModal).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.alert.success(res.message, 'Success')
          } else {
            this.alert.error(res.error, 'Error')
          }
        }, (error) => {
          this.loader.hide();
          console.log(error);

        });
    } catch (err) {
      this.loader.hide();
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
