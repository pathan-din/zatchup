import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/services/base/base.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CoursesUploadedByEi } from '../../ei/modals/education-institute.modal';


@Component({
  selector: 'app-admin-star-class-course-uploaded-by-ei',
  templateUrl: './admin-star-class-course-uploaded-by-ei.component.html',
  styleUrls: ['./admin-star-class-course-uploaded-by-ei.component.css'],
  providers: [DatePipe]
})
export class AdminStarClassCourseUploadedByEiComponent implements OnInit {
  courseUploadedByEi: CoursesUploadedByEi;
  maxDate: any;

  
  constructor(
    private router: Router,
    private alert :NotificationService,
    private loader : NgxSpinnerService,
    private baseService: BaseService,
    private location : Location,
    private datePipe: DatePipe,
    ) { 
      this.courseUploadedByEi = new CoursesUploadedByEi();
      this.maxDate = new Date()
    }

  ngOnInit(): void {
    this.getCoursesUploadedByEiList()
  }

  getCoursesUploadedByEiList(page? : any){
    try {
      this.loader.show()
      this.courseUploadedByEi.modal= {
        'page': page,
        'page_size': this.courseUploadedByEi.page_size,
        'start_date': this.courseUploadedByEi.filterFromDate !== undefined ? this.datePipe.transform(this.courseUploadedByEi.filterFromDate, 'yyyy-MM-dd') : '',
        'end_date': this.courseUploadedByEi.filterToDate !== undefined ? this.datePipe.transform(this.courseUploadedByEi.filterToDate, 'yyyy-MM-dd') : '',  
      }
      this.baseService.getData('starclass/star_class_course_list-by_ei/', this.courseUploadedByEi.modal).subscribe(
        (res: any) =>{
          if(res.status == true){
            if (!page)
            page = this.courseUploadedByEi.config.currentPage
          this.courseUploadedByEi.startIndex = res.page_size * (page - 1) + 1;
          this.courseUploadedByEi.page_size = res.page_size
          this.courseUploadedByEi.config.itemsPerPage = this.courseUploadedByEi.page_size
          this.courseUploadedByEi.config.currentPage = page
          this.courseUploadedByEi.config.totalItems = res.count;
          if (res.count > 0) {
            this.courseUploadedByEi.dataSource = res.results;
            this.courseUploadedByEi.pageCounts = this.baseService.getCountsOfPage()
          }
          else {
            this.courseUploadedByEi.pageCounts = undefined;
            this.courseUploadedByEi.dataSource = undefined
          }
          } else{
            this.alert.error(res.error.message, 'Error')
          }
          this.loader.hide()
        },
        err =>{
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

  goToEiCourseHistory(){
    this.router.navigate(['admin/ei-starclass-course-history'])
  }

  goToEiCourseView(data){
    this.router.navigate(['admin/starclass-courses-details-view', data.id])
  }

}
