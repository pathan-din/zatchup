import { Component, OnInit } from '@angular/core';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/Admin/admin.service';

@Component({
  selector: 'app-ei-create-new-password',
  templateUrl: './ei-create-new-password.component.html',
  styleUrls: ['./ei-create-new-password.component.css']
})
export class EiCreateNewPasswordComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  constructor(private genericFormValidationService: GenericFormValidationService, private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.model.key = "ffsd";
    // this.model.uid = "1";
    this.verifyCode();
  }


  verifyCode() {
    let code = location.hash.split('?token=')[1];
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
          var errorCollection = '';
          errorCollection = this.adminService.getErrorResponse(this.SpinnerService, response.error);
          alert(errorCollection);
          this.router.navigate(['ei/login']);
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
    console.log(this.model);
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
        console.log(res);
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {
          alert(response.success);
          this.router.navigate(['ei/login']);
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          errorCollection = this.adminService.getErrorResponse(this.SpinnerService, response.error);
          alert(errorCollection);
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
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
}
