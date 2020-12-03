import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../../services/notification/notification.service';
import { UsersServiceService } from '../../../../services/user/users-service.service';


declare var $: any;


@Component({
  selector: 'app-ei-login-subadmin',
  templateUrl: './ei-login-subadmin.component.html',
  styleUrls: ['./ei-login-subadmin.component.css']
})
export class EiLoginSubadminComponent implements OnInit {
  model:any={};
  
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay = '';
  modelForOtpModal:any={};
  constructor(private router: Router,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    public baseService: BaseService,
    public alert: NotificationService
    , private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public userService: UsersServiceService, 
    private genericFormValidationService: GenericFormValidationService) { }

  ngOnInit(): void {
  }


  /**Login For SubAdmin */
  doLogin(){
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();
      
      
      this.baseService.action('subadmin/login/', this.model).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        if(response.status==true)
        {
          this.SpinnerService.hide();
          $("#OTPModel").modal({
            backdrop: 'static',
            keyboard: false
          });
        }else{
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          // alert(errorCollection);
          this.alert.error(errorCollection,'Error')
        }

      }, (error) => {
        this.SpinnerService.hide();
        //console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();
      //console.log(err);
    }
  }
  resendOtp() {
    try {
      let data: any = {};
      this.modelForOtpModal.username = this.model.username ? this.model.username : this.model.phone;
      //this.modelForOtpModal.username = this.model.email ? this.model.email : this.model.phone;

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

      this.baseService.action('subadmin/otp-verify/',data).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("permission", JSON.stringify(response.permission));
          
           $("#OTPModel").modal('hide');
           this.router.navigate(['ei/dashboard']);
          // if(response.steps>=3 && response.approved==1)
          // {
          //   this.router.navigate(['user/my-profile']);
          // }else if(response.steps>=3 && response.approved==0)
          // {
          //   this.router.navigate(['user/congratulation']);
          // }else{
          //   this.router.navigate(['user/kyc-verification']);
          // }
          
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
  goToEiForgetPasswordPage(){
    this.router.navigate(['ei/forgot-password']);
  }

  goToEiContactUsPage(){
    this.router.navigate(['ei/contact-us']);
  }

  goToEiSubadminRegisterPage(){
    this.router.navigate(['ei/subadmin-register']);
  }

 
}
