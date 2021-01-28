import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/services/base/base.service';
import * as fileSaver from 'file-saver';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompleteKycList } from '../modals/kyc.modal';



export interface TotalAlumniListElement {
  'SNo': number;
  EIZatchUpIDOfUser: string;
  NameOfUser: string;
  UserType: string;
  ProofName: string;
  RequestReason: string;
  RequestType: string;
  Status: string;
  RejectionRemarks: string;
  Action: string;
}



@Component({
  selector: 'app-admin-kyc-complete',
  templateUrl: './admin-kyc-complete.component.html',
  styleUrls: ['./admin-kyc-complete.component.css'],
  providers: [DatePipe]
})
export class AdminKycCompleteComponent implements OnInit {
  filterFromDate: any;
  filterToDate: any;
  userType: any = '';
  maxDate: any = '';
  kycType: any = '';
  requestType: any = '';
  requestReason: any = '';
  status: any = '1';
  params: any = {};
  completeKycList: CompleteKycList;
  pageSize: any

  constructor(
    private router: Router,
    private baseService: BaseService,
    private datePipe: DatePipe,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.maxDate = new Date();
    this.completeKycList = new CompleteKycList();
  }

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params=>{
      this.completeKycList.status = params['status'];
    });
    this.getCompleteKycList('');
    this.completeKycList.pageCount = this.baseService.getCountsOfPage();
  }

  kycHistoryViewRoute(user) {
    this.router.navigate(['admin/kyc-history-or-view', 'completed', user.id])
  }

  getCompleteKycList(page?: any) {
    this.completeKycList.params = {
      'start_date': this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      'end_date': this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
      'kyc_type': this.kycType !== undefined ? this.kycType : '',
      'user_type': this.userType !== undefined && this.userType !== 'User' ? this.userType : '',
      'user': this.userType !== undefined && this.userType == 'User' ? this.userType : '',
      'status': this.completeKycList.status !== undefined ? this.completeKycList.status : '',
      'request_type': this.requestType !== undefined ? this.requestType : '',
      'request_reason': this.requestReason !== undefined ? this.requestReason : '',
      'page_size': this.completeKycList.page_size,
      'page': page
    }
    this.baseService.getData('admin/kyc/get_kyc_complete_summary/', this.completeKycList.params).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
          page = this.completeKycList.config.currentPage
          this.completeKycList.startIndex = res.page_size * (page - 1) + 1;
          this.completeKycList.page_size = res.page_size
          this.completeKycList.config.itemsPerPage = this.completeKycList.page_size
          this.completeKycList.config.currentPage = page
          this.completeKycList.config.totalItems = res.count;
          if(res.count > 0){
            this.completeKycList.dataSource = res.results
          }
          else
          this.completeKycList.dataSource = undefined 
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

  download() {
    delete this.completeKycList.params.page_size;
    delete this.completeKycList.params.page;
    this.completeKycList.params['export_csv'] = true
    this.baseService.generateExcel('admin/kyc/export_kyc_complete/', 'kyc-complete', this.params)
  }

  goBack(): void {
    this.location.back();
  }

  setFilter(type: any, value: any) {
    // debugger
    if (type == 'status' && value != 'list') {
      this.completeKycList.status = value
    }
  }
}
