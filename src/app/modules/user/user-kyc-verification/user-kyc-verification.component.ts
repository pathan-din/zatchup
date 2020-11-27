import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';

import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;

@Component({
  selector: 'app-user-kyc-verification',
  templateUrl: './user-kyc-verification.component.html',
  styleUrls: ['./user-kyc-verification.component.css']
})
export class UserKycVerificationComponent implements OnInit {
  model: any = {}
  uploadedContent: any;
  filename: any = "";
  date: any = [];
  isStudent: boolean = true;
  pattran:any="";
  month: any = [{ monInNumber: '01', monInWord: 'Jan' },
  { monInNumber: '02', monInWord: 'Feb' },
  { monInNumber: '03', monInWord: 'Mar' },
  { monInNumber: '04', monInWord: 'Apr' },
  { monInNumber: '05', monInWord: 'May' },
  { monInNumber: '06', monInWord: 'Jun' },
  { monInNumber: '07', monInWord: 'Jul' },
  { monInNumber: '08', monInWord: 'Aug' },
  { monInNumber: '09', monInWord: 'Sep' },
  { monInNumber: '10', monInWord: 'Oct' },
  { monInNumber: '11', monInWord: 'Nov' },
  { monInNumber: '12', monInWord: 'Dec' }]
  year: any = [];
  /***********************************************************************/
  /**Use thease varible for the date of birth bind in html**/
  dateModel: any;
  monthModel: any;
  yearModel: any;

  /*********************************************************/
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any;
  constructor(private genericFormValidationService: GenericFormValidationService,
    public baseService: BaseService,
     private router: Router, private SpinnerService: NgxSpinnerService, public userService: UsersServiceService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.model.kyc_type = "";
    this.dateModel = '';
    this.monthModel = '';
    this.yearModel = '';

    var dt = new Date();
    /**Get Current year for date of birth year dropdown**/
    var year = dt.getFullYear();
    for (var i = year; i >= this.userService.globalYear; i--) {
      this.year.push(i);
    }
    /**init day for day Dropdown **/
    for (var d = 1; d <= 31; d++) {
      this.date.push(d);
    }
  }
  checkIdValidation(){
    this.pattran='';
    if(this.model.kyc_type=='Aadhar'){
      this.pattran = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$";
    }else if(this.model.kyc_type=='Dl'){
      this.pattran = "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$";
    }else if(this.model.kyc_type=='Passport'){
      this.pattran = "^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$";
    }
    
  }
  isValid(event) {

    if (this.yearModel && this.monthModel && this.dateModel) {
      this.model.kyc_dob = this.yearModel + '-' + this.monthModel + '-' + this.dateModel;
    } else {
      this.model.kyc_dob = "";
    }
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }

  }
  goToUserQualificationPage() {
    this.error = [];
    this.errorDisplay = {};
    if (this.yearModel && this.monthModel && this.dateModel) {
      this.model.kyc_dob = this.yearModel + '-' + this.monthModel + '-' + this.dateModel;
    }
    this.error = [];
    this.errorDisplay = {};
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    console.log(this.errorDisplay)
    if (this.errorDisplay.valid) {
      return false;
    }
    try {

      this.SpinnerService.show();

      const formData = new FormData();
      formData.append('kyc_type', this.model.kyc_type);
      formData.append('kyc_document', this.uploadedContent);
      formData.append('kyc_id_no', this.model.kyc_id_no);
      formData.append('kyc_name', this.model.kyc_name);
      formData.append('kyc_dob', this.model.kyc_dob);
      // if(localStorage.getItem('user_id'))
      // {
      // this.model.user_id=localStorage.getItem('user_id')
      // formData.append('user_id',this.model.user_id) ;
      // }
      /***********************Mobile Number OR Email Verification Via OTP**********************************/

      this.userService.addKyc(formData).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          //localStorage.setItem("user_id",response.user_id);
          if(response.is_already_registered==true)
          {
            this.router.navigate(['user/school-confirmation']);
          }else{
            $("#currentStatusModel").modal({
              backdrop: 'static',
              keyboard: false
            });
          }
          

          
         /* $("#currentStatusModel").modal({
            backdrop: 'static',
            keyboard: false
          });*/
          // this.router.navigate(['user/qualification']);
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

  }
  /**************Upload File Function****************/
  handleFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.filename = fileData.name;
    this.uploadedContent = fileData;
  }
  /*************************************************/
  areYouCurrentlyStudentFunction(isStudent) {
    
    this.addRole(isStudent);
  }
  addRole(isStudent)
  {
       try {

      this.SpinnerService.show();

      let data:any={};
      data.is_currently_student= isStudent?1:0;
      this.baseService.action('user/add-role/',data).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          $("#currentStatusModel").modal('hide');
         if(isStudent == 'yes')
         {
          this.router.navigate(['user/qualification'], {queryParams: {'title': 'What are you currently studying?'},   skipLocationChange: true});
         }else{
          this.router.navigate(['user/qualification'], {queryParams: {'title': 'Your highest level of education?'}, skipLocationChange: true});
         }
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
  }
}
