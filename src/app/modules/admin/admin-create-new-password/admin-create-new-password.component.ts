import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService  } from 'src/app/services/Admin/admin.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-create-new-password',
  templateUrl: './admin-create-new-password.component.html',
  styleUrls: ['./admin-create-new-password.component.css']
})
export class AdminCreateNewPasswordComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  subscription: Subscription;

  constructor(
    private validationService: GenericFormValidationService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
  ) {
  }

  ngOnInit() {
    console.log('local storage data is as ::', localStorage.getItem('otpVerifyData'))
    if (location.hash.split('?token=')[1])
      this.verifyCode();
  }


  verifyCode() {
    let code = location.hash.split('?token=')[1];
    var json = {
      "code": decodeURI(code)
    }
    try {
      /**Api For the verify code */
      this.SpinnerService.show();
      this.adminService.verifyResetCode(json).subscribe(
        (res: any) => {
          if (res.status === true) {
            this.model.key = res.data.key;
            this.model.uid = res.data.uid;
            this.alert.success('Email verified', 'Success')
          } else {
            this.alert.error(res.error.message[0], "Error");
            this.router.navigate(['admin/login']);
          }
          this.SpinnerService.hide();
        }, (error) => {
          this.SpinnerService.hide();
          console.log(error);
        });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  changePassword() {
    if (JSON.parse(localStorage.getItem('otpVerifyData'))) {
      let data = JSON.parse(localStorage.getItem('otpVerifyData'))
      this.model['key'] = data.key;
      this.model['uid'] = data.uid;
    }
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      /**Api For the password change */
      this.SpinnerService.show();
      this.adminService.setAdminPassword(this.model).subscribe(
        (res: any) => {
          this.SpinnerService.hide();
          if (res.status == true) {
            this.alert.success(res.message, 'Success')
            localStorage.removeItem("otpVerifyData");
            this.router.navigate(['admin/login']);
          } else {
            this.alert.error(res.error.message[0], 'Error')
            this.SpinnerService.hide();
          }
        }, (error) => {
          this.SpinnerService.hide();
        });
    }
    catch (e) {
      this.SpinnerService.hide();
      this.alert.error(e, 'Error');
    }
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
}
