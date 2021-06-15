import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PlayHistory } from '../common/starclass-model';

@Component({
  selector: 'app-play-history',
  templateUrl: './play-history.component.html',
  styleUrls: ['./play-history.component.css']
})
export class PlayHistoryComponent implements OnInit {
  playHistory : PlayHistory
  constructor(
    private baseService : BaseService,
    private loader : NgxSpinnerService,
    private alert : NotificationService,
    private location : Location,
    private route : ActivatedRoute
  ) { 
    this.playHistory = new PlayHistory()
  }

  ngOnInit(): void {
    this.getPlayHistory()
    
  }

  getPlayHistory(page? : any) {
    try {
      this.loader.show()
      this.playHistory.model = {
        'page' : page,
        'page_size': this.playHistory.page_size,
        'school_id': this.route.snapshot.queryParamMap.get('school_id')
        
      }
      this.baseService.getData('starclass/lecture_history_of_school/'  , this.playHistory.model).subscribe(
        (res:any) => {
          if(res.status == true){
            if(!page)
            page = this.playHistory.config.currentPage
            this.playHistory.startIndex = res.page_size * (page - 1) + 1;
            this.playHistory.page_size = res.page_size
            this.playHistory.config.itemsPerPage = this.playHistory.page_size
            this.playHistory.config.currentPage = page
            this.playHistory.config.totalItems = res.count;
            if(res.count > 0) {
              this.playHistory.dataSource = res.results;
              console.log('history', this.playHistory.dataSource);
              
              this.playHistory.pageCounts = this.baseService.getCountsOfPage()
            }
            else {
              this.playHistory.dataSource = undefined;
              this.playHistory.pageCounts = undefined
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
    }catch (error) {
     this.alert.error(error.error, 'Error') 
     this.loader.hide()
    }
  }

  goBack(){
    this.location.back()
  }
  generateExcel() {
    delete this.playHistory.model.page_size;
    delete this.playHistory.model.page;
    this.playHistory.model['export_csv'] = true
    this.baseService.generateExcel('starclass/export-csv-play-history/', 'play-history', this.playHistory.model);
  }

}
