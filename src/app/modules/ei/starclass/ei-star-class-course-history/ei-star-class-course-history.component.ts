import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StarclassCourseHistory } from '../../registration/modal/contact-us.mdal';

@Component({
  selector: 'app-ei-star-class-course-history',
  templateUrl: './ei-star-class-course-history.component.html',
  styleUrls: ['./ei-star-class-course-history.component.css']
})
export class EiStarClassCourseHistoryComponent implements OnInit {
  starclassCourseHistory : StarclassCourseHistory
  constructor(
    private location: Location,
    private baseService: BaseService,
    private alert: NotificationService,
    private loader: NgxSpinnerService
  ) {
    this.starclassCourseHistory = new StarclassCourseHistory()
   }

  ngOnInit(): void {
    this.getCourseHistory()
  }

  getCourseHistory(page? : any){
    try {
      this.loader.show()
      this.starclassCourseHistory.modal = {
        'page' : page,
        'page_size': this.starclassCourseHistory.page_size
      }
      this.baseService.getData('starclass/ei_course-history', this.starclassCourseHistory.modal).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.starclassCourseHistory.config.currentPage
            this.starclassCourseHistory.startIndex = res.page_size * (page - 1) + 1;
            this.starclassCourseHistory.page_size = res.page_size
            this.starclassCourseHistory.config.itemsPerPage = this.starclassCourseHistory.page_size
            this.starclassCourseHistory.config.currentPage = page
            this.starclassCourseHistory.config.totalItems = res.count;
            if (res.count > 0 ){
              this.starclassCourseHistory.dataSource = res.results;
              this.starclassCourseHistory.pageCounts = this.baseService.getCountsOfPage()
            }
            else{
              this.starclassCourseHistory.dataSource = undefined;
              this.starclassCourseHistory.pageCounts = undefined
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
