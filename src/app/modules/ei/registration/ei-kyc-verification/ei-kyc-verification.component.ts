import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EiServiceService } from '../../../../services/EI/ei-service.service';
import { BaseService } from '../../../../services/base/base.service';
import { UsersServiceService } from '../../../../services/user/users-service.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ei-kyc-verification',
  templateUrl: './ei-kyc-verification.component.html',
  styleUrls: ['./ei-kyc-verification.component.css']
})
export class EiKycVerificationComponent implements OnInit {
  model:any={};
  errorDisplay:any={};
  uploadedContent: any;
  uploadedContent_back: any;
  filename: any = "";
  pattran:any="";
  arrAadhar:any=[1];
  maxLength:any=45;
  placeholder="Enter Id";
  constructor(private genericFormValidationService: GenericFormValidationService, 
    private router: Router,
    private SpinnerService: NgxSpinnerService, 
    public eiService: EiServiceService, 
    public base: BaseService, 
    public formBuilder: FormBuilder,
    private alert: NotificationService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public userService: UsersServiceService) { }

  ngOnInit(): void {
    this.model.kyc_type='';
    if(!localStorage.getItem("dob") && !localStorage.getItem("name")){

    }else{
     this.model.kyc_dob  = this.base.getDateReverseFormat(localStorage.getItem("dob"));
     this.model.kyc_name = localStorage.getItem("name");
    }
    
  }
  /**Submit KYC of SUBADMIN */
  goToUserQualificationPage(){
    this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.model.kyc_dob = this.datePipe.transform(this.model.kyc_dob, 'yyyy-MM-dd')
      console.log(this.model);
      
      this.SpinnerService.show();

      const formData = new FormData();
      formData.append('kyc_type', this.model.kyc_type);
      formData.append('kyc_document', this.uploadedContent);
      formData.append('kyc_document_back', this.uploadedContent_back);
      formData.append('kyc_id_no', this.model.kyc_id_no);
      formData.append('kyc_name', this.model.kyc_name);
      formData.append('kyc_dob', this.model.kyc_dob);
      
      
      // if(localStorage.getItem('user_id'))
      // {
      // this.model.user_id=localStorage.getItem('user_id')
      // formData.append('user_id',this.model.user_id) ;
      // }
      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      //this.eiService.addKyc
      
      this.userService.addKyc(formData).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.alert.success('Kyc upload successfully done.','Success');
          //localStorage.setItem("user_id",response.user_id);
          if(response.is_already_registered==true)
          {
            this.router.navigate(['ei/subadmin-school-confirm']);
          }else{
            if(response.reg_steps){
              this.router.navigate(['ei/my-profile']);
            }else{
              this.router.navigate(['ei/add-ei']);
            }
              
          }
        } else {
          this.SpinnerService.hide();
          var errorCollection = '';
          if(response.error){
            for (var key in response.error) {
              if (response.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + response.error[key][0] + '\n'
  
              }
            }
             
            this.alert.error(errorCollection,'Error');
          }else{
            this.alert.error(response.message,'Error');
          }
         
        }
      }, (error) => {
        this.SpinnerService.hide();
        console.log(error);

      });
    } catch (err) {
      this.SpinnerService.hide();

    }
  }
  /**End Kyc SUbmit */
  isValid() {
   
    // if(this.model.kyc_id_no)
    // {
    //   if(this.arrAadhar.length%4==0 && this.arrAadhar.length<12 && this.model.kyc_type=='Aadhar'){
    //     this.model.kyc_id_no=this.model.kyc_id_no+' ';
    //   }
    //   this.arrAadhar.push(1);
    // }else{
    //   this.arrAadhar=[1];
    // }
   
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }


  }
  checkIdValidation(){
    this.pattran='';
    if(this.model.kyc_type=='Aadhar'){
      this.maxLength = 12;
      this.placeholder='Enter Id'
      //this.model.kyc_id_no
      this.pattran ='';
     // this.pattran = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$";
    }else if(this.model.kyc_type=='Dl'){
      this.maxLength = 16;
      this.placeholder='Enter Id'
     // this.pattran = "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$";
      this.pattran = "";
    }else if(this.model.kyc_type=='Passport'){
      this.maxLength =9;
     // this.pattran = "^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$";
      this.pattran = "";
      this.placeholder='Enter Id'
    }
  }
    /**************Upload File Function****************/
    handleFileInput(file) {
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      this.filename = fileData.name;
      this.uploadedContent = fileData;
      console.log(this.uploadedContent);
      
    }
    /**************Upload File Function****************/
    handleFileInputBack(file) {
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      this.filename = fileData.name;
      this.uploadedContent_back = fileData;
      console.log(this.uploadedContent);
      
    }
    /*************************************************/
}