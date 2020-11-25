import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-work-detail',
  templateUrl: './user-work-detail.component.html',
  styleUrls: ['./user-work-detail.component.css']
})
export class UserWorkDetailComponent implements OnInit {
model:any  ={};
modelDept:any={};
workProfileList:any=[];
date:any=[];
dateModel:any='';
monthModel:any='';
yearModel:any='';
  month:any=[{monInNumber:'01',monInWord:'Jan'},
             {monInNumber:'02',monInWord:'Feb'},
             {monInNumber:'03',monInWord:'Mar'},
             {monInNumber:'04',monInWord:'Apr'},
             {monInNumber:'05',monInWord:'May'},
             {monInNumber:'06',monInWord:'Jun'},
             {monInNumber:'07',monInWord:'Jul'},
             {monInNumber:'08',monInWord:'Aug'},
             {monInNumber:'09',monInWord:'Sep'},
             {monInNumber:'10',monInWord:'Oct'},
             {monInNumber:'11',monInWord:'Nov'},
             {monInNumber:'12',monInWord:'Dec'}]
  year:any=[];
  error: any = [];
  errorDisplay: any = {};
 
  constructor(private genericFormValidationService: GenericFormValidationService,
    public baseService: BaseService,
    private router: Router, private SpinnerService: NgxSpinnerService, public userService: UsersServiceService, public formBuilder: FormBuilder) { }


  ngOnInit(): void {
    
    var dt = new Date();
    /**Get Current year for date of birth year dropdown**/
    var year = dt.getFullYear();
    var mon = dt.getMonth();
    var day = dt.getDay();
    for (var i = year; i >= this.userService.globalYear; i--) {
      this.year.push(i);
    }
    /**init day for day Dropdown **/
    for (var d = 1; d <= 31; d++) {
      this.date.push(d);
    }
    this.model.work_type='';
    this.model.work_department='';
    this.model.end_year=day+'-'+mon+'-'+year;
    
    this. getWorkProfile();
   
  }
  isValid(event) {
   
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }

  }
  goToKycSuccessfulPage() {
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    
    if (this.errorDisplay.valid) {
      return false;
    }
    try {

      this.SpinnerService.show();
 
      /***********************Mobile Number OR Email Verification Via OTP**********************************/

      this.baseService.action('user/workdetail/',this.model).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
           
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          alert(errorCollection);
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();

    }
    
    // this.router.navigate(['user/Kyc-successful-done']);
  }
  getWorkProfile() {
    try {

      this.SpinnerService.show();
      this.baseService.getData('user/get-all-work-departments/').subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        this.workProfileList=response.results;
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();

    }
  }

}
