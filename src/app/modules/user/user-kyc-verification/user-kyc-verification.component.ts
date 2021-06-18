import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../../../services/base/base.service';
import { GenericFormValidationService } from '../../../services/common/generic-form-validation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../services/notification/notification.service';
declare var $: any;

@Component({
  selector: 'app-user-kyc-verification',
  templateUrl: './user-kyc-verification.component.html',
  styleUrls: ['./user-kyc-verification.component.css']
})
export class UserKycVerificationComponent implements OnInit {
  @ViewChild('fileInput') frontImage: ElementRef;
  @ViewChild('fileInput1') backImage: ElementRef;
  @ViewChild('form') form;
  model: any = {}
  uploadedContent: any;
  filename: any = "";
  filename1: any = "";
  date: any = [];
  isStudent: boolean = true;
  pattran: any = "";
  maxLength: any = 45;
  placeholder = "Enter Id";
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
  dateModel: any;
  monthModel: any;
  yearModel: any;
  arrAadhar: any = [1];
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any;
  uploadedContentForBackPhoto: any;
  params: any = {};
  text: any = 'text';
  isSubmit: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private formValidationService: GenericFormValidationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params;
    })
    this.model.kyc_type = "";
    this.dateModel = '';
    this.monthModel = '';
    this.yearModel = '';
    if (!localStorage.getItem("year") && !localStorage.getItem("month") && !localStorage.getItem("day") && !localStorage.getItem("kyc_name")) {
      this.getKYC()
    } else {
      this.yearModel = localStorage.getItem("year");
      this.monthModel = localStorage.getItem("month");
      this.dateModel = localStorage.getItem("day");
      if (localStorage.getItem("kyc_name")) {
        this.model.kyc_name = localStorage.getItem("kyc_name").replace("&", " ");;
      }
      this.getKYC()
    }

    var dt = new Date();
    /**Get Current year for date of birth year dropdown**/
    var year = dt.getFullYear();
    for (var i = year; i >= this.baseService.globalYear; i--) {
      this.year.push(i);
    }
    for (var d = 1; d <= 31; d++) {
      if(d<9){
        this.date.push('0'+d);
      }else{
        this.date.push(d);
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
          this.yearModel = res.data.kyc_dob.split('-')[0];
          this.monthModel = res.data.kyc_dob.split('-')[1]
          if (res.data.kyc_dob.split('-').length > 2) {
            this.dateModel = res.data.kyc_dob.split('-')[2].split('T')[0]
          } else {
            this.dateModel = res.data.kyc_dob.split('-')[2]
          }
        }
      }, (error) => {
        this.loader.hide()
      })
    } catch (e) {
    }
  }
  checkIdValidation() {
    this.pattran = '';
    if (this.model.kyc_type == 'Aadhar') {
      this.maxLength = 12;
      this.placeholder = 'Enter id'
      this.model.kyc_id_no = '';
      this.text = 'number';
      this.pattran = "";
    } else if (this.model.kyc_type == 'Dl') {
      this.maxLength = 16;
      this.placeholder = 'Enter id'
      this.model.kyc_id_no = '';
      this.text = 'text';
      this.pattran = "";
    } else if (this.model.kyc_type == 'Passport') {
      this.maxLength = 8;
      this.pattran = "";
      this.model.kyc_id_no = '';
      this.placeholder = 'Enter id'
      this.text = 'text';
    }

    this.resetDocument();
  }
  isValid() {
    if (this.model.kyc_id_no) {
      if (this.arrAadhar.length % 4 == 0 && this.arrAadhar.length < 12 && this.model.kyc_type == 'Aadhar') {
        this.model.kyc_id_no = this.model.kyc_id_no;
      }
      this.arrAadhar.push(1);
    } else {
      this.arrAadhar = [1];
    }
    if (this.yearModel && this.monthModel && this.dateModel) {
      this.model.kyc_dob = this.yearModel + '-' + this.monthModel + '-' + this.dateModel;
    } else {
      this.model.kyc_dob = "";
    }
    if (Object.keys(this.errorDisplay).length !== 0) {
      this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
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
    this.errorDisplay = this.formValidationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    }
    try {
      const formData = new FormData();
      let document_back: any = this.uploadedContentForBackPhoto ? this.uploadedContentForBackPhoto : ''
      formData.append('kyc_type', this.model.kyc_type);
      formData.append('kyc_document', this.uploadedContent);
      formData.append('kyc_document_back', document_back);
      formData.append('kyc_id_no', this.model.kyc_id_no);
      this.loader.show();
      this.isSubmit = true;
      if (this.params.action == 'sendrequest') {
        if (this.params.text == 'name') {
          formData.append('kyc_name', this.model.kyc_name);
        } else {
          formData.append('kyc_dob', this.model.kyc_dob);
        }
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
      } else {
        formData.append('kyc_name', this.model.kyc_name);
        formData.append('kyc_dob', this.model.kyc_dob);
        this.baseService.action('user/kyc-upload/', formData).subscribe((res: any) => {
          this.loader.hide();
          if (res.status == true) {
            localStorage.removeItem("year");
            localStorage.removeItem("month");
            localStorage.removeItem("day");
            localStorage.removeItem("kyc_name");
            localStorage.removeItem("is_already_registered");
            if(res.is_already_registered){
              localStorage.setItem("is_already_registered",res.is_already_registered);
            }
            
            
            if (res.reg_steps < 5) {
              if (res.is_already_registered == true) {
                this.router.navigate(['user/school-confirmation']);
              } else {
                if (localStorage.getItem("isrejected")) {
                } else {
                  this.router.navigate(['user/add-ei']);
                }
              }
            } else {
              this.router.navigate(['user/my-educational-profile']);
            }
            this.isSubmit = false;
          } else {
            this.loader.hide();
            this.isSubmit = false;
            var errorCollection = '';
            for (var key in res.error) {
              if (res.error.hasOwnProperty(key)) {
                errorCollection = errorCollection + res.error[key][0] + '\n'

              }
            }
            this.alert.error(errorCollection, 'Error');
          }
        }, (error) => {
          this.loader.hide();
          this.isSubmit = false;
        });
      }

    } catch (err) {
      this.loader.hide();

    }

  }
  /**************Upload File Function****************/
  handleFileInput(file) {
    if (file) {
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png') {
        this.loader.hide();
        this.model.kyc_document = '';
        this.alert.error("File format not supported", 'Error');
        return
      }
      else {
        this.filename = fileData.name;
        this.uploadedContent = fileData;
      }
    }
  }
  /**************Upload File Function****************/
  handleFileInputForBackPhoto(file) {
    if (file) {
      let fileList: FileList = file;
      let fileData: File = fileList[0];
      if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png') {
        this.loader.hide();
        this.model.kyc_document_back = '';
        this.alert.error("File format not supported", 'Error');
        return
      }
      else {
        this.filename1 = fileData.name;
        this.uploadedContentForBackPhoto = fileData;
      }
    }
  }
  /*************************************************/
  areYouCurrentlyStudentFunction(isStudent) {

    this.addRole(isStudent);
  }
  addRole(isStudent) {
    try {
      this.loader.show();
      let data: any = {};
      data.is_currently_student = isStudent ? 1 : 0;

      this.baseService.action('user/add-role/', data).subscribe(res => {
        let response: any = {}
        response = res;
        this.loader.hide();
        if (response.status == true) {
          localStorage.setItem("role", data.is_currently_student);
          $("#currentStatusModel").modal('hide');
          this.router.navigate(['user/add-ei']);
          //  if(isStudent == 1)
          //  {
          //   this.router.navigate(['user/qualification'], {queryParams: {'title': 'What are you currently studying?'},   skipLocationChange: true});
          //  }else{
          //   this.router.navigate(['user/qualification'], {queryParams: {'title': 'Your highest level of education?'}, skipLocationChange: true});
          //  }
        } else {
          this.loader.hide();
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
      });
    } catch (err) {
      this.loader.hide();

    }
  }

  resetDocument() {
    this.frontImage.nativeElement.value = "";
    this.backImage.nativeElement.value = "";
    this.model.kyc_document = '';
    this.model.kyc_document_back = '';
    this.filename = '';
    this.filename1 = '';
  }
}
