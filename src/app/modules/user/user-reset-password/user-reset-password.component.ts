import { Component, OnInit } from '@angular/core';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/Admin/admin.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css']
})
export class UserResetPasswordComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  password: any;
  constructor(

    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private formValidationService: GenericFormValidationService,
  ) { }

  ngOnInit() {
    if (location.hash.split('?token=')[1])
      this.verifyCode();
  }
  verifyCode() {
    let codeOld = location.hash.split('?token=')[1];
    let code = codeOld.split('~b')[0];
    //console.log(decodeURI(codeOld.split('~b')[1].split('%')[0]));
    if (codeOld.split('~b')[1].indexOf("%") > -1) {
      this.password = atob(codeOld.split('~b')[1].split('%')[0].substring(1));

    } else {
      console.log(codeOld.split('~b')[1]);

      this.password = atob(codeOld.split('~b')[1].slice(1, -1));
    }

    localStorage.setItem("hash", btoa(this.password))
    var json = {
      "code": code
    }
    try {
      /**Api For the verify code */

      this.SpinnerService.show();

      this.adminService.verifyResetCode(json).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {
          this.model.key = response.data.key;
          this.model.uid = response.data.uid;
        } else {
          this.SpinnerService.hide();
          this.alert.error(response.error.message[0], 'Error')
          // var errorCollection = '';
          // errorCollection = this.adminService.getErrorResponse(this.SpinnerService, response.error);
          // alert(errorCollection);
          this.router.navigate(['user/login']);
        }
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

    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      /**Api For the password change */
      if (localStorage.getItem('otpVerifyData')) {
        let otpVerifyData: any = {};
        otpVerifyData = JSON.parse(localStorage.getItem('otpVerifyData'));
        this.model.key = otpVerifyData.key;
        this.model.uid = otpVerifyData.uid;
        //var email=localStorage.getItem('email');
        //this.firebase.updateFirebasePassword(email,this.password)
      }
      console.log(this.model);
      this.SpinnerService.show();

      this.adminService.setAdminPassword(this.model).subscribe(res => {

        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {

          this.alert.success(response.success, 'Success');
          this.router.navigate(['user/login']);
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
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  isValid(event) {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

}
