import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageViewerConfig, CustomEvent } from 'src/app/common/image-viewer/image-viewer-config.model';

import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from "ngx-spinner";
import { EiServiceService } from '../../../../services/EI/ei-service.service';

import { GenericFormValidationService } from '../../../../services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UsersServiceService } from 'src/app/services/user/users-service.service';

declare var $: any;

@Component({
  selector: 'app-information-and-bank',
  templateUrl: './information-and-bank.component.html',
  styleUrls: ['./information-and-bank.component.css']
})
export class InformationAndBankComponent implements OnInit {
  bankDetails: any
  model: any = {};
  editModel: any = {};
  fullAddressModel: any = [];
  title: any;
  error: any = [];
  errorDisplay: any = {};
  errorOtpModelDisplay: any = [];
  bankNameList = [];
  bankModel: any = {};
  uploadedCancelCheque: any;
  userProfile: any = {};
  userData: any = {};
  document_image: any;
  displayError: string;
  images: any = [];
  imageIndexOne = 0;
  is_ei_approved: any = "0";
  address_1: any;
  address_2: any;
  modelDocumentDetails: any = [];
  modelForOtpModal: any={};
  constructor(
    private baseService: BaseService,
    private validationService: GenericFormValidationService,
    private loader: NgxSpinnerService,
    public eiService: EiServiceService,
    private alert: NotificationService,
    private router: Router,
    public userService: UsersServiceService
    
  ) { }

  ngOnInit(): void {
    this.bankModel.bank_name = '';
    this.getBankNameList();
    this.getBankDetails();
    this.getEiProfileData();
    if (localStorage.getItem("is_ei_approved") != 'null' && localStorage.getItem("is_ei_approved") != '' && localStorage.getItem("is_ei_approved") != undefined) {
      this.is_ei_approved = localStorage.getItem("is_ei_approved");
    }
  }
  changeValue(address_1: any, full_address, model) {
    if (full_address == 'full_address') {
      model.value = this.address_1 + ' ' + this.address_2;
    }

  }
  resendOtp() {
    try {
      let data: any = {};
      this.modelForOtpModal.username = this.model.email ? this.model.email : this.model.phone;

      /***********************Mobile Number OR Email Verification Via OTP**********************************/
      this.loader.show();
      this.baseService.action('ei/resend-otp-ei-request-for-detail-change/',this.model).subscribe(res => {
        let response: any = {}
        response = res;
        this.loader.hide();
        if (response.status == true) {
          this.alert.success(response.message,"Success")
        } else {
          this.errorOtpModelDisplay = response.error;
          //alert(response.error)
        }
      }, (error) => {
        this.loader.hide();
        console.log(error);

      });
    } catch (err) {
      this.loader.hide();
      console.log("verify Otp Exception", err);
    }
  }
  goForward() {

    try {
      this.loader.show();


      // const formData = new FormData();
      if (localStorage.getItem("personalInfo")) {
        this.model = JSON.parse(localStorage.getItem("personalInfo"));
        // console.log(this.model);

        // formData.append('name_of_school', this.model.name_of_school);
        // formData.append('name_of_principle', this.model.name_of_principle);
        // formData.append('state', this.model.state);
        // formData.append('city', this.model.city);
        // formData.append('address1', this.model.address1);

        // formData.append('address2', this.model.address2);
        // formData.append('landmark', this.model.landmark);
        // formData.append('school_code', this.model.school_code);
        // formData.append('pincode', this.model.pincode);
        // formData.append('university', this.model.university);
        // formData.append('no_of_students', this.model.no_of_students);
        // formData.append('no_of_alumni', this.model.no_of_alumni);
        // formData.append('opening_date', this.baseService.getDateFormat(this.model.opening_date));
        // formData.append('send_back_to_edit', this.model.send_back_to_edit);
        // formData.append('gst_no', this.model.gst_no);
        // formData.append('overview', this.model.overview);
        // console.log('mmmmmmm',this.model)
        this.eiService.updateOnboardStepFirstData(this.model, localStorage.getItem('user_id')).subscribe(
          (res: any) => {
            if (res.status == true) {
              this.loader.hide();
              this.submitDocumentFourStep()
              this.getEiProfileData();
              localStorage.removeItem("personalInfo");
              this.alert.success("Update Successfully", "Success")
            } else {
              this.loader.hide();
            }

          }, (error) => {
            this.loader.hide();
            this.alert.error(error.message, 'Error')

          });
      } else {
        this.loader.hide();
        this.alert.error("Please edit any information before click", "");
      }


    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }



  }
  /**getBankNameList */

  getBankNameList() {
    //ei/get-allbankname/
    try {
      this.loader.show();
      this.baseService.getData('ei/get-allbankname/').subscribe(res => {
        let responce: any = {};
        responce = res;
        if (responce.status == false) {
          this.loader.hide();
          this.bankNameList = [];
          return;
        }
        this.loader.hide();
        this.bankNameList = responce.results


      }, (error) => {
        this.loader.hide();
        this.alert.error("Something went wrong", 'Error');
      })
    } catch (e) {
      this.alert.error(e, 'Error');
    }
  }
  getBankDetails() {

    this.baseService.getData('ei/ei-bank-detail/').subscribe(
      (res: any) => {
        console.log('info is as ::', res)
        if (res.status == true) {
          this.bankDetails = res.data
          if (localStorage.getItem("personalInfo")) {
            this.model = JSON.parse(localStorage.getItem("personalInfo"))
            this.bankDetails.name_of_school = this.model.name_of_school;
            this.bankDetails.name_of_principle = this.model.name_of_principle;
            this.bankDetails.opening_date = this.baseService.getDateReverseFormat(this.model.opening_date);
            this.bankDetails.gst_no = this.model.gst_no;
            this.bankDetails.overview = this.model.overview;
            this.bankDetails.full_address = this.model.address1 + ' ' + this.model.address2
          }
          this.bankModel.bank_name = this.bankDetails.bank_name;
          this.bankModel.bank_account_no = this.bankDetails.bank_account_no;
          this.bankModel.bank_ifsc_code = this.bankDetails.bank_ifsc_code;
          this.editModel.name_of_principle = res.data.name_of_principle;
          this.editModel.gst_no = res.data.gst_no;


          this.editModel.opening_date = this.baseService.getDateReverseFormat(res.data.opening_date);
          this.editModel.overview = res.data.overview;

        }
      }
    )
  }
  addMoreDocument() {
    this.router.navigate(["ei/add-more-document"])
  }
  viewImage(src) {
    this.images = []
    this.images.push(src);
  }
  download_file(fileURL) {
    window.open(fileURL, '_blank');
  }
  downloadImage(imageUrl) {
    this.baseService.downloadImage(imageUrl);
  }
  openChangeDetailsPopup(label, key, value) {
    this.model = {};
    this.model.key = key;
    if (key == 'full_address') {
      console.log(value);

      this.model.old_value = value.address1 + ' ' + value.address2;
      this.model.value = value.full_address;
      this.address_1 = value.address1
      this.address_2 = value.address2
    } else {
      this.model.old_value = value;
      this.model.value = value;
    }
    if (this.model.key == 'email' || this.model.key == 'phone') {

    } else {
      this.model.image = '';
    }

    this.title = label;


    $("#editModel").modal({
      keyboard: false
    });
  }

  openPersonalInfoModelPopup() {
    $("#personalInfoModel").modal({
      keyboard: false
    });
  }
  /**Edit Personal Details */
  submitPersonalDetails() {


    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[2].elements, true, []);
    console.log(this.errorDisplay);
    if (this.errorDisplay.valid) {
      return false;
    } else {
      try {
        this.loader.show();
        // this.editModel.opening_date= this.baseService.getDateReverseFormat(this.editModel.opening_date);
        this.baseService.action('ei/ei-request-for-remain-detail-change/', this.editModel).subscribe(res => {
          let response: any = {};
          response = res;
          if (response.status == true) {
            this.loader.hide();
            $("#personalInfoModel").modal('hide');
            // location.reload();
          } else {
            this.alert.error(response.error.message[0], 'Error');
          }
        }, (error => {
          this.loader.hide();
        }))
      } catch (e) {

      }
    }
  }

  /**Edit Data for personal information */
  editDetails() {
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    if (this.errorDisplay.valid) {
      return false;
    } else {
      try {
        this.loader.show();
        this.baseService.action('ei/ei-request-for-detail-change/', this.model).subscribe(res => {
          let response: any = {};
          response = res;
          if (response.status == true) {
            this.loader.hide();
            $("#editModel").modal('hide');
            if (this.model.key == 'email' || this.model.key == 'phone') {
              $("#OTPModel").modal({

                keyboard: false
              });
            } else {
              this.alert.success(response.message, 'Success');
            }
          } else {
            this.loader.hide();
            this.alert.error(response.error.message, 'Error');
          }
        }, (error => {
          this.loader.hide();
        }))
      } catch (e) {

      }
    }

  }
  /** 
   * Function Name : fileUploadDocument
  */
  fileUploadDocument(files) {
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    if (fileData.type !== 'image/jpeg' && fileData.type !== 'image/jpg' && fileData.type !== 'image/png' && fileData.type !== 'application/pdf') {
      this.loader.hide();
      this.alert.error("File format not supported", 'Error');
      return
    }
    const formData = new FormData();
    formData.append('file_name', fileData);
    try {
      this.loader.show();
      this.eiService.uploadFile(formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.model.image = res.filename;
            return res.filename;
          } else {
            this.loader.hide();
            var collection = this.eiService.getErrorResponse(this.loader, res.error);
            this.alert.error(collection, 'Error')
            return '';
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error')
          return '';
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  fileType(file: any) {
    return file.split('.').pop();
  }

  goToDashboard() {
    var flagRequired = true;
    this.errorOtpModelDisplay = '';
    this.error = [];
    if (!this.model.otp1) {
      flagRequired = false;
    } else if (!this.model.otp2) {
      flagRequired = false;
    } else if (!this.model.otp3) {
      flagRequired = false;
    }
    else if (!this.model.otp4) {
      flagRequired = false;
    }
    if (flagRequired == false) {
      this.error.push("Please enter OTP!");
    }
    if (this.error.length > 0) {
      this.errorOtpModelDisplay = this.error.join('\n');
      return;
    }
    try {
      let data: any = {};
      data.key = this.model.key;
      data.value = this.model.value;
      data.verify_otp_no = this.model.otp1 + this.model.otp2 + this.model.otp3 + this.model.otp4;

      this.baseService.action('ei/ei-request-verify-otp-detail-change/', data).subscribe(res => {
        let response: any = {}
        response = res;
        if (response.status == true) {

          $("#OTPModel").modal('hide');
          this.alert.success(data.key+' has been updated', 'Success');
          localStorage.clear();
          this.router.navigate(['ei/login']);
          //

        } else {
          this.errorOtpModelDisplay = response.error.message;
          this.alert.error(this.errorOtpModelDisplay, 'Error');
        }
      }, (error) => {
        console.log(error);

      });
    } catch (err) {
      console.log("vaeryfy Otp Exception", err);
    }

  }
  changeInput($ev) {
    console.log($ev);
    if ($ev.target.value.length == $ev.target.maxLength) {
      var $nextInput = $ev.target.nextSibling;
      $nextInput.focus();
    }

  }
  gotoEditPersonalInfo() {
    this.router.navigate(["ei/personal-information"]);
  }
  getEiProfileData() {
    try {
      this.loader.show();
      this.baseService.getData('ei/onboarding-preview/').subscribe(res => {
        let response: any = {};
        response = res;
        if (response.status == true) {
          this.userProfile = response.data[0];
          this.userData = this.userProfile.ei_detail[0];
          this.editModel.fb_url = this.userData.fb_url
          this.editModel.twitter_url = this.userData.twitter_url
          this.editModel.school_phone = this.userData.school_phone
          this.editModel.school_email = this.userData.school_email
          this.loader.hide();

        } else {
          this.loader.hide();
          this.displayError = this.eiService.getErrorResponse(this.loader, response.error);
          this.alert.error(this.displayError, "Error");
        }
      }, (error) => {
        this.loader.hide();
        this.alert.error("Something went wrong.", "Error");
      })
    } catch (e) {

    }
  }
  bankDetailsPopup() {
    this.model = {};
    $("#bankDetailModel").modal({
      keyboard: false
    });
  }
  handleCancelChequeFileInput(file) {
    let fileList: FileList = file;
    let fileData: File = fileList[0];
    this.uploadedCancelCheque = fileData;
  }
  submitBankDetail() {
    this.error = [];
    this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[1].elements, false, []);
    if (this.errorDisplay.valid) {
      return false;
    } try {
      this.loader.show();
      const formData = new FormData();
      formData.append('bank_name', this.bankModel.bank_name);
      formData.append('bank_account_no', this.bankModel.bank_account_no);
      formData.append('bank_ifsc_code', this.bankModel.bank_ifsc_code);
      formData.append('cancel_cheque', this.uploadedCancelCheque);
      var url = "";
      if (localStorage.getItem("is_ei_approved") == '0') {
        url = "ei/bankdetail-add/";
      } else {
        url = "ei/ei-request-for-bank-detail-change/";
      }

      this.baseService.action(url, formData).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loader.hide();
            this.alert.success(res.message, 'Success')
            location.reload()

          } else {
            this.loader.hide();
            this.alert.error(res.error.message[0], 'Error')
          }
        }, (error) => {
          this.loader.hide();
          this.alert.error(error.message, 'Error')
        });
    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }
  goToRequestStatusPage() {
    this.router.navigate(['ei/view-changes-request-status']);

  }
  /**
   * Function Name: submitDocumentFourStep
   * 
   */
  submitDocumentFourStep() {
    // this.error = [];
    // this.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, this.modelDocumentDetails);
    // if (this.errorDisplay.valid) {
    //   return false;
    // }
    try {
      if (localStorage.getItem("documentdata")) {
        this.loader.show();
        let documentdata: any = {};

        //documentdata.documentdata = this.modelDocumentDetails;
        documentdata = JSON.parse(localStorage.getItem("documentdata"));
        this.eiService.updateOnboardStepFourData(documentdata).subscribe(
          (res: any) => {
            if (res.status == true) {
              this.loader.hide();
              localStorage.removeItem("documentdata");

              //this.router.navigate(['ei/information-and-bank-details']);

            } else {
              this.loader.hide();
              var collection = this.eiService.getErrorResponse(this.loader, res.error);
              this.alert.error(collection, 'Error')
            }
          }, (error) => {
            this.loader.hide();
            this.alert.error(error.erorr, 'Error')
          });
      }

    } catch (err) {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

}
