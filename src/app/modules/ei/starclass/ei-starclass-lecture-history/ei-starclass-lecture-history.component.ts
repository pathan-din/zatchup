import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StarclassLectureHistory } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-starclass-lecture-history',
  templateUrl: './ei-starclass-lecture-history.component.html',
  styleUrls: ['./ei-starclass-lecture-history.component.css']
})
export class EiStarclassLectureHistoryComponent implements OnInit {
  starclassLectureHistory: StarclassLectureHistory
  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) {
    this.starclassLectureHistory = new StarclassLectureHistory()
   }

  ngOnInit(): void {
    this.getLectureHistory()
  }

  getLectureHistory(page? : any){
    try {
      this.loader.show()
      this.starclassLectureHistory.modal = {
        'page' : page,
        'page_size': this.starclassLectureHistory.page_size
      }
      this.baseService.getData('starclass/ei_lecture_history/', this.starclassLectureHistory.modal).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.starclassLectureHistory.config.currentPage
            this.starclassLectureHistory.startIndex = res.page_size * (page - 1) + 1;
            this.starclassLectureHistory.page_size = res.page_size
            this.starclassLectureHistory.config.itemsPerPage = this.starclassLectureHistory.page_size
            this.starclassLectureHistory.config.currentPage = page
            this.starclassLectureHistory.config.totalItems = res.count;
            if (res.count > 0 ){
              this.starclassLectureHistory.dataSource = res.results;
              this.starclassLectureHistory.pageCounts = this.baseService.getCountsOfPage()
            }
            else{
              this.starclassLectureHistory.dataSource = undefined;
              this.starclassLectureHistory.pageCounts = undefined
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, 
        err => {
          this.alert.error("Please try again", 'Error')
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
