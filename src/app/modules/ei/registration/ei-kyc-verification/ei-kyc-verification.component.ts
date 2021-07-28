import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseService } from '../../../../services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';

@Component({
  selector: 'app-ei-kyc-verification',
  templateUrl: './ei-kyc-verification.component.html',
  styleUrls: ['./ei-kyc-verification.component.css']
})
export class EiKycVerificationComponent implements OnInit {
  model: any = {};
  errorDisplay: any = {};
  uploadedContent: any;
  uploadedContent_back: any;
  filename: any = "";
  pattran: any = "";
  arrAadhar: any = [1];
  maxLength: any = 45;
  placeholder = "Enter Id";
  submitDisable: boolean;
 reasonTextMessage : any = '';
 isSubmit: boolean;
 params: any = {};
 text: any = 'text';



  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private formValidationService: GenericFormValidationService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params;
    })

    this.model.kyc_type = '';
    if (!localStorage.getItem("dob") && !localStorage.getItem("name")) {
      this.getKYC();
    } else {
      this.model.kyc_dob = this.baseService.getDateReverseFormat(localStorage.getItem("dob"));
      this.model.kyc_name = localStorage.getItem("name");
    }
    if(localStorage.getItem('getreject')){
      if(JSON.parse(localStorage.getItem('getreject')).is_kyc_rejected == true ){
        this.reasonTextMessage = "Your KYC is rejected because of " + JSON.parse(localStorage.getItem('getreject')).ekyc_rejected_reason + ' ' + JSON.parse(localStorage.getItem('getreject')).ekyc_rejected_remark + ' ' + 'Please re-submit The KYC.'
      }
    }
 
  }
  getKYC() {
    try {
      this.loader.show()
      this.baseService.action("user/check-user-ekyc/", {}).subscribe((res: any) => {
        if (res.status == true) {
          this.loader.hide()
          this.model.kyc_name = res.data.name
          if (res.data.kyc_dob.length > 10) {
            this.model.kyc_dob = res.data.kyc_dob.split('T')[0];
          } else {
            this.model.kyc_dob = res.data.kyc_dob;
          }
        }
      }, (error) => {
        this.loader.hide()
      })
    } catch (e) {
      this.loader.hide()
    }
  }

  goToUserQualificationPage() {
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      this.submitDisable = true;
      this.isSubmit = true;
      const formData = new FormData();
      let kyc_doc_back: any  = this.uploadedContent_back ? this.uploadedContent_back : ''
      if (this.params.action == 'sendrequest') {
        if (this.params.text == 'name') {
          formData.append('kyc_name', this.model.kyc_name);
        } else {
          formData.append('kyc_dob', this.model.kyc_dob);
        }
        formData.append('kyc_type', this.model.kyc_type);
        formData.append('kyc_document', this.uploadedContent);
        formData.append('kyc_document_back', kyc_doc_back);
        formData.append('kyc_id_no', this.model.kyc_id_no);
        this.baseService.action('user/upload-ekyc-for-detail-change/', formData).subscribe((response: any) => {
          this.loader.hide();
          if (response.status == true) {
            this.router.navigate([this.params.returnUrl]);
          } else {
            this.loader.hide();
            this.isSubmit = false;
            var errorCollection = '';
            for (var key in response.error) {
              if (response.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + response.error[key][0] + '\n'

              }
            }
            this.alert.error(errorCollection, 'Error');
          }
        }, (error) => {
          this.loader.hide();
          this.isSubmit = false;
        });
      }  
      else {
        this.model.kyc_dob = this.datePipe.transform(this.model.kyc_dob, 'yyyy-MM-dd')
        this.loader.show();
        const formData = new FormData();
        let kyc_doc_back: any  = this.uploadedContent_back ? this.uploadedContent_back : ''
        formData.append('kyc_type', this.model.kyc_type);
        formData.append('kyc_document', this.uploadedContent);
        formData.append('kyc_document_back', kyc_doc_back);
        formData.append('kyc_id_no', this.model.kyc_id_no);
        formData.append('kyc_name', this.model.kyc_name);
        formData.append('kyc_dob', this.model.kyc_dob);
        this.baseService.action('user/kyc-upload/', formData).subscribe((res: any) => {
          this.loader.hide();
          if (res.status == true) {
            this.alert.success('Kyc upload successfully done.', 'Success');
            if (res.is_already_registered == true) {
              if(res.ei_request_count > 1){
                this.router.navigate(['ei/school-approval-list-signup'])
              }
              else{
                this.router.navigate(['ei/subadmin-school-confirm']);
              }
            } else {
              if (res.reg_steps >= 4) {
                this.router.navigate(['ei/my-profile']);
              } else {
                this.router.navigate(['ei/add-ei']);
              }
            }
          } else {
            this.loader.hide();
            var errorCollection = '';
            if (res.error) {
              for (var key in res.error) {
                if (res.error.hasOwnProperty(key)) {
                  errorCollection = errorCollection + res.error[key][0] + '\n'
                }
              }
              this.alert.error(errorCollection, 'Error');
            } else {
              this.alert.error(res.message, 'Error');
            }
          }
          this.submitDisable = false;
        }, (error) => {
          this.submitDisable = false;
          this.loader.hide();
        });
      }
     
    } catch (err) {
      this.loader.hide();
    }
  }

  isValid() {
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  checkIdValidation() {
    this.pattran = '';
    this.model.kyc_id_no = '';
    if (this.model.kyc_type == 'Aadhar') {
      this.maxLength = 12;
      this.placeholder = 'Enter Id'
      this.pattran = '';
    } else if (this.model.kyc_type == 'Dl') {
      this.maxLength = 16;
      this.placeholder = 'Enter Id'
      this.pattran = "";
    } else if (this.model.kyc_type == 'Passport') {
      this.maxLength = 9;
      this.pattran = "";
      this.placeholder = 'Enter Id'
    }
  }

  handleFileInput(file) {
    // let fileList: FileList = file;
    // let fileData: File = fileList[0];
    // this.filename = fileData.name;
    // this.uploadedContent = fileData;
    if (file) {
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png') {
        this.loader.hide();
        this.uploadedContent = '';
        this.alert.error("File format not supported", 'Error');
        return
      }
      else {
        this.filename = fileData.name;
        this.uploadedContent = fileData;
      }
    }
  }

  handleFileInputBack(file) {
    // let fileList: FileList = file;
    // let fileData: File = fileList[0];
    // this.filename = fileData.name;
    // this.uploadedContent_back = fileData;
    if (file) {
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png') {
        this.loader.hide();
        this.uploadedContent_back = '';
        this.alert.error("File format not supported", 'Error');
        return
      }
      else {
        this.filename = fileData.name;
        this.uploadedContent_back = fileData;
      }
    }
  }
}