import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/Admin/admin.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  remember: any = false;
  constructor(
    private validationService: GenericFormValidationService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    private alert: NotificationService
    ) {
    localStorage.clear();
    sessionStorage.clear();
  }

  ngOnInit() {
  }

  changeRemember(evt) {
    this.remember = evt.checked;
  }

  goToAdminForgotPasswordPage() {
    this.router.navigate(['admin/forgot-password']);
  }

  doLogin() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      /**Api For the Register School */

      this.SpinnerService.show();
      this.adminService.adminlogin(this.model).subscribe(
        (res: any) => {
        this.SpinnerService.hide();
        if (res.status == true) {
          if (this.remember) {
            localStorage.setItem('userDetail', JSON.stringify(this.model));
          } else {
            localStorage.removeItem('userDetail')
          }
          localStorage.setItem("token", res.token);
          localStorage.setItem('user_type', res.user_type)
          sessionStorage.setItem('permissions', JSON.stringify(res.permissions))
          this.router.navigate(['admin/dashboard']);
        } else {
          this.SpinnerService.hide();
          this.alert.error(res.error.message[0], 'Error')
        }
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

}
