import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PendingApprovalProfile } from '../modals/ei-pending-approval.modal';
import { Location } from '@angular/common'

@Component({
  selector: 'app-admin-ei-management-incomplete-onboarding-view',
  templateUrl: './admin-ei-management-incomplete-onboarding-view.component.html',
  styleUrls: ['./admin-ei-management-incomplete-onboarding-view.component.css']
})
export class AdminEiManagementIncompleteOnboardingViewComponent implements OnInit {
  @ViewChild('approveClose') approveClose: any;
  @ViewChild('closeExistingZatchupIDModel') closeExistingZatchupIDModel: any;
  @ViewChild('closeRejectEIModel') closeRejectEIModel: any;
  @ViewChild('closeEiEditModel') closeEiEditModel: any;
  @ViewChild('closeApproveWithNewZatchupIDModel') closeApproveWithNewZatchupIDModel: any;
  @ViewChild('closeNewZatchupIDModel') closeNewZatchupIDModel: any
  @ViewChild('closeGenerateZatchupIDModel') closeGenerateZatchupIDModel: any;
  @ViewChild('closeEditAddress') closeEditAddress: any
  eiId: any
  eiData: any = {};
  eiExData: any = {};
  pendingApprovalProfile: PendingApprovalProfile
  // user_type: any;

  constructor(
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private validationService: GenericFormValidationService

  ) {
    this.pendingApprovalProfile = new PendingApprovalProfile()
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.eiId = params.id;
      this.pendingApprovalProfile.stage = params.stage_pending
      this.getProfileData();
      // this.params = params;
      // this.getDatabaseView();
    });
    // if (this.activeRoute.snapshot.params.id) {
    //   this.eiId = this.activeRoute.snapshot.params.id
    //   this.getProfileData();
    // }
    // if (localStorage.getItem('user_type'))
    //   this.user_type = localStorage.getItem('user_type')
  }

  getProfileData() {
    this.loader.show()
    let url = 'admin/ei-pending-profile/' + this.eiId
    this.baseService.getData(url).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.eiData = res.data;
          this.eiExData = res.data.existing_data;
          if (Object.keys(this.eiExData).length == 0) {
            this.eiExData = undefined;
          }
        } else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  closeApproveModal() {
    this.pendingApprovalProfile.zatchupId = this.eiData.zatchupId;
    this.pendingApprovalProfile.requiredMOU = true;
    this.pendingApprovalProfile.employeeId = undefined;
    this.approveClose.nativeElement.click()
  }

  closeNewEIWithZatchupID() {
    this.pendingApprovalProfile.zatchupId = undefined;
    this.pendingApprovalProfile.employeeId = undefined;
    this.pendingApprovalProfile.requiredMOU = true
    this.closeApproveWithNewZatchupIDModel.nativeElement.click();
  }

  fileUploadDocument(files) {
    this.loader.show()
    let fileList: FileList = files;
    let fileData: File = fileList[0];
    const formData = new FormData();
    formData.append('file_name', fileData);
    this.baseService.action('ei/uploaddocsfile/', formData).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, 'Success')
          this.pendingApprovalProfile.existingZatchIDMOUDoc = res.filename
          this.pendingApprovalProfile.requiredMOU = true
        } else {
          this.alert.error(res.message, 'Error')
        }

        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error')
      this.loader.hide()
    }
  }

  approveExistingEI() {
    this.pendingApprovalProfile.errorDisplay = {};
    this.pendingApprovalProfile.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.pendingApprovalProfile.errorDisplay.valid) {
      // if (!this.pendingApprovalProfile.existingZatchIDMOUDoc)
      //   this.pendingApprovalProfile.requiredMOU = false

      return false;
    } else if (!this.pendingApprovalProfile.existingZatchIDMOUDoc && !this.pendingApprovalProfile.employeeId) {
      this.pendingApprovalProfile.requiredMOU = false;
      this.pendingApprovalProfile.poc_required = false;
      return false;
    }
    else if (!this.pendingApprovalProfile.existingZatchIDMOUDoc) {
      this.pendingApprovalProfile.requiredMOU = false;
      return false
    }
    else if (!this.pendingApprovalProfile.employeeId) {
      this.pendingApprovalProfile.poc_required = false;
      return false
    }

    this.loader.show()
    let data = {
      'user_id': this.eiData.id,
      'mou_document': this.pendingApprovalProfile.existingZatchIDMOUDoc,
      'zatchUpID': this.pendingApprovalProfile.zatchupId,
      'employeeID': this.pendingApprovalProfile.employeeId
    }
    this.baseService.action('admin/ei-approve/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.closeExistingZatchupIDModel.nativeElement.click();
          this.alert.success(res.message, 'Success')
          this.router.navigate(['admin/ei-management-pending-for-approval'])

        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }, err => {
        this.alert.error(err, 'Error')
        this.loader.hide()
      }
    )
  }

  rejectEI() {
    this.pendingApprovalProfile.errorDisplay = {};
    this.pendingApprovalProfile.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[2].elements, false, []);
    if (this.pendingApprovalProfile.errorDisplay.valid) {
      return false;
    }


    this.loader.show()
    let data = {
      "user_id": this.eiData.id,
      "reason_of_reject": this.pendingApprovalProfile.rejectionReason,
      "remarks": this.pendingApprovalProfile.rejectionRemark
    }

    this.baseService.action('admin/ei-reject/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.closeRejectEIModel.nativeElement.click()
          this.alert.success(res.message, 'Success');
          this.router.navigate(['admin/ei-management-pending-for-approval'])
        } else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error')
      this.loader.hide()
    }
  }


  editEI() {
    this.pendingApprovalProfile.errorDisplay = {};
    this.pendingApprovalProfile.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[1].elements, false, []);
    if (this.pendingApprovalProfile.errorDisplay.valid) {
      return false;
    }


    this.loader.show()
    let data = {
      "user_id": this.eiData.id,
      "reason_of_edit": this.pendingApprovalProfile.editReason,
      "description": this.pendingApprovalProfile.editDescription
    }

    this.baseService.action('admin/ei-edit/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.closeEiEditModel.nativeElement.click()
          this.alert.success(res.message, 'Success');
          this.router.navigate(['admin/ei-management-pending-for-approval'])
        } else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }
    ), err => {
      this.alert.error(err, 'Error')
      this.loader.hide()
    }
  }

  approveWithEIZatchupId() {
    this.pendingApprovalProfile.errorDisplay = {};
    this.pendingApprovalProfile.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[3].elements, false, []);
    if (this.pendingApprovalProfile.errorDisplay.valid) {
      //   if (!this.pendingApprovalProfile.existingZatchIDMOUDoc)
      //     this.pendingApprovalProfile.requiredMOU = false
      //   return false;
      // } else if (!this.pendingApprovalProfile.existingZatchIDMOUDoc) {
      //   this.pendingApprovalProfile.requiredMOU = false
      this.checkValidation();
      return false;
    } else if (!this.checkValidation()) {
      return false;
    }

    this.loader.show()
    let data = {
      'user_id': this.eiData.id,
      'mou_document': this.pendingApprovalProfile.existingZatchIDMOUDoc,
      'zatchUpID': this.pendingApprovalProfile.zatchupId,
      'employeeID': this.pendingApprovalProfile.employeeId
    }
    this.baseService.action('admin/ei-approve_new_zatchupid/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.closeNewZatchupIDModel.nativeElement.click();
          this.alert.success(res.message, 'Success')
          this.router.navigate(['admin/ei-management-pending-for-approval'])

        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }, err => {
        this.alert.error(err, 'Error')
        this.loader.hide()
      }
    )
  }

  generateEIZatchupId() {
    this.pendingApprovalProfile.errorDisplay = {};
    this.pendingApprovalProfile.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[4].elements, false, []);
    if (this.pendingApprovalProfile.errorDisplay.valid) {
      // if (!this.pendingApprovalProfile.existingZatchIDMOUDoc && !this.pendingApprovalProfile.employeeId) {
      //   this.pendingApprovalProfile.requiredMOU = false;
      //   this.pendingApprovalProfile.poc_required = false
      //   return false;
      // }
      // else if (!this.pendingApprovalProfile.existingZatchIDMOUDoc) {
      //   this.pendingApprovalProfile.requiredMOU = false
      //   return false;
      // }
      // else if (!this.pendingApprovalProfile.employeeId) {
      //   this.pendingApprovalProfile.poc_required = false
      //   return false;
      // }
      this.checkValidation()
      // if (!this.checkValidation())
      return false
    } else if (!this.checkValidation())
      // this.pendingApprovalProfile.requiredMOU = false
      return false;
    // } else if (!this.pendingApprovalProfile.employeeId) {
    //   return false;
    // }

    this.loader.show()
    let data = {
      'user_id': this.eiData.id,
      'mou_document': this.pendingApprovalProfile.existingZatchIDMOUDoc,
      'employeeID': this.pendingApprovalProfile.employeeId
    }
    this.baseService.action('admin/ei-approve_autogenerated_zatchupid/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.closeGenerateZatchupIDModel.nativeElement.click();
          this.alert.success(res.message, 'Success')
          this.router.navigate(['admin/ei-management-pending-for-approval'])

        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }, err => {
        this.alert.error(err, 'Error')
        this.loader.hide()
      }
    )
  }

  // addComment() {
  //   this.pendingApprovalProfile.errorDisplay = {};
  //   this.pendingApprovalProfile.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[5].elements, false, []);
  //   if (this.pendingApprovalProfile.errorDisplay.valid) {
  //     return false;
  //   }

  //   this.loader.show()
  //   let data = {
  //     'ei_id': this.eiData.ei_id,
  //     'address1': this.pendingApprovalProfile.addressLineOne,
  //     'address2': this.pendingApprovalProfile.addressLineTwo
  //   }
  //   this.baseService.action('admin/school/update_address/', data).subscribe(
  //     (res: any) => {
  //       if (res.status == true) {
  //         this.closeEditAddress.nativeElement.click();
  //         this.alert.success(res.message, 'Success')
  //         this.getProfileData();
  //       }
  //       else {
  //         this.alert.error(res.error.message[0], 'Error')
  //       }
  //       this.loader.hide()
  //     }, err => {
  //       this.alert.error(err, 'Error')
  //       this.loader.hide()
  //     }
  //   )
  // }
  isValid(event) {
    if (Object.keys(this.pendingApprovalProfile.errorDisplay).length !== 0) {
      this.pendingApprovalProfile.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }
  goBack(): void {
    this.location.back();
  }


  pocDetails(data) {
    this.pendingApprovalProfile.employeeId = data.employee_id
    this.pendingApprovalProfile.poc_required = true;
  }

  checkValidation() {
    // debugger
    if (!this.pendingApprovalProfile.existingZatchIDMOUDoc && !this.pendingApprovalProfile.employeeId) {
      this.pendingApprovalProfile.requiredMOU = false;
      this.pendingApprovalProfile.poc_required = false
      return false;
    }
    else if (!this.pendingApprovalProfile.existingZatchIDMOUDoc) {
      this.pendingApprovalProfile.requiredMOU = false
      return false;
    }
    else if (!this.pendingApprovalProfile.employeeId) {
      this.pendingApprovalProfile.poc_required = false
      return false;
    }

    return true;
  }

  // setAddressData(){
  //   this.pendingApprovalProfile.addressLineOne = this.eiData.address1
  //   this.pendingApprovalProfile.addressLineTwo = this.eiData.address2
  // }

}
