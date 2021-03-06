import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { AdminService } from '../../../../services/Admin/admin.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';
declare var $: any;

@Component({
  selector: 'app-ei-forget-password',
  templateUrl: './ei-forget-password.component.html',
  styleUrls: ['./ei-forget-password.component.css']
})

export class EiForgetPasswordComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  verificationMobileNo: any;
  title: string;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
   
  constructor(
    private genericFormValidationService: GenericFormValidationService, 
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private baseService:BaseService
    ) { }

  ngOnInit() {
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
      }else{
        this.adminService.sendForgotLink(this.model).subscribe(res => {
          console.log(res);
          let response: any = {};
          response = res;
          this.SpinnerService.hide();
          if (response.status === true) {
            this.alert.success(response.message, 'Success');
            if (response.data.phone) {
              this.verificationMobileNo = response.data.phone;
              this.title = 'Mobile Verification'
            }else
             this.router.navigate(['ei/login']);
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
              this.router.navigate(['ei/create-new-password']);
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
 
}
