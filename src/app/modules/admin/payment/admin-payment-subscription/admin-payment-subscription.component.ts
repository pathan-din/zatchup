import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SubscriptionFee } from '../modal/revenue.modal';


export interface TotalAlumniListElement {

  'SNo': number;
  eiZatchupId: string;
  nameOfSchool: string;
  state: string;
  city: string;
  planTaken: string;
  delhiUniversity: string;
  subscriptionType: string;
  onboardingFeesGross: number;
  onboardingFeesNet: number;
  couponCodeApplied: string;
  transictionId: string;
  Action: string;

}

const ELEMENT_DATA: TotalAlumniListElement[] = [
  {
    'SNo': 1,
    eiZatchupId: 'ZATCHUP 8535',
    nameOfSchool: 'Adarsh Public School',
    state: 'Delhi',
    city: 'Delhi',
    planTaken: 'Quarterly',
    delhiUniversity: 'Delhi University',
    subscriptionType: 'New',
    onboardingFeesGross: 100000,
    onboardingFeesNet: 100000,
    couponCodeApplied: 'Coupon 7426',
    transictionId: 'TRANSACTION 1122',
    Action: ''
  }

];

@Component({
  selector: 'app-admin-payment-subscription',
  templateUrl: './admin-payment-subscription.component.html',
  styleUrls: ['./admin-payment-subscription.component.css']
})
export class AdminPaymentSubscriptionComponent implements OnInit {
  subscriptionFee: SubscriptionFee
  // dataSource = ELEMENT_DATA;

  constructor(
    private router: Router,
    private location: Location,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private datePipe: DatePipe
  ) {
    this.subscriptionFee = new SubscriptionFee();
    this.subscriptionFee.maxDate = new Date()
  }

  ngOnInit(): void {
    this.getSubscriptionRevenueList('');
    this.getAllStates();
  }

  subscriptionHistory() {
    this.router.navigate(['admin/payment-subscription-history'])
  }

  configureSubscription() {
    this.router.navigate(['admin/payment-subscription-configure'])
  }

  goBack() {
    this.location.back()
  }
  getAllStates() {
    this.baseService.getData('user/getallstate/').subscribe(
      (res: any) => {
        if (res.count > 0)
          this.subscriptionFee.allStates = res.results
      }
    )
  }
  getAllCities() {
    this.baseService.getData('user/getcitybystateid/' + this.subscriptionFee.stateId).subscribe(
      (res: any) => {
        if (res.count > 0)
          this.subscriptionFee.allCities = res.results
      }
    )
  }

  generatePDF(transactionId: any) {
    let data = {
      "payment_id": transactionId
    }
    this.baseService.generatePdf('admin/download_payment_invoice/', 'subscription_invoice_' + transactionId, data)
  }

  generateExcel() {
    delete this.subscriptionFee.listParams.page_size;
    delete this.subscriptionFee.listParams.page;
    this.subscriptionFee.listParams['export_csv'] = true
    this.baseService.generateExcel('admin/payment/export_subscription_payment_details_list/', 'subscription-fee-revenue', this.subscriptionFee.listParams);
  }

  getSubscriptionRevenueList(page?: any) {
    this.loader.show();
    let stateFind: any;
    let cityFind: any;
    if (this.subscriptionFee.allStates && this.subscriptionFee.stateId) {
      cityFind = this.subscriptionFee.allCities.find(val => {
        return val.id == this.subscriptionFee.cityId
      })
    }

    if (this.subscriptionFee.allCities) {
      stateFind = this.subscriptionFee.allStates.find(val => {
        return val.id == this.subscriptionFee.stateId
      })
    }


    this.subscriptionFee.listParams = {
      "date_from": this.subscriptionFee.filterFromDate !== undefined ? this.datePipe.transform(this.subscriptionFee.filterFromDate, 'yyyy-MM-dd') : '',
      "date_to": this.subscriptionFee.filterToDate !== undefined ? this.datePipe.transform(this.subscriptionFee.filterToDate, 'yyyy-MM-dd') : '',
      "city": cityFind ? cityFind.city : '',
      "state": stateFind ? stateFind.state : '',
      "university": this.subscriptionFee.university,
      "page_size": this.subscriptionFee.pageSize,
      "page": page
    }
    this.baseService.getData('admin/payment/subscription_payment_details_list/', this.subscriptionFee.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.subscriptionFee.config.currentPage
          this.subscriptionFee.startIndex = res.page_size * (page - 1) + 1;
          this.subscriptionFee.config.itemsPerPage = res.page_size
          this.subscriptionFee.pageSize = res.page_size;
          this.subscriptionFee.config.currentPage = page
          this.subscriptionFee.config.totalItems = res.count;
          if (res.count > 0)
            this.subscriptionFee.dataSource = res.results
          else
            this.subscriptionFee.dataSource = undefined
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
}
