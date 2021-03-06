import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KYCHistory } from '../modals/kyc.modal'
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-kyc-history-or-view',
  templateUrl: './admin-kyc-history-or-view.component.html',
  styleUrls: ['./admin-kyc-history-or-view.component.css']
})
export class AdminKycHistoryOrViewComponent implements OnInit {
  // @ViewChild('rejectedCloseButton') rejectedCloseButton: any;
  @ViewChild('approveCloseButton') approveCloseButton: any;
  images: any = [];
  kycHistoryModal = new KYCHistory()
  recordCount: any;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private notificationService: NotificationService,
    private validationService: GenericFormValidationService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.kycHistoryModal.activeParams = this.activeRoute.snapshot.params
    this.getKycDetailsById();
  }

  getKycDetailsById() {
    this.loader.show()
    this.baseService.getData('admin/kyc/pending_kyc_details/' + this.kycHistoryModal.activeParams.id).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.kycHistoryModal.kycDetails = res.data;
          this.getKycHistory();
        }
        else {
          this.notificationService.error(res.error.message, 'Error');
          this.kycHistoryModal.kycDetails = undefined
        }
        this.loader.hide()
      }
    ), err => {
      this.notificationService.error(err, "Error")
      this.loader.hide()
    }
  }

  getKycHistory(page?: any) {
    this.loader.show()
    this.kycHistoryModal.kycDetailsParams = {
      "user_id": this.kycHistoryModal.kycDetails.user_id,
      "module_name": "KYC",
      "page_size": this.kycHistoryModal.page_size,
      "page": page
    }
    this.baseService.getData('admin/common_history/', this.kycHistoryModal.kycDetailsParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.kycHistoryModal.config.currentPage
          this.kycHistoryModal.startIndex = res.page_size * (page - 1) + 1;
          this.kycHistoryModal.config.itemsPerPage = res.page_size
          this.kycHistoryModal.config.currentPage = page;
          this.kycHistoryModal.page_size = res.page_size;
          this.kycHistoryModal.config.totalItems = res.count;
          this.recordCount = this.baseService.getCountsOfPage()
          if (res.count > 0) {
            this.kycHistoryModal.kycHistory = res.results;
          }
          else
            this.kycHistoryModal.kycHistory = undefined
        }
        this.loader.hide()
      }
    ), err => {
      this.notificationService.error(err, "Error")
      this.loader.hide()
    }
  }

  ApproveRejectKyc() {
    this.kycHistoryModal.errorDisplay = {};
    this.kycHistoryModal.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.kycHistoryModal.errorDisplay.valid) {
      return false;
    }

    let data = {
      "id": this.kycHistoryModal.kycDetails.id,
      "request_type": this.kycHistoryModal.approveOrReject,
      "kyc_id": this.kycHistoryModal.kycDetails.kyc_id_no,
      "rejected_reason": this.kycHistoryModal.rejectionReason ? this.kycHistoryModal.rejectionReason : undefined,
      "rejected_remarks": this.kycHistoryModal.rejectionRemark
    }
    this.loader.show()
    this.baseService.action('admin/kyc/approve_reject_kyc/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.approveCloseButton.nativeElement.click();
          this.notificationService.success(res.message, 'Success')
          this.router.navigate(['admin/kyc-pending-request'], { queryParams: { returnUrl: "admin/kyc-approval-management" } })
        } else {
          this.notificationService.error(res.error.message, 'Error')
        }
        this.loader.hide()
      }
    ), err => {
      this.notificationService.error(err, "Error")
      this.loader.hide()
    }

  }

  viewImage(src) {
    this.images = []
    this.images.push(src);
  }
  sortKycHistory() {
    this.kycHistoryModal.kycDetailsParams['order_by'] = this.kycHistoryModal.sortBy;
    this.getKycHistory();
  }

  radioChange(event) {
    this.kycHistoryModal.approveOrReject = event.value
  }

  goBack(): void {
    this.location.back();
  }
}
