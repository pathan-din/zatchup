import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../../services/user/users-service.service';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';

import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../services/notification/notification.service';

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
  filename1: any = "";
  date: any = [];
  isStudent: boolean = true;
  pattran:any="";
 
  maxLength:any=45;
  placeholder="Enter Id";
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
  arrAadhar:any=[1];
  /*********************************************************/
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any;
  uploadedContentForBackPhoto: any;
  params:any;
  constructor(private genericFormValidationService: GenericFormValidationService,
    public baseService: BaseService,
     private router: Router, 
     private SpinnerService: NgxSpinnerService,
     public userService: UsersServiceService, 
     public formBuilder: FormBuilder,
     public alert:NotificationService,
     private route:ActivatedRoute) { }

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params=>{
      this.params = params;
    })
    this.model.kyc_type = "";
    this.dateModel = '';
    this.monthModel = '';
    this.yearModel = '';
    if(!localStorage.getItem("year") && !localStorage.getItem("month") && !localStorage.getItem("day") && !localStorage.getItem("kyc_name")){
      this.getKYC()
      
    }else{
      this.yearModel = localStorage.getItem("year");
      this.monthModel = localStorage.getItem("month");
      this.dateModel = localStorage.getItem("day");
      this.model.kyc_name= localStorage.getItem("kyc_name").replace("&", " ");;
    }
    
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
  getKYC(){
    //check-user-ekyc/
    try {
      this.baseService.action("user/check-user-ekyc/",{}).subscribe((res:any)=>{
        if(res.status == true){
          this.model.kyc_name=res.data.name
          
          this.yearModel = res.data.kyc_dob.split('-')[0];
          this.monthModel = res.data.kyc_dob.split('-')[1]
          if(res.data.kyc_dob.split('-')[2].length>2){
            this.dateModel = res.data.kyc_dob.split('-')[2].split('T')[0]
          }else{
            this.dateModel = res.data.kyc_dob.split('-')[2]
          }
          
        }
      },(error)=>{
        console.log(error);
        
      })
    } catch (e) {
    
    }
  }
  checkIdValidation(){
    this.pattran='';
    if(this.model.kyc_type=='Aadhar'){
      this.maxLength = 12;
      this.placeholder='Enter id'
      this.model.kyc_id_no='';
      //this.pattran = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$";
      this.pattran = "";
    }else if(this.model.kyc_type=='Dl'){
      this.maxLength = 16;
      this.placeholder='Enter id'
      this.model.kyc_id_no='';
     // this.pattran = "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$";
      this.pattran = "";
    }else if(this.model.kyc_type=='Passport'){
      this.maxLength = 8;
      //this.pattran = "^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$";
      this.pattran = "";
      this.model.kyc_id_no='';
      this.placeholder='Enter id'
    }
  } 
  isValid(event) {
    
    
    if(this.model.kyc_id_no)
    {
      if(this.arrAadhar.length%4==0 && this.arrAadhar.length<12 && this.model.kyc_type=='Aadhar'){
        this.model.kyc_id_no=this.model.kyc_id_no;
      }
      this.arrAadhar.push(1);
    } else{
      this.arrAadhar=[1];
    }
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
 
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      const formData = new FormData();
      formData.append('kyc_type', this.model.kyc_type);
      formData.append('kyc_document', this.uploadedContent);
      formData.append('kyc_document_back', this.uploadedContentForBackPhoto);
      formData.append('kyc_id_no', this.model.kyc_id_no);
      formData.append('kyc_name', this.model.kyc_name);
      formData.append('kyc_dob', this.model.kyc_dob);

      this.SpinnerService.show();

      if(this.params.action == 'sendrequest'){
        this.userService.addRequestSendKyc(formData).subscribe((response:any) => {
         
          this.SpinnerService.hide();
          if (response.status == true) {
            this.router.navigate([this.params.returnUrl]);
            
          }else {
            this.SpinnerService.hide();
            var errorCollection = '';
            for (var key in response.error) {
              if (response.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + response.error[key][0] + '\n'
  
              }
            }
            this.alert.error(errorCollection,'Error');
          }
        }, (error) => {
          this.SpinnerService.hide();
          console.log(error);
  
        });
       
        
      }else{
        this.userService.addKyc(formData).subscribe(res => {
          let response: any = {}
          response = res;
          this.SpinnerService.hide();
          if (response.status == true) {
            localStorage.removeItem("year");
            localStorage.removeItem("month");
            localStorage.removeItem("day");
            localStorage.removeItem("kyc_name");
            //localStorage.setItem("");
            if(response.reg_steps<5){
              if(response.is_already_registered==true)
              {
                this.router.navigate(['user/school-confirmation']);
              }else{
                if(localStorage.getItem("isrejected")){
                  //location.reload();
                }else{
                  this.router.navigate(['user/add-ei']);
                  // $("#currentStatusModel").modal({
                  //   backdrop: 'static',
                  //   keyboard: false
                  // });
                }
              }
            }else{
              this.router.navigate(['user/my-educational-profile']);
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
            this.alert.error(errorCollection,'Error');
          }
        }, (error) => {
          this.SpinnerService.hide();
          console.log(error);
  
        });
      }
    
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
    /**************Upload File Function****************/
    handleFileInputForBackPhoto(file) {
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      this.filename1 = fileData.name;
      this.uploadedContentForBackPhoto = fileData;
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
          localStorage.setItem("role",data.is_currently_student);
          $("#currentStatusModel").modal('hide');
          this.router.navigate(['user/add-ei']);
        //  if(isStudent == 1)
        //  {
        //   this.router.navigate(['user/qualification'], {queryParams: {'title': 'What are you currently studying?'},   skipLocationChange: true});
        //  }else{
        //   this.router.navigate(['user/qualification'], {queryParams: {'title': 'Your highest level of education?'}, skipLocationChange: true});
        //  }
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          for (var key in response.error) {
            if (response.error.hasOwnProperty(key)) {
              errorCollection = errorCollection + response.error[key][0] + '\n'

            }
          }
          this.alert.error(errorCollection,'Error');
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
