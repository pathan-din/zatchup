import { Component, OnInit } from '@angular/core';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/Admin/admin.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-create-new-password',
  templateUrl: './ei-create-new-password.component.html',
  styleUrls: ['./ei-create-new-password.component.css']
})
export class EiCreateNewPasswordComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  password: string;

  constructor(private genericFormValidationService: GenericFormValidationService, private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    private alert: NotificationService) { }

  ngOnInit() {
    if (localStorage.getItem("otpVerifyData")) {
      let response: any = {}
      response = JSON.parse(localStorage.getItem("otpVerifyData"))
      this.model.key = response.key;
      this.model.uid = response.uid;
    } else {
      this.verifyCode();
    }

  }


  verifyCode() {
    let codeOld = location.hash.split('?token=')[1];

  
    let code =''
    if(!codeOld.split('~b')[1]){
      code = codeOld
    }
    else{
      code = codeOld.split('~b')[0];

    if (codeOld.split('~b')[1].indexOf("%") > -1) {
      this.password = atob(codeOld.split('~b')[1].split('%')[0].substring(1));
    } else {
      this.password = atob(codeOld.split('~b')[1].slice(1, -1));
    }
    localStorage.setItem("hash", btoa(this.password))
    }
  
    
    var json = {
      "code": code
    }
    try {
      this.SpinnerService.show();
      this.adminService.verifyResetCode(json).subscribe(res => {
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {
          this.model.key = response.data.key;
          this.model.uid = response.data.uid;
        } else {
          this.SpinnerService.hide();
          this.alert.error(response.error.message[0], 'Error')
          this.router.navigate(['ei/login']);
        }
      }, (error) => {
        this.SpinnerService.hide();
      });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  changePassword() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      /**Api For the password change */

      this.SpinnerService.show();

      this.adminService.setAdminPassword(this.model).subscribe(res => {
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {
          this.alert.success(response.message, 'Success');
          localStorage.removeItem("otpVerifyData")
          this.router.navigate(['ei/login']);
        } else {
          this.SpinnerService.hide();
          this.alert.error(response.error.message[0], 'Error')
        }
      }, (error) => {
        this.SpinnerService.hide();
      });
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
}
