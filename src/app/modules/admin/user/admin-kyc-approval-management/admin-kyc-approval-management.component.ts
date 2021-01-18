import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-admin-kyc-approval-management',
  templateUrl: './admin-kyc-approval-management.component.html',
  styleUrls: ['./admin-kyc-approval-management.component.css']
})
export class AdminKycApprovalManagementComponent implements OnInit {
  kycApprovalData: any;
  maxDate: Date;
  kycSignupParams: any = {};
  kycRetriggerParams: any = {};
  kycApprovalFromDate: any;
  kycApprovalToDate: any;
  retriggerKycFromDate: any;
  retriggerKycToDate: any;
  kycRequestsRaised : any;
  kycRequestsCompleted: any;
  kycRetriggered: any;
  type: any
  // kycRequestsCompletedData: any
  kycRequestApproved: any;
  kycRequestRejected: any;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.getKycApprovalData()
  }

  completedKyc() {
    this.router.navigate(['admin/completed-kyc'])
  }

  kycPendingReqRoute_1(type: any) {
    this.router.navigate(['admin/kyc-pending-request'], { queryParams: {"request-reason": type}})
  }

  kycPendingReqRoute_2(type: any) {
    this.router.navigate(['admin/kyc-pending-request'],  { queryParams: {"request-type": type}})
  }

  kycPendingReqRoute_3(type: any) {
    this.router.navigate(['admin/kyc-pending-request'],  { queryParams: {"user-type": type}})
  }

  kycChangeRequests() {
    this.router.navigate(['admin/kyc-change-requests'])
  }

  kycPendingReqRoute_5(type: any) {
    this.router.navigate(['admin/kyc-pending-request'],  { queryParams: {"kyc-type": type}})
  }

  goToKycApproved(){
    this.router.navigate(['admin/completed-kyc'], {queryParams:{status: 1}});
  }

  goToKycRejected(){
    this.router.navigate(['admin/completed-kyc'], {queryParams: {status: 2}});
  }

  getKycApprovalData() {
    this.baseService.getData('admin/kyc/get_kyc_dashboard_summary/').subscribe(
      (res: any) => {
        if (res.status == true) {
          this.kycApprovalData = res.data;
          this.kycRequestsRaised = this.kycApprovalData.kyc_requests_raised;
          this.kycRequestsCompleted = parseInt(this.kycApprovalData.kyc_request_completed.approved) + parseInt(this.kycApprovalData.kyc_request_completed.rejected)
          this.kycRetriggered = this.kycApprovalData.kyc_retriggered;
          // this.kycRequestsCompletedData = this.kycApprovalData.kyc_request_completed;
          this.kycRequestApproved = this.kycApprovalData.kyc_request_completed.approved;
          this.kycRequestRejected = this.kycApprovalData.kyc_request_completed.rejected
        }
        else
        this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), err => {
      console.log('err =>', err)
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  getFilteredKYCApproveData() {
    // console.log('from date ::',this.kycApprovalFromDate);
    this.kycSignupParams = {
      "from_date": this.kycApprovalFromDate !== undefined ? this.datePipe.transform(this.kycApprovalFromDate, 'yyyy-MM-dd') : '',
      "to_date": this.kycApprovalToDate !== undefined ? this.datePipe.transform(this.kycApprovalToDate, 'yyyy-MM-dd') : ''
    }

    this.baseService.action('admin/kyc/get_kyc_dashboard_summary/', this.kycSignupParams).subscribe(
      (res: any) => {
        if(res.status == true){
          this.kycRequestsRaised = res.data.kyc_requests_raised;
          this.kycRequestsCompleted = parseInt(res.data.approved) + parseInt(res.data.rejected);
          this.kycRequestRejected = res.data.rejected

        }
        else
        this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ), err => {
      console.log('err =>', err)
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }

  getFilteredKycRetriggerData(){
    this.kycRetriggerParams = {
      "from_date": this.retriggerKycFromDate !== undefined ? this.datePipe.transform(this.retriggerKycFromDate, 'yyyy-MM-dd') : '',
      "to_date": this.retriggerKycToDate !== undefined ? this.datePipe.transform(this.retriggerKycToDate, 'yyyy-MM-dd') : ''
    }

    this.baseService.action('admin/kyc/get_kyc_dashboard_summary/', this.kycRetriggerParams).subscribe(
      (res: any) =>{
        console.log('retrigger filter res is as ::',res);
        if(res.status == true){
          this.kycRetriggered = res.data.kyc_retriggered
        }
        else
        this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();
      }
    ),err =>{
      console.log('err',err)
      this.alert.error(err, 'Error')
      this.loader.hide();
    }
  }
}
