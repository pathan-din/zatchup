import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatabaseView } from '../modals/ei-pending-approval.modal';
import { Location } from '@angular/common'
import { ConfirmDialogService } from 'src/app/common/confirm-dialog/confirm-dialog.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';

@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.component.html',
  styleUrls: ['./database-view.component.css']
})
export class DatabaseViewComponent implements OnInit {
  @ViewChild('closeEnableDisableModal') closeEnableDisableModal: any;
  @ViewChild('closeEditAddress') closeEditAddress: any;
  databaseView: DatabaseView;
  eiData: any;
  user_type: any;
  dataUrl: any;
  params: any;
  eiDisable: boolean

  constructor(
    private router: Router,
    private baseService: BaseService,
    private activeRoute: ActivatedRoute,
    private alert: NotificationService,
    private location: Location,
    private loader: NgxSpinnerService,
    private confirmDialogService: ConfirmDialogService,
    private validationService: GenericFormValidationService

  ) {
    this.databaseView = new DatabaseView();
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.params = params;
      this.getDatabaseView();
    });
  }

  conversationComments() {
    let eiStatus: any;
    if (this.eiData.onboarded_status == 0)
      eiStatus = 'not-onboarded';
    else if (this.eiData.onboarded_status == 1)
      eiStatus = 'incomplete-onboarding';
    else
      eiStatus = 'onboarded';
    this.router.navigate(['admin/ei-onboarding-conversation-comments', this.eiData.id, eiStatus])
  }

  eiRequestHistory() {
    this.router.navigate(['admin/education-institute-history', this.eiData.id])
  }

  getDatabaseView() {
    this.loader.show()
    if (this.params.id)
      this.dataUrl = 'admin/ei-profile-added-by-admin/' + this.params.id
    else
      this.dataUrl = 'admin/ei-pending-profile/' + this.params.user_id
    this.baseService.getData(this.dataUrl).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.eiData = res.data
          this.eiDisable = !this.eiData.is_disabled
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide()
      }
    ),
      err => {
        this.alert.error(err, 'Error');
        this.loader.hide();
      }
  }

  goBack(): void {
    this.location.back();
  }

  getEIHistory() {

  }

  deleteEI(): any {
    this.confirmDialogService.confirmThis('Are you sure to delete ?', () => {
      this.loader.show()
      let data = {
        "ei_id": !this.eiData.user_id ? this.eiData.id : this.eiData.ei_id
      }
      this.baseService.action('admin/ei/delete_incomplete_ei/', data).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.alert.success(res.message, "Success")
            this.router.navigate(['admin/ei-database-list'], { queryParams: { "returnUrl": 'admin/school-management' } })
          } else {
            this.alert.error(res.error.message, 'Error')
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
  getEI_ID(id: any) {
    this.databaseView.ei_id = id
  }

  setEnableDisableSchoolData(isDisabled: any) {
    this.databaseView.isDisabled = !isDisabled.checked
    this.databaseView.enableDisableModalTitle = "Enable School";
    if (!this.eiData.is_disabled) {
      this.databaseView.enableDisableModalTitle = "Disable School"
    }
  }
  enableDiableSchool(): any {
    this.databaseView.errorDisplay = {};
    this.databaseView.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false);
    if (this.databaseView.errorDisplay.valid) {
      return false
    }
    this.loader.show()
    let data = {
      "ei_id": !this.eiData.user_id ? this.eiData.id : this.eiData.ei_id,
      "is_disabled": this.databaseView.isDisabled,
      "reason": this.databaseView.enableDisableReason
    }
    this.baseService.action('admin/ei/disable_ei/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.alert.success(res.message, "Success");
          this.closeEnableDisableModal.nativeElement.click()
          this.getDatabaseView();
        } else {
          this.eiDisable = !this.eiData.is_disabled
          this.alert.error(res.error.message, 'Error')
        }
        this.loader.hide();
      }
    ), err => {
      this.alert.error(err.error, 'Error')
      this.loader.hide();
    }
  }

  closeModel(){
    this.eiDisable = !this.eiData.is_disabled;
    this.databaseView.isDisabled = undefined
  }

  isValid() {
    if (Object.keys(this.databaseView.errorDisplay).length !== 0) {
      this.databaseView.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, true, []);
    }
  }

  setAddressData(){
    this.databaseView.addressLineOne = this.eiData.address1
    this.databaseView.addressLineTwo = this.eiData.address2
  }

  editAddress() {
    this.databaseView.errorDisplay = {};
    this.databaseView.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[1].elements, false, []);
    if (this.databaseView.errorDisplay.valid) {
      return false;
    }

    this.loader.show()
    let data = {
      'ei_id': this.eiData.id,
      'address1': this.databaseView.addressLineOne,
      'address2': this.databaseView.addressLineTwo
    }
    this.baseService.action('admin/school/update_address/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.closeEditAddress.nativeElement.click();
          this.alert.success(res.message, 'Success')
          this.getDatabaseView();
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
}
