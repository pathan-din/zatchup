import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SubscriptionPlanHistory } from '../modals/education-institute.modal';

@Component({
  selector: 'app-subscription-plan-history',
  templateUrl: './subscription-plan-history.component.html',
  styleUrls: ['./subscription-plan-history.component.css']
})
export class SubscriptionPlanHistoryComponent implements OnInit {
  subPlanHistory: SubscriptionPlanHistory;   

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
    this.subPlanHistory = new SubscriptionPlanHistory()
   }

  ngOnInit(): void {
    this.getSubHistoryList()
  }

  goBack(){
    this.location.back()
  }

  getSubHistoryList(page?: any) {
    this.loader.show();

    this.subPlanHistory.modal = {
      'ei_id': this.route.snapshot.params.id,
      'page': page,
      'page_size': this.subPlanHistory.page_size,
    }

    this.baseService.getData('admin/payment/subscription_payment_details_list/', this.subPlanHistory.modal).subscribe(
      (res: any) => {
        if (res.status == true) {
          // this.eidbList.dataSource = res.results
          if (!page)
            page = this.subPlanHistory.config.currentPage
          this.subPlanHistory.startIndex = res.page_size * (page - 1) + 1;
          this.subPlanHistory.page_size = res.page_size
          this.subPlanHistory.config.itemsPerPage = this.subPlanHistory.page_size
          this.subPlanHistory.config.currentPage = page
          this.subPlanHistory.config.totalItems = res.count;
          if (res.count > 0) {
            this.subPlanHistory.dataSource = res.results;
          }
          else {
            this.subPlanHistory.dataSource = undefined
          }
        }
        else
          this.alert.error(res.error.message[0], 'Error')
        this.loader.hide();


      }
    ), (err: any) => {
      this.alert.error(err, 'Error');
      this.loader.hide();
    }
  }

  generatePDF(transactionId: any){
    let data = {
      "payment_id": transactionId
    }
    this.baseService.generatePdf('admin/download_payment_invoice/', 'subscription_invoice_'+transactionId, data)
  }

}
