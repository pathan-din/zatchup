import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-payment-subscription-history',
  templateUrl: './admin-payment-subscription-history.component.html',
  styleUrls: ['./admin-payment-subscription-history.component.css']
})
export class AdminPaymentSubscriptionHistoryComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['time', 'history'];
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any

  constructor(
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSubscriptionHistory('')
  }

  getSubscriptionHistory(page: any) {
    this.loader.show()
    let params = {
      "page_size": 5,
      "page": page ? page : 1
    }
    this.baseService.getData('admin/subscription/get_subscription_fees_history/', params).subscribe(
      (res: any) => {
        if (res.status == true && res.count != 0) {
          this.config.itemsPerPage = res.page_size
          this.config.currentPage = page
          this.config.totalItems = res.count
          this.dataSource = res.results
        }
        else {
          this.alert.error(res.error.message[0], 'Error')
        }
        this.loader.hide()
      }
    ), err => {
      this.loader.hide();
      this.alert.error(err, 'Error')
    }
  }

  goBack(){
    this.location.back()
  }
}
