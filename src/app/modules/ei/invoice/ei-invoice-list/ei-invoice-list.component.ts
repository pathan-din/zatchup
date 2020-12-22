import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-ei-invoice-list',
  templateUrl: './ei-invoice-list.component.html',
  styleUrls: ['./ei-invoice-list.component.css']
})
export class EiInvoiceListComponent implements OnInit {

  displayedColumns: string[] = ['position','details','amount', 'datePurchase','downloadInvoice'];
  config = {
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  }
  pageSize: any = '';
  listParams: any = {};
  startIndex: any
  dataSource: any = [];
  invoiceType: any = ''

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private loader: NgxSpinnerService,
    private baseService: BaseService,
    private alert: NotificationService
  ) { }

  ngOnInit(): void {
    this.invoiceType = this.route.snapshot.params.invoice;
    this.getInvoiceList('')
  }

  goBack(): void {
    this.location.back()
  }

  getInvoiceList(page?: any) {
    this.loader.show();
    this.listParams = {
      "type": this.invoiceType,
      "page_size": this.pageSize,
      "page": page
    }
    this.baseService.getData('ei/onboarding-invoice-list/', this.listParams).subscribe(
      (res: any) => {
        if (res.status == true) {
          if (!page)
            page = this.config.currentPage
          this.startIndex = res.page_size * (page - 1) + 1;
          this.config.itemsPerPage = res.page_size
          this.pageSize = res.page_size
          this.config.currentPage = page
          this.config.totalItems = res.count;
          if (res.count > 0)
            this.dataSource = res.results
          else
            this.dataSource = []
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

  generatePDF(transactionId: any){
    let data = {
      "payment_id": transactionId
    }
    this.baseService.generatePdf('admin/download_payment_invoice/', this.invoiceType+'_invoice_'+transactionId, data)
  }

}
