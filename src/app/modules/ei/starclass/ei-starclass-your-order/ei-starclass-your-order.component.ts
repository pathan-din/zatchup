import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common'
import { BaseService } from 'src/app/services/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StarclassOrderList } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-starclass-your-order',
  templateUrl: './ei-starclass-your-order.component.html',
  styleUrls: ['./ei-starclass-your-order.component.css'],
  providers: [DatePipe]
})
export class EiStarclassYourOrderComponent implements OnInit {
  starclassOrderList : StarclassOrderList
  dataSource : any;
  maxDate: any;

  constructor(
    private location: Location,
    private baseService: BaseService,
    private loader: NgxSpinnerService,
    private alert: NotificationService,
    private datePipe: DatePipe,

  ) {
    this.maxDate = new Date();
    this.starclassOrderList = new StarclassOrderList()
   }

  ngOnInit(): void {
    this.getOrderList()    
  }

  getOrderList(page ? : any){
    try {
      this.loader.hide()
      this.starclassOrderList.params ={
        'start_date': this.starclassOrderList.filterFromDate !== undefined ? this.datePipe.transform(this.starclassOrderList.filterFromDate, 'yyyy-MM-dd') : '',
        'end_date': this.starclassOrderList.filterToDate !== undefined ? this.datePipe.transform(this.starclassOrderList.filterToDate, 'yyyy-MM-dd') : '',  
        'page': page,
        'page_size': this.starclassOrderList.page_size,
      }
      this.baseService.getData('starclass/payment/starclass_payment_details_list/', this.starclassOrderList.params).subscribe(
        (res: any ) => {
          if(res.status == true) {
            if(!page)
            page = this.starclassOrderList.config.currentPage
            this.starclassOrderList.startIndex = res.page_size * (page - 1) +  1;
            this.starclassOrderList.page_size =  res.page_size
            this.starclassOrderList.config.itemsPerPage = this.starclassOrderList.page_size
            this.starclassOrderList.config.currentPage = page
            this.starclassOrderList.config.totalItems = res.count;
            if (res.count > 0){
              this.starclassOrderList.dataSource = res.results
              this.starclassOrderList.pageCounts = this.baseService.getCountsOfPage()
            }
            else{
              this.starclassOrderList.dataSource = undefined
              this.starclassOrderList.pageCounts = undefined
            }
          }
          else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }
      ),
      err => {
        this.alert.error(err,'Error')
        this.loader.hide()
      }
    } catch (error) {
      this.alert.error(error.error, 'Error')
      this.loader.hide()
    }
  }

  generatePdf(transactionId: any){
    let data ={
      'payment_id' : transactionId
    }
    this.baseService.generatePdf('starclass/payment-invoice/' , 'my_order_'+ transactionId,   data)
  }

  generateExcel() {
    delete this.starclassOrderList.params.page_size;
    delete this.starclassOrderList.params.page;
    this.starclassOrderList.params['export_csv'] = true
    this.baseService.generateExcel('starclass/export-csv/', 'my_order_list', this.starclassOrderList.params);
  }

  goBack(){
    this.location.back()
  }
}
