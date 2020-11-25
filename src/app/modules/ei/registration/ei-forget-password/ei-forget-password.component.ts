import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { AdminService } from '../../../../services/Admin/admin.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
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
  constructor(
    private genericFormValidationService: GenericFormValidationService, 
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public adminService: AdminService,
    public formBuilder: FormBuilder,
    private alert: NotificationService
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

      this.adminService.sendForgotLink(this.model).subscribe(res => {
        console.log(res);
        let response: any = {};
        response = res;
        this.SpinnerService.hide();
        if (response.status === true) {
          alert(response.message);
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
