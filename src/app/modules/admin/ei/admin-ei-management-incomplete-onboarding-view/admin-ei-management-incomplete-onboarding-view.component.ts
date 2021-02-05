import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PendingApprovalProfile } from '../modals/ei-pending-approval.modal';
import { Location } from '@angular/common'
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';

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
  @ViewChild('closeEditAddress') closeEditAddress: any;
  @ViewChild('docInput') docInput: ElementRef;
  @ViewChild('docInputGenerateZatchupId') docInputGenerateZatchupId: ElementRef;
  @ViewChild('docInputForNewZatchupId') docInputForNewZatchupId: ElementRef;
  eiId: any
  eiData: any = {};
  eiExData: any = {};
  pendingApprovalProfile: PendingApprovalProfile

  constructor(
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private communicationService: CommunicationService,
    private confirmDialogService: ConfirmDialogService,
    private validationService: GenericFormValidationService

  ) {
    this.pendingApprovalProfile = new PendingApprovalProfile()
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.eiId = params.id;
      this.pendingApprovalProfile.stage = params.stage_pending
      this.getProfileData();
    });
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

  validateExistingEI() {
    this.pendingApprovalProfile.errorDisplay = {};
    this.pendingApprovalProfile.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.pendingApprovalProfile.errorDisplay.valid) {
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
    this.baseService.action('admin/validate_school_approve/', data).subscribe(
      (res: any) => {
        if (res.status == true && res.is_exists == true) {
          this.closeExistingZatchupIDModel.nativeElement.click();
          this.approveSchoolConfirmation('admin/ei-approve/', data, res.error.message[0])
        }
        else if (res.status == false && res.is_exists == true) {
          this.docInput.nativeElement.value = "";
          this.pendingApprovalProfile.existingZatchIDMOUDoc = "";
          this.resetInputSearchValue()
          this.alert.error(res.error.message[0], 'Error');
          this.closeExistingZatchupIDModel.nativeElement.click();
        }
        else if (res.status == true && res.is_exists == false) {
          this.closeExistingZatchupIDModel.nativeElement.click();
          this.approveSchool('admin/ei-approve/', data)
        }
        else {
          this.alert.error(res.error.message[0], 'Error');
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
    this.baseService.action('admin/validate_school_approve/', data).subscribe(
      (res: any) => {
        if (res.status == true && res.is_exists == true) {
          this.closeNewZatchupIDModel.nativeElement.click();
          this.approveSchoolConfirmation('admin/ei-approve_new_zatchupid/', data, res.error.message[0])
        }
        else if (res.status == false && res.is_exists == true) {
          this.alert.error(res.error.message[0], 'Error');
          this.closeNewZatchupIDModel.nativeElement.click();
          this.pendingApprovalProfile.existingZatchIDMOUDoc = "";
          this.docInputForNewZatchupId.nativeElement.value = ''
          this.resetInputSearchValue();
        }
        else if (res.status == true && res.is_exists == false) {
          this.closeNewZatchupIDModel.nativeElement.click();
          this.approveSchool('admin/ei-approve_new_zatchupid/', data)
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
      this.checkValidation()
      return false
    } else if (!this.checkValidation())
      return false;
    this.loader.show()
    let data = {
      'user_id': this.eiData.id,
      'mou_document': this.pendingApprovalProfile.existingZatchIDMOUDoc,
      'employeeID': this.pendingApprovalProfile.employeeId,
      'zatchupId': this.pendingApprovalProfile.zatchupId
    }
    this.baseService.action('admin/validate_school_approve/', data).subscribe(
      (res: any) => {
        if (res.status == true && res.is_exists == true) {
          this.closeGenerateZatchupIDModel.nativeElement.click();
          this.approveSchoolConfirmation('admin/ei-approve_autogenerated_zatchupid/', data, res.error.message[0])
        }
        else if (res.status == false && res.is_exists == true) {
          this.alert.error(res.error.message[0], 'Error');
          this.pendingApprovalProfile.existingZatchIDMOUDoc = ''
          this.closeGenerateZatchupIDModel.nativeElement.click();
          this.docInputGenerateZatchupId.nativeElement.value = '';
          this.resetInputSearchValue();
        }
        else if (res.status == true && res.is_exists == false) {
          this.closeGenerateZatchupIDModel.nativeElement.click();
          this.approveSchool('admin/ei-approve_autogenerated_zatchupid/', data)
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
  schoolZatchupId(data) {
    // debugger
    this.pendingApprovalProfile.name_of_school = data.name_of_school
    // this.pendingApprovalProfile.school_code_required = true;
  }

  checkValidation() {
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

  confirmForApproveEI(data: any, message: any): any {
    this.confirmDialogService.confirmThis('School is already onboarded with same name and pin code. Are you sure you want approve this school', () => {
      this.loader.show()
      this.baseService.action('admin/approve-ei/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.closeExistingZatchupIDModel.nativeElement.click();
            this.alert.success(res.message, "Success")
            this.router.navigate(['admin/ei-management-pending-for-approval'])
          } else {
            this.alert.error(res.error.message[0], 'Error')
          }
          this.loader.hide();
        }
      ), err => {
        this.alert.error(err.error, 'Error')
        this.loader.hide();
      }
    }, () => {
    });
  }

  approveSchoolConfirmation(apiUrl: any, data: any, message: any) {
    this.confirmDialogService.confirmThis(message, () => {
      this.approveSchool(apiUrl, data)
    }, () => {
    });
  }

  approveSchool(apiUrl: any, data: any) {
    this.loader.show()
    this.baseService.action(apiUrl, data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, "Success")
          this.router.navigate(['admin/ei-management-pending-for-approval'])
        } else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide();
      }
    ), err => {
      this.alert.error(err.error, 'Error')
      this.loader.hide();
    }
  }

  resetDocInput() {
    this.docInput.nativeElement.value = "";
  }

  resetInputSearchValue() {
    this.communicationService.clearFieldValue();
  }
}
