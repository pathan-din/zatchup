import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/Admin/admin.service';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  error: any = [];
  errorDisplay: any = {};
  model: any = {};
  countJson: any;
  filteredResponse: any;
  filterFromDate: any;
  filterToDate: any;
  fromMaxDate: any;
  toMaxDate: any;



  constructor(
    private router: Router,
    private loader: NgxSpinnerService,
    public adminService: AdminService,
    private baseService: BaseService,
    private alert: NotificationService,
    private datePipe: DatePipe
  ) {
    this.fromMaxDate = new Date();
    this.toMaxDate = new Date();
    this.filterFromDate = this.fromMaxDate;
    this.filterToDate = this.toMaxDate;
    this.filterFromDate = new Date(this.filterFromDate.setDate(this.filterFromDate.getDate() - 7))
  }

  ngOnInit(): void {
    this.getDashboardCount();
    // this.filterRecords();
  }

  getDashboardCount() {
    try {
      this.loader.show();

      this.baseService.getData('admin/get_dashboard_summary/').subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status === true) {
            this.countJson = res.data;
            this.filteredResponse = res.data.dashboard;
          } else {
            this.alert.error(res.error.message[0], 'Error');
          }
        }, (error) => {
          this.alert.error(error.message, 'Error');
          this.loader.hide();
        });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  filterRecords() {
    this.model = {
      "from_date": this.filterFromDate ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "to_date": this.filterToDate ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    }
    try {
      /**Api For the record filter */
      this.loader.show();
      this.baseService.action('admin/filter_dashboard_records/', this.model).subscribe(
        (res: any) => {
          this.loader.hide();
          if (res.status === true) {
            this.filteredResponse = res.data.dashboard;
          } else {
            this.loader.hide();
            this.alert.error(res.error.message[0], 'Error');
          }
        }, (error) => {
          this.loader.hide();
        });
    }
    catch (e) {
      console.log("Something Went Wrong!")
    }
  }

  changeFilterToDate(date) {
    if (date)
      this.fromMaxDate = new Date(date)
  }

  goToAdminEIDatabase() {
    this.router.navigate(['admin/ei-database-list'], { queryParams: { returnUrl: 'admin/dashboard' } })
  }

  activeUsers(){
    this.router.navigate(['admin/active-users'], {queryParams: { returnUrl: 'admin/dashboard'}})
  }

  dormantUsers(){
    this.router.navigate(['admin/dormant-users'], {queryParams: { returnUrl: 'admin/dashboard'}})
  }

  subscriptionFeeRevenueRoute() {
    this.router.navigate(['admin/payment-subscription-revenue'], {queryParams: { returnUrl: 'admin/dashboard'}})
  }

  paymentOnboardingRoute() {
    this.router.navigate(['admin/payment-onboarding'], {queryParams: { returnUrl: 'admin/dashboard'}})
  }

  onboardedSchools(type: any){
    this.router.navigate(['admin/onboarded-on-zatchup-list', type], {queryParams: { returnUrl: 'admin/dashboard'}})
  }
}
