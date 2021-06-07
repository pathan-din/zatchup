import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private location : Location,
    private route : ActivatedRoute
  ) {
    this.eiPlayHistory = new EiPlayHistory()
   }

  ngOnInit(): void {
    this.getPlayHistory()
  }

  getPlayHistory(page? : any){
    try {
      this.loader.show()
      this.eiPlayHistory.modal = {
        'page' : page,
        'page_size': this.eiPlayHistory.page_size,
        'course_id': this.route.snapshot.queryParamMap.get('course_id')
        
      }
      this.baseService.getData('starclass/starclass_lecture_play_history/'  , this.eiPlayHistory.modal).subscribe(
        (res:any) => {
          if(res.status == true){
            if(!page)
            page = this.eiPlayHistory.config.currentPage
            this.eiPlayHistory.startIndex = res.page_size * (page - 1) + 1;
            this.eiPlayHistory.page_size = res.page_size
            this.eiPlayHistory.config.itemsPerPage = this.eiPlayHistory.page_size
            this.eiPlayHistory.config.currentPage = page
            this.eiPlayHistory.config.totalItems = res.count;
            if(res.count > 0) {
              this.eiPlayHistory.dataSource = res.results;
              console.log('history', this.eiPlayHistory.dataSource);
              
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

  generateExcel() {
    delete this.eiPlayHistory.modal.page_size;
    delete this.eiPlayHistory.modal.page;
    this.eiPlayHistory.modal['export_csv'] = true
    this.baseService.generateExcel('starclass/export-csv-ei-course/', 'play-history', this.eiPlayHistory.modal);
  }

}
