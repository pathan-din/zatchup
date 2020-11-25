import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/Admin/admin.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-admin-forgot-password',
  templateUrl: './admin-forgot-password.component.html',
  styleUrls: ['./admin-forgot-password.component.css']
})
export class AdminForgotPasswordComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  verificationMobileNo: any;
  title: any = 'Password Recovery?'
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any

  constructor(
    private validationService: GenericFormValidationService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private baseService: BaseService,
  ) { }

  ngOnInit() {
  }

  submit() {
    if (this.verificationMobileNo)
      this.mobileVerification()
    else
      this.sendForgotLink()
  }

  sendForgotLink() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      /**Api For the Register School */
      this.SpinnerService.show();
      this.adminService.sendForgotLink(this.model).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, 'Success');
            if (res.data.phone) {
              this.verificationMobileNo = res.data.phone;
              this.title = 'Mobile Verification'
            }
            else
              this.router.navigate(['admin/login']);
          } else {
            this.alert.error(res.error.message[0], 'Error');
            this.router.navigate(['admin/login']);
          }
          this.SpinnerService.hide();
        }, (error) => {
          this.SpinnerService.hide();
          this.alert.error(error, 'Error')
        });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }


  changeInput($ev) {
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
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
        this.SpinnerService.show();
        this.baseService.action('admin/verify_reset_password/', data).subscribe(
          (res: any) => {
            if (res.status == true) {
              localStorage.setItem('otpVerifyData', JSON.stringify(res.data))
              this.router.navigate(['admin/create-new-password']);
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
