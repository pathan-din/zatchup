import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { findIndex } from 'rxjs/operators';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-subadmin-add',
  templateUrl: './subadmin-add.component.html',
  styleUrls: ['./subadmin-add.component.css']
})
export class SubadminAddComponent implements OnInit {
  model: any = {};
  errorDisplay: any = {};
  designationList: any = [];
  moduleList: any = [];
  designations: any = [];
  modifiedModulesList: any = [];
  isTeacher: boolean = false;
  classListArrayAccess: any = [];
  classListArrayModuleAccess: any = [];
  courseList: any = [];
  courseListModuleAccess: any = [];
  standardList: any = [];
  classList: any = [];
  isModuleAccessStudent: any
  standardListModuleAccess: any = [];
  classListModuleAccess: any = [];
  modelCodeIndex: any;
  arrayList: any = [];
  isClass: any;
  isModuleAccessClass: any
  maxlength: any;
  type: string;
  constructor(
    private router: Router,
    private baseService: BaseService,
    private SpinnerService: NgxSpinnerService,
    public eiService: EiServiceService,
    private genericFormValidationService: GenericFormValidationService,
    private alert: NotificationService,
    private location: Location
  ) { }





  ngOnInit(): void {
  }

  isCheckEmailOrPhone(event) {
    this.maxlength = ''
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value)) {
      this.type = 'email';
      this.maxlength = 50;
      this.model.username = event.target.value;
    } else {
      const numbers = /^[0-9]+$/;
      if (numbers.test(event.target.value)) {
        this.type = 'tel'
        this.maxlength = 10;
        this.model.username = event.target.value;

      } else {
        this.type = 'email'
        this.maxlength = 50;
      }

    }
  }
  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  addSubadmin() {
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.SpinnerService.show();
      this.baseService.action('ei/add-subadmin-by-ei/', this.model).subscribe(res => {
        this.SpinnerService.hide();
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.SpinnerService.hide();
          this.alert.success("Signup request successfully send", 'Success');
          this.router.navigate(['ei/subadmin-management']);
        } else {
          this.SpinnerService.hide();
          this.errorDisplay = this.eiService.getErrorResponse(this.SpinnerService, response.error)
          this.alert.error(this.errorDisplay, 'Error');
        }
      }, (error) => {
        this.SpinnerService.hide();
      });
    } catch (e) {
    }
  }

  goBack(): void {
    this.location.back()
  }
}
