import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EiStarclassLectureHistory } from '../../ei/modals/education-institute.modal';
@Component({
  selector: 'app-ei-starclass-lecture-history',
  templateUrl: './ei-starclass-lecture-history.component.html',
  styleUrls: ['./ei-starclass-lecture-history.component.css']
})
export class EiStarclassLectureHistoryComponent implements OnInit {
  eiStarclassLectureHistory : EiStarclassLectureHistory
  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) { 
    this.eiStarclassLectureHistory = new EiStarclassLectureHistory
  }

  ngOnInit(): void {
    this.getLectureHistory()
  }

  getLectureHistory(page? : any){
    try {
      this.loader.show()
      this.eiStarclassLectureHistory.modal = {
        'page' : page,
        'page_size': this.eiStarclassLectureHistory.page_size
      }
      this.baseService.getData('starclass/ei_lecture_history/', this.eiStarclassLectureHistory.modal).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.eiStarclassLectureHistory.config.currentPage
            this.eiStarclassLectureHistory.startIndex = res.page_size * (page - 1) + 1;
            this.eiStarclassLectureHistory.page_size = res.page_size
            this.eiStarclassLectureHistory.config.itemsPerPage = this.eiStarclassLectureHistory.page_size
            this.eiStarclassLectureHistory.config.currentPage = page
            this.eiStarclassLectureHistory.config.totalItems = res.count;
            if (res.count > 0 ){
              this.eiStarclassLectureHistory.dataSource = res.results;
              this.eiStarclassLectureHistory.pageCounts = this.baseService.getCountsOfPage()
            }
            else{
              this.eiStarclassLectureHistory.dataSource = undefined;
              this.eiStarclassLectureHistory.pageCounts = undefined
            }
          }
          else {
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        }, 
        err => {
          this.alert.error(err, 'Error')
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
