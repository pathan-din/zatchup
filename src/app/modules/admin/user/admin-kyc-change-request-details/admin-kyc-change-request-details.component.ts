import { Location } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { GenericFormValidationService } from 'src/app/services/common/generic-form-validation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { KycChangeRequestDetails, Pagination } from '../modals/kyc.modal';

@Component({
  selector: 'app-admin-kyc-change-request-details',
  templateUrl: './admin-kyc-change-request-details.component.html',
  styleUrls: ['./admin-kyc-change-request-details.component.css']
})
export class AdminKycChangeRequestDetailsComponent implements OnInit {
  @ViewChild('approveCloseButton') approveCloseButton: any
  images: any = [];
  imageIndexOne = 0;
  kycChangeRequestDetails: KycChangeRequestDetails;
  pagination: Pagination

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private notificationService: NotificationService,
    private validationService: GenericFormValidationService,
    private location: Location
  ) {
    this.kycChangeRequestDetails = new KycChangeRequestDetails();
    this.pagination = new Pagination();
  }

  ngOnInit(): void {
    this.kycChangeRequestDetails.activeParams = this.activeRoute.snapshot.params;
    this.getKycChangeRequestDetailsById()
  }

  getKycChangeRequestDetailsById() {
    this.loader.show()
    this.baseService.getData('admin/kyc/request_for_change_details/', { 'id': this.kycChangeRequestDetails.activeParams.id }).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.kycChangeRequestDetails.kycDetails = res.results[0];
          this.getEIHistory();
        }
        else {
          this.notificationService.error(res.error.message, 'Error');
          this.kycChangeRequestDetails.kycDetails = undefined
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

  radioChange(event) {
    this.kycChangeRequestDetails.approveOrReject = event.value
  }

  ApproveRejectRequest() {
    this.kycChangeRequestDetails.errorDisplay = {};
    this.kycChangeRequestDetails.errorDisplay = this.validationService.checkValidationFormAllControls(document.forms[0].elements, false, []);
    if (this.kycChangeRequestDetails.errorDisplay.valid) {
      return false;
    }

    let data = {
      "id": this.kycChangeRequestDetails.kycDetails.id,
      "request_type": this.kycChangeRequestDetails.approveOrReject,
      // "kyc_id": this.kycChangeRequestDetails.kycDetails.kyc_id_no,
      // "rejected_reason": this.kycChangeRequestDetails.rejectionReason ? this.kycChangeRequestDetails.rejectionReason : undefined,
      // "rejected_remarks": this.kycChangeRequestDetails.rejectionRemark
    }
    this.loader.show()
    this.baseService.action('admin/kyc/approve_reject_user_change_details/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.approveCloseButton.nativeElement.click();
          this.notificationService.success(res.message, 'Success')
          // this.router.navigate(['admin/kyc-change-requests'])
          this.router.navigate(['admin/kyc-change-requests'], { queryParams: { returnUrl: "admin/kyc-approval-management"}})
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

  getEIHistory() {
    this.loader.show();

    let listParams = {
      "eid": this.kycChangeRequestDetails.kycDetails.user_id,
      "module_name": "KYCCHANGEDETAIL"
    }
    this.baseService.getData('admin/common_history/', listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (res.count > 0) {
            this.pagination.dataSource = res.results;
          }
          else
            this.pagination.dataSource = undefined
        }
        else
          this.notificationService.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), (err: any) => {
      this.notificationService.error(err, 'Error')
      this.loader.hide();
    }
  }

  goBack() {
    this.location.back()
  }
  
  handleEvent(event: any) {

  }
}
