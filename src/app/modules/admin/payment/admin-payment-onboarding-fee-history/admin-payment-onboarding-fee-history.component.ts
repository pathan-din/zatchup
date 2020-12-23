import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-admin-payment-onboarding-fee-history',
  templateUrl: './admin-payment-onboarding-fee-history.component.html',
  styleUrls: ['./admin-payment-onboarding-fee-history.component.css']
})
export class AdminPaymentOnboardingFeeHistoryComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['time', 'history'];
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any
  constructor(
    private location: Location,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.getOnboardingFeeHistory()
  }

  goBack() {
    this.location.back();
  }

  getOnboardingFeeHistory(page?: any) {
    this.loader.show()
    let params = {
      "page_size": this.pageSize,
      "page": page,
      "module_name": "ONBOARDINGFEE"
    }
    
    this.baseService.getData('admin/common_history/', params).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.config.itemsPerPage = res.page_size
          this.pageSize = res.page_size;
          this.config.currentPage = page
          this.config.totalItems = res.count
          if(res.count > 0)
            this.dataSource = res.results
          else
           this.dataSource = undefined
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
}
