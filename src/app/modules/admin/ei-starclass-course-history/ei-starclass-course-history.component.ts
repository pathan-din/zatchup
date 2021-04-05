import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EIStarclassCourseHistory } from '../ei/modals/education-institute.modal';

@Component({
  selector: 'app-ei-starclass-course-history',
  templateUrl: './ei-starclass-course-history.component.html',
  styleUrls: ['./ei-starclass-course-history.component.css']
})
export class EiStarclassCourseHistoryComponent implements OnInit {
  eiStarclassCourseHistory: EIStarclassCourseHistory
  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) {
    this.eiStarclassCourseHistory = new EIStarclassCourseHistory()
   }

  ngOnInit(): void {
    this.getCourseHistory()
  }

  getCourseHistory(page? : any){
    try {
      this.loader.show()
      this.eiStarclassCourseHistory.modal = {
        'page' : page,
        'page_size': this.eiStarclassCourseHistory.page_size
      }
      this.baseService.getData('starclass/ei_course-history', this.eiStarclassCourseHistory.modal).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.eiStarclassCourseHistory.config.currentPage
            this.eiStarclassCourseHistory.startIndex = res.page_size * (page - 1) + 1;
            this.eiStarclassCourseHistory.page_size = res.page_size
            this.eiStarclassCourseHistory.config.itemsPerPage = this.eiStarclassCourseHistory.page_size
            this.eiStarclassCourseHistory.config.currentPage = page
            this.eiStarclassCourseHistory.config.totalItems = res.count;
            if (res.count > 0 ){
              this.eiStarclassCourseHistory.dataSource = res.results;
              this.eiStarclassCourseHistory.pageCounts = this.baseService.getCountsOfPage()
            }
            else{
              this.eiStarclassCourseHistory.dataSource = undefined;
              this.eiStarclassCourseHistory.pageCounts = undefined
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
