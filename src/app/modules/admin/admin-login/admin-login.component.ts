import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/Admin/admin.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CookieService } from 'ngx-cookie-service';

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
    private _cookieService: CookieService,
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
    if(this._cookieService.check('remember'))
    {
      this.model.username = JSON.parse(this._cookieService.get('remember')).username;
      this.model.password = JSON.parse(this._cookieService.get('remember')).password;
      this.remember = true;
    }
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
            let user = {
              email: res.email,
              first_name: res.first_name,
              last_name: res.last_name,
              phone: res.phone
            }
            sessionStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem("token", res.token);
            localStorage.setItem('user_type', res.user_type)
            sessionStorage.setItem('permissions', JSON.stringify(res.permissions))
            if (this.remember)
              this.setCookies();
            else
              this.deleteCookies();
            this.router.navigate(['admin/dashboard']);
          } else {
            this.SpinnerService.hide();
            this.alert.error(res.error.message[0], 'Error')
          }
        }, (error) => {
          this.SpinnerService.hide();
          this.alert.error(error.message, 'Error')
        });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  setCookies() {
    let remember = {
      "username": this.model.username,
      "password": this.model.password
    }
    this._cookieService.set('remember', JSON.stringify(remember))
  }
  
  deleteCookies(){
    this._cookieService.delete('remember')
  }
}
