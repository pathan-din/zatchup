import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../../../services/base/base.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Location } from '@angular/common';

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
  subadmin: any = {};
  constructor(
    private router: Router,
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private formValidationService: GenericFormValidationService
  ) { }





  ngOnInit(): void {
  }

  isCheckEmailOrPhone(event) {
    this.maxlength = ''
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value)) {

      this.type = 'email';
      this.maxlength = 50;
      this.model.email = this.model.username;
      this.model.phone = '';
    } else {
      const numbers = /^[0-9]+$/;
      if (numbers.test(event.target.value)) {
        this.type = 'tel'
        this.maxlength = 10;
        this.model.phone = this.model.username;
        this.model.email = '';
      }

    }
  }
  isValidUser() {
    this.model.zatchup_id = ''
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  isValidZatchup() {
    this.model.username = ''
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  addSubadmin() {
    this.errorDisplay = {};
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.loader.show();
      if(this.model.zatchup_id != ''){
        this.subadmin.model = {
        'zatchup_id': this.model.zatchup_id
        }
      }
      else if(this.model.username != ''){
        this.subadmin.model = {
          'username' :  this.model.username
        }
      }
      this.baseService.action('ei/add-subadmin-by-ei/',  this.subadmin.model).subscribe(res => {
        this.loader.hide();
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.loader.hide();
          this.alert.success("Signup request successfully send", 'Success');
          this.router.navigate(['ei/subadmin-management']);
        } else {
          this.loader.hide();
          this.errorDisplay = this.baseService.getErrorResponse(this.loader, response.error)
          this.alert.error(this.errorDisplay, 'Error');
        }
      }, (error) => {
        this.loader.hide();
      });
    } catch (e) {
    }
  }

  goBack(): void {
    this.location.back()
  }
}
