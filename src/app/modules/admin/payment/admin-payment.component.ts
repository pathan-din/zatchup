import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {
  maxDate: any;
  filterToDate: any;
  filterFromDate: any;
  dashboardData: any;

  constructor(
    private router: Router,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.getDashboardSummery();
  }

  paymentOnboardingRoute() {
    this.router.navigate(['admin/payment-onboarding'])
  }

  starClassRevenueRoute() {
    this.router.navigate(['admin/payment-starclass-revenue'])
  }

  paymentCommissionsRevenueRoute() {
    this.router.navigate(['admin/payment-commissions-revenue'])
  }

  subscriptionFeeRevenueRoute() {
    this.router.navigate(['admin/payment-subscription-revenue'])
  }

  paymentAdvertisementRevenueRoute() {
    this.router.navigate(['admin/payment-advertisement-revenue'])
  }

  couponCodes() {
    this.router.navigate(['admin/payment-coupon-codes'])
  }

  getDashboardSummery() {
    this.loader.show();
    this.baseService.getData('admin/payment/payment-dashboard-summary/').subscribe(
      (res: any) => {
        if (res.status == true) {
          this.dashboardData = res.data;
        } else {
          this.alert.error(res.error.message[0], 'Error');
        }
        this.loader.hide();
      }
    )
  }

  getDashboardSummeryByFilter() {
    this.loader.show();
    let data = {
      "from_date": this.filterFromDate !== undefined ? this.datePipe.transform(this.filterFromDate, 'yyyy-MM-dd') : '',
      "to_date": this.filterToDate !== undefined ? this.datePipe.transform(this.filterToDate, 'yyyy-MM-dd') : '',
    }
    this.baseService.action('admin/payment/filter-payment-dashboard-summary/', data).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.dashboardData = res.data;
        } else {
          this.alert.error(res.error.message[0], 'Error');
        }
        this.loader.hide();
      }
    )
  }
}
