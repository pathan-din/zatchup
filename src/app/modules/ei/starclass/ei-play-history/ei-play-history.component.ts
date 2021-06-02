import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EiPlayHistory } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-play-history',
  templateUrl: './ei-play-history.component.html',
  styleUrls: ['./ei-play-history.component.css']
})
export class EiPlayHistoryComponent implements OnInit {
  eiPlayHistory : EiPlayHistory;
  constructor(
    private baseService : BaseService,
    private alert : NotificationService,
    private loader: NgxSpinnerService,
    private location : Location
  ) {
    this.eiPlayHistory = new EiPlayHistory()
   }

  ngOnInit(): void {
  }

  getPlayHistory(page? : any){
    try {
      this.loader.show()
      this.eiPlayHistory.modal = {
        'page' : page,
        'page_size': this.eiPlayHistory.page_size
      }
      this.baseService.getData('', this.eiPlayHistory.modal).subscribe(
        (res:any) => {
          if(res.status == true){
            page = this.eiPlayHistory.config.currentPage
            this.eiPlayHistory.startIndex = res.page_size * (page - 1) + 1;
            this.eiPlayHistory.page_size = res.page_size
            this.eiPlayHistory.config.itemsPerPage = this.eiPlayHistory.page_size
            this.eiPlayHistory.config.currentPage = page
            this.eiPlayHistory.config.totalItems = res.count;
            if(res.count > 0) {
              this.eiPlayHistory.dataSource = res.results;
              this.eiPlayHistory.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.eiPlayHistory.dataSource = undefined;
              this.eiPlayHistory.pageCounts = undefined
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        },
        err => {
          this.alert.error("Please Try Again", 'Error')
          this.loader.hide()
        }
      )
    } catch (error) {
      this.alert.error(error.error, 'Error')
    }
  }

  goBack(){
    this.location.back()
  }

}
