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
  filename: any = "";
  pattran:any="";
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
      formData.append('kyc_id_no', this.model.kyc_id_no);
      formData.append('kyc_name', this.model.kyc_name);
      formData.append('kyc_dob', this.model.kyc_dob);
       
      
      // if(localStorage.getItem('user_id'))
      // {
      // this.model.user_id=localStorage.getItem('user_id')
      // formData.append('user_id',this.model.user_id) ;
      // }
      /***********************Mobile Number OR Email Verification Via OTP**********************************/

      this.eiService.addKyc(formData).subscribe(res => {
        let response: any = {}
        response = res;
        this.SpinnerService.hide();
        if (response.status == true) {
          this.alert.success('Kyc upload successfully done.','Success');
          //localStorage.setItem("user_id",response.user_id);
          if(response.is_already_registered==true)
          {
            //this.router.navigate(['user/school-confirmation']);
          }else{
              this.router.navigate(['ei/add-ei']);
          }
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
  /**End Kyc SUbmit */
  isValid() {
   
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.genericFormValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
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
    /**************Upload File Function****************/
    handleFileInput(file) {
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      this.filename = fileData.name;
      this.uploadedContent = fileData;
      console.log(this.uploadedContent);
      
    }
    /*************************************************/
}