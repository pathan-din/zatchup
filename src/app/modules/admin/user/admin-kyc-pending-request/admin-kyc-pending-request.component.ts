import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { KycPendingRequest } from '../modals/kyc.modal';

@Component({
  selector: 'app-admin-kyc-pending-request',
  templateUrl: './admin-kyc-pending-request.component.html',
  styleUrls: ['./admin-kyc-pending-request.component.css'],
  providers: [DatePipe]
})
export class AdminKycPendingRequestComponent implements OnInit {
  kycPendingRequest: KycPendingRequest;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
  ) {
    this.kycPendingRequest = new KycPendingRequest();
    this.kycPendingRequest.maxDate = new Date();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.setFilter(Object.keys(params)[0], Object.values(params)[0]);
    });
    this.getKycPendingRequest('');
    this.kycPendingRequest.pageCount = this.baseService.getCountsOfPage();
  }

  kycHistoryViewRoute(user) {
    this.router.navigate(['admin/kyc-history-or-view', 'pending', user.id])
  }

  getKycPendingRequest(page) {
    this.kycPendingRequest.params = {
      'start_date': this.kycPendingRequest.filterFromDate !== undefined ? this.datePipe.transform(this.kycPendingRequest.filterFromDate, 'yyyy-MM-dd') : '',
      'end_date': this.kycPendingRequest.filterToDate !== undefined ? this.datePipe.transform(this.kycPendingRequest.filterToDate, 'yyyy-MM-dd') : '',
      'kyc_type': this.kycPendingRequest.kycType !== undefined ? this.kycPendingRequest.kycType : '',
      'user_type': this.kycPendingRequest.userType !== undefined && this.kycPendingRequest.userType !== 'User' ? this.kycPendingRequest.userType : '',
      'user': this.kycPendingRequest.userType !== undefined && this.kycPendingRequest.userType == 'User' ? this.kycPendingRequest.userType : '',
      'request_type': this.kycPendingRequest.requestType !== undefined ? this.kycPendingRequest.requestType : '',
      'request_reason': this.kycPendingRequest.requestReason !== undefined ? this.kycPendingRequest.requestReason : '',
      'page_size': this.kycPendingRequest.page_size,
      'page': page
    }
    this.baseService.getData('admin/kyc/get_kyc_pending_summary/', this.kycPendingRequest.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.kycPendingRequest.config.currentPage
          this.kycPendingRequest.startIndex = res.page_size * (page - 1) + 1;
          this.kycPendingRequest.page_size = res.page_size
          this.kycPendingRequest.config.itemsPerPage = this.kycPendingRequest.page_size
          this.kycPendingRequest.config.currentPage = page
          this.kycPendingRequest.config.totalItems = res.count;
          if (res.count > 0) {
            this.kycPendingRequest.dataSource = res.results
          }
          else
            this.kycPendingRequest.dataSource = undefined

        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), (err: any) => {
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  exportToExcel() {
    delete this.kycPendingRequest.params.page_size;
    delete this.kycPendingRequest.params.page;
    this.kycPendingRequest.params['export_csv'] = true
    this.baseService.generateExcel('admin/kyc/export_kyc_pending/', 'kyc-pending', this.kycPendingRequest.params);
  }

  goBack(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
    this.router.navigate([returnUrl])
  }

  setFilter(type: any, value: any) {
    // debugger
    if (type == 'user-type' && value != 'list') {
      this.kycPendingRequest.userType = value
    } else if (type == 'kyc-type' && value != 'list') {
      this.kycPendingRequest.kycType = value
    } else if (type == 'request-type' && value != 'list') {
      if (value == 'retriggered')
        this.kycPendingRequest.requestType = "1"
      else
        this.kycPendingRequest.requestType = "0"
    } else if (type == 'request-reason' && value != 'list') {
      if (value == 'first-time')
        this.kycPendingRequest.requestReason = "0"
      else
        this.kycPendingRequest.requestReason = "1"
    } else {

    }
  }
}
