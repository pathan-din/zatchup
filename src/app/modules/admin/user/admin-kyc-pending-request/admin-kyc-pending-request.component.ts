import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { KycPendingRequest } from '../modals/kyc.modal';


export interface TotalAlumniListElement {

  'SNo': number;
  EIZatchUpIDOfUser: string;
  NameOfUser: string;
  UserType: string;
  ProofName: string;
  RequestReason: string;
  RequestType: string;
  Action: string;

}

@Component({
  selector: 'app-admin-kyc-pending-request',
  templateUrl: './admin-kyc-pending-request.component.html',
  styleUrls: ['./admin-kyc-pending-request.component.css'],
  providers: [DatePipe]
})
export class AdminKycPendingRequestComponent implements OnInit {
  filterFromDate: any;
  filterToDate: any;
  maxDate: any;
  params: any = {};
  kycType: any = '';
  userType: any = '';
  requestType: any = '';
  requestReason: any = '';
  kycPendingRequest: KycPendingRequest;
  pageSize: any
  displayedColumns: string[] = ['SNo', 'EIZatchUpIDOfUser', 'NameOfUser', 'UserType', 'ProofName',
    'RequestReason', 'RequestType', 'Action'];
  dataSource: any;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private location: Location
  ) {
    this.kycPendingRequest = new KycPendingRequest();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getKycPendingRequest('')
  }

  kycHistoryViewRoute(user) {
    this.router.navigate(['admin/kyc-history-or-view', 'pending', user.id])
  }

  getKycPendingRequest(page) {
    this.kycPendingRequest.params = {
      'date_from': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      'date_to': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
      'kyc_type': this.kycType !== undefined ? this.kycType : '',
      'user_type': this.userType !== undefined ? this.userType : '',
      'request_type': this.requestType !== undefined ? this.requestType : '',
      'request_reason': this.requestReason !== undefined ? this.requestReason : '',
      'page_size': this.kycPendingRequest.pageSize,
      'page': page ? page : 1
    }
    this.baseService.getData('admin/kyc/get_kyc_pending_summary/', this.kycPendingRequest.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.kycPendingRequest.config.currentPage
          this.kycPendingRequest.startIndex = res.page_size * (page - 1) + 1;
          this.kycPendingRequest.config.itemsPerPage = res.page_size
          this.kycPendingRequest.config.currentPage = page
          this.kycPendingRequest.config.totalItems = res.count;
          this.kycPendingRequest.dataSource = res.results
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

  goBack(): void{
    this.location.back();
  }
}
